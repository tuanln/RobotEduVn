import { describe, expect, it } from "vitest";
import { NHIP, getNhip, nhipKeTiep } from "./nhip";
import { NHIP_SLUGS } from "./nhip-slug";

const TEN_PHAN_MEM = [
  "GCompris",
  "KTurtle",
  "Python",
  "Arduino",
  "ThingBot",
  "NEO One",
  "ThingEduBlock",
  "GitHub",
];

describe("NHIP", () => {
  it("có đúng ba nhịp, đúng thứ tự vòng lặp", () => {
    expect(NHIP.map((n) => n.slug)).toEqual([...NHIP_SLUGS]);
  });

  it("không mô tả nào mở đầu bằng tên phần mềm", () => {
    for (const nhip of NHIP) {
      for (const doan of [nhip.moTaNgan, nhip.khauHieu, nhip.taiLangMaker]) {
        for (const ten of TEN_PHAN_MEM) {
          expect(
            doan.trimStart().startsWith(ten),
            `Nhịp "${nhip.ten}" mở đầu bằng "${ten}": ${doan.slice(0, 60)}`
          ).toBe(false);
        }
      }
    }
  });

  it("không chỗ nào của nhịp nhắc tới học phí", () => {
    const tuCam = ["học phí", "600k", "600.000", "đồng/tháng", "vnđ"];
    const toanBoChu = NHIP.map((n) =>
      [n.khauHieu, n.moTaNgan, n.moTaDai, n.taiLangMaker].join(" ")
    )
      .join(" ")
      .toLowerCase();
    for (const tu of tuCam) {
      expect(toanBoChu.includes(tu), `còn nhắc "${tu}"`).toBe(false);
    }
  });

  it("nhịp Chơi liệt kê đúng 5 trạm Bảo tàng Tò mò", () => {
    const choi = getNhip("choi");
    expect(choi.tramChoi).toEqual([
      "NEO Art Zone",
      "NEO Arcade",
      "NEO AI Sport",
      "NEO Sport",
      "NEO Paper Play",
    ]);
  });

  it("nhịp Làm có 3 hướng song song và 3 nguyên tắc dẫn buổi học", () => {
    const lam = getNhip("lam");
    expect(lam.huong).toHaveLength(3);
    expect(lam.nguyenTac).toHaveLength(3);
    for (const h of lam.huong ?? []) {
      expect(h.tools.length).toBeGreaterThan(0);
    }
  });

  it("chỉ nhịp Chơi có trạm chơi, chỉ nhịp Làm có hướng và nguyên tắc", () => {
    expect(getNhip("lam").tramChoi).toBeUndefined();
    expect(getNhip("chia-se").huong).toBeUndefined();
    expect(getNhip("choi").nguyenTac).toBeUndefined();
  });

  it("mọi nhịp đều nói được nó diễn ra thế nào tại Làng Maker", () => {
    for (const nhip of NHIP) {
      expect(nhip.taiLangMaker.length).toBeGreaterThan(40);
    }
  });
});

describe("getNhip", () => {
  it("trả đúng nhịp theo slug", () => {
    expect(getNhip("chia-se").ten).toBe("Chia sẻ");
  });
});

describe("nhipKeTiep", () => {
  it("trả nhịp kế tiếp theo thứ tự vòng lặp", () => {
    expect(nhipKeTiep("choi").slug).toBe("lam");
    expect(nhipKeTiep("lam").slug).toBe("chia-se");
  });

  it("sau nhịp cuối thì QUAY LẠI nhịp đầu — đây là vòng lặp, không phải thang bậc", () => {
    expect(nhipKeTiep("chia-se").slug).toBe("choi");
  });
});
