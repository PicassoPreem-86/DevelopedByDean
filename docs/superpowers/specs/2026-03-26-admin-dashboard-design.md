# Admin Dashboard — Design Spec

## Goal

Build a protected admin dashboard at `/admin` that lets Dean manage leads, review chat transcripts, and approve founding wall notes — replacing the current email-only workflow with a database-backed system using Supabase.

## Architecture

- **Database & Auth:** Supabase (new project) — PostgreSQL + email/password auth
- **Client library:** `@supabase/supabase-js` (only new dependency)
- **Protected routes:** All `/admin/*` routes check Supabase session; redirect to `/admin/login` if unauthenticated
- **Admin layout:** Admin routes use their own layout component (no public Navbar, Footer, or ChatWidget). Separate `<Route>` group in App.tsx outside the marketing `Layout` wrapper.
- **Data flow change:** Form submissions, chat leads, and founding wall notes write to Supabase. Web3Forms remains as a backup email notification. Supabase is the source of truth.
- **All Supabase writes happen client-side** using the anon key + RLS INSERT policies. No server-side Supabase usage. The existing `/api/contact.ts` and `/api/founding-wall.ts` serverless routes become unused and can be removed.
- **Founding wall public page:** Reads approved notes from Supabase at runtime (no more static file / redeploys)
- **Row Level Security:** All tables locked down — anon can INSERT + read approved wall notes. Only authenticated admin can SELECT all, UPDATE, and DELETE.
- **Error handling for dual writes:** Supabase is the source of truth. If Supabase INSERT succeeds, show success to the user. Web3Forms POST is fire-and-forget — if it fails silently, no user-facing error.

## Database Schema

### `leads`

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid | gen_random_uuid() | PK |
| name | text | — | required |
| email | text | — | required |
| phone | text | '' | optional |
| business | text | '' | optional |
| location | text | '' | optional |
| preferred_date | text | '' | optional |
| preferred_time | text | '' | optional |
| message | text | '' | challenge/needs summary |
| source | text | 'form' | 'form' or 'chat' |
| status | text | 'new' | 'new', 'contacted', 'call_booked', 'proposal_sent', 'won', 'lost' |
| notes | text | '' | admin's private notes |
| created_at | timestamptz | now() | auto |
| updated_at | timestamptz | now() | auto-updated via trigger |

### `chat_transcripts`

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid | gen_random_uuid() | PK |
| lead_id | uuid | null | FK to leads.id, nullable |
| messages | jsonb | '[]' | array of {role, content} |
| created_at | timestamptz | now() | auto |

### `founding_wall_notes`

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid | gen_random_uuid() | PK |
| name | text | — | required |
| message | text | — | required |
| tag | text | — | CHECK constraint: 'Friend', 'Builder', 'Creative', 'Supporter', 'Founder Circle' |
| city | text | '' | optional |
| status | text | 'pending' | 'pending', 'approved', 'rejected' |
| pinned | boolean | false | — |
| created_at | timestamptz | now() | auto |
| updated_at | timestamptz | now() | auto-updated via trigger |

