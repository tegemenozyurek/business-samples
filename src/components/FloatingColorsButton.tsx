"use client";

export function FloatingColorsButton() {
  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-40 flex items-center">
      <div
        className="floating-colors-btn pointer-events-auto flex flex-col items-center gap-3 rounded-l-2xl border border-r-0 border-white/8 bg-[rgba(0,0,0,0.35)] px-3 py-6 backdrop-blur-md"
        aria-label="Colors"
        role="img"
      >
        <span
          className="text-[11px] font-medium tracking-[0.22em] text-heading uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Colors
        </span>

        <span className="flex flex-col gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f5c6c6]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4e5c8]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#c9daf0]" />
        </span>
      </div>
    </div>
  );
}
