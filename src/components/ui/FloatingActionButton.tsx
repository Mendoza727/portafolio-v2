"use client";
/* ↑ This directive MUST be the very first line — no blank lines before it */

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "3rem",
        height: "3rem",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
        color: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3), 0 0 20px hsl(var(--accent-1)/0.4)",
        border: "none",
        cursor: "pointer",
        zIndex: 9999,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.transform = "scale(1.12)";
        el.style.boxShadow = "0 6px 28px rgba(0,0,0,0.4), 0 0 28px hsl(var(--accent-1)/0.5)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.transform = "scale(1)";
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3), 0 0 20px hsl(var(--accent-1)/0.4)";
      }}
    >
      <ArrowUp size={20} />
    </button>
  );
}
