"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageSquare, X, Send, ArrowLeft, Bot, Sparkles } from "lucide-react";

// Context-aware tips for Mascot SARTO based on route & scroll position
const mascotTips: Record<string, { mascot: string; text: string }> = {
  "home-hero": {
    mascot: "/images/Maskot-01.png",
    text: "Halo! Saya SARTO. Selamat datang di SANTARA! Saya siap memandu Anda menjelajahi masa depan agritech Indonesia.",
  },
  "home-problem": {
    mascot: "/images/Maskot-02.png",
    text: "Konversi lahan pertanian sangat tinggi! Kita butuh efisiensi ruang pembibitan padi yang presisi.",
  },
  "home-dampak": {
    mascot: "/images/Maskot-04.png",
    text: "Sistem tertutup NFT kami menghemat air hingga 90%! Panen bibit pun stabil sepanjang tahun tanpa kenal cuaca.",
  },
  "home-default": {
    mascot: "/images/Maskot-01.png",
    text: "Jelajahi menu navigasi di atas untuk melihat teknologi 3D, varian modul, dan dasbor Digital Twin kami!",
  },
  "/teknologi": {
    mascot: "/images/Maskot-03.png",
    text: "Geser model 3D di atas untuk memutar! Klik langsung bagian greenhouse atau tombol sidebar untuk menginspeksi komponen pintar.",
  },
  "/produk": {
    mascot: "/images/Maskot-04.png",
    text: "Dari unit mini pekarangan rumah S-1 hingga Agro Hub raksasa S-4, kami siap menskala persemaian bibit padi Anda.",
  },
  "/dashboard": {
    mascot: "/images/Maskot-05.png",
    text: "Ini dasbor simulasi Digital Twin! Silakan geser slider target di kiri untuk menguji respons otomatis sistem AI.",
  },
  "/dampak": {
    mascot: "/images/Maskot-04.png",
    text: "Lihat sasaran swasembada pangan berkelanjutan di Roadmap 2045 dan hasil jepretan foto implementasi desa kami.",
  },
  "/kontak": {
    mascot: "/images/Maskot-01.png",
    text: "Pemerintah, BUMN, Universitas, maupun Investor dipersilakan mengisi formulir di samping untuk peluang kolaborasi.",
  },
};

// SARTO Knowledge Base responses
const sartoResponses: Record<string, string> = {
  greeting: "Halo! Saya **SARTO**, asisten AI pintar SANTARA. Ada yang bisa saya bantu terkait teknologi agrikultur modular kami?",
  nft: "Teknologi **NFT (Nutrient Film Technique)** kami mengalirkan air nutrisi tipis secara terus-menerus ke akar padi. Ini menghemat penggunaan air hingga 90% dibandingkan sawah tradisional dan mempercepat persemaian bibit padi!",
  ai: "**IoT Telemetri & AI Edge** memantau kondisi vital seperti suhu, kelembaban, kadar CO2, pH air, dan kelembaban tanah. Sistem AI otomatis mengambil tindakan seperti menyalakan pompa air NFT atau mist generator jika kondisi tanah mendeteksi kekeringan, meminimalkan campur tangan manusia!",
  varian: "SANTARA memiliki 4 varian modul persemaian padi:\n1. **S-1 (Mini)**: Cocok untuk pekarangan rumah tangga.\n2. **S-2 (Komunal)**: Untuk kelompok tani (Gapoktan) tingkat desa.\n3. **S-3 (Industri)**: Skala komersial dengan sensor terlengkap.\n4. **S-4 (Agro Hub)**: Sentra distribusi agritech raksasa terintegrasi.",
  harga: "Untuk informasi detail harga tiap varian modul (S-1 hingga S-4) dan rencana kemitraan Gapoktan desa, silakan hubungi tim kolaborasi kami melalui formulir di halaman **Kontak**!",
  cara: "Untuk memulai, Anda dapat meletakkan nampan persemaian padi ke dalam rak modular SANTARA. Sambungkan sensor-sensor telemetri ke panel kontrol utama, jalankan sistem otomatis, dan pantau hasilnya langsung dari aplikasi dasbor Petani!",
  simulasi: "Pada halaman dasbor, Anda bisa mensimulasikan kegagalan alat (misalnya pompa mati yang membuat kelembaban tanah turun ke status merah 58%). Melalui tab **Rekomendasi AI**, Anda cukup menekan tombol 'Jalankan Solusi' untuk memulihkan statusnya secara otomatis!",
  padi: "SANTARA difokuskan untuk mengoptimalkan persemaian bibit padi unggulan seperti Pandan Wangi, Mentik Susu, Ciherang, Inpari 32, Rojolele, dan Merah Cianjur, menghasilkan akar rapat dalam waktu 14 hari.",
  fallback: "Pertanyaan menarik! Sebagai SARTO, saya siap menjelaskan lebih jauh tentang teknologi greenhouse modular SANTARA. Bisa diperjelas apakah Anda tertarik mengenai cara kerja NFT, varian modul (S-1 s/d S-4), atau sistem monitoring AI kami?"
};

