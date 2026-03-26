import { Helmet } from "react-helmet-async";
import { LOGO_URL, OG_IMAGE_URL, SITE_URL } from "../../shared/siteConfig";

const sameAs = [
  import.meta.env.VITE_LINKEDIN_URL?.trim(),
  import.meta.env.VITE_X_URL?.trim(),
  import.meta.env.VITE_GITHUB_URL?.trim(),
].filter((value): value is string => Boolean(value));

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dean Holland",
  url: SITE_URL,
  image: OG_IMAGE_URL,
  jobTitle: "AI Developer & Systems Engineer",
  description:
    "Solo AI developer who builds voice agents, smart websites, and workflow automations for businesses.",
  knowsAbout: [
    "Artificial Intelligence",
    "AI Voice Agents",
    "Workflow Automation",
    "Web Development",
    "Lead Generation",
    "CRM Automation",
  ],
  sameAs,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DevelopedByDean",
  url: SITE_URL,
  logo: LOGO_URL,
  image: OG_IMAGE_URL,
  description:
    "AI development services including voice agents, smart websites, workflow automation, and custom AI tools for businesses.",
  founder: {
    "@type": "Person",
    name: "Dean Holland",
  },
  serviceType: [
    "AI Voice Agent Development",
    "AI Website Development",
    "Workflow Automation",
    "Custom AI Application Development",
    "Lead Generation Systems",
  ],
  areaServed: "Worldwide",
  priceRange: "$$",
  sameAs,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DevelopedByDean",
  url: SITE_URL,
  description:
    "AI developer and systems engineer building voice agents, websites, and automations for businesses.",
  publisher: {
    "@type": "ProfessionalService",
    name: "DevelopedByDean",
    url: SITE_URL,
  },
};

export function StructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
}

// FAQ structured data for the FAQ page
const faqItems = [
  {
    question: "How does pricing work?",
    answer:
      "Every project is scoped individually based on your goals and what we're building together. After our free strategy call, I'll send you a clear, transparent proposal.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects launch within 2-6 weeks depending on complexity. I'll give you an honest timeline upfront and keep you updated with regular check-ins.",
  },
  {
    question: "Do I need to be technical to work with you?",
    answer:
      "Not at all. I handle everything from strategy to deployment. You bring the business knowledge and goals — I'll translate that into a working system.",
  },
  {
    question: "What if I'm not sure what I need yet?",
    answer:
      "That's exactly what the free strategy call is for. I'll help you identify where AI and automation can make the biggest impact.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely. I offer ongoing maintenance and optimization to make sure your systems keep performing.",
  },
  {
    question: "What makes you different from hiring an agency?",
    answer:
      "You work directly with me — the person designing and building your system. No account managers, no handoffs, no miscommunication.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FAQStructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
