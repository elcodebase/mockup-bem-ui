import { Linkedin } from "lucide-react";
import Panel from "@/components/Panel";
import KabinetNav from "@/components/KabinetNav";
import DivisiCard from "@/components/DivisiCard";
import Gambar from "@/components/Gambar";
import Logo from "@/components/Logo";
import { getKabinet, getSemuaDivisi, getStruktur } from "@/lib/data";

export const metadata = {
  title: "Kabinet",
  description: "Kenali BEM UI 2026, Kabinet TerusTerang: visi dan misi, kata Ketua BEM, filosofi logo, struktur organisasi, dan profil fungsionaris."
};

const SECTIONS = [
  { id: "tentang", nomor: "01", label: "Tentang" },
  { id: "visi-misi", nomor: "02", label: "Visi & Misi" },
  { id: "identitas", nomor: "03", label: "Identitas Kabinet" },
  { id: "kata-kabem", nomor: "04", label: "Kata Kabem" },
  { id: "filosofi-logo", nomor: "05", label: "Filosofi Logo" },
  { id: "struktur", nomor: "06", label: "Struktur Organisasi" },
  { id: "fungsionaris", nomor: "07", label: "Fungsionaris" }
];

const s = Object.fromEntries(SECTIONS.map((x) => [x.id, x]));

function Judul({ id, children, className = "" }) {
  return (
    <h2 id={`${id}-judul`} className={`text-4xl font-black leading-[0.95] tracking-tight md:text-6xl ${className}`} style={{ fontStretch: "80%" }}>
      {children}
    </h2>
  );
}

function Paragraf({ teks, className = "" }) {
  return teks.split("\n\n").map((p) => (
    <p key={p.slice(0, 24)} className={className}>
      {p}
    </p>
  ));
}

