"use client";

import React from "react";
import { motion, MotionValue, useTransform, useSpring } from "framer-motion";
import { carData } from "@/data/carData";
import {
  Compass,
  Gauge,
  Flame,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  Wind,
} from "lucide-react";

interface ZondaExperienceProps {
  scrollYProgress: MotionValue<number>;
  onInquireClick?: () => void;
}

export default function ZondaExperience({
  scrollYProgress,
  onInquireClick,
}: ZondaExperienceProps) {
  // Spring-smoothed scroll progress to guarantee silky, non-stuttering transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.2,
    restDelta: 0.0001,
  });

  // Phase 1 (Hero / Overview): 0% to ~32%
  const heroOpacity = useTransform(smoothProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.32], [0, -30]);
  const heroScale = useTransform(smoothProgress, [0, 0.32], [1, 0.96]);

  // Phase 2 (Design & ALA): ~33% to ~65%
  const designOpacity = useTransform(
    smoothProgress,
    [0.30, 0.38, 0.60, 0.67],
    [0, 1, 1, 0]
  );
  const designY = useTransform(
    smoothProgress,
    [0.30, 0.38, 0.60, 0.67],
    [30, 0, 0, -30]
  );

  // Phase 3 (Engine & Specs): ~66% to 100%
  const engineOpacity = useTransform(
    smoothProgress,
    [0.65, 0.73, 0.98, 1.0],
    [0, 1, 1, 1]
  );
  const engineY = useTransform(
    smoothProgress,
    [0.65, 0.73],
    [30, 0]
  );

  // Live dynamic telemetry gauges driven by smooth progress
  const rotationDegrees = useTransform(smoothProgress, [0, 1], [0, 360]);
  const rpmValue = useTransform(smoothProgress, [0, 0.5, 1], [1000, 4800, 8500]);
  const scrollPercent = useTransform(smoothProgress, [0, 1], [0, 100]);

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
    <div className="absolute inset-0 pointer-events-none select-none z-10 flex flex-col justify-between p-3 sm:p-6 md:p-8 overflow-hidden">
      {/* Sci-Fi HUD Corner Brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/50" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/50" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/50" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/50" />

      {/* ============================================================== */}
      {/* TOP HUD BAR: Status & Phase Sequence Tracker                    */}
      {/* ============================================================== */}
      <header className="w-full flex items-center justify-between pt-14 sm:pt-16 max-w-7xl mx-auto px-2">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 border border-[#D4AF37]/40 bg-[#141414]/85 backdrop-blur-md rounded-[2px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-rajdhani text-[11px] sm:text-xs tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
              360° TELEMETRY SCAN
            </span>
          </div>
          <span className="hidden md:inline-block font-mono text-[10px] text-zinc-400">
            SANT&apos;AGATA BOLOGNESE
          </span>
        </div>

        {/* Phase Indicator tracker */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#141414]/85 border border-white/10 px-3 py-1.5 rounded-[2px] backdrop-blur-md">
          <motion.div
            className="flex items-center gap-1 font-orbitron text-[10px] sm:text-xs tracking-wider"
            style={{
              color: useTransform(
                smoothProgress,
                [0, 0.32, 0.33],
                ["#FFD700", "#FFD700", "#71717a"]
              ),
            }}
          >
            <span>01</span>
            <span className="hidden sm:inline">OVERVIEW</span>
          </motion.div>
          <span className="text-zinc-600">/</span>
          <motion.div
            className="flex items-center gap-1 font-orbitron text-[10px] sm:text-xs tracking-wider"
            style={{
              color: useTransform(
                smoothProgress,
                [0.31, 0.36, 0.64, 0.67],
                ["#71717a", "#FFD700", "#FFD700", "#71717a"]
              ),
            }}
          >
            <span>02</span>
            <span className="hidden sm:inline">AERODINAMICA</span>
          </motion.div>
          <span className="text-zinc-600">/</span>
          <motion.div
            className="flex items-center gap-1 font-orbitron text-[10px] sm:text-xs tracking-wider"
            style={{
              color: useTransform(
                smoothProgress,
                [0.65, 0.70, 1.0],
                ["#71717a", "#FFD700", "#FFD700"]
              ),
            }}
          >
            <span>03</span>
            <span className="hidden sm:inline">V10 POWERTRAIN</span>
          </motion.div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* CENTER HUD ZONE: Bounded, Floating Glass Panels (Zero Overlap) */}
      {/* ============================================================== */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center px-2 py-4">
        {/* ------------------------------------------------------------ */}
        {/* PHASE 1: HERO OVERVIEW (Self-contained, Left-aligned Box)    */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            scale: heroScale,
            display: useTransform(smoothProgress, (v) => (v < 0.35 ? "block" : "none")),
          }}
          className="max-w-lg md:max-w-xl bg-[#141414]/85 border border-[#D4AF37]/35 backdrop-blur-xl p-5 sm:p-7 rounded-[3px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto"
        >
          {/* Phase Tag */}
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[2px] w-5 bg-[#D4AF37]" />
            <span className="font-rajdhani text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
              PHASE 01 // OVERVIEW
            </span>
          </div>

          {/* Model Title */}
          <h1 className="font-orbitron text-2xl sm:text-4xl md:text-5xl font-black tracking-wider text-white uppercase leading-tight gold-text-glow">
            LAMBORGHINI <br />
            <span className="text-[#FFD700]">HURACÁN</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm font-rajdhani tracking-wider text-zinc-300 uppercase leading-relaxed font-medium">
            Naturally Aspirated V10 • LP 640-4 Performante Edition.
            Engineered to slice through turbulence with extreme aerodynamic downforce.
          </p>

          {/* Clean Metric Row inside the bounded card */}
          <div className="mt-5 grid grid-cols-3 gap-2 py-3 border-y border-white/10">
            <div className="border-l-2 border-[#D4AF37] pl-2.5">
              <span className="block text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                STARTING MSRP
              </span>
              <span className="font-orbitron text-sm sm:text-base md:text-lg font-bold text-[#FFD700]">
                $261,274
              </span>
            </div>

            <div className="border-l-2 border-white/20 pl-2.5">
              <span className="block text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                MAX POWER
              </span>
              <span className="font-orbitron text-sm sm:text-base md:text-lg font-bold text-white">
                640 CV
              </span>
            </div>

            <div className="border-l-2 border-white/20 pl-2.5">
              <span className="block text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                0-100 KM/H
              </span>
              <span className="font-orbitron text-sm sm:text-base md:text-lg font-bold text-white">
                2.9s
              </span>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={handleInquire}
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#FFD700] text-black font-orbitron font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2 cursor-pointer rounded-[2px]"
            >
              <span>INQUIRE NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleScrollToRest}
              className="px-4 py-2.5 border border-white/20 hover:border-[#D4AF37] bg-[#1a1a1a]/70 hover:bg-[#2a2a2a] text-white font-rajdhani font-semibold text-xs tracking-[0.18em] uppercase transition-all cursor-pointer rounded-[2px]"
            >
              EXPLORE SPECS
            </button>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* PHASE 2: DESIGN & ALA AERODYNAMICS                           */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          style={{
            opacity: designOpacity,
            y: designY,
            display: useTransform(smoothProgress, (v) =>
              v >= 0.28 && v <= 0.7 ? "block" : "none"
            ),
          }}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          {/* Left Card: Aerodynamics philosophy */}
          <div className="max-w-md bg-[#141414]/85 border border-[#D4AF37]/35 backdrop-blur-xl p-5 sm:p-7 rounded-[3px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[2px] w-5 bg-[#D4AF37]" />
              <span className="font-rajdhani text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
                PHASE 02 // CHASSIS &amp; AERODYNAMICS
              </span>
            </div>

            <h2 className="font-orbitron text-xl sm:text-3xl font-black tracking-wider text-white uppercase leading-tight gold-text-glow">
              FORGED COMPOSITES® <br />
              <span className="text-[#FFD700]">&amp; ACTIVE ALA</span>
            </h2>

            <p className="mt-2 text-xs font-rajdhani tracking-wider text-zinc-300 uppercase leading-relaxed font-medium">
              Aerodinamica Lamborghini Attiva dynamically adapts downforce and drag in under 500ms using electronically actuated carbon micro-flaps.
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs font-rajdhani tracking-wider text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
                <span>Hexagonal aeronautical stealth bodywork</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
                <span>Internal active air channels inside rear wing</span>
              </div>
            </div>
          </div>

          {/* Right Card: Telemetry Numbers */}
          <div className="w-full md:w-72 space-y-2.5 pointer-events-auto">
            {carData.phases.design.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-3 bg-[#141414]/85 border border-[#D4AF37]/30 backdrop-blur-md rounded-[2px]"
              >
                <div className="flex justify-between items-baseline">
                  <span className="font-rajdhani text-[10px] tracking-widest text-zinc-400 uppercase">
                    {metric.label}
                  </span>
                  <span className="font-orbitron text-base font-bold text-[#FFD700]">
                    {metric.value} {metric.unit && <span className="text-xs text-white">{metric.unit}</span>}
                  </span>
                </div>
                <div className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase mt-0.5">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* PHASE 3: V10 ENGINE & POWERTRAIN BENCHMARK                   */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          style={{
            opacity: engineOpacity,
            y: engineY,
            display: useTransform(smoothProgress, (v) => (v >= 0.63 ? "block" : "none")),
          }}
          className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        >
          {/* Left Card: V10 Powerplant */}
          <div className="max-w-md bg-[#141414]/85 border border-[#D4AF37]/35 backdrop-blur-xl p-5 sm:p-7 rounded-[3px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-[2px] w-5 bg-[#D4AF37]" />
              <span className="font-rajdhani text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
                PHASE 03 // V10 POWERPLANT
              </span>
            </div>

            <h2 className="font-orbitron text-xl sm:text-3xl font-black tracking-wider text-white uppercase leading-tight gold-text-glow">
              5.2L NATURALLY <br />
              <span className="text-[#FFD700]">ASPIRATED V10</span>
            </h2>

            <p className="mt-2 text-xs font-rajdhani tracking-wider text-zinc-300 uppercase leading-relaxed font-medium">
              8,500 RPM of acoustic purity. Titanium intake valves, dry-sump lubrication, and 7-speed dual-clutch transmission.
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FFD700]" />
                <span className="font-orbitron text-xs font-bold text-white">
                  640 CV @ 8,000 RPM
                </span>
              </div>
              <button
                onClick={handleInquire}
                className="text-xs font-orbitron text-[#D4AF37] hover:text-[#FFD700] tracking-wider uppercase flex items-center gap-1 cursor-pointer"
              >
                <span>INQUIRE</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Card: Precision Specs Grid */}
          <div className="w-full lg:w-[440px] bg-[#141414]/85 border border-[#D4AF37]/35 backdrop-blur-md p-4 sm:p-5 rounded-[3px] shadow-2xl pointer-events-auto">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
              <span className="font-orbitron text-xs tracking-widest text-[#FFD700] uppercase font-bold flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-[#FFD700]" />
                BENCHMARK TELEMETRY
              </span>
              <span className="font-mono text-[9px] text-zinc-400">CORSA CALIBRATION</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2 bg-[#222222]/60 border-l-2 border-[#D4AF37]">
                <span className="text-[9px] font-rajdhani tracking-widest text-zinc-400 uppercase block">
                  TOP SPEED
                </span>
                <span className="font-orbitron text-sm font-bold text-white">
                  &gt; 325 KM/H
                </span>
              </div>

              <div className="p-2 bg-[#222222]/60 border-l-2 border-[#D4AF37]">
                <span className="text-[9px] font-rajdhani tracking-widest text-zinc-400 uppercase block">
                  MAX TORQUE
                </span>
                <span className="font-orbitron text-sm font-bold text-white">
                  600 NM @ 6,500 RPM
                </span>
              </div>

              <div className="p-2 bg-[#222222]/60 border-l-2 border-[#D4AF37]">
                <span className="text-[9px] font-rajdhani tracking-widest text-zinc-400 uppercase block">
                  0-200 KM/H
                </span>
                <span className="font-orbitron text-sm font-bold text-[#FFD700]">
                  8.9 SECONDS
                </span>
              </div>

              <div className="p-2 bg-[#222222]/60 border-l-2 border-[#D4AF37]">
                <span className="text-[9px] font-rajdhani tracking-widest text-zinc-400 uppercase block">
                  BRAKING 100-0
                </span>
                <span className="font-orbitron text-sm font-bold text-white">
                  31.5 METERS
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM HUD DOCK: Non-overlapping, Dedicated Telemetry Deck     */}
      {/* ============================================================== */}
      <footer className="w-full max-w-7xl mx-auto px-2 pb-2">
        <div className="w-full bg-[#121212]/90 border border-[#D4AF37]/30 backdrop-blur-md px-4 sm:px-6 py-2.5 rounded-[3px] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_5px_25px_rgba(0,0,0,0.8)]">
          {/* Left: 360 Azimuth & Tachometer */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <div className="flex flex-col">
                <span className="font-rajdhani text-[9px] tracking-widest text-zinc-400 uppercase">
                  ROTATION AZIMUTH
                </span>
                <div className="flex items-baseline gap-1 font-orbitron text-xs font-bold text-white">
                  <motion.span>
                    {Math.round(rotationDegrees.get())}°
                  </motion.span>
                  <span className="text-[10px] text-[#D4AF37]">360° ORBIT</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <Gauge className="w-4 h-4 text-[#D4AF37]" />
              <div className="flex flex-col">
                <span className="font-rajdhani text-[9px] tracking-widest text-zinc-400 uppercase">
                  SIMULATED TACHOMETER
                </span>
                <span className="font-orbitron text-xs font-bold text-white">
                  {Math.round(rpmValue.get())} <span className="text-[9px] text-[#FFD700]">RPM</span>
                </span>
              </div>
            </div>
          </div>

          {/* Center: Scroll Sequence Indicator */}
          <div className="hidden md:flex flex-col items-center">
            <span className="font-rajdhani text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase">
              SCROLL TO ROTATE 360° SEQUENCE
            </span>
            <div className="w-36 h-[2px] bg-white/10 mt-1 relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]"
                style={{ width: `${scrollPercent.get()}%` }}
              />
            </div>
          </div>

          {/* Right: Active Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-orbitron text-[11px] font-semibold text-emerald-400 tracking-wider">
              ALA ACTIVE // CORSA TELEMETRY
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
