// import * as THREE from '../../libs/three.module.js';
import * as THREE from 'three'
import gsap from 'gsap'
import { isHomeCheck, isMobileCheck, isAboutCheck } from '../helpers';
import { randomNum } from '../math';
import { modelData } from './modelData';

export default class persCamera extends THREE.PerspectiveCamera {
  constructor(angle, aspect, near, far) {
    // let width;
    // let height;

    // if (isHomeCheck()) {
    //   width = modelData.canvasSize.home.width;
    //   height = modelData.canvasSize.home.height;
    // } else if (isAboutCheck) {
    //   width = modelData.canvasSize.about.width;
    //   height = modelData.canvasSize.about.height;
    // }
    //  = modelData.canvasSize.home.width;
    // const height = modelData.canvasSize.home.height;
    super(angle, aspect, near, far);
    // super(75, width / height, 1, 1000);
    this.aspect = aspect;
    this.updateProjectionMatrix();

    this.camPos = modelData.camera.pos;
    this.camLook = modelData.camera.look;
    this.targetCamPos = {};
    this.pos = {};
    this.aboutScene = 0;
    this.easing = 0.05;
    // helper
    // const cameraHelper = new THREE.CameraHelper(this);
    // this.add(cameraHelper);
  }

  setup() {
    this.lookPos = this.camLook[0];
    // if (isHomeCheck()) {
    this.position.set(this.camPos[2].x, this.camPos[2].y, this.camPos[2].z);
    // }


    // if (isAboutCheck()) {
    //   if (!this.aboutSceneReady) {
    //     this.position.set(this.camPos[0].x, this.camPos[0].y, this.camPos[0].z);
    //     const start_tl = gsap.timeline();
    //     start_tl.to(this.position, {
    //       duration: 1.4,
    //       delay: 0.6,
    //       // ease: "power2.out",
    //       x: this.camPos[1].x,
    //       y: this.camPos[1].y,
    //       z: this.camPos[1].z
    //     }).to(this.position, {
    //       duration: 1.2,
    //       delay: 0.3,
    //       ease: "power2.out",
    //       x: this.camPos[2].x,
    //       y: this.camPos[2].y,
    //       z: this.camPos[2].z,
    //       onComplete: () => {
    //         this.aboutSceneReady = true;
    //         // console.log(this.position);
    //         // console.log(this.rotation);
    //       }
    //     })
    //   }
    // }



    document.addEventListener("about-main", () => {
      // this.position.set(this.camPos[0].x, this.camPos[0].y, this.camPos[0].z);
      if (this.aboutSceneReady) {
        const sc01_tl = gsap.timeline();
        console.log('rec:PerCam about main animation');
        sc01_tl.to(this.position, {
          duration: 1.6,
          delay: 0.3,
          ease: "power2.out",
          x: this.camPos[2].x,
          y: this.camPos[2].y,
          z: this.camPos[2].z,
          onComplete: () => {
            // console.log(this.position);
            // console.log(this.rotation);
            // this.rotation.y = 0;
            this.aboutSceneReady = true;
          }
        }).add(this.lookPos, {
          duration: 1.8,
          delay: 0.4,
          ease: "power2.out",
          x: this.camLook[0].x,
          y: this.camLook[0].y,
          z: this.camLook[0].z,
        });
      }
    });

    document.addEventListener("about-vision", () => {
      console.log('rec:PerCam about vision animation');
      // console.log('camPos[3]' + JSON.stringify(this.camPos[3], null, 4));
      // console.log('camPos[4]' + JSON.stringify(this.camPos[4], null, 4));
      // console.log('camLook[1]' + JSON.stringify(this.camPos[4], null, 4));
      const sc02_tl = gsap.timeline();
      sc02_tl.to(this.position, {
        duration: 1.8,
        delay: 0,
        ease: "power2.out",
        x: this.camPos[3].x,
        y: this.camPos[3].y,
        z: this.camPos[3].z,
      }).add(this.lookPos, {
        duration: 1.8,
        delay: 0.4,
        ease: "power2.out",
        x: this.camLook[1].x,
        y: this.camLook[1].y,
        z: this.camLook[1].z,
      }).to(this.position, {
        duration: 1.8,
        delay: 0.4,
        ease: "power2.out",
        x: this.camPos[4].x,
        y: this.camPos[4].y,
        z: this.camPos[4].z,
        onComplete: () => {
          // console.log(this.position);
          // console.log(this.rotation);
        }
      })
    });

    document.addEventListener("about-values", () => {
      console.log('rec:PerCam about value animation');
      console.log('camPos[5]' + JSON.stringify(this.camPos[5], null, 4));
      console.log('camPos[6]' + JSON.stringify(this.camPos[6], null, 4));
      console.log('camLook[2]' + JSON.stringify(this.camLook[2], null, 4));
      const sc03_tl = gsap.timeline();
      sc03_tl.to(this.position, {
        duration: 1.8,
        delay: 0.4,
        ease: "power2.out",
        x: this.camPos[5].x,
        y: this.camPos[5].y,
        z: this.camPos[5].z,
      }).add(this.lookPos, {
        duration: 1.8,
        delay: 0.4,
        ease: "power2.out",
        x: this.camLook[2].x,
        y: this.camLook[2].y,
        z: this.camLook[2].z,
      }).to(this.position, {
        duration: 2.2,
        delay: 0.4,
        ease: "power2.out",
        x: this.camPos[6].x,
        y: this.camPos[6].y,
        z: this.camPos[6].z,
        onComplete: () => {
          console.log(this.position);
          console.log(this.rotation);
        }
      })
    });

    document.addEventListener("about-philosophy", () => {
      console.log('rec:PerCam about philosophy animation');
      console.log('camPos[7]' + JSON.stringify(this.camPos[7], null, 4));
      console.log('camPos[8]' + JSON.stringify(this.camPos[8], null, 4));
      console.log('camLook[3]' + JSON.stringify(this.camLook[3], null, 4));
      const sc04_tl = gsap.timeline();
      sc04_tl.to(this.position, {
        duration: 1.8,
        delay: 0,
        ease: "power2.out",
        x: this.camPos[7].x,
        y: this.camPos[7].y,
        z: this.camPos[7].z,
      }).add(this.lookPos, {
        duration: 1.8,
        delay: 0.4,
        ease: "power2.out",
        x: this.camLook[3].x,
        y: this.camLook[3].y,
        z: this.camLook[3].z,
      }).to(this.position, {
        duration: 1.8,
        delay: 0.4,
        ease: "power2.out",
        x: this.camPos[8].x,
        y: this.camPos[8].y,
        z: this.camPos[8].z,
        onComplete: () => {
          console.log(this.position);
          console.log(this.rotation);
        }
      })
    });
  }

  update() {
    this.lookAt(new THREE.Vector3(this.lookPos.x, this.lookPos.y, this.lookPos.z));
    if (this.aboutScene = 0) {
      this.targetCamPos.x = this.camPos0[2].x;
      this.targetCamPos.y = this.camPos0[2].y;
      this.targetCamPos.z = this.camPos0[2].z;
    } else if (this.aboutScene = 1) {
      this.targetCamPos.x = this.camPos0[3].x;
      this.targetCamPos.y = this.camPos0[3].y;
      this.targetCamPos.z = this.camPos0[4].z;
    }


    this.pos.x += (this.targetCamPos.x - this.pos.x) * this.easing;
    this.pos.y += (this.targetCamPos.y - this.pos.x) * this.easing;
    this.pos.z += (this.targetCamPos.z - this.pos.x) * this.easing;
  }

  resize(sizeWidth, sizeHeight) {
    this.aspect = sizeWidth / sizeHeight;
    this.updateProjectionMatrix();
  }

  particleSetup() {
    this.position.set(this.camPos[9].x, this.camPos[9].y, this.camPos[9].z);
  }
}
