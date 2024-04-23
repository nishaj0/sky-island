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

// params
const params = {
     roofColor: "#5c4242",
     treeWoodColor: "#964B00",
     treeLeafColor: "#32a862",
     stoneColor: "#3b3a39",
     cloudColor: "#808080",
     sunColor: "#ffff00",
     moonColor: "#3da1ff",
     ambientLightColor: "#ffffff",
     sunlightColor: "#ffecb3",
     moonlightColor: "#70a6e1",
     nightBgColor: "#45575c",
     morningBgColor: "#c2f3ff",
};

/**
 * Texture Loader
 */
const textureLoader = new THREE.TextureLoader();

const floorColorTexture = textureLoader.load(
     "static/textures/stone_path_006/Stone_Path_006_basecolor.jpg"
);
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
const floorAOTexture = textureLoader.load(
     "static/textures/stone_path_006/Stone_Path_006_ambientOcclusion.jpg"
);
const floorNormalTexture = textureLoader.load(
     "static/textures/stone_path_006/Stone_Path_006_normal.jpg"
);
const floorRoughnessTexture = textureLoader.load(
     "static/textures/stone_path_006/Stone_Path_006_roughness.jpg"
);

// floorColorTexture.repeat.set(2, 2);
// floorAOTexture.repeat.set(2, 2);
// floorNormalTexture.repeat.set(2, 2);
// floorRoughnessTexture.repeat.set(2, 2);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorAOTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorRoughnessTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorAOTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorRoughnessTexture.wrapT = THREE.RepeatWrapping;

const brickColorTexture = textureLoader.load(
     "static/textures/brick_wall_017/Brick_Wall_017_basecolor.jpg"
);
brickColorTexture.colorSpace = THREE.SRGBColorSpace;
const brickAOTexture = textureLoader.load(
     "static/textures/brick_wall_017/Brick_Wall_017_ambientOcclusion.jpg"
);
const brickHeightTexture = textureLoader.load(
     "static/textures/brick_wall_017/Brick_Wall_017_height.jpg"
);
const brickNormalTexture = textureLoader.load(
     "static/textures/brick_wall_017/Brick_Wall_017_normal.jpg"
);
const brickRoughnessTexture = textureLoader.load(
     "static/textures/brick_wall_017/Brick_Wall_017_roughness.jpg"
);

const doorColorTexture = textureLoader.load("static//textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("static//textures/door/alpha.jpg");
const doorAOTexture = textureLoader.load(
     "static//textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load(
     "static//textures/door/height.jpg"
);
const doorNormalTexture = textureLoader.load(
     "static//textures/door/normal.jpg"
);
const doorMetalnessTexture = textureLoader.load(
     "static//textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
     "static//textures/door/roughness.jpg"
);
doorColorTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Geometry
 */

// floor
const floor = new THREE.Mesh(
     new THREE.CircleGeometry(5, 20),
     new THREE.MeshStandardMaterial({
          map: floorColorTexture,
          aoMap: floorAOTexture,
          normalMap: floorNormalTexture,
          roughnessMap: floorRoughnessTexture,
     })
);
floor.geometry.setAttribute(
     "uv2",
     new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// floor bottom
// const floorBottom = new THREE.Mesh(
//      new THREE.ConeGeometry(5, 10, 20),
//      new THREE.MeshBasicMaterial({ color: "#bd9762" })
// );

// floorBottom.position.y = -5.001;
// floorBottom.rotation.x = Math.PI;
// scene.add(floorBottom);

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
          map: brickColorTexture,
          aoMap: brickAOTexture,
          normalMap: brickNormalTexture,
          displacementMap: brickHeightTexture,
          roughnessMap: brickRoughnessTexture,
     })
);

