/**
 * Ảnh OG dùng chung cho toàn site — nguồn sự thật duy nhất cho URL ảnh.
 *
 * File sinh ảnh (`app/opengraph-image.tsx`) đặt CỐ Ý ở gốc `app/`, ngoài
 * cây `app/(site)/[locale]/`, vì quy ước tệp ảnh OG của Next chỉ tự kế
 * thừa xuống các trang NẰM TRONG cùng cây layout — với hai root layout
 * (`(site)/[locale]` và `(admin)`) như dự án này, gốc `app/` không thuộc
 * cây nào cả nên auto-injection không chạy tới nơi (N-01, vấn đề 1).
 *
 * Vì vậy, ảnh OG phải được khai TƯỜNG MINH bằng `images` trong
 * `openGraph`/`twitter` của metadata — không dựa vào kế thừa quy ước tệp.
 * Route thật của ảnh ổn định là `/opengraph-image` (xác nhận bằng build:
 * `.next/server/app/opengraph-image.meta`, KHÔNG có hậu tố băm vì đây là
 * ảnh tĩnh duy nhất, không theo tham số động) — không có tiền tố `/vi`
 * hay `/en` nên gọi thẳng được từ bên ngoài, và `rewrite.ts` đã liệt
 * "/opengraph-image" vào BO_QUA nên middleware không đụng vào.
 */
export const OG_IMAGE_PATH = "/opengraph-image";

const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * Trang nào tự khai `openGraph` trong `generateMetadata`/`metadata` sẽ GHI
 * ĐÈ TOÀN BỘ đối tượng `openGraph` của layout cha — Next KHÔNG trộn các
 * trường lồng nhau như `openGraph`/`twitter`, chỉ thay thế nguyên khối
 * (N-01, vấn đề 2: trang Triết Lý tự khai `openGraph` nên mất ảnh, dù
 * layout cha đã có). Mọi trang tự khai `openGraph` PHẢI gọi `ogImages()`
 * cho trường `images` của chính nó — đừng quên, vì TypeScript không bắt
 * được lỗi thiếu trường tuỳ chọn này.
 */
export function ogImages(alt: string) {
  return [{ ...OG_IMAGE_SIZE, url: OG_IMAGE_PATH, alt }];
}

/** Tương tự `ogImages`, dùng cho trường `images` của `twitter`. */
export function twitterImages() {
  return [OG_IMAGE_PATH];
}
