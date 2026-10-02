"use client";

import { useEffect, useRef } from "react";
import Gambar from "./Gambar";
import Logo from "./Logo";

export default function OrbitalHero({ foto }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const langkah = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      raf = Math.abs(tx - x) > 0.001 || Math.abs(ty - y) > 0.001 ? requestAnimationFrame(langkah) : 0;
    };
    const gerak = (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(langkah);
    };
    el.addEventListener("pointermove", gerak);
    return () => {
      el.removeEventListener("pointermove", gerak);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      style={{ "--px": 0, "--py": 0 }}
      className="relative isolate h-[calc(100svh-3.5rem)] min-h-[600px] overflow-hidden bg-black text-white"
    >
      {foto.map((f, i) => (
        <figure
          key={f.judul}
          className={`absolute ${i > 3 ? "hidden md:block" : ""}`}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `clamp(92px, ${f.w}vw, ${f.w * 15}px)`,
            transform: `translate(-50%, -50%) translate3d(calc(var(--px) * ${f.d}px), calc(var(--py) * ${f.d}px), 0)`
          }}
        >
          <div className="animate-melayang motion-reduce:animate-none" style={{ animationDelay: `${i * -1.7}s`, animationDuration: `${9 + (i % 4) * 2}s` }}>
            <div className="border border-white/25 bg-neutral-900 p-1.5" style={{ transform: `rotate(${f.r}deg)` }}>
              <Gambar src={f.src} alt={`Dokumentasi ${f.judul}`} gelap prioritas={i < 4} className="aspect-[4/5] w-full" />
              <figcaption className="mt-1.5 truncate text-[11px] text-white/60">{f.judul}</figcaption>
            </div>
          </div>
        </figure>
      ))}

      <div className="pointer-events-none absolute left-1/2 top-[42%] w-40 -translate-x-1/2 -translate-y-1/2 sm:w-52 lg:w-64">
        <Logo className="h-auto w-full" />
      </div>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-6 sm:pb-8">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-md text-sm text-white/70 sm:text-base">Kabinet TerusTerang, Badan Eksekutif Mahasiswa Universitas Indonesia 2026</p>
          <h1 className="mt-2 font-black leading-[0.85] tracking-tight" style={{ fontStretch: "70%", fontSize: "clamp(3.25rem, 13vw, 12rem)" }}>
            <span className="sr-only">BEM UI 2026, Kabinet </span>#TerusTerang
          </h1>
        </div>
      </div>
    </section>
  );
}
