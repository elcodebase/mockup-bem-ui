"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { KATEGORI, formatTanggal, labelKategori, tagSlug } from "@/lib/news";
import ArticleCard from "./ArticleCard";
import Gambar from "./Gambar";

const PER_MUAT = 6;

function kelompokkan(daftar) {
  const hasil = [];
  for (let i = 0; i < daftar.length; i += PER_MUAT) hasil.push(daftar.slice(i, i + PER_MUAT));
  return hasil;
}

export default function NewsBrowser({ artikel, tags }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const kategori = params.get("kategori") ?? "";
  const tag = params.get("tag") ?? "";
  const [q, setQ] = useState(params.get("q") ?? "");
  const [jumlah, setJumlah] = useState(PER_MUAT);

  const kata = q.trim().toLowerCase();

  useEffect(() => setJumlah(PER_MUAT), [kategori, tag, kata]);

  const setParam = (kunci, nilai) => {
    const p = new URLSearchParams(params.toString());
    if (nilai) p.set(kunci, nilai);
    else p.delete(kunci);
    const s = p.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const hapusSemua = () => {
    setQ("");
    router.replace(pathname, { scroll: false });
  };

  const jumlahPerKategori = useMemo(() => {
    const m = {};
    artikel.forEach((a) => (m[a.kategori] = (m[a.kategori] ?? 0) + 1));
    return m;
  }, [artikel]);

  const hasil = useMemo(
    () =>
      artikel.filter(
        (a) =>
          (!kategori || a.kategori === kategori) &&
          (!tag || a.tags.some((t) => tagSlug(t) === tag)) &&
          (!kata || a.judul.toLowerCase().includes(kata) || a.teks.includes(kata))
      ),
    [artikel, kategori, tag, kata]
  );

  const adaFilter = Boolean(kategori || tag || kata);
  const unggulan = adaFilter ? null : artikel.find((a) => a.featured) ?? artikel[0];
  const daftar = unggulan ? hasil.filter((a) => a.slug !== unggulan.slug) : hasil;
  const tampil = daftar.slice(0, jumlah);
  const tagAktif = tags.find((t) => t.slug === tag);
  const maks = Math.max(...tags.map((t) => t.jumlah));

  const pesanKosong = kata
    ? `Tidak ditemukan artikel untuk “${q.trim()}”. Coba kata lain, misalnya “UKT” atau “beasiswa”.`
    : kategori
      ? "Belum ada artikel dalam kategori ini."
      : "Belum ada artikel dengan topik ini.";

  return (
    <>
      <div role="search" className="relative mt-8 max-w-xl">
        <label htmlFor="cari" className="sr-only">
          Cari berita atau artikel
        </label>
        <input
          id="cari"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari berita atau artikel"
          className="w-full border border-black bg-permukaan py-3 pl-4 pr-11 text-sm placeholder:text-abu"
        />
        {q ? (
          <button type="button" onClick={() => setQ("")} aria-label="Hapus pencarian" className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="h-4 w-4" />
          </button>
        ) : (
          <Search aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        )}
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto border-b border-garis pb-6" role="group" aria-label="Filter kategori">
        {[{ slug: "", label: "Semua" }, ...KATEGORI].map((k) => {
          const aktif = kategori === k.slug;
          const kosong = k.slug && !jumlahPerKategori[k.slug];
          return (
            <button
              key={k.slug || "semua"}
              type="button"
              disabled={kosong}
              aria-pressed={aktif}
              onClick={() => setParam("kategori", k.slug)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${aktif ? "border-black bg-black text-white" : "border-black hover:bg-permukaan"}`}
            >
              {k.label}
            </button>
          );
        })}
      </div>

      {adaFilter && (
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm" aria-live="polite">
          <span>
            {hasil.length} artikel
            {tagAktif && <> dengan topik <strong>#{tagAktif.label}</strong></>}
            {kategori && <> di <strong>{labelKategori(kategori)}</strong></>}
          </span>
          <button type="button" onClick={hapusSemua} className="underline">
            Hapus semua filter
          </button>
        </div>
      )}

      {unggulan && (
        <Link href={`/news/${unggulan.slug}`} className="group mt-8 grid border border-black bg-permukaan md:grid-cols-3">
          <Gambar src={unggulan.cover_url} alt="" prioritas className="aspect-[16/10] w-full border-b border-black md:col-span-2 md:aspect-auto md:h-full md:min-h-[360px] md:border-b-0 md:border-r" />
          <div className="flex flex-col p-6 md:p-8">
            <span className="self-start border border-black px-2 py-0.5 text-xs">{labelKategori(unggulan.kategori)}</span>
            <h2 className="mt-4 text-3xl font-black leading-[1.05] tracking-tight group-hover:underline" style={{ fontStretch: "85%" }}>
              {unggulan.judul}
            </h2>
            <time dateTime={unggulan.tanggal} className="mt-3 text-xs text-abu">
              {formatTanggal(unggulan.tanggal)}
            </time>
            <p className="mt-4 text-sm leading-relaxed">{unggulan.excerpt}</p>
            <span className="mt-6 text-sm font-semibold underline">Baca selengkapnya</span>
          </div>
        </Link>
      )}

      {tampil.length === 0 && (adaFilter || !unggulan) ? (
        <div className="mt-8 border border-dashed border-black px-6 py-16 text-center">
          <p className="mx-auto max-w-md">{pesanKosong}</p>
          <button type="button" onClick={hapusSemua} className="mt-4 bg-black px-4 py-2 text-sm text-white">
            Lihat semua artikel
          </button>
        </div>
      ) : (
        kelompokkan(tampil).map((grup, i) => (
          <div key={i} className="mt-8 space-y-6">
            {grup.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {grup.slice(0, 2).map((a) => (
                  <ArticleCard key={a.slug} artikel={a} varian="besar" />
                ))}
              </div>
            )}
            {grup.length > 2 && (
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {grup.slice(2).map((a) => (
                  <ArticleCard key={a.slug} artikel={a} />
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {tag && hasil.length > 0 && hasil.length < 3 && (
        <p className="mt-6 text-sm">
          Cari juga di kategori lain:{" "}
          {KATEGORI.filter((k) => k.slug !== kategori).map((k, i) => (
            <span key={k.slug}>
              {i > 0 && ", "}
              <button type="button" onClick={() => setParam("kategori", k.slug)} className="underline">
                {k.label}
              </button>
            </span>
          ))}
        </p>
      )}

      {daftar.length > jumlah && (
        <div className="mt-10 text-center">
          <button type="button" onClick={() => setJumlah((n) => n + PER_MUAT)} className="border border-black px-10 py-3 text-sm font-semibold hover:bg-black hover:text-white">
            Muat lebih banyak
          </button>
        </div>
      )}

      <section aria-labelledby="judul-topik" className="mt-16 border-t border-garis pt-8">
        <h2 id="judul-topik" className="text-sm text-abu">
          Topik populer
        </h2>
        <ul className="mt-4 flex flex-wrap items-center gap-2">
          {tags.map((t) => {
            const aktif = t.slug === tag;
            const r = t.jumlah / maks;
            const ukuran = r > 0.75 ? "text-2xl px-4 py-2" : r > 0.4 ? "text-lg px-3 py-1.5" : "text-sm px-2.5 py-1";
            return (
              <li key={t.slug}>
                <button
                  type="button"
                  aria-pressed={aktif}
                  onClick={() => setParam("tag", aktif ? "" : t.slug)}
                  className={`border border-black font-semibold transition ${ukuran} ${aktif ? "bg-black text-white" : "hover:bg-permukaan"}`}
                >
                  #{t.label}
                  <span className="sr-only">, {t.jumlah} artikel</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
