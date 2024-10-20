import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Textures
import earthMapTexture from '../assets/textures/earthmap10k.jpg';
import earthBumpTexture from '../assets/textures/earthbump4k.jpg';
import earthLightTexture from '../assets/textures/earthlights4k.jpg';
import earthCloudTexture from '../assets/textures/earthhiresclouds4K.jpg';
import starCircle from '../assets/textures/stars/circle.png';
import sunMapTexture from '../assets/textures/sunmap8k.jpg';

// Scripts
import getStarfield from './threejs_world_rotate/getStarfield.js';
import { getFresnelMat } from './threejs_world_rotate/getFresnelMat.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;

// camera
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// create orbit
const orbitControl = new OrbitControls(camera, renderer.domElement);
camera.position.set(7, 0, 7);
orbitControl.autoRotate = true;
// orbitControl.rotateSpeed = 0.001;
orbitControl.update();

// Create Scene
const scene = new THREE.Scene();

// Texture loader
const textureLoader = new THREE.TextureLoader();

// // Add Hemisphere Light
// const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 3);
// scene.add(hemiLight);

// Add Sun light
const sunLight = new THREE.DirectionalLight(0xFFFFFF);
sunLight.position.set(-4, 0, 10);
scene.add(sunLight);
// // Add Directioanl Light Helper
// const sunLightHelper = new THREE.DirectionalLightHelper(sunLight);
// scene.add(sunLightHelper);

// Add Sun Object
const sunGeo = new THREE.SphereGeometry(3, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunMapTexture)
});
const sunMesh = new THREE.Mesh(sunGeo, sunMat);
sunMesh.position.set(-4, 0, 10);
scene.add(sunMesh);

// create stars
const stars = getStarfield(2000, starCircle);
// console.log(stars);
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
    bumpMap: textureLoader.load(earthBumpTexture),
    lightMap: textureLoader.load(earthLightTexture),
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// const lightsMat = new THREE.MeshStandardMaterial({
//     color: 0x0000ff,
//     transparent: true,
//     opacity: 0.1,
//     // map: textureLoader.load(earthLightTexture),
//     blending: THREE.AdditiveBlending
// });
// // Add light Mesh
// const lightsMesh = new THREE.Mesh(geometry, lightsMat);
// // Scale
// lightsMesh.scale.setScalar(1.05);
// earthGroup.add(lightsMesh);

// Add earth cloud Mesh
const cloudsMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(earthCloudTexture),
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
// Scale a bit so that it will look like sit on top
cloudsMesh.scale.setScalar(1.005);
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.02);
earthGroup.add(glowMesh);


// FINAL CODE
function animate(t = 0) {
    requestAnimationFrame(animate)
    
    earthMesh.rotation.y += 0.005;
    // lightsMesh.rotation.y += 0.01;
    cloudsMesh.rotation.y += 0.01;
    glowMesh.rotation.y += 0.005;

    // camera.rotation.z += t * Math.PI;
    orbitControl.update();

    renderer.render(scene, camera);
}

//renderer.setAnimationLoop(animate);
animate();

// resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); 
});




