import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";

const socialLinks = [
  { label: "GitHub", icon: Github, href: "https://github.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "X / Twitter", icon: Twitter, href: "https://x.com" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-bg-primary px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-text-secondary">&copy; {new Date().getFullYear()} DevelopedByDean</p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary" aria-label={link.label}>
              <link.icon size={18} />
            </a>
          ))}
        </div>
        <button onClick={scrollToTop} className="flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text-primary" aria-label="Back to top">
          <ArrowUp size={14} />
          Back to top
        </button>
      </div>
    </footer>
  );
}
