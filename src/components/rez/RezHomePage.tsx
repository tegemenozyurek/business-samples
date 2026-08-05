import { RezAbout } from "./RezAbout";
import { RezGallery } from "./RezGallery";
import { RezHero } from "./RezHero";
import { RezInstagram } from "./RezInstagram";
import { RezServices } from "./RezServices";
import { RezTestimonials } from "./RezTestimonials";
import { RezWhy } from "./RezWhy";

export function RezHomePage() {
  return (
    <main>
      <RezHero />
      <RezServices />
      <RezAbout />
      <RezWhy />
      <RezGallery />
      <RezTestimonials />
      <RezInstagram />
    </main>
  );
}
