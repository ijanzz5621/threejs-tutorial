import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const dogUrl = new URL('../assets/doggo2.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Create canvas in page
const threeDContainer = document.getElementById('threeDContainer');
threeDContainer.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(10, 10, 10);
orbit.update();

const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

const assetLoader = new GLTFLoader();

// create light
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 100);
scene.add(ambientLight);
ambientLight.position.set(-10, 20, 20);

// animation
let mixer;

assetLoader.load(dogUrl.href, function(gltf) {
    // load model
    const model = gltf.scene;
    scene.add(model);

    // load animation
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    // const clip = THREE.AnimationClip.findByName(clips, 'HeadAction');
    // const action = mixer.clipAction(clip);
    // action.play();

    // play all animation
    clips.forEach(function(clip) {
        const action = mixer.clipAction(clip);
        action.play();
    });


}, undefined, function(error) {
    console.log(error);
});

// Create clock
const clock = new THREE.Clock();

function animate() {

    // animation
    if (mixer)
        mixer.update(clock.getDelta());

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); 
});