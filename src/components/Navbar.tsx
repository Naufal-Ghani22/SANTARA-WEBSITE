"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

// The 4 main routes in the center, and the 5th route (Kemitraan) on the right. Total = 5 navigation items.
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Teknologi", href: "/teknologi" },
  { name: "Produk", href: "/produk" },
  { name: "Digital Twin", href: "/dashboard" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("santara_role");
    setActiveRole(role);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between px-6 py-2.5 rounded-full transition-all duration-300 bg-white border border-deep-forest/5 shadow-md ${
            scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/90 backdrop-blur-sm"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/SANTARA LOGO.png"
                alt="SANTARA Logo"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg leading-none tracking-wider text-deep-forest">
                SANTARA
              </span>
              <span className="text-[9px] text-deep-forest/70 font-sans tracking-widest font-semibold uppercase mt-0.5">
                Agri-Greenhouse
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (4 center links) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-deep-forest text-ivory-rice shadow-sm"
                      : "text-deep-forest/80 hover:text-deep-forest hover:bg-young-rice/25"
                  }`}
                >
                  {link.href === "/dashboard" && activeRole
                    ? `Dashboard (${activeRole === "petani" ? "Petani" : "Teknisi"})`
                    : link.name}
                </Link>
              );
            })}
          </nav>

          {/* 5th Navigation Item (CTA Kemitraan) */}
          <div className="hidden lg:block">
            <Link
              href="/kontak"
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg ${
                pathname === "/kontak"
                  ? "bg-young-rice text-deep-forest border border-deep-forest/20"
                  : "bg-deep-forest text-ivory-rice hover:bg-deep-forest/90"
              }`}
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full text-deep-forest hover:bg-deep-forest/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-2 bg-ivory-rice/95 backdrop-blur-md rounded-3xl border border-deep-forest/10 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link, idx) => {
                const active = isActiveLink(link.href);
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center py-2.5 px-4 rounded-xl text-base font-semibold transition-all ${
                        active
                          ? "bg-deep-forest text-ivory-rice shadow"
                          : "text-deep-forest/90 hover:bg-young-rice/20 hover:text-deep-forest"
                      }`}
                    >
                      {link.href === "/dashboard" && activeRole
                        ? `Dashboard (${activeRole === "petani" ? "Petani" : "Teknisi"})`
                        : link.name}
                    </Link>
                  </motion.div>
                );
              })}
              {/* 5th item in mobile drawer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  href="/kontak"
                  onClick={() => setIsOpen(false)}
                  className={`mt-4 w-full py-3 block text-center rounded-xl font-bold text-sm uppercase tracking-widest shadow-md ${
                    pathname === "/kontak"
                      ? "bg-young-rice text-deep-forest"
                      : "bg-deep-forest text-ivory-rice hover:bg-deep-forest/95"
                  }`}
                >
                  Hubungi Kami
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
