import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Gambar from "@/components/Gambar";
import ArticleCard from "@/components/ArticleCard";
import ShareButtons from "@/components/ShareButtons";
import { getArticle, getArticles, getArtikelTerkait } from "@/lib/data";
import { estimasiBaca, formatTanggal, labelKategori, tagSlug } from "@/lib/news";

export const revalidate = 60;

export async function generateStaticParams() {
  const artikel = await getArticles();
  return artikel.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const a = await getArticle(params.slug);
  if (!a) return { title: "Artikel tidak ditemukan" };
  return {
    title: a.judul,
    description: a.excerpt,
    alternates: { canonical: `/news/${a.slug}` },
    openGraph: { type: "article", title: a.judul, description: a.excerpt, publishedTime: a.tanggal, images: [a.cover_url] }
  };
}

function Blok({ blok, pertama }) {
  if (blok.type === "h2") return <h2 className="mt-10 font-display text-2xl font-bold">{blok.text}</h2>;
  if (blok.type === "quote")
    return (
      <blockquote className="my-8 border-l-4 border-black pl-5">
        <p className="text-xl italic">“{blok.text}”</p>
        {blok.cite && <cite className="mt-2 block font-display text-xs not-italic text-abu">{blok.cite}</cite>}
      </blockquote>
    );
  if (blok.type === "ul")
    return (
      <ul className="my-5 list-disc space-y-2 pl-6">
        {blok.items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    );
  return <p className={`mt-5 ${pertama ? "font-display text-lg font-semibold leading-relaxed" : ""}`}>{blok.text}</p>;
}

export default async function ArtikelPage({ params }) {
  const a = await getArticle(params.slug);
  if (!a) notFound();
  const terkait = await getArtikelTerkait(a, 3);
  const bacaJuga = await getArtikelTerkait(a, 3, terkait.map((t) => t.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.judul,
    datePublished: a.tanggal,
    author: { "@type": "Organization", name: a.penulis },
    publisher: { "@type": "Organization", name: "BEM UI 2026" },
    description: a.excerpt
  };

  return (
    <article className="pb-24 md:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl px-5 pt-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: labelKategori(a.kategori), href: `/news?kategori=${a.kategori}` }]} />

        <header className="mx-auto mt-10 max-w-3xl text-center">
          <Link href={`/news?kategori=${a.kategori}`} className="inline-block border border-black px-3 py-1 text-xs font-semibold hover:bg-black hover:text-white">
            {labelKategori(a.kategori)}
          </Link>
          <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight md:text-6xl" style={{ fontStretch: "85%" }}>
            {a.judul}
          </h1>
          <p className="mt-5 text-sm text-abu">
            Oleh {a.penulis}, <time dateTime={a.tanggal}>{formatTanggal(a.tanggal)}</time>. {estimasiBaca(a)} menit baca
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Tag">
            {a.tags.map((t) => (
              <li key={t}>
                <Link href={`/news?tag=${tagSlug(t)}`} className="border border-black px-2 py-0.5 text-xs hover:bg-black hover:text-white">
                  #{t}
                </Link>
              </li>
            ))}
          </ul>
          <ShareButtons judul={a.judul} className="mt-6 hidden justify-center md:flex" />
        </header>

        <figure className="mt-10">
          <Gambar src={a.cover_url} alt={a.caption} prioritas className="aspect-[16/9] w-full border border-black md:aspect-[21/9]" />
          <figcaption className="mt-2 text-center text-xs italic text-abu">{a.caption}</figcaption>
        </figure>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,680px)_1fr] lg:justify-between">
          <div>
            <div className="font-serif text-[1.075rem] leading-[1.75]">
              {a.konten.map((b, i) => (
                <Blok key={i} blok={b} pertama={i === 0} />
              ))}
            </div>
            <div className="mt-12 border-t border-garis pt-6">
              <h2 className="text-sm text-abu">Bagikan artikel ini</h2>
              <ShareButtons judul={a.judul} className="mt-3" />
            </div>
          </div>

          <aside aria-labelledby="artikel-terkait" className="lg:sticky lg:top-20 lg:self-start">
            <h2 id="artikel-terkait" className="border-b-2 border-black pb-2 text-lg font-bold">
              Artikel Terkait
            </h2>
            <ul className="mt-4 space-y-5">
              {terkait.map((t) => (
                <li key={t.slug}>
                  <ArticleCard artikel={t} varian="mini" />
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {bacaJuga.length > 0 && (
          <section aria-labelledby="baca-juga" className="mt-16 border-t-2 border-black pt-10">
            <h2 id="baca-juga" className="text-3xl font-black tracking-tight">
              Baca Juga
            </h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {bacaJuga.map((t) => (
                <li key={t.slug}>
                  <ArticleCard artikel={t} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black bg-kertas p-2 md:hidden">
        <ShareButtons judul={a.judul} ringkas />
      </div>
    </article>
  );
}
