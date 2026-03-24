export function Footer() {
  return (
    <footer className="bg-hero px-6 py-12 border-t border-border-dark">
      <div className="mx-auto max-w-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-base font-bold text-white">Dean<span className="text-accent">.</span></span>
            <p className="mt-1 text-sm text-white/40">AI Developer & Systems Builder</p>
          </div>
          <p className="text-xs text-white/30">Available worldwide · Remote</p>
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} DevelopedByDean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
