"use client";
import Link from "next/link";
import { Github, Linkedin, Mail, Code2, Phone } from "lucide-react";
import { SOCIAL_LINKS, PERSONAL_INFO } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useI18n();

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer
      style={{
        position: "relative",
        background: "hsl(var(--surface))",
        borderTop: "1px solid hsl(var(--border))",
      }}
    >
      {/* Top gradient line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-1) / 0.5), transparent)" }} />

      <div className="section-container" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                }}
              >
                <Code2 size={16} style={{ color: "white" }} />
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.05rem",
                  background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {PERSONAL_INFO.nickname}
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-muted))", lineHeight: 1.7, maxWidth: "22rem", marginBottom: "1.5rem" }}>
              {t("hero.tagline")}
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { href: SOCIAL_LINKS.github, icon: Github, label: "GitHub" },
                { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: `mailto:${SOCIAL_LINKS.email}`, icon: Mail, label: "Email" },
                { href: `tel:${SOCIAL_LINKS.phone}`, icon: Phone, label: "Phone" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "hsl(var(--surface-2))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--text-muted))",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "white";
                    el.style.borderColor = "hsl(var(--accent-1) / 0.4)";
                    el.style.boxShadow = "0 0 12px hsl(var(--accent-1) / 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "hsl(var(--text-muted))";
                    el.style.borderColor = "hsl(var(--border))";
                    el.style.boxShadow = "none";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1.25rem" }}>
              Navigation
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    style={{ fontSize: "0.875rem", color: "hsl(var(--text-muted))", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1.25rem" }}>
              {t("nav.hireMe")}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "hsl(var(--text-muted))", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              {t("contact.description")}
            </p>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                borderRadius: "99px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "white",
                background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                boxShadow: "0 0 20px hsl(var(--accent-1) / 0.25)",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.87"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <Mail size={14} />
              {t("contact.email")}
            </a>

            {/* Download CV */}
            <a
              href="/CV_Juan_Camilo_Mendoza_2026.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                borderRadius: "99px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "white",
                background: "hsl(var(--surface-2))",
                border: "1px solid hsl(var(--border))",
                textDecoration: "none",
                transition: "border-color 0.2s",
                marginTop: "0.75rem",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--accent-1) / 0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))"; }}
            >
              ↓ {t("about.downloadCV")}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid hsl(var(--border))",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="sm:flex-row"
        >
          <p style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>
            © {year} {PERSONAL_INFO.name}. {t("footer.rights")}
          </p>
          <p style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
