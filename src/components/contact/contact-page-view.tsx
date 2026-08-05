"use client";

import { ContactInfo } from "./contact-info";
import { WorkingHours } from "./working-hours";

export function ContactPageView() {
  return (
    <main>
      <ContactInfo />
      <WorkingHours />
    </main>
  );
}
