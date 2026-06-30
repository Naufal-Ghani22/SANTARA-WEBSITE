"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sprout, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax animations for background and text
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-[#FAF9F5] pt-6 pb-20 px-4 md:px-8 relative">
      <section
        id="hero"
        ref={containerRef}
        className="relative h-[85vh] md:h-[88vh] w-full flex items-center justify-center overflow-hidden bg-deep-forest rounded-[36px] md:rounded-[48px] shadow-lg"
      >
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 bg-[url('/images/hero_bg.png')] bg-cover bg-center bg-no-repeat scale-105 rounded-[36px] md:rounded-[48px]"
        />

        {/* Premium Gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent rounded-[36px] md:rounded-[48px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent rounded-[36px] md:rounded-[48px]" />

        {/* Hero Content */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/35 backdrop-blur-md mb-6 shadow-md"
          >
            <Sprout className="w-4 h-4 text-young-rice animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              Smart Agri-Nusantara Greenhouse
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-white leading-tight drop-shadow-md tracking-tight"
          >
            Menanam Teknologi, <br />
            <span className="text-young-rice drop-shadow-none">Menuai Masa Depan</span> Indonesia.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-sm md:text-base lg:text-lg text-white/90 max-w-3xl leading-relaxed font-semibold drop-shadow-sm"
          >
            SANTARA adalah greenhouse modular berbasis AI dan IoT yang dirancang untuk meningkatkan kualitas pembibitan, efisiensi sumber daya, dan ketahanan pangan Indonesia menuju Indonesia Emas 2045.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <Link
              href="/teknologi"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#054E00] hover:bg-[#054E00]/90 text-[#FAF9F5] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
            >
              Lihat Teknologi
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
            <Link
              href="/produk"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-deep-forest hover:bg-white transition-all duration-300 shadow-xl border border-white/20 flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-deep-forest animate-pulse" />
              Eksplor SANTARA
            </Link>
          </motion.div>
        </motion.div>

      </section>

      {/* Floating Capsule Bar (overlapping bottom edge of the rounded hero card) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-[#c2d7af]/90 backdrop-blur-md border border-white/30 px-6 py-4 rounded-full shadow-2xl flex items-center justify-between z-20 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#054E00] bg-white/40 px-2.5 py-1 rounded-full">
            Eksplorasi Live
          </span>
          <span className="text-xs font-bold text-[#054E00] hidden sm:inline">
            Desa Wonorejo • Kebun 1
          </span>
        </div>
        
        <div className="w-px bg-[#054E00]/10 self-stretch hidden md:block" />
        
        <div className="hidden md:flex gap-4 text-[10px] font-extrabold text-[#054E00] uppercase tracking-wider">
          <span>Suhu: 29°C</span>
          <span>Moisture: 86%</span>
        </div>

        <Link
          href="/dashboard"
          className="py-2.5 px-5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#054E00] text-white hover:bg-[#054E00]/95 transition-all shadow flex items-center gap-1.5"
        >
          Akses Live Kontrol
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
