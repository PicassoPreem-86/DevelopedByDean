import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../data/nav";
import { MagneticButton } from "./MagneticButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          className="fixed inset-0 z-50 flex flex-col bg-bg-primary"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-display text-sm font-medium tracking-[0.1em] uppercase text-text-primary">Menu</span>
            <button onClick={onClose} className="font-display text-sm font-medium tracking-[0.1em] uppercase text-text-secondary hover:text-text-primary transition-colors" aria-label="Close menu">
              Close
            </button>
          </div>
          <div className="line-h" />
          <div className="flex flex-1 flex-col justify-center px-6">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block border-b border-divider py-8 font-display text-4xl font-light text-text-primary hover:text-accent transition-colors"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
          <div className="px-6 pb-8">
            <MagneticButton href="#contact" variant="primary" className="w-full justify-center">
              Start a Project
            </MagneticButton>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
