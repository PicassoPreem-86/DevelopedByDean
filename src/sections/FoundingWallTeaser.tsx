import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Pin, Sparkles } from "lucide-react";

export function FoundingWallTeaser() {
  return (
    <section className="bg-white px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-container">
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-[#d8c9a1] bg-[#f7edd0] p-6 shadow-[0_30px_80px_rgba(40,24,4,0.12)] lg:p-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="absolute right-8 top-8 hidden rounded-full bg-[#b83737] p-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.18)] lg:block">
            <Pin size={16} className="text-white" />
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#d8c9a1] bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-content-muted">
                <Sparkles size={14} className="text-accent" />
                Launch Moment
              </p>
              <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,3.8vw,3rem)] font-extrabold leading-tight text-content-primary">
                Add your name to the Founding Wall
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-content-body">
                I built a launch bulletin board for this new chapter. Friends, supporters, builders,
                and visitors can leave a short note and help mark the beginning of this career path.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm text-content-muted">
                <span className="rounded-full border border-[#d8c9a1] bg-white/70 px-4 py-2">
                  Premium bulletin-board design
                </span>
                <span className="rounded-full border border-[#d8c9a1] bg-white/70 px-4 py-2">
                  Moderated before publish
                </span>
                <span className="rounded-full border border-[#d8c9a1] bg-white/70 px-4 py-2">
                  Built to share on social
                </span>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#cbb68d] bg-[#b88958] p-5 shadow-inner">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-[#d8bd89] bg-[#fff6cf] p-4 shadow-[0_12px_28px_rgba(60,34,8,0.16)] -rotate-2">
                  <div className="mx-auto -mt-7 mb-3 h-4 w-4 rounded-full bg-[#b83737] shadow-[0_4px_8px_rgba(0,0,0,0.25)]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-content-muted">
                    Supporter
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-content-primary">
                    Proud of you for building this from scratch. Excited to watch what comes next.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-[#d8bd89] bg-[#e7f6ff] p-4 shadow-[0_12px_28px_rgba(60,34,8,0.16)] rotate-2">
                  <div className="mx-auto -mt-7 mb-3 h-4 w-4 rounded-full bg-[#b83737] shadow-[0_4px_8px_rgba(0,0,0,0.25)]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-content-muted">
                    Builder
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-content-primary">
                    This feels like the start of something real. Glad I got to sign the wall early.
                  </p>
                </div>
              </div>
              <Link
                to="/founding-wall"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-hero px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                Visit the Founding Wall <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
