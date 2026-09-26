import { describe, expect, it } from "vitest";
import { emptyStringKeys } from "@/lib/i18n/parity";
import { gloss, GLOSSARY } from "./glossary";

describe("GLOSSARY", () => {
  it("có đủ tám thuật ngữ như spec 2.6", () => {
    expect(Object.keys(GLOSSARY)).toHaveLength(8);
  });

  it("không thuật ngữ nào bỏ trống", () => {
    expect(emptyStringKeys(GLOSSARY)).toEqual([]);
  });

  it("giữ nguyên tên tiếng Việt, không dịch hẳn sang tiếng Anh", () => {
    expect(GLOSSARY.thoCa.vi).toBe("Thợ cả");
    expect(GLOSSARY.giaLang.vi).toBe("Già làng");
  });

  it("Maker Hub giữ nguyên ở cả hai ngôn ngữ — vốn đã là tiếng Anh", () => {
    expect(GLOSSARY.makerHub.vi).toBe("Maker Hub");
    expect(GLOSSARY.makerHub.en).toBe("Maker Hub");
  });

  it("chú giải Nghệ nhân phải nói rõ đứng CẠNH thang, không TRÊN thang", () => {
    // Chi tiết này là điểm dễ dịch sai nhất của cả bảng.
    expect(GLOSSARY.ngheNhan.en).toContain("beside the ladder");
  });
});

describe("gloss", () => {
  it("trả tên tiếng Việt khi đọc bản tiếng Việt", () => {
    expect(gloss("langMaker", "vi")).toBe("Làng Maker");
  });

  it("trả chú giải tiếng Anh khi đọc bản tiếng Anh", () => {
    expect(gloss("langMaker", "en")).toBe("the Maker Village");
  });
});