floor.geometry.setAttribute(
     "uv2",
     new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

walls.position.x = 0;
walls.position.y = 0.75;
walls.position.z = 0;

house.add(walls);

// roof
const roof = new THREE.Mesh(
     new THREE.ConeGeometry(2, 2, 20),
     new THREE.MeshStandardMaterial({ color: params.roofColor })
);

roof.position.x = 0;
roof.position.y = 1 + 1.5; // half of roof height + walls height
roof.position.z = 0;
gui.addColor(params, "roofColor").onChange(() => {
     roof.material.color.set(params.roofColor);
});

house.add(roof);

// door
const door = new THREE.Mesh(
     new THREE.PlaneGeometry(0.75, 1),
     new THREE.MeshStandardMaterial({
          map: doorColorTexture,
          transparent: true,
          alphaMap: doorAlphaTexture,
          aoMap: doorAOTexture,
          displacementMap: doorHeightTexture,
          displacementScale: 0.1,
          normalMap: doorNormalTexture,
          metalnessMap: doorMetalnessTexture,
          roughnessMap: doorRoughnessTexture,
     })
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
 * Trees
 */

// tree groups
const Tree1 = new THREE.Group();
Tree1.position.set(4, 0, 1.5);
gui.add(Tree1.position, "x").min(-5).max(5).step(0.01).name("tree1 x");
gui.add(Tree1.position, "z").min(-5).max(5).step(0.01).name("tree1 z");

const Tree2 = new THREE.Group();
Tree2.position.set(1.5, 0, -4.2);
gui.add(Tree2.position, "x").min(-5).max(5).step(0.01).name("tree2 x");
gui.add(Tree2.position, "z").min(-5).max(5).step(0.01).name("tree2 z");

const Tree3 = new THREE.Group();
Tree3.position.set(0.6, 0, 3.9);
gui.add(Tree3.position, "x").min(-5).max(5).step(0.01).name("tree3 x");
gui.add(Tree3.position, "z").min(-5).max(5).step(0.01).name("tree3 z");

const Tree4 = new THREE.Group();
Tree4.position.set(2.5, 0, 2.5);
gui.add(Tree4.position, "x").min(-5).max(5).step(0.01).name("tree4 x");
gui.add(Tree4.position, "z").min(-5).max(5).step(0.01).name("tree4 z");

const Tree5 = new THREE.Group();
Tree5.position.set(-1, 0, -3);
gui.add(Tree5.position, "x").min(-5).max(5).step(0.01).name("tree5 x");
gui.add(Tree5.position, "z").min(-5).max(5).step(0.01).name("tree5 z");

scene.add(Tree1, Tree2, Tree3, Tree4, Tree5);

// wood
const treeWoodMaterial = new THREE.MeshStandardMaterial({
     color: params.treeWoodColor,
});
const bigTreeWoodGeo = new THREE.CylinderGeometry(0.22, 0.22, 1.1, 5);
const midTreeWoodGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.9, 5);
const smallTreeWoodGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 5);

const tree1Wood = new THREE.Mesh(midTreeWoodGeo, treeWoodMaterial);
tree1Wood.position.y = 0.45;
Tree1.add(tree1Wood);

const tree2Wood = new THREE.Mesh(midTreeWoodGeo, treeWoodMaterial);
tree2Wood.position.y = 0.45;
Tree2.add(tree2Wood);

const tree3Wood = new THREE.Mesh(smallTreeWoodGeo, treeWoodMaterial);
tree3Wood.position.y = 0.4;
Tree3.add(tree3Wood);

const tree4Wood = new THREE.Mesh(bigTreeWoodGeo, treeWoodMaterial);
tree4Wood.position.y = 0.55;
Tree4.add(tree4Wood);

const tree5Wood = new THREE.Mesh(bigTreeWoodGeo, treeWoodMaterial);
tree5Wood.position.y = 0.55;
Tree5.add(tree5Wood);

// leaf

const treeLeafMaterial = new THREE.MeshStandardMaterial({
     color: params.treeLeafColor,
});
const bigTreeLeafGeo = new THREE.ConeGeometry(1, 2.2, 10);
const midTreeLeafGeo = new THREE.ConeGeometry(0.8, 2, 10);
const smallTreeLeafGeo = new THREE.ConeGeometry(0.6, 1.8, 10);

const tree1Leaf = new THREE.Mesh(midTreeLeafGeo, treeLeafMaterial);
tree1Leaf.position.y = 1 + 0.9; // half of leaf height + wood height
Tree1.add(tree1Leaf);

const tree2Leaf = new THREE.Mesh(midTreeLeafGeo, treeLeafMaterial);
tree2Leaf.position.y = 1 + 0.9; // half of leaf height + wood height
Tree2.add(tree2Leaf);

