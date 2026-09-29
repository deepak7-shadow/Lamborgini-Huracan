"use client";

import React, { useState } from "react";
import { carData } from "@/data/carData";
import { Send, CheckCircle2, ShieldCheck, PhoneCall, Mail } from "lucide-react";

export default function InquirySection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    livery: "Giallo Inti (Pearl Yellow)",
    usage: "Weekend High Performance Touring",
    delivery: "Factory Collection (Sant'Agata Bolognese)",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `HUR-VIP-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setSubmitted(true);
  };

  const liveries = [
    { name: "Giallo Inti (Pearl Yellow)", color: "#FFD700" },
    { name: "Nero Nemesis (Satin Matte Black)", color: "#222222" },
    { name: "Verde Mantis (Electric Green)", color: "#10b981" },
    { name: "Grigio Telesto (Battleship Grey)", color: "#71717a" },
    { name: "Arancio Borealis (Pearl Orange)", color: "#f97316" },
  ];

  return (
    <section id="inquire-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Luxury VIP Concierge details */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="font-rajdhani text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#D4AF37] uppercase">
                ALLOCATION REQUEST
              </span>
            </div>

            <h2 className="font-orbitron text-3xl sm:text-4xl font-black tracking-wider text-white uppercase gold-text-glow leading-tight">
              COMMISSION YOUR <br />
              <span className="text-[#FFD700]">HURACÁN</span>
            </h2>

            <p className="mt-4 font-rajdhani text-sm sm:text-base text-zinc-300 tracking-wider leading-relaxed">
              Sant&apos;Agata Bolognese maintains strictly controlled manufacturing quotas to preserve the rarity and investment value of every V10 delivered.
            </p>
          </div>

          <div className="p-6 bg-[#2a2a2a]/40 border border-[#D4AF37]/30 space-y-4">
            <h4 className="font-orbitron text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              PRIVATE CLIENT SERVICES
            </h4>

            <div className="space-y-3 text-xs font-rajdhani text-zinc-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{carData.dealership.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{carData.dealership.conciergePhone}</span>
              </div>
              <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-zinc-500">
                HEADQUARTERS: {carData.dealership.coordinates}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-[#1a1a1a]/95 border border-[#D4AF37]/40 rounded-[2px] shadow-2xl backdrop-blur-md">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 mx-auto border-2 border-[#D4AF37] rounded-full flex items-center justify-center bg-[#D4AF37]/10">
                <CheckCircle2 className="w-8 h-8 text-[#FFD700]" />
              </div>

              <div>
                <h3 className="font-orbitron text-2xl font-bold text-white uppercase tracking-wider">
                  COMMISSION DOSSIER INITIALIZED
                </h3>
                <p className="mt-2 font-rajdhani text-sm text-zinc-300 tracking-wide">
                  Your allocation request has been routed to the Sant&apos;Agata Bolognese Private Client Office.
                </p>
              </div>

              <div className="p-4 bg-[#2a2a2a]/60 border border-[#D4AF37]/30 inline-block">
                <span className="block text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
                  VIP ALLOCATION REFERENCE
                </span>
                <span className="font-mono text-lg font-bold text-[#FFD700] tracking-wider">
                  {ticketId}
                </span>
              </div>

              <div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 border border-white/20 hover:border-[#D4AF37] text-white text-xs font-orbitron tracking-widest uppercase transition-colors"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-rajdhani tracking-widest text-zinc-300 uppercase mb-2">
                    FIRST NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#2a2a2a]/50 border border-white/10 focus:border-[#D4AF37] text-white font-rajdhani text-sm outline-none transition-colors"
                    placeholder="Enzo"
                  />
                </div>

                <div>
                  <label className="block text-xs font-rajdhani tracking-widest text-zinc-300 uppercase mb-2">
                    LAST NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#2a2a2a]/50 border border-white/10 focus:border-[#D4AF37] text-white font-rajdhani text-sm outline-none transition-colors"
                    placeholder="Ferruccio"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-rajdhani tracking-widest text-zinc-300 uppercase mb-2">
                    OFFICIAL EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#2a2a2a]/50 border border-white/10 focus:border-[#D4AF37] text-white font-rajdhani text-sm outline-none transition-colors"
                    placeholder="client@concierge.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-rajdhani tracking-widest text-zinc-300 uppercase mb-2">
                    TELEPHONE (INTERNATIONAL) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#2a2a2a]/50 border border-white/10 focus:border-[#D4AF37] text-white font-rajdhani text-sm outline-none transition-colors"
                    placeholder="+39 ..."
                  />
                </div>
              </div>

              {/* Color Livery Preference */}
              <div>
                <label className="block text-xs font-rajdhani tracking-widest text-zinc-300 uppercase mb-2">
                  PREFERRED EXTERIOR LIVERY
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {liveries.map((item) => {
                    const isSelected = formData.livery === item.name;
                    return (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => setFormData({ ...formData, livery: item.name })}
                        className={`p-2.5 border text-left flex items-center gap-2.5 transition-all text-xs font-rajdhani cursor-pointer ${
                          isSelected
                            ? "border-[#D4AF37] bg-[#D4AF37]/15 text-white"
                            : "border-white/10 bg-[#2a2a2a]/30 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate">{item.name.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Destination */}
              <div>
                <label className="block text-xs font-rajdhani tracking-widest text-zinc-300 uppercase mb-2">
                  DELIVERY PROTOCOL
                </label>
                <select
                  value={formData.delivery}
                  onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#2a2a2a]/50 border border-white/10 focus:border-[#D4AF37] text-white font-rajdhani text-sm outline-none"
                >
                  <option value="Factory Collection (Sant'Agata Bolognese)">
                    Factory Handover at Sant&apos;Agata Bolognese with Test Driver
                  </option>
                  <option value="Private Air Freight Delivery">
                    Secured Climate-Controlled Private Air Cargo Handover
                  </option>
                  <option value="Regional Official Dealership Concierge">
                    Authorized Lamborghini Regional Atelier Reception
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#FFD700] text-black font-orbitron font-bold text-sm tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>TRANSMIT ALLOCATION DOSSIER</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
