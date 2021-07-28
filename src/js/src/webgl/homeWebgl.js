// import * as THREE from 'three'
import * as THREE from '../../libs/three.module.js';
import { modelData } from './modelData';
import PersCamera from './persCamera.js';
import { isMobileCheck } from '../helpers';

import Triangular from './triangular'

export default class HomeWebGl {
  constructor() {
    this.renderer, this.camera, this.scene, this.canvas;
    this.bgColor = modelData.background.colors;
    this.camPos = modelData.camera.pos;
    this.camLook = modelData.camera.look;
    this.sceneCount = 0;
    this.sceneReady = false;
    this.frameCount = 0;
    // this.isMobileCheck = isMobileCheck();
    this.canvasSize = {};
  }

  init() {
    this.setup();
    this.createScene();
    this.createCamera();
    this.createTriangular();
    this.addDirectionalLight(0xffffff, { x: 25, y: 0, z: 25 });
    this.addDirectionalLight(0xffffff, { x: 0, y: 70, z: 0 });
    this.addDirectionalLight(0xffffff, { x: -25, y: -50, z: -25 });
    this.tick();
  }

  setup() {
    if (!isMobileCheck()) {
      this.sizes = {
        width: modelData.canvasSize.home.width,
        height: modelData.canvasSize.home.height
      };
    } else {
      this.sizes = {
        width: modelData.canvasSize.about.width,
        height: modelData.canvasSize.about.height
      };
    }
    // console.log(this.sizes);
  }

  createScene() {
    this.canvas = document.querySelector('canvas.webgl')
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    })
    this.renderer.setClearColor(new THREE.Color(this.bgColor[0]), 1.0);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(2);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  createCamera() {
    this.camera = new PersCamera(75, this.sizes.width / this.sizes.height, 1, 1000);
    this.scene.add(this.camera);
    this.camera.setup();
  }

  addDirectionalLight(color, position) {
    const directionalLight = new THREE.DirectionalLight(color, 0.8);
    directionalLight.position.set(position.x, position.y, position.z);
    this.scene.add(directionalLight);
  }

  createTriangular() {
    this.triangular = new Triangular();
    this.scene.add(this.triangular);
    this.sceneReady = true;
  }

  update() {
    this.triangular.update();
  }

  tick() {
    this.camera.update();
    requestAnimationFrame(() => this.tick());
    this.frameCount += 1;
    // FPSを30に
    if (this.frameCount % 2) {
      return;
    }

    this.renderer.render(this.scene, this.camera);
    this.update();
  }
}
