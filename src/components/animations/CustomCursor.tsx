"use client";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useMouseTracker } from "@/hooks/useMouse";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  // Track global mouse for store
  useMouseTracker();

  useEffect(() => {
    isMounted.current = true;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let curX = 0, curY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      curX = e.clientX;
      curY = e.clientY;
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);

    const tick = () => {
      // Cursor snaps
      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;

      // Ring lags behind
      ringX += (curX - ringX) * 0.12;
      ringY += (curY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        id="cursor"
        ref={cursorRef}
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
      />
    </>
  );
}
