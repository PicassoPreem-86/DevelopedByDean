import type { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  track: "websites" | "ai";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  challenge: string;
  solution: string;
  results: string;
  techUsed: string[];
  screenshots: string[];
  isPlaceholder: boolean;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}
