"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [buka, setBuka] = useState(false);

  useEffect(() => setBuka(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = buka ? "hidden" : "";
    const tutup = (e) => e.key === "Escape" && setBuka(false);
    window.addEventListener("keydown", tutup);
    return () => window.removeEventListener("keydown", tutup);
  }, [buka]);

  const aktif = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-black bg-kertas">
      <nav aria-label="Navigasi utama" className="mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5">
        <Link href="/" className="justify-self-start text-lg font-extrabold tracking-tight">
          BEM UI
        </Link>
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={aktif(l.href) ? "page" : undefined}
                className={`relative block py-4 text-sm ${aktif(l.href) ? "font-semibold" : "text-abu hover:text-black"}`}
              >
                {l.label}
                {aktif(l.href) && <span className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-black" />}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setBuka(true)}
          aria-label="Buka menu"
          aria-expanded={buka}
          className="col-start-3 justify-self-end p-2 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {buka && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" aria-label="Tutup menu" onClick={() => setBuka(false)} className="absolute inset-0 bg-black/50" />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col border-l border-black bg-kertas">
            <div className="flex h-14 items-center justify-between border-b border-black px-5">
              <span className="text-lg font-extrabold">BEM UI</span>
              <button type="button" onClick={() => setBuka(false)} aria-label="Tutup menu" className="p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.href} className="border-b border-garis">
                  <Link
                    href={l.href}
                    aria-current={aktif(l.href) ? "page" : undefined}
                    className={`block px-5 py-4 text-2xl ${aktif(l.href) ? "font-extrabold" : "font-medium text-abu"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
