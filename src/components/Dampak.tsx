"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Droplet, Layers, CalendarCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function CountUp({ from, to, duration = 2, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = to;
    const totalFrames = duration * 60;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = from + (end - from) * (progress * (2 - progress));
      
      setCount(Math.floor(current));

      if (frame === totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const impacts = [
  {
    icon: TrendingUp,
    title: "Produktivitas Bibit",
    description: "Pertumbuhan bibit unggul lebih cepat dengan sistem pencahayaan fotosintesis buatan terprogram.",
    element: <CountUp from={0} to={30} suffix="%" prefix="+" />,
    sub: "Peningkatan Hasil Panen",
    border: "border-lime-500/20",
    color: "text-lime-600",
  },
  {
    icon: Droplet,
    title: "Efisiensi Konsumsi Air",
    description: "Irigasi tersirkulasi tertutup (NFT) menyerap nutrisi tepat ke akar tanpa terbuang ke tanah.",
    element: <CountUp from={0} to={90} suffix="%" />,
    sub: "Pengurangan Konsumsi Air",
    border: "border-blue-500/20",
    color: "text-blue-600",
  },
  {
    icon: Layers,
    title: "Efisiensi Input Tani",
    description: "Penggunaan pupuk, nutrisi cair, dan pestisida dikurangi berkat presisi data sensor AI.",
    element: <CountUp from={0} to={15} suffix="%" />,
    sub: "Penghematan Biaya Pokok",
    border: "border-amber-500/20",
    color: "text-amber-600",
  },
  {
    icon: CalendarCheck,
    title: "Stabilitas Produksi",
    description: "Greenhouse melindungi pembibitan dari cuaca buruk ekstrem untuk panen kontinu mandiri.",
    element: <span className="text-xl md:text-2xl font-extrabold uppercase tracking-wide block py-2.5">Sepanjang Tahun</span>,
    sub: "Kontinuitas Suplai Pasar",
    border: "border-emerald-500/20",
    color: "text-emerald-600",
  },
];

export default function Dampak({ showCTA = false }: { showCTA?: boolean }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 } as const,
    },
  };

  return (
    <section
      id="dampak"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background design */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-young-rice/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-deep-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
            Dampak & Hasil Nyata
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
            Metrik Dampak Sosial-Ekonomi
          </h2>
          <p className="mt-4 text-base md:text-lg text-deep-forest/80">
            Validasi konsep SANTARA menunjukkan efisiensi sumber daya maksimal demi kedaulatan pangan jangka panjang.
          </p>
        </div>

        {/* Impact cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-center"
        >
          {impacts.map((imp) => {
            const Icon = imp.icon;
            return (
              <motion.div
                key={imp.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`glass-card p-8 rounded-[32px] border ${imp.border} shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center relative overflow-hidden group`}
              >
                {/* Background glow hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-deep-forest" />
                
                <div className="flex flex-col items-center">
                  <div className={`p-3.5 rounded-xl bg-deep-forest/5 ${imp.color} mb-6 shadow-inner group-hover:bg-deep-forest group-hover:text-white transition-colors duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-bold text-sm text-deep-forest/60 uppercase tracking-widest mb-1.5">
                    {imp.title}
                  </h3>
                  
                  <div className="font-display font-black text-4xl md:text-5xl text-deep-forest tracking-tighter my-4">
                    {imp.element}
                  </div>
                  
                  <span className="text-[10px] font-bold text-deep-forest/50 uppercase tracking-wider block mb-4">
                    {imp.sub}
                  </span>

                  <p className="text-xs text-deep-forest/75 leading-relaxed">
                    {imp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {showCTA && (
          <div className="mt-16 text-center">
            <Link
              href="/dampak"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-forest text-ivory-rice hover:bg-deep-forest/90 transition-all shadow-md"
            >
              Lihat Roadmap 2045 & Galeri Foto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
