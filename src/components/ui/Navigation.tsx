"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Code2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { SOCIAL_LINKS, PERSONAL_INFO } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";

export function Navigation() {
  const { isMenuOpen, toggleMenu, setMenuOpen } = useAppStore();
  const [scrolled, setScrolled] = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const { t, locale, setLocale } = useI18n();

  const NAV_ITEMS = useMemo(() => [
    { label: t("nav.about"),      href: "#about"      },
    { label: t("nav.skills"),     href: "#skills"     },
    { label: t("nav.services"),   href: "#services"   },
    { label: t("nav.projects"),   href: "#projects"   },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.contact"),    href: "#contact"    },
  ], [t]);

  /* Scroll detection — avoid false initial value on client */
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll(); // sync immediately
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, [setMenuOpen]);

  return (
    <>
      <style>{`
        @keyframes nav-slide-down {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
      `}</style>

      <header
        id="main-nav"
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding: scrolled ? "0.85rem 0" : "1.6rem 0",
          background: scrolled ? "var(--nav-bg, hsl(235 22% 8% / 0.9))" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(var(--border) / 0.5)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
          transition: "padding 0.4s ease, background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
          /* Slide in once on first mount — replaces the jarring pop */
          animation: mounted ? "nav-slide-down 0.5s cubic-bezier(0.16,1,0.3,1) both" : "none",
        }}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="Home">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))" }}
            >
              <Code2 size={18} className="text-white" />
            </div>
            <span
              className="font-bold text-lg hidden sm:block"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {PERSONAL_INFO.nickname}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "hsl(var(--text-muted))" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-subtle))"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Lang + Socials + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language toggle */}
            <div
              className="flex items-center gap-1 rounded-full p-1"
              style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}
              role="group"
              aria-label="Language selector"
            >
              {(["es", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                  style={
                    locale === lang
                      ? { background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))", color: "white" }
                      : { color: "hsl(var(--text-muted))", background: "transparent" }
                  }
                  aria-pressed={locale === lang}
                  aria-label={lang === "es" ? "Español" : "English"}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {([
              { href: SOCIAL_LINKS.github,   icon: Github,   label: "GitHub"   },
              { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: "LinkedIn" },
            ] as const).map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: "hsl(var(--text-muted))", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-subtle))"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
              >
                <Icon size={18} />
              </a>
            ))}

            <button
              onClick={() => handleNavClick("#contact")}
              className="px-5 py-2 rounded-full text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                boxShadow: "0 0 20px hsl(var(--accent-1) / 0.3)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              {t("nav.hireMe")}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-xl"
            style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", color: "white" }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-40 pt-24 px-6 lg:hidden"
            style={{ background: "hsl(var(--bg) / 0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className="text-2xl font-black text-left text-white transition-all"
                  style={{ letterSpacing: "-0.02em" }}
                  onMouseEnter={(e) => {
                    Object.assign((e.currentTarget as HTMLElement).style, {
                      background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                      webkitBackgroundClip: "text",
                      webkitTextFillColor: "transparent",
                    });
                  }}
                  onMouseLeave={(e) => {
                    Object.assign((e.currentTarget as HTMLElement).style, {
                      background: "none",
                      webkitTextFillColor: "white",
                    });
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center gap-3 mt-10">
              {(["es", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  className="px-4 py-2 rounded-full text-sm font-bold uppercase transition-all"
                  style={
                    locale === lang
                      ? { background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))", color: "white" }
                      : { background: "hsl(var(--surface))", color: "hsl(var(--text-muted))", border: "1px solid hsl(var(--border))" }
                  }
                >
                  {lang === "es" ? "🇨🇴 ES" : "🇺🇸 EN"}
                </button>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              {([
                { href: SOCIAL_LINKS.github,   icon: Github,   label: "GitHub"   },
                { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: "LinkedIn" },
              ] as const).map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ color: "hsl(var(--text-muted))" }}>
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
