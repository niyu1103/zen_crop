
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl');
// Scene
const scene = new THREE.Scene();


/**
 * Particles Pattern 2
 */
const particlesGeometry = new THREE.BufferGeometry();
const separation = 50;
const countX = 50;
const countY = 50;
const countZ = 10;
const positions = new Float32Array(countX * countY * countZ * 3);

let i = 0;
for (let ix = 0; ix < countX; ix++) {
  for (let iy = 0; iy < countY; iy++) {
    for (let iz = 0; iz < countZ; iz++) {
      //頂点座標の設定
      positions[i * 3] = ix * separation - ((countX * separation) / 2);
      positions[i * 3 + 1] = iz * separation - ((countZ * separation) / 2);
      positions[i * 3 + 2] = iy * separation - ((countY * separation) / 2);
      //頂点の大きさの設定
      i++;
    }
  }
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 1;
particlesMaterial.sizeAttenuation = true;
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// this.particles = new THREE.Mesh(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.y = 50;
camera.position.z = 400;
scene.add(camera);



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animation Particle
  particles.rotation.x += 0.002;
  particles.rotation.z += 0.002;


  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

tick();
