export type GalleryCategory =
  | "Tümü"
  | "Manikür"
  | "Pedikür"
  | "Kalıcı Oje"
  | "Jel Tırnak"
  | "Protez Tırnak"
  | "Minimal";

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  description: string;
  category: Exclude<GalleryCategory, "Tümü">;
  height: "tall" | "medium" | "square";
};

export const galleryCategories: GalleryCategory[] = [
  "Tümü",
  "Manikür",
  "Pedikür",
  "Kalıcı Oje",
  "Jel Tırnak",
  "Protez Tırnak",
  "Minimal",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
    title: "Nude Silk Manikür",
    description: "Doğal tırnak formuna uyumlu soft nude bitiş.",
    category: "Manikür",
    height: "tall",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80",
    title: "Rose Gloss",
    description: "Parlak pembe tonlarda zarif kalıcı oje.",
    category: "Kalıcı Oje",
    height: "square",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?auto=format&fit=crop&w=1000&q=80",
    title: "Spa Pedikür",
    description: "Rahatlatıcı bakım ve temiz, soft finish.",
    category: "Pedikür",
    height: "medium",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1630843599725-32ead7671867?auto=format&fit=crop&w=1000&q=80",
    title: "Ivory Gel",
    description: "İnce yapıda doğal görünümlü jel güçlendirme.",
    category: "Jel Tırnak",
    height: "tall",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1000&q=80",
    title: "Blush Art",
    description: "Minimal çizgilerle modern nail art detayı.",
    category: "Minimal",
    height: "medium",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?auto=format&fit=crop&w=1000&q=80",
    title: "Soft Extension",
    description: "Dengeli uzunluk ve premium protez tırnak formu.",
    category: "Protez Tırnak",
    height: "square",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1612887390768-fb02affea7a6?auto=format&fit=crop&w=1000&q=80",
    title: "Classic French",
    description: "Temiz white tip ile zamansız french görünüm.",
    category: "Kalıcı Oje",
    height: "tall",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1599206676335-193c82b13c9e?auto=format&fit=crop&w=1000&q=80",
    title: "Quiet Minimal",
    description: "Tek renk, sade ve sofistike bitiş.",
    category: "Minimal",
    height: "medium",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1610992015836-7c249d75782d?auto=format&fit=crop&w=1000&q=80",
    title: "Champagne Glow",
    description: "Sezonluk soft shimmer dokunuşlar.",
    category: "Kalıcı Oje",
    height: "square",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80",
    title: "Petal Finish",
    description: "Işıltılı pembe kalıcı oje uygulaması.",
    category: "Kalıcı Oje",
    height: "medium",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=80",
    title: "Studio Care",
    description: "Profesyonel bakım anından zarif bir kare.",
    category: "Manikür",
    height: "tall",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?auto=format&fit=crop&w=1000&q=80",
    title: "Color Ritual",
    description: "Sezon paletinden seçilmiş soft tonlar.",
    category: "Kalıcı Oje",
    height: "square",
  },
  {
    id: "13",
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
    title: "Bare Luxury",
    description: "Minimalist nude manikür detayı.",
    category: "Minimal",
    height: "medium",
  },
  {
    id: "14",
    src: "https://images.unsplash.com/photo-1630843599725-32ead7671867?auto=format&fit=crop&w=1000&q=80",
    title: "Porcelain Tips",
    description: "İnce french çizgisiyle modern yorum.",
    category: "Kalıcı Oje",
    height: "tall",
  },
  {
    id: "15",
    src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1000&q=80",
    title: "Line Study",
    description: "İnce art detaylarıyla kişiselleştirilmiş tasarım.",
    category: "Minimal",
    height: "square",
  },
  {
    id: "16",
    src: "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?auto=format&fit=crop&w=1000&q=80",
    title: "Sculpted Form",
    description: "Zarif protez form ve doğal geçiş.",
    category: "Protez Tırnak",
    height: "medium",
  },
];
