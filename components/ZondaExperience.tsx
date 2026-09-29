"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { carData } from "@/data/carData";
import {
  Compass,
  Gauge,
  Flame,
  Activity,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

interface ZondaExperienceProps {
  scrollYProgress: MotionValue<number>;
  onInquireClick?: () => void;
}

export default function ZondaExperience({
  scrollYProgress,
  onInquireClick,
}: ZondaExperienceProps) {
  // Phase 1 (Hero / Overview): 0% to ~33%
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.32], [0, -35]);
  const heroScale = useTransform(scrollYProgress, [0, 0.32], [1, 0.96]);

  // Phase 2 (Design & ALA): ~33% to ~66%
  const designOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.38, 0.58, 0.66],
    [0, 1, 1, 0]
  );
  const designY = useTransform(
    scrollYProgress,
    [0.30, 0.38, 0.58, 0.66],
    [35, 0, 0, -35]
  );

  // Phase 3 (Engine & Specs): ~66% to 100%
  const engineOpacity = useTransform(
    scrollYProgress,
    [0.64, 0.72, 0.98, 1.0],
    [0, 1, 1, 1]
  );
  const engineY = useTransform(
    scrollYProgress,
    [0.64, 0.72],
    [35, 0]
  );

  // Dynamic HUD telemetry transforms
  const rotationDegrees = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rpmValue = useTransform(scrollYProgress, [0, 0.5, 1], [1000, 4800, 8500]);
  const speedProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleInquire = () => {
    if (onInquireClick) {
      onInquireClick();
    } else {
      const el = document.getElementById("inquire-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollToRest = () => {
    const el = document.getElementById("specs-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-10 flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden hud-grid-pattern">
      {/* Sci-fi HUD Corner Brackets */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/50" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/50" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/50" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/50" />

      {/* Crosshair accents */}
      <div className="absolute top-1/2 left-4 w-3 h-[1px] bg-[#D4AF37]/40 hidden md:block" />
      <div className="absolute top-1/2 right-4 w-3 h-[1px] bg-[#D4AF37]/40 hidden md:block" />

      {/* TOP HUD BAR: telemetry mode & phase steps */}
      <div className="w-full flex items-center justify-between pt-14 sm:pt-12">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 border border-[#D4AF37]/30 bg-[#2a2a2a]/60 backdrop-blur-sm rounded-[2px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="font-rajdhani text-[11px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
              HURACÁN // 360° SPECTRAL SCAN
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span>SANT&apos;AGATA 44.66°N, 11.12°E</span>
          </div>
        </div>

        {/* Phase Indicator tracker */}
        <div className="flex items-center gap-2 sm:gap-4 bg-[#1a1a1a]/80 border border-white/10 px-3 py-1.5 rounded-[2px] backdrop-blur-sm">
          <motion.div
            className="flex items-center gap-1.5 font-orbitron text-[10px] sm:text-xs tracking-widest"
            style={{
              color: useTransform(
                scrollYProgress,
                [0, 0.33, 0.34],
                ["#FFD700", "#FFD700", "#71717a"]
              ),
            }}
          >
            <span>01</span>
            <span className="hidden sm:inline">HERO</span>
          </motion.div>
          <span className="text-zinc-600">/</span>
          <motion.div
            className="flex items-center gap-1.5 font-orbitron text-[10px] sm:text-xs tracking-widest"
            style={{
              color: useTransform(
                scrollYProgress,
                [0.32, 0.36, 0.65, 0.68],
                ["#71717a", "#FFD700", "#FFD700", "#71717a"]
              ),
            }}
          >
            <span>02</span>
            <span className="hidden sm:inline">DESIGN</span>
          </motion.div>
          <span className="text-zinc-600">/</span>
          <motion.div
            className="flex items-center gap-1.5 font-orbitron text-[10px] sm:text-xs tracking-widest"
            style={{
              color: useTransform(
                scrollYProgress,
                [0.65, 0.70, 1.0],
                ["#71717a", "#FFD700", "#FFD700"]
              ),
            }}
          >
            <span>03</span>
            <span className="hidden sm:inline">V10</span>
          </motion.div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PHASE 1: HERO OVERVIEW (0% - 33%) */}
      {/* ============================================================== */}
      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
          scale: heroScale,
        }}
        className="absolute inset-x-4 sm:inset-x-12 top-[22%] md:top-[26%] max-w-7xl mx-auto flex flex-col justify-between"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-[#D4AF37]" />
            <span className="font-rajdhani text-xs md:text-sm font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
              {carData.phases.hero.phaseTag}
            </span>
          </div>

          <h1 className="font-orbitron text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider text-white uppercase gold-text-glow leading-tight">
            LAMBORGHINI <br />
            <span className="text-[#FFD700]">HURACÁN</span>
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base font-rajdhani tracking-widest text-zinc-300 max-w-xl uppercase font-medium">
            {carData.phases.hero.subtitle} — {carData.phases.hero.description}
          </p>

          {/* Pricing & Quick Metric Row */}
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="border-l-2 border-[#D4AF37] pl-3 py-1">
              <span className="block text-[10px] font-mono tracking-widest text-zinc-400">
                STARTING MSRP
              </span>
              <span className="font-orbitron text-xl sm:text-2xl font-bold text-[#FFD700]">
                {carData.phases.hero.price}
              </span>
            </div>

            <div className="border-l-2 border-white/20 pl-3 py-1">
              <span className="block text-[10px] font-mono tracking-widest text-zinc-400">
                PEAK POWER
              </span>
              <span className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                {carData.phases.hero.highlightMetric}
              </span>
            </div>

            <div className="border-l-2 border-white/20 pl-3 py-1">
              <span className="block text-[10px] font-mono tracking-widest text-zinc-400">
                0 - 100 KM/H
              </span>
              <span className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                {carData.phases.hero.secondaryMetric}
              </span>
            </div>
          </div>

          {/* Interactive Hero CTA */}
          <div className="mt-8 flex items-center gap-4 pointer-events-auto">
            <button
              onClick={handleInquire}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#FFD700] text-black font-orbitron font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-2 group cursor-pointer"
            >
              <span>INQUIRE NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleScrollToRest}
              className="px-5 py-3 border border-white/20 hover:border-[#D4AF37] bg-[#1a1a1a]/70 hover:bg-[#2a2a2a] text-white font-rajdhani font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all cursor-pointer"
            >
              EXPLORE ARCHITECTURE
            </button>
          </div>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* PHASE 2: DESIGN & AERODINAMICA (33% - 66%) */}
      {/* ============================================================== */}
      <motion.div
        style={{
          opacity: designOpacity,
          y: designY,
        }}
        className="absolute inset-x-4 sm:inset-x-12 top-[20%] md:top-[24%] max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8"
      >
        {/* Left Side: Design philosophy */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-[#D4AF37]" />
            <span className="font-rajdhani text-xs md:text-sm font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
              {carData.phases.design.phaseTag}
            </span>
          </div>

          <h2 className="font-orbitron text-2xl sm:text-4xl md:text-5xl font-black tracking-wider text-white uppercase gold-text-glow leading-tight">
            FORGED COMPOSITES® <br />
            <span className="text-[#FFD700]">&amp; ACTIVE ALA</span>
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-rajdhani tracking-widest text-zinc-300 uppercase leading-relaxed font-medium">
            {carData.phases.design.description}
          </p>

          <ul className="mt-5 space-y-2 text-xs font-rajdhani tracking-wider text-zinc-300">
            {carData.phases.design.designNotes.map((note, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Telemetry telemetry cards */}
        <div className="w-full md:w-80 space-y-3 pointer-events-auto">
          {carData.phases.design.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-3.5 border border-[#D4AF37]/30 bg-[#1a1a1a]/80 backdrop-blur-md rounded-[2px] hover:border-[#FFD700] transition-colors"
            >
              <div className="flex justify-between items-baseline">
                <span className="font-rajdhani text-[11px] tracking-widest text-zinc-400 uppercase">
                  {metric.label}
                </span>
                <span className="font-orbitron text-lg sm:text-xl font-bold text-[#FFD700]">
                  {metric.value} {metric.unit && <span className="text-xs text-white">{metric.unit}</span>}
                </span>
              </div>
              <div className="mt-1 text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* PHASE 3: ENGINE & POWERTRAIN SPECS (66% - 100%) */}
      {/* ============================================================== */}
      <motion.div
        style={{
          opacity: engineOpacity,
          y: engineY,
        }}
        className="absolute inset-x-4 sm:inset-x-12 top-[18%] md:top-[22%] max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8"
      >
        {/* Left Side: V10 Engine Overview */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-[#D4AF37]" />
            <span className="font-rajdhani text-xs md:text-sm font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
              {carData.phases.engine.phaseTag}
            </span>
          </div>

          <h2 className="font-orbitron text-2xl sm:text-4xl md:text-5xl font-black tracking-wider text-white uppercase gold-text-glow leading-tight">
            5.2L NATURALLY <br />
            <span className="text-[#FFD700]">ASPIRATED V10</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm font-rajdhani tracking-widest text-zinc-300 uppercase leading-relaxed font-medium">
            {carData.phases.engine.description}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="p-3 border border-[#D4AF37]/40 bg-[#2a2a2a]/60 backdrop-blur-sm">
              <span className="block text-[10px] font-mono tracking-widest text-[#D4AF37]">
                REDLINE LIMIT
              </span>
              <span className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                8,500 <span className="text-xs text-[#FFD700]">RPM</span>
              </span>
            </div>

            <div className="p-3 border border-white/20 bg-[#2a2a2a]/60 backdrop-blur-sm">
              <span className="block text-[10px] font-mono tracking-widest text-zinc-400">
                DRY-SUMP OIL
              </span>
              <span className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                RACE <span className="text-xs text-emerald-400">ACTIVE</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: High Performance Specs Grid */}
        <div className="w-full lg:w-[480px] bg-[#1a1a1a]/85 border border-[#D4AF37]/30 backdrop-blur-md p-5 rounded-[2px] pointer-events-auto shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="font-orbitron text-xs tracking-[0.2em] text-[#FFD700] uppercase font-bold flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-[#FFD700]" />
              ENGINE BENCHMARK TELEMETRY
            </span>
            <span className="font-mono text-[10px] text-zinc-400">CORSA CALIBRATION</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {carData.phases.engine.specs.slice(0, 6).map((spec, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-[#2a2a2a]/40 border-l-2 border-[#D4AF37] flex flex-col justify-between"
              >
                <span className="text-[10px] font-rajdhani font-medium tracking-widest text-zinc-400 uppercase">
                  {spec.label}
                </span>
                <span className="font-orbitron text-base sm:text-lg font-bold text-white mt-1">
                  {spec.value}{" "}
                  {spec.unit && (
                    <span className="text-[11px] font-normal text-[#D4AF37] block sm:inline">
                      {spec.unit}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="font-rajdhani text-xs tracking-widest text-zinc-400 uppercase">
              TRANSMISSION: 7-SPEED LDF DUAL-CLUTCH
            </span>
            <button
              onClick={handleInquire}
              className="text-xs font-orbitron text-[#D4AF37] hover:text-[#FFD700] tracking-wider uppercase flex items-center gap-1 cursor-pointer"
            >
              <span>INQUIRE ALLOCATION</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* ============================================================== */}
      {/* BOTTOM HUD TELEMETRY FOOTER */}
      {/* ============================================================== */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-2 sm:pb-4 border-t border-white/10 pt-3">
        {/* Left: 360 degree rotation azimuth display */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#D4AF37] animate-spin-slow" />
            <div className="flex flex-col">
              <span className="font-rajdhani text-[10px] tracking-widest text-zinc-400">
                ROTATION AZIMUTH
              </span>
              <div className="flex items-baseline gap-1 font-orbitron text-xs sm:text-sm font-bold text-white">
                <motion.span>
                  {/* Rounded angle */}
                  {Math.round(rotationDegrees.get())}°
                </motion.span>
                <span className="text-[10px] text-[#D4AF37]">360° ORBIT</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/10">
            <Gauge className="w-4 h-4 text-[#D4AF37]" />
            <div className="flex flex-col">
              <span className="font-rajdhani text-[10px] tracking-widest text-zinc-400">
                SIMULATED TACHOMETER
              </span>
              <span className="font-orbitron text-xs font-bold text-white">
                {Math.round(rpmValue.get())} <span className="text-[10px] text-[#FFD700]">RPM</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Scroll progress directive */}
        <div className="hidden md:flex flex-col items-center">
          <span className="font-rajdhani text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase animate-pulse">
            SCROLL TO ROTATE 360° SEQUENCE
          </span>
          <div className="w-32 h-[2px] bg-white/10 mt-1 relative overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
              style={{ width: `${speedProgress.get()}%` }}
            />
          </div>
        </div>

        {/* Right: Chassis Telemetry Status */}
        <div className="flex items-center gap-4 text-right">
          <div className="flex flex-col">
            <span className="font-rajdhani text-[10px] tracking-widest text-zinc-400">
              AERODYNAMICS STATE
            </span>
            <span className="font-orbitron text-xs font-semibold text-emerald-400 flex items-center gap-1.5 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ALA // ACTIVE DOWNFORCE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
