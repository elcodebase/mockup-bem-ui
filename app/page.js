import Link from "next/link";
import OrbitalHero from "@/components/OrbitalHero";
import StatsBar from "@/components/StatsBar";
import DivisiCard from "@/components/DivisiCard";
import ArticleCard from "@/components/ArticleCard";
import { getArticles, getHome, getStats, getStruktur } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [home, stats, struktur, artikel] = await Promise.all([getHome(), getStats(), getStruktur(), getArticles()]);
  const preview = home.preview_kabinet.map((s) => struktur.find((d) => d.slug === s)).filter(Boolean);
  const youtube = process.env.NEXT_PUBLIC_YOUTUBE_ID;

  return (
    <>
      <OrbitalHero foto={home.foto_proker} />
      <StatsBar stats={stats} />

      <section aria-labelledby="judul-kabinet" className="border-b border-black">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_1.6fr] md:items-center md:py-24">
          <div>
            <h2 id="judul-kabinet" className="text-4xl font-black tracking-tight md:text-5xl" style={{ fontStretch: "85%" }}>
              Kabinet Kami
            </h2>
            <p className="mt-3 max-w-sm text-abu">Mewujudkan aspirasi mahasiswa lewat {struktur.length} departemen, biro, dan kemenkoan. Temukan divisi yang kamu minati.</p>
            <Link href="/kabinet" className="mt-6 inline-block bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-aksen">
              Lihat Kabinet
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {preview.map((d) => (
              <li key={d.slug}>
                <DivisiCard divisi={d} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="judul-berita" className="border-b border-black bg-permukaan">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <h2 id="judul-berita" className="text-center text-4xl font-black tracking-tight md:text-5xl" style={{ fontStretch: "85%" }}>
            Berita Terbaru
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {artikel.slice(0, 3).map((a) => (
              <li key={a.slug}>
                <ArticleCard artikel={a} />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link href="/news" className="inline-block border border-black px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white">
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>

      {youtube && (
        <section aria-labelledby="judul-video" className="border-b border-black bg-black text-white">
          <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
            <h2 id="judul-video" className="text-3xl font-black tracking-tight md:text-4xl">
              Mengenal BEM UI 2026
            </h2>
            <div className="mt-8 aspect-video border border-white/30">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtube}`}
                title="Video company profile BEM UI 2026"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
