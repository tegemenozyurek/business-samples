export const contactHeroImage =
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=2000&q=80";

const addressFull = "Teşvikiye Cad. No:12, Nişantaşı / İstanbul";
const addressQuery = encodeURIComponent(addressFull);

export const contactDetails = {
  phone: "+90 500 000 00 00",
  phoneHref: "tel:+905000000000",
  whatsapp: "WhatsApp Destek",
  whatsappHref: "https://wa.me/905000000000",
  instagram: "@esrakzlts_nailartist",
  instagramHref: "https://www.instagram.com/esrakzlts_nailartist/",
  email: "qevadigital@gmail.com",
  emailHref: "mailto:qevadigital@gmail.com",
  address: "Nişantaşı, İstanbul",
  addressFull,
  parking: "Salon önünde kısa süreli vale / yakında ücretli otopark.",
  transit: "Osmanbey Metro (M2) 6 dk yürüme mesafesi.",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Nisantasi%20Istanbul&t=&z=15&ie=UTF8&iwloc=&output=embed",
  /** Apple Maps — iOS / macOS default */
  directionsAppleUrl: `https://maps.apple.com/?daddr=${addressQuery}`,
  /** Google Maps directions — Android / others */
  directionsGoogleUrl: `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`,
} as const;

/** Opens the platform default maps app for directions. */
export function getDirectionsUrl(userAgent = ""): string {
  const ua = userAgent || (typeof navigator !== "undefined" ? navigator.userAgent : "");
  const isApple = /iPad|iPhone|iPod|Macintosh|Mac OS X/i.test(ua);
  return isApple
    ? contactDetails.directionsAppleUrl
    : contactDetails.directionsGoogleUrl;
}

export const workingHours: {
  id: string;
  label: string;
  hours: string;
  days: number[];
}[] = [
  {
    id: "weekday",
    label: "Pazartesi – Cuma",
    hours: "10:00 – 20:00",
    days: [1, 2, 3, 4, 5],
  },
  {
    id: "saturday",
    label: "Cumartesi",
    hours: "10:00 – 19:00",
    days: [6],
  },
  {
    id: "sunday",
    label: "Pazar",
    hours: "Kapalı",
    days: [0],
  },
];

export const contactFaq = [
  {
    question: "Nasıl randevu alabilirim?",
    answer:
      "Randevu Al butonuyla online formu doldurabilir veya WhatsApp / telefon üzerinden hızlıca yer ayırtabilirsiniz.",
  },
  {
    question: "Randevumu iptal edebilir miyim?",
    answer:
      "Evet. Randevunuzdan en az 24 saat önce haber vermeniz yeterli. Geç iptallerde aynı gün için yeni slot açılamayabilir.",
  },
  {
    question: "Walk-in kabul ediyor musunuz?",
    answer:
      "Yoğunluğa göre kabul edebiliyoruz; ancak hizmet kalitesi için randevu almanızı öneririz.",
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer:
      "Nakit, kredi / banka kartı ve bilinen mobil ödeme yöntemlerini kabul ediyoruz.",
  },
] as const;
