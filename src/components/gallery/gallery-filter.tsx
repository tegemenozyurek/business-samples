"use client";

import { galleryCategories, type GalleryCategory } from "@/lib/gallery-content";

type GalleryFilterProps = {
  active: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
};

export function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Galeri kategorileri"
      >
        {galleryCategories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[12px] font-medium tracking-[0.08em] transition-all duration-300 ${
                isActive
                  ? "border-[var(--heading)] bg-[var(--heading)] text-[#fbf9f7]"
                  : "border-[rgba(26,22,20,0.1)] bg-white/70 text-[var(--muted)] hover:border-[rgba(26,22,20,0.18)] hover:text-[var(--heading)]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
