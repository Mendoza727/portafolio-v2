"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Expose lenis globally so any component can call window.__lenis?.scrollTo(0)
declare global {
  interface Window { __lenis?: Lenis; }
}

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 35,
    });

    window.__lenis = lenis;

    // Sync Lenis scroll events → GSAP ScrollTrigger
    lenis.on("scroll", () => ScrollTrigger.update());

    // Run Lenis on GSAP's ticker for perfectly synced animations
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
