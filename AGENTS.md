# Tailor App — Agent Instructions (AGENTS.md)

Repository goal
Build a measurement-first tailoring commerce app:
- Users store one or more measurement profiles (self, children).
- A tailor can be delegated to enter measurements on the user’s behalf.
- Users can place individual orders (e.g., suit) or group orders (e.g., wedding party) using stored measurements.
- The system can recommend sizing against size charts (S/M/L or numeric) using measurement ranges.

Non-goals (for MVP)
- DIY pattern drafting.
- Automated material sourcing marketplace.
- Web-wide e-commerce scraping. Size charts are imported/curated, not scraped.

Stack decision (default)
- Frontend: Next.js (React) + TypeScript + Tailwind + shadcn/ui
- Backend: Supabase (Auth: Google, Postgres, Storage, Edge Functions)
- Access control: Postgres Row Level Security (RLS) policies as the primary authorization layer. See SECURITY_PRIVACY.md.
- Forms/validation: zod + react-hook-form
- Data fetching: supabase-js + server actions where appropriate

Privacy & security hard rules
- Never log measurement values (server logs, client logs, analytics).
- “Admin” (support operator) must not have SELECT access to user measurements.
- All tables that contain user data must have RLS enabled and explicit policies (deny-by-default).
- Admin operations that affect users (delete/ban) must be implemented as narrowly-scoped RPC or Edge Functions that do not read measurement columns.
- Treat measurements as sensitive personal data.

Workflow rules for Codex
- Before coding, read: STACK.md, DATA_MODEL.md, SECURITY_PRIVACY.md, UI_FLOWS.md, todolist.md.
- Work in small slices. For every slice:
  - Update todolist.md checkboxes.
  - Add/adjust tests where meaningful.
  - Run verification commands locally (see below) and fix failures.
- Do not introduce new packages unless necessary; justify additions in STACK.md (Decision log section).
- Keep the repo structure consistent; do not create duplicate “utils” or “lib” folders.
- Hard rule after each completed task and passing verification:
  - Append a new entry to HISTORY.md with date/time in Asia/Kuala_Lumpur, summary, files changed, and verification commands.
  - Run `git add -A`, `git commit -m "<type>: <short summary>"`, then `git push`.
  - Never commit secrets. Keep `.env` and `.env.*` ignored; only `.env.example` may be committed.

Suggested repo structure
- apps/web               Next.js app
- supabase/              migrations, policies, seed
- packages/shared        shared types (zod schemas), constants

Local development commands (targets)
- pnpm install
- pnpm dev
- pnpm lint
- pnpm test
- supabase start
- supabase db reset

Definition of done (per task)
- Feature implemented end-to-end (UI + data + policy).
- RLS policies cover the feature paths.
- No measurement data is exposed in admin UI, logs, or analytics.
- Minimal tests or sanity checks exist for critical logic (schema validation, sizing recommendation, permission checks).
