import { ProcessSection } from "./process-section";
import { ServicesGrid } from "./services-grid";
import { ServicesHero } from "./services-hero";

export function ServicesPageView() {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
    </main>
  );
}
