const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

function fitScene() {
  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT,
  );

  document.documentElement.style.setProperty("--scene-scale", scale.toFixed(5));
}

fitScene();
window.addEventListener("resize", fitScene, { passive: true });

function bindHoverInteraction(element, onEnter, onLeave) {
  const enter = () => onEnter();
  const leave = () => onLeave();

  element.addEventListener("pointerenter", enter);
  element.addEventListener("pointerleave", leave);
  element.addEventListener("focusin", enter);
  element.addEventListener("focusout", leave);

  return () => {
    element.removeEventListener("pointerenter", enter);
    element.removeEventListener("pointerleave", leave);
    element.removeEventListener("focusin", enter);
    element.removeEventListener("focusout", leave);
  };
}

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.to(".project-field", {
      y: -376,
      duration: 19.5,
      ease: "none",
      repeat: -1,
      force3D: true,
    });
  });

  media.add(
    {
      canHover: "(hover: hover) and (pointer: fine)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { canHover, reduceMotion } = context.conditions;

      if (!canHover) return undefined;

      const cleanup = [];
      const textDuration = reduceMotion ? 0 : 0.42;

      document.querySelectorAll(".nav a").forEach((link) => {
        const line = link.querySelector(".nav__line");

        cleanup.push(
          bindHoverInteraction(
            link,
            () => {
              gsap.to(link, {
                x: reduceMotion ? 0 : 7,
                color: "#686868",
                letterSpacing: "-0.3px",
                duration: textDuration,
                ease: "power3.out",
                overwrite: "auto",
              });
              gsap.to(line, {
                scaleX: 1,
                duration: textDuration,
                ease: "power3.out",
                overwrite: "auto",
              });
            },
            () => {
              gsap.to(link, {
                x: 0,
                color: "#000000",
                letterSpacing: "-1.04px",
                duration: textDuration,
                ease: "power3.out",
                overwrite: "auto",
              });
              gsap.to(line, {
                scaleX: 0,
                duration: textDuration,
                ease: "power3.out",
                overwrite: "auto",
              });
            },
          ),
        );
      });

      return () => cleanup.forEach((removeListeners) => removeListeners());
    },
  );

  const categoryButton = document.querySelector(".category-button");
  const titleTrack = categoryButton?.querySelector(".category-button__title-track");
  const slides = categoryButton
    ? gsap.utils.toArray(".category-button__slide", categoryButton)
    : [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const titleStep = 52;
  let activeSlide = 0;
  let activeCategory = 0;
  let carouselCall = null;
  let isCycling = false;

  function showSlide(nextIndex) {
    const previous = slides[activeSlide];
    const next = slides[nextIndex];
    const nextCategory = Number(next.dataset.category);

    gsap.set(previous, { autoAlpha: 0 });
    previous.classList.remove("is-active");
    next.classList.add("is-active");
    gsap.fromTo(
      next,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.055, ease: "none", overwrite: true },
    );

    if (nextCategory !== activeCategory) {
      const isWrapping = activeCategory === 5 && nextCategory === 0;
      const trackIndex = isWrapping ? 6 : nextCategory;

      gsap.to(titleTrack, {
        y: -trackIndex * titleStep,
        duration: 0.2,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => {
          if (isWrapping) gsap.set(titleTrack, { y: 0 });
        },
      });
      activeCategory = nextCategory;
    }

    activeSlide = nextIndex;
  }

  function queueNextSlide() {
    if (!isCycling) return;
    carouselCall = gsap.delayedCall(0.12, () => {
      showSlide((activeSlide + 1) % slides.length);
      queueNextSlide();
    });
  }

  function startCategoryCarousel() {
    if (isCycling || reducedMotion || slides.length < 2) return;
    isCycling = true;
    gsap.set(titleTrack, { autoAlpha: 0 });
    queueNextSlide();
  }

  function stopCategoryCarousel() {
    isCycling = false;
    carouselCall?.kill();
    carouselCall = null;
    gsap.killTweensOf(titleTrack);
    gsap.set(titleTrack, {
      y: -activeCategory * titleStep,
      autoAlpha: 1,
    });
  }

  if (categoryButton && titleTrack && slides.length) {
    bindHoverInteraction(
      categoryButton,
      startCategoryCarousel,
      stopCategoryCarousel,
    );
  }
}
