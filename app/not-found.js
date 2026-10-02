import Link from "next/link";

export const metadata = { title: "Halaman tidak ditemukan" };

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-5 py-24">
      <p className="font-black leading-none tracking-tight" style={{ fontSize: "clamp(6rem, 25vw, 14rem)", fontStretch: "70%" }} aria-hidden>
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-abu">Alamat yang kamu buka tidak ada atau sudah dipindahkan.</p>
      <Link href="/" className="mt-8 bg-black px-5 py-3 text-sm font-semibold text-white">
        Kembali ke Beranda
      </Link>
    </section>
  );
}
