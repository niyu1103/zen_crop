import * as THREE from '../../libs/three.module.js';
// import * as THREE from 'three'
import { randomNum, mapNum } from '../math'
// import TWEEN from '@tweenjs/tween.js'
export default class Philosophy extends THREE.Object3D {

  constructor() {
    super();
    this.isVisible = false;
    this.easing = 0.08;
    this.init();
  }

  init() {
    this.mesh = [];
    this.pos = [];
    this.targetPos = [];
    this.distance = [];
    this.length = 200;
    this.geoSize = 40;
    this.sc01_start = [];
    this.sc01_end = [];
  }

  setup() {
    this.isVisible = true;
    this.group = new THREE.Group();
    const geometry = new THREE.BoxBufferGeometry(this.geoSize, this.geoSize * 0.8, this.geoSize);
    let mainColor = new THREE.Color(0xffffff);
    let emissiveColor = new THREE.Color(0xffffff);

    for (let i = 0; i < this.length; i++) {
      let randNumber = randomNum(30, 280);
      let mapNumber = mapNum(randNumber, 0, 360, 0, 1);
      mainColor.setHSL(mapNumber, 0.8, 0.8);
      emissiveColor.setHSL(mapNumber, 0.5, 0.4);
      // 直方体を作成
      // const material = new THREE.MeshNormalMaterial();
      const material = new THREE.MeshPhongMaterial({ color: mainColor, emissive: emissiveColor, side: THREE.DoubleSide, flatShading: true, transparent: true, opacity: 1 });
      // const material = new THREE.MeshLambertMaterial({ color: mainColor, emissive: emissiveColor, transparent: true, opacity: 1 });
      material.shininess = 50
      // material.wireframe = true
      // material.side = THREE.DoubleSide
      // material.flatShading = true
      let posX = ((Math.random() * 2) - 1) * 700;
      let posYEnd = ((Math.random() * 2) - 1) * 100 - 350;
      let posYStart = ((Math.random() * 2) - 1) * 20 - 2000;
      let posZ = ((Math.random() * 2) - 1) * 700;

      this.pos[i] = {
        x: posX,
        y: posYStart,
        z: posZ,
      }

      this.targetPos[i] = {
        x: posX,
        y: posYEnd,
        z: posZ,
      }

      this.mesh[i] = new THREE.Mesh(geometry, material);
      this.mesh[i].position.set(this.pos[i].x, this.pos[i].y, this.pos[i].z);
      this.group.add(this.mesh[i]);
      // this.tween[i] = new TWEEN.Tween(this.pos[i])
      //   .to(this.posEnd[i], 2000)
      //   .delay(1100)
      //   .easing(TWEEN.Easing.Quadratic.InOut)
      //   .onUpdate(() => {
      //     // console.log(this.pos[i]);
      //     this.mesh[i].position.x = this.pos[i].x;
      //     this.mesh[i].position.y = this.pos[i].y;
      //     this.mesh[i].position.z = this.pos[i].z;
      //   }).onComplete(() => {
      //   }).start();
    }
    this.add(this.group);
  }

  update() {
    for (let i = 0; i < this.length; i++) {
      this.distance[i] = {};
      this.distance[i].x = this.targetPos[i].x - this.pos[i].x;
      this.distance[i].y = this.targetPos[i].y - this.pos[i].y;
      this.distance[i].z = this.targetPos[i].z - this.pos[i].z;
      this.pos[i].x += this.distance[i].x * this.easing;
      this.pos[i].y += this.distance[i].y * this.easing;
      this.pos[i].z += this.distance[i].z * this.easing;
      this.mesh[i].position.set(this.pos[i].x, this.pos[i].y, this.pos[i].z);
    }
    this.group.rotation.y += 0.001;
  }

  destroy() {
    this.isVisible = false;
    // for (let i = 0; i < this.length; i++) {
    //   this.targetPos[i].x = 0;
    //   this.targetPos[i].y = 0;
    //   this.targetPos[i].z = 0;

    // TweenJS ------------------------------
    // this.tweenB[i] = new TWEEN.Tween(this.posEnd[i])
    //   .to(this.pos[i], 2000)
    //   .delay(1100)
    //   .easing(TWEEN.Easing.Quadratic.InOut)
    //   .onUpdate(() => {
    //     // console.log(this.pos[i]);
    //     this.mesh[i].position.x = this.posEnd[i].x;
    //     this.mesh[i].position.y = this.posEnd[i].y;
    //     this.mesh[i].position.z = this.posEnd[i].Z;

    //   }).onComplete(() => {
    //     this.remove(this.group);
    //     this.mesh[i].geometry.dispose();
    //     this.mesh[i].material.dispose();
    //   }).start();
    // }
    console.log('value destroy');
    this.remove(this.group);
    for (let i = 0; i < this.length; i++) {
      this.mesh[i].geometry.dispose();
      this.mesh[i].material.dispose();
    }
  }
}
