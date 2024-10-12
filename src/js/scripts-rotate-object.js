import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 

// import images
import nebula from '../img/nebula.jpg';
import starsTexture from '../img/planets/stars.jpg';
import sunTexture from '../img/planets/sun.jpg';
import mercuryTexture from '../img/planets/mercury.jpg';
import venusTexture from '../img/planets/venus.jpg';
import earthTexture from '../img/planets/earth.jpg';
import marsTexture from '../img/planets/mars.jpg';
import jupiterTexture from '../img/planets/jupiter.jpg';
import saturnTexture from '../img/planets/saturn.jpg';
import saturnRingTexture from '../img/planets/saturn ring.png';
import uranusTexture from '../img/planets/uranus.jpg';
import uranusRingTexture from '../img/planets/uranus ring.png';
import neptuneTexture from '../img/planets/neptune.jpg';
import plutoTexture from '../img/planets/pluto.jpg';

// Create Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Create canvas in page
const threeDContainer = document.getElementById('threeDContainer');
threeDContainer.appendChild(renderer.domElement);

// Create Scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
);

// Set Orbit Control
const orbit = new OrbitControls(camera, renderer.domElement);
// Reposition Camera
camera.position.set(-10, 30, 30);
orbit.update();

// Create ambient light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Add background
const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = textureLoader.load(nebula);
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

// Create Texture Loader 
// For planets 
const textureLoader = new THREE.TextureLoader();

// sun
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun)

// // saturn
// const saturnGeo = new THREE.SphereGeometry(10, 30, 30);
// const saturnMat = new THREE.MeshStandardMaterial({
//     map: textureLoader.load(saturnTexture),
//     roughness: 1,
//     metalness: 0,
    
// });
// const saturn = new THREE.Mesh(saturnGeo, saturnMat);
// // create parent for all planets
// // Object3D: base object of all 3D model
// const saturnParentObj = new THREE.Object3D();
// // the mercury will be the child of the sun object and not the scene child
// //sun.add(mercury)
// saturnParentObj.add(saturn);
// scene.add(saturnParentObj);
// //re-position
// saturn.position.x = 138;

// // saturn ring
// const saturnRingGeo = new THREE.RingGeometry(10, 30, 32);
// const saturnRingMat = new THREE.MeshBasicMaterial({
//     map: textureLoader.load(saturnRingTexture),
//     side: THREE.DoubleSide
// });
// const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
// saturnParentObj.add(saturnRing);
// //re-position
// saturnRing.position.x = 138;
// // rotate the ring
// saturnRing.rotation.x = -0.3 * Math.PI;

// Lights
// Add point light
const pointLight = new THREE.PointLight(0xFFFFFF, 5000, 300);
scene.add(pointLight);
pointLight.position.set(0, 0, 0);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);

function createPlanet(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture),
        roughness: 1,
        metalness: 0,        
    });
    const planet = new THREE.Mesh(geo, mat);
    // create parent for all planets
    // Object3D: base object of all 3D model
    const planetParentObj = new THREE.Object3D();
    // the mercury will be the child of the sun object and not the scene child
    //sun.add(mercury)
    planetParentObj.add(planet);

    if (ring) {
        const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planetParentObj.add(ringMesh);
        //re-position
        ringMesh.position.x = position;
        // rotate the ring
        ringMesh.rotation.x = -0.3 * Math.PI;
    }

    scene.add(planetParentObj);
    //re-position
    planet.position.x = position;   

    return { planet: planet, parentObj: planetParentObj };
}

// Planets creation
const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const mars = createPlanet(4, marsTexture, 78);
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);

// renderer.render(scene, camera);
function animate() {

    animateSun();

    // mercury
    rotatePlanetParentObj(mercury, 0.04);
    rotatePlanet(mercury, 0.004);

    // saturn
    rotatePlanetParentObj(saturn, 0.0009);
    rotatePlanet(saturn, 0.038);

    // mars
    rotatePlanetParentObj(mars, 0.008);
    rotatePlanet(mars, 0.018);

    // venus
    rotatePlanetParentObj(venus, 0.015);
    rotatePlanet(venus, 0.002);

    // earth
    rotatePlanetParentObj(earth, 0.01);
    rotatePlanet(earth, 0.02);

    // jupiter
    rotatePlanetParentObj(jupiter, 0.002);
    rotatePlanet(jupiter, 0.04);

    // uranus
    rotatePlanetParentObj(uranus, 0.0004);
    rotatePlanet(uranus, 0.03);

    // neptune
    rotatePlanetParentObj(neptune, 0.0001);
    rotatePlanet(neptune, 0.032);

    // pluto
    rotatePlanetParentObj(pluto, 0.00007);
    rotatePlanet(pluto, 0.008);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); 
});

// functions
function animateSun() {
    sun.rotateY(0.004);
}

// Around sun rotation
function rotatePlanetParentObj(obj, speed) {
    obj.parentObj.rotateY(speed);
}

function rotatePlanet(obj, speed) {
    obj.planet.rotateY(speed);
}





