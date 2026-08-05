export type TemplateId = "rez" | "sip";

export type NavLink = {
  label: string;
  href: string;
};

export type NavCopy = {
  ariaLabel: string;
  openMenu: string;
  closeMenu: string;
  cta: string;
  ctaHref: string;
  homeHref: string;
  links: NavLink[];
};

export const landingCopy = {
  tr: {
    rezervasyon: "Rezervasyon",
    siparis: "Siparis",
  },
  en: {
    rezervasyon: "Reservation",
    siparis: "Order",
  },
} as const;

export const rezNavCopy: Record<"tr" | "en", NavCopy> = {
  tr: {
    ariaLabel: "Ana navigasyon",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    cta: "Randevu Al",
    ctaHref: "/rez/randevu",
    homeHref: "/rez",
    links: [
      { label: "Ana Sayfa", href: "/rez" },
      { label: "Galeri", href: "/rez/gallery" },
      { label: "Hizmetler", href: "/rez/hizmetler" },
      { label: "İletişim", href: "/rez/iletisim" },
    ],
  },
  en: {
    ariaLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Book Now",
    ctaHref: "/rez/randevu",
    homeHref: "/rez",
    links: [
      { label: "Home", href: "/rez" },
      { label: "Gallery", href: "/rez/gallery" },
      { label: "Services", href: "/rez/hizmetler" },
      { label: "Contact", href: "/rez/iletisim" },
    ],
  },
};

export const sipNavCopy: Record<"tr" | "en", NavCopy> = {
  tr: {
    ariaLabel: "Ana navigasyon",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    cta: "Siparis Ver",
    ctaHref: "/sip/siparis",
    homeHref: "/sip",
    links: [
      { label: "Ana Sayfa", href: "/sip" },
      { label: "Menu", href: "/sip/menu" },
      { label: "İletişim", href: "/sip/iletisim" },
    ],
  },
  en: {
    ariaLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Place Order",
    ctaHref: "/sip/siparis",
    homeHref: "/sip",
    links: [
      { label: "Home", href: "/sip" },
      { label: "Menu", href: "/sip/menu" },
      { label: "Contact", href: "/sip/iletisim" },
    ],
  },
};

export function getNavCopy(template: TemplateId, lang: "tr" | "en"): NavCopy {
  return template === "rez" ? rezNavCopy[lang] : sipNavCopy[lang];
}
