"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Cpu, Sun, Lightbulb, Wind, Droplet, Radio } from "lucide-react";

// Import the 3D Canvas component dynamically to avoid SSR issues
const SantaraGreenhouse3D = dynamic(
  () => import("./SantaraGreenhouse3D"),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center text-deep-forest/50 font-semibold bg-white/20 rounded-3xl border border-deep-forest/10">
        Memuat Visualisasi 3D...
      </div>
    )
  }
);

const components = [
  {
    name: "Sensor",
    icon: Radio,
    shortDesc: "IoT Telemetri Presisi",
    fullDesc: "Sensor internal terintegrasi memantau kelembaban tanah, suhu udara, pH air, konduktivitas elektrik, intensitas cahaya, dan kadar NPK secara real-time untuk memastikan tanaman hidup di lingkungan ideal.",
    color: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
    border: "border-yellow-500/20",
  },
  {
    name: "Solar Panel",
    icon: Sun,
    shortDesc: "Energi Bersih Terpusat",
    fullDesc: "Panel surya monokristalin berkinerja tinggi dipasang pada atap modular untuk menyerap energi matahari, mengisi daya baterai penyimpanan, dan menggerakkan seluruh sistem pintar tanpa ketergantungan grid PLN.",
    color: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
    border: "border-blue-500/20",
  },
  {
    name: "LED Grow Light",
    icon: Lightbulb,
    shortDesc: "Fotosintesis Buatan Presisi",
    fullDesc: "Lampu LED berspektrum khusus (Red-Blue & Full Spectrum) menyuplai foton dengan panjang gelombang yang dioptimalkan untuk mempercepat laju pertumbuhan vegetatif dan generatif bibit di segala kondisi cuaca.",
    color: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20",
    border: "border-purple-500/20",
  },
  {
    name: "Ventilasi",
    icon: Wind,
    shortDesc: "Sirkulasi Udara Aktif",
    fullDesc: "Kipas ventilasi pintar dan exhaust otomatis menyesuaikan bukaan jendela untuk mengatur laju sirkulasi udara, mencegah kelembaban berlebih yang mengundang jamur, dan menjaga kestabilan temperatur.",
    color: "bg-teal-500/10 text-teal-600 hover:bg-teal-500/20",
    border: "border-teal-500/20",
  },
  {
    name: "Hidroponik",
    icon: Droplet,
    shortDesc: "Nutrisi Tersirkulasi Cerdas",
    fullDesc: "Irigasi berbasis Nutrient Film Technique (NFT) atau Drip System menyalurkan cairan bernutrisi tepat pada perakaran. Menghemat penggunaan air hingga 90% dibandingkan metode pertanian konvensional.",
    color: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
    border: "border-emerald-500/20",
  },
  {
    name: "AI Module",
    icon: Cpu,
    shortDesc: "Otak Kendali Otomatis",
    fullDesc: "Edge Computing AI memproses data telemetri mentah secara lokal, menganalisis pertumbuhan bibit, mendeteksi stres dini, dan mengambil keputusan instan untuk menyalakan penyiraman atau pencahayaan.",
    color: "bg-lime-500/10 text-lime-600 hover:bg-lime-500/20",
    border: "border-lime-500/20",
  },
];

export default function WhatIsSantara() {
  const [activePart, setActivePart] = useState<string | null>(null);

  const selectedData = components.find((c) => c.name === activePart);

  return (
    <section
      id="what-is-santara"
      className="py-24 md:py-32 bg-ivory-rice relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#b5d300_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
            Inovasi Arsitektur
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
            Apa Itu SANTARA?
          </h2>
          <p className="mt-4 text-base md:text-lg text-deep-forest/80">
            SANTARA menggabungkan struktur modular portabel dengan sistem kecerdasan buatan terdistribusi. Eksplorasi detail arsitektur teknologi kami pada model 3D interaktif di bawah ini.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Component Selection Sidebar */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {components.map((comp) => {
                const Icon = comp.icon;
                const isActive = activePart === comp.name;
                return (
                  <button
                    key={comp.name}
                    onClick={() => setActivePart(isActive ? null : comp.name)}
                    className={`flex items-center gap-4 p-4 rounded-2xl text-left border transition-all duration-300 ${
                      isActive
                        ? "bg-deep-forest border-deep-forest text-ivory-rice shadow-lg translate-x-1"
                        : "glass-card border-deep-forest/5 text-deep-forest hover:border-deep-forest/20"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isActive ? "bg-young-rice text-deep-forest" : comp.color
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm leading-tight">
                        {comp.name}
                      </h3>
                      <p
                        className={`text-xs mt-0.5 ${
                          isActive ? "text-ivory-rice/80" : "text-deep-forest/60"
                        }`}
                      >
                        {comp.shortDesc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Detail Tooltip Panel */}
            <div className="min-h-[140px] mt-2 relative">
              <AnimatePresence mode="wait">
                {selectedData ? (
                  <motion.div
                    key={selectedData.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 rounded-2xl bg-white/70 border border-deep-forest/10 shadow-inner"
                  >
                    <h4 className="font-display font-extrabold text-base text-deep-forest flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-young-rice animate-pulse" />
                      Detail Komponen: {selectedData.name}
                    </h4>
                    <p className="text-sm text-deep-forest/80 leading-relaxed">
                      {selectedData.fullDesc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="none-selected"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 rounded-2xl border border-dashed border-deep-forest/20 text-center flex flex-col items-center justify-center text-deep-forest/60 h-full py-10"
                  >
                    <span className="text-sm font-semibold">Pilih atau klik salah satu komponen di atas</span>
                    <span className="text-xs mt-1">atau klik langsung bagian greenhouse pada model 3D untuk melihat deskripsi detail.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 3D Visualizer Canvas */}
          <div className="lg:col-span-7 order-1 lg:order-2 h-[450px] md:h-[550px] rounded-3xl bg-gradient-to-tr from-deep-forest/5 via-white/50 to-deep-forest/5 border border-deep-forest/10 shadow-2xl relative overflow-hidden">
            {/* Overlay hint banner */}
            <div className="absolute top-4 left-4 z-10 glass-card px-4 py-2 rounded-xl text-xs font-semibold text-deep-forest shadow-md border-deep-forest/10 pointer-events-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-young-rice animate-ping" />
              Interactive WebGL Viewport
            </div>

            <SantaraGreenhouse3D activePart={activePart} setActivePart={setActivePart} />
          </div>
        </div>
      </div>
    </section>
  );
}
