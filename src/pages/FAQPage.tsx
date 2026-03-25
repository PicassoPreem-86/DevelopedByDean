import { SEO } from "../components/SEO";
import { FAQStructuredData } from "../components/StructuredData";
import { FAQ } from "../sections/FAQ";
import { FinalCTA } from "../sections/FinalCTA";

export function FAQPage() {
  return (
    <>
      <SEO
        title="FAQ"
        path="/faq"
        description="Answers to common questions about working with DevelopedByDean — pricing, timelines, technical requirements, ongoing support, and more."
      />
      <FAQStructuredData />
      <FAQ />
      <FinalCTA />
    </>
  );
}
