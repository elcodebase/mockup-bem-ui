import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import { supabase } from "@/lib/supabase";
import kabinet from "@/data/kabinet.json";
import struktur from "@/data/struktur.json";
import stats from "@/data/stats.json";
import home from "@/data/home.json";
import news from "@/data/news.json";

export async function getKabinet() {
  return kabinet;
}

export async function getStruktur() {
  return struktur;
}

export async function getHome() {
  return home;
}

export async function getStats() {
  const url = process.env.SIT_STATS_URL;
  if (url) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.ok) return { ...stats, ...(await res.json()) };
    } catch {}
  }
  if (supabase) {
    const { data } = await supabase.from("stats").select("mahasiswa_terwakili, proker_aktif, fungsionaris").eq("id", 1).maybeSingle();
    if (data) return data;
  }
  return stats;
}

export async function getDivisi(slug) {
  if (!struktur.some((d) => d.slug === slug)) return null;
  try {
    const file = path.join(process.cwd(), "data", "divisi", `${slug}.json`);
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return null;
  }
}

export async function getSemuaDivisi() {
  const semua = await Promise.all(struktur.map((d) => getDivisi(d.slug)));
  return semua.filter(Boolean);
}

export async function getTetanggaDivisi(slug) {
  const i = struktur.findIndex((d) => d.slug === slug);
  return {
    sebelumnya: i > 0 ? struktur[i - 1] : null,
    berikutnya: i >= 0 && i < struktur.length - 1 ? struktur[i + 1] : null
  };
}

const KOLOM_ARTIKEL = "slug, judul, kategori, tanggal, penulis, tags, featured, excerpt, cover_url, caption, konten";

const terurutLokal = [...news].sort((a, b) => b.tanggal.localeCompare(a.tanggal));

export const getArticles = cache(async () => {
  if (!supabase) return terurutLokal;
  const { data, error } = await supabase
    .from("articles")
    .select(KOLOM_ARTIKEL)
    .eq("published", true)
    .order("tanggal", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
});

export const getArticle = cache(async (slug) => {
  if (!supabase) return terurutLokal.find((a) => a.slug === slug) ?? null;
  const { data, error } = await supabase.from("articles").select(KOLOM_ARTIKEL).eq("slug", slug).eq("published", true).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
});

export async function getArtikelTerkait(artikel, jumlah = 3, kecuali = []) {
  const skor = (a) =>
    (a.kategori === artikel.kategori ? 1 : 0) + a.tags.filter((t) => artikel.tags.includes(t)).length * 2;
  const semua = await getArticles();
  return semua
    .filter((a) => a.slug !== artikel.slug && !kecuali.includes(a.slug))
    .map((a) => ({ a, s: skor(a) }))
    .sort((x, y) => y.s - x.s)
    .slice(0, jumlah)
    .map((x) => x.a);
}
