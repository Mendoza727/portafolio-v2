"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Activity } from "lucide-react";
import type { GithubRepo, GithubProfile } from "@/types";
import { PERSONAL_INFO } from "@/lib/data";

export function GithubSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Stable pseudo-random values — computed on client only after mount
  // This avoids the server/client Math.random() hydration mismatch
  const heatmapCells = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 52 * 7 }, (_, i) => {
      // Simple seeded PRNG (mulberry32)
      let t = (i * 1664525 + 1013904223) & 0xffffffff;
      t = Math.imul(t ^ (t >>> 16), 0x45d9f3b);
      const v = ((t ^ (t >>> 16)) >>> 0) / 0xffffffff;
      const bg =
        v > 0.85 ? "bg-purple-400" :
        v > 0.65 ? "bg-purple-500/60" :
        v > 0.4  ? "bg-purple-700/40" :
        "bg-[hsl(var(--surface-2))]";
      return bg;
    });
  }, [isMounted]);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${PERSONAL_INFO.nickname}`, {
            next: { revalidate: 3600 },
          } as RequestInit),
          fetch(`https://api.github.com/users/${PERSONAL_INFO.nickname}/repos?sort=updated&per_page=6`, {
            next: { revalidate: 3600 },
          } as RequestInit),
        ]);

        if (profileRes.ok) setProfile(await profileRes.json());
        if (reposRes.ok) setRepos(await reposRes.json());
      } catch (e) {
        console.error("GitHub fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    setIsMounted(true);
    fetchGithub();
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
                { label: "Followers", value: profile.followers },
                { label: "Following", value: profile.following },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-gradient">{value}</p>
                  <p className="text-xs text-[hsl(var(--text-muted))]">{label}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Contribution graph placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 mb-10 flex items-center justify-center min-h-[180px] overflow-hidden"
        >
          <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-[hsl(var(--text-subtle))]">Contribution Activity</span>
            </div>
            {/* Visual heatmap — stable seeded values, client-only */}
            <div className="flex gap-1 flex-wrap">
              {heatmapCells.map((bg, idx) => (
                <div key={idx} className={`w-2.5 h-2.5 rounded-sm ${bg} hover:scale-125 transition-transform`} />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3 justify-end text-xs text-[hsl(var(--text-muted))]">
              <span>Less</span>
              {["bg-[hsl(var(--surface-2))]", "bg-purple-700/40", "bg-purple-500/60", "bg-purple-400"].map((c, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
              ))}
              <span>More</span>
            </div>
          </div>
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
                  <span className="flex items-center gap-1">
                    <Star size={11} />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={11} />
                    {repo.forks_count}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
