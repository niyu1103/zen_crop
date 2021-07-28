import smoothscroll from 'smoothscroll-polyfill';

export default class AboutusNav {
  constructor() {
    this.aboutNavUl = document.querySelector('.aboutus-nav > ul');
    this.aboutNavList = [...this.aboutNavUl.querySelectorAll('li')];
    this.aboutNavListAncker = [...this.aboutNavUl.querySelectorAll('li > a')];
    this.mainScroll = document.querySelector('.main-scroll');
    this.setup();
    this.addEvent();
  }

  setup() {
    this.aboutNavUl.classList.add('show');
    this.showScrollDom();
    for (let i = 0; i < this.aboutNavList.length; i++) {
      this.aboutNavList[i].classList.add('show');
    }
  }

  addEvent() {
    this.aboutNavListAncker.forEach((item) => {
      item.addEventListener('click', e => {
        e.preventDefault();
        const targetId = e.target.hash;
        console.log(targetId);
        const target = document.querySelector(targetId);
        target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  scrollScene(id) {
    this.removeCurrent();
    if (id === 'about-main') {
      this.aboutNavListAncker[0].classList.add('current');
    } else if (id === 'about-vision') {
      this.aboutNavListAncker[1].classList.add('current');
    } else if (id === 'about-values') {
      this.aboutNavListAncker[2].classList.add('current');
    } else if (id === 'about-philosophy') {
      this.aboutNavListAncker[3].classList.add('current');
    }
  }

  removeCurrent() {
    this.aboutNavListAncker.forEach((item) => {
      item.classList.remove('current');
    });
  }

  showScrollDom() {
    if (!this.mainScroll.classList.contains('show')) {
      this.mainScroll.classList.add('show');
    }
  }
  hideScrollDom() {
    if (this.mainScroll.classList.contains('show')) {
      this.mainScroll.classList.remove('show');
    }
  }
  showNav() {
    if (!this.aboutNavUl.classList.contains('show') == true) {
      this.aboutNavUl.classList.add('show');
    }
  }
  hideNav() {
    this.aboutNavUl.classList.remove('show');
  }
}
