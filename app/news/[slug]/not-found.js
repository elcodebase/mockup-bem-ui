import Link from "next/link";

export default function ArtikelNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="text-3xl font-bold">Artikel tidak ditemukan</h1>
      <p className="mt-2 text-abu">Artikel ini mungkin sudah dihapus atau alamatnya salah.</p>
      <Link href="/news" className="mt-8 inline-block bg-black px-5 py-3 text-sm font-semibold text-white">
        Lihat Semua Berita
      </Link>
    </section>
  );
}