interface Message {
  sender: "user" | "sarto";
  text: string;
}

export default function MascotAssistant() {
  const pathname = usePathname();
  const [activeState, setActiveState] = useState<string>("home-hero");
  const [bubbleOpen, setBubbleOpen] = useState(true);
  const [chatMode, setChatMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Chat states
  const [messages, setMessages] = useState<Message[]>([
    { sender: "sarto", text: "Halo! Nama saya SARTO. Saya asisten AI pintar yang siap menjelaskan detail tentang teknologi agroteknologi SANTARA. Ada yang ingin Anda tanyakan?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Monitor screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Monitor scroll state for homepage sections
  useEffect(() => {
    if (pathname !== "/") {
      setActiveState(pathname);
      setBubbleOpen(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const problemEl = document.getElementById("problem");
      const dampakEl = document.getElementById("dampak");

      const problemTop = problemEl ? problemEl.offsetTop - 300 : 800;
      const dampakTop = dampakEl ? dampakEl.offsetTop - 300 : 2500;

      if (scrollY >= dampakTop) {
        setActiveState("home-dampak");
      } else if (scrollY >= problemTop) {
        setActiveState("home-problem");
      } else {
        setActiveState("home-hero");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Auto-open bubble briefly on page changes
  useEffect(() => {
    setBubbleOpen(true);
    setChatMode(false); // Reset to tips mode on page change
  }, [pathname]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const activeData = mascotTips[activeState] || mascotTips["home-default"];

  // Logic to process user message
  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: textToSend } as Message];
    setMessages(newMessages);
    setUserInput("");
    setIsTyping(true);

    // Process matching logic
    const lower = textToSend.toLowerCase();
    let replyKey = "fallback";

    if (lower.includes("halo") || lower.includes("hai") || lower.includes("pagi") || lower.includes("siang") || lower.includes("sore") || lower.includes("malam")) {
      replyKey = "greeting";
    } else if (lower.includes("nft") || lower.includes("irigasi") || lower.includes("nutrisi") || lower.includes("air")) {
      replyKey = "nft";
    } else if (lower.includes("ai") || lower.includes("iot") || lower.includes("telemetri") || lower.includes("sensor") || lower.includes("otomatis") || lower.includes("canggih")) {
      replyKey = "ai";
    } else if (lower.includes("varian") || lower.includes("modul") || lower.includes("tipe") || lower.includes("s-1") || lower.includes("s-2") || lower.includes("s-3") || lower.includes("s-4")) {
      replyKey = "varian";
    } else if (lower.includes("harga") || lower.includes("beli") || lower.includes("biaya") || lower.includes("kemitraan") || lower.includes("invest")) {
      replyKey = "harga";
    } else if (lower.includes("cara") || lower.includes("mulai") || lower.includes("tahap") || lower.includes("langkah")) {
      replyKey = "cara";
    } else if (lower.includes("simulasi") || lower.includes("masalah") || lower.includes("error") || lower.includes("peringatan") || lower.includes("alarm")) {
      replyKey = "simulasi";
    } else if (lower.includes("padi") || lower.includes("beras") || lower.includes("benih") || lower.includes("varietas") || lower.includes("crop")) {
      replyKey = "padi";
    }

    const responseText = sartoResponses[replyKey];

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "sarto", text: responseText }]);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(userInput);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end gap-3 pointer-events-none">
      {/* Speech Bubble / Chat Box Container */}
      <AnimatePresence>
        {bubbleOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`pointer-events-auto bg-white text-deep-forest shadow-2xl border border-deep-forest/10 relative flex flex-col transition-all duration-300 rounded-3xl ${
              chatMode 
                ? "w-[330px] h-[430px] rounded-br-none" 
                : "max-w-[280px] md:max-w-[320px] p-5 rounded-br-none"
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between border-b border-deep-forest/5 pb-2.5 mb-2.5 ${chatMode ? "px-5 pt-4" : ""}`}>
              <div className="flex items-center gap-2">
                {chatMode && (
                  <button 
                    onClick={() => setChatMode(false)}
                    className="p-1 rounded-full hover:bg-deep-forest/5 text-deep-forest/60 hover:text-deep-forest cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#008000]" />
                  <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-[#008000] flex items-center gap-1">
                    SARTO AI
                    <Sparkles className="w-3 h-3 text-golden-paddy fill-golden-paddy" />
                  </span>
                </div>
              </div>
              <button
                onClick={() => setBubbleOpen(false)}
                className="text-deep-forest/40 hover:text-deep-forest p-1 rounded-full hover:bg-deep-forest/5 transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* CHAT MODE */}
            {chatMode ? (
              <div className="flex-1 flex flex-col overflow-hidden px-5 pb-5">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === "user" ? "ml-auto items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-2xl text-[11px] leading-relaxed font-semibold shadow-sm ${
                          msg.sender === "user"
                            ? "bg-[#054E00] text-white rounded-tr-none"
                            : "bg-[#FAF9F5] text-deep-forest rounded-tl-none border border-deep-forest/5"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n/g, "<br />")
                        }}
                      />
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex flex-col items-start max-w-[85%]">
                      <div className="bg-[#FAF9F5] p-3 rounded-2xl rounded-tl-none border border-deep-forest/5 flex items-center gap-1">
                        <span className="text-[10px] font-bold text-deep-forest/40 animate-pulse">SARTO sedang mengetik</span>
                        <div className="flex gap-0.5">
                          <span className="w-1 h-1 rounded-full bg-[#008000] animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1 h-1 rounded-full bg-[#008000] animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1 h-1 rounded-full bg-[#008000] animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Reply Chips */}
                <div className="flex gap-1.5 overflow-x-auto py-2.5 select-none shrink-0 scrollbar-none">
                  <button
                    onClick={() => handleSendMessage("Apa itu teknologi NFT?")}
                    className="shrink-0 px-2.5 py-1.5 rounded-full border border-deep-forest/10 bg-white hover:bg-deep-forest/5 text-[9px] font-extrabold uppercase tracking-wider text-deep-forest/75 transition-all cursor-pointer shadow-sm"
                  >
                    🌱 Apa itu NFT?
                  </button>
                  <button
                    onClick={() => handleSendMessage("Bagaimana AI memantau?")}
                    className="shrink-0 px-2.5 py-1.5 rounded-full border border-deep-forest/10 bg-white hover:bg-deep-forest/5 text-[9px] font-extrabold uppercase tracking-wider text-deep-forest/75 transition-all cursor-pointer shadow-sm"
                  >
                    🤖 Monitor AI
                  </button>
                  <button
                    onClick={() => handleSendMessage("Berapa varian modul?")}
                    className="shrink-0 px-2.5 py-1.5 rounded-full border border-deep-forest/10 bg-white hover:bg-deep-forest/5 text-[9px] font-extrabold uppercase tracking-wider text-deep-forest/75 transition-all cursor-pointer shadow-sm"
                  >
                    📦 Varian Modul
                  </button>
                  <button
                    onClick={() => handleSendMessage("Varietas padi apa saja?")}
                    className="shrink-0 px-2.5 py-1.5 rounded-full border border-deep-forest/10 bg-white hover:bg-deep-forest/5 text-[9px] font-extrabold uppercase tracking-wider text-deep-forest/75 transition-all cursor-pointer shadow-sm"
                  >
                    🌾 Jenis Padi
                  </button>
                </div>

                {/* Input Form */}
                <div className="flex gap-2 items-center pt-2 border-t border-deep-forest/5 shrink-0">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tanyakan sesuatu pada SARTO..."
                    className="flex-1 min-w-0 bg-[#FAF9F5] border border-deep-forest/5 px-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#008000] text-deep-forest placeholder:text-deep-forest/30"
                  />
                  <button
                    onClick={() => handleSendMessage(userInput)}
                    className="w-9 h-9 rounded-xl bg-[#054E00] text-white flex items-center justify-center hover:bg-[#054E00]/90 transition-colors cursor-pointer shrink-0"
                    aria-label="Kirim"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* TIPS MODE */
              <div className="pr-4 mt-0.5">
                <p className="text-deep-forest/85 text-xs font-semibold leading-relaxed">{activeData.text}</p>
                <button
                  onClick={() => setChatMode(true)}
                  className="mt-3.5 w-full py-2.5 px-4 rounded-xl bg-[#054E00] text-young-rice hover:bg-[#054E00]/95 font-extrabold uppercase tracking-widest text-[9px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-3 h-3" />
                  Tanya SARTO (AI Chat)
                </button>
              </div>
            )}

            {/* Speach bubble small tail */}
            <div className="absolute -bottom-2.5 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-white" />
            <div className="absolute -bottom-[11px] right-0 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-deep-forest/10 -z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mascot Button */}
      <motion.button
        onClick={() => setBubbleOpen(!bubbleOpen)}
        className="pointer-events-auto relative group flex items-center justify-center cursor-pointer transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.8 }}
      >
        {/* Glowing aura background */}
        <div className="absolute inset-0 bg-young-rice/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />

        {/* Mascot Avatar Container */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-ivory-rice rounded-full border-2 border-deep-forest shadow-2xl overflow-hidden flex items-center justify-center p-1.5 transition-colors duration-300">
          <Image
            src={activeData.mascot}
            alt="SANTARA Mascot SARTO"
            fill
            className="object-contain mt-1 translate-y-0.5"
            sizes="(max-w-768px) 64px, 80px"
          />
        </div>

        {/* Mini bubble toggle indicator */}
        {!bubbleOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-deep-forest border border-ivory-rice text-young-rice flex items-center justify-center shadow-lg"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
