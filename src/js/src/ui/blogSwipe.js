import 'core-js/features/number/is-nan' // swiper入れる前に
import 'custom-event-polyfill'
import Swiper from 'swiper/bundle';

export default class BlogSwipe {
  constructor() {
  }

  init(swipeEl) {
    const swiper = new Swiper(swipeEl, {
      loop: true,
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 24,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 16
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      }
    });
  }
}
