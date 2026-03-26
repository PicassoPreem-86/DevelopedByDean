import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../shared/siteConfig";
import type { SeoPageDefinition } from "../data/seoPages";

interface SeoLandingStructuredDataProps {
  page: SeoPageDefinition;
}

export function SeoLandingStructuredData({ page }: SeoLandingStructuredDataProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.intro,
            item: `${SITE_URL}${page.path.split("/").slice(0, 2).join("/")}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.title,
            item: `${SITE_URL}${page.path}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: page.title,
        description: page.description,
        serviceType: page.primaryKeyword,
        areaServed: "Worldwide",
        provider: {
          "@type": "ProfessionalService",
          name: "DevelopedByDean",
          url: SITE_URL,
        },
        url: `${SITE_URL}${page.path}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
