const WANDERING_DESIGN_WIDTH = 1920;

function scaleWanderingPage() {
  const scale = window.innerWidth / WANDERING_DESIGN_WIDTH;
  document.documentElement.style.setProperty("--wandering-scale", scale.toFixed(6));
}

scaleWanderingPage();
window.addEventListener("resize", scaleWanderingPage, { passive: true });

const wanderingMotionControl = document.querySelector(".wandering-motion-video");
const wanderingMotionVideo = wanderingMotionControl?.querySelector("video");
const wanderingPlayButton = wanderingMotionControl?.querySelector(".wandering-play-button");

if (wanderingMotionVideo) {
  wanderingMotionVideo.defaultMuted = false;
  wanderingMotionVideo.muted = false;
  wanderingMotionVideo.volume = 1;
  wanderingMotionVideo.pause();
}

function setWanderingPlaybackState(isPlaying) {
  if (!wanderingMotionControl || !wanderingMotionVideo) return;

  wanderingMotionControl.classList.toggle("is-playing", isPlaying);
  wanderingPlayButton?.setAttribute(
    "aria-label",
    isPlaying
      ? "Pause Wandering Here Dreaming There"
      : "Play Wandering Here Dreaming There with sound",
  );

  if (!wanderingPlayButton) return;

  if (window.gsap) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(wanderingPlayButton);
    gsap.to(wanderingPlayButton, {
      autoAlpha: isPlaying ? 0 : 1,
      scale: isPlaying ? 0.86 : 1,
      duration: reduceMotion ? 0 : 0.22,
      ease: "power2.out",
      overwrite: "auto",
    });
  } else {
    wanderingPlayButton.style.opacity = isPlaying ? "0" : "1";
    wanderingPlayButton.style.visibility = isPlaying ? "hidden" : "visible";
  }
}

async function toggleWanderingPlayback() {
  if (!wanderingMotionVideo) return;

  if (wanderingMotionVideo.paused) {
    if (wanderingMotionVideo.readyState === HTMLMediaElement.HAVE_NOTHING) {
      wanderingMotionVideo.load();
    }
    wanderingMotionVideo.removeAttribute("muted");
    wanderingMotionVideo.defaultMuted = false;
    wanderingMotionVideo.muted = false;
    wanderingMotionVideo.volume = 1;

    try {
      await wanderingMotionVideo.play();
      setWanderingPlaybackState(true);
    } catch {
      setWanderingPlaybackState(false);
    }
  } else {
    wanderingMotionVideo.pause();
    setWanderingPlaybackState(false);
  }
}

wanderingPlayButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleWanderingPlayback();
});
wanderingMotionVideo?.addEventListener("click", toggleWanderingPlayback);

wanderingMotionVideo?.addEventListener("play", () => setWanderingPlaybackState(true));
wanderingMotionVideo?.addEventListener("pause", () => setWanderingPlaybackState(false));

function setupWanderingVideoCursor() {
  const cursor = document.querySelector(".wandering-video-cursor");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!wanderingMotionControl || !cursor || !canHover || !window.gsap) return;

  wanderingMotionControl.classList.add("is-video-cursor-ready");
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

  wanderingMotionControl.addEventListener("pointerenter", showCursor);
  wanderingMotionControl.addEventListener("pointermove", moveCursor);
  wanderingMotionControl.addEventListener("pointerleave", hideCursor);
  wanderingMotionControl.addEventListener("pointercancel", hideCursor);
  window.addEventListener("blur", hideCursor);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hideCursor();
  });
}

setupWanderingVideoCursor();

if (window.gsap) {
  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const mediaItems = gsap.utils.toArray(".wandering-media");
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
          if (visual.readyState >= HTMLMediaElement.HAVE_METADATA) {
            run();
          } else {
            visual.addEventListener("loadedmetadata", run, { once: true });
            visual.addEventListener("error", run, { once: true });
          }

          return () => {
            cancelled = true;
            visual.removeEventListener("loadedmetadata", run);
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
      document.documentElement.classList.remove("is-preparing-wandering-media");

      if (reduceMotion) {
        videos.forEach((video) => video.pause());
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
              const visual = entry.target.querySelector("img, video");
              const isVideo = visual instanceof HTMLVideoElement;

              if (entry.isIntersecting) {
                if (visual.dataset.revealed !== "true") {
                  reveal(visual, revealIndex * 0.06);
                  visual.dataset.revealed = "true";
                  revealIndex += 1;
                }

                if (!isVideo) {
                  observer.unobserve(entry.target);
                }
              } else if (isVideo) {
                visual.pause();
                setWanderingPlaybackState(false);
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
        videos.forEach((video) => video.pause());
      }

      return () => {
        observer?.disconnect();
        readinessCleanups.forEach((cleanup) => cleanup());
        videos.forEach((video) => video.pause());
        gsap.killTweensOf(visuals);
        gsap.set(visuals, { clearProps: "opacity,visibility,willChange" });
      };
    },
  );
} else {
  document.documentElement.classList.remove("is-preparing-wandering-media");
}
