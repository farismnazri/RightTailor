# TODO — Tailor App (Codex-executable)

Legend
- [ ] Not done
- [x] Done

P0 — Repo + foundation
- [x] Initialize monorepo (pnpm) with apps/web (Next.js + TS + Tailwind; shadcn/ui deferred to next slice)
- [ ] Add Supabase local dev setup (supabase/ folder, config, scripts)
- [ ] Add environment variable templates (.env.example) with placeholders
- [ ] Add base routing: /login, /profiles, /profiles/[id], /orders/new, /groups, /groups/[id]
- [x] Add UI shell: nav, layout, responsive baseline
- [x] Ship public landing page at / with placeholder flows at /get-measured and /group-order

P1 — Auth + profiles
- [ ] Google OAuth sign-in (Supabase Auth)
  Acceptance: user can sign in/out; session persists; routes guarded
- [ ] Profiles CRUD (owner-only)
  Acceptance: create/list/edit profiles; RLS blocks other users

P2 — Measurements (sensitive)
- [ ] Frontend-only `/get-measured` workspace: create named measurement sets, view history, delete sets, and edit fields from Measurement Set PDF (stored locally for now)
- [ ] Define measurement schema v1 (zod) + units handling
  Acceptance: validation passes; schema stored in packages/shared
- [ ] measurement_sets table + RLS policies (owner select; delegated insert)
  Acceptance: owner can view own sets; tailor can only insert with valid grant; no admin select
- [ ] Tailor delegation flow (create grant + expiring link or invite)
  Acceptance: tailor can submit; owner can review and mark active

P3 — Orders (single)
- [ ] Orders table + statuses + RLS
- [ ] Create order UI (choose garment type, constraints, shipping)
- [ ] Order detail view + status timeline (basic)

P4 — Group orders
- [ ] Groups + members tables + RLS
- [ ] Create group UI + invite/join flow
- [ ] Attach measurement sets per member without exposing other members’ measurements
- [ ] Submit group order

P5 — Size recommendation (MVP-lite)
- [ ] size_charts storage model + import UI (admin-only but charts are not sensitive)
- [ ] Size recommendation component (measurement -> size label)
- [ ] Add “does this fit?” widget on profile page

P6 — Hardening
- [ ] Security review: ensure no logs/analytics capture measurements
- [ ] Basic tests for schema validation + sizing recommendation logic
- [ ] CI: lint + typecheck + tests on PR

Progress log
- 2026-02-16: Bootstrapped pnpm workspace at repo root (`package.json`, `pnpm-workspace.yaml`, `.gitignore`) with `apps/web` Next.js + TypeScript + Tailwind app and root scripts for `pnpm dev`, `pnpm lint`, and `pnpm typecheck`.
- 2026-02-16: Replaced starter UI with interactive public landing page in `apps/web/app/page.tsx`, custom styling in `apps/web/app/globals.css`, updated metadata/fonts in `apps/web/app/layout.tsx`, and added coming-soon flow pages at `apps/web/app/get-measured/page.tsx` and `apps/web/app/group-order/page.tsx`.
- 2026-02-16: Scoped back to landing-only first slice by restoring `/get-measured` to a coming-soon placeholder, keeping `/group-order` as placeholder, and preserving the interactive public landing page at `/` with use-case toggle and product sections.
- 2026-02-16: Added a ClickSpark interaction preview to the landing page (`apps/web/app/page.tsx`) using a local React Bits component (`apps/web/components/ClickSpark.jsx`) with spark settings for visual click feedback.
- 2026-02-16: Removed the ClickSpark preview section from the landing page and deleted the unused `apps/web/components/ClickSpark.jsx` component to keep the public site focused.
- 2026-02-16: Added a full-page Grainient animated background to the landing page without a bordered demo card (`apps/web/components/Grainient.jsx`, `apps/web/components/Grainient.css`, `apps/web/app/page.tsx`) and installed `ogl` for rendering.
