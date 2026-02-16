# Data Model (MVP)

Principles
- Measurements are sensitive; minimize surface area.
- Prefer append-only “measurement sets” (versioned snapshots) over in-place edits.
- Permissions are explicit and auditable.

Auth
- Supabase Auth users (Google OAuth)
- Each auth user can manage multiple measurement profiles (self, children)

Entities

1) profiles
Represents a person whose measurements are stored under an account.
- id (uuid)
- owner_user_id (uuid, auth.users.id)
- display_name (text) e.g., "Faris", "Aisha (kid)"
- relationship (enum: self, child, other)
- birth_year (int, optional)
- notes (text, optional)
- created_at

2) measurement_sets
Versioned measurement snapshots for a profile.
- id (uuid)
- profile_id (uuid)
- units (enum: cm, in)
- schema_version (text) e.g., "v1"
- measurements (jsonb)  // validated by zod schema
- created_by (uuid)     // auth user who created it (owner or delegated tailor)
- created_at
- is_active (bool)      // convenience pointer; only one active per profile

Measurement vocabulary
- Use a standard vocabulary inspired by FreeSewing’s measurement list (e.g., chest, waist, hips, inseam, neck, etc). :contentReference[oaicite:2]{index=2}
- MVP starts with a “core set” required for suits + wedding outfit baseline, and expands later.

3) tailor_grants
Delegation that allows a tailor to create a measurement set for a profile.
- id (uuid)
- profile_id (uuid)
- tailor_email (text) OR tailor_user_id (uuid, if tailor has account)
- scope (enum: create_measurement_set, update_profile_meta)
- expires_at (timestamp)
- created_at
- created_by (uuid)

4) orders
Single-person tailoring order.
- id (uuid)
- owner_user_id (uuid)
- profile_id (uuid)
- measurement_set_id (uuid)
- garment_type (enum: suit, baju_melayu, dress, other)
- constraints (jsonb) e.g., color, fit preference, budget range
- status (enum: draft, submitted, in_sourcing, in_production, shipped, completed, cancelled)
- shipping_address (jsonb)
- created_at, updated_at

5) groups
Group ordering (e.g., wedding party / corporate batch).
- id (uuid)
- owner_user_id (uuid)
- name (text)
- event_date (date, optional)
- garment_type (enum)
- shared_spec (jsonb)  // fabric, color, cut, notes
- status (enum: draft, collecting_measurements, submitted, in_production, shipped, completed)
- created_at, updated_at

6) group_members
- group_id (uuid)
- profile_id (uuid)
- measurement_set_id (uuid, optional until submitted)
- role (enum: organiser, member)
- invited_email (text, optional)
- joined_at

7) size_charts (curated, MVP-lite)
For measurement-to-size recommendations.
- id (uuid)
- brand (text)
- region (text) e.g., "MY", "US", "EU"
- garment_type (enum)
- chart (jsonb)  // structured ranges mapping to size labels

Notes
- Payments and supplier sourcing entities are post-MVP.

RLS overview (high level)
- profiles: only owner can select/modify
- measurement_sets: only owner can select; tailors with valid grants can insert; no “admin” select
- orders/groups: owner can access; group members can see group-level metadata but not other members’ measurement payloads
