import { HeroGridPattern } from "@/components/home/HeroGridPattern";

export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--hero-fade)_88%)]" />
      <div className="hero-orb hero-orb-a absolute -top-[20%] left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[var(--orb)] blur-[120px]" />
      <div className="hero-orb hero-orb-b absolute top-[30%] -right-[10%] h-[420px] w-[420px] rounded-full bg-[var(--orb)] blur-[100px]" />
      <HeroGridPattern className="top-20 right-0 bottom-0 left-0 z-0" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--hairline)] to-transparent" />
    </div>
  );
}
