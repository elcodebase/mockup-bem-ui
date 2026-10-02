"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";

export function useGambar(src) {
  const ref = useRef(null);
  const [gagal, setGagal] = useState(!src);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setGagal(true);
  }, []);
  return { ref, gagal, onError: () => setGagal(true) };
}

export default function Gambar({ src, alt, className = "", label, gelap = false, prioritas = false }) {
  const { ref, gagal, onError } = useGambar(src);
  if (gagal) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center ${gelap ? "bg-neutral-800 text-white/50" : "bg-permukaan2 text-abu"} ${className}`}
      >
        {label ? <span className="px-3 text-center text-xs leading-snug">{label}</span> : <ImageIcon className="h-6 w-6" aria-hidden />}
      </div>
    );
  }
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={prioritas ? "eager" : "lazy"}
      onError={onError}
      className={`object-cover ${className}`}
    />
  );
}
