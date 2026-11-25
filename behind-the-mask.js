const BEHIND_DESIGN_WIDTH = 1920;

function scaleBehindPage() {
  const scale = window.innerWidth / BEHIND_DESIGN_WIDTH;
  document.documentElement.style.setProperty("--behind-scale", scale.toFixed(6));
}

scaleBehindPage();
window.addEventListener("resize", scaleBehindPage, { passive: true });

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const mediaItems = gsap.utils.toArray(".behind-media");
      const visuals = mediaItems
        .map((item) => item.querySelector("img, video"))
        .filter(Boolean);
      const videos = visuals.filter((visual) => visual instanceof HTMLVideoElement);
      const readinessCleanups = [];

      const whenReady = (visual, callback) => {
        let cancelled = false;
        const run = () => {
          if (!cancelled) callback();
        };

        if (visual instanceof HTMLVideoElement) {
          if (visual.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            run();
          } else {
            visual.addEventListener("loadeddata", run, { once: true });
            visual.addEventListener("error", run, { once: true });
          }

          return () => {
            cancelled = true;
            visual.removeEventListener("loadeddata", run);
            visual.removeEventListener("error", run);
          };
        }

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
      document.documentElement.classList.remove("is-preparing-behind-media");

      if (reduceMotion) {
        videos.forEach((video) => {
          video.pause();
          video.controls = true;
        });
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
      const revealed = new WeakSet();
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            let revealIndex = 0;
            entries.forEach((entry) => {
              const visual = entry.target.querySelector("img, video");
              const isVideo = visual instanceof HTMLVideoElement;

              if (entry.isIntersecting) {
                if (!revealed.has(visual)) {
                  reveal(visual, revealIndex * 0.06);
                  revealed.add(visual);
                  revealIndex += 1;
                }

                if (isVideo) {
                  visual.play().catch(() => {});
                } else {
                  observer.unobserve(entry.target);
                }
              } else if (isVideo) {
                visual.pause();
              }
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
        videos.forEach((video) => video.play().catch(() => {}));
      }

      return () => {
        observer?.disconnect();
        readinessCleanups.forEach((cleanup) => cleanup());
        videos.forEach((video) => video.pause());
        gsap.killTweensOf(visuals);
        gsap.set(visuals, {
          clearProps: "opacity,visibility,willChange",
        });
      };
    },
  );
} else {
  document.documentElement.classList.remove("is-preparing-behind-media");
}
