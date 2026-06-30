import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MascotAssistant from "@/components/MascotAssistant";
import { SimulationProvider } from "@/context/SimulationContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "SANTARA - Smart Agri-Nusantara Portable Greenhouse",
  description: "Membangun Ketahanan Pangan Indonesia Emas 2045 dengan teknologi greenhouse modular berbasis AI dan IoT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ivory-rice text-deep-forest font-sans antialiased selection:bg-deep-forest selection:text-ivory-rice flex flex-col justify-between">
        <SimulationProvider>
          <Navbar />
          <div className="flex-1 flex flex-col pt-[80px]">
            {children}
          </div>
          <Footer />
          <MascotAssistant />
        </SimulationProvider>
      </body>
    </html>
  );
}
