// eslint-disable-next-line

function createSwiperCubes(demoEl, mainEffect) {
  const totalSlides = 4;
  let mainSwiper;
  const pageSwipers = [];
  // Init Cubes Pagination
  demoEl
    .querySelectorAll('.swiper-cubes-pagination .swiper')
    .forEach((el, index) => {
      const pageSwiper = new Swiper(el, {
        
        effect: 'cube',
        cubeEffect: {
          shadow: false,
        },
        createElements: true,
        simulateTouch: false,
        allowTouchMove: false,
      });
      el.addEventListener('click', () => {
        mainSwiper.slideTo(index);
      });
      pageSwipers.push(pageSwiper);
    });

  // Init main Swiper
  const mainSwiperEl = demoEl.querySelector('.swiper-main');
  mainSwiper = new Swiper(mainSwiperEl, {
    
    effect: mainEffect,
    createElements: true,
    coverflowEffect: {
      depth: 200,
    },
    on: {
      setTransition(swiper, transition) {
        pageSwipers.forEach((pageSwiper) => {
          pageSwiper.setTransition(transition);
        });
      },
      progress(swiper, progress) {
        const progressPerSlide = (1 / (totalSlides - 1)) * 2;
        for (let i = 0; i < totalSlides; i += 1) {
          let pageSwiperProgress =
            (progress + (progressPerSlide / 2) * (1 - i)) / progressPerSlide;
          pageSwiperProgress = Math.max(Math.min(pageSwiperProgress, 1), 0);
          pageSwipers[i].setProgress(pageSwiperProgress);
        }
      },
    },
  });
}
