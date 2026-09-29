# Ganymai implementation map

## Brand
- Name: Ganymai
- Mark: Greek capital Gamma `Γ` only. No distortion, stretching, ornament or custom icon treatment.
- Editorial idea: the relationship between people and the world.
- Core fields: philosophy, nature, human rights, environment, society, history and politics.
- Motto: “Life is unfinished…”
- Footer: `#99AEBB`.

## Header behavior
- Left: Γ.
- Desktop center: Archive / Subscribe / Sign up.
- Right: Search + long-short-long menu control.
- Header starts transparent.
- Scroll down: header hides.
- Scroll up: header returns with background and border.
- Γ uses browser history to return to the previous page, with `/` fallback.

## Menu
Desktop menu: About, Essays, Contact, Donate, light/dark, language, Facebook, X.
Mobile additionally contains Archive, Sign up and Subscribe.

## Languages
English is the default UI. French, Simplified Chinese and Traditional Chinese navigation/footer strings are included. The database schema includes an article `locale` field for localized editorial content.

## Studio
`/studio` includes:
- title
- author
- category
- tags
- cover
- body blocks
- image blocks
- date at the end

Editor behavior:
- Local draft autosave.
- Paragraph blocks fold after editing.
- Insert controls remain beside every block, so adding an illustration never requires scrolling back to a global toolbar.
- Link parser extracts Open Graph image/title and common author/source metadata.
- URL duplicates are blocked.
- Uploaded files are SHA-256 fingerprinted so duplicate local files can be blocked.
- When Supabase is configured and the user is signed in, uploads go to Storage and Publish inserts the article plus ordered content blocks.

## Supabase
`supabase/schema.sql` includes tables, RLS and Storage policies. Create a public Storage bucket called `media` before using persistent uploads. Run Supabase Advisors after applying the schema.

## Before production
- Add a real Supabase project and configure `.env.local`.
- Decide account roles and create/profile assignment flow.
- Add editorial review states if drafts require approval.
- Add a real newsletter and donation provider.
- Add per-article translations or a translation workflow.
- Add full-text search and an archive filter UI.
- Add image transformation/CDN rules and stricter metadata-fetch allow/deny controls if parsing arbitrary third-party links at scale.
