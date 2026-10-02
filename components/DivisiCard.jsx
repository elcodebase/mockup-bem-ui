import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import DivisiIcon from "./DivisiIcon";

export default function DivisiCard({ divisi, besar = false }) {
  return (
    <Link
      href={`/kabinet/${divisi.slug}`}
      className={`group relative flex h-full flex-col justify-between gap-6 border border-black bg-permukaan p-5 transition duration-150 hover:bg-permukaan2 active:scale-[0.98] active:bg-garis/40 ${besar ? "md:flex-row md:items-end md:p-8" : ""}`}
    >
      <DivisiIcon name={divisi.icon} className={`${besar ? "h-10 w-10" : "h-6 w-6"} text-abu transition-colors group-hover:text-aksen`} />
      <ArrowUpRight
        aria-hidden
        className="absolute right-4 top-4 h-5 w-5 opacity-40 transition duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
      />
      <div className={besar ? "md:max-w-md md:text-right" : ""}>
        <p className="text-xs text-abu">{divisi.type}</p>
        <h3 className={`${besar ? "text-3xl md:text-4xl" : "text-lg"} font-bold leading-tight`}>{besar ? divisi.nama : divisi.singkatan}</h3>
        <p className="mt-1 text-sm text-abu">{divisi.deskripsi_singkat}</p>
      </div>
    </Link>
  );
}
