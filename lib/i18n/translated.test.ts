import { describe, expect, it } from "vitest";
import { ROUTES, type RouteKey } from "./routes";
import { TRANSLATED_ROUTES } from "./translated";

describe("TRANSLATED_ROUTES", () => {
  it("sau kế hoạch 2, mọi route công khai đều đã dịch", () => {
    expect([...TRANSLATED_ROUTES].sort()).toEqual(
      (Object.keys(ROUTES) as RouteKey[]).sort(),
    );
  });
});
