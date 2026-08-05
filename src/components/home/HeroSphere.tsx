import Image from "next/image";

export function HeroSphere() {
  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[300px] items-center justify-center sm:max-w-[360px] lg:mx-0 lg:max-w-[440px] lg:justify-end"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-[-8%] scale-110 rounded-full bg-[var(--orb)] blur-[90px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--orb)] blur-[70px]" />
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_30%_20%,var(--hairline),transparent_55%)] opacity-60 blur-2xl" />

      <div className="relative aspect-square w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px]">
        <Image
          src="/images/sphere.avif"
          alt=""
          width={720}
          height={720}
          priority
          unoptimized
          className="h-full w-full object-contain drop-shadow-[0_0_60px_rgba(255,255,255,0.08)] theme-light:drop-shadow-[0_0_50px_rgba(0,0,0,0.12)]"
        />
      </div>
    </div>
  );
}
