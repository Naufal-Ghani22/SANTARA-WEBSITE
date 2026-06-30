"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Users, HardDrive, Zap, Circle } from "lucide-react";

const variants = [
  {
    code: "S-1",
    name: "Micro Unit",
    dimensions: "3m x 4m",
    area: "12 m²",
    target: "Pembibitan Keluarga & UMKM",
    capacity: "~1.200 bibit / siklus",
    power: "450 W (Off-Grid Solar Ready)",
    desc: "Dirancang khusus untuk skala mikro rumah tangga atau unit penelitian akademis. Sangat portabel dan hemat tempat, ideal untuk pekarangan rumah.",
    accent: "border-lime-500/30 text-lime-600 bg-lime-500/5",
    colorHex: "#B5D300",
  },
  {
    code: "S-2",
    name: "Cluster Unit",
    dimensions: "6m x 8m",
    area: "48 m²",
    target: "Kelompok Tani Lokal",
    capacity: "~5.000 bibit / siklus",
    power: "1.2 kW (Hybrid Solar Grid)",
    desc: "Solusi optimal bagi kelompok tani tingkat dusun untuk menyuplai bibit unggul seragam bagi anggota tani secara teratur.",
    accent: "border-emerald-500/30 text-emerald-600 bg-emerald-500/5",
    colorHex: "#054E00",
  },
  {
    code: "S-3",
    name: "Komunal Unit",
    dimensions: "12m x 16m",
    area: "192 m²",
    target: "Gabungan Kelompok Tani (Gapoktan)",
    capacity: "~20.000 bibit / siklus",
    power: "4.8 kW (Industrial Battery Rack)",
    desc: "Unit berskala menengah-besar yang mendukung pusat persemaian korporasi desa atau koperasi wilayah kecamatan.",
    accent: "border-teal-500/30 text-teal-600 bg-teal-500/5",
    colorHex: "#008080",
  },
  {
    code: "S-4",
    name: "Agro Hub",
    dimensions: "24m x 32m",
    area: "768 m²",
    target: "Pusat Produksi Desa / BUMN",
    capacity: "~80.000 bibit / siklus",
    power: "18.0 kW (Microgrid Integration)",
    desc: "Infrastruktur agritech skala masif untuk program food estate nasional, riset varietas unggul pemerintah, atau industri agribisnis korporasi.",
    accent: "border-amber-500/30 text-amber-600 bg-amber-500/5",
    colorHex: "#F3CE34",
  },
];

