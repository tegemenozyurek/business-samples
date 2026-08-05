"use client";

import { useMemo, useState } from "react";
import {
  galleryItems,
  type GalleryCategory,
} from "@/lib/gallery-content";
import { GalleryCta } from "./gallery-cta";
import { GalleryFilter } from "./gallery-filter";
import { GalleryGrid } from "./gallery-grid";
import { GalleryHero } from "./gallery-hero";
import { GalleryLightbox } from "./gallery-lightbox";
import { InstagramPreview } from "./instagram-preview";

export function GalleryPageView() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Tümü");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "Tümü") {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const openIndex = filteredItems.findIndex((item) => item.id === activeId);

  const openLightbox = (id: string) => setActiveId(id);
  const closeLightbox = () => setActiveId(null);

  const showPrev = () => {
    if (filteredItems.length === 0 || openIndex < 0) {
      return;
    }
    const nextIndex =
      (openIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveId(filteredItems[nextIndex].id);
  };

  const showNext = () => {
    if (filteredItems.length === 0 || openIndex < 0) {
      return;
    }
    const nextIndex = (openIndex + 1) % filteredItems.length;
    setActiveId(filteredItems[nextIndex].id);
  };

  return (
    <main>
      <GalleryHero />

      <section className="bg-[var(--background)] py-10 lg:py-12">
        <GalleryFilter active={activeCategory} onChange={setActiveCategory} />
        <div className="mt-8 lg:mt-10">
          <GalleryGrid items={filteredItems} onOpen={openLightbox} />
        </div>
      </section>

      <InstagramPreview />
      <GalleryCta />

      <GalleryLightbox
        items={filteredItems}
        activeId={activeId}
        onClose={closeLightbox}
        onPrev={showPrev}
        onNext={showNext}
      />
    </main>
  );
}
