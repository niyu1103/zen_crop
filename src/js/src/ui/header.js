
export default class Header {

  constructor() {
    this.headerEl;
  }

  init(headerEl) {
    this.headerEl = headerEl;
    this.headerEl.classList.add('show');
  }
}
