"use client";
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
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.55rem 1.2rem",
        borderRadius: "99px",
        background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
        color: "white",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35), 0 0 24px hsl(var(--accent-1)/0.4)",
        border: "none",
        cursor: "pointer",
        zIndex: 9999,
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        backdropFilter: "blur(8px)",
        transition: "box-shadow 0.2s ease, opacity 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.45), 0 0 36px hsl(var(--accent-1)/0.6)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35), 0 0 24px hsl(var(--accent-1)/0.4)";
      }}
    >
      <ArrowUp size={14} />
      Volver arriba
    </button>
  );
}
