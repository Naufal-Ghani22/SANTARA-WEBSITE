"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// 6 Premium Indonesian Rice seedling varieties focusing strictly on Penyemaian Padi (Rice Nursery)
const commodities = [
  {
    name: "Padi Pandan Wangi",
    category: "Aromatic Rice",
    desc: "Varietas lokal unggulan Jawa Barat terkenal aroma pandan khas. Suhu persemaian dipelihara presisi pada 30°C untuk merangsang sintesis senyawa aromatik 2-AP yang optimal.",
    image: "/images/crops/pandan_wangi.png",
    stat: "Kecambah Hidup 99.2%",
    successRate: "97%",
  },
  {
    name: "Padi Mentik Susu",
    category: "Premium Rice",
    desc: "Varietas beras putih premium lokal bertekstur pulen mirip ketan. Lingkungan mikroklimat presisi menjaga bibit dari jamur патоген selama fase kecambah 10 hari.",
    image: "/images/crops/mentik_susu.png",
    stat: "Persemaian 10 Hari",
    successRate: "96%",
  },
  {
    name: "Padi Ciherang",
    category: "High Yield Variety",
    desc: "Varietas unggul nasional yang paling banyak dibudidayakan. Persemaian terkontrol di dalam modul SANTARA meningkatkan ketahanan vigor bibit terhadap serangan hama wereng.",
    image: "/images/crops/ciherang.png",
    stat: "Vigor Bibit Unggul",
    successRate: "98%",
  },
  {
    name: "Padi Inpari 32",
    category: "Improved Variety",
    desc: "Varietas inbrida irigasi tahan penyakit hawar daun bakteri. Persemaian presisi mempercepat tumbuhnya perakaran serabut yang kuat sebelum bibit dipindahkan ke sawah.",
    image: "/images/crops/inpari_32.png",
    stat: "Akar Kuat Serabut",
    successRate: "98%",
  },
  {
    name: "Padi Rojolele",
    category: "Heritage Rice",
    desc: "Beras tradisional legendaris Jawa Tengah berkarakter pulen wangi. Pengabutan mikro mist presisi menjaga kelembaban relatif media agar anakan tumbuh seragam.",
    image: "/images/crops/rojolele.png",
    stat: "Tinggi Daun Seragam",
    successRate: "95%",
  },
  {
    name: "Padi Merah Cianjur",
    category: "Nutritious Rice",
    desc: "Varietas padi merah premium kaya zat besi dan serat. Modul nutrisi terintegrasi mempercepat penyerapan zat hara oleh embrio benih selama fase berkecambah.",
    image: "/images/crops/merah_cianjur.png",
    stat: "Daya Kecambah Tinggi",
    successRate: "95%",
  },
];

export default function Komoditas() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 } as const,
    },
  };

  return (
    <section
      id="komoditas"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(5,78,0,0.015)_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
            Varietas Persemaian Padi
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
            Varietas Penyemaian Padi Unggul
          </h2>
          <p className="mt-4 text-base md:text-lg text-deep-forest/80">
            SANTARA dikalibrasi presisi untuk menyokong pembibitan padi unggul Nusantara, menjamin perkecambahan maksimal dan ketahanan bibit sebelum masa pindah tanam.
          </p>
        </div>

        {/* Commodities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
        >
          {commodities.map((crop) => (
            <motion.div
              key={crop.name}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="glass-card rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-deep-forest/5 flex flex-col justify-between h-[420px] transition-all duration-300 group"
            >
              {/* Crop Image container */}
              <div className="relative h-48 w-full overflow-hidden bg-deep-forest/5">
                <Image
                  src={crop.image}
                  alt={crop.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, 30vw"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                
                {/* Badges on image */}
                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-deep-forest text-ivory-rice px-2.5 py-1 rounded-md border border-white/10 shadow-md">
                  {crop.category}
                </span>

                <div className="absolute bottom-4 left-4 right-4 flex flex-col drop-shadow-md text-white">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-young-rice">
                    Persemaian Efektif
                  </span>
                  <span className="font-display font-bold text-sm text-white flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-young-rice animate-pulse" />
                    12–14 Hari
                  </span>
                  <span className="text-[8px] font-semibold text-white/80 mt-0.5 leading-tight max-w-[90%]">
                    Bibit siap pindah tanam dalam kondisi greenhouse terkontrol SANTARA.
                  </span>
                </div>
              </div>

              {/* Crop Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-deep-forest group-hover:text-deep-forest/90 flex items-center justify-between">
                    {crop.name}
                    <ArrowUpRight className="w-4 h-4 text-deep-forest/40 group-hover:text-deep-forest group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-deep-forest/75 mt-3 leading-relaxed">
                    {crop.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-deep-forest/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-deep-forest/50">
                  <span>Tingkat Keberhasilan</span>
                  <span className="font-extrabold text-deep-forest">{crop.successRate}</span>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
