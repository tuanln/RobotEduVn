import type { RouteKey } from "@/lib/i18n/routes";

export interface ChoMentorContent {
  meta: { title: string; description: string };
  tieuDe: string;
  phuDe: string;
  /** `icon` và `route` giống hệt hai bản — test canh. */
  taiNguyen: { icon: string; title: string; desc: string; route: RouteKey }[];
  cachTroThanh: string;
  buoc: string[];
  nutLienHe: string;
}
