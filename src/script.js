import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */

/**
 * debug ui
 */
const gui = new GUI();

// canvas
const canvas = document.querySelector("canvas.webgl");

// scene
const scene = new THREE.Scene();

/**
 * Geometry
 */

// floor
const floor = new THREE.Mesh(
     new THREE.CircleGeometry(5, 20),
     new THREE.MeshBasicMaterial({
          color: "red",
          wireframe: true,
     })
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * House
 */
const house = new THREE.Group();

house.position.x = -2;
house.position.z = 2;

scene.add(house);

// walls
const walls = new THREE.Mesh(
     new THREE.CylinderGeometry(1.5, 1.5, 1.5, 20),
     new THREE.MeshBasicMaterial({
          color: "blue",
     })
);
walls.position.x = 0;
walls.position.y = 0.75;
walls.position.z = 0;

house.add(walls);

// roof
const roof = new THREE.Mesh(
     new THREE.ConeGeometry(2, 2, 20),
     new THREE.MeshBasicMaterial({ color: "green" })
);

roof.position.x = 0;
roof.position.y = 1 + 1.5; // half of roof height + walls height
roof.position.z = 0;

house.add(roof);

// door
const door = new THREE.Mesh(
     new THREE.PlaneGeometry(0.75, 1),
     new THREE.MeshBasicMaterial({ color: "purple" })
);

door.position.x = 1.15;
door.position.y = 0.6;
door.position.z = -0.95;

gui.add(door.position, "x").min(-5).max(5).step(0.0001).name("door x");
gui.add(door.position, "y").min(-5).max(5).step(0.0001).name("door y");
gui.add(door.position, "z").min(-5).max(5).step(0.0001).name("door z");

door.rotation.y = Math.PI * 0.75;

house.add(door);

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
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 5;
// camera.lookAt(door)
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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

const clock = new THREE.Clock();
const tick = () => {
     const elapsedTime = clock.getElapsedTime();

     // update controls
     controls.update();

     // renderer
     renderer.render(scene, camera);

     // Call tick again on the next frame
     window.requestAnimationFrame(tick);
};
tick();
