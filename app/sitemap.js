import { getArticles, getStruktur } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export const revalidate = 60;

export default async function sitemap() {
  const [struktur, artikel] = await Promise.all([getStruktur(), getArticles()]);
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/kabinet`, priority: 0.9 },
    { url: `${siteUrl}/news`, priority: 0.9 },
    ...struktur.map((d) => ({ url: `${siteUrl}/kabinet/${d.slug}`, priority: 0.7 })),
    ...artikel.map((a) => ({ url: `${siteUrl}/news/${a.slug}`, lastModified: a.tanggal, priority: 0.8 }))
  ];
}
