"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Activity, Calendar } from "lucide-react";
import type { GithubRepo, GithubProfile } from "@/types";
import { PERSONAL_INFO } from "@/lib/data";

// GitHub contribution green palette
const GH_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

// ─── Types ────────────────────────────────────────────────────────────────────
type ContribDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type ContribYear = {
  year: number;
  total: number;
  contributions: ContribDay[];
};

// ─── Contribution grid component ──────────────────────────────────────────────
function ContribGrid({ data }: { data: ContribYear }) {
  // Group contributions into weeks (Sun→Sat columns)
  const weeks: ContribDay[][] = [];
  let week: ContribDay[] = [];

  data.contributions.forEach((day, i) => {
    const dow = new Date(day.date).getDay(); // 0=Sun
    if (i === 0 && dow > 0) {
      // pad start
      for (let p = 0; p < dow; p++) week.push({ date: "", count: 0, level: 0 });
    }
    week.push(day);
    if (week.length === 7) { weeks.push(week); week = []; }
  });
  if (week.length > 0) {
    while (week.length < 7) week.push({ date: "", count: 0, level: 0 });
    weeks.push(week);
  }

  const cellSize = 11;
  const gap      = 3;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Calendar size={13} style={{ color: "#39d353" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#39d353", fontFamily: "monospace" }}>
            {data.year}
          </span>
        </div>
        <span style={{ fontSize: "0.7rem", color: "#8b949e", fontFamily: "monospace" }}>
          {data.total.toLocaleString()} contributions
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          paddingBottom: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            width: "max-content",
          }}
        >
          {weeks.map((wk, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: `${gap}px` }}>
              {wk.map((day, di) => (
                <div
                  key={di}
                  title={day.date ? `${day.date}: ${day.count} contributions` : ""}
                  style={{
                    width:  `${cellSize}px`,
                    height: `${cellSize}px`,
                    borderRadius: "2px",
                    background: GH_COLORS[day.level],
                    transition: "transform 0.1s ease",
                    cursor: day.date ? "pointer" : "default",
                    flexShrink: 0,
                    /* Subtle glow on active cells */
                    boxShadow: day.level >= 3 ? `0 0 4px ${GH_COLORS[day.level]}80` : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (day.level > 0) (e.currentTarget as HTMLElement).style.transform = "scale(1.3)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Month labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
          <span key={m} style={{ fontSize: "0.6rem", color: "#484f58", fontFamily: "monospace" }}>{m}</span>
        ))}
      </div>

      <div style={{ width: "100%", height: "1px", background: "#21262d", margin: "1rem 0 0" }} />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function GithubSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [contribs, setContribs] = useState<ContribYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [contribLoading, setContribLoading] = useState(true);

  useEffect(() => {
    // GitHub profile + repos
    const fetchGithub = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${PERSONAL_INFO.nickname}`),
          fetch(`https://api.github.com/users/${PERSONAL_INFO.nickname}/repos?sort=updated&per_page=6`),
        ]);
        if (profileRes.ok) setProfile(await profileRes.json());
        if (reposRes.ok)   setRepos(await reposRes.json());
      } catch (e) {
        console.error("GitHub fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    // Last 3 years of contributions via public API (no auth required)
    const fetchContribs = async () => {
      try {
        const years = [2024, 2025, 2026];
        const results = await Promise.allSettled(
          years.map((y) =>
            fetch(`https://github-contributions-api.jogruber.de/v4/${PERSONAL_INFO.nickname}?y=${y}`)
              .then((r) => r.json())
          )
        );
        const parsed: ContribYear[] = [];
        results.forEach((r, i) => {
          if (r.status === "fulfilled" && r.value?.contributions) {
            const year   = years[i];
            const total  = r.value.total?.[year] ?? r.value.contributions.reduce((a: number, d: ContribDay) => a + d.count, 0);
            parsed.push({ year, total, contributions: r.value.contributions });
          }
        });
        setContribs(parsed);
      } catch (e) {
        console.error("Contributions API error:", e);
      } finally {
        setContribLoading(false);
      }
    };

    fetchGithub();
    fetchContribs();
  }, []);

  return (
    <section id="github" className="relative py-28 bg-[hsl(var(--surface))]" aria-label="GitHub activity">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--text-muted))] mb-3">Open source</p>
          <h2 className="text-3xl sm:text-5xl font-black">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          {profile && (
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { label: "Public Repos", value: profile.public_repos },
                { label: "Followers",    value: profile.followers    },
                { label: "Following",    value: profile.following    },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-gradient">{value}</p>
                  <p className="text-xs text-[hsl(var(--text-muted))]">{label}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ─── Contribution grids — 3 years ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: "#0d1117",
            border: "1px solid #21262d",
            borderRadius: "1rem",
            padding: "1.75rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Activity size={16} style={{ color: "#39d353" }} />
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#c9d1d9", fontFamily: "monospace" }}>
                Contribution History
              </span>
            </div>
            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.65rem", color: "#484f58", fontFamily: "monospace" }}>Less</span>
              {GH_COLORS.map((c, i) => (
                <div key={i} style={{ width: "11px", height: "11px", borderRadius: "2px", background: c, boxShadow: i >= 3 ? `0 0 4px ${c}80` : "none" }} />
              ))}
              <span style={{ fontSize: "0.65rem", color: "#484f58", fontFamily: "monospace" }}>More</span>
            </div>
          </div>

          {contribLoading ? (
            /* Terminal-style loading for contributions */
            <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#8b949e" }}>
              <div style={{ color: "#58a6ff", marginBottom: "0.3rem" }}>$ fetch contributions --years 2024,2025,2026</div>
              <div style={{ color: "#39d353" }}>  ▶ Loading contribution data...</div>
              <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.75rem" }}>
                {[0,1,2,3,4,5,6,7,8].map((i) => (
                  <div key={i} style={{ width: "11px", height: "11px", borderRadius: "2px", background: "#161b22", animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite` }} />
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[...contribs].reverse().map((yr) => (
                <ContribGrid key={yr.year} data={yr} />
              ))}
              {contribs.length === 0 && (
                <p style={{ color: "#8b949e", fontSize: "0.8rem", fontFamily: "monospace" }}>
                  — No contribution data available —
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* Repos grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl p-5 h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-2xl p-5 group hover:border-emerald-500/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-sm text-white group-hover:text-gradient truncate flex-1 mr-2">
                    {repo.name}
                  </h3>
                  <ExternalLink size={13} className="text-[hsl(var(--text-muted))] group-hover:text-white shrink-0 transition-colors" />
                </div>
                <p className="text-xs text-[hsl(var(--text-muted))] leading-relaxed mb-4 line-clamp-2">
                  {repo.description ?? "No description provided."}
                </p>
                <div className="flex items-center gap-4 text-xs text-[hsl(var(--text-muted))]">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-yellow-400" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Star size={11} />{repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork size={11} />{repo.forks_count}</span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
