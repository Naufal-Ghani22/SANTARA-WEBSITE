"use client";

import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import Dampak from "@/components/Dampak";
import Link from "next/link";
import { ArrowRight, Cpu, Wrench, BarChart2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Problem Section */}
      <ProblemSection />

      {/* 3. Technology Preview Callout */}
      <section className="py-20 bg-ivory-rice border-t border-b border-deep-forest/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#b5d300_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
                Eksplorasi Teknologi
              </span>
              <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
                Arsitektur IoT & AI Terintegrasi
              </h2>
              <p className="mt-6 text-sm md:text-base text-deep-forest/80 leading-relaxed">
                SANTARA bukan sekadar greenhouse biasa. Ini adalah integrasi struktur modular portabel dengan sensor telemetri presisi, modul pencahayaan buatan, irigasi cerdas, dan pusat kendali AI Edge.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-deep-forest/5 text-deep-forest rounded-lg mt-0.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-deep-forest">Modular & Portabel</h3>
                    <p className="text-xs text-deep-forest/70 mt-1">Mudah dipasang, dipindahkan, dan dikustomisasi sesuai kapasitas persemaian desa.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-deep-forest/5 text-deep-forest rounded-lg mt-0.5">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-deep-forest">Kendali Aktuator Otomatis</h3>
                    <p className="text-xs text-deep-forest/70 mt-1">AI lokal mengontrol kipas, pompa air, dan intensitas lampu secara mandiri.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/teknologi"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-forest text-ivory-rice hover:bg-deep-forest/90 transition-all shadow-md hover:shadow-lg"
                >
                  Jelajahi Model 3D Interaktif
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual preview slot (using a premium render preview) */}
            <div className="relative h-[350px] lg:h-[450px] rounded-[32px] md:rounded-[40px] overflow-hidden border border-deep-forest/10 shadow-2xl bg-white/50 group">
              <Image
                src="/images/gallery/greenhouse_santara_padi.png"
                alt="Santara Greenhouse Preview"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-w-768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-young-rice bg-white/10 px-2 py-0.5 rounded border border-white/5 self-start mb-2 inline-block">
                  PREVIEW RENDER
                </span>
                <h3 className="font-display font-extrabold text-lg text-white leading-tight">
                  Arsitektur Modular Cerdas S-2
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Callout */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Blueprint */}
            <div className="lg:col-span-6 relative h-[300px] lg:h-[400px] rounded-[32px] md:rounded-[40px] overflow-hidden border border-deep-forest/10 bg-deep-forest/5 flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(5,78,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(5,78,0,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
              <div className="text-center relative z-10">
                <h3 className="font-display font-black text-6xl text-deep-forest/15 select-none tracking-widest mb-4">SANTARA</h3>
                <p className="text-xs font-bold text-deep-forest/65 max-w-sm mx-auto leading-relaxed">
                  Dimensi fleksibel dari modul S-1 (Micro Unit 3mx4m) hingga S-4 (Agro Hub 24mx32m) untuk kemandirian pangan nasional.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <div className="w-12 h-16 border border-dashed border-deep-forest/30 rounded flex items-center justify-center text-[10px] font-black text-deep-forest/40 uppercase">S-1</div>
                  <div className="w-20 h-24 border border-dashed border-deep-forest/40 rounded flex items-center justify-center text-xs font-black text-deep-forest/60 uppercase">S-2</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
                Varian & Komoditas
              </span>
              <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
                Fleksibilitas Kapasitas Produksi
              </h2>
              <p className="mt-6 text-sm md:text-base text-deep-forest/80 leading-relaxed">
                Kami menyediakan variasi ukuran greenhouse yang disesuaikan dengan profil pengguna, mulai dari pembibitan mandiri keluarga, kelompok tani, gapoktan desa, hingga agro-industri korporasi regional.
              </p>

              <div className="mt-10">
                <Link
                  href="/produk"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-forest text-ivory-rice hover:bg-deep-forest/90 transition-all shadow-md hover:shadow-lg"
                >
                  Lihat Varian Modul & Komoditas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Impacts Preview Section */}
      <Dampak showCTA={true} />

      {/* 6. Deep Portal CTA */}
      <div className="bg-[#FAF9F5] pb-16 px-4 md:px-8">
        <section className="py-24 bg-deep-forest text-ivory-rice relative overflow-hidden rounded-[36px] md:rounded-[48px] shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-young-rice/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight tracking-tight">
              Hubungkan Data, Ciptakan Ketahanan Pangan Nasional.
            </h2>
            <p className="mt-6 text-sm md:text-base text-ivory-rice/80 max-w-2xl mx-auto leading-relaxed">
              Gunakan dasbor Digital Twin untuk mensimulasikan respons kecerdasan buatan, atau ajukan permohonan kemitraan pengadaan unit di wilayah Anda.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-young-rice text-deep-forest hover:bg-young-rice/90 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <BarChart2 className="w-4 h-4" />
                Simulator Digital Twin
              </Link>
              <Link
                href="/kontak"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                Mulai Kerja Sama ➔
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
