const THETA_DESIGN_WIDTH = 1920;

function scaleThetaPage() {
  const scale = window.innerWidth / THETA_DESIGN_WIDTH;
  document.documentElement.style.setProperty("--theta-scale", scale.toFixed(6));
}

scaleThetaPage();
window.addEventListener("resize", scaleThetaPage, { passive: true });

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const mediaItems = gsap.utils.toArray(".theta-media");
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
      document.documentElement.classList.remove("is-preparing-theta-media");

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
  document.documentElement.classList.remove("is-preparing-theta-media");
}
