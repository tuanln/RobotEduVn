/**
 * So hai đối tượng nội dung vi/en để bắt chỗ dịch sót.
 *
 * `tsc` đã bắt được trường hợp thiếu hẳn trường. Tệp này bịt hai lỗ còn lại:
 * trường có mặt nhưng rỗng, và mảng hụt phần tử.
 */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function deepKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    if (value.length === 0) return prefix ? [prefix] : [];
    return value.flatMap((item, i) =>
      deepKeys(item, prefix ? `${prefix}.${i}` : String(i)),
    );
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value);
    if (entries.length === 0) return prefix ? [prefix] : [];
    return entries.flatMap(([k, v]) =>
      deepKeys(v, prefix ? `${prefix}.${k}` : k),
    );
  }

  return prefix ? [prefix] : [];
}

/** Khoá có trong `reference` mà vắng trong `candidate`. */
export function missingKeys(reference: unknown, candidate: unknown): string[] {
  const have = new Set(deepKeys(candidate));
  return deepKeys(reference).filter((k) => !have.has(k));
}

/** Khoá trỏ tới chuỗi rỗng hoặc chỉ gồm khoảng trắng. */
export function emptyStringKeys(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return value.trim() === "" && prefix ? [prefix] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, i) =>
      emptyStringKeys(item, prefix ? `${prefix}.${i}` : String(i)),
    );
  }

  if (isPlainObject(value)) {
    return Object.entries(value).flatMap(([k, v]) =>
      emptyStringKeys(v, prefix ? `${prefix}.${k}` : k),
    );
  }

  return [];
}
