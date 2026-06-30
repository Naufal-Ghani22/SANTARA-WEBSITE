"use client";

import Dampak from "@/components/Dampak";
import Roadmap from "@/components/Roadmap";
import Gallery from "@/components/Gallery";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DampakPage() {
  return (
    <div className="w-full">
      {/* Intro Header */}
      <section className="bg-deep-forest text-ivory-rice py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#b5d300_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-widest text-young-rice bg-white/10 px-4 py-1.5 rounded-full border border-white/5 inline-block"
            >
              Evaluasi Dampak & Visi
            </motion.span>
            <h1 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-white leading-tight tracking-tight"
            >
              Dampak, Roadmap 2045 & Galeri
            </h1>
            <p className="mt-4 text-sm md:text-base text-ivory-rice/80 leading-relaxed"
            >
              Meninjau dampak nyata efisiensi agrikultur presisi, linimasa strategis menuju Indonesia Emas 2045, serta dokumentasi visual implementasi kami di desa-desa.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-young-rice text-deep-forest hover:bg-young-rice/90 transition-all shadow-md"
            >
              Ajukan Kerja Sama
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 1. Impact Stats Counters */}
      <Dampak />

      {/* 2. Horizontal Milestones Timeline */}
      <Roadmap />

      {/* 3. Masonry Gallery */}
      <Gallery />
    </div>
  );
}
