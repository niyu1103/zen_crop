
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
 * Particles Pattern 1
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;
const positions = new Float32Array(count * 3);
const vertices = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) // Multiply by 3 for same reason
{
  const i3 = i * 3

  positions[i3] = (Math.random() - 0.5) * 20;
  positions[i3 + 1] = (Math.random() - 0.5) * 20;
  positions[i3 + 2] = (Math.random() - 0.5) * 20;

  vertices[i3] = (Math.random() - 0.5) * 1;
  vertices[i3 + 1] = (Math.random() - 0.5) * 1;
  vertices[i3 + 2] = (Math.random() - 0.5) * 1;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('vertices', new THREE.BufferAttribute(vertices, 3));

const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.02;
particlesMaterial.sizeAttenuation = true;
particlesMaterial.color = new THREE.Color('#ffffff');
particlesMaterial.depthTest = false;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
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
camera.position.y = 10;
camera.position.z = 50;
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

  // Update particles
  const particlePosition = particles.geometry.attributes.position.array;
  const particleVertices = particles.geometry.attributes.vertices.array;


  for (let i = 0; i < particlePosition.length * 3; i++) // Multiply by 3 for same reason
  {
    const i3 = i * 3
    particlePosition[i3] -= particleVertices[i3];
    particlePosition[i3 + 1] += particleVertices[i3 + 1];
    particlePosition[i3 + 2] -= particleVertices[i3 + 2];
  }


  particles.geometry.attributes.position.needsUpdate = true;
  particles.geometry.attributes.vertices.needsUpdate = true;



  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

tick();
