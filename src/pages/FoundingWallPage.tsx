import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Pin, Send, Sparkles } from "lucide-react";
import { SEO } from "../components/SEO";
import { FinalCTA } from "../sections/FinalCTA";
import { FOUNDING_WALL_OG_IMAGE_URL } from "../../shared/siteConfig";
import {
  foundingWallNotes,
  type FoundingWallNote,
  type FoundingWallTag,
} from "../data/foundingWallNotes";

type FormStatus = "idle" | "submitting" | "success" | "error";

const FOUNDING_WALL_TAGS: FoundingWallTag[] = [
  "Friend",
  "Builder",
  "Creative",
  "Supporter",
  "Founder Circle",
];

const NOTE_ROTATIONS = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "rotate-[1.5deg]",
  "-rotate-[1.5deg]",
];

const NOTE_TINTS = [
  "bg-[#fff6cf]",
  "bg-[#ffe6dc]",
  "bg-[#e7f6ff]",
  "bg-[#eef8de]",
  "bg-[#f2e8ff]",
  "bg-[#ffeeba]",
];

const FOUNDING_WALL_ENDPOINT = "/api/founding-wall";

export function FoundingWallPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    tag: "Supporter" as FoundingWallTag,
    city: "",
  });

  const pinnedNotes = foundingWallNotes.filter((note) => note.pinned);
  const regularNotes = foundingWallNotes.filter((note) => !note.pinned);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(FOUNDING_WALL_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({
        name: "",
        message: "",
        tag: "Supporter",
        city: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-[#d8c9a1] bg-white/85 px-4 py-3 text-sm text-content-primary placeholder:text-content-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";

  return (
    <>
      <SEO
        title="Founding Wall"
        description="Leave a note on the Founding Wall and sign the launch bulletin board for DevelopedByDean."
        path="/founding-wall"
        image={FOUNDING_WALL_OG_IMAGE_URL}
        keywords={[
          "founding wall",
          "launch guest book",
          "digital bulletin board",
          "sign the launch wall",
        ]}
      />

      <section className="relative overflow-hidden bg-hero px-6 pb-16 pt-28 text-white lg:pb-24 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-container">
          <div className="grid gap-12 lg:grid-cols-[1.15fr,0.85fr] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-light">
                <Sparkles size={14} />
                New Chapter
              </p>
              <h1 className="mt-6 max-w-4xl text-[clamp(2.3rem,5vw,4.25rem)] font-extrabold leading-[1.03] tracking-tight">
                Sign the Founding Wall
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72">
                This site marks the start of a new chapter. Leave a short note on the launch wall
                and add your name to the first wave of supporters, friends, builders, and creative
                people who were here at the beginning.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/55">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Moderated before publish
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Short notes only
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Built for launch week and beyond
                </span>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#d8c9a1]/35 bg-[#f7e8bf] p-6 text-content-primary shadow-[0_25px_80px_rgba(0,0,0,0.28)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-content-muted">
                Founding Count
              </p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl font-extrabold leading-none">
                  {foundingWallNotes.length}
                </span>
                <span className="pb-1 text-sm font-medium text-content-muted">
                  approved notes on the wall
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-content-body">
                Every note submitted here comes through moderation first so the wall stays clean,
                personal, and worth sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e6d4a8] px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-[2rem] border border-[#cbb68d] bg-[#caa87c] p-5 shadow-[0_30px_80px_rgba(39,24,7,0.18)]">
              <div
                className="relative min-h-[560px] rounded-[1.5rem] border border-[#b69063] bg-[#b88958] p-6 shadow-inner"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0.03)), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 35%)",
                }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                      Bulletin Board
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      Launch Notes
                    </h2>
                  </div>
                  <Pin size={18} className="text-white/45" />
                </div>

                {foundingWallNotes.length === 0 ? (
                  <div className="flex min-h-[430px] items-center justify-center rounded-[1.25rem] border border-dashed border-white/20 bg-white/5 p-8 text-center">
                    <div className="max-w-md">
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
                        Waiting For The First Notes
                      </p>
                      <p className="mt-4 text-base leading-relaxed text-white/72">
                        Be one of the first people to sign the wall. Once notes are approved,
                        they’ll appear here as pinned launch cards.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[...pinnedNotes, ...regularNotes].map((note, index) => (
                      <FoundingWallCard key={note.id} note={note} index={index} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#d8c9a1] bg-[#f7edd0] p-6 shadow-[0_24px_70px_rgba(40,24,4,0.16)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-content-muted">
                Leave a Note
              </p>
              <h2 className="mt-3 text-2xl font-bold text-content-primary">
                Add your name to the wall
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-content-body">
                Keep it short, kind, and real. Notes are reviewed before they appear publicly on
                the board.
              </p>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-white p-6"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
                      Note Submitted
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-content-body">
                      Your note is in the moderation queue. Once approved, it can be pinned to the
                      public board.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <label htmlFor="founding-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-content-muted">
                        First Name
                      </label>
                      <input
                        id="founding-name"
                        name="name"
                        required
                        maxLength={40}
                        value={formData.name}
                        onChange={(event) =>
                          setFormData({ ...formData, name: event.target.value })
                        }
                        placeholder="Your first name"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="founding-tag" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-content-muted">
                          Tag
                        </label>
                        <select
                          id="founding-tag"
                          name="tag"
                          value={formData.tag}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              tag: event.target.value as FoundingWallTag,
                            })
                          }
                          className={inputClass}
                        >
                          {FOUNDING_WALL_TAGS.map((tag) => (
                            <option key={tag} value={tag}>
                              {tag}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="founding-city" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-content-muted">
                          City
                        </label>
                        <input
                          id="founding-city"
                          name="city"
                          maxLength={50}
                          value={formData.city}
                          onChange={(event) =>
                            setFormData({ ...formData, city: event.target.value })
                          }
                          placeholder="Optional"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="founding-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-content-muted">
                        Note
                      </label>
                      <textarea
                        id="founding-message"
                        name="message"
                        required
                        maxLength={220}
                        rows={5}
                        value={formData.message}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            message: event.target.value,
                          })
                        }
                        placeholder="Leave a short note for the launch wall."
                        className={`${inputClass} resize-none`}
                      />
                      <p className="mt-2 text-right text-xs text-content-muted">
                        {formData.message.length}/220
                      </p>
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-600">
                        Something went wrong. Please try again in a moment.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Send size={16} />
                      {status === "submitting" ? "Submitting..." : "Submit to Founding Wall"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

function FoundingWallCard({
  note,
  index,
}: {
  note: FoundingWallNote;
  index: number;
}) {
  return (
    <motion.article
      className={`relative rounded-[1.4rem] border border-[#d8bd89] p-5 text-content-primary shadow-[0_16px_40px_rgba(60,34,8,0.18)] ${NOTE_TINTS[index % NOTE_TINTS.length]} ${NOTE_ROTATIONS[index % NOTE_ROTATIONS.length]}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b83737] shadow-[0_4px_8px_rgba(0,0,0,0.25)]" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-content-muted">
            {note.tag}
          </p>
          <h3 className="mt-2 text-lg font-bold">{note.name}</h3>
        </div>
        {note.pinned && (
          <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-content-muted">
            Pinned
          </span>
        )}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-content-body">{note.message}</p>
      {note.city && (
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-content-muted">
          <MapPin size={12} />
          {note.city}
        </p>
      )}
    </motion.article>
  );
}