export default async function KabinetPage() {
  const [kabinet, struktur, semuaDivisi] = await Promise.all([getKabinet(), getStruktur(), getSemuaDivisi()]);
  const grup = (type) => struktur.filter((d) => d.type === type);
  const bph = semuaDivisi.find((d) => d.type === "BPH");
  const pimpinan = semuaDivisi
    .filter((d) => d.type !== "BPH")
    .map((d) => ({ ...d.anggota[0], unit: d.nama }));
  const fungsionaris = [...(bph?.anggota.map((a) => ({ ...a, unit: bph.nama })) ?? []), ...pimpinan];

  return (
    <>
      <KabinetNav sections={SECTIONS} />

      <Panel {...s.tentang} tumpuk className="bg-kertas">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 id="tentang-judul" className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl" style={{ fontStretch: "80%" }}>
              Tentang BEM UI
            </h1>
            <div className="mt-6 max-w-prose space-y-4 text-lg leading-relaxed">
              <Paragraf teks={kabinet.deskripsi} />
            </div>
          </div>
          <Gambar src={kabinet.foto_tentang_url} alt="Kegiatan mahasiswa Universitas Indonesia" prioritas className="aspect-[4/5] w-full border border-black md:aspect-[3/4]" />
        </div>
      </Panel>

      <Panel {...s["visi-misi"]} className="bg-permukaan">
        <Judul id="visi-misi">Visi & Misi Kabinet TerusTerang</Judul>
        <p className="mt-6 max-w-3xl font-serif text-2xl leading-snug md:text-3xl">{kabinet.visi}</p>
        <ul className="mt-10 grid grid-cols-1 border-y border-black sm:grid-cols-3" aria-label="Nilai utama">
          {kabinet.nilai_utama.map((n) => (
            <li key={n} className="border-black py-6 text-3xl font-black tracking-tight sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 md:text-4xl" style={{ fontStretch: "75%" }}>
              {n}
            </li>
          ))}
        </ul>
        <h3 className="mt-12 text-xl font-bold">Misi</h3>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {kabinet.misi.map((m, i) => (
            <li key={m} className="flex gap-4 border border-black bg-kertas p-5">
              <span className="text-2xl font-black tabular-nums text-abu">{i + 1}</span>
              <span className="text-sm leading-relaxed">{m}</span>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel {...s.identitas} tumpuk className="bg-kertas">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex aspect-square items-center justify-center border border-black bg-permukaan p-12">
            <Logo className="h-auto w-full max-w-xs" />
          </div>
          <div>
            <Judul id="identitas">Identitas Kabinet</Judul>
            <div className="mt-6 max-w-prose space-y-4 text-lg leading-relaxed">
              <Paragraf teks={kabinet.penjelasan_kabinet} />
            </div>
          </div>
        </div>
      </Panel>

      <Panel {...s["kata-kabem"]} tumpuk className="bg-black text-white">
        <figure className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <Gambar src={kabinet.kata_kabem.foto_url} alt={`Foto ${kabinet.kata_kabem.nama}`} gelap className="aspect-[3/4] w-full border border-white/30" />
          <div>
            <h2 id="kata-kabem-judul" className="text-sm text-white/60">
              Kata Kabem
            </h2>
            <blockquote className="mt-4 text-3xl font-black leading-[1.05] tracking-tight md:text-5xl" style={{ fontStretch: "80%" }}>
              “{kabinet.kata_kabem.kutipan}”
            </blockquote>
            <figcaption className="mt-8">
              <span className="block font-semibold">{kabinet.kata_kabem.nama}</span>
              <span className="text-sm text-white/60">{kabinet.kata_kabem.jabatan}</span>
            </figcaption>
          </div>
        </figure>
      </Panel>

      <Panel {...s["filosofi-logo"]} tumpuk className="bg-permukaan">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Judul id="filosofi-logo">Filosofi Logo</Judul>
            <Logo className="mt-8 h-auto w-full max-w-[16rem]" />
          </div>
          <div>
            <p className="max-w-prose text-lg leading-relaxed">{kabinet.filosofi_logo}</p>
            <dl className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {kabinet.elemen_logo.map((e) => (
                <div key={e.elemen} className="border-t border-black py-4">
                  <dt className="font-bold">{e.elemen}</dt>
                  <dd className="mt-1 text-sm text-abu">{e.makna}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Panel>

      <Panel {...s.struktur} className="bg-kertas">
        <Judul id="struktur">Struktur Organisasi</Judul>
        <p className="mt-4 max-w-prose text-abu">Pilih salah satu unit untuk melihat tugas, anggota, dan program kerjanya.</p>
        <div className="mt-10 space-y-10">
          {grup("BPH").map((d) => (
            <DivisiCard key={d.slug} divisi={d} besar />
          ))}
          {[
            { type: "Kemenkoan", judul: "Kemenkoan", kolom: "sm:grid-cols-2" },
            { type: "Departemen", judul: "Departemen", kolom: "grid-cols-2 lg:grid-cols-3" },
            { type: "Biro", judul: "Biro", kolom: "grid-cols-2 lg:grid-cols-3" }
          ].map((g) => (
            <div key={g.type}>
              <h3 className="mb-3 text-sm font-semibold text-abu">{g.judul}</h3>
              <ul className={`grid gap-3 ${g.kolom}`}>
                {grup(g.type).map((d) => (
                  <li key={d.slug}>
                    <DivisiCard divisi={d} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      <Panel {...s.fungsionaris} className="bg-permukaan">
        <Judul id="fungsionaris">Fungsionaris</Judul>
        <p className="mt-4 max-w-prose text-abu">Pengurus harian dan pimpinan setiap unit BEM UI 2026.</p>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fungsionaris.map((f) => (
            <li key={`${f.unit}-${f.nama}`} className="border border-black bg-kertas">
              <Gambar src={f.foto_url} alt={`Foto ${f.nama}`} className="aspect-[4/5] w-full border-b border-black" />
              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <p className="font-bold leading-snug">{f.nama}</p>
                  <p className="text-sm">{f.jabatan}</p>
                  <p className="text-xs text-abu">{f.unit}</p>
                </div>
                {f.linkedin && (
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${f.nama}`} className="shrink-0 p-1 hover:text-aksen">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
