"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = [
  "Semua",
  "Pembibitan Padi",
  "Greenhouse",
  "Sensor",
  "Solar Panel",
  "Implementasi Desa",
  "Monitoring App",
];

const galleryItems = [
  {
    id: 1,
    title: "Semai Padi Unggul S-2",
    category: "Pembibitan Padi",
    image: "/images/gallery/pembibitan_padi.png",
    aspect: "aspect-square",
  },
  {
    id: 2,
    title: "Instalasi S-3 Komunal Jawa Barat",
    category: "Greenhouse",
    image: "/images/gallery/greenhouse_santara_padi.png",
    aspect: "aspect-video",
  },
  {
    id: 3,
    title: "Node Telemetri NPK & pH Ground",
    category: "Sensor",
    image: "/images/gallery/sensor_padi.png",
    aspect: "aspect-[3/4]",
  },
  {
    id: 4,
    title: "Monokristalin Roof Solar Cell 1.2kW",
    category: "Solar Panel",
    image: "/images/gallery/solar_panel.png",
    aspect: "aspect-square",
  },
  {
    id: 5,
    title: "Cluster Unit Desa Sukatani",
    category: "Implementasi Desa",
    image: "/images/gallery/implementasi_padi.png",
    aspect: "aspect-video",
  },
  {
    id: 6,
    title: "Antarmuka Dashboard Seluler AI",
    category: "Monitoring App",
    image: "/images/gallery/monitoring_padi.png",
    aspect: "aspect-[9/16]",
  },
  {
    id: 7,
    title: "Rapat Akar Semai Unggul 14 Hari",
    category: "Pembibitan Padi",
    image: "/images/gallery/semai_akar_padi.png",
    aspect: "aspect-[4/5]",
  },
  {
    id: 8,
    title: "Interior Persemaian NFT Padi",
    category: "Greenhouse",
    image: "/images/gallery/interior_padi.png",
    aspect: "aspect-square",
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState("Semua");

  const filteredItems =
    filter === "Semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <section
      id="gallery"
      className="py-24 md:py-32 bg-gradient-to-b from-white to-ivory-rice relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(5,78,0,0.015)_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
            Dokumentasi & Portofolio
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
            Galeri Galaksi SANTARA
          </h2>
          <p className="mt-4 text-base md:text-lg text-deep-forest/80">
            Kumpulan dokumentasi implementasi perangkat keras, antarmuka perangkat lunak, dan peninjauan langsung hasil panen di lapangan.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === cat
                  ? "bg-deep-forest text-ivory-rice shadow-lg"
                  : "bg-deep-forest/[0.03] text-deep-forest/70 hover:bg-deep-forest/10 hover:text-deep-forest"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid using Tailwind Columns */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`break-inside-avoid relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-deep-forest/5 group cursor-pointer bg-deep-forest/5 ${item.aspect}`}
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, 30vw"
                />

                {/* Glass Hover Card Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-young-rice bg-white/10 px-2 py-0.5 rounded border border-white/5 self-start mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-display font-extrabold text-sm md:text-base text-white leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Basic label when not hovered for mobile readability */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1 pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
                  <span className="text-[8px] font-black uppercase tracking-widest text-young-rice bg-deep-forest/85 backdrop-blur px-2 py-0.5 rounded self-start border border-white/5">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
