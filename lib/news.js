export const KATEGORI = [
  { slug: "kajian-strategis", label: "Kajian Strategis" },
  { slug: "siaran-pers", label: "Siaran Pers" },
  { slug: "opini", label: "Opini & Artikel" },
  { slug: "kabar-ui", label: "Kabar UI" }
];

export function labelKategori(slug) {
  return KATEGORI.find((k) => k.slug === slug)?.label ?? slug;
}

export function tagSlug(tag) {
  return tag.toLowerCase();
}

export function formatTanggal(iso) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

export function teksPolos(artikel) {
  return artikel.konten
    .map((b) => (b.items ? b.items.join(" ") : b.text))
    .join(" ");
}

export function estimasiBaca(artikel) {
  const kata = teksPolos(artikel).split(/\s+/).length;
  return Math.max(1, Math.round(kata / 200));
}
