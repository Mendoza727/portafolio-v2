"use client";
import { useEffect, useRef, useState } from "react";
import { EXPERIENCES } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT_COLORS = ["#7c3aed", "#06b6d4", "#10b981", "#d946ef", "#f59e0b"];

const EXP_KEYS = ["e1", "e2", "e3", "e4", "e5"];
const ACHIEVEMENT_COUNTS = [4, 5, 4, 3, 4];

/** Simple hook that returns true while width < 768px */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function ExperienceSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards: on mobile fade+slide up; on desktop alternating rotateY
      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isMobile ? 0 : (isLeft ? -80 : 80),
            y: isMobile ? 40 : 0,
            rotateY: isMobile ? 0 : (isLeft ? -18 : 18),
            scale: 0.93,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Timeline fill
      gsap.fromTo(
        ".exp-timeline-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );

      // Dots
      gsap.utils.toArray<HTMLElement>(".exp-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: { trigger: dot, start: "top 88%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-label="Experience section"
      style={{
        position: "relative",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        overflow: "hidden",
        background: "hsl(var(--surface))",
        perspective: "1200px",
      }}
    >
      {/* Borders */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-2) / 0.3), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-1) / 0.2), transparent)" }} />

      {/* Watermark */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden", userSelect: "none" }}>
        <span style={{ fontSize: "22vw", fontWeight: 900, color: "white", opacity: 0.018, letterSpacing: "-0.04em" }}>XP</span>
      </div>

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "10%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, hsl(262 80% 65% / 0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, hsl(190 80% 60% / 0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="section-container" style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <div className="section-label mb-6" data-reveal>{t("experience.label")}</div>
          <div
            data-title
            style={{
              fontSize: "clamp(2.4rem, 7vw, 7rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
            }}
          >
            <div className="title-inner">
              {t("experience.heading1")}
              <br />
              <span style={{
                background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {t("experience.heading2")}
              </span>
            </div>
          </div>
        </div>

        {/* ─── TIMELINE WRAPPER ──────────────────────────────────────────────── */}
        <div style={{ position: "relative", maxWidth: "56rem", margin: "0 auto" }}>

          {/* ── SPINE — left on mobile, center on desktop ── */}
          <div
            style={{
              position: "absolute",
              left: isMobile ? "16px" : "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              transform: isMobile ? "none" : "translateX(-50%)",
              background: "hsl(var(--border))",
            }}
          >
            <div
              className="exp-timeline-fill"
              style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                background: "linear-gradient(to bottom, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                transformOrigin: "top",
              }}
            />
          </div>

          {/* ── CARDS LIST ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "2rem" : "3.5rem" }}>
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
              const key = EXP_KEYS[i] ?? `e${i + 1}`;
              const achCount = ACHIEVEMENT_COUNTS[i] ?? 3;
              const achievementKeys = Array.from(
                { length: achCount },
                (_, j) => `experience.${key}a${j + 1}` as any
              );

              /* ── MOBILE: left spine, full-width card ── */
              if (isMobile) {
                return (
                  <div
                    key={exp.id}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0", paddingLeft: "0" }}
                  >
                    {/* Dot column (16px offset = over the spine) */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "34px", flexShrink: 0, paddingTop: "1rem" }}>
                      <div
                        className="exp-dot"
                        style={{
                          width: "14px", height: "14px", borderRadius: "50%",
                          background: `linear-gradient(135deg, ${color}, ${color}99)`,
                          boxShadow: `0 0 0 3px hsl(var(--surface)), 0 0 14px ${color}55`,
                          flexShrink: 0,
                          zIndex: 1,
                        }}
                      />
                    </div>

                    {/* Card + period label */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Period above card */}
                      <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.68rem", fontFamily: "monospace", color: color, fontWeight: 700, letterSpacing: "0.06em" }}>{exp.period}</span>
                        <span style={{ fontSize: "0.62rem", color: "hsl(var(--text-muted))" }}>· {exp.company}</span>
                      </div>

                      <div className="exp-card" style={{ transformStyle: "preserve-3d", width: "100%" }}>
                        <ExperienceCard exp={exp} color={color} expKey={key} achievementKeys={achievementKeys} t={t} />
                      </div>
                    </div>
                  </div>
                );
              }

              /* ── DESKTOP: alternating left/right ── */
              return (
                <div
                  key={exp.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2rem 1fr",
                    alignItems: "start",
                    position: "relative",
                  }}
                >
                  {/* Left cell */}
                  <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "2rem" }}>
                    {isLeft && (
                      <div className="exp-card" style={{ maxWidth: "22rem", transformStyle: "preserve-3d", width: "100%" }}>
                        <ExperienceCard exp={exp} color={color} expKey={key} achievementKeys={achievementKeys} t={t} />
                      </div>
                    )}
                    {!isLeft && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-start", paddingTop: "0.75rem" }}>
                        <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: color, fontWeight: 700, letterSpacing: "0.06em" }}>{exp.period}</span>
                        <span style={{ fontSize: "0.68rem", color: "hsl(var(--text-muted))", marginTop: "0.25rem" }}>{exp.company}</span>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div style={{ display: "flex", justifyContent: "center", paddingTop: "1.2rem" }}>
                    <div
                      className="exp-dot"
                      style={{
                        width: "14px", height: "14px", borderRadius: "50%",
                        background: `linear-gradient(135deg, ${color}, ${color}99)`,
                        boxShadow: `0 0 0 4px hsl(var(--surface)), 0 0 20px ${color}55`,
                        zIndex: 1, flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Right cell */}
                  <div style={{ paddingLeft: "2rem" }}>
                    {!isLeft && (
                      <div className="exp-card" style={{ maxWidth: "22rem", transformStyle: "preserve-3d", width: "100%" }}>
                        <ExperienceCard exp={exp} color={color} expKey={key} achievementKeys={achievementKeys} t={t} />
                      </div>
                    )}
                    {isLeft && (
                      <div style={{ paddingTop: "0.75rem" }}>
                        <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: color, fontWeight: 700, letterSpacing: "0.06em" }}>{exp.period}</span>
                        <br />
                        <span style={{ fontSize: "0.68rem", color: "hsl(var(--text-muted))", marginTop: "0.25rem", display: "block" }}>{exp.company}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Card component ──────────────────────────────────────────────────────── */
function ExperienceCard({
  exp,
  color,
  expKey,
  achievementKeys,
  t,
}: {
  exp: (typeof EXPERIENCES)[0];
  color: string;
  expKey: string;
  achievementKeys: any[];
  t: (key: any) => string;
}) {
  const role = t(`experience.${expKey}role` as any);
  const desc = t(`experience.${expKey}desc` as any);

  return (
    <div
      style={{
        background: "hsl(var(--bg))",
        border: `1px solid ${color}22`,
        borderTop: `3px solid ${color}`,
        borderRadius: "1.25rem",
        padding: "1.5rem",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = `0 12px 50px ${color}22, 0 0 0 1px ${color}33`;
        el.style.transform = "translateY(-4px) rotateX(2deg)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "none";
        el.style.transform = "none";
      }}
    >
      {/* Inner glow */}
      <div style={{ position: "absolute", bottom: "-30px", right: "-30px", width: "100px", height: "100px", borderRadius: "50%", background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`, pointerEvents: "none" }} />

      <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "white", marginBottom: "0.2rem", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
        {role || exp.role}
      </h3>
      <p style={{ fontSize: "0.75rem", fontWeight: 700, color: color, marginBottom: "0.75rem" }}>{exp.company}</p>
      <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", lineHeight: 1.65, marginBottom: "0.9rem" }}>
        {desc || exp.description}
      </p>

      {/* Achievements */}
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "0.9rem" }}>
        {achievementKeys.map((ak, j) => {
          const translated = t(ak);
          const fallback = exp.achievements[j];
          return (
            <li key={j} style={{ display: "flex", gap: "0.55rem", fontSize: "0.75rem", color: "hsl(var(--text-subtle))", alignItems: "flex-start" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "0.35rem", boxShadow: `0 0 6px ${color}80` }} />
              {translated || fallback}
            </li>
          );
        })}
      </ul>

      {/* Tech stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", paddingTop: "0.7rem", borderTop: `1px solid ${color}18` }}>
        {exp.technologies.map((tech) => (
          <span key={tech} style={{ fontSize: "0.6rem", fontFamily: "monospace", padding: "0.15rem 0.45rem", borderRadius: "99px", background: `${color}14`, color: color, border: `1px solid ${color}30` }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
