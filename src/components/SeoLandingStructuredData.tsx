import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../../shared/siteConfig";
import type { SeoPageDefinition } from "../data/seoPages";

interface SeoLandingStructuredDataProps {
  page: SeoPageDefinition;
}

export function SeoLandingStructuredData({ page }: SeoLandingStructuredDataProps) {
  const pageUrl = `${SITE_URL}${page.path}`;

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
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Service",
        name: page.title,
        description: page.description,
        serviceType: page.primaryKeyword,
        areaServed: "Worldwide",
        provider: { "@id": `${SITE_URL}/#organization` },
        url: pageUrl,
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
      {
        "@type": "HowTo",
        name: `How ${page.title} engagements work`,
        description: `Typical process for ${page.title.toLowerCase()} projects with DevelopedByDean.`,
        step: page.process.map((stepText, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: `Step ${idx + 1}`,
          text: stepText,
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.metaTitle,
        description: page.description,
        about: { "@id": `${SITE_URL}/#organization` },
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
