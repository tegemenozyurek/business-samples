"use client";

import { AppointmentCta } from "./appointment-cta";
import { AppointmentHero } from "./appointment-hero";
import { BookingForm } from "./booking-form";
import { BookingInfo } from "./booking-info";
import { AppointmentFaq } from "./faq";

export function AppointmentPageView() {
  return (
    <main>
      <AppointmentHero />
      <BookingForm />
      <BookingInfo />
      <AppointmentFaq />
      <AppointmentCta />
    </main>
  );
}
