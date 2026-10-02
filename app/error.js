"use client";

export default function Error({ reset }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="text-3xl font-bold">Data gagal dimuat</h1>
      <p className="mt-2 text-abu">Periksa koneksi internet, lalu muat ulang data halaman ini.</p>
      <button type="button" onClick={reset} className="mt-8 bg-black px-5 py-3 text-sm font-semibold text-white">
        Coba Lagi
      </button>
    </section>
  );
}
