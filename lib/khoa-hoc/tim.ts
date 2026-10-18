/**
 * Kết quả tìm kiếm của fumadocs đánh dấu chữ khớp bằng `<mark>…</mark>` lẫn
 * trong Markdown. Tách thành đoạn để vẽ bằng React — không dùng
 * dangerouslySetInnerHTML, vì nội dung là chữ của học liệu, không phải HTML
 * đã được làm sạch.
 */
export interface DoanTim {
  chu: string;
  khop: boolean;
}

export function tachDanhDau(noiDung: string): DoanTim[] {
  const doan: DoanTim[] = [];
  const re = /<mark>([\s\S]*?)<\/mark>/g;
  let cuoi = 0;
  for (const m of noiDung.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > cuoi) doan.push({ chu: boMarkdown(noiDung.slice(cuoi, i)), khop: false });
    doan.push({ chu: boMarkdown(m[1]), khop: true });
    cuoi = i + m[0].length;
  }
  if (cuoi < noiDung.length) doan.push({ chu: boMarkdown(noiDung.slice(cuoi)), khop: false });
  return doan.filter((d) => d.chu !== "");
}

/** Bỏ dấu nhấn Markdown và thẻ HTML còn sót — chỉ cần chữ để đọc lướt. */
function boMarkdown(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/[*_`#]+/g, "");
}
