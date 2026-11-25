const BIAS_DESIGN_WIDTH = 1920;

function scaleBiasPage() {
  const scale = window.innerWidth / BIAS_DESIGN_WIDTH;
  document.documentElement.style.setProperty("--bias-scale", scale.toFixed(6));
}

scaleBiasPage();
window.addEventListener("resize", scaleBiasPage, { passive: true });

function setupPhenomenonSequence() {
  const container = document.querySelector(".bias-phenomenon");
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
    { length: 32 },
    (_, index) =>
      `./assets/images/projects/perceptual-bias/phenomenon-sequence/frame-${String(index + 1).padStart(2, "0")}.png`,
  );
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const crossfadeDuration = 0.24;
  const cache = new Map();
  let frameIndex = 4;
  let activeLayerIndex = 0;
  let direction = 1;
  let transitioning = false;

  const preloadFrame = (index) => {
    const normalizedIndex = (index + frames.length) % frames.length;
    if (cache.has(normalizedIndex)) return;

    const cachedImage = new Image();
    cachedImage.decoding = "async";
    cachedImage.src = frames[normalizedIndex];
    cache.set(normalizedIndex, cachedImage);
  };

  const preloadAround = (index) => {
    [-2, -1, 0, 1, 2].forEach((offset) => preloadFrame(index + offset));
  };

  const showNextFrame = () => {
    if (transitioning) return;

    const nextFrameIndex = (frameIndex + direction + frames.length) % frames.length;
    const outgoing = layers[activeLayerIndex];
    const incomingLayerIndex = activeLayerIndex === 0 ? 1 : 0;
    const incoming = layers[incomingLayerIndex];

    preloadAround(nextFrameIndex);

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
    if (window.gsap) {
      gsap.killTweensOf(layers);
      gsap.set(layers[activeLayerIndex], { autoAlpha: 1 });
      gsap.set(layers[activeLayerIndex === 0 ? 1 : 0], { autoAlpha: 0 });
    }
    transitioning = false;
  };

  const step = (nextDirection) => {
    preloadAround(frameIndex);
    container.dataset.sequenceActive = "true";
    if (window.gsap) {
      gsap.killTweensOf(layers);
      gsap.set(layers[activeLayerIndex], { autoAlpha: 1 });
      gsap.set(layers[activeLayerIndex === 0 ? 1 : 0], { autoAlpha: 0 });
    }
    transitioning = false;
    direction = nextDirection;
    showNextFrame();
  };

  const directionAtPointer = (event) => {
    const bounds = container.getBoundingClientRect();
    return event.clientX < bounds.left + bounds.width / 2 ? -1 : 1;
  };

  container.addEventListener("click", (event) => {
    step(directionAtPointer(event));
  });

  container.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    step(1);
  });

  window.addEventListener("blur", stop);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });

  if ("IntersectionObserver" in window) {
    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        preloadAround(frameIndex);
        preloadObserver.disconnect();
      },
      { rootMargin: "1400px 0px" },
    );
    preloadObserver.observe(container);
  } else {
    preloadAround(frameIndex);
  }
}

function setupPhenomenonCursor() {
  const interactionArea = document.querySelector(".bias-phenomenon");
  const cursor = document.querySelector(".bias-phenomenon-cursor");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!interactionArea || !cursor || !canHover || !window.gsap) return;

  interactionArea.classList.add("is-phenomenon-cursor-ready");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const moveCursor = (event) => {
    gsap.set(cursor, {
      x: event.clientX,
      y: event.clientY,
      xPercent: -50,
      yPercent: -50,
    });
  };

  const showCursor = (event) => {
    moveCursor(event);
    gsap.killTweensOf(cursor);
    gsap.to(cursor, {
      autoAlpha: 1,
      scale: 25 / 15,
      duration: reduceMotion ? 0 : 0.24,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const hideCursor = () => {
    gsap.killTweensOf(cursor);
    gsap.to(cursor, {
      autoAlpha: 0,
      scale: 0.9,
      duration: reduceMotion ? 0 : 0.18,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  interactionArea.addEventListener("pointerenter", showCursor);
  interactionArea.addEventListener("pointermove", moveCursor);
  interactionArea.addEventListener("pointerleave", hideCursor);
  interactionArea.addEventListener("pointercancel", hideCursor);
  window.addEventListener("blur", hideCursor);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hideCursor();
  });
}

setupPhenomenonSequence();
setupPhenomenonCursor();

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const mediaItems = gsap.utils.toArray(".bias-media");
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
      document.documentElement.classList.remove("is-preparing-bias-media");

      if (reduceMotion) {
        gsap.set(images, { clearProps: "opacity,visibility,willChange" });
        return undefined;
      }

      const reveal = (image, delay = 0) => {
        readinessCleanups.push(
          whenReady(image, () => {
            if (image.closest(".bias-phenomenon")?.dataset.sequenceActive === "true") {
              return;
            }

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
              reveal(entry.target.querySelector("img"), index * 0.04);
              observer.unobserve(entry.target);
            });
          },
          {
            threshold: 0.06,
            rootMargin: "0px 0px -4% 0px",
          },
        );

        mediaItems.forEach((item) => observer.observe(item));
      } else {
        images.forEach((image, index) => reveal(image, index * 0.025));
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
  document.documentElement.classList.remove("is-preparing-bias-media");
}
