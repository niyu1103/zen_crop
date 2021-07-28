import * as THREE from '../../libs/three.module.js';
// import * as THREE from 'three'
import TriangleGeometory from './triangleGeometory'
import { modelData } from './modelData';
import { isMobileCheck } from '../helpers';

export default class Triangular extends THREE.Object3D {
  constructor() {
    super();
    this.triPos = modelData.triangle.pos;
    this.triangularScene = 0;
    this.easing = 0.04;
    this.points = [];
    this.triPointsPos = modelData.triangle.pointsPos;
    this.init();
  }

  init() {
    let pointPosA = [];
    if (isMobileCheck()) {
      pointPosA.push(this.triPointsPos[3]);
      pointPosA.push(this.triPointsPos[4]);
      pointPosA.push(this.triPointsPos[5]);
      console.log('triagular mobie ');
    } else {
      pointPosA.push(this.triPointsPos[0]);
      pointPosA.push(this.triPointsPos[1]);
      pointPosA.push(this.triPointsPos[2]);
    }
    // 三角錐上の表記名
    this.points = [
      {
        position: new THREE.Vector3(pointPosA[0].x, pointPosA[0].y, pointPosA[0].z),
        element: document.querySelector('.point-0')
      },
      {
        position: new THREE.Vector3(pointPosA[1].x, pointPosA[1].y, pointPosA[1].z),
        element: document.querySelector('.point-1')
      },
      {
        position: new THREE.Vector3(pointPosA[2].x, pointPosA[2].y, pointPosA[2].z),
        element: document.querySelector('.point-2')
      }
    ];
    // console.log('this.points: ' + JSON.stringify(this.points));
    // 三角錐の座標
    this.pos = new THREE.Vector3(
      this.triPos[0].x,
      this.triPos[0].y,
      this.triPos[0].z
    );
    // 三角錐の目的地
    this.targetPos = new THREE.Vector3(
      this.triPos[0].x,
      this.triPos[0].y,
      this.triPos[0].z
    );
    this.setup();
    this.recieveEvent();
    this.header = document.querySelector('header');
  }

  setup() {
    this.triangleGeometory = new TriangleGeometory();
    this.add(this.triangleGeometory);
    this.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.triangleGeometory.setScene(this.triangularScene);
  }

  recieveEvent() {
    document.addEventListener("about-main", () => {
      this.triangularScene = 0;
      this.triangleGeometory.setScene(this.triangularScene);
      this.setDarkTheme(false);
    });

    document.addEventListener("about-vision", () => {
      this.triangularScene = 1;
      this.triangleGeometory.setScene(this.triangularScene);
      this.setDarkTheme(false);

    });

    document.addEventListener("about-values", () => {
      this.triangularScene = 2;
      this.triangleGeometory.setScene(this.triangularScene);
      this.setDarkTheme(true);
      // console.log('triPos[2]' + JSON.stringify(this.triPos[2], null, 4));
    });

    document.addEventListener("about-philosophy", () => {
      this.triangularScene = 3;
      this.triangleGeometory.setScene(this.triangularScene);
      this.setDarkTheme(false);
      // console.log('triPos[3]' + JSON.stringify(this.triPos[3], null, 4));
    });
  }

  update() {
    // console.log(this.pos.x);
    this.triangleGeometory.update();
    if (this.triangularScene == 0) {
      this.targetPos = new THREE.Vector3(
        this.triPos[0].x,
        this.triPos[0].y,
        this.triPos[0].z,
      );

    } else if (this.triangularScene === 1) {
      this.targetPos = new THREE.Vector3(
        this.triPos[1].x,
        this.triPos[1].y,
        this.triPos[1].z,
      );
    } else if (this.triangularScene === 2) {
      this.targetPos = new THREE.Vector3(
        this.triPos[2].x,
        this.triPos[2].y,
        this.triPos[2].z,
      );
    } else if (this.triangularScene === 3) {
      this.targetPos = new THREE.Vector3(
        this.triPos[3].x,
        this.triPos[3].y,
        this.triPos[3].z,
      );
    }
    // easing
    let distanceX = this.targetPos.x - this.pos.x;
    let distanceY = this.targetPos.y - this.pos.y;
    let distanceZ = this.targetPos.z - this.pos.z;
    this.pos.x += distanceX * this.easing;
    this.pos.y += distanceY * this.easing;
    this.pos.z += distanceZ * this.easing;
    this.position.set(this.pos.x, this.pos.y, this.pos.z);
  }

  showPoints() {
    setTimeout(() => {
      for (const point of this.points) {
        point.element.classList.add('show');
      }
    }, 1000);
  }

  hidePoints() {
    for (const point of this.points) {
      point.element.classList.remove('show');
    }
  }

  setDarkTheme(mode) {
    if (mode) {
      this.header.classList.add('dark');
    } else {
      this.header.classList.remove('dark');
    }
  }

}
