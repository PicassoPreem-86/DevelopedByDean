export type LinkItem = {
  label: string;
  href: string;
};

export type SeoPageDefinition = {
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
  faqs: Array<{ question: string; answer: string }>;
  links: LinkItem[];
};

export const servicePages: SeoPageDefinition[] = [
  {
    slug: "ai-voice-agents",
    path: "/services/ai-voice-agents",
    title: "AI Voice Agents",
    metaTitle: "AI Voice Agent Development for Lead Capture and Appointment Booking",
    description:
      "Custom AI voice agents for businesses that need 24/7 call answering, lead qualification, appointment booking, and follow-up automation.",
    intro: "Service",
    eyebrow: "AI Voice Agents",
    heroTitle: "AI Voice Agents That Answer, Qualify, and Book Around the Clock",
    heroDescription:
      "I build custom AI phone agents for businesses that want faster response times, fewer missed leads, and a booking process that runs even when the team is offline.",
    primaryKeyword: "AI voice agent development",
    secondaryKeywords: [
      "AI receptionist for businesses",
      "AI appointment booking agent",
      "AI phone answering service",
    ],
    idealFor: [
      "Home service businesses missing inbound calls after hours",
      "Sales teams that want outbound follow-up without manual dialing",
      "Local businesses that need faster response times and better qualification",
    ],
    outcomes: [
      "More booked appointments from inbound and outbound calls",
      "Faster lead response without increasing payroll",
      "Cleaner qualification data inside your CRM",
    ],
    deliverables: [
      "Custom call flows, routing logic, and qualification scripts",
      "Calendar booking, CRM syncing, and follow-up automation",
      "Analytics dashboards, QA tuning, and post-launch optimization",
    ],
    process: [
      "Map your current phone flow and the leads you want to prioritize",
      "Design the AI call logic, objection handling, and booking rules",
      "Connect the agent to your calendar, CRM, and business workflows",
      "Launch, review transcripts, and improve conversion over time",
    ],
    faqs: [
      {
        question: "Can an AI voice agent handle real customer questions?",
        answer:
          "Yes. I scope the agent around your actual call types, FAQs, qualification logic, and booking rules so it feels useful instead of gimmicky.",
      },
      {
        question: "Will it connect to my calendar or CRM?",
        answer:
          "That is usually part of the build. I connect voice agents to calendars, CRMs, forms, and follow-up automations so the system does more than just talk.",
      },
      {
        question: "Is this only for big companies?",
        answer:
          "No. Voice agents are often most valuable for owner-led businesses that lose leads because they cannot answer every call in real time.",
      },
    ],
    links: [
      { label: "AI solutions use cases", href: "/use-cases" },
      { label: "Results and ROI examples", href: "/results" },
      { label: "AI for home services", href: "/industries/home-services-ai" },
    ],
  },
  {
    slug: "ai-websites",
    path: "/services/ai-websites",
    title: "AI Websites",
    metaTitle: "AI Website Development for Lead Generation and Conversion",
    description:
      "High-converting AI websites and landing pages built to capture leads, qualify visitors, and turn traffic into booked calls and revenue.",
    intro: "Service",
    eyebrow: "AI Websites",
    heroTitle: "AI Websites Built to Convert Attention Into Revenue",
    heroDescription:
      "I build fast, persuasive websites that combine positioning, UX, automation, and AI lead capture so your site becomes a sales asset instead of a brochure.",
    primaryKeyword: "AI website development",
    secondaryKeywords: [
      "AI lead generation website",
      "AI landing page developer",
      "conversion-focused business website",
    ],
    idealFor: [
      "Businesses with traffic but weak conversion rates",
      "Operators replacing outdated sites that do not generate qualified leads",
      "Founders who want one system for messaging, lead capture, and follow-up",
    ],
    outcomes: [
      "Higher conversion rates from organic and paid traffic",
      "Better lead qualification before a human ever steps in",
      "Stronger positioning that supports SEO and sales at the same time",
    ],
    deliverables: [
      "Custom site architecture, conversion copy, and landing page design",
      "Forms, chat, CRM handoff, and lead routing automation",
      "Technical SEO foundations, structured metadata, and performance tuning",
    ],
    process: [
      "Clarify the offer, buyer journey, and pages that matter most",
      "Design the page structure around search intent and conversion intent",
      "Build the site, automation layer, and lead capture flow",
      "Launch with analytics and iterate based on behavior and search data",
    ],
    faqs: [
      {
        question: "Do you just design the site or also write the strategy?",
        answer:
          "I handle both. The value is in combining positioning, UX, automation, and SEO so the site performs as a system.",
      },
      {
        question: "Can the site connect to my CRM and forms?",
        answer:
          "Yes. CRM, email, booking, and notification workflows are a normal part of these builds.",
      },
      {
        question: "Will the site be optimized for search engines?",
        answer:
          "Yes. I build technical SEO foundations into the structure, metadata, internal links, and schema from the start.",
      },
    ],
    links: [
      { label: "Workflow automation service", href: "/services/workflow-automation" },
      { label: "Lead generation systems", href: "/services/lead-generation-systems" },
      { label: "How it works", href: "/services" },
    ],
  },
  {
    slug: "workflow-automation",
    path: "/services/workflow-automation",
    title: "Workflow Automation",
    metaTitle: "Business Workflow Automation and AI Process Design",
    description:
      "Business workflow automation that connects CRMs, forms, inboxes, payments, onboarding, and internal operations to save time and reduce manual work.",
    intro: "Service",
    eyebrow: "Workflow Automation",
    heroTitle: "Workflow Automation That Removes Busywork and Tightens Your Operations",
    heroDescription:
      "I design automation systems that move data, trigger follow-ups, and keep operations running without the repetitive admin work slowing the team down.",
    primaryKeyword: "business workflow automation",
    secondaryKeywords: [
      "CRM automation",
      "AI operations automation",
      "business process automation consultant",
    ],
    idealFor: [
      "Teams stuck in spreadsheets, manual data entry, and inbox triage",
      "Service businesses that need smoother onboarding and client handoff",
      "Businesses that want fewer dropped tasks between sales and delivery",
    ],
    outcomes: [
      "Less admin overhead and fewer operational bottlenecks",
      "More consistent client experience across every handoff",
      "Better visibility into lead, revenue, and delivery workflows",
    ],
    deliverables: [
      "Automation mapping across CRM, forms, email, documents, and payments",
      "Triggers, conditional logic, sync rules, and exception handling",
      "Dashboards and alerts so the system stays visible and accountable",
    ],
    process: [
      "Audit the bottlenecks and manual steps across your workflow",
      "Prioritize the automations with the biggest time or revenue impact",
      "Build the integrations, rules, and visibility layer",
      "Monitor the system in production and improve edge cases over time",
    ],
    faqs: [
      {
        question: "Can you automate custom workflows instead of using templates?",
        answer:
          "Yes. Most of the value comes from designing the automation around how your business actually runs instead of forcing a generic setup onto it.",
      },
      {
        question: "Will automation replace my whole team?",
        answer:
          "No. The goal is usually to remove repetitive work so your team can focus on higher-value conversations and delivery.",
      },
      {
        question: "What tools do you work with?",
        answer:
          "I work across CRMs, calendars, email platforms, payment tools, forms, internal dashboards, and custom app layers depending on the workflow.",
      },
    ],
    links: [
      { label: "AI websites and landing pages", href: "/services/ai-websites" },
      { label: "Lead generation systems", href: "/services/lead-generation-systems" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    slug: "lead-generation-systems",
    path: "/services/lead-generation-systems",
    title: "Lead Generation Systems",
    metaTitle: "AI Lead Generation Systems for Qualification and Follow-Up",
    description:
      "AI lead generation systems for websites, landing pages, chat, qualification, scoring, routing, and automated follow-up that keeps pipelines moving.",
    intro: "Service",
    eyebrow: "Lead Generation Systems",
    heroTitle: "Lead Generation Systems That Capture, Qualify, and Nurture Automatically",
    heroDescription:
      "I build lead generation systems that do more than collect form fills. They qualify intent, score opportunities, route leads correctly, and trigger follow-up without delay.",
    primaryKeyword: "AI lead generation systems",
    secondaryKeywords: [
      "lead qualification automation",
      "AI lead capture system",
      "automated follow-up workflows",
    ],
    idealFor: [
      "Businesses paying for traffic but failing to respond fast enough",
      "Teams drowning in unqualified inquiries",
      "Operators who need a cleaner handoff from marketing to sales",
    ],
    outcomes: [
      "More qualified opportunities reaching the calendar",
      "Faster speed to lead without manual chasing",
      "Better attribution across pages, forms, and campaigns",
    ],
    deliverables: [
      "Lead capture pages, chat flows, scoring logic, and routing rules",
      "CRM integration, alerts, and nurture automation",
      "Reporting that shows which channels and pages create real pipeline",
    ],
    process: [
      "Define the buyer journey and what qualifies a lead",
      "Build the capture, scoring, and routing system",
      "Connect nurture sequences and sales notifications",
      "Refine qualification criteria using real conversion data",
    ],
    faqs: [
      {
        question: "Can this work with paid traffic and SEO traffic together?",
        answer:
          "Yes. The system can support both, while tracking which pages, offers, and sources create qualified leads.",
      },
      {
        question: "Do you build the pages as well as the automation?",
        answer:
          "Yes. I often handle both so the messaging, UX, and backend workflow reinforce each other.",
      },
      {
        question: "Can leads be prioritized automatically?",
        answer:
          "Yes. I can build qualification and scoring rules so your team sees the right leads first.",
      },
    ],
    links: [
      { label: "AI websites", href: "/services/ai-websites" },
      { label: "AI voice agents", href: "/services/ai-voice-agents" },
      { label: "Results", href: "/results" },
    ],
  },
];

export const industryPages: SeoPageDefinition[] = [
  {
    slug: "home-services-ai",
    path: "/industries/home-services-ai",
    title: "AI for Home Services",
    metaTitle: "AI Systems for Home Service Businesses and Contractors",
    description:
      "AI systems for home service businesses that need more booked calls, better follow-up, and tighter operations across phones, websites, and dispatch workflows.",
    intro: "Industry",
    eyebrow: "Home Services",
    heroTitle: "AI Systems for Home Service Businesses That Need Faster Response and Better Follow-Up",
    heroDescription:
      "For contractors and local service companies, speed matters. I build AI systems that answer calls, qualify jobs, route leads, and keep the pipeline moving before competitors get there first.",
    primaryKeyword: "AI for home service businesses",
    secondaryKeywords: [
      "AI for contractors",
      "AI receptionist for home services",
      "lead generation for local service businesses",
    ],
    idealFor: [
      "HVAC, plumbing, roofing, electrical, and cleaning businesses",
      "Teams missing calls when techs are on the road",
      "Owners who need better lead handling without adding dispatch overhead",
    ],
    outcomes: [
      "More booked jobs from the same call and traffic volume",
      "Less lead leakage from missed calls and slow follow-up",
      "Better operational visibility from intake to handoff",
    ],
    deliverables: [
      "AI call answering and qualification for service requests",
      "Lead capture pages, booking flows, and automated dispatch notifications",
      "CRM, follow-up, and review-request workflows",
    ],
    process: [
      "Map the current lead flow across calls, forms, and dispatch",
      "Prioritize the jobs, service areas, and urgency levels that matter most",
      "Build the intake and follow-up system around your real workflow",
      "Track call, booking, and close data to improve the system",
    ],
    faqs: [
      {
        question: "Can AI tell the difference between urgent jobs and routine inquiries?",
        answer:
          "Yes. I can design call and form logic to route urgent jobs differently, collect the right details, and push high-priority requests faster.",
      },
      {
        question: "Does this help after the lead comes in too?",
        answer:
          "Yes. Follow-up, reminders, review requests, and status notifications are often where these systems create a lot of extra value.",
      },
      {
        question: "Will this feel too robotic for local customers?",
        answer:
          "Not if it is built properly. The system should feel clear, useful, and fast, with human escalation where it matters.",
      },
    ],
    links: [
      { label: "AI voice agents", href: "/services/ai-voice-agents" },
      { label: "Lead generation systems", href: "/services/lead-generation-systems" },
      { label: "Results", href: "/results" },
    ],
  },
  {
    slug: "medical-spa-ai",
    path: "/industries/medical-spa-ai",
    title: "AI for Med Spas",
    metaTitle: "AI Lead Capture and Booking Systems for Med Spas",
    description:
      "AI systems for med spas and aesthetic clinics that improve lead capture, consultation booking, follow-up, and front-desk efficiency.",
    intro: "Industry",
    eyebrow: "Med Spas",
    heroTitle: "AI Lead Capture and Booking Systems for Med Spas That Need More Consults",
    heroDescription:
      "I build med spa growth systems that capture inquiries faster, qualify treatment interest, and guide more prospects into consultation bookings without front-desk chaos.",
    primaryKeyword: "AI for med spas",
    secondaryKeywords: [
      "med spa lead generation",
      "AI booking system for aesthetic clinics",
      "med spa consultation automation",
    ],
    idealFor: [
      "Clinics that want more consults from paid traffic or organic search",
      "Teams overwhelmed by DMs, forms, and front-desk follow-up",
      "Operators who need cleaner intake and reactivation flows",
    ],
    outcomes: [
      "More consultation bookings from existing traffic",
      "Faster follow-up on treatment inquiries",
      "Better reactivation of past leads and no-shows",
    ],
    deliverables: [
      "Consultation funnels, AI chat, and treatment qualification flows",
      "Booking support, reminders, and nurture sequences",
      "Lead routing and reporting across campaigns and pages",
    ],
    process: [
      "Clarify services, ideal clients, and consultation flow",
      "Build the intake journey around the treatments you want to sell most",
      "Connect forms, booking, reminders, and reactivation",
      "Tune the system based on booked consults and show-up rates",
    ],
    faqs: [
      {
        question: "Can AI help pre-qualify treatment inquiries?",
        answer:
          "Yes. It can collect the right information, clarify interest, and route the lead into the right consultation path.",
      },
      {
        question: "Can this support existing front-desk staff instead of replacing them?",
        answer:
          "Yes. The best use is often to reduce repetitive intake and follow-up so the team can focus on higher-value conversations.",
      },
      {
        question: "Does this work with ads and organic traffic?",
        answer:
          "Yes. I can build the lead capture and booking flow to support both and show what actually creates consults.",
      },
    ],
    links: [
      { label: "AI websites", href: "/services/ai-websites" },
      { label: "Lead generation systems", href: "/services/lead-generation-systems" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    slug: "law-firm-ai",
    path: "/industries/law-firm-ai",
    title: "AI for Law Firms",
    metaTitle: "AI Intake and Lead Qualification Systems for Law Firms",
    description:
      "AI intake and lead qualification systems for law firms that want faster response, cleaner case screening, and more efficient follow-up.",
    intro: "Industry",
    eyebrow: "Law Firms",
    heroTitle: "AI Intake and Qualification Systems for Law Firms That Need Faster Response",
    heroDescription:
      "I build intake systems for law firms that help capture leads faster, ask better screening questions, and route promising inquiries into the right next step.",
    primaryKeyword: "AI for law firms",
    secondaryKeywords: [
      "law firm intake automation",
      "legal lead qualification system",
      "AI receptionist for law firms",
    ],
    idealFor: [
      "Practice areas with time-sensitive inbound leads",
      "Firms that need cleaner initial screening before attorney review",
      "Teams losing opportunities because response time is too slow",
    ],
    outcomes: [
      "Faster first response to new inquiries",
      "Cleaner case-intake information before human review",
      "Better follow-up consistency across the pipeline",
    ],
    deliverables: [
      "Website intake, call handling, and qualification logic",
      "Routing rules by practice area, urgency, and fit",
      "Follow-up workflows and reporting for intake performance",
    ],
    process: [
      "Understand your intake criteria and practice-area routing needs",
      "Design the intake workflow around fit, urgency, and compliance constraints",
      "Implement the site, phone, and CRM handoff logic",
      "Review quality and tighten the system using real inquiries",
    ],
    faqs: [
      {
        question: "Can AI replace legal advice?",
        answer:
          "No. The right role for AI here is intake, qualification, routing, and follow-up support rather than legal judgment.",
      },
      {
        question: "Can the workflow support multiple practice areas?",
        answer:
          "Yes. Intake logic can route leads differently depending on practice area, urgency, and fit criteria.",
      },
      {
        question: "Can this improve response time without hiring more staff?",
        answer:
          "Yes. That is one of the main reasons firms use intake automation and AI support systems.",
      },
    ],
    links: [
      { label: "Workflow automation", href: "/services/workflow-automation" },
      { label: "AI voice agents", href: "/services/ai-voice-agents" },
      { label: "How it works", href: "/services" },
    ],
  },
];

export const allSeoPages = [...servicePages, ...industryPages];

export function findSeoPageByPath(path: string) {
  return allSeoPages.find((page) => page.path === path);
}
