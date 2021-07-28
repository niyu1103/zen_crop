import { isHomeCheck, isMobileCheck, isAboutCheck, uA } from '../helpers';
// import * as THREE from 'three'
import * as THREE from '../../libs/three.module.js';
import { modelData } from './modelData';
import PersCamera from './persCamera.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Triangular from './triangular'
import Sea from './sea'
import Values from './values'
import Philosophy from './philosophy'
// import * as dat from 'dat.gui'
// import Stats from 'stats.js'
// import NullComp from './nullComp';
import AboutusNav from './aboutusNav';

export default class WebGl {
  constructor() {
    this.renderer, this.camera, this.scene, this.canvas;
    // this.controls;
    // this.clock;
    // this.mainScroll;
    // this.triangular, this.sea;
    // this.easing = 0.05; //カメラアニメーションのイージング
    // this.targetCamPos = new THREE.Vector3(0, 0, 0); //カメラの目的地
    // this.clock = new THREE.Clock()
    this.bgColor = modelData.background.colors;
    this.camPos = modelData.camera.pos;
    this.camLook = modelData.camera.look;
    this.sceneCount = 0;
    this.sceneReady = false;
    this.frameCount = 0;
    this.isIE = uA.isIEChieck();
  }

  init() {
    this.setup();

    if (!this.isIE) {
      this.createScene();
      this.createCamera();
      this.createTriangular();
      this.createSceneObject();
      this.addDirectionalLight(0xffffff, { x: 25, y: 0, z: 25 });
      this.addDirectionalLight(0xffffff, { x: 0, y: 70, z: 0 });
      this.addDirectionalLight(0xffffff, { x: -25, y: -50, z: -25 });
      this.tick();
    }

    this.addEvent();
    this.recieveEvent();
    // this.addPointLight(0xffffff, { x: 25, y: 0, z: 25 });
    // this.addPointLight(0xffffff, { x: 0, y: 70, z: 0 });
    // this.addPointLight(0xffffff, { x: -25, y: -50, z: -25 });
    // this.addOrbitControls();
    // this.addHelper();
    // this.addDebug();
  }

