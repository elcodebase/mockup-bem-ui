import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { sosial } from "@/lib/site";

const kolom = [
  { judul: "Organisasi", links: [{ href: "/kabinet", label: "Tentang BEM UI" }, { href: "/kabinet#struktur", label: "Struktur kabinet" }] },
  { judul: "Informasi", links: [{ href: "/news", label: "Berita & artikel" }, { href: "/news?kategori=siaran-pers", label: "Siaran pers" }] }
];

const ikon = [
  { href: sosial.instagram, label: "Instagram BEM UI", Icon: Instagram },
  { href: sosial.youtube, label: "YouTube BEM UI", Icon: Youtube },
  { href: sosial.twitter, label: "Twitter/X BEM UI", Icon: Twitter }
];

export default function Footer() {
  return (
    <footer className="border-t border-black bg-permukaan">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div>
          <Link href="/" className="text-2xl font-black tracking-tight">
            BEM UI
          </Link>
          <p className="mt-3 max-w-xs text-sm text-abu">Gedung Pusgiwa UI Lt. 1, Kampus UI Depok, Jawa Barat 16424.</p>
        </div>
        {kolom.map((k) => (
          <div key={k.judul}>
            <h2 className="text-sm font-semibold">{k.judul}</h2>
            <ul className="mt-3 space-y-2 text-sm text-abu">
              {k.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-black hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex gap-2 md:justify-end">
          {ikon.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center border border-black hover:bg-black hover:text-white"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-garis">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-abu">© 2026 BEM UI, Kabinet TerusTerang.</p>
      </div>
    </footer>
  );
}
