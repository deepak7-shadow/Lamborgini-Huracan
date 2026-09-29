"use client";

import React, { useState } from "react";
import { carData, DriveMode } from "@/data/carData";
import { Gauge, ShieldAlert, Cpu, Zap, Wind, Disc, Activity } from "lucide-react";

export default function SpecsGrid() {
  const [selectedMode, setSelectedMode] = useState<DriveMode>(carData.driveModes[2]); // Default CORSA

  return (
    <section id="specs-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-[1px] w-8 bg-[#D4AF37]" />
          <span className="font-rajdhani text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
            AERODINAMICA &amp; MECCANICA
          </span>
          <span className="h-[1px] w-8 bg-[#D4AF37]" />
        </div>

        <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-white uppercase gold-text-glow">
          PERFORMANCE <span className="text-[#FFD700]">TELEMETRY</span>
        </h2>
        <p className="mt-4 font-rajdhani text-sm sm:text-base text-zinc-400 max-w-2xl tracking-widest uppercase">
          Precision-engineered at the pinnacle of Italian motorsport heritage.
          Every component forged to withstand violent lateral G-forces.
        </p>
      </div>

      {/* Interactive ANIMA Drive Mode Selector */}
      <div className="mb-20 p-6 md:p-8 bg-[#2a2a2a]/40 border border-[#D4AF37]/30 rounded-[2px] backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
              ANIMA // ADAPTIVE NETWORK INTELLIGENT MANAGEMENT
            </span>
            <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              DYNAMIC DRIVE MODE CALIBRATION
            </h3>
          </div>

          {/* Drive Mode Buttons */}
          <div className="flex items-center gap-2 bg-[#1a1a1a] p-1.5 border border-white/10 rounded-[2px]">
            {carData.driveModes.map((mode) => {
              const isActive = selectedMode.id === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode)}
                  className={`px-4 py-2 font-orbitron text-xs font-bold tracking-widest uppercase transition-all rounded-[1px] cursor-pointer ${
                    isActive
                      ? "bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {mode.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Drive Mode Specs Display */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#1a1a1a]/60 border-l-2 border-[#D4AF37]">
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block">
              CALIBRATION PROFILE
            </span>
            <h4 className="font-orbitron text-lg font-bold text-white mt-1 uppercase">
              {selectedMode.badge}
            </h4>
            <p className="mt-2 text-xs font-rajdhani text-zinc-300 tracking-wider">
              {selectedMode.description}
            </p>
          </div>

          <div className="p-4 bg-[#1a1a1a]/60 border-l-2 border-[#FFD700]">
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block">
              TRANSMISSION &amp; EXHAUST
            </span>
            <div className="mt-1 space-y-1.5 text-xs font-rajdhani text-zinc-300">
              <div>
                <span className="text-zinc-500 uppercase tracking-widest">Shifting: </span>
                <span className="text-white font-medium">{selectedMode.gearShift}</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-widest">Acoustics: </span>
                <span className="text-[#FFD700] font-medium">{selectedMode.exhaust}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#1a1a1a]/60 border-l-2 border-emerald-400">
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block">
              TRACTION &amp; ESC MAPPING
            </span>
            <h4 className="font-orbitron text-sm font-semibold text-white mt-1 uppercase">
              {selectedMode.esc}
            </h4>
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                ALL-WHEEL DRIVE VECTORING ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Technical Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Card 1: V10 Powertrain */}
        <div className="p-6 sm:p-8 bg-[#2a2a2a]/30 border border-[#D4AF37]/30 hover:border-[#FFD700] transition-all duration-300 relative group">
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#D4AF37]" />
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 border border-[#D4AF37]/40 bg-[#1a1a1a] text-[#FFD700]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase">
                ENGINEERING PILLAR 01
              </span>
              <h3 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">
                ATMOSPHERIC V10 PROPULSION
              </h3>
            </div>
          </div>
          <p className="font-rajdhani text-sm text-zinc-300 leading-relaxed tracking-wider mb-6">
            Unlike turbocharged competitors, the Huracán preserves the instantaneous, unmuted response of a naturally aspirated 5.2L V10. 
            Dry-sump lubrication prevents oil starvation even at sustained 1.5G cornering loads.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">DISPLACEMENT</span>
              <span className="font-orbitron text-base font-bold text-[#FFD700]">5,204 CC</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">HORSEPOWER</span>
              <span className="font-orbitron text-base font-bold text-white">640 CV</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">REDLINE</span>
              <span className="font-orbitron text-base font-bold text-[#FFD700]">8,500 RPM</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active ALA Aerodynamics */}
        <div className="p-6 sm:p-8 bg-[#2a2a2a]/30 border border-[#D4AF37]/30 hover:border-[#FFD700] transition-all duration-300 relative group">
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#D4AF37]" />
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 border border-[#D4AF37]/40 bg-[#1a1a1a] text-[#FFD700]">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase">
                ENGINEERING PILLAR 02
              </span>
              <h3 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">
                AERODINAMICA LAMBORGHINI ATTIVA
              </h3>
            </div>
          </div>
          <p className="font-rajdhani text-sm text-zinc-300 leading-relaxed tracking-wider mb-6">
            Patented ALA technology modulates aerodynamic load without heavy hydraulic wings.
            Electronically governed micro-flaps in the front spoiler and rear wing switch from maximum downforce to minimum drag in 500 milliseconds.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">FLAP SPEED</span>
              <span className="font-orbitron text-base font-bold text-[#FFD700]">&lt; 500 MS</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">DOWNFORCE</span>
              <span className="font-orbitron text-base font-bold text-white">+750%</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">AERO VECTOR</span>
              <span className="font-orbitron text-base font-bold text-[#FFD700]">ACTIVE L/R</span>
            </div>
          </div>
        </div>

        {/* Card 3: Carbon Ceramic Brakes */}
        <div className="p-6 sm:p-8 bg-[#2a2a2a]/30 border border-[#D4AF37]/30 hover:border-[#FFD700] transition-all duration-300 relative group">
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#D4AF37]" />
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 border border-[#D4AF37]/40 bg-[#1a1a1a] text-[#FFD700]">
              <Disc className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase">
                ENGINEERING PILLAR 03
              </span>
              <h3 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">
                CARBON CERAMIC BRAKES (CCB)
              </h3>
            </div>
          </div>
          <p className="font-rajdhani text-sm text-zinc-300 leading-relaxed tracking-wider mb-6">
            Massive 380mm front discs clamped by 6-piston monobloc calipers deliver fade-free deceleration.
            Stops from 100 km/h to absolute zero in just 31.5 meters, shedding thermal heat via aerospace NACA ducts.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">100-0 KM/H</span>
              <span className="font-orbitron text-base font-bold text-[#FFD700]">31.5 M</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">FRONT DISCS</span>
              <span className="font-orbitron text-base font-bold text-white">380 MM</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">CALIPERS</span>
              <span className="font-orbitron text-base font-bold text-[#FFD700]">6-PISTON</span>
            </div>
          </div>
        </div>

        {/* Card 4: Forged Composites Architecture */}
        <div className="p-6 sm:p-8 bg-[#2a2a2a]/30 border border-[#D4AF37]/30 hover:border-[#FFD700] transition-all duration-300 relative group">
          <div className="absolute top-0 right-0 w-2 h-2 bg-[#D4AF37]" />
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 border border-[#D4AF37]/40 bg-[#1a1a1a] text-[#FFD700]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase">
                ENGINEERING PILLAR 04
              </span>
              <h3 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">
                HYBRID CARBON &amp; ALUMINUM
              </h3>
            </div>
          </div>
          <p className="font-rajdhani text-sm text-zinc-300 leading-relaxed tracking-wider mb-6">
            The Huracán chassis is a hybrid monocoque of forged carbon fiber and hydroformed aluminum.
            This yields a lightweight dry mass of 1,382 kg with unmatched torsional rigidity for instantaneous directional transitions.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">DRY WEIGHT</span>
              <span className="font-orbitron text-base font-bold text-[#FFD700]">1,382 KG</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">WEIGHT BIAS</span>
              <span className="font-orbitron text-base font-bold text-white">43/57 %</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-zinc-500 uppercase">POWER/WEIGHT</span>
              <span className="font-orbitron text-base font-bold text-[#FFD700]">2.15 KG/CV</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
