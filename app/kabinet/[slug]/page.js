import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, Linkedin, ListChecks, Target } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import Gambar from "@/components/Gambar";
import Avatar from "@/components/Avatar";
import { getDivisi, getStruktur, getTetanggaDivisi } from "@/lib/data";

const STATUS = {
  upcoming: { label: "Akan Datang", kelas: "border-garis bg-permukaan2 text-abu" },
  ongoing: { label: "Sedang Berjalan", kelas: "border-aksen bg-aksen text-white" },
  done: { label: "Selesai", kelas: "border-black bg-black text-white" }
};

export async function generateStaticParams() {
  const struktur = await getStruktur();
  return struktur.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const divisi = await getDivisi(params.slug);
  if (!divisi) return { title: "Divisi tidak ditemukan" };
  return {
    title: divisi.nama,
    description: divisi.deskripsi.split("\n\n")[0],
    openGraph: { title: divisi.nama, images: [divisi.cover_url] }
  };
}

function Anggota({ orang, size }) {
  const besar = size === "lg";
  return (
    <div className={`flex flex-col items-center text-center ${besar ? "gap-3" : "gap-2"}`}>
      <Avatar src={orang.foto_url} nama={orang.nama} size={size} />
      <div className={`border border-black bg-permukaan ${besar ? "px-5 py-3" : "w-full px-2 py-2"}`}>
        <p className={`${besar ? "text-lg" : "text-sm"} font-bold leading-tight`}>{orang.nama}</p>
        <p className="text-xs text-abu">{orang.jabatan}</p>
        {orang.linkedin && (
          <a href={orang.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${orang.nama}`} className="mt-1 inline-block hover:text-aksen">
            <Linkedin className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

function Blok({ Icon, judul, children }) {
  return (
    <section className="border border-black bg-permukaan p-5">
      <h3 className="flex items-center gap-2 font-bold">
        <Icon className="h-4 w-4" aria-hidden />
        {judul}
      </h3>
      <div className="mt-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function Daftar({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((x) => (
        <li key={x} className="flex gap-3">
          <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 bg-black" />
          {x}
        </li>
      ))}
    </ul>
  );
}

function NavDivisi({ divisi, arah }) {
  const kiri = arah === "kiri";
  const isi = (
    <>
      {kiri && <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />}
      <span className="truncate">{divisi ? divisi.singkatan : kiri ? "Tidak ada divisi sebelumnya" : "Tidak ada divisi berikutnya"}</span>
      {!kiri && <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />}
    </>
  );
  const kelas = `flex min-w-0 items-center gap-2 border border-black px-4 py-3 text-sm ${kiri ? "" : "justify-end"}`;
  if (!divisi) {
    return (
      <span aria-disabled="true" className={`${kelas} cursor-not-allowed opacity-40`}>
        {isi}
      </span>
    );
  }
  return (
    <Link href={`/kabinet/${divisi.slug}`} className={`${kelas} hover:bg-black hover:text-white`} aria-label={`${kiri ? "Divisi sebelumnya" : "Divisi berikutnya"}: ${divisi.nama}`}>
      {isi}
    </Link>
  );
}

export default async function DivisiPage({ params }) {
  const divisi = await getDivisi(params.slug);
  if (!divisi) notFound();
  const { sebelumnya, berikutnya } = await getTetanggaDivisi(params.slug);

  const [kepala, ...lainnya] = divisi.anggota;
  const wakil = lainnya.filter((a) => a.jabatan.startsWith("Wakil"));
  const staf = lainnya.filter((a) => !a.jabatan.startsWith("Wakil"));

  return (
    <article className="mx-auto max-w-5xl px-5 pb-16 pt-6">
      <Breadcrumb items={[{ label: "Kabinet", href: "/kabinet" }, { label: divisi.nama }]} />

      <header className="relative mt-4 border border-black">
        <Gambar src={divisi.cover_url} alt={`Sampul ${divisi.nama}`} prioritas className="aspect-[16/9] w-full md:aspect-[21/8]" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end gap-2">
          <span className="border border-black bg-permukaan px-2 py-1 text-xs">{divisi.type}</span>
          <h1 className="border border-black bg-permukaan px-3 py-1 text-3xl font-black leading-none tracking-tight shadow-[4px_4px_0_#000] md:text-5xl" style={{ fontStretch: "75%" }}>
            {divisi.nama}
          </h1>
        </div>
      </header>

      <section aria-labelledby="tentang-divisi" className="mt-12 grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 id="tentang-divisi" className="border-b border-black pb-2 text-2xl font-bold">
            Tentang {divisi.type === "BPH" ? "BPH" : divisi.type}
          </h2>
          <div className="mt-4 space-y-3 leading-relaxed">
            {divisi.deskripsi.split("\n\n").map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Blok Icon={Eye} judul="Visi">
            <p>{divisi.visi}</p>
          </Blok>
          <Blok Icon={Target} judul="Misi">
            <Daftar items={divisi.misi} />
          </Blok>
          <Blok Icon={ListChecks} judul="Tupoksi">
            <Daftar items={divisi.tupoksi} />
          </Blok>
        </div>
      </section>

      <section aria-labelledby="struktur-internal" className="mt-16 border-t border-black pt-10">
        <h2 id="struktur-internal" className="text-center text-2xl font-bold">
          Struktur Internal
        </h2>
        <div className="mt-10 flex flex-col items-center">
          {kepala && <Anggota orang={kepala} size="lg" />}
          {wakil.length > 0 && (
            <>
              <span aria-hidden className="h-8 w-px bg-black" />
              <div className="flex flex-wrap justify-center gap-6">
                {wakil.map((w) => (
                  <Anggota key={w.nama} orang={w} size="md" />
                ))}
              </div>
            </>
          )}
          {staf.length > 0 && (
            <>
              <span aria-hidden className="h-8 w-px bg-black" />
              <ul className="grid w-full grid-cols-2 gap-4 border-t border-black pt-8 sm:grid-cols-3 lg:grid-cols-6">
                {staf.map((a) => (
                  <li key={a.nama}>
                    <Anggota orang={a} size="sm" />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section aria-labelledby="program-kerja" className="mt-16">
        <h2 id="program-kerja" className="border-b-2 border-black pb-2 text-2xl font-bold">
          Program Kerja
        </h2>
        {divisi.proker.length === 0 ? (
          <p className="border-b border-garis py-10 text-center text-abu">Program kerja segera hadir.</p>
        ) : (
          <ul>
            {divisi.proker.map((p) => {
              const st = STATUS[p.status] ?? STATUS.upcoming;
              return (
                <li key={p.nama} className="grid gap-2 border-b border-garis py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <div>
                    <p className="font-bold">{p.nama}</p>
                    <span className={`mt-1 inline-block border px-2 py-0.5 text-xs ${st.kelas}`}>{st.label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-abu">{p.deskripsi}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <nav aria-label="Navigasi antar divisi" className="mt-16 grid grid-cols-2 gap-3 border-t border-black pt-8 sm:grid-cols-[1fr_auto_1fr]">
        <NavDivisi divisi={sebelumnya} arah="kiri" />
        <Link href="/kabinet#struktur" className="order-first col-span-2 bg-black px-5 py-3 text-center text-sm font-semibold text-white hover:bg-aksen sm:order-none sm:col-span-1">
          Kembali ke Kabinet
        </Link>
        <NavDivisi divisi={berikutnya} arah="kanan" />
      </nav>
    </article>
  );
}
