import smoothscroll from 'smoothscroll-polyfill';


export default class SmoothScroll {

  constructor() {
    this.smoothscroll = smoothscroll;
  }

  init() {
    this.smoothscroll.polyfill();
  }

  onClick(e) {
    // document.addEventListener("click", e => {

    const target = e.target;

    // clickした要素がclass属性、js-smooth-scrollを含まない場合は処理を中断
    if (!target.classList.contains("s-scroll")) {
      return;
    };

    e.preventDefault();
    const targetId = target.hash;
    console.log('smooth scroll on click: ' + targetId);

    const targetElement = document.querySelector(targetId);
    // 画面上部から要素までの距離
    const rectTop = targetElement.getBoundingClientRect().top;
    // 現在のスクロール距離
    const offsetTop = window.pageYOffset;
    // スクロール位置に持たせるバッファ
    const buffer = 50;
    const top = rectTop + offsetTop - buffer;

    window.scrollTo({
      top,
      behavior: "smooth"
    });
    // });
  }
}
