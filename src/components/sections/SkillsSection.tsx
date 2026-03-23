"use client";
import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { SKILLS } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { key: "frontend", label: "Frontend", color: "#7c3aed", border: "#7c3aed33" },
  { key: "backend",  label: "Backend",  color: "#06b6d4", border: "#06b6d433" },
  { key: "devops",   label: "DevOps",   color: "#10b981", border: "#10b98133" },
  { key: "ai",       label: "AI / ML",  color: "#d946ef", border: "#d946ef33" },
  { key: "mobile",   label: "Mobile",   color: "#f59e0b", border: "#f59e0b33" },
  { key: "tools",    label: "Tools",    color: "#6366f1", border: "#6366f133" },
] as const;

export function SkillsSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      const trackWidth = track.scrollWidth;
      const viewportW  = window.innerWidth;
      const moveX      = trackWidth - viewportW + 80;

      if (moveX <= 0) return;

      // GSAP Timeline for breathing room before scrolling starts:
      // first 22% of the timeline = held still so user sees all cards
      // remaining 78% = horizontal movement
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "top top",
          // Extra 500px breathing room on top of the movement distance
          end: () => `+=${moveX + 500}`,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Pause at start (no movement), then slide cards
      tl.to({}, { duration: 0.28 }) // ~22% hold = breathing room
        .to(track, { x: -moveX, ease: "none", duration: 0.72 });

    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-label="Skills section"
      style={{
        background: "hsl(var(--surface))",
        position: "relative",
        overflowX: "hidden",
        overflowY: "visible",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-1) / 0.3), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-2) / 0.2), transparent)" }} />

      {/* Header */}
      <div className="section-container" style={{ paddingTop: "4rem", paddingBottom: "2.5rem" }}>
        <div className="section-label mb-4" data-reveal>{t("skills.label")}</div>

        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div
            data-title
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
            }}
          >
            <div className="title-inner">
              {t("skills.heading1")}
              <br />
              <span style={{ background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {t("skills.heading2")}
              </span>
            </div>
          </div>

          <div data-reveal style={{ textAlign: "right" }}>
            <p style={{ color: "hsl(var(--text-muted))", fontSize: "0.875rem", marginBottom: "0.4rem" }}>
              {SKILLS.length}+ {t("skills.technologies")}
            </p>
            <div className="flex items-center justify-end gap-2" style={{ color: "hsl(var(--text-muted))" }}>
              <span className="text-xs tracking-widest uppercase">{t("skills.scrollHint")}</span>
              <svg width="26" height="12" viewBox="0 0 28 14" fill="none">
                <path d="M0 7h24M18 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track — alignItems:stretch makes all cards equal height */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          alignItems: "stretch",   /* ← key: all cards same height as tallest */
          gap: "1.25rem",
          paddingLeft: "clamp(1.25rem, 5vw, 5rem)",
          paddingRight: "clamp(1.25rem, 5vw, 5rem)",
          paddingBottom: "2.5rem",
          paddingTop: "0.25rem",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {CATEGORIES.map((cat) => {
          const catSkills = SKILLS.filter((s) => s.category === cat.key);
          if (!catSkills.length) return null;

          return (
            <div
              key={cat.key}
              style={{
                flexShrink: 0,
                width: "clamp(260px, 26vw, 340px)",
                /* NO height: fit-content here → inherits stretch = equal height */
                background: "hsl(var(--bg))",
                border: `1px solid ${cat.border}`,
                borderTop: `3px solid ${cat.color}`,
                borderRadius: "1.2rem",
                padding: "1.1rem",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${cat.color}22, 0 20px 60px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: cat.color, boxShadow: `0 0 8px ${cat.color}80`, flexShrink: 0 }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: cat.color }}>
                  {cat.label}
                </span>
              </div>

              {/* Skills list — flex:1 so it fills remaining height evenly */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", flex: 1 }}>
                {catSkills.map((skill) => (
                  <div key={skill.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "hsl(var(--text-subtle))" }}>{skill.name}</span>
                      <span style={{ fontSize: "0.7rem", fontFamily: "JetBrains Mono, monospace", fontWeight: 700, color: cat.color }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: "3px", background: "hsl(var(--surface-2))", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${skill.level}%`, borderRadius: "99px", background: `linear-gradient(to right, ${cat.color}70, ${cat.color})` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative glow */}
              <div style={{ position: "absolute", bottom: "-30px", right: "-30px", width: "110px", height: "110px", borderRadius: "50%", background: `radial-gradient(circle, ${cat.color}15 0%, transparent 70%)`, pointerEvents: "none" }} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
