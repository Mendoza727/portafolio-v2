"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Static config (defined outside component — never re-created) ─────── */
const LINES = [
  { text: "mendoza727@portfolio:~$ ./launch.sh",    color: "#c9d1d9" },
  { text: "  ▸ Checking system requirements...",    color: "#6e7681" },
  { text: "  ✓ Node.js v20.x   — ok",               color: "#39d353" },
  { text: "  ✓ pnpm 9.x        — ok",               color: "#39d353" },
  { text: "  ✓ TypeScript 5    — ok",               color: "#39d353" },
  { text: "",                                        color: ""        },
  { text: "mendoza727@portfolio:~$ git log --oneline -3", color: "#c9d1d9" },
  { text: "  a3f9c2e feat: AI automation pipeline", color: "#d2a8ff" },
  { text: "  b81d4fa perf: –45% load time",         color: "#d2a8ff" },
  { text: "  c07a1b3 feat: streaming 600 users",    color: "#d2a8ff" },
  { text: "",                                        color: ""        },
  { text: "mendoza727@portfolio:~$ pnpm build",     color: "#c9d1d9" },
  { text: "  ▸ Compiling 47 modules...",            color: "#6e7681" },
  { text: "  ✓ Build complete  (0 errors, 0 warn)", color: "#39d353" },
  { text: "",                                        color: ""        },
  { text: "mendoza727@portfolio:~$ deploy --prod",  color: "#c9d1d9" },
  { text: "  ✓ CDN purged · edge ready · live ↗",  color: "#39d353" },
] as const;

/* Cumulative delays — each line appears after the previous */
const DELAYS = [100, 600, 1050, 1300, 1500, 1700, 1900, 2300, 2600, 2900, 3100, 3300, 3800, 5000, 5200, 5400, 6000] as const;
const BAR_START  = 6300;
const BAR_TICKS  = 56;
const BAR_TICK_MS = 50;  // 56 × 50ms = 2.8s

