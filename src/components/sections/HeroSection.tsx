"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/3d/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obj = { n: 0 };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(obj, {
          n: to,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) ref.current.textContent = `${Math.round(obj.n)}${suffix}`;
          },
        });
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setMounted(true);

    // Initial entrance animations
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(".hero-eyebrow", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" })
      .fromTo(".hero-name-1", { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out" }, "-=0.3")
      .fromTo(".hero-name-2", { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out" }, "-=0.8")
      .fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .fromTo(".hero-desc", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-ctas", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .fromTo(".hero-socials", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3")
      .fromTo(".hero-stats", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
      .fromTo(".hero-scroll-hint", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");

    // Scroll indicator bob
    gsap.to(".hero-scroll-line", {
      scaleY: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 1.3,
      ease: "sine.inOut",
      transformOrigin: "top center",
    });

    // Nav entrance
    gsap.fromTo("#main-nav", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 1.8 });
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── 3D Canvas (full bleed, scrub-fades out) ─────────────────────────── */}
      <div className="hero-canvas-wrap absolute inset-0 z-0">
        {mounted && <HeroCanvas />}
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 z-[1] dot-grid opacity-15 pointer-events-none" />

      {/* Purple-cyan radial glow at center */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 48%, hsl(262 80% 65% / 0.14) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 60% 60%, hsl(195 90% 55% / 0.07) 0%, transparent 65%)",
        }}
      />

      {/* Scan-line effect */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-[0.03]">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)",
            backgroundSize: "100% 4px",
          }}
        />
      </div>

      {/* Bottom gradient fade-out */}
      <div className="absolute bottom-0 left-0 right-0 h-80 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to top, hsl(var(--bg)) 0%, hsl(var(--bg) / 0.7) 40%, transparent 100%)" }} />

      {/* ── Main content (GSAP will scrub this up on scroll) ─────────────────── */}
      <div className="hero-content relative z-20 flex flex-col items-center text-center w-full section-container gap-6 pt-24">

        {/* Availability badge */}
        <div className="hero-eyebrow opacity-0">
          <span
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider"
            style={{
              background: "hsl(var(--surface) / 0.8)",
              border: "1px solid hsl(var(--accent-2) / 0.3)",
              color: "hsl(var(--accent-2))",
              backdropFilter: "blur(16px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t("hero.available")} · {PERSONAL_INFO.location}
          </span>
        </div>

        {/* H1 — massive, with clip reveal */}
        <h1 className="w-full" aria-label={PERSONAL_INFO.name}>
          <div className="overflow-hidden leading-none">
            <div className="hero-name-1"
              style={{
                fontSize: "clamp(3rem, 8.5vw, 9rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                background: "linear-gradient(135deg, hsl(var(--accent-1)) 0%, hsl(var(--accent-2)) 60%, #fff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Juan
            </div>
          </div>
          <div className="overflow-hidden leading-none">
            <div className="hero-name-2"
              style={{
                fontSize: "clamp(3rem, 8.5vw, 9rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "white",
              }}
            >
              Mendoza
            </div>
          </div>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle opacity-0 text-xl sm:text-2xl font-light tracking-[0.08em] uppercase"
          style={{ color: "hsl(var(--text-subtle))", letterSpacing: "0.15em" }}>
          {t("hero.subtitle")}
        </p>

        {/* Tagline */}
        <p className="hero-desc opacity-0 max-w-md text-base leading-relaxed"
          style={{ color: "hsl(var(--text-muted))" }}>
          {t("hero.tagline")}
        </p>

        {/* CTAs */}
        <div className="hero-ctas opacity-0 flex flex-wrap gap-4 justify-center mt-2">
          <button
            onClick={scrollToAbout}
            className="relative px-8 py-3.5 rounded-full text-sm font-bold text-white overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
              boxShadow: "0 0 30px hsl(var(--accent-1) / 0.4), 0 4px 24px rgba(0,0,0,0.3)",
            }}
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            {t("hero.cta")}
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all group"
            style={{
              background: "hsl(var(--surface) / 0.7)",
              border: "1px solid hsl(var(--border) / 0.8)",
              backdropFilter: "blur(16px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--accent-1) / 0.5)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px hsl(var(--accent-1) / 0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border) / 0.8)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {t("hero.ctaContact")}
          </button>
        </div>

        {/* Social links */}
        <div className="hero-socials opacity-0 flex items-center gap-6 mt-1">
          {[
            { href: SOCIAL_LINKS.github, icon: Github, label: "GitHub" },
            { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: "LinkedIn" },
            { href: `mailto:${SOCIAL_LINKS.email}`, icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
              style={{ color: "hsl(var(--text-muted))" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.background = "hsl(var(--surface-2))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          ))}

          <div style={{ width: "1px", height: "24px", background: "hsl(var(--border))" }} />

          <div className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--text-muted))" }}>
            <MapPin size={11} style={{ color: "hsl(var(--accent-1))" }} />
            {PERSONAL_INFO.location}
          </div>
        </div>

        {/* Stats row */}
        <div className="hero-stats opacity-0 flex items-center gap-8 sm:gap-16 mt-4 pt-8"
          style={{ borderTop: "1px solid hsl(var(--border) / 0.5)", position: "relative", zIndex: 30 }}>
          {[
            { value: PERSONAL_INFO.yearsOfExperience, suffix: "+", label: t("hero.yearsExp") },
            { value: 20, suffix: "+", label: t("hero.projects") },
            { value: 100, suffix: "%", label: t("hero.satisfaction") },
          ].map(({ value, suffix, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-3xl sm:text-4xl font-black"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Counter to={value} suffix={suffix} />
              </div>
              <div className="text-[10px] mt-1 tracking-widest uppercase"
                style={{ color: "hsl(var(--text-muted))" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="hero-scroll-hint opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group"
        style={{ color: "hsl(var(--text-muted))" }}
        aria-label="Scroll down"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase font-semibold group-hover:text-white transition-colors">
          Scroll
        </span>
        <div
          className="hero-scroll-line"
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, hsl(var(--accent-1)), transparent)",
          }}
        />
        <ArrowDown size={12} className="group-hover:translate-y-1 transition-transform" />
      </button>
    </section>
  );
}
