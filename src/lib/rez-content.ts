export const rezImages = {
  hero: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=2000&q=80",
  about: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1400&q=80",
  services: [
    {
      src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
      title: "Manikür",
      description: "Şekillendirme, bakım ve soft nude tonlarla zarif bir bitiş.",
      price: "₺450 – ₺650",
    },
    {
      src: "https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?auto=format&fit=crop&w=900&q=80",
      title: "Pedikür",
      description: "Rahatlatıcı spa pedikür ve uzun süre kalıcı bakım.",
      price: "₺550 – ₺850",
    },
    {
      src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80",
      title: "Kalıcı Oje",
      description: "Parlak, çatlaksız ve haftalarca dayanan kalıcı oje uygulaması.",
      price: "₺650 – ₺900",
    },
    {
      src: "https://images.unsplash.com/photo-1630843599725-32ead7671867?auto=format&fit=crop&w=900&q=80",
      title: "Jel Tırnak",
      description: "Doğal görünümlü güçlendirme ve kusursuz form.",
      price: "₺900 – ₺1.400",
    },
    {
      src: "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?auto=format&fit=crop&w=900&q=80",
      title: "Protez Tırnak",
      description: "İnce yapı, dengeli uzunluk ve premium bitiş.",
      price: "₺1.200 – ₺2.000",
    },
    {
      src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=900&q=80",
      title: "Nail Art",
      description: "Minimal çizgilerden detaylı sanat çalışmalarınıza özel tasarım.",
      price: "₺350 – ₺1.200",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1612887390768-fb02affea7a6?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1599206676335-193c82b13c9e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1610992015836-7c249d75782d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1630843599725-32ead7671867?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?auto=format&fit=crop&w=900&q=80",
  ],
  testimonials: [
    {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      name: "Elif Yılmaz",
      review:
        "Her ziyaretimde aynı özen ve hijyen. Protez tırnaklarım hem doğal hem çok dayanıklı duruyor.",
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
      name: "Selin Kara",
      review:
        "Atmosfer inanılmaz huzurlu. Nail art detayları tam istediğim gibi, randevu almak çok kolay.",
    },
    {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      name: "Deniz Acar",
      review:
        "Kalıcı oje rengi haftalarca ilk günkü gibi kaldı. Kesinlikle premium bir deneyim.",
    },
  ],
} as const;

/** Preview posts from https://www.instagram.com/esrakzlts_nailartist */
export const rezInstagram = {
  handle: "@esrakzlts_nailartist",
  profileUrl: "https://www.instagram.com/esrakzlts_nailartist/",
  posts: [
    {
      src: "/instagram/1.jpg",
      href: "https://www.instagram.com/p/Dbq_XZpAvWQ/",
    },
    {
      src: "/instagram/2.jpg",
      href: "https://www.instagram.com/p/Dbq_UjCi81R/",
    },
    {
      src: "/instagram/3.jpg",
      href: "https://www.instagram.com/p/Dbq_JWgArP0/",
    },
    {
      src: "/instagram/4.jpg",
      href: "https://www.instagram.com/p/Dbq_FWciYUs/",
    },
  ],
} as const;

export const rezWhy = [
  {
    title: "Premium Ürünler",
    description: "Cildi nazikçe koruyan, uzun ömürlü ve stüdyo onaylı formüller.",
  },
  {
    title: "Steril Ekipman",
    description: "Her seans öncesi sterilizasyon protokolüyle güvenli uygulama.",
  },
  {
    title: "Uzman Sanatçılar",
    description: "Form, oran ve renk konusunda eğitimli nail artist kadrosu.",
  },
  {
    title: "Kişiye Özel Hizmet",
    description: "El yapınıza ve stilinize göre planlanan birebir danışmanlık.",
  },
] as const;
