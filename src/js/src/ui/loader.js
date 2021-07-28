
export default class Loader {

  constructor() {
    this.wrapLoader = document.querySelector('#wrap-loader');
    this.init();
    // console.log('load init');
  }

  init() {
    setTimeout(() => {
      this.wrapLoader.classList.add('hide');
      setTimeout(() => {
        this.wrapLoader.classList.add('remove');
      }, 500);
    }, 1000);
  }
}
