"use client";

import { Suspense } from "react";
import { AppointmentHero } from "./appointment-hero";
import { BookingForm } from "./booking-form";
import { BookingInfo } from "./booking-info";

export function AppointmentPageView() {
  return (
    <main>
      <AppointmentHero />
      <Suspense fallback={null}>
        <BookingForm />
      </Suspense>
      <BookingInfo />
    </main>
  );
}
