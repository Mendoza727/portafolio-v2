"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global GSAP scroll animation system.
 * All animations are scrub-driven (tied to scroll position) or triggered with
 * stagger reveal. This creates the "living page" effect where everything
 * responds in real-time to scroll.
 */
export function ScrollAnimations() {
  useEffect(() => {
    // Give DOM and Lenis a moment to settle
    const init = setTimeout(() => {
      ScrollTrigger.refresh();
      registerAnimations();
    }, 400);

    return () => {
      clearTimeout(init);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

function registerAnimations() {
  const ctx = gsap.context(() => {

    // ──────────────────────────────────────────────────────────────────────────
    // 1. HERO — Content scrolls + scales out as page unfolds
    // ──────────────────────────────────────────────────────────────────────────
    const heroContent = document.querySelector("#hero .hero-content");
    if (heroContent) {
      gsap.to(heroContent, {
        y: -160,
        opacity: 0,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // Hero canvas stays but fades
    const heroCanvas = document.querySelector("#hero .hero-canvas-wrap");
    if (heroCanvas) {
      gsap.to(heroCanvas, {
        opacity: 0,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "80% top",
          scrub: 2,
        },
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 2. SECTION REVEALS — Fast, dramatic fly-in from bottom (triggered once)
    // ──────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 3. SECTION TITLES — Clip reveal (text appears from bottom up)
    // ──────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-title]").forEach((el) => {
      const inner = el.querySelector(".title-inner");
      if (!inner) return;
      gsap.fromTo(
        inner,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 4. STAGGER CONTAINERS — Children fly in in sequence
    // ──────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
      const items = container.querySelectorAll<HTMLElement>("[data-item]");
      if (!items.length) return;
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 5. SCRUB PARALLAX — Background elements move at different speeds
    // ──────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      const speed = parseFloat(el.dataset.parallax ?? "0.25");
      gsap.to(el, {
        yPercent: () => -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 6. HORIZONTAL SCROLL — Skills section scrolls sideways
    // ──────────────────────────────────────────────────────────────────────────
    const hTrack = document.querySelector<HTMLElement>("#skills .h-scroll-track");
    if (hTrack) {
      const totalWidth = hTrack.scrollWidth - window.innerWidth;
      gsap.to(hTrack, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: "#skills",
          pin: true,
          start: "top top",
          end: () => `+=${totalWidth + window.innerHeight * 0.5}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 7. ABOUT — Text reveals sequentially on scroll (scrubbed)
    // ──────────────────────────────────────────────────────────────────────────
    const aboutWords = document.querySelectorAll<HTMLElement>("#about .word-reveal");
    if (aboutWords.length) {
      gsap.fromTo(
        aboutWords,
        { opacity: 0.08, color: "hsl(235 10% 52%)" },
        {
          opacity: 1,
          color: "hsl(235 8% 90%)",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top 60%",
            end: "center 30%",
            scrub: 2,
          },
        }
      );
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 8. PROJECTS — 3D card entrance with scrub depth
    // ──────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 80,
          rotationX: 15,
          transformPerspective: 1000,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.9,
          delay: i * 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 9. COUNTER animation — numbers count up when visible
    // ──────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const target = parseInt(el.dataset.count ?? "0", 10);
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.value).toString();
        },
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 10. EXPERIENCE TIMELINE LINE — grows as user scrolls through section
    // ──────────────────────────────────────────────────────────────────────────
    const timelineLine = document.querySelector<HTMLElement>(".timeline-line-inner");
    if (timelineLine) {
      gsap.fromTo(
        timelineLine,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#experience",
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 11. FLOATING DECORATIONS — Continuous parallax on bg orbs (scrub)
    // ──────────────────────────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".bg-orb").forEach((orb) => {
      const yOffset = parseFloat(orb.dataset.y ?? "0.4");
      const xOffset = parseFloat(orb.dataset.x ?? "0");
      gsap.to(orb, {
        y: () => window.innerHeight * yOffset,
        x: () => window.innerWidth * xOffset,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    });

  }); // end gsap.context

  // Return cleanup
  return () => ctx.revert();
}
