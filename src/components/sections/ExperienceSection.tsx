"use client";
import { useEffect, useRef } from "react";
import { EXPERIENCES } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT_COLORS = ["#7c3aed", "#06b6d4", "#10b981", "#d946ef", "#f59e0b"];

// Map index → i18n key prefix
const EXP_KEYS = ["e1", "e2", "e3", "e4", "e5"];
// Achievement counts per job
const ACHIEVEMENT_COUNTS = [4, 5, 4, 3, 4];

export function ExperienceSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each card from alternating sides with 3D perspective
      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isLeft ? -80 : 80,
            rotateY: isLeft ? -18 : 18,
            scale: 0.92,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate timeline line fill
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

      // Animate dots
      gsap.utils.toArray<HTMLElement>(".exp-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-label="Experience section"
      style={{
        position: "relative",
        paddingTop: "9rem",
        paddingBottom: "9rem",
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
        <div style={{ marginBottom: "5rem" }}>
          <div className="section-label mb-6" data-reveal>{t("experience.label")}</div>
          <div
            data-title
            style={{
              fontSize: "clamp(2.8rem, 7vw, 7rem)",
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

        {/* Timeline */}
        <div style={{ position: "relative", maxWidth: "56rem", margin: "0 auto" }}>
          {/* Vertical spine */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              transform: "translateX(-50%)",
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

          {/* Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
              const key = EXP_KEYS[i] ?? `e${i + 1}`;
              const achCount = ACHIEVEMENT_COUNTS[i] ?? 3;
              const achievementKeys = Array.from({ length: achCount }, (_, j) => `experience.${key}a${j + 1}` as any);

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
                      <div className="exp-card" style={{ maxWidth: "22rem", transformStyle: "preserve-3d" }}>
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
                        zIndex: 1,
                        flexShrink: 0,
                      }}
                    />
                  </div>

                  {/* Right cell */}
                  <div style={{ paddingLeft: "2rem" }}>
                    {!isLeft && (
                      <div className="exp-card" style={{ maxWidth: "22rem", transformStyle: "preserve-3d" }}>
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
        padding: "1.75rem",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        position: "relative",
        overflow: "hidden",
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
      {/* Glow */}
      <div style={{ position: "absolute", bottom: "-30px", right: "-30px", width: "100px", height: "100px", borderRadius: "50%", background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`, pointerEvents: "none" }} />

      {/* Role — translated */}
      <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "white", marginBottom: "0.2rem", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
        {role || exp.role}
      </h3>
      <p style={{ fontSize: "0.78rem", fontWeight: 700, color: color, marginBottom: "0.9rem" }}>{exp.company}</p>
      <p style={{ fontSize: "0.82rem", color: "hsl(var(--text-muted))", lineHeight: 1.65, marginBottom: "1rem" }}>
        {desc || exp.description}
      </p>

      {/* Achievements — translated */}
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1rem" }}>
        {achievementKeys.map((ak, j) => {
          const translated = t(ak);
          const fallback = exp.achievements[j];
          return (
            <li key={j} style={{ display: "flex", gap: "0.6rem", fontSize: "0.78rem", color: "hsl(var(--text-subtle))", alignItems: "flex-start" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "0.35rem", boxShadow: `0 0 6px ${color}80` }} />
              {translated || fallback}
            </li>
          );
        })}
      </ul>

      {/* Tech stack — unchanged (technical, no translation needed) */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", paddingTop: "0.75rem", borderTop: `1px solid ${color}18` }}>
        {exp.technologies.map((tech) => (
          <span key={tech} style={{ fontSize: "0.65rem", fontFamily: "monospace", padding: "0.18rem 0.5rem", borderRadius: "99px", background: `${color}14`, color: color, border: `1px solid ${color}30` }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
