-- Ganymai baseline schema. Run in Supabase SQL editor, then review with Advisors.
create type public.article_status as enum ('draft','published','archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'writer' check(role in ('writer','editor','admin')),
  created_at timestamptz not null default now()
);

create table public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  website text,
  created_at timestamptz not null default now()
);

create table public.categories (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text unique not null
);

create table public.tags (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text unique not null
);

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  dek text,
  author_name text not null,
  author_id uuid references public.authors(id),
  category_id bigint references public.categories(id),
  tags text[] not null default '{}',
  cover_url text,
  status public.article_status not null default 'draft',
  published_on date,
  locale text not null default 'en' check(locale in ('en','fr','zh-CN','zh-TW')),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.article_blocks (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  position integer not null,
  block_type text not null check(block_type in ('paragraph','image','heading','quote')),
  content jsonb not null default '{}'::jsonb,
  unique(article_id,position)
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  article_id uuid references public.articles(id) on delete set null,
  url text not null,
  source_url text,
  original_author text,
  source_name text,
  checksum text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  unique(article_id,url)
);

create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  locale text not null default 'en' check(locale in ('en','fr','zh-CN','zh-TW')),
  created_at timestamptz not null default now()
);

insert into public.categories(slug,name) values
('philosophy','Philosophy'),('nature','Nature'),('human-rights','Human rights'),('environment','Environment'),('society','Society'),('history','History'),('politics','Politics')
on conflict do nothing;

alter table public.profiles enable row level security;
alter table public.authors enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.articles enable row level security;
alter table public.article_blocks enable row level security;
alter table public.media enable row level security;
alter table public.subscribers enable row level security;

grant select on public.authors, public.categories, public.tags, public.articles, public.article_blocks, public.media to anon, authenticated;
grant insert on public.categories to authenticated;
grant insert, update, delete on public.articles, public.article_blocks, public.media to authenticated;
grant insert on public.subscribers to anon, authenticated;

create policy "profiles read self" on public.profiles for select to authenticated using(id=(select auth.uid()));
create policy "public reference authors" on public.authors for select to anon, authenticated using(true);
create policy "public reference categories" on public.categories for select to anon, authenticated using(true);
create policy "writers create categories" on public.categories for insert to authenticated
with check(length(name) between 1 and 80 and length(slug) between 1 and 80);
create policy "public reference tags" on public.tags for select to anon, authenticated using(true);

create policy "published articles public" on public.articles for select to anon, authenticated
using(status='published' or created_by=(select auth.uid()));
create policy "writers insert own articles" on public.articles for insert to authenticated
with check(created_by=(select auth.uid()));
create policy "writers update own articles" on public.articles for update to authenticated
using(created_by=(select auth.uid())) with check(created_by=(select auth.uid()));
create policy "writers delete own articles" on public.articles for delete to authenticated
using(created_by=(select auth.uid()));

create policy "published blocks public" on public.article_blocks for select to anon, authenticated
using(exists(select 1 from public.articles a where a.id=article_id and (a.status='published' or a.created_by=(select auth.uid()))));
create policy "writers insert blocks for own articles" on public.article_blocks for insert to authenticated
with check(exists(select 1 from public.articles a where a.id=article_id and a.created_by=(select auth.uid())));
create policy "writers update blocks for own articles" on public.article_blocks for update to authenticated
using(exists(select 1 from public.articles a where a.id=article_id and a.created_by=(select auth.uid())))
with check(exists(select 1 from public.articles a where a.id=article_id and a.created_by=(select auth.uid())));
create policy "writers delete blocks for own articles" on public.article_blocks for delete to authenticated
using(exists(select 1 from public.articles a where a.id=article_id and a.created_by=(select auth.uid())));

create policy "public media for visible article" on public.media for select to anon, authenticated
using(article_id is null or exists(select 1 from public.articles a where a.id=article_id and (a.status='published' or a.created_by=(select auth.uid()))));
create policy "writers insert media" on public.media for insert to authenticated with check(created_by=(select auth.uid()));
create policy "writers update own media" on public.media for update to authenticated using(created_by=(select auth.uid())) with check(created_by=(select auth.uid()));
create policy "writers delete own media" on public.media for delete to authenticated using(created_by=(select auth.uid()));

create policy "newsletter signup" on public.subscribers for insert to anon, authenticated with check(length(email) between 3 and 320);

-- Storage: create a PUBLIC bucket named `media` in the dashboard first.
-- Client uploads use paths like: <auth.uid()>/<timestamp>-<filename>
create policy "public can read media objects" on storage.objects for select to anon, authenticated using(bucket_id='media');
create policy "users upload to own media folder" on storage.objects for insert to authenticated
with check(bucket_id='media' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "users update own media folder" on storage.objects for update to authenticated
using(bucket_id='media' and (storage.foldername(name))[1]=(select auth.uid())::text)
with check(bucket_id='media' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "users delete own media folder" on storage.objects for delete to authenticated
using(bucket_id='media' and (storage.foldername(name))[1]=(select auth.uid())::text);
