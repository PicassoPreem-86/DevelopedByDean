export type FoundingWallTag =
  | "Friend"
  | "Builder"
  | "Creative"
  | "Supporter"
  | "Founder Circle";

export type FoundingWallNote = {
  id: string;
  name: string;
  message: string;
  tag: FoundingWallTag;
  city?: string;
  pinned?: boolean;
};

export const foundingWallNotes: FoundingWallNote[] = [];
