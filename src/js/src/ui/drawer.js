
export default class Drawer {

  constructor() {
    // this.breakPoint = 1024;
    // this.windowWidth = window.innerWidth;
  }

  init(aDrawerEl, aHeaderNav, aDrawerSection) {
    // header main
    // modal
    let drawerEl = aDrawerEl;
    // let drawerTitle = aDrawerTitle;
    // let drawerList = aDrawerList;
    let headerNav = aHeaderNav;
    let drawerSection = aDrawerSection;
    // let mobileNav = aMobileNav;
    // let wrapLoader = aWrapLoader;


    headerNav.addEventListener('click', () => {
      // console.log('headerNavClick');
      drawerEl.classList.toggle('show');
      headerNav.classList.toggle('active');
      // for (var i = 0; i < drawerTitle.length; ++i) {
      //   drawerTitle[i].classList.toggle('show');
      // }
      // for (var i = 0; i < drawerList.length; ++i) {
      //   drawerList[i].classList.toggle('show');
      // }

      for (var i = 0; i < drawerSection.length; ++i) {
        drawerSection[i].classList.toggle('show');
      }
    }, false);


    drawerEl.addEventListener('click', () => {
      if (drawerEl.classList.contains('show')) {
        headerNav.classList.remove('active');
        // drawerTitle.classList.remove('show');
        for (var i = 0; i < drawerSection.length; ++i) {
          drawerSection[i].classList.toggle('show');
        }
        drawerEl.classList.remove('show');
      }
    }, false);

  }
}
