/**
 * Bọc GET tìm kiếm của fumadocs. GET đó đọc request.url nên route là động —
 * `revalidate = false` không làm nó tĩnh; không bọc thì mỗi phím gõ là một lần
 * gọi function và kết quả không được CDN giữ. Nội dung chỉ đổi khi deploy
 * (deploy mới làm sạch cache CDN), nên giữ một ngày là an toàn.
 */
export const GIOI_HAN_TIM = 60;
export const CACHE_TIM = "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800";

export function bocApiTim(get: (req: Request) => Promise<Response>) {
  return async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const limit = Number(url.searchParams.get("limit"));
    const hopLe = Number.isInteger(limit) && limit > 0 && limit <= GIOI_HAN_TIM;
    url.searchParams.set("limit", String(hopLe ? limit : GIOI_HAN_TIM));

    const res = await get(new Request(url, req));
    const out = new Response(res.body, res);
    out.headers.set("Cache-Control", CACHE_TIM);
    return out;
  };
}
