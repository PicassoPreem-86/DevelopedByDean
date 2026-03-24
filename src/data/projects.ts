export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  status: "Live" | "In Development" | "Concept Build" | "Selected Work";
  year: string;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Meridian",
    category: "Website + AI Integration",
    description: "A premium e-commerce experience with AI-powered product recommendations and personalized shopping flows.",
    status: "Selected Work",
    year: "2026",
  },
  {
    id: "project-2",
    title: "Project Apex",
    category: "AI Agent System",
    description: "An autonomous customer support system that handles tier-1 inquiries and intelligently escalates complex issues.",
    status: "In Development",
    year: "2026",
  },
  {
    id: "project-3",
    title: "Project Helios",
    category: "Workflow Automation",
    description: "End-to-end business automation connecting CRM, invoicing, and client communication into one unified system.",
    status: "Concept Build",
    year: "2026",
  },
];
