"use client";
import { useRef, MouseEvent } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -8;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 8;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.25s ease-out", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function ProjectsSection() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative py-40 overflow-hidden"
      aria-label="Projects section"
      style={{ background: "hsl(var(--bg))" }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontSize: "22vw",
            fontWeight: 900,
            color: "white",
            opacity: 0.015,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          WORK
        </span>
      </div>

      {/* Glow orb */}
      <div
        className="bg-orb"
        data-y="-0.2"
        data-x="0.05"
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(195 90% 55% / 0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container relative">
        {/* Header */}
        <div className="mb-24">
          <div className="section-label mb-6" data-reveal>
            04 / Projects
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div
              data-title
              style={{
                fontSize: "clamp(2.8rem, 7vw, 7rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                overflow: "hidden",
              }}
            >
              <div className="title-inner">
                Selected
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--accent-2)) 0%, hsl(195 80% 78%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Work
                </span>
              </div>
            </div>
            <a
              href="https://github.com/Mendoza727"
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="group inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: "hsl(var(--text-muted))" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
            >
              View all on GitHub
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Featured cards — 2 column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {featured.map((project, i) => (
            <TiltCard key={project.id}>
              <article
                className="project-card"
                style={{
                  position: "relative",
                  background: "hsl(var(--surface))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  minHeight: "320px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsl(var(--accent-1) / 0.35)";
                  el.style.boxShadow = "0 24px 80px rgba(0,0,0,0.35), 0 0 40px hsl(var(--accent-1) / 0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsl(var(--border))";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Top accent gradient line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "2px",
                    background: "linear-gradient(to right, hsl(var(--accent-1)), hsl(var(--accent-2)), transparent)",
                  }}
                />

                {/* Hover glow overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, hsl(var(--accent-1) / 0) 0%, hsl(var(--accent-2) / 0) 100%)",
                    transition: "background 0.6s ease",
                    pointerEvents: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, hsl(var(--accent-1) / 0.04) 0%, hsl(var(--accent-2) / 0.03) 100%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, hsl(var(--accent-1) / 0) 0%, hsl(var(--accent-2) / 0) 100%)";
                  }}
                />

                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Badges */}
                  <div className="flex items-center gap-3 mb-auto">
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "99px",
                        background: "linear-gradient(135deg, hsl(var(--accent-1) / 0.15), hsl(var(--accent-2) / 0.1))",
                        border: "1px solid hsl(var(--accent-1) / 0.2)",
                        color: "hsl(var(--accent-2))",
                      }}
                    >
                      Featured
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                      fontWeight: 900,
                      color: "white",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      marginTop: "2rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Desc */}
                  <p style={{ fontSize: "0.875rem", color: "hsl(var(--text-muted))", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: "0.7rem",
                          fontFamily: "monospace",
                          padding: "0.2rem 0.65rem",
                          borderRadius: "0.4rem",
                          background: "hsl(var(--surface-2))",
                          color: "hsl(var(--text-muted))",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span style={{ fontSize: "0.7rem", fontFamily: "monospace", padding: "0.2rem 0.65rem", borderRadius: "0.4rem", background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
                        style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
                      >
                        <Github size={15} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live"
                        className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
                        style={{ background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--accent-2))"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>

        {/* Side projects — smaller 2-col grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((project) => (
              <article
                key={project.id}
                className="project-card"
                style={{
                  background: "hsl(var(--surface))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  transition: "border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--accent-2) / 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 style={{ fontWeight: 700, color: "white", fontSize: "0.95rem" }}>{project.title}</h3>
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                      style={{ color: "hsl(var(--text-muted))" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
                    >
                      <Github size={14} />
                    </a>
                  )}
                </div>
                <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", lineHeight: 1.65, marginBottom: "0.875rem" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} style={{ fontSize: "0.65rem", fontFamily: "monospace", padding: "0.15rem 0.5rem", borderRadius: "0.35rem", background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
