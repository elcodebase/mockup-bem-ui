# Hosting Gratis: Vercel + Supabase

Website di-hosting di Vercel (paket Hobby) dan database di Supabase (paket Free). Keduanya gratis tanpa kartu kredit.

## 1. Siapkan database (Supabase)

1. Daftar di https://supabase.com, klik **New project**, pilih region **Southeast Asia (Singapore)**.
2. Buka **SQL Editor**, jalankan isi `supabase/schema.sql`, lalu `supabase/seed.sql`.
3. Buka **Project Settings > API**, catat **Project URL** dan **anon / publishable key**.

## 2. Upload kode ke GitHub

```bash
git init
git add .
git commit -m "Website BEM UI 2026"
git branch -M main
git remote add origin https://github.com/USERNAME/bem-ui-2026.git
git push -u origin main
```

File `.env.local` tidak ikut ter-upload (sudah ada di `.gitignore`).

## 3. Deploy ke Vercel

1. Daftar di https://vercel.com dengan akun GitHub.
2. Klik **Add New > Project**, pilih repo `bem-ui-2026`. Framework otomatis terdeteksi sebagai Next.js.
3. Buka **Environment Variables**, isi:

   | Nama | Nilai |
   | --- | --- |
   | `SUPABASE_URL` | Project URL dari Supabase |
   | `SUPABASE_ANON_KEY` | anon / publishable key dari Supabase |
   | `NEXT_PUBLIC_YOUTUBE_ID` | (opsional) ID video YouTube company profile |
   | `NEXT_PUBLIC_SITE_URL` | (opsional) isi kalau sudah pakai domain sendiri, mis. `https://bem.ui.ac.id` |

4. Klik **Deploy**. Website tersedia di `https://NAMA-PROJECT.vercel.app`.

Setiap `git push` ke `main` akan otomatis deploy ulang. Perubahan artikel di Supabase tampil paling lambat 60 detik tanpa deploy ulang.

## 4. Cegah database tertidur

Project Supabase gratis otomatis di-pause kalau tidak ada aktivitas selama 7 hari. Workflow `.github/workflows/supabase-keep-alive.yml` mengirim permintaan ringan setiap 3 hari agar database tetap aktif.

Aktifkan dengan menambahkan secrets di repo GitHub, **Settings > Secrets and variables > Actions > New repository secret**:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Lalu buka tab **Actions**, pilih **Supabase keep-alive**, klik **Run workflow** untuk mengetes.

GitHub menonaktifkan workflow terjadwal di repo yang tidak ada commit selama 60 hari. Kalau itu terjadi, aktifkan lagi dari tab Actions.

Kalau database sempat ter-pause, buka dashboard Supabase dan klik **Restore project**. Selama ter-pause, halaman berita yang sudah pernah dibuka tetap tampil dari cache.

## 5. (Opsional) Domain sendiri

Di Vercel: **Settings > Domains**, tambahkan domain, lalu ikuti instruksi DNS. Setelah aktif, isi `NEXT_PUBLIC_SITE_URL` dengan domain tersebut dan deploy ulang agar sitemap dan link share memakai domain baru.
