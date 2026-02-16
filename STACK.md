# Stack Plan — Tailor Measurement & Ordering App

Product summary
A measurement-first tailoring platform:
- Store a unified measurement profile once.
- Use it to order custom garments (suits, wedding outfits, quick dresses) without re-measuring every time.
- Support group ordering where all participants share the same fabric/cut/color but have individual measurements.
- Use measurements to recommend correct “size” against curated size charts (S/M/L etc).

Reference inspiration
FreeSewing stores “measurement sets” with metadata (name/notes/image/units/public) and a defined measurement vocabulary. We reuse the concept of measurement sets and a standard vocabulary, but we are not building a DIY sewing/pattern tool.  
Sources: FreeSewing measurement docs and measurement sets docs. :contentReference[oaicite:0]{index=0}

Core architectural choices
Frontend
- Next.js (React) + TypeScript
- Tailwind + shadcn/ui for a highly interactive UI
- zod for schema validation and typed forms

Backend
- Supabase
  - Auth: Google OAuth (optionally restrict/recognize corporate domains)
  - Postgres: relational model fits group orders + participants + orders + permissions
  - RLS: primary authorization mechanism (deny-by-default)
  - Storage: (optional) profile images, fabric swatches
  - Edge Functions: narrowly-scoped admin actions (delete user) without measurement reads

Why Supabase over MongoDB (for this product)
- Group ordering, permissions, and order states are relational and benefit from Postgres constraints + transactions.
- RLS lets us encode “admin cannot view measurements” at the database boundary (policies), rather than only in app logic. :contentReference[oaicite:1]{index=1}
- MongoDB remains viable, but would require an equivalent auth + ABAC/RBAC layer and careful enforcement.

Security posture (MVP)
- Product admin/support role has no SELECT permission on measurement tables via RLS (see SECURITY_PRIVACY.md).
- Tailor access is explicit, time-bounded, and scoped to specific profiles or measurement sessions.

Future security upgrade (post-MVP)
- Client-side encryption of measurement payloads (server stores ciphertext).
- Share-to-tailor via a consented, expiring “measurement session” with limited fields and duration.

Deployment
- Web app on Vercel
- Supabase hosted project
- CI via GitHub Actions (lint + typecheck + basic tests)

Observability
- Error tracking (Sentry) can be added later; must scrub/avoid measurement payloads.

Decision log (to append as you go)
- ADR-0001: Supabase chosen as backend for auth + Postgres + RLS.
- ADR-0002: Measurement data stored as versioned “measurement sets” (append-only) for audit and rollback.
