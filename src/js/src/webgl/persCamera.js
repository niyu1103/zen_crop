import * as THREE from '../../libs/three.module.js';
// import * as THREE from 'three'
import { isMobileCheck } from '../helpers';
import { randomNum } from '../math';
import { modelData } from './modelData';

export default class persCamera extends THREE.PerspectiveCamera {
  constructor(angle, aspect, near, far) {
    super(angle, aspect, near, far);
    // super(75, width / height, 1, 1000);
    this.aspect = aspect;
    this.updateProjectionMatrix();
    this.camPos = [];
    this.camLook = modelData.camera.look;
    this.pos = new THREE.Vector3(0, 0, 0);
    this.look = new THREE.Vector3(0, 0, 0);
    this.aboutScene = 0;
    this.easing = 0.05;
    // helper
    // const cameraHelper = new THREE.CameraHelper(this);
    // this.add(cameraHelper);
    this.init();
  }

  init() {
    let pointPosA = [];
    if (!isMobileCheck()) {
      this.camPos.push(modelData.camera.pos[0]);
      this.camPos.push(modelData.camera.pos[1]);
      this.camPos.push(modelData.camera.pos[2]);
      this.camPos.push(modelData.camera.pos[3]);
      // pointPosA.push(this.triPointsPos[3]);
      // pointPosA.push(this.triPointsPos[4]);
      // pointPosA.push(this.triPointsPos[5]);
    } else {
      this.camPos.push(modelData.camera.pos[4]);
      this.camPos.push(modelData.camera.pos[5]);
      this.camPos.push(modelData.camera.pos[6]);
      this.camPos.push(modelData.camera.pos[7]);
    }
    this.camPos.push(modelData.camera.pos[8]);
    console.log('this.camPos: ' + JSON.stringify(this.camPos));
  }

  setup() {
    // this.lookPos = this.camLook[0];
    this.pos = new THREE.Vector3(
      this.camPos[2].x,
      this.camPos[2].y,
      this.camPos[2].z
    );
    this.look = new THREE.Vector3(
      this.camLook[0].x,
      this.camLook[0].y,
      this.camLook[0].z
    );
    this.targetPos = new THREE.Vector3(
      this.camPos[2].x,
      this.camPos[2].y,
      this.camPos[2].z
    );
    this.targetLook = new THREE.Vector3(
      this.camLook[0].x,
      this.camLook[0].y,
      this.camLook[0].z
    );

    this.recieveEvent();
  }

  recieveEvent() {
    document.addEventListener("about-main", () => {
      this.aboutScene = 0;
      // console.log('rec:PerCam about main animation');
    });

    document.addEventListener("about-vision", () => {
      this.aboutScene = 1;
      // console.log('rec:PerCam about vision animation');
    });

    document.addEventListener("about-values", () => {
      this.aboutScene = 2;
      // console.log('rec:PerCam about value animation');
      // console.log('camPos[5]' + JSON.stringify(this.camPos[5], null, 4));
      // console.log('camPos[6]' + JSON.stringify(this.camPos[6], null, 4));
      // console.log('camLook[2]' + JSON.stringify(this.camLook[2], null, 4));
    });

    document.addEventListener("about-philosophy", () => {
      this.aboutScene = 3;
      // console.log('rec:PerCam about philosophy animation');
      console.log('camPos[3]' + JSON.stringify(this.camPos[3], null, 4));
      console.log('camLook[3]' + JSON.stringify(this.camLook[3], null, 4));
    });
  }

  update() {
    // console.log(this.aboutScene);
    if (this.aboutScene == 0) {
      this.targetPos = new THREE.Vector3(
        this.camPos[0].x,
        this.camPos[0].y,
        this.camPos[0].z,
      );
      this.targetLook = new THREE.Vector3(
        this.camLook[0].x,
        this.camLook[0].y,
        this.camLook[0].z,
      );

    } else if (this.aboutScene === 1) {
      this.targetPos = new THREE.Vector3(
        this.camPos[1].x,
        this.camPos[1].y,
        this.camPos[1].z,
      );
      this.targetLook = new THREE.Vector3(
        this.camLook[1].x,
        this.camLook[1].y,
        this.camLook[1].z,
      );
    } else if (this.aboutScene === 2) {
      this.targetPos = new THREE.Vector3(
        this.camPos[2].x,
        this.camPos[2].y,
        this.camPos[2].z,
      );
      this.targetLook = new THREE.Vector3(
        this.camLook[2].x,
        this.camLook[2].y,
        this.camLook[2].z,
      );
    } else if (this.aboutScene === 3) {
      this.targetPos = new THREE.Vector3(
        this.camPos[3].x,
        this.camPos[3].y,
        this.camPos[3].z,
      );
      this.targetLook = new THREE.Vector3(
        this.camLook[3].x,
        this.camLook[3].y,
        this.camLook[3].z,
      );
    }
    /*
    * Easing
    */

    let distanceX = this.targetPos.x - this.pos.x;
    let distanceY = this.targetPos.y - this.pos.y;
    let distanceZ = this.targetPos.z - this.pos.z;
    this.pos.x += distanceX * this.easing;
    this.pos.y += distanceY * this.easing;
    this.pos.z += distanceZ * this.easing;
    this.position.set(this.pos.x, this.pos.y, this.pos.z);
    let distanceLookX = this.targetLook.x - this.look.x;
    let distanceLookY = this.targetLook.y - this.look.y;
    let distanceLookZ = this.targetLook.z - this.look.z;
    this.look.x += distanceLookX * this.easing;
    this.look.y += distanceLookY * this.easing;
    this.look.z += distanceLookZ * this.easing;
    this.lookAt(new THREE.Vector3(this.look.x, this.look.y, this.look.z));
  }

  resize(sizeWidth, sizeHeight) {
    this.aspect = sizeWidth / sizeHeight;
    this.updateProjectionMatrix();
  }

  particleSetup() {
    this.position.set(this.camPos[4].x, this.camPos[4].y, this.camPos[4].z);
  }
}
