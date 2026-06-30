"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplet, Zap, Sprout, ShieldCheck, Activity, RefreshCw } from "lucide-react";

export default function DigitalTwin() {
  // User targets
  const [targetTemp, setTargetTemp] = useState(24);
  const [targetHumidity, setTargetHumidity] = useState(70);
  const [targetWater, setTargetWater] = useState(50);
  const [targetLight, setTargetLight] = useState(60);

  // Simulated live sensor values
  const [currentTemp, setCurrentTemp] = useState(25.4);
  const [currentHumidity, setCurrentHumidity] = useState(68.2);
  const [currentNutrition, setCurrentNutrition] = useState(1.8); // EC in mS/cm
  const [currentGrowth, setCurrentGrowth] = useState(78.5); // % of optimal rate

  // Fan speed rotation state for twin animation
  const [fanSpeed, setFanSpeed] = useState(2);

  // Data history for simple line charts
  const [tempHistory, setTempHistory] = useState<number[]>([24.2, 24.5, 24.8, 25.1, 25.3, 25.4]);
  const [humidityHistory, setHumidityHistory] = useState<number[]>([72.1, 71.5, 70.8, 69.5, 68.9, 68.2]);

  // Telemetry loop: adjust current sensors towards targets with minor fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      // Approach target temp
      setCurrentTemp((prev) => {
        const diff = targetTemp - prev;
        const change = diff * 0.1 + (Math.random() - 0.5) * 0.2;
        const next = prev + change;
        setTempHistory((hist) => [...hist.slice(1), parseFloat(next.toFixed(1))]);
        return parseFloat(next.toFixed(1));
      });

      // Approach target humidity
      setCurrentHumidity((prev) => {
        const diff = targetHumidity - prev;
        const change = diff * 0.1 + (Math.random() - 0.5) * 0.5;
        const next = prev + change;
        setHumidityHistory((hist) => [...hist.slice(1), parseFloat(next.toFixed(1))]);
        return parseFloat(next.toFixed(1));
      });

      // Approach optimal growth based on parameters
      setCurrentGrowth((prev) => {
        // Growth is optimal when Temp is 22-26°C and Humidity is 65-75%
        const tempDiff = Math.abs(currentTemp - 24);
        const humDiff = Math.abs(currentHumidity - 70);
        const penalty = (tempDiff * 4) + (humDiff * 1.5);
        const optimal = Math.max(50, 100 - penalty);
        const next = prev + (optimal - prev) * 0.1 + (Math.random() - 0.5) * 0.5;
        return parseFloat(Math.min(100, Math.max(10, next)).toFixed(1));
      });

      // Fluctuate Nutrition slightly
      setCurrentNutrition((prev) => {
        const change = (Math.random() - 0.5) * 0.05;
        const next = Math.max(1.0, Math.min(2.5, prev + change));
        return parseFloat(next.toFixed(2));
      });

      // Adjust fan speed animation based on temperature difference
      const tempDiff = currentTemp - targetTemp;
      if (tempDiff > 1) setFanSpeed(6);
      else if (tempDiff > 0.2) setFanSpeed(4);
      else if (tempDiff < -1) setFanSpeed(0.5);
      else setFanSpeed(2);
    }, 1500);

    return () => clearInterval(interval);
  }, [targetTemp, targetHumidity, currentTemp, currentHumidity]);

  // Convert array to SVG polyline path coordinates
  const makeSvgPath = (data: number[], minVal: number, maxVal: number, width: number, height: number) => {
    const stepX = width / (data.length - 1);
    const range = maxVal - minVal;
    return data
      .map((val, idx) => {
        const x = idx * stepX;
        const y = height - ((val - minVal) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <section
      id="digital-twin"
      className="py-24 md:py-32 bg-gradient-to-b from-ivory-rice to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,78,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,78,0,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
            Real-time Telemetri
          </span>
          <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
            Digital Twin & Dashboard AI
          </h2>
          <p className="mt-4 text-base md:text-lg text-deep-forest/80">
            Simulasi replika digital greenhouse SANTARA secara real-time. Sesuaikan parameter target kontrol di sebelah kiri dan amati respons penyesuaian otomatis kecerdasan buatan.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel (Left) */}
          <div className="lg:col-span-4 glass-card p-6 md:p-8 rounded-3xl border border-deep-forest/10 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="font-display font-extrabold text-lg text-deep-forest mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-young-rice" />
                Kontrol AI Target
              </h3>

              {/* Slider 1: Target Temp */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-deep-forest/80 uppercase">Target Temperatur</span>
                  <span className="text-sm font-extrabold text-deep-forest bg-deep-forest/5 px-2.5 py-0.5 rounded">
                    {targetTemp} °C
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="32"
                  value={targetTemp}
                  onChange={(e) => setTargetTemp(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-deep-forest/10 rounded-lg appearance-none cursor-pointer accent-deep-forest"
                />
                <div className="flex justify-between text-[9px] font-bold text-deep-forest/40 mt-1">
                  <span>18°C</span>
                  <span>Optimal: 24°C</span>
                  <span>32°C</span>
                </div>
              </div>

              {/* Slider 2: Target Humidity */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-deep-forest/80 uppercase">Target Kelembaban</span>
                  <span className="text-sm font-extrabold text-deep-forest bg-deep-forest/5 px-2.5 py-0.5 rounded">
                    {targetHumidity} %
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="90"
                  value={targetHumidity}
                  onChange={(e) => setTargetHumidity(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-deep-forest/10 rounded-lg appearance-none cursor-pointer accent-deep-forest"
                />
                <div className="flex justify-between text-[9px] font-bold text-deep-forest/40 mt-1">
                  <span>40%</span>
                  <span>Optimal: 70%</span>
                  <span>90%</span>
                </div>
              </div>

              {/* Slider 3: Water Flow */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-deep-forest/80 uppercase">Dosis Air Irigasi</span>
                  <span className="text-sm font-extrabold text-deep-forest bg-deep-forest/5 px-2.5 py-0.5 rounded">
                    {targetWater} ml/siklus
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={targetWater}
                  onChange={(e) => setTargetWater(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-deep-forest/10 rounded-lg appearance-none cursor-pointer accent-deep-forest"
                />
              </div>

              {/* Slider 4: LED Intensity */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-deep-forest/80 uppercase">Intensitas LED Grow Light</span>
                  <span className="text-sm font-extrabold text-deep-forest bg-deep-forest/5 px-2.5 py-0.5 rounded">
                    {targetLight} %
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={targetLight}
                  onChange={(e) => setTargetLight(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-deep-forest/10 rounded-lg appearance-none cursor-pointer accent-deep-forest"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-deep-forest/5 flex items-center gap-2 text-xs text-deep-forest/60 font-medium">
              <ShieldCheck className="w-4 h-4 text-young-rice shrink-0" />
              Sistem Aktuator Sinkron Terenkripsi
            </div>
          </div>

          {/* Twin 3D Wireframe / Schematic Simulation (Center) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-deep-forest to-[#032400] rounded-3xl border border-young-rice/20 p-6 md:p-8 flex flex-col justify-between text-ivory-rice relative overflow-hidden shadow-xl min-h-[400px]">
            {/* Grid grid background overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="flex justify-between items-center relative z-10">
              <h3 className="font-display font-extrabold text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-young-rice animate-ping" />
                Live Twin Render
              </h3>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-white/5">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                SYNCED
              </div>
            </div>

            {/* Graphic Wireframe greenhouse representation */}
            <div className="h-48 my-6 flex items-center justify-center relative">
              {/* Rotating fan mock element */}
              <div 
                className="absolute top-4 right-12 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center"
                style={{ 
                  transform: `rotate(${fanSpeed * 10}deg)`,
                  transition: "transform 0.1s linear"
                }}
              >
                <div className="w-1 h-8 bg-young-rice rounded-full" />
                <div className="w-8 h-1 bg-young-rice rounded-full" />
              </div>

              {/* Glowing abstract wireframe lines */}
              <svg className="w-full h-full stroke-young-rice" viewBox="0 0 100 80" fill="none">
                {/* Base */}
                <path d="M10,70 L90,70 L80,35 L20,35 Z" strokeWidth="0.8" opacity="0.3" />
                {/* Frame */}
                <line x1="20" y1="35" x2="20" y2="70" strokeWidth="1" />
                <line x1="80" y1="35" x2="80" y2="70" strokeWidth="1" />
                <line x1="50" y1="18" x2="50" y2="70" strokeWidth="0.5" strokeDasharray="1,2" />
                {/* Roof */}
                <path d="M20,35 L50,18 L80,35" strokeWidth="1.2" />
                {/* Internal hanging lights */}
                <line x1="30" y1="38" x2="70" y2="38" stroke="#F3CE34" strokeWidth="1.5" strokeDasharray="1,1" />
                {/* Floating data nodes */}
                <circle cx="35" cy="50" r="1.5" className="fill-young-rice animate-pulse" />
                <circle cx="65" cy="45" r="1.5" className="fill-young-rice animate-pulse" />
                <circle cx="50" cy="60" r="2" className="fill-young-rice animate-ping" />
                {/* Floor plants row representation */}
                <path d="M25,65 Q27,58 30,65 Q33,58 35,65 M65,65 Q67,58 70,65 Q73,58 75,65" strokeWidth="1" stroke="#fff" />
              </svg>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-ivory-rice/60">
              <span>Status: Optimal</span>
              <span>Ventilator Speed: {fanSpeed > 4 ? "Tinggi" : fanSpeed > 1 ? "Normal" : "Rendah"}</span>
            </div>
          </div>

          {/* Telemetry Sensor Panels (Right) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Grid inside telemetry */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Sensor Card 1: Temp */}
              <div className="glass-card p-5 rounded-2xl border border-deep-forest/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-deep-forest/60">
                  <span className="text-[10px] uppercase font-bold tracking-wider">Temperatur</span>
                  <Thermometer className="w-4 h-4 text-rose-500" />
                </div>
                <div className="my-4">
                  <span className="font-display font-black text-2xl md:text-3xl text-deep-forest tracking-tight">
                    {currentTemp}
                  </span>
                  <span className="text-xs font-bold text-deep-forest/60 ml-1">°C</span>
                </div>
                {/* Small graph */}
                <div className="h-8 w-full mt-2 opacity-80">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      points={makeSvgPath(tempHistory, 18, 32, 100, 30)}
                    />
                  </svg>
                </div>
              </div>

              {/* Sensor Card 2: Humidity */}
              <div className="glass-card p-5 rounded-2xl border border-deep-forest/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-deep-forest/60">
                  <span className="text-[10px] uppercase font-bold tracking-wider">Kelembaban</span>
                  <Droplet className="w-4 h-4 text-blue-500" />
                </div>
                <div className="my-4">
                  <span className="font-display font-black text-2xl md:text-3xl text-deep-forest tracking-tight">
                    {currentHumidity}
                  </span>
                  <span className="text-xs font-bold text-deep-forest/60 ml-1">%</span>
                </div>
                {/* Small graph */}
                <div className="h-8 w-full mt-2 opacity-80">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                      points={makeSvgPath(humidityHistory, 40, 90, 100, 30)}
                    />
                  </svg>
                </div>
              </div>

              {/* Sensor Card 3: Nutrition */}
              <div className="glass-card p-5 rounded-2xl border border-deep-forest/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-deep-forest/60">
                  <span className="text-[10px] uppercase font-bold tracking-wider">EC Nutrisi</span>
                  <Activity className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="my-4">
                  <span className="font-display font-black text-2xl md:text-3xl text-deep-forest tracking-tight">
                    {currentNutrition}
                  </span>
                  <span className="text-[10px] font-bold text-deep-forest/60 ml-1">mS/cm</span>
                </div>
                <span className="text-[8px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded self-start uppercase">
                  Konsentrasi Aman
                </span>
              </div>

              {/* Sensor Card 4: Growth Rate */}
              <div className="glass-card p-5 rounded-2xl border border-deep-forest/5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-deep-forest/60">
                  <span className="text-[10px] uppercase font-bold tracking-wider">Laju Tumbuh AI</span>
                  <Sprout className="w-4 h-4 text-young-rice" />
                </div>
                <div className="my-4">
                  <span className="font-display font-black text-2xl md:text-3xl text-deep-forest tracking-tight">
                    {currentGrowth}
                  </span>
                  <span className="text-xs font-bold text-deep-forest/60 ml-1">%</span>
                </div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded self-start uppercase ${
                  currentGrowth > 85 ? "text-deep-forest bg-young-rice/25" : "text-amber-700 bg-amber-500/10"
                }`}>
                  {currentGrowth > 85 ? "Optimal Efisien" : "Sub-Optimal"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
