import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const rendered = new THREE.WebGLRenderer({antialias: true});
rendered.setSize(w, h);
document.body.appendChild(rendered.domElement);

const fov = 100;
const aspect = w / h;
const near = 0.1;
const far = 10000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, rendered.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true
});

const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0x00aa55);
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  rendered.render(scene, camera);
  controls.update();
}

animate();