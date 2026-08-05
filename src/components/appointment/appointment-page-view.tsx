"use client";

import { AppointmentHero } from "./appointment-hero";
import { BookingForm } from "./booking-form";
import { BookingInfo } from "./booking-info";

export function AppointmentPageView() {
  return (
    <main>
      <AppointmentHero />
      <BookingForm />
      <BookingInfo />
    </main>
  );
}
