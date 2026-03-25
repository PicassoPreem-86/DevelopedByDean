import { motion } from "framer-motion";

const tools = [
  {
    name: "OpenAI",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>,
  },
  {
    name: "Anthropic",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.47-3.976H5.69l-1.461 3.976H.667l6.902-16.96zm1.04 3.79L5.2 13.545h4.847L7.61 7.311z"/></svg>,
  },
  {
    name: "React",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.846.206-1.663.96-1.256 4.63.33 8.174-3.024 1.398-5.015 3.503-5.015 5.29 0 2.758 4.16 4.46 9.022 4.46 4.862 0 9.023-1.702 9.023-4.46 0-1.777-1.972-3.872-4.978-5.27 1.603-3.566 2.022-7.26.358-8.226a1.537 1.537 0 0 0-.846-.194zM6.11 18.849c-.373.186-.81.28-1.306.28-1.9 0-3.45-.93-3.45-2.13 0-1.12 1.632-2.63 3.98-3.63.472 1.372 1.08 2.676 1.804 3.878-.398.546-.75 1.072-1.028 1.602zm11.78 0c-.278-.53-.63-1.056-1.028-1.602.724-1.202 1.332-2.506 1.804-3.877 2.348 1 3.98 2.508 3.98 3.628 0 1.2-1.55 2.13-3.45 2.13a3.233 3.233 0 0 1-1.306-.28zM12 15.004c-1.66 0-3-1.342-3-3s1.34-3 3-3 3 1.342 3 3-1.34 3-3 3z"/></svg>,
  },
  {
    name: "Next.js",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M18.665 21.978A11.94 11.94 0 0 1 12 24C5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727zM16.8 7.2h-1.6v9.6h1.6V7.2z"/></svg>,
  },
  {
    name: "Twilio",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 0C5.381 0 0 5.381 0 12s5.381 12 12 12 12-5.381 12-12S18.619 0 12 0zm0 20.4c-4.636 0-8.4-3.764-8.4-8.4S7.364 3.6 12 3.6s8.4 3.764 8.4 8.4-3.764 8.4-8.4 8.4zm3.6-11.4a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0zm-4.8 0a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0zm4.8 4.8a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0zm-4.8 0a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0z"/></svg>,
  },
  {
    name: "Make",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><circle cx="6" cy="12" r="4"/><circle cx="18" cy="12" r="4"/></svg>,
  },
  {
    name: "n8n",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  },
  {
    name: "Vercel",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M24 22.525H0l12-21.05 12 21.05z"/></svg>,
  },
  {
    name: "Supabase",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.66H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z"/></svg>,
  },
];

export function TechStack() {
  return (
    <section className="py-12 px-6 bg-surface-light border-y border-border-light">
      <div className="mx-auto max-w-container">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-content-muted">
          Built with industry-leading tools & platforms
        </p>
        <div className="flex items-center justify-center gap-8 lg:gap-10 overflow-x-auto">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="flex shrink-0 items-center gap-2.5 text-content-muted/50 hover:text-content-muted transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-border-light shadow-sm text-content-muted">
                {tool.svg}
              </span>
              <span className="text-sm font-medium hidden sm:block">{tool.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
