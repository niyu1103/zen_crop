import * as THREE from '../../libs/three.module.js';
// import * as THREE from 'three'

export default class Values extends THREE.Object3D {

  constructor() {
    super();
    this.values = [];
    this.length = 5;
    this.easing = 0.02;
    this.isVisible = false;
    this.init();
    this.frameCount = 0;
    this.lengthCount = 0;
  }
  init() {
    this.valueList = document.querySelector('.value-list');
    // this.cloneValueEl = this.valueList.cloneNode(true);
    this.overlay = document.querySelector('.overlay');
    this.addEvent();
    this.startScale = new THREE.Vector3(0, 0, 0);
    this.targetScale = new THREE.Vector3(1, 1, 1);
  }

  setup() {
    this.isVisible = true;
    this.geometry = new THREE.IcosahedronGeometry(8, 1);
    // this.bgGeometry = new THREE.IcosahedronGeometry(160, 8);
    this.material = new THREE.MeshNormalMaterial();
    this.material.wireframe = true;
    this.material.transparent = true;
    this.material.side = THREE.DoubleSide;

    // this.bgMesh = new THREE.Mesh(this.bgGeometry, this.material);
    // this.bgMesh.position.y = -100;
    // this.add(this.bgMesh);
    const values_tl = [];
    for (let i = 0; i < this.length; i++) {
      // 直方体を作成
      // material.flatShading = true
      this.values[i] = new THREE.Mesh(this.geometry, this.material);
      // 配置座標を計算
      const radian = (i / this.length) * Math.PI * 2;
      this.values[i].position.set(
        21 * Math.cos(radian), // X座標
        0, // Y座標
        21 * Math.sin(radian) // Z座標
      );
      // グループに追加する
      this.add(this.values[i]);
      this.values[i].rotation.z = i * 10;
      this.values[i].rotation.x = i * 10;
      this.values[i].scale.x = this.startScale.x;
      this.values[i].scale.y = this.startScale.y;
      this.values[i].scale.z = this.startScale.z;
      this.values[i].material.opacity = 0.5;
      this.position.x = 20;
      this.position.y = -10;
      this.position.z = 20;
    }
  }

  addEvent() {
    document.querySelector('.moreValue').addEventListener('click', (e) => {
      e.preventDefault();
      this.overlay.classList.add('show');
      // this.addModal();
    });
    document.querySelector('.overlay-nav').addEventListener('click', () => {
      this.overlay.classList.remove('show');
      // this.removeModal();
    });
  }

  addModal() {
    // const cloneHeaderNavEl = this.headerNav.cloneNode(true);
    // this.overlay.appendChild(this.cloneValueEl);
    // this.overlay.appendChild(cloneHeaderNavEl);
  }
  removeModal() {
    // this.overlay.removeChild(this.cloneValueEl);
  }

  update() {

    for (let i = 0; i < this.length; i++) {
      let distanceX = this.targetScale.x - this.startScale.x;
      let distanceY = this.targetScale.y - this.startScale.y;
      let distanceZ = this.targetScale.z - this.startScale.z;
      // console.log(distanceX);
      this.startScale.x += distanceX * this.easing;
      this.startScale.y += distanceY * this.easing;
      this.startScale.z += distanceZ * this.easing;
      // console.log(i / 10);
      this.values[i].scale.x = this.startScale.x;
      this.values[i].scale.y = this.startScale.y;
      this.values[i].scale.z = this.startScale.z;
      this.values[i].rotation.z += 0.005;
      this.values[i].rotation.x += 0.005;
    }
  }

  destroy() {
    this.isVisible = false;
    for (let i = 0; i < this.length; i++) {
      this.remove(this.values[i]);
      this.values[i].geometry.dispose();
      this.values[i].material.dispose();
    }
  }
}
