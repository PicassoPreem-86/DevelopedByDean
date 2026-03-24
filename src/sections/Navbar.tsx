import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";

const navLinks = [
  { label: "What I Build", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-4 left-4 right-4 z-50 mx-auto max-w-container rounded-2xl transition-all duration-500 ${
          isScrolled
            ? "bg-hero/80 backdrop-blur-xl border border-border-dark shadow-lg"
            : "bg-hero/40 backdrop-blur-md border border-transparent"
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between px-6 py-3.5">
          <a href="#" className="text-lg font-bold italic text-white">Dean</a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-accent-hover transition-colors lg:inline-flex"
            >
              <Calendar size={14} /> Book a Free Call →
            </a>
            <button
              className="rounded-lg p-2 text-white/60 hover:text-white transition-colors lg:hidden"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-hero/95 backdrop-blur-xl flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-lg font-bold italic text-white">Dean</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-white/60 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-semibold text-white/80 hover:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-base font-semibold text-white hover:bg-accent-hover transition-colors"
              >
                <Calendar size={14} /> Book a Free Call →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
