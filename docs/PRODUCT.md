# Ganymai product foundation

## Positioning

Ganymai is a challenge-driven story platform.

The content unit is not a generic post. A story starts with a challenge, develops through updates and progress, and ends with an outcome.

Core loop:

1. Start a challenge.
2. Publish updates as the journey develops.
3. Follow a person or an individual challenge.
4. Comment and participate.
5. Reach an outcome — including honest failure.

## Surfaces

- Home: followed and notable challenge stories.
- Explore: discover public challenges.
- Challenge: goal, progress, members, followers, chronological story.
- Profile: X-like public page centered on challenges, updates and replies.
- Create: minimal challenge creation flow.
- Notifications: follows, comments, replies, joins and milestones.
- Settings: account, sessions, 2FA and recovery codes.

## Username rules

There is one public username. The UI always renders it with an @ prefix.

- 2–32 characters.
- Unicode letters and numbers are allowed.
- The only symbol characters allowed are `. _ -`.
- Whitespace is not allowed.
- Uniqueness is case-insensitive: `Alex`, `alex` and `ALEx` are the same identity.
- Original casing may be preserved for display, but uniqueness uses the normalized value.
- A username can be changed at most once every rolling 30 days.
- Internally, relationships use immutable user IDs, never usernames.

## Authentication

- Email + password registration.
- TOTP two-factor authentication.
- Single-use recovery codes.
- Session management and revocation.
- Email verification and password-reset delivery are required before public launch.

Better Auth owns authentication tables. Application tables reference the immutable auth user ID.

## Challenge modes

Challenges are user-defined and can be about anything that complies with platform rules.

The initial progress models are:
- Quantity: reach a number.
- Streak/period: continue for a defined period.
- Outcome: complete a result through milestones.

A challenge may be solo or joinable. It may be created by a person or an organization.

## Product constraints

- Web + installable PWA only.
- Public challenge pages are readable without an account.
- Registration is required for following, joining, posting, commenting and creating.
- Simple, editorial visual language. No badge-heavy gamification.
