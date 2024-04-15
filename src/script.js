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
     new THREE.MeshStandardMaterial({
          color: "red",
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
     new THREE.MeshStandardMaterial({
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
     new THREE.MeshStandardMaterial({ color: "green" })
);

roof.position.x = 0;
roof.position.y = 1 + 1.5; // half of roof height + walls height
roof.position.z = 0;

house.add(roof);

// door
const door = new THREE.Mesh(
     new THREE.PlaneGeometry(0.75, 1),
     new THREE.MeshStandardMaterial({ color: "purple" })
);

door.position.x = 1.15;
door.position.y = 0.6;
door.position.z = -0.95;

// gui.add(door.position, "x").min(-5).max(5).step(0.0001).name("door x");
// gui.add(door.position, "y").min(-5).max(5).step(0.0001).name("door y");
// gui.add(door.position, "z").min(-5).max(5).step(0.0001).name("door z");

door.rotation.y = Math.PI * 0.75;

house.add(door);

/**
 * Trees
 */

// tree groups
const Tree1 = new THREE.Group();
Tree1.position.set(4, 0, 1.5);
// gui.add(Tree1.position, "x").min(-5).max(5).step(0.01).name("tree1 x");
// gui.add(Tree1.position, "z").min(-5).max(5).step(0.01).name("tree1 z");

const Tree2 = new THREE.Group();
Tree2.position.set(1.5, 0, -4.2);
// gui.add(Tree2.position, "x").min(-5).max(5).step(0.01).name("tree2 x");
// gui.add(Tree2.position, "z").min(-5).max(5).step(0.01).name("tree2 z");

const Tree3 = new THREE.Group();
Tree3.position.set(0.6, 0, 3.9);
// gui.add(Tree3.position, "x").min(-5).max(5).step(0.01).name("tree3 x");
// gui.add(Tree3.position, "z").min(-5).max(5).step(0.01).name("tree3 z");

const Tree4 = new THREE.Group();
Tree4.position.set(2.5, 0, 2.5);
// gui.add(Tree4.position, "x").min(-5).max(5).step(0.01).name("tree4 x");
// gui.add(Tree4.position, "z").min(-5).max(5).step(0.01).name("tree4 z");

const Tree5 = new THREE.Group();
Tree5.position.set(-1, 0, -3);
// gui.add(Tree5.position, "x").min(-5).max(5).step(0.01).name("tree5 x");
// gui.add(Tree5.position, "z").min(-5).max(5).step(0.01).name("tree5 z");

scene.add(Tree1, Tree2, Tree3, Tree4, Tree5);

// wood
const treeWoodMaterial = new THREE.MeshStandardMaterial({ color: "brown" });
const bigTreeWoodGeo = new THREE.CylinderGeometry(0.22, 0.22, 1.2, 5);
const midTreeWoodGeo = new THREE.CylinderGeometry(0.2, 0.2, 1, 5);
const smallTreeWoodGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 5);

const tree1Wood = new THREE.Mesh(midTreeWoodGeo, treeWoodMaterial);
tree1Wood.position.y = 0.5;
Tree1.add(tree1Wood);

const tree2Wood = new THREE.Mesh(midTreeWoodGeo, treeWoodMaterial);
tree2Wood.position.y = 0.5;
Tree2.add(tree2Wood);

const tree3Wood = new THREE.Mesh(smallTreeWoodGeo, treeWoodMaterial);
tree3Wood.position.y = 0.4;
Tree3.add(tree3Wood);

const tree4Wood = new THREE.Mesh(bigTreeWoodGeo, treeWoodMaterial);
tree4Wood.position.y = 0.6;
Tree4.add(tree4Wood);

const tree5Wood = new THREE.Mesh(bigTreeWoodGeo, treeWoodMaterial);
tree5Wood.position.y = 0.6;
Tree5.add(tree5Wood);

// leaf

const treeLeafMaterial = new THREE.MeshBasicMaterial({ color: "#32a862" });
const bigTreeLeafGeo = new THREE.ConeGeometry(1, 2.2, 5);
const midTreeLeafGeo = new THREE.ConeGeometry(0.8, 2, 5);
const smallTreeLeafGeo = new THREE.ConeGeometry(0.6, 1.8, 5);

const tree1Leaf = new THREE.Mesh(midTreeLeafGeo, treeLeafMaterial);
tree1Leaf.position.y = 1 + 1; // half of leaf height + wood height
Tree1.add(tree1Leaf);

const tree2Leaf = new THREE.Mesh(midTreeLeafGeo, treeLeafMaterial);
tree2Leaf.position.y = 1 + 1; // half of leaf height + wood height
Tree2.add(tree2Leaf);

const tree3Leaf = new THREE.Mesh(smallTreeLeafGeo, treeLeafMaterial);
tree3Leaf.position.y = 0.9 + 0.8; // half of leaf height + wood height
Tree3.add(tree3Leaf);

const tree4Leaf = new THREE.Mesh(bigTreeLeafGeo, treeLeafMaterial);
tree4Leaf.position.y = 1.1 + 1.2; // half of leaf height + wood height
Tree4.add(tree4Leaf);

const tree5Leaf = new THREE.Mesh(bigTreeLeafGeo, treeLeafMaterial);
tree5Leaf.position.y = 1.1 + 1.2; // half of leaf height + wood height
Tree5.add(tree5Leaf);

/**
 * Lights
 */

// ambient light
const ambientLight = new THREE.AmbientLight("white", 5);
gui.add(ambientLight, "intensity").min(0).max(100).step(1).name("AL-intensity");
scene.add(ambientLight);

// directional Light
const directionalLight = new THREE.DirectionalLight("white", 10);
directionalLight.position.set(0, 5, 0);
gui.add(directionalLight, "intensity")
     .min(0)
     .max(100)
     .step(1)
     .name("DR-intensity");
scene.add(directionalLight);

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
