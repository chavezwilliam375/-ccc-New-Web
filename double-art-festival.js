const DOUBLE_DESIGN_WIDTH = 1920;

function scaleDoublePage() {
  const scale = window.innerWidth / DOUBLE_DESIGN_WIDTH;
  document.documentElement.style.setProperty("--double-scale", scale.toFixed(6));
}

scaleDoublePage();
window.addEventListener("resize", scaleDoublePage, { passive: true });

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const mediaItems = gsap.utils.toArray(".double-media");
      const visuals = mediaItems.map((item) => item.querySelector("img")).filter(Boolean);
      const readinessCleanups = [];

      const whenReady = (visual, callback) => {
        let cancelled = false;
        const run = () => {
          if (!cancelled) callback();
        };
        const decodeThenRun = () => {
          if (typeof visual.decode !== "function") {
            run();
            return;
          }
          visual.decode().then(run).catch(run);
        };

        if (visual.complete && visual.naturalWidth > 0) {
          decodeThenRun();
        } else {
          visual.addEventListener("load", decodeThenRun, { once: true });
          visual.addEventListener("error", run, { once: true });
        }

        return () => {
          cancelled = true;
          visual.removeEventListener("load", decodeThenRun);
          visual.removeEventListener("error", run);
        };
      };

      gsap.set(visuals, {
        autoAlpha: reduceMotion ? 1 : 0,
        willChange: reduceMotion ? "auto" : "opacity",
      });
      document.documentElement.classList.remove("is-preparing-double-media");

      if (reduceMotion) {
        gsap.set(visuals, { clearProps: "opacity,visibility,willChange" });
        return undefined;
      }

      const reveal = (visual, delay = 0) => {
        readinessCleanups.push(
          whenReady(visual, () => {
            gsap.to(visual, {
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
            let revealIndex = 0;
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const visual = entry.target.querySelector("img");
              reveal(visual, revealIndex * 0.06);
              revealIndex += 1;
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
        visuals.forEach((visual, index) => reveal(visual, index * 0.05));
      }

      return () => {
        observer?.disconnect();
        readinessCleanups.forEach((cleanup) => cleanup());
        gsap.killTweensOf(visuals);
        gsap.set(visuals, { clearProps: "opacity,visibility,willChange" });
      };
    },
  );
} else {
  document.documentElement.classList.remove("is-preparing-double-media");
}
