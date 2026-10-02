"use client";

import { useGambar } from "./Gambar";

const ukuran = {
  sm: "h-16 w-16 text-base",
  md: "h-24 w-24 text-xl",
  lg: "h-36 w-36 text-3xl"
};

function inisial(nama) {
  return nama
    .split(" ")
    .slice(0, 2)
    .map((k) => k[0])
    .join("")
    .toUpperCase();
}

export default function Avatar({ src, nama, size = "md" }) {
  const { ref, gagal, onError } = useGambar(src);
  const kelas = `${ukuran[size]} shrink-0 rounded-full border border-black`;
  if (gagal) {
    return (
      <div aria-hidden className={`${kelas} flex items-center justify-center bg-permukaan2 font-bold`}>
        {inisial(nama)}
      </div>
    );
  }
  return <img ref={ref} src={src} alt="" onError={onError} loading="lazy" className={`${kelas} object-cover`} />;
}
