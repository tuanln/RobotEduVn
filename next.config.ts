import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

/**
 * Bốn redirect đầu: bốn giai đoạn cũ đã gộp vào ba nhịp (spec 2026-09-06 mục
 * 4.2). Redirect thứ năm: trang giới thiệu cũ (`/gioi-thieu`) đã gộp vào trang
 * Làng Maker (spec mục 2.3). Giữ redirect vĩnh viễn: các link này đã nằm trong
 * sitemap và có thể đã được chia sẻ. `chia-se` trùng tên slug cũ nên không cần
 * redirect.
 */
/**
 * Web mô phỏng ThingBot (10 bài, repo ThingEdu/thingbot-sim) là app Vite riêng, AGPL-3.0, đưa lên
 * project Vercel `thingbot-sim`. Ở đây chỉ chuyển tiếp ngầm để nó hiện dưới robot.edu.vn/mo-phong —
 * không chép mã vào repo này. Bản build của nó nằm sẵn dưới /mo-phong/ nên giữ nguyên đường dẫn.
 */
const MO_PHONG = "https://thingbot-sim.vercel.app/mo-phong";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // beforeFiles: chạy trước cây route [locale], nếu không /mo-phong sẽ khớp [locale]="mo-phong".
      beforeFiles: [
        { source: "/mo-phong", destination: `${MO_PHONG}/` },
        { source: "/mo-phong/:path+", destination: `${MO_PHONG}/:path+` },
      ],
    };
  },
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

// fumadocs-mdx biên dịch content/khoa-hoc/*.md lúc build (lib/khoa-hoc/source.ts)
const withMDX = createMDX();

export default withMDX(nextConfig);
