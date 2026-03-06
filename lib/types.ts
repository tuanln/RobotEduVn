export type LearningStage =
  | "kham-pha"
  | "tu-duy"
  | "lap-trinh"
  | "iot-robot"
  | "chia-se";

export interface VideoItem {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  stage: LearningStage;
  ageRange: string;
  tags: string[];
  description: string;
  thumbnail: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: "tap-chi" | "du-an" | "huong-dan" | "tin-tuc";
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  youtubeUrl?: string;
  published: boolean;
  publishDate: string;
}

export interface MakerHub {
  id: string;
  name: string;
  type: "fpt-shop" | "clb" | "truong-hoc";
  address: string;
  lat: number;
  lng: number;
  mentors: string[];
  schedule: string;
  equipment: string[];
  contact: string;
  active: boolean;
}

export interface StageInfo {
  slug: LearningStage;
  title: string;
  titleVi: string;
  ageRange: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  tools: string[];
  skills: string[];
  description: string;
  longDescription: string;
  badge: string;
  badgeName: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
