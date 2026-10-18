// Cổng kiểm thư viện khóa học trên một server đang chạy (local hoặc live):
//   node scripts/check-khoa-hoc.mjs [http://localhost:3000]
// - đủ 48 trang trong sitemap, trang nào cũng 200
// - mọi href/src nội bộ và mọi tệp tải về trên Blob đều mở được
// - mọi link neo #… trỏ tới id có thật
// - /en/khoa-hoc… 404, nút đổi ngôn ngữ không dẫn sang bản tiếng Anh giả
// - tìm kiếm tiếng Việt có dấu ra kết quả
// - không còn dấu vết vsteam, rác Moodle
const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const BLOB = "https://lrywo2cvc6iz8mox.public.blob.vercel-storage.com/khoa-hoc/";
const errors = [];
const cache = new Map();

async function status(url, method = "GET") {
  const key = `${method} ${url}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(url, { method, redirect: "follow" })
        .then((r) => r.status)
        .catch((e) => `lỗi mạng ${e.message}`),
    );
  }
  return cache.get(key);
}

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const trang = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .filter((p) => p === "/khoa-hoc" || p.startsWith("/khoa-hoc/"));
if (trang.length !== 48) errors.push(`sitemap có ${trang.length} trang khóa học, cần 48`);
if (/\/en\/khoa-hoc/.test(sitemap)) errors.push("sitemap khai /en/khoa-hoc");

const html = new Map();
for (const p of trang) {
  const r = await fetch(`${BASE}${p}`);
  if (r.status !== 200) {
    errors.push(`${p} → ${r.status}`);
    continue;
  }
  html.set(p, await r.text());
}

let soLink = 0;
const blobDaKiem = new Set();
for (const [p, h] of html) {
  const noiDung = h.replace(/<script[\s\S]*?<\/script>/g, "");
  if (/vsteam\.edu\.vn/.test(noiDung)) errors.push(`${p} còn link vsteam.edu.vn`);
  if (/💬|cmid \d+|_Loại:/.test(noiDung)) errors.push(`${p} còn rác Moodle`);
  const chu = noiDung.replace(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/g, "").replace(/<[^>]+>/g, " ");
  // ** lộ ra, hoặc * mồ côi dính chữ (rác của chữ đậm Moodle viết sai)
  const sao = chu.match(/.{0,30}(\*\*|(?:^|\s)\*(?=[^\s\d,])).{0,30}/);
  if (sao) errors.push(`${p} lộ dấu ** chưa thành chữ đậm: "${sao[0].trim()}"`);
  const anhHong = [...noiDung.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\ssrc="[^"]+"/.test(m[0]));
  if (anhHong.length) errors.push(`${p} có ${anhHong.length} ảnh không có src`);
  if (/›\s*Docs\b/.test(chu)) errors.push(`${p} breadcrumb còn chữ "Docs"`);
  if (/href="\/en\/khoa-hoc/.test(h)) errors.push(`${p} có link sang /en/khoa-hoc`);
  if (!/<link rel="canonical" href="[^"]*\/khoa-hoc/.test(h)) errors.push(`${p} thiếu canonical`);
  if (/hreflang="en"/.test(h)) errors.push(`${p} khai hreflang en cho trang chỉ có tiếng Việt`);

  const urls = [...h.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
  for (const u of urls) {
    if (u.startsWith(BLOB)) {
      if (blobDaKiem.has(u)) continue;
      blobDaKiem.add(u);
      const s = await status(u, "HEAD");
      if (s !== 200) errors.push(`${p} → tệp Blob ${u} trả ${s}`);
      continue;
    }
    if (!u.startsWith("/") || u.startsWith("//")) continue;
    const [duong, neo] = u.split("#");
    if (duong === "") {
      if (neo && !h.includes(`id="${decodeURIComponent(neo)}"`)) errors.push(`${p} → #${neo} không có neo`);
      continue;
    }
    soLink++;
    const s = await status(`${BASE}${duong}`);
    if (s !== 200) errors.push(`${p} → ${duong} trả ${s}`);
    if (neo && html.has(duong) && !html.get(duong).includes(`id="${decodeURIComponent(neo)}"`)) {
      errors.push(`${p} → ${duong}#${neo} không có neo`);
    }
  }
}
if (blobDaKiem.size !== 19) errors.push(`dùng ${blobDaKiem.size} tệp Blob, cần 19`);

for (const p of ["/en/khoa-hoc", "/en/khoa-hoc/maker-viet/cobot", "/khoa-hoc/khong-co-trang-nay", "/vi/khoa-hoc/__chi-co-tieng-viet__"]) {
  const s = await status(`${BASE}${p}`);
  if (s !== 404) errors.push(`${p} trả ${s}, cần 404`);
}

for (const q of ["lập trình", "mạch VIA", "động cơ", "ThingBot"]) {
  const r = await fetch(`${BASE}/api/khoa-hoc/tim?query=${encodeURIComponent(q)}`);
  const kq = r.ok ? await r.json() : [];
  if (!Array.isArray(kq) || kq.length === 0) errors.push(`tìm "${q}" không ra kết quả (${r.status})`);
  else if (!kq.every((k) => k.url.startsWith("/khoa-hoc"))) errors.push(`tìm "${q}" trả URL ngoài /khoa-hoc`);
}

console.log(`Đã kiểm ${html.size} trang, ${soLink} liên kết nội bộ, ${blobDaKiem.size} tệp Blob trên ${BASE}.`);
if (errors.length) {
  console.error(`${errors.length} lỗi:\n- ${[...new Set(errors)].slice(0, 40).join("\n- ")}`);
  process.exit(1);
}
console.log("OK");
