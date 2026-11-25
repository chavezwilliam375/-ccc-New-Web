const WORKS_DESIGN_WIDTH = 1920;

function scaleWorksPage() {
  const scale = window.innerWidth / WORKS_DESIGN_WIDTH;
  document.documentElement.style.setProperty("--works-scale", scale.toFixed(6));
}

scaleWorksPage();
window.addEventListener("resize", scaleWorksPage, { passive: true });

function bindHover(element, onEnter, onLeave) {
  element.addEventListener("pointerenter", onEnter);
  element.addEventListener("pointerleave", onLeave);
  element.addEventListener("focusin", onEnter);
  element.addEventListener("focusout", onLeave);

  return () => {
    element.removeEventListener("pointerenter", onEnter);
    element.removeEventListener("pointerleave", onLeave);
    element.removeEventListener("focusin", onEnter);
    element.removeEventListener("focusout", onLeave);
  };
}

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const items = gsap.utils.toArray(".work-item");
      const images = items.map((item) => item.querySelector("img"));
      const readinessCleanups = [];

      const whenImageIsReady = (image, callback) => {
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
        autoAlpha: 0,
        willChange: "opacity",
      });

      const reveal = (image, delay = 0) => {
        readinessCleanups.push(
          whenImageIsReady(image, () => {
            if (reduceMotion) {
              gsap.set(image, {
                autoAlpha: 1,
                clearProps: "opacity,visibility,transform,willChange",
              });
              return;
            }

            gsap.fromTo(
              image,
              {
                autoAlpha: 0,
              },
              {
                autoAlpha: 1,
                duration: 0.95,
                delay,
                ease: "power2.out",
                overwrite: "auto",
                clearProps: "opacity,visibility,willChange",
              },
            );
          }),
        );
      };

      let observer;
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            const visibleEntries = entries.filter((entry) => entry.isIntersecting);
            visibleEntries.forEach((entry, index) => {
              reveal(entry.target.querySelector("img"), index * 0.045);
              observer.unobserve(entry.target);
            });
          },
          {
            threshold: 0.08,
            rootMargin: "0px 0px -5% 0px",
          },
        );

        items.forEach((item) => observer.observe(item));
      } else {
        images.forEach((image, index) => reveal(image, index * 0.035));
      }

      return () => {
        observer?.disconnect();
        readinessCleanups.forEach((cleanup) => cleanup());
        gsap.killTweensOf(images);
        gsap.set(images, {
          clearProps: "opacity,visibility,transform,willChange",
        });
      };
    },
  );

  media.add(
    {
      canHover: "(hover: hover) and (pointer: fine)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { canHover, reduceMotion } = context.conditions;
      if (!canHover) return undefined;

      const cleanup = [];
      const duration = reduceMotion ? 0 : 0.42;

      document.querySelectorAll(".works-navigation a").forEach((link) => {
        const underline = link.querySelector("i");
        cleanup.push(
          bindHover(
            link,
            () => {
              gsap.to(link, {
                x: reduceMotion ? 0 : 7,
                color: "#686868",
                duration,
                ease: "power3.out",
                overwrite: "auto",
              });
              gsap.to(underline, {
                scaleX: 1,
                duration,
                ease: "power3.out",
                overwrite: "auto",
              });
            },
            () => {
              gsap.to(link, {
                x: 0,
                color: "#000000",
                duration,
                ease: "power3.out",
                overwrite: "auto",
              });
              gsap.to(underline, {
                scaleX: 0,
                duration,
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

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const cleanup = [];

      document.querySelectorAll(".work-item").forEach((item) => {
        cleanup.push(
          bindHover(
            item,
            () => {
              item.classList.add("is-hovered");
              gsap.to(item, {
                scale: reduceMotion ? 1 : 1.025,
                filter: "drop-shadow(4px 4px 14px rgba(0, 0, 0, 0.28))",
                duration: reduceMotion ? 0 : 0.46,
                ease: "power3.out",
                overwrite: "auto",
              });
            },
            () => {
              item.classList.remove("is-hovered");
              gsap.to(item, {
                scale: 1,
                filter: "drop-shadow(4px 4px 14px rgba(0, 0, 0, 0))",
                duration: reduceMotion ? 0 : 0.46,
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
}

document.documentElement.classList.remove("is-preparing-media");
