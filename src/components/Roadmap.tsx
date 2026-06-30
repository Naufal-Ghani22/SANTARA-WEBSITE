"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, ArrowRight, ShieldCheck, Milestone, Globe2, HelpCircle } from "lucide-react";

const milestones = [
  {
    year: "2026",
    title: "Prototype & R&D",
    subtitle: "Uji Coba Fungsionalitas Pertama",
    desc: "Memvalidasi rancang bangun modular greenhouse, kalibrasi sensor IoT, serta pengujian spektrum cahaya LED optimal pada persemaian bibit padi.",
    targets: ["Validasi mekanik modular", "Kalibrasi sensor NPK & pH", "Prototipe pertama unit S-1"],
    icon: Milestone,
  },
  {
    year: "2028",
    title: "Scale Up Nasional",
    subtitle: "Implementasi 500 Desa Percontohan",
    desc: "Mulai memproduksi modul S-1 dan S-2 untuk didistribusikan ke kelompok tani di Jawa dan Sumatera. Kemitraan dengan BUMN & Kementerian Pertanian.",
    targets: ["500 Unit Desa Percontohan", "Sertifikasi Standardisasi Mutu", "Penyediaan subsidi petani lokal"],
    icon: Globe2,
  },
  {
    year: "2031",
    title: "Transformasi Digital",
    subtitle: "AI Integrasi & Digital Twin Platform",
    desc: "Menghubungkan seluruh greenhouse aktif ke dasbor awan terpusat. Kecerdasan AI diperkenalkan untuk prediksi panen dan hama regional.",
    targets: ["Platform Digital Twin Nasional", "Machine Learning Edge Deployment", "Analisis yield terpusat"],
    icon: Flag,
  },
  {
    year: "2036",
    title: "Ketahanan Pangan",
    subtitle: "Swasembada Benih Wilayah Mandiri",
    desc: "Mewujudkan kemandirian bibit di tingkat kabupaten/provinsi. Mengurangi kerugian post-harvest hingga di bawah 5% secara nasional.",
    targets: ["Swasembada benih lokal regional", "Penurunan post-harvest loss", "Unit S-3 & S-4 aktif di Gapoktan"],
    icon: ShieldCheck,
  },
  {
    year: "2045",
    title: "Indonesia Emas",
    subtitle: "Kedaulatan Pangan Mutlak 100%",
    desc: "Integrasi penuh ekosistem pertanian cerdas Nusantara. Memposisikan Indonesia sebagai lumbung pangan dunia yang modern dan tangguh.",
    targets: ["Kemandirian pangan berkelanjutan", "Zero Import Benih Hortikultura", "Ekspor teknologi agritech"],
    icon: StarIcon, // Local icon ref
  },
];

// Local custom icon for star since Lucide Star might conflict
function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function Roadmap() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeRoadmap = milestones[activeIdx];

  return (
    <section
      id="roadmap"
      className="py-24 md:py-32 bg-gradient-to-b from-ivory-rice to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,78,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,78,0,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
            Rencana Strategis
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
            Roadmap Ketahanan Pangan 2045
          </h2>
          <p className="mt-4 text-base md:text-lg text-deep-forest/80">
            Langkah terencana pembangunan ekosistem pertanian cerdas untuk mengantarkan Indonesia menuju swasembada berkelanjutan.
          </p>
        </div>

        {/* Timeline Horizontal Layout */}
        <div className="relative mb-16">
          {/* Connector Line Track */}
          <div className="absolute top-[32px] left-[5%] right-[5%] h-1 bg-deep-forest/10 hidden md:block z-0" />

          {/* Running progress highlighter */}
          <motion.div 
            className="absolute top-[32px] left-[5%] h-1 bg-deep-forest origin-left hidden md:block z-0"
            initial={{ width: "0%" }}
            animate={{ width: `${(activeIdx / (milestones.length - 1)) * 90}%` }}
            transition={{ duration: 0.4 }}
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 md:gap-0 relative z-10">
            {milestones.map((mil, idx) => {
              const isActive = idx === activeIdx;
              const isPassed = idx < activeIdx;

              return (
                <button
                  key={mil.year}
                  onClick={() => setActiveIdx(idx)}
                  className="flex md:flex-col items-center gap-4 md:gap-6 w-full md:w-[15%] text-left md:text-center group relative cursor-pointer"
                >
                  {/* Node Circle */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative shrink-0 ${
                      isActive
                        ? "bg-deep-forest border-deep-forest text-young-rice scale-110 shadow-lg"
                        : isPassed
                        ? "bg-[#ECF1C4] border-deep-forest text-deep-forest"
                        : "bg-white border-deep-forest/15 text-deep-forest/40 group-hover:border-deep-forest/40 group-hover:text-deep-forest"
                    }`}
                  >
                    <span className="font-display font-black text-sm md:text-base">
                      {mil.year}
                    </span>
                    
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border-2 border-young-rice animate-ping opacity-60" />
                    )}
                  </div>

                  {/* Text details for responsive sizing */}
                  <div>
                    <h3 className={`font-display font-extrabold text-sm ${isActive ? "text-deep-forest" : "text-deep-forest/50 group-hover:text-deep-forest/80"}`}>
                      {mil.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Card Viewport */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12 rounded-3xl bg-white/70 border border-deep-forest/10 shadow-2xl relative overflow-hidden"
            >
              {/* Background watermark */}
              <span className="absolute -bottom-8 -right-8 font-display font-black text-8xl md:text-9xl text-deep-forest/[0.03] select-none pointer-events-none">
                {activeRoadmap.year}
              </span>

              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                {/* Year tag */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-deep-forest/5 flex items-center justify-center font-display font-black text-2xl md:text-3xl text-deep-forest border border-deep-forest/10 shrink-0">
                  {activeRoadmap.year}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="font-display font-extrabold text-xl md:text-2xl text-deep-forest">
                      {activeRoadmap.title}
                    </h3>
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-deep-forest text-ivory-rice">
                      {activeRoadmap.subtitle}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-deep-forest/80 leading-relaxed mb-6">
                    {activeRoadmap.desc}
                  </p>

                  <h4 className="text-xs uppercase font-bold tracking-widest text-deep-forest/50 mb-3">
                    Target Utama Milestones:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeRoadmap.targets.map((tgt, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-deep-forest/[0.02] border border-deep-forest/5"
                      >
                        <div className="w-2 h-2 rounded-full bg-young-rice shrink-0" />
                        <span className="text-xs md:text-sm font-semibold text-deep-forest/90">
                          {tgt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
