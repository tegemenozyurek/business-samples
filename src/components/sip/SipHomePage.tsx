import { SipCta } from "./SipCta";
import { SipHero } from "./SipHero";
import { SipMenuPreview } from "./SipMenuPreview";
import { SipPopular } from "./SipPopular";
import { SipReviews } from "./SipReviews";

export function SipHomePage() {
  return (
    <main>
      <SipHero />
      <SipPopular />
      <SipMenuPreview />
      <SipReviews />
      <SipCta />
    </main>
  );
}
