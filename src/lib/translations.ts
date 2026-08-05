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

export const servicesCopy = {
  tr: {
    heroTitle: "Hizmetlerimiz",
    heroDescription:
      "QEVA Digital, markaların dijitalde büyümesi için yaratıcı strateji, rafine tasarım ve güçlü teknolojiyi tek bir premium deneyimde birleştirir.",
    quoteCta: "Teklif Al",
    services: [
      {
        key: "content",
        title: "Yeni Nesil İçerik & Çekim Desteği",
        description:
          "Ağır stüdyo ekipmanlarının hantallığından uzak, sosyal medyanın ruhuna uygun dinamik çekimler yapıyoruz. Markanızı telefonun samimi estetiği ve güncel trendlerle buluşturuyor; takipçilerinizin kendinden bir şeyler bulacağı, doğal ve yüksek etkileşimli görsel içerikler üretiyoruz.",
      },
      {
        key: "web",
        title: "Dönüşüm Odaklı Web Tasarım",
        description:
          "Sadece güzel görünen değil, markanızın karakterini yansıtan ve tıklandığında satışa dönüştüren modern web siteleri tasarlıyoruz. Kullanıcı deneyimini ön planda tutarak, hızla açılan ve mobil dünyayla tam uyumlu, yaşayan dijital kimlikler inşa ediyoruz.",
      },
      {
        key: "social",
        title: "Sosyal Medya Görsel Desteği",
        description:
          'Kurgulanmış sahnelerden ziyade, "o anın" enerjisini yansıtan çekimlerle feed\'inizi canlandırıyoruz. Takipçilerinizin reklam gibi değil, bir yaşam tarzı gibi göreceği içerikler üretiyoruz.',
      },
      {
        key: "ads",
        title: "Stratejik Reklam Yönetimi",
        description:
          "Bütçenizi en doğru hedef kitleyle buluşturuyor, veriye dayalı reklam stratejileriyle markanızı büyütüyoruz. Meta ve Google reklamlarında sadece gösterim değil; gerçek sonuçlar, tıklamalar ve müşteri kazanımı odaklı kampanyalar yönetiyoruz.",
      },
    ],
    processTitle: "İş Akışımız",
    processSubtitle:
      "Her başarılı proje disiplinli, kontrollü ve stratejik bir süreçle ilerler.",
    processSteps: [
      {
        number: "01",
        title: "Keşif",
        text: "Markanızın DNA'sına iniyoruz.",
      },
      {
        number: "02",
        title: "Stratejik Plan",
        text: "Dijital yol haritanızı çiziyoruz.",
      },
      {
        number: "03",
        title: "Yaratıcı Üretim",
        text: "Tasarımı ve kodları canlandırıyoruz.",
      },
      {
        number: "04",
        title: "Lansman",
        text: "Markanızı dijital semaya çıkarıyoruz.",
      },
      {
        number: "05",
        title: "Gelişim",
        text: "Sürekli takip ve optimizasyonla zirvede tutuyoruz.",
      },
    ],
  },
  en: {
    heroTitle: "Our Services",
    heroDescription:
      "QEVA Digital combines creative strategy, refined design, and powerful technology into one premium experience that helps brands grow in the digital world.",
    quoteCta: "Get a Quote",
    services: [
      {
        key: "content",
        title: "Next-Gen Content & Production Support",
        description:
          "Away from bulky studio gear, we create dynamic shoots that match the spirit of social media. We bring your brand together with the intimacy of phone aesthetics and current trends, producing natural, high-engagement visual content your audience can relate to.",
      },
      {
        key: "web",
        title: "Conversion-Focused Web Design",
        description:
          "We design modern websites that do more than look beautiful — they reflect your brand character and convert clicks into sales. With UX at the center, we build fast, mobile-ready digital identities that feel alive.",
      },
      {
        key: "social",
        title: "Social Media Visual Support",
        description:
          'Rather than staged scenes, we energize your feed with shoots that capture the feel of the moment. We create content your followers experience as a lifestyle — not as an ad.',
      },
      {
        key: "ads",
        title: "Strategic Ad Management",
        description:
          "We connect your budget with the right audience and grow your brand through data-driven advertising strategies. On Meta and Google, we manage campaigns focused on real results, clicks, and customer acquisition — not just impressions.",
      },
    ],
    processTitle: "Our Workflow",
    processSubtitle:
      "Every successful project moves through a disciplined, controlled, and strategic process.",
    processSteps: [
      {
        number: "01",
        title: "Discovery",
        text: "We dive into your brand's DNA.",
      },
      {
        number: "02",
        title: "Strategic Plan",
        text: "We map your digital roadmap.",
      },
      {
        number: "03",
        title: "Creative Production",
        text: "We bring design and code to life.",
      },
      {
        number: "04",
        title: "Launch",
        text: "We take your brand to the digital stage.",
      },
      {
        number: "05",
        title: "Growth",
        text: "We keep you at the top with continuous tracking and optimization.",
      },
    ],
  },
} as const;

