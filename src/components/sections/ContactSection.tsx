"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, Phone, Github, Linkedin, CheckCircle2, AlertCircle, MapPin } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(20),
  budget: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function InputStyle(hasError: boolean) {
  return {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    background: "hsl(var(--surface-2))",
    color: "white",
    fontSize: "0.875rem",
    border: `1px solid ${hasError ? "rgba(248,113,113,0.6)" : "hsl(var(--border))"}`,
    outline: "none",
    transition: "border-color 0.2s ease",
  } as React.CSSProperties;
}

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { t } = useI18n();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const contactItems = [
    { icon: Mail, label: t("contact.email"), value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: Phone, label: t("contact.phone"), value: PERSONAL_INFO.phone, href: `tel:${SOCIAL_LINKS.phone}` },
    { icon: Github, label: "GitHub", value: `@${PERSONAL_INFO.nickname}`, href: SOCIAL_LINKS.github },
    { icon: Linkedin, label: "LinkedIn", value: `/${PERSONAL_INFO.nickname}`, href: SOCIAL_LINKS.linkedin },
    { icon: MapPin, label: "Location", value: PERSONAL_INFO.location, href: undefined },
  ];

  return (
    <section
      id="contact"
      aria-label="Contact section"
      style={{
        position: "relative",
        paddingTop: "8rem",
        paddingBottom: "8rem",
        overflow: "hidden",
        background: "hsl(var(--bg))",
      }}
    >
      {/* Decorative borders */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--accent-1) / 0.3), transparent)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.08] pointer-events-none" />

      {/* Glow orbs */}
      <div
        className="bg-orb"
        data-y="-0.2"
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--accent-1) / 0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="bg-orb"
        data-y="0.1"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--accent-2) / 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative" }}>
        {/* Header */}
        <div className="mb-20">
          <div className="section-label mb-5" data-reveal>
            {t("contact.label")}
          </div>
          <div
            data-title
            style={{
              fontSize: "clamp(2.5rem, 7vw, 7.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              overflow: "hidden",
            }}
          >
            <div className="title-inner">
              {t("contact.heading1")}
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("contact.heading2")}
              </span>
            </div>
          </div>
          <p data-reveal style={{ color: "hsl(var(--text-muted))", marginTop: "1.25rem", maxWidth: "32rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
            {t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left: Contact info */}
          <aside className="lg:col-span-2 space-y-4" data-stagger>
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                data-item
                className="flex items-center gap-4"
                style={{
                  padding: "1.1rem 1.25rem",
                  borderRadius: "1rem",
                  background: "hsl(var(--surface))",
                  border: "1px solid hsl(var(--border))",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--accent-1) / 0.3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))"; }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "hsl(var(--surface-2))",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={15} style={{ color: "hsl(var(--accent-1))" }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.15rem" }}>
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      style={{ fontSize: "0.875rem", fontWeight: 600, color: "white", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--accent-2))"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "white" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1.25rem",
                borderRadius: "1rem",
                background: "hsl(var(--surface))",
                border: "1px solid hsl(160 80% 40% / 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#34d399" }}>
                  {t("about.available")}
                </span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", lineHeight: 1.6 }}>
                {t("contact.description")} Typical response: 24h.
              </p>
            </div>
          </aside>

          {/* Right: Form */}
          <div className="lg:col-span-3" data-reveal>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              style={{
                background: "hsl(var(--surface))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "1.5rem",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                    {t("contact.nameLabel")}
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    placeholder="Juan Pérez"
                    style={InputStyle(!!errors.name)}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(var(--accent-1) / 0.6)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.name ? "rgba(248,113,113,0.6)" : "hsl(var(--border))"; }}
                  />
                  {errors.name && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                    {t("contact.emailLabel")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="juan@empresa.com"
                    style={InputStyle(!!errors.email)}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(var(--accent-1) / 0.6)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? "rgba(248,113,113,0.6)" : "hsl(var(--border))"; }}
                  />
                  {errors.email && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                  {t("contact.subjectLabel")}
                </label>
                <input
                  id="subject"
                  {...register("subject")}
                  placeholder="Proyecto Web / Consultoría"
                  style={InputStyle(!!errors.subject)}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(var(--accent-1) / 0.6)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = errors.subject ? "rgba(248,113,113,0.6)" : "hsl(var(--border))"; }}
                />
                {errors.subject && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="budget" style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                  Budget (Opcional)
                </label>
                <select id="budget" {...register("budget")} style={{ ...InputStyle(false), color: "hsl(var(--text-subtle))" }}>
                  <option value="">Select / Seleccionar</option>
                  <option value="<$1k">Less than $1,000</option>
                  <option value="$1k-$5k">$1,000 – $5,000</option>
                  <option value="$5k-$15k">$5,000 – $15,000</option>
                  <option value="$15k+">$15,000+</option>
                  <option value="discuss">Hablemos / Let&apos;s discuss</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "hsl(var(--text-muted))", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={5}
                  placeholder="Cuéntame sobre tu proyecto..."
                  style={{ ...InputStyle(!!errors.message), resize: "none" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "hsl(var(--accent-1) / 0.6)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? "rgba(248,113,113,0.6)" : "hsl(var(--border))"; }}
                />
                {errors.message && <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.message.message}</p>}
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2" style={{ color: "#34d399", fontSize: "0.875rem", background: "hsl(160 80% 40% / 0.08)", border: "1px solid hsl(160 80% 40% / 0.2)", borderRadius: "0.75rem", padding: "0.75rem 1rem" }}>
                  <CheckCircle2 size={15} />
                  ¡Mensaje enviado! Te responderé en menos de 24h.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2" style={{ color: "#f87171", fontSize: "0.875rem", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "0.75rem", padding: "0.75rem 1rem" }}>
                  <AlertCircle size={15} />
                  Algo salió mal. Escríbeme directamente a {PERSONAL_INFO.email}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all duration-300"
                style={{
                  padding: "0.9rem",
                  background: "linear-gradient(135deg, hsl(var(--accent-1)), hsl(var(--accent-2)))",
                  boxShadow: "0 0 24px hsl(var(--accent-1) / 0.3)",
                  opacity: status === "loading" ? 0.65 : 1,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                {status === "loading" ? (
                  <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                ) : (
                  <>
                    <Send size={15} />
                    {t("contact.send")}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
