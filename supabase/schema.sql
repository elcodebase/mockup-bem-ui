create table if not exists public.articles (
  id bigint generated always as identity primary key,
  slug text not null unique,
  judul text not null,
  kategori text not null check (kategori in ('kajian-strategis', 'siaran-pers', 'opini', 'kabar-ui')),
  tanggal date not null default current_date,
  penulis text not null,
  tags text[] not null default '{}',
  featured boolean not null default false,
  excerpt text not null,
  cover_url text,
  caption text,
  konten jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_tanggal_idx on public.articles (tanggal desc);
create index if not exists articles_tags_idx on public.articles using gin (tags);

create table if not exists public.stats (
  id smallint primary key default 1 check (id = 1),
  mahasiswa_terwakili integer not null,
  proker_aktif integer not null,
  fungsionaris integer not null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_updated_at on public.articles;
create trigger articles_updated_at before update on public.articles
  for each row execute function public.set_updated_at();

drop trigger if exists stats_updated_at on public.stats;
create trigger stats_updated_at before update on public.stats
  for each row execute function public.set_updated_at();

alter table public.articles enable row level security;
alter table public.stats enable row level security;

drop policy if exists "Publik membaca artikel terbit" on public.articles;
create policy "Publik membaca artikel terbit" on public.articles
  for select using (published);

drop policy if exists "Publik membaca statistik" on public.stats;
create policy "Publik membaca statistik" on public.stats
  for select using (true);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
