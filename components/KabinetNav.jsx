"use client";

import { useEffect, useState } from "react";

export default function KabinetNav({ sections }) {
  const [aktif, setAktif] = useState(sections[0].id);

  useEffect(() => {
    const amati = new IntersectionObserver(
      (entri) => entri.forEach((e) => e.isIntersecting && setAktif(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) amati.observe(el);
    });
    return () => amati.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Bagian halaman kabinet" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <ol className="flex flex-col gap-1 border border-black bg-permukaan p-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              title={s.label}
              aria-current={aktif === s.id ? "true" : undefined}
              className={`flex h-8 w-8 items-center justify-center text-xs tabular-nums ${aktif === s.id ? "bg-black text-white" : "text-abu hover:bg-permukaan2 hover:text-black"}`}
            >
              {s.nomor}
              <span className="sr-only"> {s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
