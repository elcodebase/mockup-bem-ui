# Website Utama BEM UI 2026, Kabinet TerusTerang

Next.js 14 (App Router) + Tailwind CSS, dibangun dari PRD, User Flow, dan Wireframe Biro Multimedia.

## Menjalankan

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Hosting

Panduan hosting gratis (Vercel + Supabase) ada di `DEPLOY.md`.

## Route

| Route | Isi |
| --- | --- |
| `/` | Hero orbital, statistik, preview kabinet, 3 berita terbaru, video (jika `NEXT_PUBLIC_YOUTUBE_ID` diisi) |
| `/kabinet` | 7 section bernomor + mini-nav: Tentang, Visi & Misi, Identitas, Kata Kabem, Filosofi Logo, Struktur, Fungsionaris |
| `/kabinet/[slug]` | Banner, tentang/visi/misi/tupoksi, struktur internal, program kerja, navigasi prev/next |
| `/news` | Search real-time, filter kategori (`?kategori=`), tag (`?tag=`), featured, grid campuran, muat lebih banyak |
| `/news/[slug]` | Artikel, sidebar terkait, share (X, WhatsApp, Instagram, salin link), Baca Juga, JSON-LD |

`/sitemap.xml` dan `/robots.txt` dibuat otomatis.

## Database (Supabase)

Berita/artikel dan statistik disimpan di Supabase (Postgres). Data kabinet dan divisi tetap flat JSON sesuai PRD v1.

1. Buat project di supabase.com.
2. Buka SQL Editor, jalankan `supabase/schema.sql`, lalu `supabase/seed.sql`.
3. Isi `.env.local` dari Project Settings > API:
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_ANON_KEY=eyJ...
   ```
4. Jalankan ulang `npm run dev`.

Tanpa variabel Supabase, website memakai `data/news.json` dan `data/stats.json` sebagai fallback.

Konten dikelola lewat Table Editor Supabase. Artikel baru atau perubahan muncul di website paling lambat 60 detik (ISR), tanpa redeploy. Set `published = false` untuk menyembunyikan artikel. Foto diunggah ke bucket `media` di Storage, lalu URL publiknya ditempel di kolom `cover_url`.

## Data (v1, flat JSON)

```
data/
├── kabinet.json      info kabinet
├── struktur.json     urutan divisi (dipakai juga untuk prev/next)
├── divisi/[slug].json
├── news.json         artikel
├── home.json         foto hero orbital + divisi di preview
└── stats.json        fallback statistik
```

Semua akses data lewat `lib/data.js`. Untuk migrasi ke SIT API (v2), cukup ganti isi fungsi di file itu.
Statistik otomatis diambil dari `SIT_STATS_URL` jika diisi, dengan fallback ke `stats.json`.

Field tambahan di luar skema PRD: `struktur.json` → `singkatan`, `icon`; `kabinet.json` → `foto_tentang_url`, `penjelasan_kabinet`, `elemen_logo`.

## Gambar

Taruh foto di `public/images/` sesuai path di JSON (mis. `public/images/divisi/kastrat-cover.jpg`). Selama file belum ada, komponen menampilkan placeholder atau inisial nama.

## Catatan

Semua nama fungsionaris dan isi artikel adalah data dummy.
