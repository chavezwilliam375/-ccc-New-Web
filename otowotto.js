const DETAIL_DESIGN_WIDTH = 1920;

function scaleProjectPage() {
  const scale = window.innerWidth / DETAIL_DESIGN_WIDTH;
  document.documentElement.style.setProperty("--detail-scale", scale.toFixed(6));
}

scaleProjectPage();
window.addEventListener("resize", scaleProjectPage, { passive: true });

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const mediaItems = gsap.utils.toArray(
        ".project-media, .project-device-crop, .project-device-rotated",
      );
      const visualFor = (item) =>
        item.classList.contains("project-closing-card")
          ? item.querySelector(".project-closing-track")
          : item.querySelector("img");
      const visuals = mediaItems
        .map(visualFor)
        .filter(Boolean);
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

      gsap.set(visuals, {
        autoAlpha: reduceMotion ? 1 : 0,
        willChange: reduceMotion ? "auto" : "opacity",
      });
      document.documentElement.classList.remove("is-preparing-project-media");

      if (reduceMotion) {
        gsap.set(visuals, { clearProps: "opacity,visibility,willChange" });
        return undefined;
      }

      const reveal = (item, delay = 0) => {
        const image = item.querySelector("img");
        const visual = visualFor(item);
        if (!image || !visual) return;

        readinessCleanups.push(
          whenReady(image, () => {
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
            const visibleEntries = entries.filter((entry) => entry.isIntersecting);
            visibleEntries.forEach((entry, index) => {
              reveal(entry.target, index * 0.04);
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
        mediaItems.forEach((item, index) => reveal(item, index * 0.025));
      }

      return () => {
        observer?.disconnect();
        readinessCleanups.forEach((cleanup) => cleanup());
        gsap.killTweensOf(visuals, "opacity,visibility");
        gsap.set(visuals, {
          clearProps: "opacity,visibility,willChange",
        });
      };
    },
  );

  const closingCard = document.querySelector(".project-closing-card");
  const closingTrack = closingCard?.querySelector(".project-closing-track");
  const closingSequence = closingCard?.querySelector(".project-closing-sequence");

  if (closingCard && closingTrack && closingSequence) {
    const closingMedia = gsap.matchMedia();

    closingMedia.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        allowMotion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduceMotion } = context.conditions;
        gsap.set(closingTrack, { x: 0 });

        if (reduceMotion) {
          return () => gsap.set(closingTrack, { clearProps: "transform" });
        }

        const loop = gsap.to(closingTrack, {
          x: () => -closingSequence.offsetWidth,
          duration: 60,
          ease: "none",
          repeat: -1,
          paused: true,
        });
        let inView = false;
        let loopObserver;

        const syncPlayback = () => {
          if (inView && !document.hidden) {
            loop.play();
          } else {
            loop.pause();
          }
        };

        if ("IntersectionObserver" in window) {
          loopObserver = new IntersectionObserver(
            (entries) => {
              inView = entries.some((entry) => entry.isIntersecting);
              syncPlayback();
            },
            { threshold: 0.12 },
          );
          loopObserver.observe(closingCard);
        } else {
          inView = true;
          syncPlayback();
        }

        document.addEventListener("visibilitychange", syncPlayback);

        return () => {
          loopObserver?.disconnect();
          document.removeEventListener("visibilitychange", syncPlayback);
          loop.kill();
          gsap.set(closingTrack, { clearProps: "transform" });
        };
      },
    );
  }
} else {
  document.documentElement.classList.remove("is-preparing-project-media");
}
