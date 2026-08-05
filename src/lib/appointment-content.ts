import { servicesList } from "@/lib/services-content";

export const appointmentHeroImage =
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=2000&q=80";

export const appointmentServices = servicesList.map((service) => ({
  id: service.id,
  name: service.name,
  description: service.description,
  duration: service.duration,
  price: service.price,
  image: service.image,
}));

export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
] as const;

/** Demo booked slots for visual state */
export const bookedSlots: string[] = ["10:00", "13:30", "16:00"];

export const bookingInfoCards = [
  {
    title: "İptal Politikası",
    description:
      "Randevunuzu en az 24 saat önce iptal edebilirsiniz. Geç iptallerde aynı gün yeni slot açılamayabilir.",
  },
  {
    title: "Geç Kalma",
    description:
      "10 dakikadan fazla gecikmelerde hizmet süresi kısalabilir veya randevu yeniden planlanabilir.",
  },
  {
    title: "Ödeme",
    description:
      "Nakit, kredi / banka kartı ve mobil ödemeleri kabul ediyoruz. Online ön ödeme gerekmez.",
  },
  {
    title: "Onay",
    description:
      "Randevu oluşturulunca SMS / WhatsApp ile onay mesajı gönderilir.",
  },
] as const;
