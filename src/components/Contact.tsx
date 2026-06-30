"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, User, Building2, MessageSquare, CheckCircle, ShieldAlert } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    
    // Simulate sending email
    setTimeout(() => {
      setStatus("success");
      setName("");
      setInstitution("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-ivory-rice relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#054e00_1px,transparent_1px)] [background-size:20px_20px] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Form Header / Info (Left) */}
          <div className="lg:col-span-5 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-deep-forest/75 bg-young-rice/25 px-4 py-1.5 rounded-full">
              Kemitraan & Proposal
            </span>
            <h2 className="mt-6 font-display font-extrabold text-3xl md:text-5xl text-deep-forest leading-tight tracking-tight">
              Mari Bangun Pertanian Masa Depan Indonesia.
            </h2>
            <p className="mt-6 text-base md:text-lg text-deep-forest/80 leading-relaxed">
              Kami membuka peluang kolaborasi dengan instansi pemerintah, investor agritech, akademisi universitas, dan perwakilan daerah untuk mengimplementasikan teknologi SANTARA secara luas demi terwujudnya Indonesia Emas 2045.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-deep-forest/5 flex items-center justify-center text-deep-forest border border-deep-forest/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-deep-forest/50 block">Surel Kemitraan</span>
                  <span className="text-sm font-extrabold text-deep-forest">partner@santara.agri.id</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields (Right) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-10 rounded-3xl border border-deep-forest/10 shadow-2xl relative">
              <h3 className="font-display font-extrabold text-xl text-deep-forest mb-6">
                Formulir Hubungan Kerja Sama
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="relative">
                  <label className="text-xs font-bold text-deep-forest/70 uppercase block mb-1.5">Nama Lengkap *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-forest/40" />
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/50 border border-deep-forest/10 focus:border-deep-forest focus:bg-white text-sm outline-none transition-all text-deep-forest placeholder:text-deep-forest/30 font-semibold"
                    />
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <label className="text-xs font-bold text-deep-forest/70 uppercase block mb-1.5">Nama Institusi</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-forest/40" />
                    <input
                      type="text"
                      placeholder="Kementerian, Universitas, Perusahaan..."
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/50 border border-deep-forest/10 focus:border-deep-forest focus:bg-white text-sm outline-none transition-all text-deep-forest placeholder:text-deep-forest/30 font-semibold"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-deep-forest/70 uppercase block mb-1.5">Alamat Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-forest/40" />
                    <input
                      type="email"
                      required
                      placeholder="nama@institusi.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/50 border border-deep-forest/10 focus:border-deep-forest focus:bg-white text-sm outline-none transition-all text-deep-forest placeholder:text-deep-forest/30 font-semibold"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-bold text-deep-forest/70 uppercase block mb-1.5">Detail Pesan Kerja Sama *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4.5 w-4 h-4 text-deep-forest/40" />
                    <textarea
                      required
                      rows={4}
                      placeholder="Jelaskan kebutuhan riset, investasi, atau pengadaan unit..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/50 border border-deep-forest/10 focus:border-deep-forest focus:bg-white text-sm outline-none transition-all text-deep-forest placeholder:text-deep-forest/30 font-semibold resize-none"
                    />
                  </div>
                </div>

                {/* Status Notice */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-sm font-semibold"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    Pesan terkirim! Tim kemitraan kami akan menghubungi Anda segera.
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-800 text-sm font-semibold"
                  >
                    <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                    Mohon lengkapi seluruh formulir wajib bertanda bintang (*).
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 px-6 rounded-2xl bg-deep-forest text-ivory-rice font-bold text-xs uppercase tracking-widest shadow-md hover:bg-deep-forest/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sedang Mengirim..." : "Kirim Pesan Kerja Sama"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
