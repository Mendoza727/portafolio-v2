"use client";
import { useState } from "react";
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

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
      scriptProps={{ async: true, defer: true }}
    >
      {/* CLI Splash Loader */}
      {!loaded && <CliLoader onDone={() => setLoaded(true)} />}

      {/* Sticky navigation */}
      <Navigation />

      {/* Main content */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <GithubSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </GoogleReCaptchaProvider>
  );
}
