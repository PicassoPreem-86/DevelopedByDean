import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "../components/Button";
import { MobileMenu } from "../components/MobileMenu";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { navLinks } from "../data/nav";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          isScrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#" className="font-display text-xl font-bold text-text-primary">
            DevelopedBy<span className="gradient-text">Dean</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-body text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button href="#contact" size="sm" className="hidden lg:inline-flex">
              Get In Touch
            </Button>
            <button
              className="p-2 text-text-secondary hover:text-text-primary transition-colors lg:hidden"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
