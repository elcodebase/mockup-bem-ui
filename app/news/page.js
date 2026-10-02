import { Suspense } from "react";
import NewsBrowser from "@/components/NewsBrowser";
import { getArticles } from "@/lib/data";
import { tagSlug, teksPolos } from "@/lib/news";

export const revalidate = 60;

export const metadata = {
  title: "Berita & Artikel",
  description: "Publikasi resmi BEM UI 2026: kajian strategis, siaran pers, opini, dan kabar UI."
};

export default async function NewsPage() {
  const semua = await getArticles();
  const artikel = semua.map(({ konten, ...a }) => ({ ...a, teks: teksPolos({ konten }).toLowerCase() }));
  const hitung = {};
  semua.forEach((a) => a.tags.forEach((t) => (hitung[t] = (hitung[t] ?? 0) + 1)));
  const tags = Object.entries(hitung)
    .map(([label, jumlah]) => ({ label, slug: tagSlug(label), jumlah }))
    .sort((a, b) => b.jumlah - a.jumlah || a.label.localeCompare(b.label));

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-12">
      <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl" style={{ fontStretch: "80%" }}>
        Berita & Artikel
      </h1>
      <p className="mt-2 text-abu">Publikasi resmi BEM UI 2026</p>
      <Suspense fallback={<div className="mt-8 h-96 animate-pulse bg-permukaan2" aria-busy="true" />}>
        <NewsBrowser artikel={artikel} tags={tags} />
      </Suspense>
    </div>
  );
}
