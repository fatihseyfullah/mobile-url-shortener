-- Users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- URLs table
create table if not exists public.urls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  original_url text not null,
  short_code text not null unique,
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_urls_short_code on public.urls(short_code);
create index if not exists idx_urls_user_id on public.urls(user_id);

-- Analytics table (click tracking)
create table if not exists public.analytics (
  id bigserial primary key,
  url_id uuid not null references public.urls(id) on delete cascade,
  clicked_at timestamptz not null default now(),
  referer text,
  user_agent text,
  ip_address text
);

create index if not exists idx_analytics_url_id on public.analytics(url_id);

-- Admin settings table
create table if not exists public.admin_settings (
  id integer primary key default 1,
  maintenance_mode boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
