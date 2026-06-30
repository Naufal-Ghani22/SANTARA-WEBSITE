"use client";

import VarianModul from "@/components/VarianModul";
import Komoditas from "@/components/Komoditas";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProdukPage() {
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
              Katalog Varian & Varietas
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-white leading-tight tracking-tight"
            >
              Varian Unit & Varietas Komoditas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm md:text-base text-ivory-rice/80 leading-relaxed"
            >
              Jelajahi berbagai ukuran modul greenhouse modular portabel kami serta varietas tanaman Nusantara yang dioptimalkan tumbuh subur di dalam ekosistem SANTARA.
            </motion.p>
          </div>
          <div className="shrink-0">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-young-rice text-deep-forest hover:bg-young-rice/90 transition-all shadow-md"
            >
              Akses Digital Twin
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Module Carousel */}
      <VarianModul />

      {/* Commodities Crops Grid */}
      <Komoditas />
    </div>
  );
}