export const contactCopy = {
  tr: {
    eyebrow: "İletişim",
    title: "Bize Ulaşın",
    description:
      "Markanızın dijital devrimini bugün başlatın. Projenizi dinleyelim, size özel bir çözüm sunalım.",
    items: {
      email: "E-posta",
      phone: "Telefon",
      location: "Konum",
      locationValue: "İzmir, Türkiye",
      instagram: "Instagram",
    },
    form: {
      name: "Ad Soyad",
      namePlaceholder: "Adınız Soyadınız",
      company: "Şirket Adı",
      companyPlaceholder: "Şirketiniz",
      email: "E-posta",
      emailPlaceholder: "ornek@sirket.com",
      phone: "Telefon",
      phonePlaceholder: "555 444 33 22",
      service: "Hizmet Türü",
      servicePlaceholder: "Hizmet seçiniz",
      message: "Mesaj",
      messagePlaceholder: "Projeniz hakkında kısaca bilgi verin...",
      submit: "Gönder",
      submitting: "Gönderiliyor...",
      note: "Genellikle 24 saat içerisinde dönüş sağlıyoruz.",
      successTitle: "Mesajınız gönderildi",
      successText: "En kısa sürede sizinle iletişime geçeceğiz.",
      error: "Mesajınız gönderilemedi. Lütfen tekrar deneyin.",
      services: [
        "Web Tasarım & Geliştirme",
        "Dijital Pazarlama",
        "Marka & Kurumsal Kimlik",
        "Sosyal Medya Yönetimi",
        "SEO & Performans",
        "Diğer",
      ],
    },
  },
  en: {
    eyebrow: "Contact",
    title: "Get in Touch",
    description:
      "Start your brand's digital transformation today. Let's hear about your project and craft a tailored solution for you.",
    items: {
      email: "Email",
      phone: "Phone",
      location: "Location",
      locationValue: "Izmir, Turkey",
      instagram: "Instagram",
    },
    form: {
      name: "Full Name",
      namePlaceholder: "Your full name",
      company: "Company",
      companyPlaceholder: "Your company",
      email: "Email",
      emailPlaceholder: "hello@company.com",
      phone: "Phone",
      phonePlaceholder: "555 444 33 22",
      service: "Service Type",
      servicePlaceholder: "Select a service",
      message: "Message",
      messagePlaceholder: "Tell us briefly about your project...",
      submit: "Send",
      submitting: "Sending...",
      note: "We usually respond within 24 hours.",
      successTitle: "Your message has been sent",
      successText: "We'll get back to you as soon as possible.",
      error: "Your message could not be sent. Please try again.",
      services: [
        "Web Design & Development",
        "Digital Marketing",
        "Brand & Corporate Identity",
        "Social Media Management",
        "SEO & Performance",
        "Other",
      ],
    },
  },
} as const;
