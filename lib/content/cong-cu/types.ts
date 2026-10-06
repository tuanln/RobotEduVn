import type { NhipSlug } from "@/lib/content/nhip-slug";

/** Một món đồ nghề. `name` và `nhip` là tên riêng/khoá — giống hệt hai bản. */
export interface CongCu {
  name: string;
  nhip: NhipSlug;
  type: string;
  origin: string;
  desc: string;
  features: string[];
}

export interface CongCuContent {
  meta: { title: string; description: string };
  tieuDe: string;
  phuDe: string;
  ghiChu: string;
  tools: CongCu[];
}
