import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./Button";
import { navLinks } from "../data/nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col bg-bg-secondary/95 backdrop-blur-xl border-l border-border p-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            aria-label="Mobile navigation"
          >
            <button
              onClick={onClose}
              className="mb-12 self-end p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`font-display text-2xl font-semibold transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "gradient-text"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <Button href="#contact" size="lg" className="w-full" onClick={onClose}>
                Get In Touch
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
