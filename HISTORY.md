# History

Track completed task slices here after verification passes.

## Entry Template
- Date/Time (Asia/Kuala_Lumpur): YYYY-MM-DD HH:mm
- Summary: <what was completed>
- Files Changed:
  - <path>
- Verification:
  - <command>
  - <command>

## 2026-02-16 15:56
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 15:56
- Summary: Finalized the landing-only public slice, restored /get-measured to a coming-soon placeholder, and added a mandatory history/commit/push workflow rule in AGENTS.
- Files Changed:
  - AGENTS.md
  - HISTORY.md
  - apps/web/app/get-measured/page.tsx
  - apps/web/app/get-measured/measurement-fields.ts (deleted)
  - todolist.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:02
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:02
- Summary: Integrated React Bits ClickSpark into the public landing page as an interactive click preview panel with the provided spark settings.
- Files Changed:
  - apps/web/app/page.tsx
  - apps/web/components/ClickSpark.jsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:05
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:05
- Summary: Removed ClickSpark from the landing page per request and deleted the now-unused component file.
- Files Changed:
  - apps/web/app/page.tsx
  - apps/web/components/ClickSpark.jsx (deleted)
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:10
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:10
- Summary: Applied Grainient as a full-page landing background (no bordered demo section) using the provided settings.
- Files Changed:
  - apps/web/app/page.tsx
  - apps/web/components/Grainient.jsx
  - apps/web/components/Grainient.css
  - apps/web/package.json
  - pnpm-lock.yaml
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:15
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:15
- Summary: Updated the full-page Grainient props on the landing page to the requested dark blue color set and tuning values.
- Files Changed:
  - apps/web/app/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:17
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:17
- Summary: Tuned landing overlays to remove the grey/washed look and preserve the darker blue Grainient background.
- Files Changed:
  - apps/web/app/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:21
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:21
- Summary: Added Silk as a full-page layer behind Grainient and set the Grainient color layer to 40% opacity on the landing page.
- Files Changed:
  - apps/web/app/page.tsx
  - apps/web/components/Silk.jsx
  - apps/web/package.json
  - pnpm-lock.yaml
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:24
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:24
- Summary: Updated landing page non-card text colors to white with drop shadows for better contrast on the dark layered background.
- Files Changed:
  - apps/web/app/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:29
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:29
- Summary: Improved top navigation tab text contrast and replaced dual hero CTAs with a single Book an appointment button.
- Files Changed:
  - apps/web/app/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:33
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:33
- Summary: Forced top navigation tab labels and Book an appointment button text to white for consistent readability.
- Files Changed:
  - apps/web/app/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 16:51
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 16:51
- Summary: Reworked /get-measured into tabbed booking + measurement input flows with landing-matched background and local-save placeholders for future database integration.
- Files Changed:
  - apps/web/app/get-measured/page.tsx
  - apps/web/app/get-measured/measurement-fields.ts
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 17:05
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 17:05
- Summary: Fixed `/get-measured` layout spacing and hierarchy by turning Back to home into a contained button and making the two-flow tab switcher prominent above the form content.
- Files Changed:
  - apps/web/app/get-measured/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 18:09
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 18:09
- Summary: Fixed old background bleed at page bottoms by switching the global body fallback to dark and applying the layered dark backdrop pattern consistently across landing, get-measured, and group-order routes.
- Files Changed:
  - apps/web/app/globals.css
  - apps/web/app/page.tsx
  - apps/web/app/get-measured/page.tsx
  - apps/web/app/group-order/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 18:23
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 18:23
- Summary: Added a top-right desktop `Get started` navigation button on the landing page and wired it to `/get-measured`, matching the hero booking CTA flow.
- Files Changed:
  - apps/web/app/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 18:39
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 18:39
- Summary: Updated landing navigation to a hidden expandable card menu with left hamburger toggle, centered RightTailor logo image, right-side Get started CTA, and raised layering so dropdown content renders above hero cards.
- Files Changed:
  - apps/web/app/page.tsx
  - apps/web/components/CardNav.tsx
  - apps/web/public/righttailor-logo.png
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 18:47
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 18:47
- Summary: Implemented a reusable ScrollStack component and applied it to landing page card sections (`How it works`, `Group orders`) for stacked scroll interactions.
- Files Changed:
  - apps/web/components/ScrollStack.tsx
  - apps/web/app/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 19:00
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 19:00
- Summary: Reverted landing section stack animation and rebuilt section content as fixed large beige cards to match the requested visual style; switched main nav logo to white webp and removed now-unused ScrollStack/lenis.
- Files Changed:
  - apps/web/app/page.tsx
  - apps/web/public/righttailor-logo-white.webp
  - apps/web/components/ScrollStack.tsx
  - apps/web/package.json
  - pnpm-lock.yaml
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 19:05
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 19:05
- Summary: Reduced the typography scale across landing page section cards (`How it works`, `Group orders`, `Size matching`, `Privacy promise`) to tone down visual weight while preserving the screenshot-matching card layout.
- Files Changed:
  - apps/web/app/page.tsx
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck

## 2026-02-16 19:13
- Date/Time (Asia/Kuala_Lumpur): 2026-02-16 19:13
- Summary: Added a reusable `ScrollStack` component (Lenis-based) and applied it to the four large landing page section cards (`How it works`, `Group orders`, `Size matching`, `Privacy promise`) for stacked scroll motion.
- Files Changed:
  - apps/web/components/ScrollStack.tsx
  - apps/web/app/page.tsx
  - apps/web/package.json
  - pnpm-lock.yaml
  - todolist.md
  - HISTORY.md
- Verification:
  - pnpm lint
  - pnpm typecheck
