import { MakerHub } from "@/lib/types";

/**
 * Maker Hub / Làng Maker đang hoạt động — dữ liệu do ban điều phối cung cấp.
 * Chỉ ghi những trường đã được xác nhận; lịch sinh hoạt, mentor và thiết bị
 * để trống cho tới khi từng hub gửi thông tin, giao diện sẽ hiện "Đang cập nhật".
 */
export const HUBS: MakerHub[] = [
  {
    id: "hub-hn-xa-dan",
    name: "Làng Maker — FPT Shop 190 Xã Đàn",
    type: "fpt-shop",
    address: "190 Xã Đàn, Đống Đa, Hà Nội",
    city: "Hà Nội",
    mentors: [],
    schedule: "",
    equipment: [],
    contact: "lang@makerviet.org",
    active: true,
  },
  {
    id: "hub-hn-duong-khue",
    name: "Làng Maker — 29 Dương Khuê",
    type: "clb",
    address: "29 Dương Khuê, Cầu Giấy, Hà Nội",
    city: "Hà Nội",
    mentors: [],
    schedule: "",
    equipment: [],
    contact: "lang@makerviet.org",
    active: true,
  },
  {
    id: "hub-th-quang-trung",
    name: "Làng Maker — FPT Shop Quang Trung",
    type: "fpt-shop",
    address: "Đường Quang Trung, TP. Thanh Hóa, Thanh Hóa",
    city: "Thanh Hóa",
    mentors: [],
    schedule: "",
    equipment: [],
    contact: "lang@makerviet.org",
    active: true,
  },
];

/** Link mở Google Maps theo địa chỉ — không cần lưu toạ độ ước lượng. */
export function hubMapUrl(hub: MakerHub): string {
  const q = encodeURIComponent(`${hub.name} ${hub.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
