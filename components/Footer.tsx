"use client";

import React from "react";
import { Shield, ArrowUp } from "lucide-react";
import { carData } from "@/data/carData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#141414] py-16 px-4 sm:px-6 lg:px-8">
      {/* Italian Flag Accent Banner */}
      <div className="h-[2px] w-full flex mb-12">
        <div className="flex-1 bg-[#009246]" />
        <div className="flex-1 bg-[#FFFFFF]" />
        <div className="flex-1 bg-[#CE2B37]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center border border-[#D4AF37]/50 bg-[#1a1a1a] rotate-45">
              <Shield className="-rotate-45 w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
            <span className="font-orbitron text-lg font-black tracking-[0.25em] text-white">
              AUTOMOBILI LAMBORGHINI
            </span>
          </div>
          <p className="font-rajdhani text-xs text-zinc-400 tracking-widest uppercase">
            VIA MODENA 12, SANT&apos;AGATA BOLOGNESE (BO), ITALY • {carData.dealership.coordinates}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-[#D4AF37] text-zinc-300 hover:text-white font-orbitron text-xs tracking-widest uppercase transition-colors"
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-rajdhani text-zinc-400 tracking-wider">
        <div>
          © {new Date().getFullYear()} AUTOMOBILI LAMBORGHINI S.P.A. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
          <span className="hover:text-white transition-colors cursor-pointer">LEGAL NOTICE</span>
          <span className="hover:text-white transition-colors cursor-pointer">WLTP CERTIFICATION</span>
        </div>
      </div>
    </footer>
  );
}
