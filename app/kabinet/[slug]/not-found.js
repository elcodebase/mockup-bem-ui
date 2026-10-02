import Link from "next/link";

export default function DivisiNotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="text-3xl font-bold">Divisi tidak ditemukan</h1>
      <p className="mt-2 text-abu">Alamat divisi ini tidak ada di struktur Kabinet TerusTerang.</p>
      <Link href="/kabinet#struktur" className="mt-8 inline-block bg-black px-5 py-3 text-sm font-semibold text-white">
        Lihat Semua Divisi
      </Link>
    </section>
  );
}
