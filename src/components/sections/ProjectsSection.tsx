"use client";
import { useRef, MouseEvent, useEffect, useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";

const CURATED = [
  { name: "api-loopy",        category: "Backend",  color: "#06b6d4" },
  { name: "StockManager",     category: "Mobile",   color: "#f59e0b" },
  { name: "vertisub-cms",     category: "Web",      color: "#10b981" },
  { name: "smalltube-api",    category: "Backend",  color: "#06b6d4" },
  { name: "navigation-app",   category: "Mobile",   color: "#f59e0b" },
  { name: "frondEnd-quiosco", category: "Frontend", color: "#7c3aed" },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python:     "#3776ab",
  PHP:        "#8892be",
  Java:       "#b07219",
  Dart:       "#00b4ab",
  HTML:       "#e34c26",
};

// ─── Terminal Loader ──────────────────────────────────────────────────────────
const TERMINAL_STEPS = [
  { text: "$ git fetch origin github.com/Mendoza727",          color: "#58a6ff" },
  { text: "  > Connecting to api.github.com...",               color: "#8b949e" },
  { text: "  > Authenticating public endpoints...",            color: "#8b949e" },
  { text: "  > Resolving user: Mendoza727",                    color: "#8b949e" },
  { text: "  > Fetching repository manifest...",               color: "#8b949e" },
  { text: "  > Downloading repository metadata...",            color: "#8b949e" },
  { text: "  > Grouping by [web · mobile · backend]...",       color: "#d2a8ff" },
  { text: "  > Processing language stats...",                  color: "#8b949e" },
  { text: "  ✓ 6 repositories loaded successfully.",           color: "#39d353" },
  { text: "  ✓ Done.",                                         color: "#39d353" },
];

function TerminalLoader() {
  const [lines, setLines] = useState<typeof TERMINAL_STEPS>([]);
  const [cursor, setCursor] = useState(true);
  const idxRef = useRef(0);

  useEffect(() => {
    // Typing steps
    const interval = setInterval(() => {
      if (idxRef.current < TERMINAL_STEPS.length) {
        setLines((prev) => [...prev, TERMINAL_STEPS[idxRef.current]]);
        idxRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 260);

    // Blinking cursor
    const blink = setInterval(() => setCursor((v) => !v), 530);

    return () => { clearInterval(interval); clearInterval(blink); };
  }, []);

  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid #30363d",
        borderRadius: "0.875rem",
        padding: "1.5rem",
        fontFamily: "JetBrains Mono, 'Fira Code', Consolas, monospace",
        fontSize: "0.78rem",
        lineHeight: 1.7,
        minHeight: "220px",
        boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Window chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.25rem" }}>
        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ marginLeft: "auto", color: "#484f58", fontSize: "0.68rem" }}>portfolio — bash</span>
      </div>

      {/* Lines */}
      {lines.map((line, i) => (
        <div key={i} style={{ color: line.color, whiteSpace: "pre" }}>
          {line.text}
        </div>
      ))}

      {/* Blinking cursor */}
      {idxRef.current < TERMINAL_STEPS.length && (
        <span style={{ color: "#39d353", opacity: cursor ? 1 : 0, transition: "opacity 0.1s" }}>█</span>
      )}
    </div>
  );
}

