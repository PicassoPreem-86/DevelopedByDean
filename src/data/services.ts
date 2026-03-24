import { Globe, LayoutDashboard, Bot, Phone, Workflow } from "lucide-react";
import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "custom-websites",
    title: "Custom Websites",
    description: "Designed from scratch to convert visitors into customers. Fast, responsive, and built to grow with you.",
    icon: Globe,
    track: "websites",
  },
  {
    id: "web-applications",
    title: "Web Applications",
    description: "Interactive tools, dashboards, and platforms tailored to how your business operates.",
    icon: LayoutDashboard,
    track: "websites",
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    description: "Custom assistants that handle customer questions, qualify leads, and support your team 24/7.",
    icon: Bot,
    track: "ai",
  },
  {
    id: "voice-agents",
    title: "Voice Agents",
    description: "AI-powered phone systems that book appointments, answer FAQs, and never put anyone on hold.",
    icon: Phone,
    track: "ai",
  },
  {
    id: "ai-workflows",
    title: "AI Workflows & Automation",
    description: "Eliminate repetitive tasks. Connect your tools and let AI handle the busywork.",
    icon: Workflow,
    track: "ai",
  },
];
