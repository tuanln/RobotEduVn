/**
 * Link tới tệp tĩnh trong public/hoc-lieu (vd. bài mẫu ThingBlock .tb) phải là
 * thẻ <a download> thường: next/link coi nó là trang và điều hướng phía client.
 */
export function laTepTaiVe(href: string): boolean {
  return /^\/hoc-lieu\/.+\.[a-z0-9]+$/i.test(href.split("#")[0]);
}
