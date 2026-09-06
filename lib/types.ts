export type { NhipSlug } from "./content/nhip-slug";
import type { NhipSlug } from "./content/nhip-slug";

export interface VideoItem {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  stage: NhipSlug;
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
  /** Tỉnh/thành để nhóm hub trên trang mạng lưới. */
  city: string;
  /** Để trống khi hub chưa gửi thông tin — giao diện hiện "Đang cập nhật". */
  mentors: string[];
  schedule: string;
  equipment: string[];
  contact: string;
  active: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
