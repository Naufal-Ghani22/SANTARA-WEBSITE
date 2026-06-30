"use client";

import { motion } from "framer-motion";
import { TrendingDown, ShieldAlert, CloudLightning, Droplets, Shuffle } from "lucide-react";

const problems = [
  {
    icon: ShieldAlert,
    stat: "35%",
    title: "Bibit Gagal Tumbuh",
    desc: "Metode pembibitan tradisional memiliki rasio kegagalan tinggi akibat paparan patogen bebas, hama, dan cuaca tidak menentu.",
    badge: "Kualitas Rendah",
    color: "from-red-500/20 to-red-700/20",
    border: "border-red-500/25",
  },
  {
    icon: CloudLightning,
    stat: "Rp4,8 T",
    title: "Ketergantungan Cuaca",
    desc: "Perubahan iklim global ekstrem menyebabkan gagal panen massal akibat banjir bandang maupun kekeringan berkepanjangan.",
    badge: "Kerugian Nasional",
    color: "from-orange-500/20 to-orange-700/20",
    border: "border-orange-500/25",
  },
  {
    icon: Droplets,
    stat: "70%",
    title: "Pemborosan Air",
    desc: "Metode pengairan tradisional memboroskan air secara masif tanpa pengukuran presisi terhadap kebutuhan aktual tanaman.",
    badge: "Krisis Air",
    color: "from-blue-500/20 to-blue-700/20",
    border: "border-blue-500/25",
  },
];

export default function ProblemSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 } as const,
    },
  };

  return (
    <section
      id="problem"
      className="relative py-24 md:py-32 bg-gradient-to-b from-ivory-rice to-white overflow-hidden"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,78,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,78,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full"
          >
            Tantangan Sektor Agraria
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight"
          >
            Mengapa Pertanian Indonesia Membutuhkan Transformasi?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-deep-forest/80"
          >
            Metode tradisional tak lagi cukup menopang laju populasi. Kita membutuhkan presisi teknologi untuk menyelamatkan pangan masa depan.
          </motion.p>
        </div>

        {/* Problems Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
        >
          {problems.map((prob, idx) => {
            const IconComponent = prob.icon;
            return (
              <motion.div
                key={prob.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-8 rounded-[32px] flex flex-col justify-between h-full shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Gradient background hover effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prob.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-xl bg-deep-forest/5 text-deep-forest group-hover:bg-deep-forest group-hover:text-ivory-rice transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-deep-forest/5 text-deep-forest">
                      {prob.badge}
                    </span>
                  </div>

                  <span className="font-display font-black text-4xl lg:text-5xl text-deep-forest/90 tracking-tight block mb-2">
                    {prob.stat}
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-deep-forest mb-3">
                    {prob.title}
                  </h3>
                  <p className="text-sm text-deep-forest/75 leading-relaxed">
                    {prob.desc}
                  </p>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${prob.color}`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
