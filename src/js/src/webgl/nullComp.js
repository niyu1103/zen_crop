import * as THREE from '../../libs/three.module.js';
// import * as THREE from 'three'
import { modelData } from './modelData';

export default class NullComp extends THREE.Object3D {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.pos = modelData.camera.look;
  }

  setup() {
    this.geometry = new THREE.BoxGeometry(3, 3, 3);
    this.material = new THREE.MeshNormalMaterial();
    // this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.add(this.mesh);

    document.addEventListener("about-main", () => {
      console.log('rec:NullComp about main');
    });

    document.addEventListener("about-vision", () => {
      // console.log('rec:NullComp about vision');
    });

    document.addEventListener("about-values", () => {
      // console.log('rec:NullComp about value');
    });

    document.addEventListener("about-philosophy", () => {
      // console.log('rec:NullComp about philosophy');
    });
  }
  update() {
  }
  destroy() {
    this.remove(this.mesh);
    this.geometry.dispose();
    this.material.dispose();
  }
}
