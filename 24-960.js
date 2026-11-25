const DESIGN_WIDTH_24960 = 1920;

function scaleProject24960() {
  const scale = window.innerWidth / DESIGN_WIDTH_24960;
  document.documentElement.style.setProperty("--scale-24960", scale.toFixed(6));
}

scaleProject24960();
window.addEventListener("resize", scaleProject24960, { passive: true });

function setupTrashSequence24960() {
  const container = document.querySelector(".trash-24960");
  const primaryImage = container?.querySelector("img");
  if (!container || !primaryImage) return;

  const secondaryImage = primaryImage.cloneNode(false);
  secondaryImage.alt = "";
  secondaryImage.setAttribute("aria-hidden", "true");
  secondaryImage.removeAttribute("loading");
  container.appendChild(secondaryImage);

  const layers = [primaryImage, secondaryImage];
  if (window.gsap) {
    gsap.set(secondaryImage, { autoAlpha: 0 });
  } else {
    secondaryImage.style.opacity = "0";
    secondaryImage.style.visibility = "hidden";
  }

  const frames = Array.from(
    { length: 22 },
    (_, index) =>
      `./assets/images/projects/24-960/trash-sequence/frame-${String(index + 1).padStart(2, "0")}.png`,
  );
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const frameInterval = 420;
  const crossfadeDuration = 0.24;
  const cache = [];
  let frameIndex = 0;
  let activeLayerIndex = 0;
  let direction = 1;
  let timer = null;
  let preloadStarted = false;
  let transitioning = false;

  const preload = () => {
    if (preloadStarted) return;
    preloadStarted = true;

    frames.forEach((src) => {
      const cachedImage = new Image();
      cachedImage.decoding = "async";
      cachedImage.src = src;
      cache.push(cachedImage);
    });
  };

  const showNextFrame = () => {
    if (transitioning) return;

    const nextFrameIndex = (frameIndex + direction + frames.length) % frames.length;
    const outgoing = layers[activeLayerIndex];
    const incomingLayerIndex = activeLayerIndex === 0 ? 1 : 0;
    const incoming = layers[incomingLayerIndex];

    if (reduceMotion || !window.gsap) {
      outgoing.src = frames[nextFrameIndex];
      frameIndex = nextFrameIndex;
      return;
    }

    transitioning = true;
    incoming.src = frames[nextFrameIndex];
    gsap.set(incoming, { autoAlpha: 0 });
    gsap.to(outgoing, {
      autoAlpha: 0,
      duration: crossfadeDuration,
      ease: "power1.inOut",
      overwrite: "auto",
    });
    gsap.to(incoming, {
      autoAlpha: 1,
      duration: crossfadeDuration,
      ease: "power1.inOut",
      overwrite: "auto",
      onComplete: () => {
        frameIndex = nextFrameIndex;
        activeLayerIndex = incomingLayerIndex;
        transitioning = false;
      },
    });
  };

  const stop = () => {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }

    if (window.gsap) {
      gsap.killTweensOf(layers);
      gsap.set(layers[activeLayerIndex], { autoAlpha: 1 });
      gsap.set(layers[activeLayerIndex === 0 ? 1 : 0], { autoAlpha: 0 });
    }
    transitioning = false;
  };

  const play = (nextDirection) => {
    preload();

    if (direction === nextDirection && timer !== null) return;
    stop();
    direction = nextDirection;
    showNextFrame();

    if (!reduceMotion) {
      timer = window.setInterval(showNextFrame, frameInterval);
    }
  };

  const directionAtPointer = (event) => {
    const bounds = container.getBoundingClientRect();
    return event.clientX < bounds.left + bounds.width / 2 ? -1 : 1;
  };

  container.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "touch") return;
    play(directionAtPointer(event));
  });

  container.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    play(directionAtPointer(event));
  });

  container.addEventListener("pointerleave", stop);
  window.addEventListener("blur", stop);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });

  if ("IntersectionObserver" in window) {
    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        preload();
        preloadObserver.disconnect();
      },
      { rootMargin: "1200px 0px" },
    );
    preloadObserver.observe(container);
  } else {
    preload();
  }
}

setupTrashSequence24960();

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const mediaItems = gsap.utils.toArray(".media-24960");
      const images = mediaItems.map((item) => item.querySelector("img"));
      const readinessCleanups = [];

      const whenReady = (image, callback) => {
        let cancelled = false;
        const run = () => {
          if (!cancelled) callback();
        };
        const decodeThenRun = () => {
          if (typeof image.decode !== "function") {
            run();
            return;
          }
          image.decode().then(run).catch(run);
        };

        if (image.complete && image.naturalWidth > 0) {
          decodeThenRun();
        } else {
          image.addEventListener("load", decodeThenRun, { once: true });
          image.addEventListener("error", run, { once: true });
        }

        return () => {
          cancelled = true;
          image.removeEventListener("load", decodeThenRun);
          image.removeEventListener("error", run);
        };
      };

      gsap.set(images, {
        autoAlpha: reduceMotion ? 1 : 0,
        willChange: reduceMotion ? "auto" : "opacity",
      });
      document.documentElement.classList.remove("is-preparing-24960-media");

      if (reduceMotion) {
        gsap.set(images, { clearProps: "opacity,visibility,willChange" });
        return undefined;
      }

      const reveal = (image, delay = 0) => {
        readinessCleanups.push(
          whenReady(image, () => {
            gsap.to(image, {
              autoAlpha: 1,
              duration: 1.15,
              delay,
              ease: "power2.out",
              overwrite: "auto",
              clearProps: "opacity,visibility,willChange",
            });
          }),
        );
      };

      let observer;
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            const visibleEntries = entries.filter((entry) => entry.isIntersecting);
            visibleEntries.forEach((entry, index) => {
              reveal(entry.target.querySelector("img"), index * 0.06);
              observer.unobserve(entry.target);
            });
          },
          {
            threshold: 0.08,
            rootMargin: "0px 0px -5% 0px",
          },
        );

        mediaItems.forEach((item) => observer.observe(item));
      } else {
        images.forEach((image, index) => reveal(image, index * 0.05));
      }

      return () => {
        observer?.disconnect();
        readinessCleanups.forEach((cleanup) => cleanup());
        gsap.killTweensOf(images);
        gsap.set(images, {
          clearProps: "opacity,visibility,willChange",
        });
      };
    },
  );
} else {
  document.documentElement.classList.remove("is-preparing-24960-media");
}
