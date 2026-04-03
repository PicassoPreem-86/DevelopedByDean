# Admin Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Supabase-backed admin dashboard for managing leads, chat transcripts, and founding wall notes.

**Architecture:** Supabase provides auth + PostgreSQL database. All public writes use the anon key with RLS. Admin reads/updates use authenticated sessions. Admin UI lives at `/admin/*` with its own layout, separate from the marketing site shell.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Supabase JS client, React Router v7, Framer Motion (existing)

**Spec:** `docs/superpowers/specs/2026-03-26-admin-dashboard-design.md`

---

## File Structure

### New files
- `src/lib/supabase.ts` — Supabase client singleton
- `src/lib/supabase-types.ts` — TypeScript types for database tables
- `src/hooks/useAuth.ts` — Auth state hook (session, login, logout)
- `src/hooks/useLeads.ts` — Leads CRUD hook
- `src/hooks/useTranscripts.ts` — Transcripts read hook
- `src/hooks/useWallNotes.ts` — Founding wall notes CRUD hook
- `src/components/AdminLayout.tsx` — Sidebar + main content wrapper
- `src/components/AdminRoute.tsx` — Auth guard, redirects to login
- `src/pages/admin/LoginPage.tsx` — Email/password login
- `src/pages/admin/DashboardPage.tsx` — Overview stats + recent activity
- `src/pages/admin/LeadsPage.tsx` — Lead table with inline detail expand
- `src/pages/admin/TranscriptsPage.tsx` — Chat transcript list + viewer
- `src/pages/admin/WallPage.tsx` — Founding wall note management

### Modified files
- `package.json` — Add `@supabase/supabase-js`
- `src/App.tsx` — Add admin route group with AdminLayout
- `src/sections/FinalCTA.tsx` — Add Supabase INSERT alongside Web3Forms
- `src/components/ChatWidget.tsx` — Add Supabase INSERT for leads + transcripts
- `src/pages/FoundingWallPage.tsx` — Add Supabase INSERT + read approved notes from Supabase

### Removed files
- `api/contact.ts` — Replaced by client-side Supabase
- `api/founding-wall.ts` — Replaced by client-side Supabase
- `src/data/foundingWallNotes.ts` — Replaced by Supabase reads

---

### Task 1: Install Supabase and Create Client

**Files:**
- Modify: `package.json`
- Create: `src/lib/supabase.ts`
- Create: `src/lib/supabase-types.ts`

- [ ] **Step 1: Install @supabase/supabase-js**

```bash
pnpm add @supabase/supabase-js
```

- [ ] **Step 2: Create Supabase client singleton**

Create `src/lib/supabase.ts`:
```typescript
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase-types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars missing — database features disabled");
}

export const supabase = createClient<Database>(
  supabaseUrl || "",
  supabaseAnonKey || ""
);
```

- [ ] **Step 3: Create database types**

Create `src/lib/supabase-types.ts`:
```typescript
export type LeadStatus = "new" | "contacted" | "call_booked" | "proposal_sent" | "won" | "lost";
export type LeadSource = "form" | "chat";
export type WallNoteStatus = "pending" | "approved" | "rejected";
export type WallNoteTag = "Friend" | "Builder" | "Creative" | "Supporter" | "Founder Circle";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  location: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  source: LeadSource;
  status: LeadStatus;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type ChatTranscript = {
  id: string;
  lead_id: string | null;
  messages: { role: "user" | "assistant"; content: string }[];
  created_at: string;
};

export type WallNote = {
  id: string;
  name: string;
  message: string;
  tag: WallNoteTag;
  city: string;
  status: WallNoteStatus;
  pinned: boolean;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      leads: { Row: Lead; Insert: Omit<Lead, "id" | "created_at" | "updated_at" | "status" | "notes">; Update: Partial<Lead> };
      chat_transcripts: { Row: ChatTranscript; Insert: Omit<ChatTranscript, "id" | "created_at">; Update: Partial<ChatTranscript> };
      founding_wall_notes: { Row: WallNote; Insert: Omit<WallNote, "id" | "created_at" | "updated_at" | "status" | "pinned">; Update: Partial<WallNote> };
    };
  };
};
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```
Expected: Build succeeds (Supabase client is tree-shaken if not used yet)

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml src/lib/supabase.ts src/lib/supabase-types.ts
git commit -m "feat: add Supabase client and database types"
```

---

### Task 2: Auth Hook and Login Page

**Files:**
- Create: `src/hooks/useAuth.ts`
- Create: `src/pages/admin/LoginPage.tsx`

- [ ] **Step 1: Create auth hook**

Create `src/hooks/useAuth.ts`:
```typescript
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { session, loading, login, logout, isAuthenticated: !!session };
}
```

- [ ] **Step 2: Create login page**

Create `src/pages/admin/LoginPage.tsx`:
```typescript
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const err = await login(email, password);
    if (err) {
      setError("Invalid email or password");
      setSubmitting(false);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-hero px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white text-center">Admin Login</h1>
        <p className="mt-2 text-sm text-white/40 text-center">DevelopedByDean</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
              placeholder="admin@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-white/50 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-accent/50"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50 transition-all"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useAuth.ts src/pages/admin/LoginPage.tsx
git commit -m "feat: add auth hook and admin login page"
```

---

### Task 3: Admin Layout and Route Protection

**Files:**
- Create: `src/components/AdminLayout.tsx`
- Create: `src/components/AdminRoute.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create AdminRoute guard**

Create `src/components/AdminRoute.tsx`:
```typescript
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-hero">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
```

- [ ] **Step 2: Create AdminLayout**

Create `src/components/AdminLayout.tsx`:
```typescript
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, MessageCircle, StickyNote, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/leads", icon: Users, label: "Leads" },
  { to: "/admin/transcripts", icon: MessageCircle, label: "Transcripts" },
  { to: "/admin/wall", icon: StickyNote, label: "Founding Wall" },
];

export function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-dvh bg-hero">
      {/* Sidebar */}
      <aside className="hidden sm:flex w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#070a12] p-4">
        <div className="mb-8">
          <p className="text-sm font-bold text-white">DevelopedByDean</p>
          <p className="text-[11px] text-white/30">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="sm:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between border-b border-white/[0.06] bg-[#070a12] px-4 py-3">
        <p className="text-sm font-bold text-white">Admin</p>
        <div className="flex gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-lg p-2 transition-all ${
                  isActive ? "bg-accent/15 text-accent" : "text-white/40"
                }`
              }
            >
              <item.icon size={16} />
            </NavLink>
          ))}
          <button onClick={logout} className="rounded-lg p-2 text-white/30">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 pt-16 sm:pt-8">
        <Outlet />
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Add admin routes to App.tsx**

