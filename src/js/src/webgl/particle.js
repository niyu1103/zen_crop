import { isHomeCheck, isMobileCheck, isAboutCheck } from '../helpers';
// import * as THREE from 'three'
import * as THREE from '../../libs/three.module.js';
import { modelData } from './modelData';
import PersCamera from './persCamera.js';
// import { randomNum } from '../math';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
// import Stats from 'stats.js'

export default class Particle {
  constructor() {
    this.renderer, this.camera, this.scene, this.canvas;
    this.camPos = modelData.camera.pos;
    this.frameCount = 0;
    this.bgColor = 0x072534;
    this.particleColor = 0xEEFFFF;
  }

  init() {
    this.setup();
    this.createScene();
    this.createCamera();
    this.addParticle();
    this.addEvent();
    this.tick();
  }

  setup() {
    this.sizes = {
      width: window.innerWidth,
      height: 640
    };
  }

  createScene() {
    this.canvas = document.querySelector('canvas.particle')
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })
    this.renderer.setClearColor(new THREE.Color(this.bgColor), 1.0);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(2);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  createCamera() {
    this.camera = new PersCamera();
    this.scene.add(this.camera);
    this.camera.resize(this.sizes.width, this.sizes.height);
    this.camera.particleSetup();
  }

  addAmbientLight() {
    // const light = new THREE.AmbientLight('#ffffff', 1);
    // this.scene.add(light);
  }

  addDirectionalLight(color, position) {
    // const directionalLight = new THREE.DirectionalLight(color, 0.8);
    // directionalLight.position.set(position.x, position.y, position.z);
    // this.scene.add(directionalLight);
  }

  addParticle() {
    /**
    * Particles
    */
    // Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 500;
    const separation = 30;
    const amountX = 50;
    const amountY = 50;
    const amountZ = 10;
    const particleNum = amountX * amountY * amountZ;
    const positions = new Float32Array(particleNum * 3);

    let i = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        for (let iz = 0; iz < amountZ; iz++) {
          //頂点座標の設定
          positions[i * 3] = ix * separation - ((amountX * separation) / 2);
          positions[i * 3 + 1] = iz * separation - ((amountZ * separation) / 2);
          positions[i * 3 + 2] = iy * separation - ((amountY * separation) / 2);
          //頂点の大きさの設定
          i++;
        }
      }
    }


    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    // const particlesGeometry = new THREE.SphereGeometry(32, 32, 32);
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 1,
      color: this.particleColor
    });
    // particlesMaterial.size = 1;
    // particlesMaterial.color = 0x333333;
    // particlesMaterial.sizeAttenuation = true;
    // Points
    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);

    this.scene.add(this.particles);
  }

  update() {
    this.particles.rotation.x += 0.002;
    this.particles.rotation.z += 0.002;
  }

  addEvent() {
    window.addEventListener('resize', this.onResize.bind(this));
  }


  onResize() {
    console.log('particle resize');
    this.sizes.width = window.innerWidth;
    // this.sizes.height = window.innerHeight;
    this.camera.resize(this.sizes.width, this.sizes.height);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }


  tick() {
    requestAnimationFrame(() => this.tick());
    this.frameCount += 1;
    // FPSを30に
    if (this.frameCount % 2) {
      return;
    }
    this.renderer.render(this.scene, this.camera);
    // this.renderer.autoClear = true;
    this.update();
  }
}