  setup() {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.aboutusNav = new AboutusNav();
    console.log(this.sizes);
    this.setSection();
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
    this.renderer.shadowMap.autoUpdate = false
    this.renderer.shadowMap.needsUpdate = true
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

  addPointLight(color, position) {
    // const light = new THREE.PointLight(color, 1, 1000, 1);
    // light.position.set(position.x, position.y, position.z);
    // this.scene.add(light);
    // //Helper
    // const sphereSize = 1;
    // const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
    // this.scene.add(pointLightHelper);
  }

  addAmbientLight() {
    // const light = new THREE.AmbientLight('#ffffff', 1);
    // this.scene.add(light);
  }

  setSection() {
    this.ids = ['main', 'vision', 'values', 'philosophy', 'footer'];
    this.aboutEl = [];
    for (let i = 0; i < this.ids.length; i++) {
      this.aboutEl[i] = document.querySelector('.aboutus-' + this.ids[i]);
    }
    // this.aboutEl = [
    //   document.querySelector('.aboutus-main'),
    //   document.querySelector('.aboutus-vision'),
    //   document.querySelector('.aboutus-values'),
    //   document.querySelector('.aboutus-philosophy'),
    //   document.querySelector('.aboutus-footer')
    // ];
  }


  addEvent() {
    window.addEventListener('resize', this.onResize.bind(this));
    this.aboutEvent = [];
    this.aboutEvent[0] = new Event("about-main", { bubbles: true });
    this.aboutEvent[1] = new Event("about-vision", { bubbles: true });
    this.aboutEvent[2] = new Event("about-values", { bubbles: true });
    this.aboutEvent[3] = new Event("about-philosophy", { bubbles: true });
    this.aboutEvent[4] = new Event("about-footer", { bubbles: true });
    //スクロールポイントの閾値
    const options = {
      threshold: [0.5],
      // rootMargin: "-50% 0px",
      // threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return
        } else {
          const targetId = entry.target.getAttribute('id');
          console.log('targetId:' + targetId);
          if (targetId === this.ids[0]) {
            // console.log(targetId);
            this.sceneCount = 0;
            this.aboutEl[0].dispatchEvent(this.aboutEvent[0]);
          } else if (targetId === this.ids[1]) {
            // console.log(targetId);
            this.sceneCount = 1;
            this.aboutEl[1].dispatchEvent(this.aboutEvent[1]);
          } else if (targetId === this.ids[2]) {
            // console.log(targetId);
            this.sceneCount = 2;
            this.aboutEl[2].dispatchEvent(this.aboutEvent[2]);
          } else if (targetId === this.ids[3]) {
            // console.log(targetId);
            this.sceneCount = 3;
            this.aboutEl[3].dispatchEvent(this.aboutEvent[3]);
          } else if (targetId === this.ids[4]) {
            // console.log(targetId);
            this.sceneCount = 4;
            this.aboutEl[4].dispatchEvent(this.aboutEvent[4]);
          }
        }
      });
    }, options);
    this.aboutEl.forEach(section => {
      observer.observe(section);
    });
  }

  recieveEvent() {
    document.addEventListener("about-main", (event) => {
      // console.log('event about main' + event);
      if (!this.isIE) {
        this.renderer.setClearColor(new THREE.Color(this.bgColor[0]), 1.0);
        if (this.sea.isVisible) {
          this.sea.destroy();
        }
        if (this.values.isVisible) {
          this.values.destroy();
        }
        if (this.philosophy.isVisible) {
          this.philosophy.destroy();
        }
        this.sceneReady = true;
        this.triangular.showPoints();
      }
      this.aboutusNav.scrollScene('about-main');
      this.aboutusNav.showNav();
      this.aboutusNav.showScrollDom();
      //Valueの背景を解除
      if (this.aboutEl[2].classList.contains('active')) {
        this.aboutEl[2].classList.remove('active');
      }
    });

    document.addEventListener("about-vision", () => {
      if (!this.isIE) {
        this.renderer.setClearColor(new THREE.Color(this.bgColor[0]), 1.0);
        if (!this.sea.isVisible) {
          this.sea.setup();
        }
        if (this.values.isVisible) {
          this.values.destroy();
        }
        if (this.philosophy.isVisible) {
          this.philosophy.destroy();
        }
        this.triangular.hidePoints();
      }
      this.aboutusNav.scrollScene('about-vision');
      this.aboutusNav.showNav();
      this.aboutusNav.showScrollDom();
      //Valueの背景を解除
      if (this.aboutEl[2].classList.contains('active')) {
        this.aboutEl[2].classList.remove('active');
      }
    });

    document.addEventListener("about-values", () => {
      if (!this.isIE) {
        this.renderer.setClearColor(new THREE.Color(this.bgColor[1]), 1.0);
        if (this.sea.isVisible) {
          this.sea.destroy();
        }
        if (!this.values.isVisible) {
          this.values.setup();
        }
        if (this.philosophy.isVisible) {
          this.philosophy.destroy();
        }
        this.triangular.hidePoints();
        //Valueの背景を暗く
        this.aboutEl[2].classList.add('active');
      }
      this.aboutusNav.scrollScene('about-values');
      this.aboutusNav.showNav();
      this.aboutusNav.showScrollDom();
    });

    document.addEventListener("about-philosophy", () => {
      if (!this.isIE) {
        this.renderer.setClearColor(new THREE.Color(this.bgColor[0]), 1.0);
        if (this.sea.isVisible) {
          this.sea.destroy();
        }
        if (this.values.isVisible) {
          this.values.destroy();
        }
        if (!this.philosophy.isVisible) {
          this.philosophy.setup();
        }
        this.triangular.hidePoints();
      }
      this.aboutusNav.scrollScene('about-philosophy');
      this.aboutusNav.showNav();
      this.aboutusNav.hideScrollDom();
      //Valueの背景を解除
      if (this.aboutEl[2].classList.contains('active')) {
        this.aboutEl[2].classList.remove('active');
      }
    });
    document.addEventListener("about-footer", () => {
      if (!this.isIE) {
        this.renderer.setClearColor(new THREE.Color(this.bgColor[0]), 1.0);
        if (this.sea.isVisible) {
          this.sea.destroy();
        }
        // if (this.values) {
        //   this.values.destroy();
        // }
        // if (this.philosophy) {
        //   this.philosophy.destroy();
        // }
        this.triangular.hidePoints();
      }
      this.aboutusNav.hideNav();
      this.aboutusNav.hideScrollDom();
      //Valueの背景を解除
      if (this.aboutEl[2].classList.contains('active')) {
        this.aboutEl[2].classList.remove('active');
      }
    });
  }

  createTriangular() {
    this.triangular = new Triangular();
    this.scene.add(this.triangular);
  }

  createSceneObject() {
    // Vision
    this.sea = new Sea();
    this.scene.add(this.sea);
    //Value
    this.values = new Values();
    this.scene.add(this.values);
    //Philosophy
    this.philosophy = new Philosophy();
    this.scene.add(this.philosophy);
  }

  update() {
    if (this.sceneReady) {
      this.camera.update();
      for (const point of this.triangular.points) {
        const screenPosition = point.position.clone();
        screenPosition.project(this.camera);
        const translateX = screenPosition.x * this.sizes.width * 0.5
        const translateY = - screenPosition.y * this.sizes.height * 0.5
        point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
      }
    }

    // console.log(this.camera);
    // console.log(this.frameCount);
    // console.log('sceneCount' + this.sceneCount);

    this.triangular.update();
    if (this.sceneCount === 0) {
      return;
    } else if (this.sceneCount === 1) {
      this.sea.update();
    } else if (this.sceneCount === 2) {
      this.values.update();
    } else if (this.sceneCount === 3) {
      this.philosophy.update();
    } else if (this.sceneCount === 4) {
      return;
    }
  }

  addOrbitControls() {
    // Controls
    // this.controls = new OrbitControls(this.camera, this.canvas);
    // this.controls.enableDamping = true;
  }

  addHelper() {
    // Stats
    // this.stats = new Stats();
    // this.stats.showPanel(0);
    // const statsEl = document.body.appendChild(this.stats.dom);
    // statsEl.style.zIndex = 0;
    // console.log(statsEl);
    // Axes Helper
    // const axesHelper = new THREE.AxesHelper(100);
    // this.scene.add(axesHelper);
    // Grid Helper
    // const size = 100;
    // const divisions = 20;
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);
    // this.nullComp = new NullComp();
    // this.scene.add(this.nullComp);
  }

  addDebug() {
    /**
   * Debug
   */
    // console.log('add debug');
    // const gui = new dat.GUI();
    // gui.closed = true;
    // const guiCtrl = () => {
    //   this.camX = 0;
    //   this.camY = 5;
    //   this.camZ = 100;
    //   this.camLookX = 0;
    //   this.camLookY = 5;
    //   this.camLookZ = 0;
    // }
    // const guiObj = new guiCtrl();
    // const params = {
    //   camX: 0,
    //   camY: 10,
    //   camZ: 0,
    //   scene: 'sc0',
    // }
    // gui.add(this.triangular.position, 'x').min(-100).max(100).step(1).name('tria:x')
    // gui.add(this.triangular.position, 'y').min(-100).max(100).step(1).name('tria:y')
    // gui.add(this.triangular.position, 'z').min(-100).max(100).step(1).name('tria:z')
    // gui.add(this.camera.position, 'x').min(-100).max(100).step(1).name('cam:x')
    // gui.add(this.camera.position, 'y').min(-100).max(100).step(1).name('cam:y')
    // gui.add(this.camera.position, 'z').min(-100).max(100).step(1).name('cam:z')
    // gui.add(this.camLook, 'x').min(-100).max(100).step(1).name('camlook:x')
    // gui.add(this.camLook, 'y').min(-100).max(100).step(1).name('camlook:y')
    // gui.add(this.camLook, 'z').min(-100).max(100).step(1).name('camlook:z')
    // gui.add(params, 'scene', ['sc0', 'sc1', 'sc2', 'sc3']).onChange((evt) => {
    //   if (evt === 'sc0') {
    //     this.aboutEl[0].dispatchEvent(this.aboutEvent[0]);
    //     this.sceneCount = 0;
    //   } else if (evt === 'sc1') {
    //     this.aboutEl[1].dispatchEvent(this.aboutEvent[1]);
    //     this.sceneCount = 1;
    //   } else if (evt === 'sc2') {
    //     this.aboutEl[2].dispatchEvent(this.aboutEvent[2]);
    //     this.sceneCount = 2;
    //   } else if (evt === 'sc3') {
    //     this.aboutEl[3].dispatchEvent(this.aboutEvent[3]);
    //     this.sceneCount = 3;
    //   }
    // });
    // this.camera.lookAt(new THREE.Vector3(this.camLook[0].x, this.camLook[0].y, this.camLook[0].z));
  }

  onScroll() { }

  onMouseMove({ clientX, clientY }) {
    // this.mouse3D.x = (clientX / this.size.width) * 2 - 1;
    // this.mouse3D.y = -(clientY / this.size.height) * 2 + 1;
  }

  onResize() {
    console.log('webgl on resize');
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    // this.camera.resize(this.sizes.width, this.sizes.height);
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    // console.log('this.camera.aspect: ' + this.camera.aspect);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  tick() {
    // this.camera.lookAt(new THREE.Vector3(this.camLook[0].x, this.camLook[0].y, this.camLook[0].z));
    this.camera.update();
    requestAnimationFrame(() => this.tick());
    this.frameCount += 1;
    // FPSを30に
    if (this.frameCount % 2) {
      return;
    }
    // this.stats.begin();
    this.renderer.render(this.scene, this.camera);
    // this.renderer.autoClear = true;
    // this.controls.update();
    this.update();
    // this.stats.end();
  }
}
