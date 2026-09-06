import { describe, expect, it } from "vitest";
import { VIDEOS } from "./videos";
import { NHIP_SLUGS } from "./nhip-slug";

describe("VIDEOS", () => {
  it("mọi video đều mang slug nhịp hợp lệ, không còn slug 5 bậc cũ", () => {
    for (const v of VIDEOS) {
      expect(
        (NHIP_SLUGS as readonly string[]).includes(v.stage),
        `video "${v.id}" còn slug "${v.stage}"`
      ).toBe(true);
    }
  });

  it("video kỹ thuật vào nhịp Làm", () => {
    const idLam = [
      "mv-thingbot-kit-2026",
      "mv-thingbot-gioi-thieu",
      "mv-thingbot-phan-cung",
      "mv-cobot-lap-rap",
      "mv-arduino-bai-1",
      "mv-arduino-bai-2",
      "mv-thingedublock",
    ];
    for (const id of idLam) {
      expect(VIDEOS.find((v) => v.id === id)?.stage, id).toBe("lam");
    }
  });

  it("video thi đấu và cộng đồng vào nhịp Chia sẻ", () => {
    const idChiaSe = [
      "mv-maker-tutor-b3",
      "mv-vrc-2022-chung-ket",
      "mv-vsc-vrc-2020-2022",
      "mv-fgc-2022-welcome",
      "mv-fgc-2022-before",
      "mv-fgc-2022-geneva",
      "mv-mobile-maker-explora",
      "mv-mobile-maker-fschool",
    ];
    for (const id of idChiaSe) {
      expect(VIDEOS.find((v) => v.id === id)?.stage, id).toBe("chia-se");
    }
  });

  it("mọi id là duy nhất", () => {
    expect(new Set(VIDEOS.map((v) => v.id)).size).toBe(VIDEOS.length);
  });
});
