"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Sparkles, Brain, Smartphone, Server, ChevronDown, type LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const ICON_MAP: Record<string, LucideIcon> = {
  Globe, Sparkles, Brain, Smartphone, Server,
};

const ACCENT_COLORS = ["#7c3aed", "#06b6d4", "#10b981", "#d946ef", "#f59e0b"];

const SERVICE_KEYS = [
  { id: "1", icon: "Globe",      titleKey: "services.s1title", descKey: "services.s1desc", featureKeys: ["services.s1f1","services.s1f2","services.s1f3","services.s1f4"] },
  { id: "2", icon: "Brain",      titleKey: "services.s2title", descKey: "services.s2desc", featureKeys: ["services.s2f1","services.s2f2","services.s2f3","services.s2f4"] },
  { id: "3", icon: "Sparkles",   titleKey: "services.s3title", descKey: "services.s3desc", featureKeys: ["services.s3f1","services.s3f2","services.s3f3","services.s3f4"] },
  { id: "4", icon: "Smartphone", titleKey: "services.s4title", descKey: "services.s4desc", featureKeys: ["services.s4f1","services.s4f2","services.s4f3","services.s4f4"] },
  { id: "5", icon: "Server",     titleKey: "services.s5title", descKey: "services.s5desc", featureKeys: ["services.s5f1","services.s5f2","services.s5f3","services.s5f4"] },
];

export function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>(SERVICE_KEYS[0].id);
  const { t } = useI18n();

  return (
    <section
      id="services"
      aria-label="Services section"
      style={{
        position: "relative",
        paddingTop: "8rem",
        paddingBottom: "8rem",
        overflow: "hidden",
        background: "hsl(var(--bg))",
      }}
    >
      {/* Border top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-1) / 0.3), transparent)" }} />

      {/* Left glow orb */}
      <div
        className="bg-orb"
        data-y="0.15"
        style={{
          position: "absolute",
          left: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--accent-1) / 0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative" }}>
        {/* Header */}
        <div className="mb-20" data-reveal>
          <div className="section-label mb-5">{t("services.label")}</div>
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
              {t("services.heading1")}&nbsp;
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("services.heading2")}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{ maxWidth: "52rem", margin: "0 auto" }}
          data-stagger
        >
          {SERVICE_KEYS.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Globe;
            const isOpen = openId === service.id;
            const color = ACCENT_COLORS[i] ?? "#7c3aed";

            return (
              <div
                key={service.id}
                data-item
                style={{
                  borderBottom: "1px solid hsl(var(--border))",
                }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : service.id)}
                  className="w-full flex items-center justify-between text-left group"
                  style={{ padding: "1.5rem 0" }}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isOpen
                          ? `linear-gradient(135deg, ${color}cc, ${color}88)`
                          : "hsl(var(--surface))",
                        border: `1px solid ${isOpen ? color + "44" : "hsl(var(--border))"}`,
                        color: isOpen ? "white" : "hsl(var(--text-muted))",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={17} />
                    </div>
                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: isOpen ? "white" : "hsl(var(--text-subtle))",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {t(service.titleKey as any)}
                    </h3>
                  </div>

                  <ChevronDown
                    size={18}
                    style={{
                      color: isOpen ? color : "hsl(var(--text-muted))",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                    }}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ paddingBottom: "1.5rem", paddingLeft: "3.5rem" }}>
                        <p style={{ color: "hsl(var(--text-muted))", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
                          {t(service.descKey as any)}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.featureKeys.map((fk) => (
                            <li key={fk} className="flex items-center gap-2" style={{ fontSize: "0.85rem", color: "hsl(var(--text-subtle))" }}>
                              <span
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  background: color,
                                  flexShrink: 0,
                                  boxShadow: `0 0 8px ${color}80`,
                                }}
                              />
                              {t(fk as any)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