### SQL Setup

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Leads table
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text default '',
  business text default '',
  location text default '',
  preferred_date text default '',
  preferred_time text default '',
  message text default '',
  source text default 'form' check (source in ('form', 'chat')),
  status text default 'new' check (status in ('new', 'contacted', 'call_booked', 'proposal_sent', 'won', 'lost')),
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Chat transcripts table
create table chat_transcripts (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete set null,
  messages jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- Founding wall notes table
create table founding_wall_notes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  tag text not null check (tag in ('Friend', 'Builder', 'Creative', 'Supporter', 'Founder Circle')),
  city text default '',
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  pinned boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger leads_updated_at before update on leads
  for each row execute function update_updated_at();

create trigger founding_wall_notes_updated_at before update on founding_wall_notes
  for each row execute function update_updated_at();

-- RLS Policies

-- Leads: anon can INSERT, authenticated can SELECT/UPDATE
alter table leads enable row level security;

create policy "Anon can insert leads"
  on leads for insert to anon with check (true);

create policy "Authenticated can read leads"
  on leads for select to authenticated using (true);

create policy "Authenticated can update leads"
  on leads for update to authenticated using (true) with check (true);

-- Chat transcripts: anon can INSERT, authenticated can SELECT
alter table chat_transcripts enable row level security;

create policy "Anon can insert transcripts"
  on chat_transcripts for insert to anon with check (true);

create policy "Authenticated can read transcripts"
  on chat_transcripts for select to authenticated using (true);

-- Founding wall notes: anon can INSERT + SELECT approved, authenticated can do everything
alter table founding_wall_notes enable row level security;

create policy "Anon can insert notes"
  on founding_wall_notes for insert to anon with check (true);

create policy "Anon can read approved notes"
  on founding_wall_notes for select to anon using (status = 'approved');

create policy "Authenticated can read all notes"
  on founding_wall_notes for select to authenticated using (true);

create policy "Authenticated can update notes"
  on founding_wall_notes for update to authenticated using (true) with check (true);

create policy "Authenticated can delete notes"
  on founding_wall_notes for delete to authenticated using (true);
```

## Auth

- Single admin user created manually in Supabase dashboard
- Email/password login at `/admin/login`
- Supabase session stored in browser (persistent across refreshes)
- Logout button in admin sidebar
- No signup flow — admin only

## Admin UI

### Layout

- Dark theme matching site aesthetic (bg-hero colors, accent highlights)
- Admin routes use a separate `AdminLayout` component — no public Navbar, Footer, or ChatWidget
- Fixed left sidebar with navigation + logout
- Main content area scrolls independently
- Mobile: sidebar collapses to top nav bar

### Pages

**Dashboard (`/admin`)**
- Stat cards: leads this week, total leads, pending wall notes
- Leads by status breakdown
- Recent activity list: 10 most recently created or updated leads + wall notes (uses `updated_at` to capture status changes and approvals)

**Leads (`/admin/leads`)**
- Table: name, email, source badge, status badge, created date
- Click row to expand inline detail panel:
  - All lead fields displayed
  - Status dropdown to update
  - Private notes textarea (auto-saves on blur)
  - "View Transcript" button if source is 'chat' (opens modal with chat-bubble UI)
- Filter bar: status dropdown filter only (no text search in v1)
- Default sort: newest first

**Chat Transcripts (`/admin/transcripts`)**
- List view: timestamp, lead linked (if any), message count
- Click to view full conversation in chat-bubble UI (same style as public chat widget)
- Link to associated lead detail

**Founding Wall (`/admin/wall`)**
- Two tabs: Pending | Approved
- Card layout showing: name, tag, city, message, date
- Action buttons per card:
  - Pending: Approve / Reject (Approve = UPDATE status to 'approved', Reject = UPDATE status to 'rejected')
  - Approved: Pin / Unpin (UPDATE pinned) / Remove (DELETE row)
- Approving a note makes it immediately visible on the public `/founding-wall` page

### Login (`/admin/login`)
- Email + password form
- Error state for invalid credentials
- Redirects to `/admin` on success

## Data Flow Changes

### Contact Form (`FinalCTA.tsx`)
**Current:** POST to Web3Forms client-side
**New:** Supabase INSERT into `leads` (source: 'form') using anon key. Fire-and-forget POST to Web3Forms for email backup.

### Chat Lead Capture (`ChatWidget.tsx`)
**Current:** POST to Web3Forms client-side when LEAD tag detected
**New:** When LEAD tag detected:
1. Supabase INSERT into `leads` (source: 'chat'), get back the new lead `id`
2. Supabase INSERT into `chat_transcripts` with the lead `id` and full messages array from React state
3. Fire-and-forget POST to Web3Forms for email backup

Steps 1-2 are sequential. If step 1 fails, skip step 2. If step 1 succeeds but step 2 fails, the lead is captured without its transcript — acceptable tradeoff for v1.

### Founding Wall (`FoundingWallPage.tsx`)
**Current:** POST to Web3Forms client-side
**New:** Supabase INSERT into `founding_wall_notes` (status: 'pending') using anon key. Fire-and-forget POST to Web3Forms for email backup.

### Public Founding Wall Display
**Current:** Reads from static `src/data/foundingWallNotes.ts`
**New:** Reads from Supabase `founding_wall_notes` where status = 'approved', ordered by pinned desc + created_at desc. Uses anon key (RLS allows anon SELECT on approved notes).

### Cleanup
- Remove `/api/contact.ts` serverless route (replaced by client-side Supabase)
- Remove `/api/founding-wall.ts` serverless route (replaced by client-side Supabase)
- Remove `src/data/foundingWallNotes.ts` static file (replaced by Supabase reads)

## Environment Variables

New vars needed in Vercel:
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Supabase anon/public key

Both are safe to expose client-side (RLS protects the data).

## Out of Scope (v1)

- Team/multi-user accounts
- Email sending from dashboard
- Analytics beyond basic counts
- Content/copy management
- Lead import/export
- Text search across leads (status filter only)
- Pagination (dataset will be small initially)
- Soft delete / archive on leads
