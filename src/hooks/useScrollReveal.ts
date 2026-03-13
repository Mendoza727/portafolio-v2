"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Animates children elements with a stagger entrance when scrolled into view.
 * @param selector - CSS selector for child elements to animate
 */
export function useScrollReveal(
  selector = "[data-reveal]",
  options?: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  }
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: options?.y ?? 60 },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.9,
          stagger: options?.stagger ?? 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: options?.start ?? "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selector, options?.y, options?.duration, options?.stagger, options?.start]);

  return containerRef;
}

/**
 * Creates a smooth parallax effect on an element tied to scroll position.
 */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        if (ref.current) {
          gsap.set(ref.current, {
            y: self.progress * window.innerHeight * speed * -1,
          });
        }
      },
    });

    return () => st.kill();
  }, [speed]);

  return ref;
}
