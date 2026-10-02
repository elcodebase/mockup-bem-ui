import Link from "next/link";
import Gambar from "./Gambar";
import { formatTanggal, labelKategori } from "@/lib/news";

const gaya = {
  besar: { gambar: "aspect-[16/9]", judul: "text-xl md:text-2xl", pad: "p-5" },
  kecil: { gambar: "aspect-[4/3]", judul: "text-base", pad: "p-4" },
  mini: { gambar: "aspect-square w-20 shrink-0", judul: "text-sm", pad: "" }
};

export default function ArticleCard({ artikel, varian = "kecil" }) {
  const g = gaya[varian];
  if (varian === "mini") {
    return (
      <Link href={`/news/${artikel.slug}`} className="group flex gap-3">
        <Gambar src={artikel.cover_url} alt="" className={`${g.gambar} border border-black`} />
        <div>
          <p className="text-xs text-abu">{labelKategori(artikel.kategori)}</p>
          <h3 className={`${g.judul} font-semibold leading-snug group-hover:underline`}>{artikel.judul}</h3>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/news/${artikel.slug}`} className="group flex h-full flex-col border border-black bg-permukaan transition hover:bg-white">
      <Gambar src={artikel.cover_url} alt="" className={`${g.gambar} w-full border-b border-black`} />
      <div className={`flex flex-1 flex-col ${g.pad}`}>
        <p className="text-xs text-abu">{labelKategori(artikel.kategori)}</p>
        <h3 className={`${g.judul} mt-1 font-bold leading-snug group-hover:underline`}>{artikel.judul}</h3>
        <time dateTime={artikel.tanggal} className="mt-auto pt-4 text-xs text-abu">
          {formatTanggal(artikel.tanggal)}
        </time>
      </div>
    </Link>
  );
}
