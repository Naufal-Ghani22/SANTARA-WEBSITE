"use client";

import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import { Mail, Landmark, Award } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="w-full">
      {/* Intro Header */}
      <section className="bg-deep-forest text-ivory-rice py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#b5d300_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-widest text-young-rice bg-white/10 px-4 py-1.5 rounded-full border border-white/5 inline-block"
          >
            Portal Kolaborasi
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-white leading-tight tracking-tight"
          >
            Kemitraan Strategis SANTARA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm md:text-base text-ivory-rice/80 max-w-2xl mx-auto leading-relaxed"
          >
            Hubungkan institusi Anda dengan program akselerasi pangan kami. Kami memprioritaskan permohonan dari pemerintah daerah, BUMN, perwakilan koperasi tani, dan universitas riset.
          </motion.p>
        </div>
      </section>

      {/* Main partnership info cards section */}
      <section className="py-16 bg-white relative overflow-hidden border-b border-deep-forest/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Government Card */}
            <div className="glass-card p-8 rounded-3xl border border-deep-forest/10 flex flex-col items-center text-center shadow-md">
              <div className="p-3.5 rounded-2xl bg-deep-forest/5 text-deep-forest mb-5">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-base text-deep-forest mb-2">Pemerintah & BUMN</h3>
              <p className="text-xs text-deep-forest/75 leading-relaxed">
                Program pengadaan unit untuk kelompok tani desa, kedaulatan benih unggul regional, dan integrasi lumbung pangan lokal.
              </p>
            </div>

            {/* Investor Card */}
            <div className="glass-card p-8 rounded-3xl border border-deep-forest/10 flex flex-col items-center text-center shadow-md">
              <div className="p-3.5 rounded-2xl bg-deep-forest/5 text-deep-forest mb-5">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-base text-deep-forest mb-2">Investor AgriTech</h3>
              <p className="text-xs text-deep-forest/75 leading-relaxed">
                Peluang perluasan pabrik perakitan modular greenhouse dan pengembangan model AI analitik prediktif berbayar.
              </p>
            </div>

            {/* Academia Card */}
            <div className="glass-card p-8 rounded-3xl border border-deep-forest/10 flex flex-col items-center text-center shadow-md">
              <div className="p-3.5 rounded-2xl bg-deep-forest/5 text-deep-forest mb-5">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-display font-extrabold text-base text-deep-forest mb-2">Universitas & Riset</h3>
              <p className="text-xs text-deep-forest/75 leading-relaxed">
                Kalibrasi varietas hortikultura baru, validasi sensor nutrisi canggih, dan kerja sama penelitian data mikroklimat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main partnership form */}
      <Contact />
    </div>
  );
}
