"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Instagram, Link2, MessageCircle, Twitter, X } from "lucide-react";

export default function ShareButtons({ judul, ringkas = false, className = "" }) {
  const [tersalin, setTersalin] = useState(false);
  const [toast, setToast] = useState("");
  const [manual, setManual] = useState("");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!manual) return;
    const tutup = (e) => e.key === "Escape" && setManual("");
    window.addEventListener("keydown", tutup);
    return () => window.removeEventListener("keydown", tutup);
  }, [manual]);

  const salin = async (pesan) => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setTersalin(true);
      setToast(pesan);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setTersalin(false);
        setToast("");
      }, 2000);
    } catch {
      setManual(url);
    }
  };

  const bukaTab = (url) => window.open(url, "_blank", "noopener,noreferrer");

  const tombol = [
    {
      label: "Twitter/X",
      Icon: Twitter,
      aksi: () => {
        const u = new URL("https://twitter.com/intent/tweet");
        u.searchParams.set("text", judul);
        u.searchParams.set("url", window.location.href);
        u.searchParams.set("via", "BEM_UI");
        bukaTab(u.toString());
      }
    },
    {
      label: "WhatsApp",
      Icon: MessageCircle,
      aksi: () => bukaTab(`https://wa.me/?text=${encodeURIComponent(`${judul} - ${window.location.href}`)}`)
    },
    {
      label: "Instagram",
      Icon: Instagram,
      aksi: async () => {
        if (navigator.share) {
          try {
            await navigator.share({ title: judul, url: window.location.href });
          } catch {}
          return;
        }
        salin("Link disalin. Tempel di story atau bio Instagram.");
      }
    },
    {
      label: tersalin ? "Tersalin!" : "Salin link",
      Icon: tersalin ? Check : Link2,
      aksi: () => salin("Link berhasil disalin!"),
      sukses: tersalin
    }
  ];

  return (
    <>
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {tombol.map(({ label, Icon, aksi, sukses }) => (
          <button
            key={label}
            type="button"
            onClick={aksi}
            aria-label={ringkas ? `Bagikan lewat ${label}` : undefined}
            className={`flex items-center gap-2 border border-black px-3 py-2 text-sm transition hover:bg-permukaan2 ${ringkas ? "flex-1 justify-center" : ""} ${sukses ? "text-green-700" : ""}`}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {!ringkas && label}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="pointer-events-none fixed bottom-20 left-1/2 z-50 -translate-x-1/2 md:bottom-6">
        {toast && <p className="bg-black px-4 py-2 text-sm text-white">{toast}</p>}
      </div>

      {manual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="judul-salin">
          <button type="button" aria-label="Tutup" onClick={() => setManual("")} className="absolute inset-0 bg-black/50" />
          <div className="relative w-full max-w-md border border-black bg-kertas p-5">
            <div className="flex items-start justify-between gap-4">
              <h2 id="judul-salin" className="font-bold">
                Salin link secara manual
              </h2>
              <button type="button" onClick={() => setManual("")} aria-label="Tutup">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-abu">Browser ini tidak mengizinkan penyalinan otomatis. Pilih link di bawah lalu salin.</p>
            <input
              readOnly
              autoFocus
              value={manual}
              onFocus={(e) => e.target.select()}
              className="mt-4 w-full border border-black bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>
      )}
    </>
  );
}
