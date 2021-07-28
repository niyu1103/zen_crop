
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
 * Particles Pattern
 */

const r = 10;
const geometry = new THREE.BoxGeometry(r, r, r);
const material = new THREE.MeshBasicMaterial();
const box = new THREE.Mesh(geometry, material);

//BoxHelperを生成
const frameBox = new THREE.BoxHelper(box, 0xffffff);
scene.add(frameBox);



const particleNum = 20;
const pointMaterial = new THREE.PointsMaterial();
//最大速度の設定
const maxVelocity = 0.1;
let pointCloud;

//速度用の配列
const particleVelocity = [];
const particlePositions = new Float32Array(particleNum * 3);

for (let i = 0; i < particleNum; i++) {

  //頂点座標（x、y、z）を設定
  particlePositions[i * 3] = Math.random() * r - r / 2.0;
  particlePositions[i * 3 + 1] = Math.random() * r - r / 2.0;
  particlePositions[i * 3 + 2] = Math.random() * r - r / 2.0;

  //速度（x、y、z）を設定
  particleVelocity[i] = new THREE.Vector3();
  particleVelocity[i].x = -1 + Math.random() * 2.0;
  particleVelocity[i].y = -1 + Math.random() * 2.0;
  particleVelocity[i].z = -1 + Math.random() * 2.0;

  //速度の調整
  particleVelocity[i].multiplyScalar(maxVelocity / Math.sqrt(3.0));
}

//バッファーオブジェクトを生成
const particles = new THREE.BufferGeometry();

//バッファーオブジェクトのattributeに頂点座標を設定
particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

//頂点の生成
pointCloud = new THREE.Points(particles, pointMaterial);
scene.add(pointCloud);

//線の頂点数の設定
const segments = particleNum * particleNum;
//型付配列で線の頂点座標を設定
const positions = new Float32Array(segments * 3);
const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xFFFFFF
});
//LineSegmentsで線を生成
lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(lineMesh);


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
camera.position.z = 40;
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
  const rHalf = r / 2.0;
  let vertexpos = 0;
  //頂点座標を取得
  const particlePositions = pointCloud.geometry.attributes.position.array;
  for (let i = 0; i < particleNum; i++) {

    //頂点座標に速度を加算
    particlePositions[i * 3] += particleVelocity[i].x;
    particlePositions[i * 3 + 1] += particleVelocity[i].y;
    particlePositions[i * 3 + 2] += particleVelocity[i].z;

    //立方体フレームの外側に移動した場合に速度を反転
    if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf) {
      particleVelocity[i].x *= -1;
    }
    if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf) {
      particleVelocity[i].y *= -1;
    }
    if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf) {
      particleVelocity[i].z *= -1;
    }
    //線の頂点座標に速度を加算
    for (let j = i + 1; j < particleNum; j++) {
      let linePositions = lineMesh.geometry.attributes.position.array;
      linePositions[vertexpos++] = particlePositions[i * 3];
      linePositions[vertexpos++] = particlePositions[i * 3 + 1];
      linePositions[vertexpos++] = particlePositions[i * 3 + 2];

      linePositions[vertexpos++] = particlePositions[j * 3];
      linePositions[vertexpos++] = particlePositions[j * 3 + 1];
      linePositions[vertexpos++] = particlePositions[j * 3 + 2];
    }
  }
  //更新を通知するフラグ
  pointCloud.geometry.attributes.position.needsUpdate = true;
  lineMesh.geometry.attributes.position.needsUpdate = true;

  // Render
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
}

tick();
