type SeoFaq = {
  question: string;
  answer: string;
};

type SeoLink = {
  label: string;
  href: string;
};

type ValidatableSeoPage = {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  idealFor: string[];
  outcomes: string[];
  deliverables: string[];
  process: string[];
  faqs: SeoFaq[];
  links: SeoLink[];
};

function assertNonEmpty(value: string, field: string, pagePath: string) {
  if (!value.trim()) {
    throw new Error(`SEO page ${pagePath} is missing ${field}`);
  }
}

function assertList<T>(values: T[], field: string, pagePath: string) {
  if (values.length === 0) {
    throw new Error(`SEO page ${pagePath} must include at least one ${field}`);
  }
}

export function validateSeoPageCollection(
  name: string,
  pages: ValidatableSeoPage[]
) {
  const slugs = new Set<string>();
  const paths = new Set<string>();

  for (const page of pages) {
    assertNonEmpty(page.slug, "slug", page.path);
    assertNonEmpty(page.path, "path", page.path);
    assertNonEmpty(page.title, "title", page.path);
    assertNonEmpty(page.metaTitle, "metaTitle", page.path);
    assertNonEmpty(page.description, "description", page.path);
    assertNonEmpty(page.intro, "intro", page.path);
    assertNonEmpty(page.eyebrow, "eyebrow", page.path);
    assertNonEmpty(page.heroTitle, "heroTitle", page.path);
    assertNonEmpty(page.heroDescription, "heroDescription", page.path);
    assertNonEmpty(page.primaryKeyword, "primaryKeyword", page.path);

    if (!page.path.startsWith("/")) {
      throw new Error(`SEO page ${page.path} in ${name} must start with "/"`);
    }

    if (slugs.has(page.slug)) {
      throw new Error(`Duplicate SEO slug "${page.slug}" in ${name}`);
    }

    if (paths.has(page.path)) {
      throw new Error(`Duplicate SEO path "${page.path}" in ${name}`);
    }

    slugs.add(page.slug);
    paths.add(page.path);

    assertList(page.secondaryKeywords, "secondaryKeywords", page.path);
    assertList(page.idealFor, "idealFor entries", page.path);
    assertList(page.outcomes, "outcomes", page.path);
    assertList(page.deliverables, "deliverables", page.path);
    assertList(page.process, "process steps", page.path);
    assertList(page.faqs, "faqs", page.path);
    assertList(page.links, "links", page.path);

    for (const faq of page.faqs) {
      assertNonEmpty(faq.question, "faq question", page.path);
      assertNonEmpty(faq.answer, "faq answer", page.path);
    }

    for (const link of page.links) {
      assertNonEmpty(link.label, "link label", page.path);
      assertNonEmpty(link.href, "link href", page.path);

      if (!link.href.startsWith("/")) {
        throw new Error(
          `SEO page ${page.path} has non-app link "${link.href}" in related links`
        );
      }
    }
  }
}
