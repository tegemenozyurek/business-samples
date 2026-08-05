export const navCopy = {
  tr: {
    ariaLabel: "Ana navigasyon",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    cta: "Randevu Al",
    links: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Galeri", href: "/gallery" },
      { label: "Hizmetler", href: "/hizmetler" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
  en: {
    ariaLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Book Now",
    links: [
      { label: "Home", href: "/" },
      { label: "Gallery", href: "/gallery" },
      { label: "Services", href: "/hizmetler" },
      { label: "Contact", href: "/iletisim" },
    ],
  },
} as const;
