"use client";
import { GraduationCap, Calendar } from "lucide-react";
import { EDUCATION } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";

export function EducationSection() {
  const { t } = useI18n();

  return (
    <section
      id="education"
      aria-label="Education section"
      style={{
        position: "relative",
        paddingTop: "8rem",
        paddingBottom: "8rem",
        overflow: "hidden",
        background: "hsl(var(--bg))",
      }}
    >
      {/* Border top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-1) / 0.2), transparent)" }} />

      {/* Glow orb */}
      <div
        className="bg-orb"
        data-y="-0.2"
        data-x="-0.05"
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--accent-2) / 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative" }}>
        {/* Header */}
        <div className="mb-16">
          <div className="section-label mb-6" data-reveal>
            {t("education.label")}
          </div>
          <div
            data-title
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              overflow: "hidden",
            }}
          >
            <div className="title-inner">
              {t("education.heading1")}
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(var(--accent-3)), hsl(var(--accent-1)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("education.heading2")}
              </span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          data-stagger
        >
          {EDUCATION.map((edu, i) => (
            <div
              key={edu.id}
              data-item
              className="project-card"
              style={{
                background: "hsl(var(--surface))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "1.25rem",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "hsl(var(--accent-1) / 0.3)";
                el.style.boxShadow = "0 0 40px hsl(var(--accent-1) / 0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "hsl(var(--border))";
                el.style.boxShadow = "none";
              }}
            >
              {/* Accent top line */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "2px",
                  background: i === 0
                    ? "linear-gradient(to right, hsl(var(--accent-1)), hsl(var(--accent-2)))"
                    : i === 1
                    ? "linear-gradient(to right, hsl(var(--accent-2)), hsl(var(--accent-3)))"
                    : "linear-gradient(to right, hsl(var(--accent-3)), transparent)",
                }}
              />

              {/* Icon */}
              <div
                className="mb-5 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}
              >
                <GraduationCap size={18} style={{ color: "hsl(var(--accent-1))" }} />
              </div>

              {/* Period */}
              <div className="flex items-center gap-2 mb-3" style={{ color: "hsl(var(--text-muted))", fontSize: "0.8rem" }}>
                <Calendar size={12} />
                {edu.period}
                {edu.current && (
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "99px",
                      background: "hsl(var(--accent-1) / 0.12)",
                      border: "1px solid hsl(var(--accent-1) / 0.2)",
                      color: "hsl(var(--accent-1))",
                      marginLeft: "auto",
                    }}
                  >
                    {t("education.present")}
                  </span>
                )}
              </div>

              {/* Degree */}
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  color: "white",
                  marginBottom: "0.5rem",
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                {edu.degree}
              </h3>

              {/* Institution */}
              <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-muted))", lineHeight: 1.5 }}>
                {edu.institution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
