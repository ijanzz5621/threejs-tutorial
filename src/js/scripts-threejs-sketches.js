import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// create orbit
const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.enableDamping = true;
orbitControl.dampingFactor = 0.03;

camera.position.z = 2;
// update orbit once camera moved
orbitControl.update();

// Create Scene
const scene = new THREE.Scene();

// ADDITIONAL CODES HERE

// // Add Ambient Light
// const ambientColor = 0xFFFFFF;
// const ambientLightIntensity = 1;
// const ambientLight = new THREE.AmbientLight(ambientColor, ambientLightIntensity);
// scene.add(ambientLight);

// Add Hemisphere Light
const hemiLight = new THREE.HemisphereLight(0x0099FF, 0xaa5500);
scene.add(hemiLight);

// Add sample Geometry
const geo = new THREE.IcosahedronGeometry(1.0, 3);
//const mat = new THREE.MeshBasicMaterial({
const mat = new THREE.MeshStandardMaterial({
    color: 0xccff,
    // wireframe: true,
    flatShading: true    
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Add wireframe object
const wireMat = new THREE.MeshBasicMaterial({
    color:0xFFFFFF,
    wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
// Make it bigger a bit for better rendering
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// FINAL CODE
function animate(t = 0) {
    requestAnimationFrame(animate)
    mesh.rotation.y = t * 0.0001;
    // update orbitControl
    orbitControl.update();
    renderer.render(scene, camera);
}

//renderer.setAnimationLoop(animate);
animate();


