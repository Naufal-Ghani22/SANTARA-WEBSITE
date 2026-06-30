"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSimulation } from "@/context/SimulationContext";
import { 
  Search, Droplets, Sun, Wind, ChevronDown, 
  RefreshCw, LogOut, ArrowRight, Home, Calendar, 
  History, User, Activity, AlertTriangle, CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PetaniDashboard() {
  const router = useRouter();
  const {
    temp,
    humidity,
    light,
    co2,
    moisture,
    ph,
    waterUsage,
    laborUtilization,
    equipmentIdle,
    efficiency,
    logs,
    waterCrops,
    fertilizeCrops,
    toggleLed,
    ledActive,
    pumpActive,
    activeAlert,
    triggerMoistureAlert,
    resolveAlert,
    ignoreAlert,
    toggleMist,
    toggleFan,
    fanActive,
    mistActive,
  } = useSimulation();

  // Selected tab in mobile mockup bottom nav
  const [activeTab, setActiveTab] = useState<"beranda" | "kebun" | "rekomendasi" | "riwayat" | "profile">("beranda");

  // Interactive Kebun/Desa selection dropdown states
  const [selectedKebun, setSelectedKebun] = useState("Kebun 1");
  const [selectedDesa, setSelectedDesa] = useState("Desa Wonorejo");
  const [kebunDropdownOpen, setKebunDropdownOpen] = useState(false);
  const [desaDropdownOpen, setDesaDropdownOpen] = useState(false);

  // Dynamic offset calculations based on selected Kebun & Desa
  const getDisplayData = () => {
    let tempOffset = 0;
    let humOffset = 0;
    let lightOffset = 0;
    let co2Offset = 0;
    let moistOffset = 0;
    let phOffset = 0;

    // Apply offsets based on Kebun selection
    if (selectedKebun === "Kebun 2") {
      tempOffset += 1.2;
      humOffset -= 4;
      lightOffset += 1500;
      co2Offset -= 40;
      moistOffset -= 3;
      phOffset += 0.2;
    } else if (selectedKebun === "Kebun 3") {
      tempOffset -= 0.8;
      humOffset += 3;
      lightOffset -= 2200;
      co2Offset += 35;
      moistOffset += 2;
      phOffset -= 0.15;
    }

    // Apply offsets based on Desa selection
    if (selectedDesa === "Desa Sukatani") {
      tempOffset += 0.5;
      humOffset += 2;
      lightOffset += 800;
      co2Offset += 15;
      moistOffset += 1;
      phOffset -= 0.1;
    } else if (selectedDesa === "Desa Sukamaju") {
      tempOffset -= 0.4;
      humOffset -= 3;
      lightOffset -= 1200;
      co2Offset -= 25;
      moistOffset -= 2;
      phOffset += 0.1;
    }

    // Calculated final values
    const displayTemp = (temp + tempOffset).toFixed(1);
    const displayHumidity = Math.max(10, Math.min(100, humidity + humOffset));
    const displayLight = Math.max(100, light + lightOffset);
    const displayCO2 = Math.max(200, co2 + co2Offset);
    
    // Moisture is critical under alert. Don't add offset if alert is active to preserve simulation red status
    const displayMoisture = activeAlert !== null 
      ? moisture 
      : Math.max(10, Math.min(100, moisture + moistOffset));
      
    const displayPh = (ph + phOffset).toFixed(1);

    return {
      temp: displayTemp,
      humidity: displayHumidity,
      light: displayLight,
      co2: displayCO2,
      moisture: displayMoisture,
      ph: displayPh
    };
  };

  const displayData = getDisplayData();

  // Mock commodities list for "Kebun" tab
  const cropsData = [
    { id: 1, name: "Padi Unggul Nusantara", stage: "Persemaian (12 Hari)", progress: 40, status: "Optimal" },
    { id: 2, name: "Cabe Rawit Merah", stage: "Pembungaan (45 Hari)", progress: 75, status: "Butuh Air" },
    { id: 3, name: "Selada Keriting", stage: "Siap Panen", progress: 100, status: "Siap Panen" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("santara_role");
    router.push("/login");
  };

  const getDayName = () => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const d = new Date();
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-ivory-rice py-8 px-4 md:px-8 flex flex-col lg:flex-row justify-center items-stretch gap-8 max-w-7xl mx-auto">
      
      {/* LEFT: Simulation Information & Role Switching Portal */}
      <div className="flex-1 flex flex-col justify-between p-6 bg-white rounded-3xl border border-deep-forest/5 shadow-lg max-w-md">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-deep-forest bg-young-rice/25 px-3 py-1 rounded-full">
            Simulasi Role-Play SANTARA
          </span>
          <h2 className="font-display font-black text-3xl text-deep-forest mt-4 tracking-tight leading-tight">
            Dashboard Petani
          </h2>
          <p className="text-sm text-deep-forest/70 mt-3 leading-relaxed">
            Selamat datang di portal kontrol petani. Di sini Anda mengelola operasi harian kebun, mengaktifkan penyiraman, memantau nutrisi tanah, dan mengoptimalkan efisiensi panen.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex gap-3 items-start text-xs font-semibold text-deep-forest/80 bg-ivory-rice p-4 rounded-xl">
              <Activity className="w-5 h-5 text-deep-forest shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-deep-forest mb-0.5">Operasi Terintegrasi</span>
                Setiap aksi penyiraman atau pemberian pupuk akan langsung dicatat ke Log Sistem dan dibaca oleh **Agri Technician** secara real-time.
              </div>
            </div>
            <div className="flex gap-3 items-start text-xs font-semibold text-deep-forest/80 bg-ivory-rice p-4 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-deep-forest shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-deep-forest mb-0.5">Siklus Otomatis IoT</span>
                Teknisi dapat mengalibrasi sensor Anda dari dasbor mereka jika sensor mengalami deviasi.
              </div>
            </div>

            {/* Simulation Controls Panel */}
            <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex flex-col gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c0392b] block">
                Panel Pengujian Simulasi
              </span>
              <p className="text-[11px] text-deep-forest/70 font-medium">
                Simulasikan masalah kekeringan kritis untuk memunculkan status merah dan peringatan pada tab Rekomendasi di bawah.
              </p>
              <button
                onClick={triggerMoistureAlert}
                disabled={activeAlert !== null}
                className="py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#c0392b] hover:bg-[#c0392b]/95 text-white transition-all shadow-md text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simulasikan Masalah (Kekeringan)
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-deep-forest/5 space-y-3">
          <button
            onClick={() => router.push("/dashboard/technician")}
            className="w-full py-4 px-6 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-forest text-ivory-rice hover:bg-deep-forest/90 transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            Masuk Sebagai Teknisi
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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

      {/* RIGHT: Beautiful Mobile Mockup Frame rendering the exact UI from the screenshot */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-[420px] aspect-[9/19] min-h-[750px] md:min-h-[820px] bg-[#f7f6f2] rounded-[48px] border-[12px] border-black shadow-2xl overflow-hidden flex flex-col relative">
          
          {/* Mock Speaker/Camera bezel at the top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-1.5">
            <div className="w-12 h-1 bg-white/20 rounded-full" />
            <div className="w-2.5 h-2.5 bg-white/20 rounded-full" />
          </div>

          {/* Main App Container */}
          <div className="flex-1 flex flex-col pt-8 pb-16 overflow-y-auto px-4 relative">
            {/* Header: Logo, Search, Profile */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/SANTARA LOGO.png"
                    alt="SANTARA Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-display font-black text-lg text-deep-forest tracking-wider">Santara</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-deep-forest hover:bg-ivory-rice transition-colors cursor-pointer">
                  <Search className="w-4 h-4" />
                </button>
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-deep-forest/10 bg-white">
                  <Image
                    src="/images/Orang-01.png"
                    alt="Naufal Ghani"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              </div>
            </div>

            {/* Sub-Header: Greetings */}
            <div className="mt-3">
              <h3 className="font-display font-bold text-2xl text-deep-forest leading-tight">
                Selamat Datang Naufal
              </h3>
              <p className="text-xs text-deep-forest/50 font-bold uppercase tracking-wider mt-1">
                Mari Lihat Data Ladang Mu!
              </p>
            </div>

            {/* Location selector dropdowns */}
            <div className="mt-4 flex gap-2.5 bg-white p-3.5 rounded-2xl shadow-sm border border-deep-forest/5 relative">
              {/* Kebun Selector */}
              <div className="relative flex-1">
                <button
                  onClick={() => {
                    setKebunDropdownOpen(!kebunDropdownOpen);
                    setDesaDropdownOpen(false);
                  }}
                  className="flex items-center justify-between gap-1 w-full text-[11px] font-bold text-deep-forest/80 uppercase tracking-wider cursor-pointer focus:outline-none bg-transparent"
                >
                  <span>{selectedKebun}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-deep-forest/40" />
                </button>
                
                <AnimatePresence>
                  {kebunDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-36 bg-white border border-deep-forest/10 rounded-2xl shadow-lg z-30 py-1"
                    >
                      {["Kebun 1", "Kebun 2", "Kebun 3"].map((kebun) => (
                        <button
                          key={kebun}
                          onClick={() => {
                            setSelectedKebun(kebun);
                            setKebunDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider hover:bg-[#FAF9F5] transition-colors cursor-pointer block border-none ${
                            selectedKebun === kebun ? "text-[#008000]" : "text-deep-forest/80"
                          }`}
                        >
                          {kebun}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-px bg-deep-forest/10 self-stretch" />

              {/* Desa Selector */}
              <div className="relative flex-1">
                <button
                  onClick={() => {
                    setDesaDropdownOpen(!desaDropdownOpen);
                    setKebunDropdownOpen(false);
                  }}
                  className="flex items-center justify-between gap-1 w-full text-[11px] font-bold text-deep-forest/80 uppercase tracking-wider cursor-pointer focus:outline-none bg-transparent"
                >
                  <span>{selectedDesa}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-deep-forest/40" />
                </button>

                <AnimatePresence>
                  {desaDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-40 bg-white border border-deep-forest/10 rounded-2xl shadow-lg z-30 py-1"
                    >
                      {["Desa Wonorejo", "Desa Sukatani", "Desa Sukamaju"].map((desa) => (
                        <button
                          key={desa}
                          onClick={() => {
                            setSelectedDesa(desa);
                            setDesaDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider hover:bg-[#FAF9F5] transition-colors cursor-pointer block border-none ${
                            selectedDesa === desa ? "text-[#008000]" : "text-deep-forest/80"
                          }`}
                        >
                          {desa}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-8 h-8 rounded-xl bg-young-rice/20 text-deep-forest flex items-center justify-center shrink-0">
                <Home className="w-4 h-4" />
              </div>
            </div>

            {/* Dynamic Screen Content based on bottom tab */}
            <div className="flex-1 mt-4">
              <AnimatePresence mode="wait">
                {activeTab === "beranda" && (
                  <motion.div
                    key="beranda"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* ENVIRONMENT CARD */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm border border-deep-forest/5 relative overflow-hidden flex gap-4">
                      {/* Left: Temp */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <span className="font-display font-black text-xs text-deep-forest block">Kondisi Udara</span>
                          <span className="text-[9px] text-deep-forest/50 font-semibold block mt-0.5">{getDayName()}</span>
                        </div>
                        <div className="my-3">
                          <span className="font-display font-extrabold text-4xl text-deep-forest block leading-none">
                            {displayData.temp}°C
                          </span>
                          <span className="inline-flex mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#008000] text-white">
                            Optimal
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-px bg-deep-forest/5 self-stretch" />

                      {/* Right: Humidity & Light */}
                      <div className="flex-1 flex flex-col gap-3 justify-between">
                        {/* Humidity */}
                        <div className="bg-white rounded-2xl p-3 border border-deep-forest/5 shadow-sm flex flex-col">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-deep-forest/70 uppercase tracking-wider flex items-center gap-1">
                              <Droplets className="w-3 h-3 text-deep-forest/50" />
                              Kelembaban
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider bg-[#008000] text-white">
                              Optimal
                            </span>
                          </div>
                          <span className="font-display font-black text-xl text-deep-forest mt-1 block">
                            {displayData.humidity}%<span className="text-[10px] font-bold text-deep-forest/60 font-sans ml-1">RH</span>
                          </span>
                        </div>

                        {/* Light */}
                        <div className="bg-white rounded-2xl p-3 border border-deep-forest/5 shadow-sm flex flex-col">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-deep-forest/70 uppercase tracking-wider flex items-center gap-1">
                              <Sun className="w-3 h-3 text-deep-forest/50" />
                              Intensitas Cahaya
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider bg-[#008000] text-white">
                              Optimal
                            </span>
                          </div>
                          <span className="font-display font-black text-xl text-deep-forest mt-1 block">
                            {displayData.light.toLocaleString()}<span className="text-[10px] font-bold text-deep-forest/60 font-sans ml-1">Lux</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* PHOTOSYNTHESIS & SOIL GRID CARDS */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Photosynthesis Card */}
                      <div className="rounded-3xl p-5 bg-gradient-to-br from-[#5b8c32] to-[#7dbf3d] text-white shadow-md flex flex-col justify-between aspect-square">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 opacity-90">
                          <Sun className="w-3.5 h-3.5" />
                          Fotosintesis
                        </span>
                        <div className="mt-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-75 block">Kadar CO2</span>
                          <span className="font-display font-black text-2xl block mt-0.5">
                            {displayData.co2} <span className="text-[10px] font-semibold font-sans">ppm</span>
                          </span>
                        </div>
                      </div>

                      {/* Soil Status Card */}
                      <div className={`rounded-3xl p-5 shadow-md flex flex-col justify-between aspect-square transition-all duration-500 ${
                        displayData.moisture < 60 
                          ? "bg-gradient-to-br from-[#c0392b] to-[#e74c3c] text-white" 
                          : "bg-gradient-to-br from-[#2f5c22] to-[#458532] text-white"
                      }`}>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 opacity-90">
                          <Droplets className="w-3.5 h-3.5" />
                          Kondisi Tanah
                        </span>
                        <div className="mt-4 relative">
                          <span className="text-[10px] font-bold uppercase tracking-wider opacity-75 block">Kelembaban Tanah</span>
                          <span className="font-display font-black text-2xl block mt-0.5">
                            {displayData.moisture}%
                          </span>
                          <div className="absolute right-0 bottom-0 bg-white text-deep-forest py-1 px-2.5 rounded-full flex items-center gap-1 border border-white/10 shadow animate-fade-in">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${displayData.moisture < 60 ? 'bg-[#c0392b]' : 'bg-[#008000]'}`} />
                            <span className="text-[8px] font-extrabold uppercase tracking-wider">pH {displayData.ph}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FARM RESOURCES USAGE CARD */}
                    <div className="bg-gradient-to-br from-[#7fa628] to-[#9dbf3b] text-white rounded-3xl p-5 shadow-md border border-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-extrabold text-base tracking-tight">Penggunaan Sumber Daya</h4>
                          <span className="text-[8px] opacity-80 font-bold uppercase tracking-wider">DIPERBARUI 14 MENIT LALU</span>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                        <div className="bg-white/10 p-3 rounded-2xl">
                          <span className="font-display font-black text-lg block">{waterUsage}%</span>
                          <span className="text-[7px] font-extrabold uppercase tracking-widest opacity-80 block mt-0.5">Konsumsi Air</span>
                        </div>
                        <div className="bg-white/10 p-3 rounded-2xl">
                          <span className="font-display font-black text-lg block">{laborUtilization}%</span>
                          <span className="text-[7px] font-extrabold uppercase tracking-widest opacity-80 block mt-0.5">Tenaga Kerja</span>
                        </div>
                        <div className="bg-white/10 p-3 rounded-2xl">
                          <span className="font-display font-black text-lg block">{equipmentIdle}%</span>
                          <span className="text-[7px] font-extrabold uppercase tracking-widest opacity-80 block mt-0.5">Alat Standby</span>
                        </div>
                      </div>

                      {/* Efficiency Slider (Inefficient vs Optimized) */}
                      <div className="mt-5 bg-white p-4 rounded-2xl text-deep-forest flex flex-col gap-2.5">
                        <div className="flex justify-between items-center text-[9px] font-extrabold uppercase tracking-widest text-deep-forest/60">
                          <span>Kurang Efisien</span>
                          <span>Optimal</span>
                        </div>
                        <div className="relative h-4 bg-deep-forest/5 rounded-full overflow-hidden">
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-[#b5d300]"
                            style={{ width: `${efficiency}%` }}
                          />
                          <div 
                            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-deep-forest shadow-md"
                            style={{ left: `calc(${efficiency}% - 12px)` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* KEBUN TAB */}
                {activeTab === "kebun" && (
                  <motion.div
                    key="kebun"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <h4 className="font-display font-extrabold text-lg text-deep-forest tracking-tight">Katalog Komoditas Ladang</h4>
                    <div className="space-y-3">
                      {cropsData.map((crop) => (
                        <div key={crop.id} className="bg-white p-4 rounded-2xl border border-deep-forest/5 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-bold text-sm text-deep-forest block">{crop.name}</span>
                              <span className="text-[10px] text-deep-forest/50 font-semibold">{crop.stage}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider ${
                              crop.status === "Optimal" || crop.status === "Siap Panen" 
                                ? "bg-[#008000]/15 text-[#008000]" 
                                : "bg-golden-paddy/20 text-[#c0392b]"
                            }`}>
                              {crop.status}
                            </span>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-[9px] font-extrabold text-deep-forest/60 mb-1">
                              <span>Pertumbuhan</span>
                              <span>{crop.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-deep-forest/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-young-rice"
                                style={{ width: `${crop.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* MANUAL DEVICE CONTROLS PANEL */}
                    <div className="pt-2 border-t border-deep-forest/5 space-y-3">
                      <h4 className="font-display font-extrabold text-sm text-deep-forest tracking-tight">
                        Kontrol Manual Perangkat
                      </h4>
                      <p className="text-[10px] text-deep-forest/60">
                        Atur status alat secara manual secara independen tanpa rekomendasi peringatan.
                      </p>

                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Irrigation Pump */}
                        <button
                          onClick={waterCrops}
                          disabled={pumpActive}
                          className="p-3 rounded-2xl bg-white border border-deep-forest/10 hover:border-young-rice text-left flex flex-col gap-1.5 transition-all group shadow-sm disabled:opacity-50 cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-deep-forest text-young-rice flex items-center justify-center shadow-sm">
                            <Droplets className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-[10px] text-deep-forest">
                            {pumpActive ? "Siram..." : "Pompa Air NFT"}
                          </span>
                        </button>

                        {/* Grow Light */}
                        <button
                          onClick={toggleLed}
                          className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all group shadow-sm cursor-pointer ${
                            ledActive 
                              ? "bg-young-rice/10 border-young-rice" 
                              : "bg-white border-deep-forest/10 hover:border-young-rice"
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-deep-forest text-white flex items-center justify-center shadow-sm">
                            <Sun className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-[10px] text-deep-forest">
                            {ledActive ? "Matikan LED" : "Lampu LED Grow"}
                          </span>
                        </button>

                        {/* Fan Control */}
                        <button
                          onClick={toggleFan}
                          className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all group shadow-sm cursor-pointer ${
                            fanActive 
                              ? "bg-young-rice/10 border-young-rice" 
                              : "bg-white border-deep-forest/10 hover:border-young-rice"
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-deep-forest text-white flex items-center justify-center shadow-sm">
                            <Wind className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-[10px] text-deep-forest">
                            {fanActive ? "Kipas Aktif" : "Kipas Sirkulasi"}
                          </span>
                        </button>

                        {/* Mist Control */}
                        <button
                          onClick={toggleMist}
                          className={`p-3 rounded-2xl border text-left flex flex-col gap-1.5 transition-all group shadow-sm cursor-pointer ${
                            mistActive 
                              ? "bg-young-rice/10 border-young-rice" 
                              : "bg-white border-deep-forest/10 hover:border-young-rice"
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-deep-forest text-golden-paddy flex items-center justify-center shadow-sm">
                            <RefreshCw className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-[10px] text-deep-forest">
                            {mistActive ? "Mist Aktif" : "Mist Generator"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* REKOMENDASI TAB */}
                {activeTab === "rekomendasi" && (
                  <motion.div
                    key="rekomendasi"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <h4 className="font-display font-extrabold text-lg text-deep-forest tracking-tight">Rekomendasi AI</h4>
                    
                    {activeAlert ? (
                      <div className="bg-red-50 border border-red-200 rounded-3xl p-5 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#c0392b] text-white flex items-center justify-center shadow-md animate-pulse">
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c0392b] block">Peringatan Kritis</span>
                            <span className="font-display font-extrabold text-base text-deep-forest leading-tight block mt-0.5">{activeAlert.title}</span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-deep-forest/80 leading-relaxed font-semibold">
                          {activeAlert.desc}
                        </p>
                        
                        <div className="bg-white/60 p-3.5 rounded-2xl border border-red-100 flex flex-col gap-1 text-[11px] font-semibold text-deep-forest/85">
                          <span className="font-bold text-[#c0392b] uppercase tracking-wider text-[9px] block">Rekomendasi AI:</span>
                          {activeAlert.rec}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={resolveAlert}
                            disabled={pumpActive}
                            className="flex-1 py-3 px-4 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#008000] hover:bg-[#008000]/90 text-white transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            {pumpActive ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                Memulihkan...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-3.5 h-3.5" />
                                Jalankan Solusi
                              </>
                            )}
                          </button>
                          <button
                            onClick={ignoreAlert}
                            disabled={pumpActive}
                            className="flex-1 py-3 px-4 rounded-full text-[11px] font-bold uppercase tracking-wider border border-deep-forest/20 hover:bg-deep-forest/5 text-deep-forest/70 hover:text-deep-forest transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Abaikan Peringatan
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Normal State Box */}
                        <div className="bg-[#008000]/5 border border-[#008000]/10 rounded-3xl p-6 text-center space-y-4">
                          <div className="w-14 h-14 rounded-full bg-[#008000]/10 text-[#008000] flex items-center justify-center mx-auto shadow-sm">
                            <CheckCircle className="w-7 h-7" />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#008000] block">Diagnosis AI</span>
                            <h5 className="font-display font-extrabold text-lg text-deep-forest mt-1">Sistem Kebun Optimal</h5>
                            <p className="text-xs text-deep-forest/75 mt-2 max-w-xs mx-auto leading-relaxed font-semibold">
                              Kecerdasan Buatan (AI) Edge tidak mendeteksi adanya masalah di Kebun 1. Seluruh parameter telemetri berjalan normal.
                            </p>
                          </div>
                        </div>

                        {/* Secondary general tips */}
                        <div className="bg-white p-4 rounded-2xl border border-deep-forest/5 shadow-sm space-y-3">
                          <span className="text-[9px] font-extrabold text-deep-forest/50 uppercase tracking-widest block">Tips Pemeliharaan Harian</span>
                          <ul className="text-xs text-deep-forest/75 font-medium space-y-2.5">
                            <li className="flex gap-2 items-start">
                              <span className="text-young-rice">•</span>
                              Pertahankan pemantauan berkala grafik sensor di tab Teknisi.
                            </li>
                            <li className="flex gap-2 items-start">
                              <span className="text-young-rice">•</span>
                              Pembersihan rutin sensor pH disarankan setiap 14 hari kerja.
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* RIWAYAT TAB */}
                {activeTab === "riwayat" && (
                  <motion.div
                    key="riwayat"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <h4 className="font-display font-extrabold text-lg text-deep-forest tracking-tight">Riwayat Kegiatan</h4>
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {logs.map((log) => (
                        <div key={log.id} className="p-3 bg-white rounded-xl border border-deep-forest/5 shadow-sm text-[11px] leading-relaxed flex flex-col gap-0.5">
                          <div className="flex justify-between items-center text-[9px] font-bold text-deep-forest/40">
                            <span>{log.time}</span>
                            <span className={`px-1.5 py-0.2 rounded-full uppercase tracking-wider font-extrabold ${
                              log.role === "Petani" 
                                ? "bg-young-rice/15 text-deep-forest" 
                                : log.role === "Teknisi"
                                ? "bg-golden-paddy/15 text-[#c0392b]"
                                : "bg-deep-forest/10 text-deep-forest"
                            }`}>
                              {log.role}
                            </span>
                          </div>
                          <p className="text-deep-forest/80 font-medium">{log.message}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* PROFILE TAB */}
                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 text-center py-6"
                  >
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-deep-forest/20 mx-auto shadow-md">
                      <Image
                        src="/images/Orang-01.png"
                        alt="Naufal Ghani"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-2">
                      <h4 className="font-display font-extrabold text-lg text-deep-forest leading-tight">Naufal Ghani</h4>
                      <span className="text-xs text-deep-forest/50 font-bold uppercase tracking-wider">Pemilik Kebun 1 Wonorejo</span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-deep-forest/5 shadow-sm text-left text-xs text-deep-forest/75 mt-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="font-bold opacity-60">ID Petani:</span>
                        <span className="font-mono font-bold">ST-2025-NFL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold opacity-60">Lokasi:</span>
                        <span className="font-bold">Wonorejo, Jawa Timur</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold opacity-60">Status Modul:</span>
                        <span className="font-bold text-[#008000]">AKTIF (S-2)</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Fixed bottom navigation tabs bar */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-deep-forest/5 flex items-center justify-around z-20">
            <button 
              onClick={() => setActiveTab("beranda")}
              className={`flex flex-col items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider cursor-pointer ${
                activeTab === "beranda" ? "text-[#008000]" : "text-deep-forest/40 hover:text-deep-forest"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Beranda</span>
            </button>
            <button 
              onClick={() => setActiveTab("kebun")}
              className={`flex flex-col items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider cursor-pointer ${
                activeTab === "kebun" ? "text-[#008000]" : "text-deep-forest/40 hover:text-deep-forest"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Kebun</span>
            </button>
            <button 
              onClick={() => setActiveTab("rekomendasi")}
              className={`flex flex-col items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider cursor-pointer relative ${
                activeTab === "rekomendasi" ? "text-[#008000]" : "text-deep-forest/40 hover:text-deep-forest"
              }`}
            >
              <AlertTriangle className={`w-5 h-5 transition-all duration-300 ${activeAlert ? "text-[#c0392b] animate-bounce" : ""}`} />
              {activeAlert && (
                <div className="absolute top-0.5 right-5 w-2.5 h-2.5 rounded-full bg-[#c0392b] border border-white" />
              )}
              <span>Rekomendasi</span>
            </button>
            <button 
              onClick={() => setActiveTab("riwayat")}
              className={`flex flex-col items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider cursor-pointer ${
                activeTab === "riwayat" ? "text-[#008000]" : "text-deep-forest/40 hover:text-deep-forest"
              }`}
            >
              <History className="w-5 h-5" />
              <span>Riwayat</span>
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider cursor-pointer ${
                activeTab === "profile" ? "text-[#008000]" : "text-deep-forest/40 hover:text-deep-forest"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profil</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
