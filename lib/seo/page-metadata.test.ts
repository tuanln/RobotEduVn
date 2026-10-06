import { describe, expect, it } from "vitest";
import { pageMetadata } from "./page-metadata";

const META = { title: "T", description: "D" };

describe("pageMetadata", () => {
  it("canonical trỏ về chính trang theo đúng ngôn ngữ", () => {
    expect(pageMetadata("tools", "en", META).alternates?.canonical).toBe(
      "/en/tools",
    );
    expect(pageMetadata("tools", "vi", META).alternates?.canonical).toBe(
      "/cong-cu",
    );
  });

  it("chỉ khai hreflang khi trang đã có bản dịch thật", () => {
    // philosophy đã dịch từ kế hoạch 1
    expect(pageMetadata("philosophy", "vi", META).alternates?.languages).toEqual(
      {
        vi: "/triet-ly",
        en: "/en/philosophy",
        "x-default": "/triet-ly",
      },
    );
  });

  // Task 6 thêm magazine vào TRANSLATED_ROUTES; khi đó xoá ca này — kế
  // hoạch 2 dịch hết mọi route nên không còn route chưa dịch để thử.
  it("route chưa dịch thì không khai hreflang", () => {
    expect(
      pageMetadata("magazine", "vi", META).alternates?.languages,
    ).toBeUndefined();
  });

  it("luôn mang ảnh OG — openGraph của trang ghi đè layout, không trộn", () => {
    const og = pageMetadata("tools", "en", META).openGraph;
    expect(og?.images).toBeDefined();
    expect(og && "locale" in og ? og.locale : undefined).toBe("en_US");
  });
});
