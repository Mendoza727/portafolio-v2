"use client";
import { useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { PERSONAL_INFO, SKILLS, SOCIAL_LINKS } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";

// Split text into words with word-reveal class
function ScrubText({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="word-reveal inline-block mr-[0.3em]">
          {word}
        </span>
      ))}
    </>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useI18n();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-40 overflow-hidden"
      aria-label="About section"
      style={{ background: "hsl(var(--bg))" }}
    >
      {/* Background orbs (GSAP parallax via .bg-orb) */}
      <div
        className="bg-orb absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        data-y="-0.3"
        style={{
          background: "radial-gradient(circle, hsl(262 80% 65% / 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="bg-orb absolute -bottom-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
        data-y="0.2"
        style={{
          background: "radial-gradient(circle, hsl(195 90% 55% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="section-container">
        {/* Section label */}
        <div className="section-label mb-20" data-reveal>
          {t("about.label")}
        </div>

        {/* Giant heading */}
        <div
          className="overflow-hidden mb-16"
          aria-hidden
        >
          <div
            data-title
            style={{
              fontSize: "clamp(2.8rem, 7.5vw, 8rem)",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            <div className="title-inner">
              {t("about.heading1")}
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("about.heading2")}
              </span>
              <br />
              {t("about.heading3")}
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">

          {/* Left: Scroll-scrub text reveal */}
          <div>
            {/* Each word gets .word-reveal class — GSAP scrubs opacity */}
            <p className="text-2xl sm:text-3xl font-light leading-[1.55] mb-8">
              <ScrubText text={t("about.bio")} />
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(var(--text-muted))" }}>
              <ScrubText text={t("about.bio2")} />
            </p>
            <p className="text-lg leading-relaxed mb-12" style={{ color: "hsl(var(--text-muted))" }}>
              <ScrubText text={t("about.bio3")} />
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12" data-stagger>
              {[
                { label: t("about.location"), value: PERSONAL_INFO.location },
                { label: t("about.status"), value: t("about.available") },
                { label: t("about.timezone"), value: "COT (UTC-5)" },
                { label: t("about.github"), value: `@${PERSONAL_INFO.nickname}` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  data-item
                  className="rounded-xl p-4 transition-all duration-300"
                  style={{
                    background: "hsl(var(--surface))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--accent-1) / 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
                  }}
                >
                  <p className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: "hsl(var(--text-muted))" }}>
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap" data-reveal>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                  boxShadow: "0 0 20px hsl(var(--accent-1) / 0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "0.88";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                }}
              >
                {t("about.githubBtn")}
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="/CV_Juan_Camilo_Mendoza_2026.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all"
                style={{
                  background: "hsl(var(--surface))",
                  border: "1px solid hsl(var(--border))",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--accent-1) / 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
                }}
              >
                <Download size={14} />
                {t("about.downloadCV")}
              </a>
            </div>
          </div>

          {/* Right: Core skills bars */}
          <div className="lg:pt-8 space-y-4" data-stagger>
            <p
              className="text-xs uppercase tracking-widest mb-6"
              style={{ color: "hsl(var(--text-muted))" }}
              data-item
            >
              {t("about.coreExpertise")}
            </p>
            {SKILLS.filter((s) => s.level >= 78).slice(0, 10).map((skill, i) => (
              <div key={skill.name} className="group" data-item>
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="text-sm font-medium transition-colors group-hover:text-white"
                    style={{ color: "hsl(var(--text-subtle))" }}
                  >
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono" style={{ color: "hsl(var(--text-muted))" }}>
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="h-[3px] rounded-full overflow-hidden progress-bar"
                  style={{ background: "hsl(var(--surface-2))" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${skill.level}%`,
                      background: "linear-gradient(to right, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                      opacity: 0,
                      animation: `fadeIn 0.5s ${i * 0.06 + 0.6}s forwards, growWidth 1.2s ${i * 0.06 + 0.3}s ease-out forwards`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes growWidth {
          from { width: 0%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
