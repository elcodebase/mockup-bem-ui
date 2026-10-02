"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const putus = () => setOffline(true);
    const sambung = () => {
      setOffline(false);
      router.refresh();
    };
    setOffline(!navigator.onLine);
    window.addEventListener("offline", putus);
    window.addEventListener("online", sambung);
    return () => {
      window.removeEventListener("offline", putus);
      window.removeEventListener("online", sambung);
    };
  }, [router]);

  if (!offline) return null;
  return (
    <div role="status" className="bg-black px-5 py-2 text-center text-sm text-white">
      Koneksi internet terputus. Halaman dimuat ulang otomatis saat koneksi kembali.
    </div>
  );
}