const tree3Leaf = new THREE.Mesh(smallTreeLeafGeo, treeLeafMaterial);
tree3Leaf.position.y = 0.9 + 0.8; // half of leaf height + wood height
Tree3.add(tree3Leaf);

const tree4Leaf = new THREE.Mesh(bigTreeLeafGeo, treeLeafMaterial);
tree4Leaf.position.y = 1.1 + 1.1; // half of leaf height + wood height
Tree4.add(tree4Leaf);

const tree5Leaf = new THREE.Mesh(bigTreeLeafGeo, treeLeafMaterial);
tree5Leaf.position.y = 1.1 + 1.1; // half of leaf height + wood height
Tree5.add(tree5Leaf);

/**
 * Stone
 */

const Stones = new THREE.Group();
Stones.position.set(-3.4, 0, 0);
Stones.rotation.y = 1.5;
gui.add(Stones.position, "x").min(-5).max(5).step(0.1).name("stones x");
gui.add(Stones.position, "z").min(-5).max(5).step(0.1).name("stones z");
gui.add(Stones.rotation, "y").min(-5).max(5).step(0.01).name("stones r y");

scene.add(Stones);

const stoneMaterial = new THREE.MeshStandardMaterial({
     color: params.stoneColor,
});

const stone1 = new THREE.Mesh(
     new THREE.TetrahedronGeometry(0.3, 2),
     stoneMaterial
);
stone1.position.y = 0.25;

const stone2 = new THREE.Mesh(
     new THREE.TetrahedronGeometry(0.42, 2),
     stoneMaterial
);
stone2.position.x = 0.7;
stone2.position.y = 0.25;
Stones.add(stone1, stone2);

// cloud
const clouds = new THREE.Group(); // store all clouds
scene.add(clouds);

const cloudMaterial = new THREE.MeshStandardMaterial({
     color: params.cloudColor,
});

for (let i = 0; i < 4; i++) {
     const cloud = new THREE.Group(); // stores one cloud's spheres]

     const angle = Math.random() * Math.PI * 2; // random position in circular path
     const radius = 3 + Math.random() * 2; // 3 to 5
     const x = Math.sin(angle) * radius;
     const z = Math.cos(angle) * radius;
     const y = 4 + Math.random() * 0.5;

     cloud.position.set(x, y, z);
     clouds.add(cloud);

     for (let j = 0; j < 5; j++) {
          const sphereX = (Math.random() - 0.5) * 0.8;
          const sphereY = (Math.random() - 0.5) * 0.2;
          const sphereR = [0.2, 0.25, 0.4, 0.3, 0.25];

          const sphere = new THREE.Mesh(
               new THREE.SphereGeometry(sphereR[j], 10),
               cloudMaterial
          );
          sphere.position.x = sphereX;
          sphere.position.y = sphereY;
          cloud.add(sphere);
     }
}

// sun
const sun = new THREE.Mesh(
     new THREE.SphereGeometry(0.5, 20),
     new THREE.MeshBasicMaterial({ color: params.sunColor })
);
sun.position.set(0, 8, 0);
scene.add(sun);

// moon
const moon = new THREE.Mesh(
     new THREE.SphereGeometry(0.5, 20),
     new THREE.MeshBasicMaterial({ color: params.moonColor })
);
moon.position.set(0, -8, 0);
scene.add(moon);

/**
 * Lights
 */

// ambient light
const ambientLight = new THREE.AmbientLight(params.ambientLightColor, 2);
scene.add(ambientLight);

// ambientLight gui
gui.add(ambientLight, "visible").name("ambientLight");
gui.add(ambientLight, "intensity").min(0).max(100).step(1).name("AL-intensity");
gui.addColor(params, "ambientLightColor").onChange(() => {
     ambientLight.color.set(params.ambientLightColor);
});

// sunlight
const sunlightIntensity = 10;
const sunlight = new THREE.DirectionalLight(
     params.sunlightColor,
     sunlightIntensity
);
sunlight.position.set(0, 8, 0);

// sunlight helper
const sunlightHelper = new THREE.DirectionalLightHelper(sunlight);
scene.add(sunlight);
// scene.add(sunlightHelper);

// sunlight gui
gui.add(sunlight, "visible").name("sunlight");
gui.add(sunlight, "intensity")
     .min(0)
     .max(500)
     .step(1)
     .name("sunlight-intensity");

