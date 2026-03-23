"use client";
import { useEffect, useState, useRef } from "react";

const STEPS = [
  { text: "$ portfolio --init", color: "#58a6ff", delay: 0 },
  { text: "  ► Initializing environment...", color: "#8b949e", delay: 500 },
  { text: "  ✔ Environment ready", color: "#39d353", delay: 1100 },
  { text: "$ git clone mendoza727/portfolio", color: "#58a6ff", delay: 1600 },
  { text: "  ► Cloning repository...", color: "#8b949e", delay: 2100 },
  { text: "  ✔ 42 commits synced", color: "#39d353", delay: 2800 },
  { text: "$ npm install --production", color: "#58a6ff", delay: 3300 },
  { text: "  ► Resolving dependencies...", color: "#8b949e", delay: 3900 },
  { text: "  ✔ Build complete (0 errors)", color: "#39d353", delay: 5100 },
  { text: "$ deploy --env=production --region=col", color: "#d2a8ff", delay: 5600 },
  { text: "  ✔ Live → mendoza727.dev", color: "#39d353", delay: 6300 },
];

// Bar fills over 3 seconds across 40 steps (slower, smoother)
const BAR_STEPS = 40;
const BAR_INTERVAL = 80; // ms per step = 3.2s total

export function CliLoader({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [barProgress, setBarProgress]   = useState<number>(0);
  const [exiting, setExiting]           = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Reveal lines one by one
    STEPS.forEach((step, i) => {
      const t = setTimeout(() => setVisibleLines(i + 1), step.delay);
      timers.push(t);
    });

    // Progress bar starts after last line, fills slowly
    const barStart = STEPS[STEPS.length - 1].delay + 400;
    for (let i = 1; i <= BAR_STEPS; i++) {
      const t = setTimeout(
        () => setBarProgress(i),
        barStart + i * BAR_INTERVAL
      );
      timers.push(t);
    }

    // Exit after bar finishes + short pause
    const totalDuration = barStart + BAR_STEPS * BAR_INTERVAL + 600;
    const exitT = setTimeout(() => {
      if (done.current) return;
      done.current = true;
      setExiting(true);
      setTimeout(onDone, 700);
    }, totalDuration);
    timers.push(exitT);

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const pct = Math.round((barProgress / BAR_STEPS) * 100);
  const filled = Math.round((barProgress / BAR_STEPS) * 30);
  const bar = "█".repeat(filled) + "░".repeat(30 - filled);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0d1117",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "stretch",
        transition: exiting ? "opacity 0.7s ease" : "none",
        opacity: exiting ? 0 : 1,
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* Full-screen terminal — no floating card */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* macOS-style titlebar — full width */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 20px",
            background: "#161b22",
            borderBottom: "1px solid #21262d",
            flexShrink: 0,
          }}
        >
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div
              key={c}
              style={{ width: 13, height: 13, borderRadius: "50%", background: c, flexShrink: 0 }}
            />
          ))}
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "0.8rem",
              color: "#8b949e",
              fontFamily: "monospace",
              letterSpacing: "0.04em",
            }}
          >
            zsh — portfolio@mendoza727.dev — 120×40
          </span>
        </div>

        {/* Terminal body — fills remaining space */}
        <div
          style={{
            flex: 1,
            padding: "2.5rem 3rem",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* Prompt line at top */}
          <div style={{ color: "#484f58", fontSize: "0.75rem", marginBottom: "1.5rem" }}>
            Last login: {new Date().toDateString()} on ttys001
          </div>

          {STEPS.slice(0, visibleLines).map((step, i) => (
            <div
              key={i}
              style={{
                color: step.color,
                fontSize: "0.85rem",
                lineHeight: 1.9,
                animation: "fadeInLine 0.18s ease",
              }}
            >
              {step.text}
            </div>
          ))}

          {/* Blinking cursor */}
          {barProgress === 0 && visibleLines > 0 && visibleLines < STEPS.length && (
            <span
              style={{
                display: "inline-block",
                width: "9px",
                height: "16px",
                background: "#39d353",
                marginLeft: "2px",
                animation: "blink 1s step-start infinite",
                verticalAlign: "middle",
              }}
            />
          )}

          {/* Progress bar section */}
          {barProgress > 0 && (
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ color: "#58a6ff", fontSize: "0.8rem", marginBottom: "6px" }}>
                $ loading portfolio [{bar}] {pct}%
              </div>
              {/* Visual CSS progress bar */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  height: "4px",
                  background: "#21262d",
                  borderRadius: "99px",
                  overflow: "hidden",
                  marginTop: "8px",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: "linear-gradient(90deg, #006d32, #39d353)",
                    borderRadius: "99px",
                    transition: "width 0.08s linear",
                    boxShadow: pct > 50 ? "0 0 8px #39d35380" : "none",
                  }}
                />
              </div>

              {barProgress === BAR_STEPS && (
                <div style={{ color: "#39d353", fontSize: "0.8rem", marginTop: "0.75rem", animation: "fadeInLine 0.3s ease" }}>
                  ✔ All systems go. Launching experience...
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInLine {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%,100%{ opacity:1; } 50%{ opacity:0; } }
      `}</style>
    </div>
  );
}
