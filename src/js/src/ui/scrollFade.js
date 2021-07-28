// import intersectionObserver from 'intersection-observer';
// import { isHomeCheck, isAboutCheck, isCompanyCheck } from '../helpers';
import SpanWrap from './spanWrap';

export default class ScrollFade {
  constructor() {
    this.windowWidth, this.windowHeight;
    this.remainder = 80;
    this.fadeContents = null;
    this.webGlEl;
    this.visionEL;
    this.mainVisual;
    this.homeMainScroll;

    this.fadeOptions = {
      root: null, // ビューポートをルート
      rootMargin: "0px 0px -200px",
      threshold: 0, // 閾値
      once: true
    };

    this.webGlOptions = {
      root: null,
      rootMargin: "100px 0px 0px",
      threshold: 0.5,
      once: true
    };
  }


  init(width, height, isHome, isAbout, isCompany) {
    this.windowWidth = width;
    this.windowHeight = height;
    this.isHome = isHome;
    this.isAbout = isAbout;
    this.isCompany = isCompany;

    if (this.isHome) {
      this.homeScroll();
      // this.setMainTitle();
    }
    if (this.isHome || this.isAbout || this.isCompany) {
      this.setSpanWrapTitle();
    }
    this.setFadeContents();
  }

  homeScroll() {
    this.mainVisual = document.querySelector('.main-visual');
    this.homeMainScroll = document.querySelector('.home-main-scroll');
    const options = {
      threshold: [0.8],
    }

    const observer = new IntersectionObserver((entries) => {
      // console.log(entries[0]);
      if (entries[0].intersectionRatio > 0.8) {
        this.homeMainScroll.classList.add('show');
      } else {
        this.homeMainScroll.classList.remove('show');
      }
    }, options);
    observer.observe(this.mainVisual);
  }


  setSpanWrapTitle() {
    //各セクションのタイトル
    const sectionTitles = [...document.querySelectorAll('.sec-ttl-en')]
    sectionTitles.forEach((target) => {
      new SpanWrap(target);
    })
  }

  setFadeContents() {
    // console.log('setFadeContents');
    const scFade = document.querySelectorAll('.sc-f');
    const scFadeArr = [].slice.call(scFade);
    this.observer = new IntersectionObserver(this.observCallback, scFadeArr);
    scFadeArr.forEach(target => {
      this.observer.observe(target);
    })
  }

  observCallback(entries, object) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('show');
      object.unobserve(entry.target);
    })
  }

  allFade() {
    const scFade = document.querySelectorAll('.sc-f');
    const scFadeArr = [].slice.call(scFade);
    scFadeArr.forEach(target => {
      target.classList.add('show');
    })
  }

}
