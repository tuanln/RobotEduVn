import type { NextConfig } from "next";

/**
 * Bốn redirect đầu: bốn giai đoạn cũ đã gộp vào ba nhịp (spec 2026-09-06 mục
 * 4.2). Redirect thứ năm: trang giới thiệu cũ (`/gioi-thieu`) đã gộp vào trang
 * Làng Maker (spec mục 2.3). Giữ redirect vĩnh viễn: các link này đã nằm trong
 * sitemap và có thể đã được chia sẻ. `chia-se` trùng tên slug cũ nên không cần
 * redirect.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/hanh-trinh/kham-pha", destination: "/hanh-trinh/choi", permanent: true },
      { source: "/hanh-trinh/tu-duy", destination: "/hanh-trinh/lam", permanent: true },
      { source: "/hanh-trinh/lap-trinh", destination: "/hanh-trinh/lam", permanent: true },
      { source: "/hanh-trinh/iot-robot", destination: "/hanh-trinh/lam", permanent: true },
      { source: "/gioi-thieu", destination: "/lang-maker", permanent: true },
    ];
  },
};

export default nextConfig;
