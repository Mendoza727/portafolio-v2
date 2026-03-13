"use client";
import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";

/**
 * Tracks mouse position globally and stores it in Zustand.
 * Returns normalizedX/Y in -1 to 1 range for Three.js usage.
 */
export function useMouseTracker() {
  const setMousePosition = useAppStore((s) => s.setMousePosition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const normalizedX = (x / window.innerWidth) * 2 - 1;
      const normalizedY = -(y / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y, normalizedX, normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMousePosition]);
}

/** Returns current mouse position from the store. */
export function useMousePosition() {
  return useAppStore((s) => s.mousePosition);
}

/** Ref-based version for direct Three.js camera parallax */
export function useMouseRef() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return mouse;
}
