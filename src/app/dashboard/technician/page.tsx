"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSimulation } from "@/context/SimulationContext";
import { 
  Cpu, Battery, Sun, Wifi, Settings, RefreshCw, 
  LogOut, ArrowLeft, Terminal, Sliders, ToggleLeft, ToggleRight, 
  CheckCircle, Play, ShieldAlert, Thermometer, Droplets
} from "lucide-react";
import { motion } from "framer-motion";

export default function TechnicianDashboard() {
  const router = useRouter();
  const {
    temp,
    humidity,
    moisture,
    ph,
    battery,
    solarInput,
    fanActive,
    ledActive,
    pumpActive,
    loraSignal,
    aiAccuracy,
    logs,
    toggleFan,
    calibrateSensors,
    adjustTargetMoisture,
    efficiency,
  } = useSimulation();

  const [sliderVal, setSliderVal] = useState(85);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setSliderVal(val);
    adjustTargetMoisture(val);
  };

  const handleLogout = () => {
    localStorage.removeItem("santara_role");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-ivory-rice py-8 px-4 md:px-8 flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-7xl mx-auto">
      
      {/* LEFT: Simulation Information & Role Switching Portal */}
      <div className="flex-1 flex flex-col justify-between p-6 bg-white rounded-3xl border border-deep-forest/5 shadow-lg max-w-md">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c0392b] bg-red-500/10 px-3 py-1 rounded-full">
            KONTROL DIAGNOSTIK HARDWARE
          </span>
          <h2 className="font-display font-black text-3xl text-deep-forest mt-4 tracking-tight leading-tight">
            Dashboard Teknisi
          </h2>
          <p className="text-sm text-deep-forest/70 mt-3 leading-relaxed">
            Selamat datang di panel Agri Technician. Di sini Anda memantau kesehatan IoT Node, mengalibrasi sensor tanah analog, dan memantau status daya solar panel.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex gap-3 items-start text-xs font-semibold text-deep-forest/80 bg-ivory-rice p-4 rounded-xl">
              <Thermometer className="w-5 h-5 text-deep-forest shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-deep-forest mb-0.5">Simulasi Kipas Ventilasi</span>
                Jika Anda menonaktifkan kipas ventilasi di samping, suhu ruangan dan tingkat CO2 di dalam greenhouse akan naik secara perlahan.
              </div>
            </div>
            <div className="flex gap-3 items-start text-xs font-semibold text-deep-forest/80 bg-ivory-rice p-4 rounded-xl">
              <Sliders className="w-5 h-5 text-deep-forest shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-deep-forest mb-0.5">Threshold Target Kelembaban</span>
                Gunakan slider kontrol di samping untuk merubah target kelembaban tanah yang dikontrol oleh kecerdasan buatan (AI) Edge.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-deep-forest/5 space-y-3">
          <button
            onClick={() => router.push("/dashboard/petani")}
            className="w-full py-4 px-6 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-forest text-ivory-rice hover:bg-deep-forest/90 transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Masuk Sebagai Petani
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full py-4 px-6 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-deep-forest/10 hover:border-deep-forest/20 text-deep-forest/70 hover:text-deep-forest transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Ganti Akun / Keluar
          </button>
        </div>
      </div>

      {/* RIGHT: Advanced Control Panel Console for Technician */}
      <div className="flex-[2] bg-white rounded-3xl p-6 md:p-8 border border-deep-forest/5 shadow-lg flex flex-col justify-between">
        
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-deep-forest/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-deep-forest text-golden-paddy flex items-center justify-center shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-black text-xl text-deep-forest leading-tight">SANTARA Edge Gateway</h3>
                <span className="text-[10px] text-deep-forest/50 font-bold uppercase tracking-widest mt-0.5 block">Koneksi: LoRaWAN Desa Wonorejo</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={calibrateSensors}
                className="py-2.5 px-4 rounded-full bg-young-rice text-deep-forest hover:bg-young-rice/90 transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Kalibrasi Sensor
              </button>
            </div>
          </div>

          {/* Grid: Health Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            
            {/* Battery */}
            <div className="bg-ivory-rice p-4 rounded-2xl border border-deep-forest/5 relative">
              <div className="flex justify-between items-center text-deep-forest/50">
                <Battery className="w-5 h-5 text-deep-forest" />
                <span className="text-[9px] font-bold uppercase">Baterai</span>
              </div>
              <span className="font-display font-black text-2xl text-deep-forest block mt-3">{battery}%</span>
              <span className="text-[8px] text-[#008000] font-bold uppercase block mt-1">Solar charging</span>
            </div>

            {/* Solar input */}
            <div className="bg-ivory-rice p-4 rounded-2xl border border-deep-forest/5 relative">
              <div className="flex justify-between items-center text-deep-forest/50">
                <Sun className="w-5 h-5 text-deep-forest" />
                <span className="text-[9px] font-bold uppercase">Solar Input</span>
              </div>
              <span className="font-display font-black text-2xl text-deep-forest block mt-3">{solarInput} W</span>
              <span className="text-[8px] text-deep-forest/50 font-bold uppercase block mt-1">Direct radiation</span>
            </div>

            {/* LoRa Signal */}
            <div className="bg-ivory-rice p-4 rounded-2xl border border-deep-forest/5 relative">
              <div className="flex justify-between items-center text-deep-forest/50">
                <Wifi className="w-5 h-5 text-deep-forest" />
                <span className="text-[9px] font-bold uppercase">LoRa Signal</span>
              </div>
              <span className="font-display font-black text-2xl text-deep-forest block mt-3">{loraSignal} dBm</span>
              <span className="text-[8px] text-[#008000] font-bold uppercase block mt-1">Koneksi Stabil</span>
            </div>

            {/* AI Accuracy */}
            <div className="bg-ivory-rice p-4 rounded-2xl border border-deep-forest/5 relative">
              <div className="flex justify-between items-center text-deep-forest/50">
                <Cpu className="w-5 h-5 text-deep-forest" />
                <span className="text-[9px] font-bold uppercase">AI Accuracy</span>
              </div>
              <span className="font-display font-black text-2xl text-deep-forest block mt-3">{aiAccuracy}%</span>
              <span className="text-[8px] text-deep-forest/50 font-bold uppercase block mt-1">Edge Model v2.1</span>
            </div>

          </div>

          {/* Section: Actuator Control & Calibrations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            
            {/* Actuators Overrides */}
            <div className="bg-ivory-rice/50 p-5 rounded-2xl border border-deep-forest/5 space-y-4">
              <h4 className="font-display font-bold text-sm text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-deep-forest" />
                Actuator Override Controls
              </h4>

              {/* Fan */}
              <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-deep-forest/5 shadow-sm">
                <div>
                  <span className="font-bold text-xs text-deep-forest block">Kipas Ventilasi (Sirkulasi)</span>
                  <span className="text-[9px] text-deep-forest/50 font-medium">Pengaturan sirkulasi udara greenhouse</span>
                </div>
                <button 
                  onClick={toggleFan}
                  className="text-deep-forest cursor-pointer"
                >
                  {fanActive ? (
                    <ToggleRight className="w-10 h-10 text-[#008000]" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-deep-forest/30" />
                  )}
                </button>
              </div>

              {/* Pump Status */}
              <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-deep-forest/5 shadow-sm">
                <div>
                  <span className="font-bold text-xs text-deep-forest block">Pompa Irigasi NFT</span>
                  <span className="text-[9px] text-deep-forest/50 font-medium">Status pompa air nutrisi di bawah rak</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                  pumpActive ? "bg-young-rice/20 text-[#008000] animate-pulse" : "bg-deep-forest/5 text-deep-forest/40"
                }`}>
                  {pumpActive ? "MENYIRAM" : "MATI"}
                </span>
              </div>
            </div>

            {/* AI Control Calibrations */}
            <div className="bg-ivory-rice/50 p-5 rounded-2xl border border-deep-forest/5 flex flex-col justify-between gap-4">
              <div>
                <h4 className="font-display font-bold text-sm text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-deep-forest" />
                  AI Target Moisture Calibration
                </h4>
                <p className="text-[10px] text-deep-forest/60 mt-1 leading-relaxed">
                  Tentukan target tingkat kelembaban optimal tanah. Jika nilai jatuh di bawah target, modul AI Edge akan memerintahkan pompa NFT untuk menyiram air secara otomatis.
                </p>
              </div>

              <div className="space-y-2 bg-white p-4 rounded-xl border border-deep-forest/5 shadow-sm">
                <div className="flex justify-between text-xs font-bold text-deep-forest">
                  <span>Target Kelembaban:</span>
                  <span className="text-[#008000]">{sliderVal}% RH</span>
                </div>
                <input 
                  type="range" 
                  min="60" 
                  max="95" 
                  value={sliderVal} 
                  onChange={handleSliderChange}
                  className="w-full accent-deep-forest h-1.5 bg-deep-forest/10 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-deep-forest/40 font-bold uppercase">
                  <span>Min (60%)</span>
                  <span>Max (95%)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Section: Live Terminal Logs */}
        <div className="mt-6 pt-6 border-t border-deep-forest/5 flex-1 flex flex-col gap-3">
          <h4 className="font-display font-bold text-sm text-deep-forest uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-deep-forest" />
            Live System Log Terminal
          </h4>
          
          <div className="flex-1 bg-black text-[#00ff00] p-4 rounded-2xl font-mono text-[10px] leading-relaxed shadow-inner max-h-[180px] overflow-y-auto space-y-1.5 border border-white/5">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-2">
                <span className="text-white/40">[{log.time}]</span>
                <span className={`uppercase font-bold shrink-0 ${
                  log.role === "Petani" 
                    ? "text-[#00ff00]" 
                    : log.role === "Teknisi"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}>
                  {log.role}:
                </span>
                <span className="text-white/95">{log.message}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
