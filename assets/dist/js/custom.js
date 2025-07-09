$(document).ready(function () {
  // Smoth-scroll
  const ScrollArea = document.getElementById("scroll-content");
  const options = {
    damping: 0.1,
    speed: 1,
    renderByPixel: true,
    continuousScrolling: true,
    syncCallbacks: true,
    alwaysShowTracks: true,
  };
  var scrollbar = Scrollbar.init(ScrollArea, options);

  $(".menuText").each(function () {
    var getText = $(this).children(".menuTextInner").text();
    $(this).find("span").text(getText);
  });

  scrollbar.addListener(({ offset }) => {
    const searchBar = $(".searchPopUp");
    const talkBar = $(".talkPopup");
    talkBar.css("top", offset.y);
    searchBar.css("top", offset.y);

    $(".revealSearch")
      .off("click")
      .on("click", function () {
        searchBar.toggleClass("showSearch");
      });

    $(".revealTalk")
      .off("click")
      .on("click", function () {
        talkBar.toggleClass("showSearch");
      });
  });

  // nav End

  $(".yoso-button, .yoso-button-2").mousemove(function (event) {
    var mouseX = event.pageX - $(this).offset().left;
    var mouseY = event.pageY - $(this).offset().top;

    var buttonWidth = $(this).outerWidth();
    var buttonHeight = $(this).outerHeight();

    $(this).css({
      top: mouseY - buttonHeight / 2 + "px",
      left: mouseX - buttonWidth / 2 + "px",
    });

    console.log("Mouse X: " + mouseX + ", Mouse Y: " + mouseY);
  });

  $(".yoso-button, .yoso-button-2").mouseleave(function () {
    $(this).css({ top: 0 + "px", left: 0 + "px" });
  });

  var loaderDelay = 3500;
  setTimeout(function () {
    $(".loaderTop").css({ transform: "translateY(-100%)" });
    $(".loaderBottom").css({ transform: "translateY(100%)" });
    $(".loaderTopTxt").css("transform", "translateY(50%) scale(5)");
    $(".loaderBottomTxt").css("transform", "translateY(-50%) scale(5)");

    setTimeout(function () {
      $(".loader").css("display", "none");
    }, loaderDelay + 100);
  }, loaderDelay);

  $(".marquee").marquee({
    speed: 200,
    gap: 30,
    delayBeforeStart: 0,
    direction: "left",
    duplicated: true,
    pauseOnHover: false,
  });

  const sliderEl = document.querySelector(".gallery");

  createSpringSlider(sliderEl, {
    loop: true,

    allowTouchMove: false,
    autoplay: {
      delay: 1000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      800: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 3,
      },
    },
  });

  // Main Testimonials Slider
  var testimonials = new Swiper(".testimonials", {
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    autoplay: {
      delay: 2500,
    },
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".testimonial-next",
      prevEl: ".testimonial-prev",
    },
  });

  // Thumbnail Slider
  var swiper2 = new Swiper(".testimonialsThumb", {
    loop: true,
    autoplay: {
      delay: 2500,
    },
    spaceBetween: 20,
    slidesPerView: 2,
    navigation: {
      nextEl: ".testimonial-next",
      prevEl: ".testimonial-prev",
    },
    thumbs: {
      swiper: testimonials,
    },
    on: {
      slideChange: function () {
        let nextIndex =
          (testimonials.realIndex + 2) % testimonials.slides.length;
        testimonials.slideToLoop(nextIndex);
      },
    },
  });
  $(".linkTxt").each(function () {
    var getText = $(this).text();
    $(this).find("span").text(getText);
  });

  // animations

  $('.yoso-menu a[href^="#"]').on("click", function (event) {
    event.preventDefault();

    const target = $(this.getAttribute("href"));

    if (target.length) {
      scrollbar.scrollTo(0, target.offset().top, 800);
    }

    // Toggle mobile menu
    $(".hamburger").toggleClass("is-active");
    $(".mobileMenu .mainMenu").toggleClass("d-none");
  });

  // Sticky Navbar with Smooth Scrollbar Listener
  scrollbar.addListener(({ offset }) => {
    const navbar = $("#navbar");

    if (offset.y > 750) {
      navbar.addClass("sticky");
      navbar.css("top", offset.y);
    } else {
      navbar.removeClass("sticky");
      navbar.css("top", 0);
    }
  });

  const $cursor = $(".cursor");

  $(document).on("mousemove", function (e) {
    $cursor.css({
      top: e.clientY - $cursor.height() / 2,
      left: e.clientX - $cursor.width() / 2,
    });
  });

  $(document).on("mouseover", function (e) {
    const cursorStyle = window.getComputedStyle(e.target).cursor;
    if (cursorStyle === "pointer") {
      $cursor.addClass("pointer-hover");
    } else {
      $cursor.removeClass("pointer-hover");
    }
  });

  function startCountingAnimation($this) {
    let target = parseInt($this.text().replace(/,/g, ""), 10);

    if (isNaN(target)) {
      console.error("Invalid target number:", $this.text());
      return;
    }

    let duration = 3000;

    $this.text("0");

    $({ count: 0 }).animate(
      { count: target },
      {
        duration: duration,
        easing: "swing",
        step: function () {
          $this.text(Math.floor(this.count));
        },
        complete: function () {
          $this.text(target);
        },
      }
    );
  }

  function checkIfInView() {
    $(".counter").each(function () {
      let $this = $(this);
      let elementTop = $this.offset().top;
      let elementBottom = elementTop + $this.outerHeight();
      let viewportTop = $(window).scrollTop();
      let viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        if (!$this.hasClass("animated")) {
          startCountingAnimation($this);
          $this.addClass("animated");
        }
      }
    });
  }
  scrollbar.addListener(({ offset }) => {
    checkIfInView(offset.y);
  });

  checkIfInView();

  // mobileMenu
  $(".hamburger").on("click", function () {
    $(".hamburger").toggleClass("is-active");
    $(".mobileMenu .mainMenu").toggleClass("d-none");
  });

  setTimeout(() => {
    $(".circle2").css("stroke-dashoffset", "46");
  }, loaderDelay + 500);

  function raf(time) {
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const $backToTopBtn = $("#backToTop");

  scrollbar.addListener(({ offset }) => {
    if (offset.y >= 300) {
      $backToTopBtn.addClass("show");
    } else {
      $backToTopBtn.removeClass("show");
    }
  });

  setTimeout(() => {
    $(".progressBar .barFill").each(function () {
      var prcnt = Math.floor(Math.random() * 50) + 51;
      console.log(prcnt);

      $(this).css("width", prcnt + "%");
    });
  }, loaderDelay + 200);

  $backToTopBtn.on("click", function () {
    scrollbar.scrollTo(0, 0, 1000);
  });

  var shaderSlide;
  shaderSlide = new Swiper(".shaderSlide", {
    modules: [SwiperGL],
    simulateTouch: false,
    effect: "gl",
    gl: {
      shader: "flyeye",
    },
    speed: 1000,
    pagination: {
      el: ".yoso-details-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  });
});
