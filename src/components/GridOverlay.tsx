export function GridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
      <div className="mx-auto h-full max-w-container px-6">
        <div className="flex h-full justify-between">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="line-v h-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