Modify `src/App.tsx`. Add imports at top:
```typescript
import { LoginPage } from "./pages/admin/LoginPage";
import { AdminRoute } from "./components/AdminRoute";
import { AdminLayout } from "./components/AdminLayout";
```

Add placeholder pages (temporary):
```typescript
function AdminPlaceholder({ title }: { title: string }) {
  return <h1 className="text-xl font-bold text-white">{title}</h1>;
}
```

Add admin routes OUTSIDE the Layout wrapper, before `</BrowserRouter>`:
```typescript
<Route path="/admin/login" element={<LoginPage />} />
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
  <Route index element={<AdminPlaceholder title="Dashboard" />} />
  <Route path="leads" element={<AdminPlaceholder title="Leads" />} />
  <Route path="transcripts" element={<AdminPlaceholder title="Transcripts" />} />
  <Route path="wall" element={<AdminPlaceholder title="Founding Wall" />} />
</Route>
```

- [ ] **Step 4: Verify build + test locally**

```bash
pnpm build && pnpm dev
```
Navigate to `localhost:5173/admin` — should redirect to `/admin/login`.

- [ ] **Step 5: Commit**

```bash
git add src/components/AdminRoute.tsx src/components/AdminLayout.tsx src/App.tsx
git commit -m "feat: add admin layout, route protection, and login routing"
```

---

### Task 4: Data Hooks (Leads, Transcripts, Wall Notes)

**Files:**
- Create: `src/hooks/useLeads.ts`
- Create: `src/hooks/useTranscripts.ts`
- Create: `src/hooks/useWallNotes.ts`

- [ ] **Step 1: Create leads hook**

Create `src/hooks/useLeads.ts`:
```typescript
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { Lead, LeadStatus } from "../lib/supabase-types";

export function useLeads(statusFilter?: LeadStatus) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    const { data } = await query;
    setLeads(data ?? []);
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    const { error } = await supabase.from("leads").update(updates).eq("id", id);
    if (!error) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    }
    return error;
  };

  return { leads, loading, refetch: fetchLeads, updateLead };
}

export async function insertLead(lead: {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  location?: string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
  source: "form" | "chat";
}) {
  const { data, error } = await supabase
    .from("leads")
    .insert(lead)
    .select("id")
    .single();

  return { id: data?.id ?? null, error };
}
```

- [ ] **Step 2: Create transcripts hook**

Create `src/hooks/useTranscripts.ts`:
```typescript
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { ChatTranscript } from "../lib/supabase-types";

export function useTranscripts() {
  const [transcripts, setTranscripts] = useState<ChatTranscript[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTranscripts = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("chat_transcripts")
      .select("*")
      .order("created_at", { ascending: false });

    setTranscripts(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchTranscripts(); }, [fetchTranscripts]);

  return { transcripts, loading, refetch: fetchTranscripts };
}

export async function insertTranscript(transcript: {
  lead_id: string | null;
  messages: { role: string; content: string }[];
}) {
  const { error } = await supabase.from("chat_transcripts").insert(transcript);
  return error;
}
```

