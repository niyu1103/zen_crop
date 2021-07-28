import { isHomeCheck, isMobileCheck, isAboutCheck, isCompanyCheck, uA } from './helpers';
import Loader from './ui/loader';
import BlogSwipe from './ui/blogSwipe';
import ScrollFade from './ui/scrollFade';
import Drawer from './ui/drawer';
import Header from './ui/header';
// import SmoothScroll from './ui/smoothScroll';
import HomeWebGl from './webgl/homeWebgl';
import WebGl from './webgl/webgl';
import Particle from './webgl/particle';
import objectFitImages from 'object-fit-images';


export class App {
  constructor() {
    this.isHome = isHomeCheck();
    this.isAbout = isAboutCheck();
    this.isCompany = isCompanyCheck();
    this.isIE = uA.isIEChieck();
    this.breakPoint = 768;
    this.windowWidth, this.windowHeight;
    this.blogSwipe;
    this.drawerEl, this.drawerSection;
    this.headerEl, this.headerNav;
    this.mainEl;
    this.isMobile;
    this.drawer = new Drawer();
    this.header = new Header();
    // this.smoothScroll = new SmoothScroll();
    this.webGl;
  }

  init() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.headerEl = document.querySelector('header');
    this.headerNav = document.querySelector('.header-nav');
    this.drawerEl = document.querySelector('.drawer');
    this.drawerSection = this.drawerEl.querySelectorAll('section');
    this.scrollFade = new ScrollFade();

    if (!this.isIE) {
      this.scrollFade.init(this.windowWidth, this.windowHeight, this.isHome, this.isAbout, this.isCompany);
    }

    if (this.isHome) {
      console.log('this.isHome: ' + this.isHome);
      this.loader = new Loader();
      this.blogSwipe = new BlogSwipe();
      this.blogSwipe.init(document.querySelector('.blog-swiper'));
      this.setMainTitle();
      if (!this.isIE) {
        this.homeWebGl = new HomeWebGl();
        this.homeWebGl.init();
        this.particle = new Particle();
        this.particle.init();
      }
    }

    if (this.isAbout && !this.isIE) {
      this.webGl = new WebGl();
      this.webGl.init();
    }

    this.addEvent();
    this.header.init(this.headerEl);
    this.drawer.init(this.drawerEl, this.headerNav, this.drawerSection);
    // this.smoothScroll.init();
    this.browserCheck();
  }


  setMainTitle() {
    //ホームのメインタイトル
    const mainTitleH1 = document.querySelector('.main-copy-sc-f');
    // const mainTitleSpanWrap = new SpanWrap(mainTitleH1);
    setTimeout(() => {
      mainTitleH1.classList.add('show');
    }, 2000);
  }

  browserCheck() {
    const bodyEl = document.querySelector('body');
    const aboutUsMainEl = document.querySelector('.aboutus-main');
    if (this.isIE) {
      console.log('browser check >> ie');
      bodyEl.classList.add('ie');
      objectFitImages();
      this.scrollFade.allFade();
      if (this.isHome || this.isAbout) {
        aboutUsMainEl.classList.add('ie');
      }
    }
  }

  addEvent() {
    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('click', this.onClick.bind(this));
  }

  onClick(_this) {
    // this.smoothScroll.onClick(_this);
  }

  onResize() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    if (this.windowWidth < this.breakPoint) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    if (this.isAbout) {
      this.webGl.onResize();
    }
  }

  onScroll() {
    // this.webGl.onScroll();
  }
}


