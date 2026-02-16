# TODO — Tailor App (Codex-executable)

Legend
- [ ] Not done
- [x] Done

P0 — Repo + foundation
- [x] Initialize monorepo (pnpm) with apps/web (Next.js + TS + Tailwind; shadcn/ui deferred to next slice)
- [ ] Add Supabase local dev setup (supabase/ folder, config, scripts)
- [x] Add environment variable templates (.env.example) with placeholders
- [ ] Add base routing: /login, /profiles, /profiles/[id], /orders/new, /groups, /groups/[id]
- [x] Add UI shell: nav, layout, responsive baseline
- [x] Ship public landing page at / with placeholder flows at /get-measured and /group-order

P1 — Auth + profiles
- [x] Google OAuth sign-in (Supabase Auth)
  Acceptance: user can sign in/out; session persists; routes guarded
- [ ] Profiles CRUD (owner-only)
  Acceptance: create/list/edit profiles; RLS blocks other users

P2 — Measurements (sensitive)
- [x] Frontend-only `/get-measured` workspace: create named measurement sets, view history, delete sets, and edit fields from Measurement Set PDF (stored locally for now)
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
- 2026-02-16: Updated Grainient landing background values to a darker blue/near-black palette with reduced grain and adjusted center/contrast/gamma tuning in `apps/web/app/page.tsx`.
- 2026-02-16: Removed the white wash over Grainient and replaced ambient overlays with deeper blue tones in `apps/web/app/page.tsx` so the background matches the intended dark blue look more closely.
- 2026-02-16: Added a full-page Silk layer behind Grainient and set the Grainient color layer to 40% opacity in `apps/web/app/page.tsx`; installed `@react-three/fiber` and `three`, and added `apps/web/components/Silk.jsx`.
- 2026-02-16: Adjusted typography for dark backgrounds by making non-card text white with drop-shadow treatment in `apps/web/app/page.tsx` (nav branding/links and section headings/descriptions outside cards).
- 2026-02-16: Increased top nav tab contrast on dark background and simplified hero CTA into a single `Book an appointment` button (`apps/web/app/page.tsx`).
- 2026-02-16: Enforced pure white top nav tab text (including hover state) and pure white `Book an appointment` button text in `apps/web/app/page.tsx`.
- 2026-02-16: Rebuilt `/get-measured` with two tabs (`Book appointment`, `Input measurement`), matching layered dark background, local-save booking form (name/email/pax), and full measurement set entry (name, optional image URL, units toggle, and PDF-based measurement fields) via `apps/web/app/get-measured/page.tsx` and `apps/web/app/get-measured/measurement-fields.ts`.
- 2026-02-16: Polished `/get-measured` layout with a padded, shaped `Back to home` button and a clearer two-tab switcher (`Book appointment` / `Input measurement`) so both flows are immediately visible.
- 2026-02-16: Removed old background bleed by setting a global dark fallback and applied the same layered dark backdrop system to `/`, `/get-measured`, and `/group-order` for consistent full-page coverage.
- 2026-02-16: Added a top-right desktop nav `Get started` CTA on the landing page that routes to `/get-measured`, matching the `Book an appointment` action.
- 2026-02-16: Reworked landing top nav into a hidden expandable menu bar with left open/close control, centered brand logo image, right `Get started` CTA, and higher z-index so the menu stays above hero content.
- 2026-02-16: Added `ScrollStack` card behavior to landing sections so `How it works` and `Group orders` cards now animate/stack during page scroll with smooth transitions.
- 2026-02-16: Reverted landing ScrollStack behavior back to fixed large section cards and restyled `How it works`, `Group orders`, `Size matching`, and `Privacy promise` to match the screenshot-like beige card system; switched nav logo to white webp asset.
- 2026-02-16: Toned down landing page typography scale on the large content cards for better readability while keeping the same card layout and structure.
- 2026-02-16: Reintroduced `ScrollStack` behavior for the landing page’s four large section cards so they stack and animate during scroll while preserving existing card content.
- 2026-02-16: Tuned landing ScrollStack to start from the hero card and stack subsequent large cards over it with stronger center-pin feel and blur for cards behind.
- 2026-02-16: Wired Supabase Auth (Google) using `@supabase/ssr` with cookie-based SSR session handling, added `/auth/callback` code exchange route, created `/login` plus protected placeholder routes (`/app`, `/profiles`), and integrated nav `Sign in`/`Sign out` with a signed-in user indicator.
- 2026-02-16: Debugged ScrollStack pinning by switching to stable precomputed card offsets and retuned stack position/blur so the hero card leads and subsequent cards stack over it more clearly.
- 2026-02-16: Raised the ScrollStack start position by reducing top spacing so stacked cards align closer to the top/navigation.
- 2026-02-16: Fixed low stacking by clamping initial downward translation in ScrollStack and retuning stack pin position higher so card 2 overlays card 1 earlier and closer to the top.
- 2026-02-16: Moved the landing ScrollStack pin anchor further up (`stackPosition`/`scaleEndPosition`) and removed residual top spacing so stacked cards sit higher and avoid bottom cutoff on shorter viewports.
- 2026-02-16: Added measurement history to `/get-measured` input flow with local-storage-backed previous sets listing, plus edit-in-place and delete actions for saved measurement sets.
