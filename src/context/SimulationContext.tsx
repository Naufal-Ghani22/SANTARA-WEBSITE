"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface LogEntry {
  id: string;
  time: string;
  role: "Petani" | "Teknisi" | "Sistem";
  message: string;
}

interface SimulationContextType {
  // Telemetry variables
  temp: number;
  humidity: number;
  light: number;
  co2: number;
  moisture: number;
  ph: number;
  
  // Resources
  waterUsage: number;
  laborUtilization: number;
  equipmentIdle: number;
  efficiency: number; // 0 to 100 (inefficient to optimized)

  // System states
  battery: number;
  solarInput: number;
  fanActive: boolean;
  ledActive: boolean;
  pumpActive: boolean;
  mistActive: boolean;
  loraSignal: number;
  aiAccuracy: number;

  // Logs
  logs: LogEntry[];

  // Alert State
  activeAlert: { title: string; desc: string; rec: string; severity: "CRITICAL" | "WARNING" } | null;

  // Setters/Actions
  waterCrops: () => void;
  fertilizeCrops: () => void;
  toggleLed: () => void;
  toggleFan: () => void;
  calibrateSensors: () => void;
  adjustTargetMoisture: (val: number) => void;
  addLog: (role: "Petani" | "Teknisi" | "Sistem", message: string) => void;
  triggerMoistureAlert: () => void;
  resolveAlert: () => void;
  ignoreAlert: () => void;
  toggleMist: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Base states
  const [temp, setTemp] = useState(29);
  const [humidity, setHumidity] = useState(74);
  const [light, setLight] = useState(18400);
  const [co2, setCo2] = useState(820);
  const [moisture, setMoisture] = useState(86);
  const [ph, setPh] = useState(6.4);
  const [activeAlert, setActiveAlert] = useState<{ title: string; desc: string; rec: string; severity: "CRITICAL" | "WARNING" } | null>(null);

  // Resources
  const [waterUsage, setWaterUsage] = useState(74);
  const [laborUtilization, setLaborUtilization] = useState(22);
  const [equipmentIdle, setEquipmentIdle] = useState(4);
  const [efficiency, setEfficiency] = useState(85);

