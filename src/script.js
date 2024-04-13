import * as THREE from "three";
/**
 * Base
 */

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

const testBox = new THREE.Mesh(
     new THREE.BoxGeometry(4, 3, 4),
     new THREE.MeshBasicMaterial({ color: "skyblue" })
);

scene.add(testBox);

/**
 * Camera
 */
const sizes = {
     width: window.innerWidth,
     height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
     75,
     sizes.width / sizes.height,
     0.1,
     100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
     canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// handle window resize
window.addEventListener("resize", () => {
     // update sizes
     sizes.width = window.innerWidth;
     sizes.height = window.innerHeight;

     // update camera
     camera.aspect = sizes.width / sizes.height;
     camera.updateProjectionMatrix();

     // update renderer
     renderer.setSize(sizes.width, sizes.height);
});
