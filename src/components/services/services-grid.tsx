"use client";

import { servicesList } from "@/lib/services-content";
import { ServiceCard } from "./service-card";

export function ServicesGrid() {
  return (
    <section className="bg-[var(--background)] px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicesList.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
