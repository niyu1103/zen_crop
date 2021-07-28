import * as THREE from '../../libs/three.module.js';
// import * as THREE from 'three'
import { modelData } from './modelData';
import { isMobileCheck } from '../helpers';


export default class TriangleGeometory extends THREE.Object3D {
  constructor() {
    super();
    this.materialColors = modelData.triangle.colors;
    this.group;
    this.init();
  }

  init() {
    this.group = new THREE.Group();
    this.topGeometry = new THREE.CylinderGeometry(24, 16, 10, 8);
    this.middleGeometry = new THREE.CylinderGeometry(16, 8, 10, 8);
    this.bottomGeometry = new THREE.CylinderGeometry(8, 0.1, 10, 8);
    // this.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, opacity: 1 });
    this.meshMaterial01 = new THREE.MeshPhongMaterial({ color: this.materialColors[0].main, emissive: this.materialColors[0].emissive, transparent: true, opacity: 1 });
    this.meshMaterial02 = new THREE.MeshPhongMaterial({ color: this.materialColors[1].main, emissive: this.materialColors[1].emissive, transparent: true, opacity: 1 });
    this.meshMaterial03 = new THREE.MeshPhongMaterial({ color: this.materialColors[2].main, emissive: this.materialColors[2].emissive, transparent: true, opacity: 1 });
    // this.meshMaterial = new THREE.MeshBasicMaterial({ color: 0x156289 });
    this.topeMesh = new THREE.Mesh(this.topGeometry, this.meshMaterial01);
    this.middleMesh = new THREE.Mesh(this.middleGeometry, this.meshMaterial02);
    this.bottomMesh = new THREE.Mesh(this.bottomGeometry, this.meshMaterial03);
    this.topeMesh.position.y = 24;
    this.middleMesh.position.y = 12;

    this.bottomLine = new THREE.LineSegments(this.bottomGeometry, this.lineMaterial);
    this.middleLine = new THREE.LineSegments(this.middleGeometry, this.lineMaterial);
    this.topLine = new THREE.LineSegments(this.topGeometry, this.lineMaterial);
    this.topLine.position.y = 24;
    this.middleLine.position.y = 12;
    this.group.add(this.bottomMesh);
    this.group.add(this.middleMesh);
    this.group.add(this.topeMesh);
    this.group.add(this.bottomLine);
    this.group.add(this.middleLine);
    this.group.add(this.topLine);
    // this.group.add(new THREE.LineSegments(geometry, lineMaterial));
    // group.rotation.x = Math.PI;
    // this.group.position.x = 0;
    // this.group.position.y = -13;
    this.add(this.group);


    if (isMobileCheck()) {
      // this.group.scale.x = 0.85;
      // this.group.scale.y = 0.85;
      // this.group.scale.z = 0.85;
    }


  }

  setScene(_scene) {
    this.scene = _scene;
    const materialAlpha = 0.2;

    if (this.scene == 1) {
      this.meshMaterial01.opacity = 1;
      this.meshMaterial02.opacity = materialAlpha;
      this.meshMaterial03.opacity = materialAlpha;
    } else if (this.scene == 2) {
      this.meshMaterial01.opacity = materialAlpha;
      this.meshMaterial02.opacity = 1;
      this.meshMaterial03.opacity = materialAlpha;
    } else if (this.scene == 3) {
      this.meshMaterial01.opacity = materialAlpha;
      this.meshMaterial02.opacity = materialAlpha;
      this.meshMaterial03.opacity = 1;
    } else {
      this.meshMaterial01.opacity = 1;
      this.meshMaterial02.opacity = 1;
      this.meshMaterial03.opacity = 1;
    }
  }

  update() {
    this.group.rotation.y += 0.004;
  }

}
