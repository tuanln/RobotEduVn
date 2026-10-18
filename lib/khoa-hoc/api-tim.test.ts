import { describe, expect, it } from "vitest";
import { bocApiTim, CACHE_TIM, GIOI_HAN_TIM } from "./api-tim";

function getGia() {
  const daNhan: string[] = [];
  const get = async (req: Request) => {
    daNhan.push(req.url);
    return Response.json([{ id: "1" }]);
  };
  return { get, daNhan };
}

describe("bocApiTim", () => {
  it("gắn Cache-Control để CDN giữ kết quả, không gọi function mỗi phím gõ", async () => {
    const { get } = getGia();
    const res = await bocApiTim(get)(new Request("https://x.vn/api/khoa-hoc/tim?query=VIA"));
    expect(res.headers.get("Cache-Control")).toBe(CACHE_TIM);
    expect(await res.json()).toEqual([{ id: "1" }]);
  });

  it("ép limit quá lớn về trần", async () => {
    const { get, daNhan } = getGia();
    await bocApiTim(get)(new Request("https://x.vn/api/khoa-hoc/tim?query=a&limit=100000"));
    expect(new URL(daNhan[0]).searchParams.get("limit")).toBe(String(GIOI_HAN_TIM));
  });

  it("limit thiếu, âm hoặc không phải số thì dùng trần", async () => {
    for (const q of ["", "&limit=-5", "&limit=abc"]) {
      const { get, daNhan } = getGia();
      await bocApiTim(get)(new Request(`https://x.vn/api/khoa-hoc/tim?query=a${q}`));
      expect(new URL(daNhan[0]).searchParams.get("limit")).toBe(String(GIOI_HAN_TIM));
    }
  });

  it("giữ limit hợp lệ nhỏ hơn trần và giữ nguyên query", async () => {
    const { get, daNhan } = getGia();
    await bocApiTim(get)(new Request("https://x.vn/api/khoa-hoc/tim?query=m%E1%BA%A1ch&limit=5"));
    const u = new URL(daNhan[0]);
    expect(u.searchParams.get("limit")).toBe("5");
    expect(u.searchParams.get("query")).toBe("mạch");
  });
});
