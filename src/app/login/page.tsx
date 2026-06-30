"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sprout, Cpu, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role: "petani" | "technician") => {
    // Save to localStorage to persist user session mock
    localStorage.setItem("santara_role", role);
    localStorage.setItem("santara_user", "Naufal Ghani");
    
    // Redirect to dashboard
    if (role === "petani") {
      router.push("/dashboard/petani");
    } else {
      router.push("/dashboard/technician");
    }
  };

  return (
    <div className="min-h-[85vh] bg-ivory-rice py-12 flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-young-rice/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-deep-forest/5 blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-deep-forest/5 relative z-10 text-center"
      >
        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="relative w-12 h-12">
            <Image
              src="/images/SANTARA LOGO.png"
              alt="SANTARA Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-display font-black text-2xl tracking-widest text-deep-forest">SANTARA</span>
        </div>

        <h1 className="font-display font-extrabold text-2xl text-deep-forest tracking-tight leading-tight">
          Pilih Peran Simulasi
        </h1>
        <p className="text-sm text-deep-forest/70 mt-2 font-medium">
          Masuk ke ekosistem smart greenhouse dan pantau pertumbuhan atau kelola modul telemetri IoT.
        </p>

        {/* Roles container */}
        <div className="flex flex-col gap-4 mt-8 text-left">
          {/* Petani */}
          <button
            onClick={() => handleLogin("petani")}
            className="flex items-center justify-between p-5 rounded-2xl border-2 border-transparent bg-ivory-rice hover:bg-young-rice/10 hover:border-young-rice transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-deep-forest text-young-rice flex items-center justify-center shadow-md">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-deep-forest block text-base">Role Petani (Farmer)</span>
                <span className="text-xs text-deep-forest/60">Lihat tanaman, kendalikan air & pupuk</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-deep-forest opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Agri Tech */}
          <button
            onClick={() => handleLogin("technician")}
            className="flex items-center justify-between p-5 rounded-2xl border-2 border-transparent bg-ivory-rice hover:bg-young-rice/10 hover:border-young-rice transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-deep-forest text-golden-paddy flex items-center justify-center shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-deep-forest block text-base">Role Agri Technician</span>
                <span className="text-xs text-deep-forest/60">Kalibrasi sensor, cek status baterai & AI</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-deep-forest opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Info footer */}
        <div className="mt-8 pt-6 border-t border-deep-forest/5 flex items-center justify-center gap-2 text-xs text-deep-forest/50 font-bold uppercase tracking-wider">
          <User className="w-4 h-4" />
          <span>SANTARA Smart Greenhouse 2026</span>
        </div>
      </motion.div>
    </div>
  );
}
