"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio, Cpu, Cloud, BarChart3, HelpCircle, ToggleLeft, CheckCircle2, ChevronRight, ChevronDown } from "lucide-react";

const steps = [
  {
    id: 1,
    name: "Sensor",
    desc: "Membaca kondisi mikroklimat tanah & udara secara real-time.",
    icon: Radio,
    details: "Sensor IoT membaca parameter kritis seperti kadar NPK tanah, pH, kelembaban, intensitas cahaya, dan CO2 secara kontinu.",
  },
  {
    id: 2,
    name: "Edge Device",
    desc: "Memproses & mengirimkan data terenkripsi.",
    icon: Cpu,
    details: "Modul mikrokontroler lokal menyaring noise data telemetri, lalu memancarkannya ke gateway terdekat.",
  },
  {
    id: 3,
    name: "Cloud AI",
    desc: "Menerima & mensinkronisasi basis data pusat.",
    icon: Cloud,
    details: "Server awan terdistribusi menyimpan riwayat telemetri secara terstruktur dan siap diproses oleh model AI.",
  },
  {
    id: 4,
    name: "Analisis",
    desc: "Mengevaluasi data terhadap profil tanaman.",
    icon: BarChart3,
    details: "Algoritma machine learning menganalisis penyimpangan kondisi aktual dengan standar pertumbuhan varietas bibit.",
  },
  {
    id: 5,
    name: "Rekomendasi",
    desc: "Menghasilkan instruksi tindakan spesifik.",
    icon: HelpCircle,
    details: "Sistem mengeluarkan instruksi presisi (contoh: aktifkan irigasi 200ml, tingkatkan intensitas LED 15%).",
  },
  {
    id: 6,
    name: "Aktuator",
    desc: "Mengeksekusi perintah secara fisik di unit.",
    icon: ToggleLeft,
    details: "Relay kelistrikan memicu pompa nutrisi, motor pembuka jendela ventilasi, atau lampu grow light menyala.",
  },
  {
    id: 7,
    name: "Tanaman Optimal",
    desc: "Persemai bibit tumbuh seragam & sehat.",
    icon: CheckCircle2,
    details: "Bibit terhindar dari stres pertumbuhan, mempercepat masa panen hingga 30% dengan nutrisi maksimal.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  // Auto-advance steps to simulate real-time data flow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === steps.length ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,78,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,78,0,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
            Alur Sinkronisasi Data
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
            Bagaimana SANTARA Bekerja?
          </h2>
          <p className="mt-4 text-base md:text-lg text-deep-forest/80">
            Sistem bekerja secara sirkular nonstop, menghubungkan telemetri lapangan dengan kecerdasan komputasi awan.
          </p>
        </div>

        {/* Desktop Interactive Step Row */}
        <div className="hidden lg:flex items-center justify-between relative mb-16 px-4">
          {/* Connector Line behind steps */}
          <div className="absolute top-[34px] left-[5%] right-[5%] h-1 bg-deep-forest/10 z-0" />

          {/* Running Neon Indicator Line */}
          <motion.div 
            className="absolute top-[34px] left-[5%] h-1 bg-gradient-to-r from-deep-forest to-young-rice z-0 origin-left"
            initial={{ width: "0%" }}
            animate={{ width: `${((activeStep - 1) / (steps.length - 1)) * 90}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;

            return (
              <div key={step.id} className="flex flex-col items-center w-[12%] text-center relative">
                {/* Step Circle */}
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10 ${
                    isActive
                      ? "bg-deep-forest border-deep-forest text-young-rice scale-110 shadow-lg"
                      : isCompleted
                      ? "bg-[#f0f6cc] border-deep-forest text-deep-forest"
                      : "bg-white border-deep-forest/20 text-deep-forest/40 hover:border-deep-forest/50 hover:text-deep-forest"
                  }`}
                >
                  <Icon className="w-6 h-6" />

                  {/* Active pulses */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border-2 border-young-rice animate-ping opacity-60" />
                  )}
                </button>

                {/* Step Name */}
                <span className={`mt-4 font-display font-extrabold text-sm ${isActive ? "text-deep-forest" : "text-deep-forest/60"}`}>
                  {step.name}
                </span>

                {/* Flow Arrow (except last) */}
                {idx < steps.length - 1 && (
                  <div className="absolute top-8 left-[75%] translate-x-1.5 text-deep-forest/30 pointer-events-none">
                    <ChevronRight className="w-5 h-5 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Step List */}
        <div className="lg:hidden flex flex-col gap-4 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? "bg-deep-forest border-deep-forest text-ivory-rice shadow-lg"
                      : "glass-card border-deep-forest/5 text-deep-forest"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl ${
                      isActive ? "bg-young-rice text-deep-forest" : "bg-deep-forest/5 text-deep-forest"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-display font-extrabold text-sm">
                        Step {step.id}: {step.name}
                      </span>
                      <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                        isActive ? "bg-young-rice/35 text-white" : "bg-deep-forest/5 text-deep-forest/60"
                      }`}>
                        {isActive ? "Aktif" : "Menunggu"}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 leading-snug ${isActive ? "text-ivory-rice/80" : "text-deep-forest/60"}`}>
                      {step.desc}
                    </p>
                  </div>
                </button>

                {idx < steps.length - 1 && (
                  <div className="my-1.5 text-deep-forest/30">
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Explanation Panel */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-deep-forest to-[#033300] text-ivory-rice shadow-2xl relative overflow-hidden border border-young-rice/20"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-young-rice/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              {/* Step number large badge */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-young-rice/25 flex items-center justify-center font-display font-black text-3xl md:text-4xl text-young-rice border border-young-rice/30 shrink-0">
                0{steps[activeStep - 1].id}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white">
                    {steps[activeStep - 1].name}
                  </h3>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-young-rice text-deep-forest shadow">
                    PROSES TELEMETRI
                  </span>
                </div>
                <p className="text-young-rice/90 font-medium text-sm md:text-base mb-4 italic">
                  "{steps[activeStep - 1].desc}"
                </p>
                <p className="text-ivory-rice/80 leading-relaxed text-sm md:text-base font-normal">
                  {steps[activeStep - 1].details}
                </p>
              </div>
            </div>

            {/* Glowing bottom line */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-young-rice" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
