"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const t = TESTIMONIALS[current];

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="relative py-28 bg-[hsl(var(--surface))]" aria-label="Testimonials">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--text-muted))] mb-3">What clients say</p>
          <h2 className="text-3xl sm:text-5xl font-black">
            Testi<span className="text-gradient">monials</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="glass rounded-2xl p-10 text-center"
              >
                <Quote size={36} className="text-purple-500/40 mx-auto mb-6" />
                <p className="text-[hsl(var(--text-subtle))] text-lg leading-relaxed italic mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                    {t.name[0]}
                  </div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-[hsl(var(--text-muted))]">
                    {t.role} · {t.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-[hsl(var(--text-muted))] hover:text-white hover:border-purple-500/40 transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-purple-400 w-6" : "bg-[hsl(var(--border))]"}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-[hsl(var(--text-muted))] hover:text-white hover:border-purple-500/40 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
