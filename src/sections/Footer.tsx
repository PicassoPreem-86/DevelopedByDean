import { navLinks } from "../data/nav";

export function Footer() {
  return (
    <footer className="border-t border-divider bg-bg-primary px-6 py-16">
      <div className="mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="font-display text-sm font-medium tracking-[0.15em] uppercase text-text-primary">
              DevelopedByDean
            </span>
            <p className="mt-3 max-w-xs text-sm text-text-secondary font-body leading-relaxed">
              Custom websites and AI systems built with architectural precision
              for businesses that want to scale.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="mb-4 block font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
              Navigation
            </span>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="font-display text-sm text-accent hover:text-accent-hover transition-colors"
              >
                Start a Project
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="mb-4 block font-display text-xs tracking-[0.1em] uppercase text-text-secondary">
              Contact
            </span>
            <a
              href="mailto:hello@developedbydean.com"
              className="block text-sm text-text-secondary hover:text-accent transition-colors font-body"
            >
              hello@developedbydean.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex items-center justify-between border-t border-divider pt-8">
          <span className="text-xs text-text-secondary font-display tracking-[0.05em]">
            &copy; {new Date().getFullYear()} DevelopedByDean. All rights
            reserved.
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xs tracking-[0.1em] uppercase text-text-secondary hover:text-text-primary transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
