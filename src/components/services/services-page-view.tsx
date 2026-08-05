import { Faq } from "./faq";
import { ProcessSection } from "./process-section";
import { ServicesCta } from "./services-cta";
import { ServicesGrid } from "./services-grid";
import { ServicesHero } from "./services-hero";
import { WhyUs } from "./why-us";

export function ServicesPageView() {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <WhyUs />
      <ProcessSection />
      <Faq />
      <ServicesCta />
    </main>
  );
}
