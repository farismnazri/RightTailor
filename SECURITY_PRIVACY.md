# Security & Privacy

Threat model (MVP)
We primarily protect against:
- Other users accessing your measurements.
- Support/admin operators viewing measurement values.
- Accidental exposure via logs, analytics, or admin tools.

We do not fully protect against:
- A platform operator with direct database superuser access.
- A compromised user device/browser.

Sensitive data classification
Measurements are treated as sensitive personal data.

Primary controls
1) Row Level Security (RLS) as the enforcement boundary
- RLS enabled on all user data tables.
- Policies are deny-by-default (no access unless a policy allows it).
Supabase positions RLS as a first-class way to control what each user can access at row level. :contentReference[oaicite:3]{index=3}

2) Admin cannot view measurements
- No SELECT policies exist for admin/support roles on measurement_sets.
- Admin UI must never use service-role keys.
- Admin actions (delete user, disable group) happen via narrowly-scoped Edge Functions or RPC that do not SELECT measurement columns.

3) Tailor delegation
- Tailor can only INSERT measurement sets for the specific profile with a valid grant.
- Grants are time-bounded (expires_at) and scoped (create_measurement_set only).

4) Logging/analytics hygiene
- Prohibit measurement payloads in logs.
- Errors must redact request bodies and form values.

Recommended post-MVP upgrade
Client-side encryption of measurement payloads:
- Store ciphertext in measurement_sets.measurements
- Decrypt only in the user’s session for sizing recommendations
- Tailor receives measurement data only via explicit consented shares

Operational policies
- Database migrations must include RLS + policies in the same change set.
- Add a “security checklist” gate before shipping new tables/features.
