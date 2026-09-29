"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import ZondaScrollCanvas from "@/components/ZondaScrollCanvas";
import ZondaExperience from "@/components/ZondaExperience";
import SpecsGrid from "@/components/SpecsGrid";
import Features from "@/components/Features";
import InquirySection from "@/components/InquirySection";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Master Scroll Architecture: Attached strictly to the 600vh scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleInquireScroll = () => {
    const el = document.getElementById("inquire-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-[#1a1a1a] text-white selection:bg-[#D4AF37] selection:text-black min-h-screen relative">
      {/* Fixed Luxury Navigation Bar */}
      <Navbar onInquireClick={handleInquireScroll} />

      {/* ============================================================== */}
      {/* MASTER SCROLL SEQUENCE (Locked for 600vh)                      */}
      {/* Prevents user from scrolling past until car rotation completes */}
      {/* ============================================================== */}
      <section
        ref={containerRef}
        className="h-[600vh] relative w-full"
        id="overview"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#1a1a1a]">
          {/* Background Canvas: 360° Rotating Lamborghini Huracán Sequence */}
          <ZondaScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={300}
            imageFolderPath="/images/zonda-sequence"
            className="z-0"
          />

          {/* Foreground HUD: Sci-fi Telemetry & Content Phases */}
          <ZondaExperience
            scrollYProgress={scrollYProgress}
            onInquireClick={handleInquireScroll}
          />
        </div>
      </section>

      {/* ============================================================== */}
      {/* REST OF SITE (Scrolls naturally after sequence finishes)       */}
      {/* ============================================================== */}
      <div className="relative z-20 bg-[#1a1a1a] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        {/* Dynamic Drive Modes & 4 Engineering Pillars */}
        <div id="telemetry">
          <SpecsGrid />
        </div>

        {/* Bespoke Innovation & Cockpit Architecture */}
        <div id="design">
          <Features />
        </div>

        {/* Commission Allocation Dossier Form */}
        <div id="engine">
          <InquirySection />
        </div>

        {/* Official Sant'Agata Bolognese Footer */}
        <Footer />
      </div>
    </main>
  );
}
