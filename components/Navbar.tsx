"use client";

import React, { useEffect, useState } from "react";
import { Shield, Volume2, VolumeX, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onInquireClick?: () => void;
}

export default function Navbar({ onInquireClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
    // Simple Web Audio API engine purr feedback
    if (typeof window !== "undefined" && !soundEnabled) {
      try {
        const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(65, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.4);
          osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 1.2);

          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        }
      } catch {
        // AudioContext silent fallback
      }
    }
  };

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#1a1a1a]/85 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity with Italian Tricolor */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {/* Bull Shield Icon */}
            <div className="relative w-8 h-8 flex items-center justify-center border border-[#D4AF37]/40 bg-[#1a1a1a] rotate-45 group-hover:border-[#FFD700] transition-colors">
              <Shield className="-rotate-45 w-4 h-4 text-[#D4AF37] group-hover:text-[#FFD700] transition-colors" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-orbitron font-bold tracking-[0.25em] text-sm md:text-base text-white group-hover:text-[#D4AF37] transition-colors">
                  LAMBORGHINI
                </span>
                {/* Italian Flag Strip */}
                <div className="hidden sm:flex items-center h-2.5 w-4.5 rounded-[1px] overflow-hidden ml-1">
                  <div className="w-1.5 h-full bg-[#009246]" />
                  <div className="w-1.5 h-full bg-[#FFFFFF]" />
                  <div className="w-1.5 h-full bg-[#CE2B37]" />
                </div>
              </div>
              <span className="font-rajdhani text-[11px] tracking-[0.3em] text-[#D4AF37]/80 uppercase">
                HURACÁN LP 640-4
              </span>
            </div>
          </div>

          {/* Telemetry pill */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10 text-[11px] font-rajdhani tracking-widest text-zinc-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYS: TELEMETRY ACTIVE</span>
          </div>
        </div>

        {/* Center: Navigation shortcuts */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-rajdhani font-semibold tracking-[0.2em] text-zinc-300">
          <a
            href="#overview"
            className="hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
          >
            01. OVERVIEW
          </a>
          <a
            href="#design"
            className="hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
          >
            02. AERODINAMICA
          </a>
          <a
            href="#engine"
            className="hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
          >
            03. V10 ENGINE
          </a>
          <a
            href="#telemetry"
            className="hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
          >
            04. DYNAMICS
          </a>
        </nav>

        {/* Right: Sound Toggle + INQUIRE button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? "Disable acoustic engine feedback" : "Enable acoustic engine feedback"}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 border border-white/10 hover:border-[#D4AF37]/50 rounded-sm bg-[#2a2a2a]/40 text-zinc-300 text-xs font-rajdhani transition-all hover:text-white"
            title="Toggle Engine Purr Synth"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[10px] tracking-wider text-[#D4AF37]">V10 ACOUSTICS</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span className="text-[10px] tracking-wider text-zinc-400">SOUND OFF</span>
              </>
            )}
          </button>

          <button
            onClick={handleInquire}
            className="relative group overflow-hidden px-4 sm:px-5 py-2 border border-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-white hover:text-black transition-all duration-300 rounded-[2px]"
          >
            <div className="flex items-center gap-1.5 font-orbitron text-xs sm:text-sm font-semibold tracking-[0.18em]">
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            {/* Top right corner accent */}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#D4AF37] group-hover:bg-black transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
