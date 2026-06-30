"use client";

import { motion } from "framer-motion";
import { 
  Network, Brain, Zap, HelpCircle, 
  Thermometer, Droplet, FlaskConical, Gauge, Wind,
  LineChart, ScanFace, BarChart4, ClipboardList,
  Sun, BatteryMedium,
  Droplets, Fan, Lightbulb
} from "lucide-react";

const ecosystem = [
  {
    title: "IoT Layer",
    subtitle: "Telemetri & Sensor Sinyal Fisik",
    icon: Network,
    desc: "Mengumpulkan parameter mikroklimat tanah dan udara secara terus-menerus melalui jaringan sensor nirkabel berdaya rendah.",
    color: "border-blue-500/20 text-blue-600",
    badgeBg: "bg-blue-500/10",
    items: [
      { name: "Temperature", icon: Thermometer, desc: "Suhu udara" },
      { name: "Humidity", icon: Droplet, desc: "Kelembaban udara" },
      { name: "pH Sensor", icon: FlaskConical, desc: "Kadar keasaman tanah/air" },
      { name: "NPK Sensor", icon: Gauge, desc: "Nitrogen, Fosfor, Kalium tanah" },
      { name: "CO₂ Level", icon: Wind, desc: "Kadar karbon dioksida" },
    ],
  },
  {
    title: "AI Layer",
    subtitle: "Komputasi Model Kognitif",
    icon: Brain,
    desc: "Menganalisis pola telemetri dengan machine learning lokal (edge) dan awan untuk menghasilkan prediksi cerdas.",
    color: "border-purple-500/20 text-purple-600",
    badgeBg: "bg-purple-500/10",
    items: [
      { name: "Forecasting", icon: LineChart, desc: "Prediksi cuaca lokal" },
      { name: "Disease Detection", icon: ScanFace, desc: "Deteksi stres & patogen daun" },
      { name: "Yield Prediction", icon: BarChart4, desc: "Estimasi volume hasil panen" },
      { name: "Nutrient Optimization", icon: ClipboardList, desc: "Formulasi komposisi pupuk" },
    ],
  },
  {
    title: "Energy Layer",
    subtitle: "Kelistrikan Mandiri & Hijau",
    icon: Zap,
    desc: "Menjamin keberlangsungan hidup kelistrikan greenhouse secara mandiri dari sumber daya terbarukan tanpa emisi karbon.",
    color: "border-amber-500/20 text-amber-600",
    badgeBg: "bg-amber-500/10",
    items: [
      { name: "Solar Panel", icon: Sun, desc: "Konversi fotovoltaik solar" },
      { name: "Battery Storage", icon: BatteryMedium, desc: "Penyimpanan daya LiFePO4" },
    ],
  },
  {
    title: "Automation Layer",
    subtitle: "Aktuator & Mekanisasi Fisik",
    icon: HelpCircle,
    desc: "Mengeksekusi perintah digital dari modul AI secara mekanis untuk menyesuaikan lingkungan ideal tanaman.",
    color: "border-emerald-500/20 text-emerald-600",
    badgeBg: "bg-emerald-500/10",
    items: [
      { name: "Irrigation", icon: Droplets, desc: "Pompa penyiraman NFT/Drip" },
      { name: "Ventilation", icon: Fan, desc: "Kipas exhaust & blower" },
      { name: "Lighting", icon: Lightbulb, desc: "Intensitas cahaya LED" },
    ],
  },
];

export default function TechEcosystem() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 14 } as const,
    },
  };

  return (
    <section
      id="tech-ecosystem"
      className="py-24 md:py-32 bg-gradient-to-b from-white to-ivory-rice relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,78,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,78,0,0.01)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
            Integrasi Multi-Disiplin
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
            Ekosistem Teknologi Terintegrasi
          </h2>
          <p className="mt-4 text-base md:text-lg text-deep-forest/80">
            SANTARA menyatukan empat pilar teknologi mutakhir untuk mewujudkan pertanian presisi yang berkelanjutan.
          </p>
        </div>

        {/* Ecosystem Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {ecosystem.map((layer) => {
            const LayerIcon = layer.icon;
            return (
              <motion.div
                key={layer.title}
                variants={cardVariants}
                className="glass-card p-8 rounded-3xl border border-deep-forest/10 hover:border-deep-forest/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Layer Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3.5 rounded-2xl ${layer.badgeBg} ${layer.color} border border-current/10 shadow-inner`}>
                      <LayerIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-deep-forest">
                        {layer.title}
                      </h3>
                      <p className="text-xs text-deep-forest/60 font-semibold uppercase tracking-wider mt-0.5">
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-deep-forest/80 leading-relaxed mb-8">
                    {layer.desc}
                  </p>
                </div>

                {/* Sub-items list (Pills) */}
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-deep-forest/50 mb-3.5">
                    Komponen Arsitektur:
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {layer.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-deep-forest/[0.03] hover:bg-young-rice/20 border border-deep-forest/5 text-deep-forest transition-colors cursor-default group"
                          title={item.desc}
                        >
                          <ItemIcon className="w-4 h-4 text-deep-forest/70 group-hover:scale-110 transition-transform duration-200" />
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold leading-tight">
                              {item.name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
