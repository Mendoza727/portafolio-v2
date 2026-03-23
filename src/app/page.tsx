"use client";
import { useState, useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { GithubSection } from "@/components/sections/GithubSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CliLoader } from "@/components/animations/CliLoader";

// Inner component — rendered only after loader exits.
// Starts invisible so GSAP can set initial states on data-reveal/data-title
// before any content becomes visible (eliminates the 1-2 frame flash).
function Portfolio() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`@keyframes page-reveal { from { opacity:0; } to { opacity:1; } }`}</style>
      <div style={{
        opacity: visible ? 1 : 0,
        animation: visible ? "page-reveal 0.35s ease both" : "none",
      }}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
          scriptProps={{ async: true, defer: true }}
        >
          <Navigation />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ServicesSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <GithubSection />
          <ContactSection />
          <Footer />
        </GoogleReCaptchaProvider>
      </div>
    </>
  );
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  // Render ONLY the loader until it signals done — nothing else mounts,
  // scroll is locked, no hero/nav/footer leak through.
  if (!loaded) {
    return <CliLoader onDone={() => setLoaded(true)} />;
  }

  return <Portfolio />;
}
