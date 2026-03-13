import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Code2, ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS, NAV_ITEMS, PERSONAL_INFO } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[hsl(var(--border))] bg-[hsl(var(--surface))]">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg text-gradient">{PERSONAL_INFO.nickname}</span>
            </div>
            <p className="text-sm text-[hsl(var(--text-muted))] leading-relaxed max-w-xs">
              {PERSONAL_INFO.tagline}
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { href: SOCIAL_LINKS.github, icon: Github, label: "GitHub" },
                { href: SOCIAL_LINKS.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: SOCIAL_LINKS.twitter, icon: Twitter, label: "Twitter" },
                { href: `mailto:${SOCIAL_LINKS.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-[hsl(var(--text-muted))] hover:text-white hover:border-purple-500/50 transition-all group"
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-[hsl(var(--text-muted))] hover:text-white transition-colors link-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Let&apos;s Work Together</h3>
            <p className="text-sm text-[hsl(var(--text-muted))] mb-6 leading-relaxed">
              Available for freelance projects and full-time opportunities.
            </p>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:opacity-90 transition-all group"
            >
              <Mail size={15} />
              Get in touch
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--border))] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(var(--text-muted))]">
            © {year} {PERSONAL_INFO.name}. Crafted with passion & Next.js.
          </p>
          <p className="text-xs text-[hsl(var(--text-muted))]">
            Designed & Developed by{" "}
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {PERSONAL_INFO.nickname}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