/* Deterministic particles — avoid recalculating each render */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 37 + i * i * 3) % 90}%`,
  top:  `${3 + (i * 53 + i * 7) % 94}%`,
  size: 1 + (i % 3),
  delay: `${(i * 0.4) % 4}s`,
  duration: `${3 + (i % 4)}s`,
  bg: i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#06b6d4" : "#d946ef",
}));

export function CliLoader({ onDone }: { onDone: () => void }) {
  const [count,    setCount]    = useState(0);     // visible line count
  const [barTick,  setBarTick]  = useState(0);
  const [barDone,  setBarDone]  = useState(false);
  const [exiting,  setExiting]  = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Line reveal + bar */
  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];
    DELAYS.forEach((delay, i) => {
      ids.push(setTimeout(() => setCount(i + 1), delay));
    });
    // Bar phase
    let tick = 0;
    ids.push(setTimeout(() => {
      const barId = setInterval(() => {
        tick++;
        setBarTick(tick);
        if (tick >= BAR_TICKS) {
          clearInterval(barId);
          setBarDone(true);
        }
      }, BAR_TICK_MS);
      // Store interval id so cleanup works — attach to ids array isn't possible for intervals, handled by barDone effect
    }, BAR_START));
    return () => ids.forEach(clearTimeout);
  }, []); // stable — no deps needed

  /* Exit sequence */
  const handleExit = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    setTimeout(onDone, 600);
  }, [onDone]);

  useEffect(() => {
    if (!barDone) return;
    const t = setTimeout(handleExit, 500);
    return () => clearTimeout(t);
  }, [barDone, handleExit]);

  /* Auto-scroll terminal to bottom as lines appear */
  useEffect(() => {
    const el = termRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [count, barTick]);

  const pct    = Math.round((barTick / BAR_TICKS) * 100);
  const filled = Math.round((barTick / BAR_TICKS) * 28);
  const barStr = `${"█".repeat(filled)}${"░".repeat(28 - filled)}`;

  return (
    <>
      <style>{`
        @keyframes cli-fade-up   { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes cli-blink     { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes cli-float     { 0%,100% { transform: translateY(0) scale(1); opacity: .45; } 50% { transform: translateY(-14px) scale(1.3); opacity: 1; } }
        @keyframes cli-scan      { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }
        @keyframes cli-glow      { 0%,100% { opacity: .18; } 50% { opacity: .3; } }
        @keyframes cli-bar-glow  { 0%,100% { box-shadow: 0 0 8px #39d35360; } 50% { box-shadow: 0 0 18px #39d353bb; } }
        @keyframes cli-logo-in   { from { opacity: 0; letter-spacing: .5em; } to { opacity: 1; letter-spacing: .18em; } }
        @keyframes cli-underline { from { width: 0; } to { width: 100%; } }
        @keyframes cli-line      { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#080810",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.6s cubic-bezier(0.4,0,0.2,1)" : "none",
        pointerEvents: exiting ? "none" : "all",
      }}>

        {/* Ambient particles */}
        {PARTICLES.map(p => (
          <div key={p.id} style={{
            position: "absolute", left: p.left, top: p.top,
            width: `${p.size * 2}px`, height: `${p.size * 2}px`,
            borderRadius: "50%", background: p.bg,
            animation: `cli-float ${p.duration} ${p.delay} ease-in-out infinite`,
            filter: "blur(1px)", pointerEvents: "none",
          }} />
        ))}

        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, #7c3aed22 0%, transparent 70%)", animation: "cli-glow 4s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "8%",  width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, #06b6d420 0%, transparent 70%)", animation: "cli-glow 5s 1.5s ease-in-out infinite", pointerEvents: "none" }} />

        {/* Scan line */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(to right, transparent, #7c3aed18, #06b6d418, transparent)", animation: "cli-scan 8s linear infinite" }} />
        </div>

        {/* Logo */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "clamp(1.5rem,5vh,3.5rem)", marginBottom: "clamp(0.75rem,2vh,1.5rem)", flexShrink: 0 }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, marginBottom: "0.85rem", background: "linear-gradient(135deg,#7c3aed,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: 900, color: "white", boxShadow: "0 0 32px #7c3aed66,0 0 64px #7c3aed22", fontFamily: "monospace" }}>{"</>"}</div>
          <div style={{ fontSize: "clamp(0.85rem,2vw,1.1rem)", fontWeight: 800, letterSpacing: ".18em", textTransform: "uppercase", color: "white", fontFamily: "'Outfit','Inter',sans-serif", animation: "cli-logo-in 0.9s cubic-bezier(0.16,1,0.3,1) both", position: "relative" }}>
            Mendoza<span style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>727</span>
            <div style={{ position: "absolute", bottom: -4, left: 0, height: 1, background: "linear-gradient(90deg,#7c3aed,#06b6d4)", animation: "cli-underline 1.4s 0.4s cubic-bezier(0.16,1,0.3,1) both" }} />
          </div>
          <p style={{ marginTop: "0.5rem", fontSize: "0.62rem", letterSpacing: ".28em", textTransform: "uppercase", color: "#484f58", fontFamily: "'JetBrains Mono',monospace", animation: "cli-fade-up 0.7s 0.6s both" }}>
            Full-Stack Engineer · AI & Automation
          </p>
        </div>

        {/* Terminal window */}
        <div style={{
          position: "relative", zIndex: 2,
          margin: "0 auto",
          width: "min(720px, calc(100vw - 2rem))",
          flex: 1, minHeight: 0,
          display: "flex", flexDirection: "column",
          borderRadius: 16, overflow: "hidden",
          border: "1px solid #21262d",
          boxShadow: "0 24px 64px rgba(0,0,0,.6), 0 0 0 1px #30363d44, inset 0 1px 0 #ffffff08",
          marginBottom: "clamp(1.25rem,3vh,2.5rem)",
          animation: "cli-fade-up 0.6s 0.2s both",
        }}>
          {/* Title bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", background: "#161b22", borderBottom: "1px solid #21262d", flexShrink: 0 }}>
            {["#ff5f57","#febc2e","#28c840"].map(c => (
              <div key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c, flexShrink: 0 }} />
            ))}
            <span style={{ flex: 1, textAlign: "center", fontSize: "0.72rem", color: "#6e7681", fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".04em" }}>
              zsh — mendoza727 — portfolio@prod
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#39d353", boxShadow: "0 0 6px #39d35399", animation: "cli-blink 2s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.6rem", color: "#39d353", fontFamily: "monospace", letterSpacing: ".06em" }}>LIVE</span>
            </div>
          </div>

          {/* Body — auto-scroll ref */}
          <div
            ref={termRef}
            style={{ flex: 1, minHeight: 0, padding: "1.1rem 1.4rem 1.4rem", fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace", background: "#0d1117", overflowY: "auto", scrollBehavior: "smooth", display: "flex", flexDirection: "column" }}
          >
            <div style={{ color: "#484f58", fontSize: "0.7rem", marginBottom: "0.65rem", lineHeight: 1.6 }}>
              Last login: {new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"2-digit"})} on ttys001
            </div>

            {LINES.slice(0, count).map((line, i) => (
              <div key={i} style={{
                color: line.color || "transparent",
                fontSize: "0.78rem", lineHeight: 1.75,
                whiteSpace: "pre",
                animation: "cli-line 0.14s ease both",
                minHeight: line.text === "" ? "0.45rem" : undefined,
              }}>
                {line.text}
              </div>
            ))}

            {/* Blinking cursor */}
            {count > 0 && count < LINES.length && barTick === 0 && (
              <span style={{ display: "inline-block", width: 8, height: 15, background: "#39d353", marginLeft: 2, verticalAlign: "middle", animation: "cli-blink 1s step-start infinite" }} />
            )}

            {/* Progress bar */}
            {barTick > 0 && (
              <div style={{ marginTop: "0.9rem", animation: "cli-line 0.2s ease both" }}>
                <div style={{ fontSize: "0.76rem", color: "#58a6ff", fontFamily: "'JetBrains Mono',monospace", marginBottom: "0.45rem" }}>
                  {`$ loading portfolio  [${barStr}]  ${pct}%`}
                </div>
                <div style={{ height: 3, background: "#21262d", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#1a7f37,#39d353)", borderRadius: 99, transition: `width ${BAR_TICK_MS}ms linear`, animation: pct > 30 ? "cli-bar-glow 1.5s ease-in-out infinite" : "none" }} />
                </div>
                {barDone && (
                  <div style={{ marginTop: "0.65rem", fontSize: "0.76rem", color: "#39d353", animation: "cli-line 0.3s ease both" }}>
                    ✓ All systems ready · Launching experience...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Status footer */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "center", gap: "clamp(1rem,4vw,2rem)", paddingBottom: "clamp(0.75rem,2vh,1.75rem)", flexShrink: 0, animation: "cli-fade-up 0.6s 0.8s both" }}>
          {[
            ["Stack",  "Next.js · GSAP · TypeScript"],
            ["Region", "Colombia 🇨🇴"],
            ["Status", "Open to work ✓"],
          ].map(([label, value]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.55rem", color: "#484f58", letterSpacing: ".15em", textTransform: "uppercase", fontFamily: "monospace" }}>{label}</div>
              <div style={{ fontSize: "0.65rem", color: "#8b949e", marginTop: 2, fontFamily: "monospace", whiteSpace: "nowrap" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
