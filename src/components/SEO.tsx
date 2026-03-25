import { Helmet } from "react-helmet-async";

const SITE_URL = "https://developedbydean.vercel.app";
const SITE_NAME = "DevelopedByDean";
const DEFAULT_TITLE = "DevelopedByDean | AI Developer & Systems Engineer";
const DEFAULT_DESCRIPTION =
  "I build AI voice agents, smart websites, and workflow automations that help businesses capture more leads, close more sales, and save hours every week.";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
}

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  type = "website",
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
