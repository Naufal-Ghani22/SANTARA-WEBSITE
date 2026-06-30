import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-deep-forest text-ivory-rice py-16 border-t border-young-rice/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-white/10">
          {/* Logo and Brand Statement */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9">
                <Image
                  src="/images/SANTARA LOGO.png"
                  alt="SANTARA Logo"
                  fill
                  className="object-contain filter brightness-0 invert"
                  sizes="36px"
                />
              </div>
              <span className="font-display font-black text-lg tracking-widest text-white">SANTARA</span>
            </div>
            <p className="text-xs text-ivory-rice/70 leading-relaxed">
              Arsitektur Greenhouse Portabel Berbasis AI & IoT Terintegrasi untuk Mewujudkan Kemandirian Pangan Indonesia Emas 2045.
            </p>
          </div>

          {/* Quick Target Links / Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold text-young-rice uppercase tracking-widest block mb-2">Visi Nasional</span>
              <span className="text-sm font-extrabold text-white block">Ketahanan Pangan 100%</span>
            </div>
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold text-young-rice uppercase tracking-widest block mb-2">Target Pelaksanaan</span>
              <span className="text-sm font-extrabold text-white block">500 Desa Mandiri 2028</span>
            </div>
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold text-young-rice uppercase tracking-widest block mb-2">Teknologi</span>
              <span className="text-sm font-extrabold text-white block">Edge AI & IoT Sync</span>
            </div>
          </div>
        </div>

        {/* Copyright and Metadata */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-ivory-rice/50 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} SANTARA AGRI-GREENHOUSE. HAK CIPTA DILINDUNGI.</span>
          <div className="flex gap-4">
            <a href="#hero" className="hover:text-young-rice transition-colors">Kembali ke Atas</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
