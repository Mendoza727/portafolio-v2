"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MapPin, Github, Linkedin, CheckCircle2, AlertCircle } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  budget: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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

  return (
    <section id="contact" className="relative py-28 overflow-hidden" aria-label="Contact section">
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--text-muted))] mb-3">Let&apos;s collaborate</p>
          <h2 className="text-3xl sm:text-5xl font-black">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-[hsl(var(--text-muted))] mt-4 max-w-md mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left info panel */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: SOCIAL_LINKS.email, href: `mailto:${SOCIAL_LINKS.email}` },
                { icon: MapPin, label: "Location", value: PERSONAL_INFO.location, href: undefined },
                { icon: Github, label: "GitHub", value: `@${PERSONAL_INFO.nickname}`, href: SOCIAL_LINKS.github },
                { icon: Linkedin, label: "LinkedIn", value: `/${PERSONAL_INFO.nickname}`, href: SOCIAL_LINKS.linkedin },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--text-muted))]">{label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-gradient transition-all">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-white">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400">Available for work</span>
              </div>
              <p className="text-xs text-[hsl(var(--text-muted))] leading-relaxed">
                Currently accepting freelance projects and exploring full-time opportunities. Typical response time: 24 hours.
              </p>
            </div>
          </motion.aside>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-8 space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[hsl(var(--text-muted))] mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    placeholder="John Doe"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-[hsl(var(--surface-2))] text-white text-sm border border-[hsl(var(--border))] focus:outline-none focus:border-purple-500 placeholder:text-[hsl(var(--text-muted))] transition-colors",
                      errors.name && "border-red-500/60"
                    )}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[hsl(var(--text-muted))] mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-[hsl(var(--surface-2))] text-white text-sm border border-[hsl(var(--border))] focus:outline-none focus:border-purple-500 placeholder:text-[hsl(var(--text-muted))] transition-colors",
                      errors.email && "border-red-500/60"
                    )}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-[hsl(var(--text-muted))] mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  id="subject"
                  {...register("subject")}
                  placeholder="Project Inquiry"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-[hsl(var(--surface-2))] text-white text-sm border border-[hsl(var(--border))] focus:outline-none focus:border-purple-500 placeholder:text-[hsl(var(--text-muted))] transition-colors",
                    errors.subject && "border-red-500/60"
                  )}
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="budget" className="block text-xs font-semibold text-[hsl(var(--text-muted))] mb-2 uppercase tracking-wider">
                  Budget (Optional)
                </label>
                <select
                  id="budget"
                  {...register("budget")}
                  className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--surface-2))] text-[hsl(var(--text-subtle))] text-sm border border-[hsl(var(--border))] focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Select budget range</option>
                  <option value="< $1k">Less than $1,000</option>
                  <option value="$1k-$5k">$1,000 – $5,000</option>
                  <option value="$5k-$15k">$5,000 – $15,000</option>
                  <option value="$15k+">$15,000+</option>
                  <option value="discuss">Let&apos;s discuss</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[hsl(var(--text-muted))] mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-[hsl(var(--surface-2))] text-white text-sm border border-[hsl(var(--border))] focus:outline-none focus:border-purple-500 placeholder:text-[hsl(var(--text-muted))] transition-colors resize-none",
                    errors.message && "border-red-500/60"
                  )}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm glass-subtle rounded-xl p-3">
                  <CheckCircle2 size={16} />
                  Message sent! I&apos;ll get back to you within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm glass-subtle rounded-xl p-3">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:opacity-90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
              >
                {status === "loading" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
