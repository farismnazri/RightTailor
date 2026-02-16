# UI Flows (MVP)

Key screens

1) Auth
- Sign in with Google
- Optional: detect hosted domain for corporate accounts (future discount rules)

2) Profiles
- List profiles under account (self, children)
- Create new profile (name, relationship, notes)
- View profile summary (active measurement set + last updated)

3) Add measurements (tailor-entered)
Two options:
- Owner enters directly (fallback)
- Owner generates a “Tailor link” (delegation):
  - Choose profile
  - Set expiry (e.g., 7 days)
  - Share link or invite email
  - Tailor fills measurement form and submits
  - Owner reviews and marks as active

4) Order (single)
- Choose profile + garment type
- Select measurement set (active by default)
- Add constraints: fit preference, fabric preference, colors, budget range, delivery date
- Submit -> status changes to submitted

5) Group order (wedding/corporate)
- Create group: name, garment type, shared spec (fabric/cut/color)
- Invite members (email link) or add existing profiles
- Each member attaches measurement set (or organiser generates tailor links)
- Submit group -> status moves through production/shipping milestones

6) Size recommendation (MVP-lite)
- Pick a chart (brand/garment type)
- App compares your measurement set to chart ranges and suggests size
- No scraping. Charts are curated/imported.

Admin (support)
- View users list (email, created_at, status)
- Delete user / disable account
- Must not display or query measurement payloads
