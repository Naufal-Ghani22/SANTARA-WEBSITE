"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("santara_role");
    if (role === "petani") {
      router.replace("/dashboard/petani");
    } else if (role === "technician") {
      router.replace("/dashboard/technician");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-ivory-rice">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-4 border-deep-forest border-t-transparent animate-spin" />
        <span className="text-sm font-bold text-deep-forest/70 uppercase tracking-widest">Memeriksa Sesi...</span>
      </div>
    </div>
  );
}
