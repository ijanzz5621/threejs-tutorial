import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Textures
import earthMapTexture from '../assets/textures/earthmap1k.jpg';
import earthBumpTexture from '../assets/textures/earthbump1k.jpg';

// Scripts
import getStarfield from './threejs_world_rotate/getStarfield.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;

// camera
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// create orbit
const orbitControl = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

// Create Scene
const scene = new THREE.Scene();

// Add Hemisphere Light
const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000);
scene.add(hemiLight);

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// create stars
const stars = getStarfield();
scene.add(stars);

// Create earth group
const earthGroup = new THREE.Group();
// set group rotation
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

// create geometry
const geometry = new THREE.IcosahedronGeometry(radius=1, details=12);
const material = new THREE.MeshStandardMaterial({
    // color: 0xFFFF00,
    // flatShading: true,
    map: textureLoader.load(earthMapTexture),
    bumpMap: textureLoader.load(earthBumpTexture)
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// FINAL CODE
function animate(t = 0) {
    requestAnimationFrame(animate)
    
    earthMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

//renderer.setAnimationLoop(animate);
animate();


