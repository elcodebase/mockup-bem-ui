import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OfflineBanner from "@/components/OfflineBanner";
import { siteUrl } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "BEM UI 2026, Kabinet TerusTerang", template: "%s | BEM UI 2026" },
  description: "Website resmi Badan Eksekutif Mahasiswa Universitas Indonesia 2026, Kabinet TerusTerang. Struktur kabinet, program kerja, kajian, dan siaran pers.",
  openGraph: { siteName: "BEM UI 2026", locale: "id_ID", type: "website" },
  twitter: { card: "summary_large_image", site: "@BEM_UI" }
};

export const viewport = { themeColor: "#000000" };

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#konten" className="sr-only z-50 bg-black px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Langsung ke konten
        </a>
        <OfflineBanner />
        <Navbar />
        <main id="konten" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
