import { describe, expect, it } from "vitest";
import { boLangVi, chuCanQuet } from "./leak-scan.mjs";

describe("boLangVi", () => {
  it("bỏ phần tử lang=vi, giữ phần sau", () => {
    expect(boLangVi('<p lang="vi">Xin chào</p><p>Chưa dịch</p>')).toContain(
      "Chưa dịch",
    );
  });

  it("thẻ rỗng (img) có lang=vi chỉ bỏ đúng thẻ đó, không nuốt cả trang", () => {
    const out = boLangVi('<p>a</p><img lang="vi" alt="x"><p>Chưa dịch</p>');
    expect(out).toContain("Chưa dịch");
  });

  it("thẻ tự đóng lồng bên trong không làm lệch bộ đếm", () => {
    const out = boLangVi('<div lang="vi"><div/>x</div><p>Chưa dịch</p>');
    expect(out).toContain("Chưa dịch");
    expect(out).not.toContain(">x<");
  });

  it("thiếu thẻ đóng thì ném lỗi, không âm thầm cắt tới cuối trang", () => {
    expect(() => boLangVi('<div lang="vi">x<p>Chưa dịch</p>')).toThrow();
  });
});

describe("chuCanQuet", () => {
  it("quét cả thuộc tính alt/title/aria-label/placeholder/content", () => {
    const s = chuCanQuet('<img alt="Hướng dẫn"><meta name="keywords" content="giáo dục">');
    expect(s).toContain("Hướng dẫn");
    expect(s).toContain("giáo dục");
  });

  it("thuộc tính nằm trong phần tử lang=vi thì bỏ qua", () => {
    const s = chuCanQuet('<a lang="vi" href="/x"><img alt="Hướng dẫn"></a>');
    expect(s).not.toContain("Hướng dẫn");
  });

  it("bỏ script/style và giải &amp;", () => {
    const s = chuCanQuet("<script>var x='Việt'</script><p>A &amp; B</p>");
    expect(s).not.toContain("Việt");
    expect(s).toContain("A & B");
  });
});