export default function VarianModul() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" } as const,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" } as const,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === variants.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? variants.length - 1 : prev - 1));
  };

  const active = variants[currentIndex];

  return (
    <section
      id="varian"
      className="py-24 md:py-32 bg-ivory-rice relative overflow-hidden"
    >
      {/* Background circles */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-young-rice/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-deep-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
            Katalog Produk
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
            Varian Modul Greenhouse
          </h2>
          <p className="mt-4 text-base md:text-lg text-deep-forest/80">
            Pilihan konfigurasi dimensi modular yang fleksibel dan dapat dikustomisasi, menyesuaikan anggaran dan kebutuhan lahan kelompok pertanian Anda.
          </p>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Card Viewport */}
          <div className="lg:col-span-8 flex flex-col justify-between p-8 md:p-12 rounded-[32px] bg-white/70 border border-deep-forest/10 shadow-xl overflow-hidden relative min-h-[480px]">
            <div className="absolute top-6 right-6 font-display font-black text-6xl md:text-8xl text-deep-forest/[0.04] pointer-events-none">
              SANTARA
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active.code}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Code */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <span className="font-display font-black text-4xl md:text-5xl text-deep-forest tracking-tight">
                      {active.code}
                    </span>
                    <div className="h-8 w-[1px] bg-deep-forest/15" />
                    <div>
                      <h3 className="font-display font-extrabold text-xl md:text-2xl text-deep-forest">
                        {active.name}
                      </h3>
                      <span className="text-xs text-deep-forest/60 font-semibold">
                        {active.target}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-deep-forest/85 leading-relaxed max-w-2xl mb-8">
                    {active.desc}
                  </p>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-deep-forest/[0.02] border border-deep-forest/5">
                      <Maximize2 className="w-5 h-5 text-deep-forest/65" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-deep-forest/50 block">Dimensi & Luas</span>
                        <span className="text-sm font-extrabold text-deep-forest">{active.dimensions} ({active.area})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-deep-forest/[0.02] border border-deep-forest/5">
                      <Users className="w-5 h-5 text-deep-forest/65" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-deep-forest/50 block">Kapasitas Persemian</span>
                        <span className="text-sm font-extrabold text-deep-forest">{active.capacity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-deep-forest/[0.02] border border-deep-forest/5">
                      <Zap className="w-5 h-5 text-deep-forest/65" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-deep-forest/50 block">Sistem Catu Daya</span>
                        <span className="text-sm font-extrabold text-deep-forest">{active.power}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-deep-forest/[0.02] border border-deep-forest/5">
                      <HardDrive className="w-5 h-5 text-deep-forest/65" />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-deep-forest/50 block">Kecerdasan Sistem</span>
                        <span className="text-sm font-extrabold text-deep-forest">IoT + AI Local Edge Controller</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dimensions Ratio Preview */}
                <div className="mt-8 pt-6 border-t border-deep-forest/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-deep-forest/60">Skala Proporsional Layout:</span>
                  <div className="h-12 w-48 bg-deep-forest/5 rounded-lg flex items-center justify-center border border-deep-forest/10 p-2 overflow-hidden relative">
                    {/* Visual scaled box */}
                    <div 
                      className="rounded shadow-inner border transition-all duration-300"
                      style={{
                        backgroundColor: active.colorHex + "20",
                        borderColor: active.colorHex,
                        width: currentIndex === 0 ? "25%" : currentIndex === 1 ? "40%" : currentIndex === 2 ? "70%" : "95%",
                        height: currentIndex === 0 ? "25%" : currentIndex === 1 ? "35%" : currentIndex === 2 ? "60%" : "90%",
                      }}
                    />
                    <span className="absolute text-[8px] font-black text-deep-forest/50 pointer-events-none uppercase tracking-widest">
                      {active.dimensions}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="flex justify-between items-center mt-8">
              <div className="flex gap-1.5">
                {variants.map((v, idx) => (
                  <button
                    key={v.code}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                      idx === currentIndex ? "scale-125 text-deep-forest" : "text-deep-forest/20 hover:text-deep-forest/50"
                    }`}
                  >
                    <Circle className={`w-2 h-2 fill-current`} />
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-deep-forest/10 hover:border-deep-forest hover:bg-deep-forest hover:text-ivory-rice transition-all shadow-md cursor-pointer"
                  aria-label="Previous variant"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full border border-deep-forest/10 hover:border-deep-forest hover:bg-deep-forest hover:text-ivory-rice transition-all shadow-md cursor-pointer"
                  aria-label="Next variant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick List Selection Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-between">
            {variants.map((v, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={v.code}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`p-6 rounded-3xl border text-left flex items-center justify-between w-full h-[23%] transition-all duration-300 ${
                    isActive
                      ? "bg-deep-forest border-deep-forest text-ivory-rice shadow-xl translate-x-1"
                      : "glass-card border-deep-forest/5 text-deep-forest hover:border-deep-forest/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-2xl tracking-tight">
                        {v.code}
                      </span>
                      <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                        isActive ? "bg-young-rice text-deep-forest" : "bg-deep-forest/5"
                      }`}>
                        MODUL
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-sm md:text-base mt-1.5">
                      {v.name}
                    </h3>
                  </div>
                  <span className={`font-display font-bold text-xs uppercase ${
                    isActive ? "text-young-rice" : "text-deep-forest/50"
                  }`}>
                    {v.dimensions}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
