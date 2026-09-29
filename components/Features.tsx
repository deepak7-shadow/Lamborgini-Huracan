"use client";

import React, { useState } from "react";
import { Sparkles, Sliders, Layers, Flame, CheckCircle2 } from "lucide-react";

export default function Features() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: "aero",
      title: "ACTIVE AERODYNAMICS",
      subtitle: "AERODINAMICA LAMBORGHINI ATTIVA (ALA)",
      description:
        "The ALA system is patented technology that varies aero load dynamically to achieve either high downforce or low drag. Electronically actuated motors control active flaps in the front spoiler and rear wing inside hollow forged carbon conduits.",
      highlights: [
        "Aero Vectoring: Airflow channeled independently to left or right rear wing sides for high-speed corner stability",
        "80% lighter than conventional hydraulic wing systems",
        "Reaction latency under 500 milliseconds via LPI 3D accelerometer array",
      ],
      tag: "PATENTED TECHNOLOGY",
    },
    {
      id: "cockpit",
      title: "AERONAUTICAL COCKPIT",
      subtitle: "INSPIRED BY FIFTH-GEN STEALTH FIGHTERS",
      description:
        "The interior design reflects the mechanical aggression of the exterior. The red flip-up ignition switch cover evokes missile launch controls. A high-resolution 12.3-inch TFT display renders virtual tachometers, G-force meters, and ALA flap telemetry.",
      highlights: [
        "Laser-engraved Alcantara racing bucket seats with yellow contrast stitching",
        "Forged Composites® carbon air vents, door releases, and shift paddles",
        "Lamborghini Infotainment System III with track telemetry recording",
      ],
      tag: "FIGHTER JET ERGONOMICS",
    },
    {
      id: "chassis",
      title: "FORGED COMPOSITES®",
      subtitle: "REVOLUTIONARY SHORT-FIBER CARBON REINFORCEMENT",
      description:
        "Forged Composites® consists of millions of microscopic carbon fiber strands saturated with resin and molded under extreme hydraulic pressure. The result is unprecedented structural strength and the iconic marbled dark carbon aesthetic.",
      highlights: [
        "Complex organic curved geometry that traditional carbon weaves cannot replicate",
        "Superior torsional rigidity for needle-sharp front axle turn-in response",
        "Reduces unsprung mass across aerodynamic splitters, diffusers, and wings",
      ],
      tag: "ADVANCED MATERIALS",
    },
    {
      id: "acoustics",
      title: "V10 ACOUSTIC SYMPHONY",
      subtitle: "EXHAUST RESONANCE TUNED IN SANT'AGATA",
      description:
        "A true Italian V10 generates an intoxicating frequency spectrum. The exhaust geometry features free-flowing manifolds and lightweight titanium tailpipes positioned higher up the rear bumper to optimize gas velocity and acoustic projection.",
      highlights: [
        "Uncompromised naturally aspirated howl up to 8,500 RPM",
        "Variable backpressure valves that open wide in SPORT and CORSA modes",
        "Instant mechanical throttle response with zero turbo lag",
      ],
      tag: "EMOTIVE PURITY",
    },
  ];

  const current = features[activeTab];

  return (
    <section id="features-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[1px] w-8 bg-[#D4AF37]" />
          <span className="font-rajdhani text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
            ARCHITETTURA &amp; INNOVAZIONE
          </span>
          <span className="h-[1px] w-8 bg-[#D4AF37]" />
        </div>

        <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-white uppercase gold-text-glow">
          BESPOKE <span className="text-[#FFD700]">INNOVATION</span>
        </h2>
        <p className="mt-4 font-rajdhani text-sm sm:text-base text-zinc-400 max-w-2xl tracking-widest uppercase">
          Explore the uncompromising design tenets that elevate the Huracán beyond the threshold of ordinary supercars.
        </p>
      </div>

      {/* Feature Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
        {features.map((feat, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={feat.id}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-3 font-orbitron text-xs sm:text-sm tracking-[0.15em] uppercase transition-all rounded-[2px] cursor-pointer border ${
                isActive
                  ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#FFD700] shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                  : "border-white/10 bg-[#1a1a1a] text-zinc-400 hover:text-white hover:border-white/30"
              }`}
            >
              {feat.title}
            </button>
          );
        })}
      </div>

      {/* Feature Detail Showcase Card */}
      <div className="p-8 sm:p-12 bg-[#2a2a2a]/30 border border-[#D4AF37]/40 rounded-[2px] backdrop-blur-md relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFD700] font-mono text-[11px] tracking-widest uppercase mb-4">
              {current.tag}
            </span>

            <h3 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-2">
              {current.title}
            </h3>

            <h4 className="font-rajdhani text-sm sm:text-base font-semibold text-[#D4AF37] tracking-[0.2em] uppercase mb-6">
              {current.subtitle}
            </h4>

            <p className="font-rajdhani text-sm sm:text-base text-zinc-300 leading-relaxed tracking-wider mb-8">
              {current.description}
            </p>

            <div className="space-y-3.5">
              {current.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="font-rajdhani text-xs sm:text-sm text-zinc-300 tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual telemetry side widget */}
          <div className="w-full lg:w-96 p-6 bg-[#1a1a1a]/80 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-orbitron text-xs text-[#D4AF37] tracking-widest uppercase">
                TELEMETRY DIAGNOSTIC
              </span>
              <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
            </div>

            <div className="my-6 space-y-4 font-mono text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>INSPECTION POINT</span>
                <span className="text-white">SECTOR 0{activeTab + 1}</span>
              </div>
              <div className="flex justify-between">
                <span>STRUCTURAL INTEGRITY</span>
                <span className="text-[#FFD700]">100% NOMINAL</span>
              </div>
              <div className="flex justify-between">
                <span>CALIBRATION CYCLE</span>
                <span className="text-white">AUTO-ADAPTIVE</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] font-rajdhani tracking-widest text-zinc-500 uppercase block">
                MANUFACTURED IN
              </span>
              <span className="font-orbitron text-xs text-white uppercase tracking-wider">
                AUTOMOBILI LAMBORGHINI S.P.A.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