- [ ] **Step 3: Create wall notes hook**

Create `src/hooks/useWallNotes.ts`:
```typescript
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { WallNote, WallNoteStatus } from "../lib/supabase-types";

export function useWallNotes(statusFilter?: WallNoteStatus) {
  const [notes, setNotes] = useState<WallNote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("founding_wall_notes")
      .select("*")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    const { data } = await query;
    setNotes(data ?? []);
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const updateNote = async (id: string, updates: Partial<WallNote>) => {
    const { error } = await supabase.from("founding_wall_notes").update(updates).eq("id", id);
    if (!error) {
      setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)));
    }
    return error;
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase.from("founding_wall_notes").delete().eq("id", id);
    if (!error) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
    return error;
  };

  return { notes, loading, refetch: fetchNotes, updateNote, deleteNote };
}

export async function insertWallNote(note: {
  name: string;
  message: string;
  tag: string;
  city?: string;
}) {
  const { error } = await supabase.from("founding_wall_notes").insert(note);
  return error;
}

export async function fetchApprovedWallNotes() {
  const { data } = await supabase
    .from("founding_wall_notes")
    .select("*")
    .eq("status", "approved")
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false });

  return data ?? [];
}
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useLeads.ts src/hooks/useTranscripts.ts src/hooks/useWallNotes.ts
git commit -m "feat: add data hooks for leads, transcripts, and wall notes"
```

---

### Task 5: Dashboard Page

**Files:**
- Create: `src/pages/admin/DashboardPage.tsx`
- Modify: `src/App.tsx` — replace placeholder

- [ ] **Step 1: Create dashboard page**

Create `src/pages/admin/DashboardPage.tsx` with:
- Stat cards: leads this week (filter `created_at` >= 7 days ago), total leads, pending wall notes
- Leads by status breakdown (count per status)
- Recent activity: 10 most recent items from leads + wall notes combined, sorted by `updated_at` desc
- Uses `useLeads()` and `useWallNotes()` hooks
- Dark card UI matching site aesthetic: `bg-white/[0.04] border border-white/[0.06] rounded-xl`

- [ ] **Step 2: Wire into App.tsx**

Replace the Dashboard placeholder route with:
```typescript
import { DashboardPage } from "./pages/admin/DashboardPage";
// ...
<Route index element={<DashboardPage />} />
```

- [ ] **Step 3: Verify build + test locally**

```bash
pnpm build && pnpm dev
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin/DashboardPage.tsx src/App.tsx
git commit -m "feat: add admin dashboard page with stats and recent activity"
```

---

### Task 6: Leads Page

**Files:**
- Create: `src/pages/admin/LeadsPage.tsx`
- Modify: `src/App.tsx` — replace placeholder

- [ ] **Step 1: Create leads page**

Create `src/pages/admin/LeadsPage.tsx` with:
- Status filter dropdown at top (All / New / Contacted / Call Booked / Proposal Sent / Won / Lost)
- Table rows: name, email, source badge (blue for chat, gray for form), status badge (color-coded), date
- Click row to expand inline detail panel with:
  - All fields displayed in a grid
  - Status dropdown (updates via `updateLead`)
  - Private notes textarea (auto-saves on blur via `updateLead`)
  - "View Transcript" link if source === 'chat' (links to `/admin/transcripts`)
- Uses `useLeads(statusFilter)` hook

- [ ] **Step 2: Wire into App.tsx**

Replace the Leads placeholder route:
```typescript
import { LeadsPage } from "./pages/admin/LeadsPage";
// ...
<Route path="leads" element={<LeadsPage />} />
```

- [ ] **Step 3: Verify build + test locally**

```bash
pnpm build && pnpm dev
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin/LeadsPage.tsx src/App.tsx
git commit -m "feat: add admin leads page with filtering and inline detail"
```

---

### Task 7: Chat Transcripts Page

**Files:**
- Create: `src/pages/admin/TranscriptsPage.tsx`
- Modify: `src/App.tsx` — replace placeholder

- [ ] **Step 1: Create transcripts page**

Create `src/pages/admin/TranscriptsPage.tsx` with:
- List view: timestamp, message count, linked lead name (if lead_id exists, fetch from leads)
- Click to expand: full conversation in chat-bubble UI (Bot icon + user icon, same style as ChatWidget)
- Link to lead detail if associated

- [ ] **Step 2: Wire into App.tsx**

Replace the Transcripts placeholder route:
```typescript
import { TranscriptsPage } from "./pages/admin/TranscriptsPage";
// ...
<Route path="transcripts" element={<TranscriptsPage />} />
```

- [ ] **Step 3: Verify build + test locally**