// ─── Tilt Card ────────────────────────────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -6;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 6;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: "transform 0.25s ease-out", transformStyle: "preserve-3d", height: "100%" }}>
      {children}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const { t } = useI18n();
  const [repos, setRepos] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.allSettled(
          CURATED.map((r) =>
            fetch(`https://api.github.com/repos/${PERSONAL_INFO.nickname}/${r.name}`)
              .then((res) => res.json())
          )
        );
        const map: Record<string, any> = {};
        results.forEach((res, i) => {
          if (res.status === "fulfilled" && res.value?.name) {
            map[CURATED[i].name] = res.value;
          }
        });
        setRepos(map);
      } catch (e) {
        console.error("GitHub fetch error", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const featured = CURATED.slice(0, 2);
  const rest = CURATED.slice(2);

  return (
    <section
      id="projects"
      aria-label="Projects section"
      style={{ background: "hsl(var(--bg))", position: "relative", padding: "7rem 0" }}
    >
      <div style={{ position: "absolute", top: "20%", right: "8%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, hsl(195 80% 60% / 0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="section-container" style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: "5rem" }}>
          <div className="section-label mb-6" data-reveal>{t("projects.label")}</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <div data-title style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.02 }}>
              <div className="title-inner">
                {t("projects.heading1")}
                <br />
                <span style={{ background: "linear-gradient(135deg, hsl(var(--accent-2)), hsl(195 80% 78%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {t("projects.heading2")}
                </span>
              </div>
            </div>
            <a
              href={`https://github.com/${PERSONAL_INFO.nickname}`}
              target="_blank" rel="noopener noreferrer" data-reveal
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", color: "hsl(var(--text-muted))", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
            >
              {t("projects.viewAll")} <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {loading ? (
          <TerminalLoader />
        ) : (
          <>
            {/* Featured 2-col */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>
              {featured.map((cur) => {
                const repo = repos[cur.name];
                return (
                  <TiltCard key={cur.name}>
                    <article
                      className="project-card"
                      style={{
                        position: "relative", background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))",
                        borderRadius: "1.25rem", overflow: "hidden", minHeight: "300px", height: "100%",
                        display: "flex", flexDirection: "column", transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                      }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${cur.color}55`; el.style.boxShadow = `0 24px 80px rgba(0,0,0,0.3), 0 0 40px ${cur.color}15`; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "hsl(var(--border))"; el.style.boxShadow = "none"; }}
                    >
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(to right, ${cur.color}, ${cur.color}60, transparent)` }} />

                      <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                          <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "0.2rem 0.7rem", borderRadius: "99px", background: `${cur.color}20`, border: `1px solid ${cur.color}40`, color: cur.color }}>
                            {cur.category}
                          </span>
                          {repo?.stargazers_count > 0 && (
                            <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>⭐ {repo.stargazers_count}</span>
                          )}
                        </div>

                        <h3 style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", fontWeight: 900, color: "white", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                          {repo?.name ?? cur.name}
                        </h3>
                        <p style={{ fontSize: "0.875rem", color: "hsl(var(--text-muted))", lineHeight: 1.7, flex: 1, marginBottom: "1.5rem" }}>
                          {repo?.description ?? "Open source project."}
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                          {repo?.language && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.7rem", fontFamily: "monospace", padding: "0.2rem 0.6rem", borderRadius: "0.4rem", background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>
                              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: LANG_COLORS[repo.language] ?? "#aaa", flexShrink: 0 }} />
                              {repo.language}
                            </span>
                          )}
                          {repo?.topics?.slice(0, 3).map((t: string) => (
                            <span key={t} style={{ fontSize: "0.7rem", fontFamily: "monospace", padding: "0.2rem 0.6rem", borderRadius: "0.4rem", background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>{t}</span>
                          ))}
                        </div>

                        <div style={{ display: "flex", gap: "0.6rem", marginTop: "auto" }}>
                          {repo?.html_url && (
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                              style={{ width: "36px", height: "36px", borderRadius: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))", textDecoration: "none", transition: "color 0.2s", position: "relative", zIndex: 10 }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
                            ><Github size={15} /></a>
                          )}
                          {repo?.homepage && (
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label="Live"
                              style={{ width: "36px", height: "36px", borderRadius: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))", textDecoration: "none", transition: "color 0.2s", position: "relative", zIndex: 10 }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = cur.color; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
                            ><ExternalLink size={15} /></a>
                          )}
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                );
              })}
            </div>

            {/* Rest compact 4-col */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {rest.map((cur) => {
                const repo = repos[cur.name];
                return (
                  <article
                    key={cur.name}
                    className="project-card"
                    style={{
                      background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))",
                      borderLeft: `3px solid ${cur.color}`, borderRadius: "1rem", padding: "1.4rem",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      display: "flex", flexDirection: "column", gap: "0.75rem",
                    }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-3px)"; el.style.boxShadow = `0 8px 32px rgba(0,0,0,0.25), 0 0 20px ${cur.color}15`; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: cur.color, display: "block", marginBottom: "0.3rem" }}>{cur.category}</span>
                        <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "white", lineHeight: 1.3 }}>{repo?.name ?? cur.name}</h3>
                      </div>
                      {repo?.html_url && (
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                          style={{ color: "hsl(var(--text-muted))", flexShrink: 0, marginLeft: "0.5rem", transition: "color 0.2s" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "hsl(var(--text-muted))"; }}
                        ><Github size={13} /></a>
                      )}
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))", lineHeight: 1.65, flex: 1 }}>
                      {repo?.description ?? "Open source project."}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
                      {repo?.language && (
                        <span style={{ fontSize: "0.65rem", fontFamily: "monospace", padding: "0.15rem 0.5rem", borderRadius: "0.35rem", background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: LANG_COLORS[repo.language] ?? "#aaa", flexShrink: 0 }} />
                          {repo.language}
                        </span>
                      )}
                      {repo?.topics?.slice(0, 2).map((t: string) => (
                        <span key={t} style={{ fontSize: "0.65rem", fontFamily: "monospace", padding: "0.15rem 0.5rem", borderRadius: "0.35rem", background: "hsl(var(--surface-2))", color: "hsl(var(--text-muted))" }}>{t}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