  // Tech variables
  const [battery, setBattery] = useState(94);
  const [solarInput, setSolarInput] = useState(380); // Watts
  const [fanActive, setFanActive] = useState(true);
  const [ledActive, setLedActive] = useState(false);
  const [pumpActive, setPumpActive] = useState(false);
  const [mistActive, setMistActive] = useState(false);
  const [loraSignal, setLoraSignal] = useState(-84); // dBm
  const [aiAccuracy, setAiAccuracy] = useState(98.4);

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", time: "10:30:15", role: "Sistem", message: "Inisialisasi modul AI Edge SANTARA berhasil." },
    { id: "2", time: "10:32:00", role: "Sistem", message: "Sinkronisasi sensor telemetri LoRaWAN Wonorejo OK." },
    { id: "3", time: "10:45:10", role: "Teknisi", message: "Kalibrasi sensor pH tanah unit S-2 diselesaikan." },
  ]);

  const addLog = (role: "Petani" | "Teknisi" | "Sistem", message: string) => {
    const time = new Date().toTimeString().split(" ")[0];
    setLogs((prev) => [
      { id: Math.random().toString(), time, role, message },
      ...prev.slice(0, 19), // Limit to 20 logs
    ]);
  };

  // Farmer Actions
  const waterCrops = () => {
    setPumpActive(true);
    addLog("Petani", "Irigasi air manual diaktifkan.");
    
    // Simulate water flowing
    setTimeout(() => {
      setMoisture((prev) => Math.min(95, prev + 5));
      setWaterUsage((prev) => Math.min(100, prev + 2));
      setPumpActive(false);
      addLog("Sistem", "Pompa irigasi dinonaktifkan (Kelembaban mencukupi).");
    }, 3000);
  };

  const fertilizeCrops = () => {
    addLog("Petani", "Penyaluran nutrisi pupuk cair manual dimulai.");
    setPh((prev) => {
      const next = prev < 6.5 ? prev + 0.1 : prev - 0.1;
      return parseFloat(next.toFixed(1));
    });
    setLaborUtilization((prev) => Math.min(100, prev + 8));
  };

  const toggleLed = () => {
    setLedActive((prev) => {
      const next = !prev;
      addLog("Petani", `LED Grow Lights diubah menjadi: ${next ? "AKTIF" : "MATI"}`);
      setLight(next ? 28000 : 18400);
      return next;
    });
  };

  // Technician Actions
  const toggleFan = () => {
    setFanActive((prev) => {
      const next = !prev;
      addLog("Teknisi", `Kipas ventilasi override: ${next ? "AKTIF" : "MATI"}`);
      return next;
    });
  };

  const calibrateSensors = () => {
    addLog("Teknisi", "Melakukan kalibrasi ulang semua sensor analog NPK & pH.");
    setTimeout(() => {
      setPh(6.4);
      setAiAccuracy((prev) => Math.min(99.9, prev + 0.5));
      addLog("Sistem", "Kalibrasi selesai. Sensor deviasi: 0.02%.");
    }, 2000);
  };

  const adjustTargetMoisture = (val: number) => {
    addLog("Teknisi", `Target kelembaban AI diubah menjadi ${val}%.`);
    setEfficiency(val > 80 ? 92 : 74);
  };

  // Telemetry loop: minor live fluctuations to simulate real system
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp((prev) => {
        const change = (Math.random() - 0.5) * 0.4;
        const target = fanActive ? 28.5 : 31.0;
        const step = (target - prev) * 0.05 + change;
        return parseFloat((prev + step).toFixed(1));
      });

      setHumidity((prev) => {
        const change = (Math.random() - 0.5) * 0.8;
        const target = fanActive ? 72 : 79;
        const step = (target - prev) * 0.05 + change;
        return Math.floor(prev + step);
      });

      setCo2((prev) => {
        const change = Math.floor((Math.random() - 0.5) * 10);
        const target = fanActive ? 810 : 880;
        const step = (target - prev) * 0.05 + change;
        return Math.floor(prev + step);
      });

      // Solar energy fluctuation
      setSolarInput((prev) => {
        const change = Math.floor((Math.random() - 0.5) * 15);
        const base = new Date().getHours() > 17 || new Date().getHours() < 6 ? 0 : 380;
        return Math.max(0, base + change);
      });

      // Battery usage
      setBattery((prev) => {
        const drain = (ledActive ? 0.2 : 0.05) + (fanActive ? 0.1 : 0.02);
        const charge = (solarInput > 0 ? 0.35 : 0);
        const next = prev - drain + charge;
        return parseFloat(Math.min(100, Math.max(1, next)).toFixed(2));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [fanActive, ledActive, solarInput]);

  const triggerMoistureAlert = () => {
    setMoisture(58);
    setHumidity(82);
    setTemp(31);
    setActiveAlert({
      title: "Kelembaban Tanah Kritis",
      desc: "Sensor NPK & pH mendeteksi tingkat kelembaban tanah di Kebun 1 jatuh kritis di bawah batas minimum (58% RH). Tanah terlalu kering.",
      rec: "Gunakan fitur otomasi irigasi mikro untuk memulihkan kelembaban optimal dengan pompa air NFT.",
      severity: "CRITICAL",
    });
    addLog("Sistem", "Peringatan kritis: Kelembaban tanah di bawah 60% RH!");
  };

  const resolveAlert = () => {
    setPumpActive(true);
    addLog("Petani", "Menekan tombol otomatisasi untuk memulihkan kelembaban tanah.");
    setTimeout(() => {
      setMoisture(86);
      setWaterUsage((prev) => Math.min(100, prev + 3));
      setActiveAlert(null);
      setPumpActive(false);
      addLog("Sistem", "Kelembaban tanah dipulihkan ke 86% RH. Status: Optimal.");
    }, 2500);
  };

  const ignoreAlert = () => {
    setActiveAlert(null);
    addLog("Petani", "Rekomendasi diabaikan secara manual.");
  };

  const toggleMist = () => {
    setMistActive((prev) => {
      const next = !prev;
      addLog("Petani", `Sistem Pengabutan (Mist) diubah menjadi: ${next ? "AKTIF" : "MATI"}`);
      return next;
    });
  };

  return (
    <SimulationContext.Provider
      value={{
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
        battery,
        solarInput,
        fanActive,
        ledActive,
        pumpActive,
        mistActive,
        loraSignal,
        aiAccuracy,
        logs,
        waterCrops,
        fertilizeCrops,
        toggleLed,
        toggleFan,
        calibrateSensors,
        adjustTargetMoisture,
        addLog,
        activeAlert,
        triggerMoistureAlert,
        resolveAlert,
        ignoreAlert,
        toggleMist,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};
