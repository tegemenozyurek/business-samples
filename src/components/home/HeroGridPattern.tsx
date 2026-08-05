type HeroGridPatternProps = {
  className?: string;
};

export function HeroGridPattern({
  className = "inset-0",
}: HeroGridPatternProps) {
  return (
    <div
      className={`pointer-events-none absolute -z-10 opacity-[0.75] ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          "linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
        maskImage:
          "radial-gradient(ellipse 95% 80% at 50% 12%, black 22%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 95% 80% at 50% 12%, black 22%, transparent 78%)",
      }}
    />
  );
}
