import { validateSeoPageCollection } from "./seoPages.validation";

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
  tldr?: string;
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
      "AI call answering service for small business",
      "virtual receptionist AI",
      "AI outbound calling agent",
      "automated phone qualification",
      "AI voice bot for lead capture",
      "best AI phone agent for small business",
      "AI voice agent cost",
      "AI voice agent vs call center",
      "24/7 AI phone answering",
      "AI cold calling agent",
      "hire AI voice agent developer",
      "AI phone agent for after-hours calls",
      "voice AI for appointment setting",
      "conversational AI phone system",
      "AI voice agent for customer service",
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
          "No. Voice agents are often most valuable for owner-led businesses that lose leads because they cannot answer every call in real time. (Industry reporting from Forbes and small-business operators consistently puts missed-call rates around 60% during peak hours for unstaffed lines.)",
      },
      {
        question: "How much does response speed actually matter?",
        answer:
          "It is the single biggest conversion lever on inbound leads. Harvard Business Review's research on lead response (Oldroyd et al.) found that contacting a lead within 5 minutes makes them roughly 21x more likely to qualify than waiting 30 minutes. AI voice agents collapse that response window to seconds.",
      },
    ],
    links: [
      { label: "AI solutions use cases", href: "/use-cases" },
      { label: "Results and ROI examples", href: "/results" },
      { label: "AI for home services", href: "/industries/home-services-ai" },
    ],
    tldr: "An AI voice agent is a phone-based assistant that answers calls, asks qualifying questions, and books appointments directly into your calendar 24/7. It is built for owner-led businesses and small teams that lose revenue every time a call goes to voicemail. The primary outcome is more booked appointments from the same call volume, with cleaner lead data flowing into your CRM automatically.",
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
      "AI website builder for small business",
      "high-converting website development",
      "website with AI chat integration",
      "SEO-optimized business website",
      "AI-powered lead capture website",
      "best AI website for lead generation",
      "AI website development cost",
      "website redesign for more leads",
      "AI-integrated business website",
      "custom website with chatbot",
      "hire AI website developer",
      "website that generates leads automatically",
      "AI website for service businesses",
      "landing page with AI lead capture",
      "business website with built-in automation",
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
          "I handle both. The value is in combining positioning, UX, automation, and SEO so the site performs as a system. BrightLocal's Local Consumer Review Survey consistently shows the majority of consumers research a service business online before contacting them, so the site is doing more selling than most owners realize.",
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
      {
        question: "How fast does the site need to respond to a lead?",
        answer:
          "Effectively instantly. Harvard Business Review's lead-response research (Oldroyd et al.) found a roughly 21x lift in qualification when you contact a lead within 5 minutes versus 30. That's why the sites I build pair conversion design with automated instant follow-up rather than relying on a human to monitor the inbox.",
      },
    ],
    links: [
      { label: "Workflow automation service", href: "/services/workflow-automation" },
      { label: "Lead generation systems", href: "/services/lead-generation-systems" },
      { label: "How it works", href: "/services" },
    ],
    tldr: "An AI website is a high-performance business site that combines persuasive positioning, conversion-focused design, and built-in automation (chat, qualification, CRM handoff) so it actively generates leads instead of acting as a brochure. It is built for service businesses with traffic but weak conversion and operators replacing outdated sites that don't produce qualified inquiries. The primary outcome is more booked calls from the same traffic, with leads qualified and routed before a human ever steps in.",
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
      "automate repetitive business tasks",
      "small business automation services",
      "Zapier and Make automation expert",
      "onboarding workflow automation",
      "business systems integration consultant",
      "best workflow automation for small business",
      "how to automate business processes",
      "n8n automation consultant",
      "reduce manual work with automation",
      "workflow automation cost",
      "hire automation consultant",
      "automate client onboarding process",
      "email and invoice automation",
      "operations automation for small teams",
      "automated task management system",
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
        question: "How much time can automation realistically give back?",
        answer:
          "More than most teams expect. McKinsey Global Institute's analysis on workforce automation estimates that workers spend roughly 40% of their time on activities that could be automated with current technology. In practice, the highest-leverage automations target repetitive admin (data entry, follow-up triggers, internal handoffs) rather than judgment work.",
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
    tldr: "Workflow automation is the practice of connecting your CRM, forms, inboxes, calendars, and payment tools so data and decisions move between them automatically instead of through manual copy-paste. It is built for teams stuck in spreadsheets and inbox triage, and service businesses that lose tasks between sales and delivery. The primary outcome is fewer dropped handoffs, less admin overhead, and clear visibility into where leads, revenue, and operations actually stand.",
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
      "lead scoring automation for small business",
      "AI lead routing system",
      "inbound lead capture and nurture",
      "speed to lead automation",
      "automated lead pipeline management",
      "best AI lead generation for small business",
      "how to generate more leads with AI",
      "AI lead generation cost",
      "automated lead magnet system",
      "lead generation funnel automation",
      "hire AI lead generation expert",
      "stop losing leads to slow response",
      "lead capture form with AI qualification",
      "multi-channel lead generation system",
      "AI lead gen for service businesses",
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
  {
    slug: "ai-chatbot-development",
    path: "/services/ai-chatbot-development",
    title: "AI Chatbots",
    metaTitle:
      "AI Chatbot Development for Lead Capture and Customer Support",
    description:
      "Custom AI chatbots that qualify leads, answer customer questions, and route conversations to your team — available 24/7 on your website.",
    intro: "Service",
    eyebrow: "AI Chatbots",
    heroTitle:
      "AI Chatbots That Qualify Leads and Handle Support Around the Clock",
    heroDescription:
      "I build custom AI chatbots for businesses that want to convert more website visitors into qualified leads without adding staff. Every bot is trained on your business, not a generic template.",
    primaryKeyword: "AI chatbot development",
    secondaryKeywords: [
      "custom AI chatbot for business",
      "AI chatbot for lead generation",
      "AI customer support chatbot",
      "website chatbot development",
      "conversational AI for small business",
      "AI chat widget for websites",
      "lead capture chatbot",
      "AI chatbot for sales",
      "best AI chatbot for small business",
      "AI chatbot vs live chat",
      "how much does an AI chatbot cost",
      "AI chatbot for appointment booking",
      "custom chatbot development services",
      "hire AI chatbot developer",
      "chatbot for service business websites",
      "AI chatbot that books appointments",
      "conversational AI for lead qualification",
      "website chatbot with CRM integration",
    ],
    idealFor: [
      "Businesses with website traffic but low conversion rates",
      "Teams that want to qualify leads before a human conversation",
      "Operators who need 24/7 customer support without hiring for night shifts",
    ],
    outcomes: [
      "More qualified leads from existing website traffic",
      "Faster response to visitor questions without manual monitoring",
      "Better lead data flowing into your CRM automatically",
    ],
    deliverables: [
      "Custom AI chatbot trained on your business, services, and FAQs",
      "Lead qualification logic, CRM integration, and notification routing",
      "Conversation analytics and ongoing performance tuning",
    ],
    process: [
      "Map the questions visitors ask and the leads you want to capture",
      "Design the conversation flows, qualification rules, and handoff triggers",
      "Build and train the chatbot on your actual business information",
      "Launch, monitor conversations, and improve accuracy over time",
    ],
    faqs: [
      {
        question: "How is this different from a basic chat widget?",
        answer:
          "Off-the-shelf chat widgets follow rigid scripts. I build chatbots that understand context, qualify intent, and make real routing decisions based on your business logic.",
      },
      {
        question: "Can the chatbot hand off to a real person?",
        answer:
          "Yes. I build escalation triggers so the bot hands off to your team when the conversation requires a human touch.",
      },
      {
        question: "Will the chatbot sound robotic?",
        answer:
          "No. The bot is trained to match your brand voice and handle real customer questions naturally, not read from a script.",
      },
    ],
    links: [
      { label: "AI voice agents", href: "/services/ai-voice-agents" },
      {
        label: "Lead generation systems",
        href: "/services/lead-generation-systems",
      },
      { label: "Results", href: "/results" },
    ],
  },
  {
    slug: "ai-appointment-booking",
    path: "/services/ai-appointment-booking",
    title: "AI Appointment Booking",
    metaTitle:
      "AI Appointment Booking Systems That Schedule, Remind, and Reduce No-Shows",
    description:
      "Automated appointment booking systems that let prospects self-schedule, send smart reminders, and reduce no-shows without front-desk bottlenecks.",
    intro: "Service",
    eyebrow: "AI Appointment Booking",
    heroTitle:
      "AI Booking Systems That Fill Your Calendar Without the Back-and-Forth",
    heroDescription:
      "I build automated booking systems that let leads schedule directly, send confirmation and reminder sequences, and reduce no-shows so your team spends less time chasing and more time delivering.",
    primaryKeyword: "AI appointment booking system",
    secondaryKeywords: [
      "automated appointment scheduling",
      "AI booking system for businesses",
      "appointment reminder automation",
      "reduce no-shows with AI",
      "self-service booking system",
      "online appointment booking automation",
      "AI scheduling assistant",
      "automated booking and reminders",
      "best AI booking system for businesses",
      "how to reduce appointment no-shows",
      "AI scheduling software for service businesses",
      "automated appointment confirmation system",
      "booking system with SMS reminders",
      "hire appointment booking system developer",
      "calendar automation for service businesses",
      "AI scheduling for multiple locations",
      "appointment booking with lead qualification",
      "reduce cancellations with automated reminders",
    ],
    idealFor: [
      "Service businesses losing revenue to no-shows and last-minute cancellations",
      "Teams spending hours each week on manual scheduling and rescheduling",
      "Businesses that want leads to book immediately instead of waiting for a callback",
    ],
    outcomes: [
      "More booked appointments from inbound leads with zero manual scheduling",
      "Fewer no-shows through smart reminder and confirmation sequences",
      "Cleaner calendar management with automatic conflict detection and routing",
    ],
    deliverables: [
      "Self-service booking pages integrated with your calendar and availability rules",
      "Automated confirmation, reminder, and follow-up sequences via SMS and email",
      "No-show recovery workflows and rebooking automation",
    ],
    process: [
      "Map your current scheduling flow, appointment types, and availability rules",
      "Design the booking experience, reminder cadence, and no-show recovery logic",
      "Build the system with calendar sync, notifications, and CRM integration",
      "Launch and optimize based on booking rates and show-up data",
    ],
    faqs: [
      {
        question: "Can this work with my existing calendar?",
        answer:
          "Yes. I connect booking systems to Google Calendar, Outlook, Calendly, and other tools your team already uses.",
      },
      {
        question: "How much can AI really reduce no-shows?",
        answer:
          "Smart reminder sequences with the right timing and channel mix typically reduce no-shows by 30 to 50 percent. The exact impact depends on your industry and appointment type.",
      },
      {
        question: "Can prospects book without talking to anyone?",
        answer:
          "Yes. The system can handle full self-service booking with qualification built in, so only the right leads land on your calendar.",
      },
    ],
    links: [
      { label: "AI voice agents", href: "/services/ai-voice-agents" },
      {
        label: "Workflow automation",
        href: "/services/workflow-automation",
      },
      { label: "AI for med spas", href: "/industries/medical-spa-ai" },
    ],
  },
  {
    slug: "crm-automation",
    path: "/services/crm-automation",
    title: "CRM Automation",
    metaTitle:
      "CRM Automation Services for Lead Routing, Follow-Up, and Pipeline Management",
    description:
      "CRM automation that routes leads, triggers follow-up, updates deal stages, and keeps your pipeline organized without manual data entry.",
    intro: "Service",
    eyebrow: "CRM Automation",
    heroTitle:
      "CRM Automation That Keeps Your Pipeline Moving Without the Manual Work",
    heroDescription:
      "I build CRM automation systems that route leads to the right person, trigger follow-up at the right time, and keep deal stages accurate so nothing falls through the cracks.",
    primaryKeyword: "CRM automation services",
    secondaryKeywords: [
      "CRM workflow automation",
      "automated lead routing",
      "CRM follow-up automation",
      "HubSpot automation consultant",
      "GoHighLevel automation",
      "sales pipeline automation",
      "CRM integration services",
      "automated CRM data entry",
      "best CRM automation for small business",
      "how to automate CRM follow-up",
      "Salesforce automation consultant",
      "CRM lead nurturing automation",
      "automated deal stage management",
      "hire CRM automation expert",
      "stop leads from falling through the cracks",
      "automated sales follow-up in CRM",
      "CRM cleanup and automation services",
      "lead assignment automation",
    ],
    idealFor: [
      "Sales teams where leads sit untouched because follow-up is manual",
      "Businesses running a CRM but not using it to automate anything",
      "Operators who need accurate pipeline data without chasing reps to update records",
    ],
    outcomes: [
      "Faster lead response through automatic routing and follow-up triggers",
      "Cleaner pipeline data with automatic stage updates and activity logging",
      "Less time spent on manual CRM entry and more time spent closing",
    ],
    deliverables: [
      "Lead routing rules, assignment logic, and priority-based distribution",
      "Automated follow-up sequences triggered by lead behavior and deal stage",
      "Pipeline reporting, activity tracking, and integration with your existing tools",
    ],
    process: [
      "Audit your current CRM setup, pipeline stages, and manual bottlenecks",
      "Design the automation logic for routing, follow-up, and stage transitions",
      "Build and test the workflows with your real lead and deal data",
      "Monitor pipeline accuracy and tighten rules based on conversion patterns",
    ],
    faqs: [
      {
        question: "Which CRMs do you work with?",
        answer:
          "I work with HubSpot, GoHighLevel, Salesforce, Pipedrive, and custom setups. The automation logic matters more than the platform.",
      },
      {
        question:
          "Can you fix a CRM that is already set up but not working well?",
        answer:
          "Yes. Most CRM problems come from poor automation and messy data, not the platform itself. I audit what you have and rebuild the workflows that matter.",
      },
      {
        question: "Will this replace my sales team?",
        answer:
          "No. The goal is to remove the admin work so your team can focus on conversations and closing instead of data entry and follow-up tracking.",
      },
    ],
    links: [
      {
        label: "Workflow automation",
        href: "/services/workflow-automation",
      },
      {
        label: "Lead generation systems",
        href: "/services/lead-generation-systems",
      },
      {
        label: "AI follow-up systems",
        href: "/services/ai-follow-up-systems",
      },
    ],
  },
  {
    slug: "ai-follow-up-systems",
    path: "/services/ai-follow-up-systems",
    title: "AI Follow-Up Systems",
    metaTitle:
      "AI Follow-Up Automation for Speed-to-Lead and Lead Nurturing",
    description:
      "AI follow-up systems that respond to leads instantly, nurture cold prospects, and re-engage past inquiries so nothing slips through the cracks.",
    intro: "Service",
    eyebrow: "AI Follow-Up Systems",
    heroTitle:
      "AI Follow-Up Systems That Respond Instantly and Nurture Until They Convert",
    heroDescription:
      "I build follow-up automation that contacts new leads within seconds, runs personalized nurture sequences, and reactivates cold prospects so your pipeline stays warm without manual chasing.",
    primaryKeyword: "AI follow-up automation",
    secondaryKeywords: [
      "speed to lead automation",
      "automated lead follow-up",
      "AI lead nurturing system",
      "lead reactivation automation",
      "instant lead response system",
      "follow-up sequence automation",
      "AI drip campaign builder",
      "automated prospect follow-up",
      "best AI follow-up system for leads",
      "how to follow up with leads faster",
      "automated text message follow-up",
      "AI email follow-up sequences",
      "lead reactivation campaign automation",
      "hire AI follow-up automation expert",
      "stop losing leads to slow follow-up",
      "SMS and email follow-up automation",
      "AI that follows up with old leads",
      "instant lead response system for businesses",
    ],
    idealFor: [
      "Businesses where leads go cold because follow-up takes too long",
      "Teams that know they should follow up more but don't have the bandwidth",
      "Operators sitting on a database of past leads they never re-engaged",
    ],
    outcomes: [
      "Sub-minute response time on new leads without manual intervention",
      "Higher conversion from existing pipeline through consistent nurture",
      "Reactivated revenue from past leads that were never properly followed up",
    ],
    deliverables: [
      "Instant-response triggers via SMS, email, and voice within seconds of inquiry",
      "Multi-step nurture sequences personalized by lead source, interest, and behavior",
      "Reactivation campaigns for dormant leads with re-engagement tracking",
    ],
    process: [
      "Audit your current response times, follow-up gaps, and dormant lead volume",
      "Design the sequence logic for instant response, nurture, and reactivation",
      "Build the automation across your CRM, email, SMS, and voice channels",
      "Launch and measure conversion lift against your previous follow-up baseline",
    ],
    faqs: [
      {
        question: "How fast can the system respond to a new lead?",
        answer:
          "Typically under 60 seconds. I build triggers that fire on form submissions, calls, or chat messages so the lead gets a response before they move on.",
      },
      {
        question:
          "Does this work for leads that came in weeks or months ago?",
        answer:
          "Yes. Reactivation campaigns are one of the highest-ROI plays. Most businesses have hundreds of leads that were never properly followed up.",
      },
      {
        question:
          "Can the follow-up feel personalized instead of spammy?",
        answer:
          "Yes. I build sequences that reference the lead's source, interest, and prior activity so messages feel relevant instead of generic.",
      },
    ],
    links: [
      {
        label: "Lead generation systems",
        href: "/services/lead-generation-systems",
      },
      { label: "CRM automation", href: "/services/crm-automation" },
      { label: "AI voice agents", href: "/services/ai-voice-agents" },
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
      "AI for HVAC companies",
      "AI for plumbing businesses",
      "after-hours call answering for contractors",
      "home services lead follow-up automation",
      "AI dispatch and scheduling for service businesses",
      "AI answering service for contractors",
      "how to get more leads for home services",
      "roofing company AI automation",
      "cleaning business lead generation",
      "best AI for home service companies",
      "HVAC lead generation automation",
      "plumber AI phone answering",
      "electrician lead capture system",
      "landscaping business AI automation",
      "pest control lead follow-up",
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
        question: "How many calls are home service businesses actually missing?",
        answer:
          "More than most owners realize. Industry reporting (Forbes, small-business call analytics) consistently puts missed-call rates for unstaffed home service lines around 60% during peak demand. On top of that, Harvard Business Review's lead-response research found a roughly 21x lift in qualifying contact when you respond within 5 minutes versus 30 — the gap an AI agent closes automatically.",
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
      { label: "AI for dental practices", href: "/industries/dental-practice-ai" },
      { label: "AI for med spas", href: "/industries/medical-spa-ai" },
      { label: "Results", href: "/results" },
    ],
    tldr: "AI for home services is a stack of phone-answering, lead-qualification, and dispatch automation built specifically for HVAC, plumbing, roofing, electrical, and cleaning businesses where techs are on the road and the front desk is small or part-time. It is built for owner-operators losing jobs to faster-responding competitors and teams that drop leads when calls stack up during peak demand. The primary outcome is more booked jobs from the same call and traffic volume, with urgent requests routed faster than a human dispatcher can manage.",
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
      "AI for aesthetic clinics",
      "med spa patient reactivation",
      "med spa front desk automation",
      "consultation booking automation for med spas",
      "AI marketing for medical spas",
      "best AI for med spas",
      "how to get more med spa clients",
      "med spa no-show reduction",
      "AI receptionist for aesthetic clinics",
      "med spa SMS marketing automation",
      "Botox lead generation automation",
      "aesthetic clinic intake automation",
      "med spa appointment reminder system",
      "cosmetic procedure lead capture",
      "med spa Google Ads follow-up automation",
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
      { label: "AI for dental practices", href: "/industries/dental-practice-ai" },
      { label: "AI for fitness studios", href: "/industries/fitness-studio-ai" },
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
      "law firm lead follow-up automation",
      "AI for personal injury law firms",
      "legal client intake software",
      "law firm CRM automation",
      "after-hours intake for attorneys",
      "best AI for law firms",
      "how to automate law firm intake",
      "legal intake chatbot",
      "law firm speed to lead",
      "attorney lead qualification automation",
      "personal injury lead intake automation",
      "family law firm AI receptionist",
      "immigration lawyer lead qualification",
      "criminal defense lead capture",
      "law firm Google Ads follow-up",
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
      { label: "AI for insurance agencies", href: "/industries/insurance-agency-ai" },
      { label: "AI for real estate", href: "/industries/real-estate-ai" },
      { label: "How it works", href: "/services" },
    ],
  },
  {
    slug: "real-estate-ai",
    path: "/industries/real-estate-ai",
    title: "AI for Real Estate",
    metaTitle:
      "AI Lead Capture and Follow-Up Systems for Real Estate Agents",
    description:
      "AI systems for real estate agents and teams that need faster lead response, automated follow-up, and more showings booked from online inquiries.",
    intro: "Industry",
    eyebrow: "Real Estate",
    heroTitle:
      "AI Systems for Real Estate Agents Who Need Faster Follow-Up and More Showings",
    heroDescription:
      "I build AI systems for real estate professionals that respond to leads instantly, qualify buyer and seller intent, book showings, and keep follow-up running so no opportunity goes cold.",
    primaryKeyword: "AI for real estate agents",
    secondaryKeywords: [
      "real estate lead follow-up automation",
      "AI for real estate teams",
      "real estate lead qualification",
      "automated showing booking",
      "real estate CRM automation",
      "AI assistant for realtors",
      "real estate lead nurturing",
      "AI for real estate brokerages",
      "best AI for real estate agents",
      "how to follow up with real estate leads",
      "AI ISA replacement for realtors",
      "automated real estate drip campaigns",
      "Zillow lead follow-up automation",
      "real estate ISA automation replacement",
      "AI for real estate investor leads",
      "buyer lead nurture automation",
      "open house follow-up automation",
      "real estate speed to lead system",
    ],
    idealFor: [
      "Solo agents and teams drowning in portal leads with no time to follow up",
      "Brokerages that need consistent lead distribution and response times",
      "Agents spending hours on manual follow-up instead of showing homes",
    ],
    outcomes: [
      "Faster response to Zillow, Realtor.com, and website leads",
      "More showings booked from the same lead volume",
      "Better lead nurturing that keeps prospects engaged until they're ready to move",
    ],
    deliverables: [
      "Instant lead response via text, email, and voice within seconds of inquiry",
      "Buyer and seller qualification logic with CRM routing and tagging",
      "Long-term nurture sequences for leads that aren't ready to transact yet",
    ],
    process: [
      "Map your lead sources, response workflow, and conversion bottlenecks",
      "Design qualification and follow-up sequences for buyers and sellers",
      "Connect the system to your CRM, calendar, and lead portals",
      "Track response times, showing rates, and conversion to optimize",
    ],
    faqs: [
      {
        question:
          "Can AI handle real estate leads from Zillow and Realtor.com?",
        answer:
          "Yes. I build integrations that capture portal leads instantly and start qualification and follow-up before a competitor responds.",
      },
      {
        question: "Will this work for a team or just solo agents?",
        answer:
          "Both. For teams, I add lead distribution rules so leads route to the right agent based on area, availability, or lead source.",
      },
      {
        question: "Can the AI book showings automatically?",
        answer:
          "Yes. The system can qualify interest, check availability, and schedule showings directly on the agent's calendar.",
      },
    ],
    links: [
      { label: "AI voice agents", href: "/services/ai-voice-agents" },
      {
        label: "AI follow-up systems",
        href: "/services/ai-follow-up-systems",
      },
      {
        label: "Lead generation systems",
        href: "/services/lead-generation-systems",
      },
      { label: "AI for insurance agencies", href: "/industries/insurance-agency-ai" },
      { label: "AI for home services", href: "/industries/home-services-ai" },
    ],
  },
  {
    slug: "dental-practice-ai",
    path: "/industries/dental-practice-ai",
    title: "AI for Dental Practices",
    metaTitle:
      "AI Appointment Booking and Patient Reactivation for Dental Practices",
    description:
      "AI systems for dental practices that automate appointment booking, reduce no-shows, reactivate lapsed patients, and handle after-hours inquiries.",
    intro: "Industry",
    eyebrow: "Dental Practices",
    heroTitle:
      "AI Systems for Dental Practices That Need Fuller Schedules and Fewer No-Shows",
    heroDescription:
      "I build AI systems for dental offices that book appointments online, send smart reminders, reactivate patients who haven't been in, and answer calls when the front desk can't.",
    primaryKeyword: "AI for dental practices",
    secondaryKeywords: [
      "dental appointment automation",
      "AI receptionist for dentists",
      "dental patient reactivation",
      "reduce dental no-shows",
      "dental office automation",
      "AI for dental offices",
      "dental booking system",
      "dental practice lead generation",
      "best AI for dental offices",
      "how to reduce dental appointment no-shows",
      "dental patient recall automation",
      "AI answering service for dentists",
      "dental office text message reminders",
      "dental hygiene recall system",
      "new patient acquisition for dentists",
      "dental office AI phone answering",
      "same-day dental appointment booking",
      "dental practice growth automation",
    ],
    idealFor: [
      "Practices with open chair time that could be filled by reactivating lapsed patients",
      "Offices losing new-patient inquiries because the front desk is busy or closed",
      "Dentists who want fewer no-shows without adding reminder staff",
    ],
    outcomes: [
      "More appointments booked from website visitors and phone inquiries",
      "Fewer no-shows through automated confirmation and reminder sequences",
      "Reactivated revenue from patients who haven't scheduled in 6 to 18 months",
    ],
    deliverables: [
      "Online self-scheduling with insurance and service type pre-qualification",
      "SMS and email reminder sequences tuned to reduce no-shows",
      "Patient reactivation campaigns for lapsed hygiene and treatment follow-ups",
    ],
    process: [
      "Audit your current booking flow, no-show rates, and reactivation gaps",
      "Design the booking, reminder, and reactivation systems around your schedule",
      "Build the automation with PMS integration, SMS, and email",
      "Track booking rates, no-show reduction, and reactivation revenue",
    ],
    faqs: [
      {
        question:
          "Can AI integrate with my practice management software?",
        answer:
          "In most cases, yes. I work with the APIs and integration layers available on platforms like Dentrix, Eaglesoft, Open Dental, and others.",
      },
      {
        question: "How does patient reactivation work?",
        answer:
          "The system identifies patients who haven't booked in a set timeframe and sends personalized outreach encouraging them to schedule their next visit.",
      },
      {
        question:
          "Will patients feel comfortable booking with AI?",
        answer:
          "Yes. The experience feels like a modern booking page, not a robot. Patients pick their time, confirm details, and get reminders — all in a familiar format.",
      },
    ],
    links: [
      {
        label: "AI appointment booking",
        href: "/services/ai-appointment-booking",
      },
      { label: "AI voice agents", href: "/services/ai-voice-agents" },
      { label: "AI for home services", href: "/industries/home-services-ai" },
      { label: "AI for med spas", href: "/industries/medical-spa-ai" },
    ],
  },
  {
    slug: "insurance-agency-ai",
    path: "/industries/insurance-agency-ai",
    title: "AI for Insurance Agencies",
    metaTitle:
      "AI Lead Qualification and Follow-Up Systems for Insurance Agencies",
    description:
      "AI systems for insurance agencies that qualify leads faster, automate quote follow-up, and keep renewal and cross-sell pipelines organized.",
    intro: "Industry",
    eyebrow: "Insurance Agencies",
    heroTitle:
      "AI Systems for Insurance Agencies That Need Faster Quotes and Better Follow-Up",
    heroDescription:
      "I build AI systems for insurance agencies that qualify inbound leads, automate quote follow-up, trigger renewal reminders, and surface cross-sell opportunities so nothing gets missed.",
    primaryKeyword: "AI for insurance agencies",
    secondaryKeywords: [
      "insurance lead qualification",
      "AI for insurance agents",
      "insurance quote follow-up automation",
      "insurance renewal automation",
      "AI receptionist for insurance agencies",
      "insurance agency CRM automation",
      "insurance cross-sell automation",
      "automated insurance lead nurturing",
      "best AI for insurance agents",
      "how to automate insurance renewals",
      "AI for independent insurance agents",
      "insurance quote automation",
      "insurance agency lead response automation",
      "P&C insurance lead automation",
      "life insurance lead follow-up",
      "insurance agency growth automation",
      "automated insurance quote request handling",
      "insurance client retention automation",
    ],
    idealFor: [
      "Agencies where quote follow-up is slow or inconsistent",
      "Teams that lose renewals because reminders fall through the cracks",
      "Agents who want to surface cross-sell opportunities without manual review",
    ],
    outcomes: [
      "Faster quote follow-up that closes more policies from existing leads",
      "Higher retention through automated renewal and check-in sequences",
      "More cross-sell revenue identified and acted on automatically",
    ],
    deliverables: [
      "Lead intake and qualification workflows for auto, home, life, and commercial lines",
      "Quote follow-up sequences with timing and channel optimization",
      "Renewal reminders, cross-sell triggers, and retention automation",
    ],
    process: [
      "Map your lead sources, quote workflow, and renewal pipeline",
      "Design qualification, follow-up, and retention sequences by line of business",
      "Build the automation across your AMS, CRM, and communication channels",
      "Track bind rates, renewal retention, and cross-sell conversion",
    ],
    faqs: [
      {
        question:
          "Can AI qualify insurance leads by line of business?",
        answer:
          "Yes. I build intake logic that routes leads based on coverage type, risk profile, and urgency so the right agent gets the right lead.",
      },
      {
        question:
          "Does this integrate with agency management systems?",
        answer:
          "I work with the integration options available on platforms like Applied Epic, HawkSoft, EZLynx, and others to keep data in sync.",
      },
      {
        question:
          "Can AI handle renewal reminders automatically?",
        answer:
          "Yes. The system can trigger multi-touch renewal sequences based on policy expiration dates so no renewal falls through the cracks.",
      },
    ],
    links: [
      { label: "CRM automation", href: "/services/crm-automation" },
      {
        label: "AI follow-up systems",
        href: "/services/ai-follow-up-systems",
      },
      { label: "AI voice agents", href: "/services/ai-voice-agents" },
      { label: "AI for auto dealerships", href: "/industries/auto-dealership-ai" },
      { label: "AI for law firms", href: "/industries/law-firm-ai" },
    ],
  },
  {
    slug: "auto-dealership-ai",
    path: "/industries/auto-dealership-ai",
    title: "AI for Auto Dealerships",
    metaTitle:
      "AI Lead Response and Booking Systems for Auto Dealerships",
    description:
      "AI systems for auto dealerships that respond to leads instantly, book test drives, automate follow-up, and keep the service department pipeline full.",
    intro: "Industry",
    eyebrow: "Auto Dealerships",
    heroTitle:
      "AI Systems for Dealerships That Need Faster Lead Response and More Test Drives",
    heroDescription:
      "I build AI systems for auto dealerships that respond to website and third-party leads within seconds, book test drives, automate sales follow-up, and drive service department retention.",
    primaryKeyword: "AI for auto dealerships",
    secondaryKeywords: [
      "dealership lead response automation",
      "AI for car dealerships",
      "auto dealer follow-up automation",
      "AI test drive booking system",
      "dealership BDC automation",
      "automotive lead qualification",
      "AI for dealership service departments",
      "car dealership CRM automation",
      "best AI for car dealerships",
      "how to improve dealership lead response time",
      "AI BDC for auto dealers",
      "dealership service reminder automation",
      "automotive lead management automation",
      "internet lead management for dealers",
      "auto dealer speed to lead",
      "used car dealership lead automation",
      "dealership appointment scheduling AI",
      "automotive BDC replacement",
    ],
    idealFor: [
      "Dealerships where internet leads sit in the CRM too long before first contact",
      "BDC teams that cannot keep up with lead volume across multiple sources",
      "Service departments that need automated maintenance reminders and rebooking",
    ],
    outcomes: [
      "Faster first response to internet leads from AutoTrader, Cars.com, and your website",
      "More test drives booked through automated qualification and scheduling",
      "Higher service retention through maintenance reminder and recall automation",
    ],
    deliverables: [
      "Instant lead response workflows across sales and service inquiries",
      "Test drive booking automation with calendar sync and confirmation sequences",
      "Service reminder, recall notification, and retention campaigns",
    ],
    process: [
      "Audit your lead sources, response times, and BDC workflow",
      "Design instant-response, qualification, and booking automation",
      "Build the system across your DMS, CRM, and communication channels",
      "Track response times, appointment rates, and service retention metrics",
    ],
    faqs: [
      {
        question:
          "Can AI respond to third-party leads like AutoTrader and Cars.com?",
        answer:
          "Yes. I build automations that capture leads from major portals and trigger instant follow-up before the lead contacts another dealership.",
      },
      {
        question:
          "Can this handle both sales and service department leads?",
        answer:
          "Yes. I build separate workflows for sales inquiries, service appointments, and recall notifications so each department gets what it needs.",
      },
      {
        question: "Will this replace our BDC team?",
        answer:
          "No. The goal is to handle the repetitive outreach and follow-up so your BDC team can focus on the conversations that actually close deals.",
      },
    ],
    links: [
      {
        label: "AI follow-up systems",
        href: "/services/ai-follow-up-systems",
      },
      {
        label: "AI appointment booking",
        href: "/services/ai-appointment-booking",
      },
      { label: "CRM automation", href: "/services/crm-automation" },
      { label: "AI for insurance agencies", href: "/industries/insurance-agency-ai" },
      { label: "AI for fitness studios", href: "/industries/fitness-studio-ai" },
    ],
  },
  {
    slug: "fitness-studio-ai",
    path: "/industries/fitness-studio-ai",
    title: "AI for Fitness Studios",
    metaTitle:
      "AI Lead Capture and Member Retention Systems for Gyms and Fitness Studios",
    description:
      "AI systems for gyms and fitness studios that capture leads, book trial classes, reduce member churn, and automate follow-up across the membership lifecycle.",
    intro: "Industry",
    eyebrow: "Fitness Studios",
    heroTitle:
      "AI Systems for Gyms and Studios That Need More Members and Less Churn",
    heroDescription:
      "I build AI systems for fitness businesses that respond to inquiries fast, book trial classes, follow up with no-shows, and keep existing members engaged so they stay longer.",
    primaryKeyword: "AI for gyms and fitness studios",
    secondaryKeywords: [
      "gym lead generation automation",
      "AI for fitness businesses",
      "fitness studio member retention",
      "gym membership follow-up automation",
      "AI for boutique fitness studios",
      "trial class booking automation",
      "gym no-show follow-up",
      "fitness studio CRM automation",
      "best AI for gyms",
      "how to reduce gym member churn",
      "fitness studio lead follow-up automation",
      "gym membership reactivation",
      "AI for personal training studios",
      "CrossFit gym lead generation",
      "yoga studio member retention",
      "personal trainer lead follow-up",
      "gym free trial follow-up automation",
      "fitness membership sales automation",
    ],
    idealFor: [
      "Studios losing trial leads because follow-up is slow or inconsistent",
      "Gyms with high member churn and no automated retention touchpoints",
      "Fitness businesses that want more class bookings without more front-desk labor",
    ],
    outcomes: [
      "More trial bookings and intro offers converted from website and ad leads",
      "Lower member churn through automated engagement and re-engagement sequences",
      "Better class fill rates through waitlist management and reminder automation",
    ],
    deliverables: [
      "Lead capture and trial booking automation with instant follow-up",
      "Member retention workflows including check-in triggers and win-back sequences",
      "Class booking, waitlist, and reminder automation",
    ],
    process: [
      "Map your lead funnel, trial-to-member conversion, and churn triggers",
      "Design the capture, booking, retention, and win-back automation",
      "Build the system with your scheduling platform, CRM, and messaging tools",
      "Track trial conversion, retention rates, and class utilization to improve",
    ],
    faqs: [
      {
        question: "Can AI help reduce member cancellations?",
        answer:
          "Yes. I build engagement triggers that detect at-risk members based on attendance patterns and automatically re-engage them before they cancel.",
      },
      {
        question:
          "Does this work for boutique studios and large gyms?",
        answer:
          "Both. The systems scale from single-location studios to multi-location fitness brands with shared or separate workflows.",
      },
      {
        question:
          "Can AI book trial classes and intro offers automatically?",
        answer:
          "Yes. The system captures interest, qualifies the prospect, and books them into a trial or intro session with confirmation and reminders.",
      },
    ],
    links: [
      {
        label: "AI appointment booking",
        href: "/services/ai-appointment-booking",
      },
      {
        label: "AI follow-up systems",
        href: "/services/ai-follow-up-systems",
      },
      {
        label: "Lead generation systems",
        href: "/services/lead-generation-systems",
      },
      { label: "AI for med spas", href: "/industries/medical-spa-ai" },
      { label: "AI for dental practices", href: "/industries/dental-practice-ai" },
    ],
  },
];

export const allSeoPages = [...servicePages, ...industryPages];

validateSeoPageCollection("servicePages", servicePages);
validateSeoPageCollection("industryPages", industryPages);
validateSeoPageCollection("allSeoPages", allSeoPages);

export function findSeoPageByPath(path: string) {
  return allSeoPages.find((page) => page.path === path);
}
