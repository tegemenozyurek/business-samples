export function ArtPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--hairline) 1.15px, transparent 1.2px)",
        backgroundSize: "22px 22px",
        backgroundPosition: "0 0",
        maskImage:
          "radial-gradient(ellipse 85% 75% at 70% 45%, black 15%, transparent 72%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 85% 75% at 70% 45%, black 15%, transparent 72%)",
        opacity: 0.85,
      }}
    />
  );
}
