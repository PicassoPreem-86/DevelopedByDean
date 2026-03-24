import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navLinks } from "../data/nav";
import { MobileMenu } from "../components/MobileMenu";
import { MagneticButton } from "../components/MagneticButton";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-bg-primary/90 backdrop-blur-md border-b border-divider" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="mx-auto flex max-w-container items-center justify-between px-6 py-5">
          <a href="#" className="font-display text-sm font-medium tracking-[0.15em] uppercase text-text-primary">
            DevelopedByDean
          </a>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="font-display text-xs font-medium tracking-[0.1em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <MagneticButton href="#contact" variant="outline" className="hidden lg:inline-flex text-xs py-3 px-6">
              Start a Project
            </MagneticButton>
            <button
              className="font-display text-xs font-medium tracking-[0.1em] uppercase text-text-secondary hover:text-text-primary transition-colors lg:hidden"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
}
