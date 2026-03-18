"use client";
import { CheckCircle2, Calendar } from "lucide-react";
import { EXPERIENCES } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";

export function ExperienceSection() {
  const { t } = useI18n();
  return (
    <section
      id="experience"
      aria-label="Experience section"
      style={{
        position: "relative",
        paddingTop: "10rem",
        paddingBottom: "10rem",
        overflow: "hidden",
        background: "hsl(var(--surface))",
      }}
    >
      {/* Top/bottom border */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-2) / 0.3), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-1) / 0.2), transparent)" }} />

      {/* Watermark */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden", userSelect: "none" }}>
        <span style={{ fontSize: "20vw", fontWeight: 900, color: "white", opacity: 0.02, letterSpacing: "-0.04em" }}>XP</span>
      </div>

      {/* Glow orb */}
      <div
        className="bg-orb"
        data-y="-0.25"
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(262 80% 65% / 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative" }}>
        {/* Header */}
        <div className="mb-24">
          <div className="section-label mb-6" data-reveal>
            {t("experience.label")}
          </div>
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
        <div style={{ position: "relative", maxWidth: "52rem", marginLeft: "auto", marginRight: "auto", paddingLeft: "3rem" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "1px", background: "hsl(var(--border))" }}>
            {/* GSAP-animated fill */}
            <div
              className="timeline-line-inner"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to bottom, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                transformOrigin: "top center",
              }}
            />
          </div>

          {/* Experience items */}
          <div data-stagger style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
            {EXPERIENCES.map((exp, i) => (
              <div key={exp.id} data-item style={{ position: "relative" }}>
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-3.4rem",
                    top: "0.25rem",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                    boxShadow: `0 0 0 4px hsl(var(--surface)), 0 0 16px hsl(var(--accent-1) / 0.4)`,
                    zIndex: 1,
                  }}
                />

                {/* Card */}
                <div
                  style={{
                    background: "hsl(var(--bg))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "1.25rem",
                    padding: "2rem",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "hsl(var(--accent-1) / 0.3)";
                    el.style.boxShadow = "0 0 40px hsl(var(--accent-1) / 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "hsl(var(--border))";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Period */}
                  <div className="flex items-center gap-2 mb-4" style={{ color: "hsl(var(--text-muted))", fontSize: "0.8rem" }}>
                    <Calendar size={12} />
                    {exp.period}
                  </div>

                  {/* Role */}
                  <h3 style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 900, color: "white", marginBottom: "0.3rem", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
                    {exp.role}
                  </h3>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "hsl(var(--accent-1))", marginBottom: "1rem" }}>
                    {exp.company}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "hsl(var(--text-muted))", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
                    {exp.achievements.map((a) => (
                      <li key={a} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem", color: "hsl(var(--text-subtle))", alignItems: "flex-start" }}>
                        <CheckCircle2 size={14} style={{ color: "#10b981", flexShrink: 0, marginTop: "0.15rem" }} />
                        {a}
                      </li>
                    ))}
                  </ul>

                  {/* Tech */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingTop: "1rem", borderTop: "1px solid hsl(var(--border))" }}>
                    {exp.technologies.map((t) => (
                      <span key={t} style={{ fontSize: "0.7rem", fontFamily: "monospace", padding: "0.2rem 0.6rem", borderRadius: "99px", background: "hsl(var(--surface))", color: "hsl(var(--text-muted))", border: "1px solid hsl(var(--border))" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