```bash
pnpm build && pnpm dev
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin/TranscriptsPage.tsx src/App.tsx
git commit -m "feat: add admin transcripts page with chat viewer"
```

---

### Task 8: Founding Wall Admin Page

**Files:**
- Create: `src/pages/admin/WallPage.tsx`
- Modify: `src/App.tsx` — replace placeholder

- [ ] **Step 1: Create wall management page**

Create `src/pages/admin/WallPage.tsx` with:
- Two tabs: Pending | Approved
- Card layout per note: name, tag badge, city, message preview, date
- Pending tab actions: Approve button (update status='approved'), Reject button (update status='rejected')
- Approved tab actions: Pin/Unpin toggle (update pinned), Remove button (delete row with confirmation)
- Uses `useWallNotes(statusFilter)` hook

- [ ] **Step 2: Wire into App.tsx**

Replace the Wall placeholder route:
```typescript
import { WallPage } from "./pages/admin/WallPage";
// ...
<Route path="wall" element={<WallPage />} />
```

- [ ] **Step 3: Verify build + test locally**

```bash
pnpm build && pnpm dev
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/admin/WallPage.tsx src/App.tsx
git commit -m "feat: add admin founding wall page with approve/reject/pin"
```

---

### Task 9: Wire Public Forms to Supabase

**Files:**
- Modify: `src/sections/FinalCTA.tsx`
- Modify: `src/components/ChatWidget.tsx`
- Modify: `src/pages/FoundingWallPage.tsx`

- [ ] **Step 1: Update FinalCTA.tsx**

Add Supabase INSERT before the Web3Forms POST. Import `insertLead` from hooks. On form submit:
1. Call `insertLead({ ...formData, source: "form" })`
2. If Supabase succeeds, show success
3. Fire-and-forget Web3Forms POST for email backup

- [ ] **Step 2: Update ChatWidget.tsx**

Update `submitLead` function. Import `insertLead` and `insertTranscript`. When LEAD tag detected:
1. Call `insertLead({ ...leadData, source: "chat" })` — get back the lead `id`
2. If step 1 succeeded, call `insertTranscript({ lead_id: id, messages })` passing the full messages array from state
3. Fire-and-forget Web3Forms POST for email backup

- [ ] **Step 3: Update FoundingWallPage.tsx**

Update form handler. Import `insertWallNote`. On form submit:
1. Call `insertWallNote({ name, message, tag, city })`
2. If Supabase succeeds, show success
3. Fire-and-forget Web3Forms POST for email backup

Also update the public wall display to read from Supabase:
- Import `fetchApprovedWallNotes`
- Replace static `foundingWallNotes` import with a `useEffect` that calls `fetchApprovedWallNotes()` on mount
- Loading state while notes are fetched

- [ ] **Step 4: Verify build + test locally**

```bash
pnpm build && pnpm dev
```
Test: submit the contact form, check Supabase dashboard for the new row in `leads`.

- [ ] **Step 5: Commit**

```bash
git add src/sections/FinalCTA.tsx src/components/ChatWidget.tsx src/pages/FoundingWallPage.tsx
git commit -m "feat: wire public forms to Supabase with Web3Forms backup"
```

---

### Task 10: Cleanup and Deploy

**Files:**
- Remove: `api/contact.ts`
- Remove: `api/founding-wall.ts`
- Remove: `src/data/foundingWallNotes.ts`

- [ ] **Step 1: Remove unused files**

```bash
rm api/contact.ts api/founding-wall.ts src/data/foundingWallNotes.ts
```

- [ ] **Step 2: Remove any remaining imports of foundingWallNotes static data**

Check for and remove any imports of `foundingWallNotes` from the deleted file (FoundingWallPage.tsx should already be updated in Task 9).

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit and push**

```bash
git add -A
git commit -m "chore: remove unused API routes and static data files"
git push
```

- [ ] **Step 5: Add Supabase env vars to Vercel**

In Vercel dashboard → Settings → Environment Variables, add:
- `VITE_SUPABASE_URL` — from Supabase project settings
- `VITE_SUPABASE_ANON_KEY` — from Supabase project settings → API

- [ ] **Step 6: Create admin user in Supabase**

In Supabase dashboard → Authentication → Users → Add User:
- Email: `dean@developedbydean.ai`
- Password: (set a strong password)

- [ ] **Step 7: Run SQL setup**

In Supabase dashboard → SQL Editor, paste and run the full SQL from the spec document (creates tables, triggers, RLS policies).

- [ ] **Step 8: Final deploy verification**

Push triggers Vercel deploy. Verify:
1. `/admin/login` loads and accepts credentials
2. `/admin` shows dashboard
3. Contact form submission appears in `/admin/leads`
4. Founding wall note appears in `/admin/wall` as pending
5. Approving a note makes it visible on `/founding-wall`
