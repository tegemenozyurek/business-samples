"use client";

export function FloatingColorsButton() {
  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-40 flex items-center">
      <div
        className="floating-colors-btn pointer-events-auto flex flex-col items-center gap-1 rounded-l-2xl border border-r-0 border-white/8 bg-[rgba(0,0,0,0.35)] px-2.5 py-4 backdrop-blur-md"
        aria-label="Colors"
        role="img"
      >
        <span className="h-1 w-1 rounded-full bg-[#ef4444]" />
        <span className="h-1 w-1 rounded-full bg-[#22c55e]" />
        <span className="h-1 w-1 rounded-full bg-[#3b82f6]" />
      </div>
    </div>
  );
}
