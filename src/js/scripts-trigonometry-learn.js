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

// Add grid
const grid = new THREE.GridHelper();
scene.add(grid);

const geo1 = new THREE.SphereGeometry(1, 30, 30);
const mat1 = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF
});
const mesh1 = new THREE.Mesh(geo1, mat1);
mesh1.position.set(0, 0, 0);
scene.add(mesh1);

const geo2 = new THREE.SphereGeometry(1, 30, 30);
const mat2 = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF
});
const mesh2 = new THREE.Mesh(geo2, mat2);
mesh2.position.set(5, 0, 0);
scene.add(mesh2);

tethaDegree = 0

lastTime = 0
// FINAL CODE
function animate(time = 0) {

    requestAnimationFrame(animate);

    if(!lastTime || time - lastTime >= 1000) {
        lastTime = time;
        newX = (mesh2.position.x - mesh1.position.x) * Math.cos(tethaDegree) - (mesh2.position.y - mesh1.position.y) * Math.sin(tethaDegree) + mesh1.position.x;
        newY = (mesh2.position.x - mesh1.position.x) * Math.sin(tethaDegree) + (mesh2.position.y - mesh1.position.y) * Math.cos(tethaDegree) + mesh1.position.y;
        mesh2.position.set(newX, newY, 0);

        tethaDegree += 1;
    }

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




