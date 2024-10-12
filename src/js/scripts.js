import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 

import * as dat from 'dat.gui';

// import images
import nebula from '../img/nebula.jpg';
import stars from '../img/stars.jpg';

// import monkey model
const monkeyUrl = new URL('../assets/monkey.glb', import.meta.url);

//const renderer = new THREE.WebGLRenderer({ antialias: true });
const renderer = new THREE.WebGLRenderer();

// Enable the renderer shadow
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45, //between 40 & 80
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);

// Orbit control
const orbit = new OrbitControls(camera, renderer.domElement);

// Add axis helper
// const axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

// move the camera
// camera.position.z = 5;
// camera.position.y = 2;
camera.position.set(-10, 30, 30);
// camera.lookAt(0, 0, 0);

// update the orbit (must call update everytime change camera position)
orbit.update();

// Add object (box)
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
const box2 = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(2, 2, 2);
box2.position.set(0, 2, 2);
scene.add(box, box2);

// Add plain geometry
const planeGeometry = new THREE.PlaneGeometry(100, 100);
// const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// Enable the plane to receive the Shadow
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

// // add grid helper
// const gridHelper = new THREE.GridHelper(30, 50);
// scene.add(gridHelper);

// Add sphere
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
// const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: false});
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0000FF, wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 8;
sphere.castShadow = true;
scene.add(sphere);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.9);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
// Update directional light camera bottom shadow
directionalLight.shadow.camera.bottom = -10;

// Add directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

// Add Directional Light Shadow Helper
const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);

// Add spot light
const spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
// spotLight.angle = 0.2;
spotLight.lookAt(plane);
spotLight.angle = Math.PI/4;
spotLight.intensity = 80;
spotLight.distance = 0;
scene.add(spotLight);

// Add spot light helper
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// // Add fog
// scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
// scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

//renderer.setClearColor(0xFFEA00);

// Add background
const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(nebula);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nebula,
    nebula,
    stars,
    stars,
    stars,
    stars
]);

const box3Geometry = new THREE.BoxGeometry(4, 4, 4);
const box3Material = new THREE.MeshStandardMaterial({
    //color: 0x00FF00,
    //map: textureLoader.load(nebula)
});

// Multi material on different surface
const box3MultiMaterial = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)})
];

// const box3 = new THREE.Mesh(box3Geometry, box3Material);
const box3 = new THREE.Mesh(box3Geometry, box3MultiMaterial);
scene.add(box3);
box3.position.set(0, 15, 10);
box3.material.map = textureLoader.load(nebula);

const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true
});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2);
plane2.position.set(10, 10, 15);

// Change plane vertex point position randomly
plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ = plane2.geometry.attributes.position.array.length - 1;
plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

// const vShader = `
//     void Main() {
//         gl_Position = projectionMetrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;
// const fShader = `
//     void Main() {
//         gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
//     }
// `;

const sphere2Geometry = new THREE.SphereGeometry(4);
const sphere2Material = new THREE.MeshBasicMaterial({
    // vertexShader: vShader,
    // fragmentShader: fShader
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-5, 10, 10);

// Create instance of GLTF Loader
const assetLoader = new GLTFLoader();
// import gltf model
assetLoader.load(monkeyUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-12, 4, 10);
}, 
undefined,
function(error) {
    console.log(error);
});

// Add top right config meny
const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1
};

// dat.gui
gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);

// Add bounce
let step = 0;
// let speed = 0.01;

// Enable object selection
// Create 2D VEctor (Ray caster)
const mousePosition = new THREE.Vector2();

// Add mouse move event listener
window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();
const sphereId = sphere.id;
box3.name = "theBox";

// animation
function animate(time) {
    // rotation
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;

    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;

    box2.rotation.x = time / 1000;
    box2.rotation.y = time / 1000;

    // bounce animation
    step += options.speed;
    sphere.position.y = 20 * Math.abs(Math.sin(step)); 

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    spotLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    console.log(intersects);

    for(let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.id === sphereId) {
            intersects[i].object.material.color.set(0xFF0000);
        }

        if (intersects[i].object.name === "theBox") {
            intersects[i].object.rotation.x = time / 1000;
            intersects[i].object.rotation.y = time / 1000;
        }
    }

    plane2.geometry.attributes.position.array[0] = 10 * Math.random();
    plane2.geometry.attributes.position.array[1] = 10 * Math.random();
    plane2.geometry.attributes.position.array[2] = 10 * Math.random();
    plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
    plane2.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// update view for resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); 
});


