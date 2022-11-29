import * as THREE from '../../node_modules/three/build/three.module.js';

import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'; // orbit controls Module
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer, rayCaster, controls;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 5, 5);

    scene = new THREE.Scene();
    //dark grey background
    scene.background = new THREE.Color("rgb(0,0,0)");

    rayCaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    // Lights

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const light1 = new THREE.DirectionalLight(0xefefff, 1);
    light1.position.set(1, 10, 10);
    light1.castShadow = true;
    scene.add(light1);

    const loader = new GLTFLoader();
    loader.load("https://cdn.glitch.me/6a395043-d144-4056-b986-caaf327c3e45/smart_cube.glb?v=1669742570302", function (gltf) {
        Mesh = gltf.scene.children[0];
        Mesh.rotation.y = -15;
        Mesh.position.set(0, 0, 0);
        Mesh.setSize = 5;
        Mesh.castShadow = true;
        Mesh.receiveShadow = true;
        scene.add(Mesh);
    });

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    Mesh.rotation.y += 0.01;
    render();
}

function render() {
    renderer.render(scene, camera);
}





