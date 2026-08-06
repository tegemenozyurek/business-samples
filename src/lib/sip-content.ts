export type SipProduct = {
  src: string;
  name: string;
  description: string;
  category: string;
  price: string;
};

export const sipCategoryOrder = [
  "Tostlar",
  "Sandviçler",
  "Burgerler",
  "Atıştırmalıklar",
  "İçecekler",
  "Tatlılar",
] as const;

export const sipImages = {
  hero: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
  popular: [
    {
      src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
      name: "Karışık Tost",
      description: "Kaşar, sucuk ve domatesle hazırlanan klasik karışık tost.",
      category: "Tostlar",
      price: "₺185",
    },
    {
      src: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80",
      name: "Sucuklu Tost",
      description: "Bol sucuk ve eriyen kaşarla sıcak servis.",
      category: "Tostlar",
      price: "₺165",
    },
    {
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
      name: "Cheeseburger",
      description: "Sulu köfte, cheddar ve taze sebzelerle premium burger.",
      category: "Burgerler",
      price: "₺320",
    },
    {
      src: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80",
      name: "Patso",
      description: "Patates, soslar ve ekstra malzemelerle doyurucu bir klasik.",
      category: "Atıştırmalıklar",
      price: "₺245",
    },
    {
      src: "https://images.unsplash.com/photo-1637231854063-dcc3b5c4e8aa?auto=format&fit=crop&w=900&q=80",
      name: "Soğan Halkası",
      description: "Çıtır kaplama, altın rengi ve yanında sosla.",
      category: "Atıştırmalıklar",
      price: "₺145",
    },
    {
      src: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
      name: "Ice Latte",
      description: "Buz gibi espresso ve sütle ferahlatıcı bir mola.",
      category: "İçecekler",
      price: "₺130",
    },
  ] satisfies SipProduct[],
  menu: [
    {
      src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
      name: "Karışık Tost",
      description: "Kaşar, sucuk ve domatesle hazırlanan klasik karışık tost.",
      category: "Tostlar",
      price: "₺185",
    },
    {
      src: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80",
      name: "Sucuklu Tost",
      description: "Bol sucuk ve eriyen kaşarla sıcak servis.",
      category: "Tostlar",
      price: "₺165",
    },
    {
      src: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=900&q=80",
      name: "Kaşarlı Tost",
      description: "Bol kaşar ve tereyağlı ekmekle sade ama etkili.",
      category: "Tostlar",
      price: "₺140",
    },
    {
      src: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80",
      name: "Tavuklu Sandviç",
      description: "Izgara tavuk, marul ve özel sosla taze sandviç.",
      category: "Sandviçler",
      price: "₺210",
    },
    {
      src: "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=900&q=80",
      name: "Ton Balıklı Sandviç",
      description: "Ton balığı, mısır ve yeşilliklerle hafif seçenek.",
      category: "Sandviçler",
      price: "₺195",
    },
    {
      src: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&w=900&q=80",
      name: "Sebzeli Sandviç",
      description: "Mevsim sebzeleri ve pesto ile ferah bir sandviç.",
      category: "Sandviçler",
      price: "₺175",
    },
    {
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
      name: "Cheeseburger",
      description: "Sulu köfte, cheddar ve taze sebzelerle premium burger.",
      category: "Burgerler",
      price: "₺320",
    },
    {
      src: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=900&q=80",
      name: "Double Burger",
      description: "Çift köfte, cheddar ve özel sosla doyurucu burger.",
      category: "Burgerler",
      price: "₺390",
    },
    {
      src: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=900&q=80",
      name: "Chicken Burger",
      description: "Çıtır tavuk fileto ve taze sebzelerle hafif burger.",
      category: "Burgerler",
      price: "₺290",
    },
    {
      src: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80",
      name: "Patso",
      description: "Patates, soslar ve ekstra malzemelerle doyurucu bir klasik.",
      category: "Atıştırmalıklar",
      price: "₺245",
    },
    {
      src: "https://images.unsplash.com/photo-1637231854063-dcc3b5c4e8aa?auto=format&fit=crop&w=900&q=80",
      name: "Soğan Halkası",
      description: "Çıtır kaplama, altın rengi ve yanında sosla.",
      category: "Atıştırmalıklar",
      price: "₺145",
    },
    {
      src: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80",
      name: "Patates Kızartması",
      description: "Çıtır, altın rengi patates; yanında ketçap.",
      category: "Atıştırmalıklar",
      price: "₺120",
    },
    {
      src: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
      name: "Ice Latte",
      description: "Buz gibi espresso ve sütle ferahlatıcı bir mola.",
      category: "İçecekler",
      price: "₺130",
    },
    {
      src: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=900&q=80",
      name: "Pepsi",
      description: "Buz gibi servis edilen klasik gazlı içecek.",
      category: "İçecekler",
      price: "₺75",
    },
    {
      src: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80",
      name: "Su",
      description: "Doğal kaynak suyu, oda sıcaklığı veya soğuk.",
      category: "İçecekler",
      price: "₺25",
    },
    {
      src: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80",
      name: "Ayran",
      description: "Serinletici, taze yoğurtlu klasik ayran.",
      category: "İçecekler",
      price: "₺55",
    },
    {
      src: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80",
      name: "Fresh Limonata",
      description: "Taze sıkılmış limon ve naneyle serinleten içecek.",
      category: "İçecekler",
      price: "₺110",
    },
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
      name: "Filtre Kahve",
      description: "Günlük çekimde dengeli ve aromatik filtre kahve.",
      category: "İçecekler",
      price: "₺95",
    },
    {
      src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
      name: "Cheesecake",
      description: "Kremsi doku ve hafif tatlılıkla klasik cheesecake.",
      category: "Tatlılar",
      price: "₺160",
    },
    {
      src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      name: "Çikolatalı Sufle",
      description: "Sıcak, akışkan çikolata merkezli taze sufle.",
      category: "Tatlılar",
      price: "₺175",
    },
    {
      src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
      name: "Tiramisu",
      description: "Kahve aromalı, mascarpone kremalı klasik İtalyan tatlısı.",
      category: "Tatlılar",
      price: "₺170",
    },
  ] satisfies SipProduct[],
  categories: [
    {
      src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
      title: "Tostlar",
      text: "Sıcak, çıtır ve doyurucu tost seçenekleri.",
    },
    {
      src: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80",
      title: "Sandviçler",
      text: "Taze ekmek ve günlük malzemelerle sandviçler.",
    },
    {
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      title: "Burgerler",
      text: "Sulu köfte ve zengin soslarla burgerler.",
    },
    {
      src: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80",
      title: "Atıştırmalıklar",
      text: "Yanında paylaşmalık çıtır lezzetler.",
    },
    {
      src: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
      title: "İçecekler",
      text: "Sıcak kahveden soğuk içeceklere kadar.",
    },
    {
      src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
      title: "Tatlılar",
      text: "Günün sonunda tatlı bir bitiş.",
    },
  ],
  testimonials: [
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      name: "Emre Kaya",
      review: "Gerçekten çok lezzetliydi. Servis inanılmaz hızlıydı.",
    },
    {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      name: "Selin Arslan",
      review: "Karışık tostu her seferinde taze geliyor. Favori molamız burası.",
    },
    {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      name: "Burak Demir",
      review: "Burgerler doyurucu, ortam temiz ve çalışanlar çok ilgili.",
    },
  ],
} as const;

export function getMenuByCategory(category: string): SipProduct[] {
  return sipImages.menu.filter((item) => item.category === category);
}
