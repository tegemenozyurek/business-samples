"use client";

import { ContactHero } from "./contact-hero";
import { ContactInfo } from "./contact-info";
import { WorkingHours } from "./working-hours";

export function ContactPageView() {
  return (
    <main>
      <ContactHero />
      <ContactInfo />
      <WorkingHours />
    </main>
  );
}
