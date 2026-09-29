-- Application tables. Better Auth owns its own user/session/account/verification tables.
create table if not exists organizations (
  id text primary key,
  slug text not null unique,
  name text not null,
  bio text,
  created_by text not null references "user"(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists organization_members (
  organization_id text not null references organizations(id) on delete cascade,
  user_id text not null references "user"(id) on delete cascade,
  role text not null check (role in ('owner','admin','member')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table if not exists challenges (
  id text primary key,
  slug text not null unique,
  title text not null,
  story text,
  creator_user_id text references "user"(id) on delete restrict,
  organization_id text references organizations(id) on delete restrict,
  mode text not null check (mode in ('quantity','streak','outcome')),
  target_value numeric,
  target_unit text,
  starts_at timestamptz,
  ends_at timestamptz,
  visibility text not null default 'public' check (visibility in ('public','unlisted','private')),
  joinable boolean not null default true,
  status text not null default 'active' check (status in ('draft','active','completed','ended','paused')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((creator_user_id is not null) <> (organization_id is not null))
);

create table if not exists challenge_members (
  challenge_id text not null references challenges(id) on delete cascade,
  user_id text not null references "user"(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (challenge_id, user_id)
);

create table if not exists challenge_follows (
  challenge_id text not null references challenges(id) on delete cascade,
  user_id text not null references "user"(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (challenge_id, user_id)
);

create table if not exists user_follows (
  follower_id text not null references "user"(id) on delete cascade,
  followed_id text not null references "user"(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followed_id),
  check (follower_id <> followed_id)
);

create table if not exists updates (
  id text primary key,
  challenge_id text not null references challenges(id) on delete cascade,
  author_id text not null references "user"(id) on delete cascade,
  body text not null,
  progress_value numeric,
  created_at timestamptz not null default now(),
  edited_at timestamptz
);

create table if not exists comments (
  id text primary key,
  update_id text not null references updates(id) on delete cascade,
  author_id text not null references "user"(id) on delete cascade,
  parent_comment_id text references comments(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  edited_at timestamptz
);

create table if not exists update_likes (
  update_id text not null references updates(id) on delete cascade,
  user_id text not null references "user"(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (update_id, user_id)
);

create index if not exists updates_challenge_created_idx on updates (challenge_id, created_at desc);
create index if not exists comments_update_created_idx on comments (update_id, created_at asc);
create index if not exists user_follows_followed_idx on user_follows (followed_id);
