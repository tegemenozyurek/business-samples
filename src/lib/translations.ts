export const navCopy = {
  tr: {
    ariaLabel: "Ana navigasyon",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    links: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Hizmetler", href: "/hizmetler" },
      { label: "İletişim", href: "/iletisim" },
    ],
  },
  en: {
    ariaLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/hakkimizda" },
      { label: "Services", href: "/hizmetler" },
      { label: "Contact", href: "/iletisim" },
    ],
  },
} as const;
