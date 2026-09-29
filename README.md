# Ganymai

A restrained personal magazine prototype inspired by the editorial logic of long-form magazines, without copying Aeon's visual design.

## Brand rule
- The brand name is always exactly `Ganymai` in every locale. It must never be translated, transliterated, localized, or have its casing changed.

## Included
- Γ logo, unchanged Greek capital gamma.
- Transparent top bar; hides on scroll down and returns on scroll up with background.
- Desktop Archive / Subscribe / Sign up in the top bar; mobile keeps them in the menu.
- Search, long-short-long menu icon, About / Essays / Archive / Sign up / Subscribe / Contact / Donate, light/dark mode, Facebook and X.
- Footer background `#99AEBB`.
- English default, with UI switching for French, Simplified Chinese and Traditional Chinese.
- Long-form article template with publication date at the end.
- `/studio` modular editor with title, author, category, tags, cover, body blocks, image blocks and date at the end.
- Link metadata parsing, duplicate-image checks, inline insert controls, paragraph folding and local draft autosave.
- Supabase-ready schema and browser client helper.

## Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000` and `http://localhost:3000/studio`.

## Supabase
Copy `.env.example` to `.env.local`, add Project URL and Publishable Key, then run `supabase/schema.sql` in the SQL editor after reviewing it. The current prototype intentionally leaves publishing in demo mode until authentication and a concrete Supabase project are connected.

Security notes: keep service-role keys server-only; enable RLS on exposed tables; use Storage APIs for object mutations; review Storage policies before enabling uploads.