gui.add(sunlight.position, "x").min(-20).max(20).step(1).name("sunlight p x");
gui.add(sunlight.position, "y").min(-20).max(20).step(1).name("sunlight p y");
gui.add(sunlight.position, "z").min(-20).max(20).step(1).name("sunlight p z");

gui.add(sunlight.rotation, "x")
     .min(-Math.PI)
     .max(Math.PI)
     .step(0.001)
     .name("sunlight r x");
gui.add(sunlight.rotation, "y")
     .min(-Math.PI)
     .max(Math.PI)
     .step(0.001)
     .name("sunlight r y");
gui.add(sunlight.rotation, "z")
     .min(-Math.PI)
     .max(Math.PI)
     .step(0.001)
     .name("sunlight r z");

gui.addColor(params, "sunlightColor").onChange(() => {
     sunlight.color.set(params.sunlightColor);
});

// moon light
const moonlightIntensity = 10;
const moonlight = new THREE.DirectionalLight(
     params.moonlightColor,
     moonlightIntensity
);
moonlight.position.set(0, -8, 0);

const moonlightHelper = new THREE.DirectionalLightHelper(moonlight);
scene.add(moonlight);
// scene.add( moonlightHelper);

// moonlight helpers
gui.add(moonlight, "visible").name("moonlight");
gui.addColor(params, "moonlightColor").onChange(() => {
     moonlight.color.set(params.moonlightColor);
});
gui.add(moonlight, "intensity")
     .min(0)
     .max(500)
     .step(1)
     .name("moonlight-intensity");

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
camera.position.x = 6;
camera.position.y = 3;
camera.position.z = -2;
gui.add(camera.position, "x").min(-20).max(20).step(1).name("camera x");
gui.add(camera.position, "y").min(-20).max(20).step(1).name("camera y");
gui.add(camera.position, "z").min(-20).max(20).step(1).name("camera z");

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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setClearColor(params.morningBgColor);

/**
 * Shadow
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

sunlight.castShadow = true;
moonlight.castShadow = true;

walls.castShadow = true;
roof.castShadow = true;

tree1Wood.castShadow = true;
tree2Wood.castShadow = true;
tree3Wood.castShadow = true;
tree4Wood.castShadow = true;
tree5Wood.castShadow = true;

tree1Leaf.castShadow = true;
tree2Leaf.castShadow = true;
tree3Leaf.castShadow = true;
tree4Leaf.castShadow = true;
tree5Leaf.castShadow = true;

stone1.castShadow = true;
stone2.castShadow = true;

floor.receiveShadow = true;

sunlight.shadow.mapSize.width = 256;
sunlight.shadow.mapSize.height = 256;
// sunlight.shadow.camera.far = 7;

moonlight.shadow.mapSize.width = 256;
moonlight.shadow.mapSize.height = 256;
// moonlight.shadow.camera.far = 7;

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

     // update light
     const sunlightAngle = elapsedTime * 0.2;
     const sunX = Math.sin(sunlightAngle) * 7;
     const sunY = Math.cos(sunlightAngle) * 7;

     sun.position.x = sunX;
     sun.position.y = sunY;
     sunlight.position.x = sunX;
     sunlight.position.y = sunY;

     moon.position.x = -sunX;
     moon.position.y = -sunY;
     moonlight.position.x = -sunX;
     moonlight.position.y = -sunY;

     // ? change light intensity based on light position
     function updateLightIntensity(light, intensity) {
          if (light.position.y < -1 && light.intensity >= 0) {
               light.intensity -= 0.5;
          } else if (light.position.y > -1 && light.intensity <= intensity) {
               light.intensity += 0.5;
          }
     }

     updateLightIntensity(sunlight, sunlightIntensity);
     updateLightIntensity(moonlight, moonlightIntensity);

     // ? change background color based on sunlight
     if (sunlight.position.y < 0) {
          renderer.setClearColor(params.nightBgColor);
     } else {
          renderer.setClearColor(params.morningBgColor);
     }

     // update controls
     controls.update();

     // renderer
     renderer.render(scene, camera);

     // Call tick again on the next frame
     window.requestAnimationFrame(tick);
};
tick();
