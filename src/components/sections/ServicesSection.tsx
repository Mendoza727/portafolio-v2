"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Sparkles, Brain, Smartphone, Server, ChevronDown } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Sparkles, Brain, Smartphone, Server,
};

export function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>(SERVICES[0].id);

  return (
    <section id="services" className="relative py-28 overflow-hidden" aria-label="Services section">
      {/* Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-900/20 blur-3xl pointer-events-none" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--text-muted))] mb-3">What I offer</p>
          <h2 className="text-3xl sm:text-5xl font-black">
            My <span className="text-gradient">Services</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto divide-y divide-[hsl(var(--border))]">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon] ?? Globe;
            const isOpen = openId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : service.id)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                        isOpen
                          ? "bg-gradient-to-br from-purple-500 to-cyan-400 text-white"
                          : "glass text-[hsl(var(--text-muted))] group-hover:text-white"
                      )}
                    >
                      <Icon size={18} />
                    </div>
                    <h3
                      className={cn(
                        "font-bold text-lg transition-colors",
                        isOpen ? "text-gradient" : "text-[hsl(var(--text-subtle))] group-hover:text-white"
                      )}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "text-[hsl(var(--text-muted))] transition-transform duration-300",
                      isOpen && "rotate-180 text-purple-400"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-14">
                        <p className="text-[hsl(var(--text-muted))] mb-4">{service.description}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-[hsl(var(--text-subtle))]">
                              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
