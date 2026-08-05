export type ServiceItem = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  image: string;
};

export const servicesHeroImage =
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=2000&q=80";

export const servicesList: ServiceItem[] = [
  {
    id: "manikur",
    name: "Manikür",
    description: "Profesyonel tırnak bakımı ve şekillendirme.",
    duration: "30–45 dk",
    price: "₺450 – ₺650",
    features: [
      "Premium Products",
      "Sterile Equipment",
      "Professional Finish",
      "Long-lasting",
    ],
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "pedikur",
    name: "Pedikür",
    description: "Ayak bakımı ve estetik görünüm.",
    duration: "45–60 dk",
    price: "₺550 – ₺850",
    features: [
      "Premium Products",
      "Sterile Equipment",
      "Professional Finish",
      "Long-lasting",
    ],
    image:
      "https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "kalici-oje",
    name: "Kalıcı Oje",
    description: "Uzun süre dayanıklı parlak görünüm.",
    duration: "60 dk",
    price: "₺650 – ₺900",
    features: [
      "Premium Products",
      "Sterile Equipment",
      "Professional Finish",
      "Long-lasting",
    ],
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "jel-tirnak",
    name: "Jel Tırnak",
    description: "Doğal görünümlü güçlü tırnaklar.",
    duration: "90 dk",
    price: "₺900 – ₺1.400",
    features: [
      "Premium Products",
      "Sterile Equipment",
      "Professional Finish",
      "Long-lasting",
    ],
    image:
      "https://images.unsplash.com/photo-1630843599725-32ead7671867?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "protez-tirnak",
    name: "Protez Tırnak",
    description: "Kişisel ölçülere uygun profesyonel uygulama.",
    duration: "120 dk",
    price: "₺1.200 – ₺2.000",
    features: [
      "Premium Products",
      "Sterile Equipment",
      "Professional Finish",
      "Long-lasting",
    ],
    image:
      "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "french",
    name: "French",
    description: "Zamansız ve zarif görünüm.",
    duration: "75 dk",
    price: "₺750 – ₺1.100",
    features: [
      "Premium Products",
      "Sterile Equipment",
      "Professional Finish",
      "Long-lasting",
    ],
    image:
      "https://images.unsplash.com/photo-1612887390768-fb02affea7a6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "nail-art",
    name: "Nail Art",
    description: "Kişiye özel tırnak tasarımları.",
    duration: "30–90 dk",
    price: "₺350 – ₺1.200",
    features: [
      "Premium Products",
      "Sterile Equipment",
      "Professional Finish",
      "Long-lasting",
    ],
    image:
      "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1000&q=80",
  },
];

export const servicesWhy = [
  {
    title: "Deneyimli Nail Artistler",
    description:
      "Form, oran ve renk dengesinde uzmanlaşmış sanatçı kadromuz.",
  },
  {
    title: "Steril Ortam",
    description:
      "Her seans öncesi sterilizasyon protokolüyle güvenli uygulama alanı.",
  },
  {
    title: "Premium Ürünler",
    description:
      "Cildi koruyan, uzun ömürlü ve stüdyo onaylı formüller.",
  },
  {
    title: "Kişisel Tasarımlar",
    description:
      "El yapınıza ve stilinize göre planlanan birebir danışmanlık.",
  },
] as const;

export const servicesProcess = [
  {
    step: "01",
    title: "Randevu",
    description: "Online veya WhatsApp üzerinden uygun saatinizi seçin.",
  },
  {
    step: "02",
    title: "Danışmanlık",
    description: "İstediğiniz stil, uzunluk ve tonu birlikte netleştiriyoruz.",
  },
  {
    step: "03",
    title: "Uygulama",
    description: "Steril protokolle özenli ve premium uygulama.",
  },
  {
    step: "04",
    title: "Keyfini Çıkarın",
    description: "Bakımlı, zarif ve uzun süre güzel duran sonuç.",
  },
] as const;

export const servicesFaq = [
  {
    question: "Tırnaklar ne kadar dayanır?",
    answer:
      "Kalıcı oje genelde 2–3 hafta, jel ve protez uygulamalar ise bakım aralıklarına göre 3–4 hafta formunu korur. Günlük alışkanlıklarınıza göre süre değişebilir.",
  },
  {
    question: "Nasıl bakım yapmalıyım?",
    answer:
      "Ellerinizi nemli tutun, sert yüzeylere çarpmaktan kaçının ve yağ bazlı cuticle bakımı yapın. Aşırı sıcak suya uzun süre maruz bırakmamak ömrü uzatır.",
  },
  {
    question: "Sonradan çıkarabilir miyim?",
    answer:
      "Evet. Uygulamalar stüdyomuzda güvenli şekilde çıkarılır. Evde zorla çıkarmak tırnak yüzeyine zarar verebilir; randevu almanızı öneririz.",
  },
  {
    question: "Randevu ne kadar sürer?",
    answer:
      "Seçilen hizmete göre 30 ile 120 dakika arasında değişir. Kartlarda süre aralıklarını bulabilirsiniz; danışmanlık sırasında kesin süre paylaşılır.",
  },
] as const;
