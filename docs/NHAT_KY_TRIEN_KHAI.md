# Nhật ký triển khai

Ghi lại **trạng thái chạy thật** của robot.edu.vn: đang phục vụ ở đâu, cấu hình
hạ tầng nào, và việc gì còn treo. Thiết kế và kế hoạch thi công nằm ở
`docs/superpowers/`; file này chỉ chép lại những gì đã bấm nút và đã nghiệm thu.

Mỗi mục ghi **ngày · việc · bằng chứng nghiệm thu**. Không ghi dự định.

---

## Trạng thái hiện tại (20/09/2026)

| Hạng mục | Giá trị |
|---|---|
| Bản chính thức | <https://robot.edu.vn> |
| Vercel project | `robot-edu-vn` (gói **Hobby**) |
| Nhánh phát hành | `main` — `214d77d` |
| URL chuẩn (canonical) | `https://robot.edu.vn` — apex, **không** www |
| `www.robot.edu.vn` | 308 vĩnh viễn → apex |
| Chứng chỉ | Let's Encrypt, tự động, hạn 23/10/2026 |
| Biến môi trường trên Vercel | **chưa có biến nào** |

Bản v0 cũ (project `v0-robot-edu`, tiếng Anh, "Where Math is a Playground")
**vẫn còn**, chỉ mất domain — xem <https://v0-robot-edu.vercel.app>.

---

## 24/09/2026 — Hạ tầng song ngữ Việt–Anh (kế hoạch 1/3) xong

Nhánh `feat/song-ngu-va-hinh-anh`, 22 commit. Cây route `[locale]` + hai root layout +
middleware dịch slug; trang Triết Lý song ngữ trọn vẹn; hreflang + sitemap hai ngữ; nút
chuyển ngôn ngữ và dải gợi ý. 136 test. Tám trang còn lại CỐ Ý chưa dịch — kế hoạch 2.

### Hai lỗi có từ trước, phát hiện nhờ đợt này

1. **Mọi trang khai canonical về trang chủ.** `alternates: { canonical: "/" }` trong metadata
   gốc khiến 13 trang không tự khai metadata đều nói với Google rằng chúng là bản sao của
   trang chủ. Có trên `main`, tức bản chạy thật cũng dính. Đã gỡ — không canonical thì Google
   dùng chính URL của trang, luôn đúng hơn canonical sai.
2. **Trang `admin` nằm trong nhánh công khai**, mật khẩu ghi cứng phía client, và
   `secret=openstem-revalidate` lộ trong bundle client. Đợt này chỉ DỜI vị trí sang
   `app/(admin)/admin/` để `/en/admin` không còn tồn tại. **Phần xác thực vẫn chưa sửa —
   cần vé riêng: xác thực phía máy chủ, xoay `REVALIDATION_SECRET`, gỡ bí mật khỏi mã client.**

### Sáu cái bẫy, ghi để không vấp lại

1. **`pkill -f "next start"` KHÔNG giết được server** — tên tiến trình thật là `next-server`.
   Đo nhầm trên server cũ cho ra kết quả của mã cũ. Cách đúng:
   `pkill -f "next-server"; lsof -ti:3000 | xargs kill -9`, xác nhận cổng trống, `curl /`
   thấy 200 rồi mới đo.
2. **So HTML bằng `sed 's/<[^>]+>//g'` là sai** — không bóc được nội dung trong `<script>`,
   mà RSC payload chứa build id sinh ngẫu nhiên mỗi lần build. Dùng `perl -0777` bỏ hẳn
   `<script>`/`<style>` trước.
3. **React SSR render `hrefLang` chữ L hoa** (như `charSet`). `grep 'hreflang='` chữ thường
   ra rỗng dù thẻ đúng. Dùng `grep -i` hoặc đọc thẳng thẻ.
4. **Nghiệm thu tài nguyên phải là "tải được", không phải "thẻ tồn tại".** `og:image` từng
   có thẻ nhưng URL trả 404 text/html. Luôn gọi vào URL và kiểm mã trạng thái + content-type.
5. **Dời cây route thì phải rà mọi tệp quy ước của Next ở gốc `app/`** — `opengraph-image`,
   `icon`, `apple-icon`, `twitter-image`, `not-found`, `error` — không chỉ `layout.tsx` và
   `page.tsx`. Bỏ sót `opengraph-image.tsx` làm mất ảnh OG toàn site mà 135 test không bắt.
6. **`openGraph` của trang GHI ĐÈ của layout, không trộn.** Trang nào tự khai `openGraph`
   phải tự mang theo `images`. Xem `lib/seo/metadata.ts`.
7. **Xoá `.next/` sau khi dời route**, nếu không `.next/types/validator.ts` cũ còn trỏ đường
   dẫn cũ và đẻ ra hàng chục lỗi TypeScript giả.
8. **Kiểu `params` của Next 16 là `{ locale: string }`**, không thu hẹp về union. Phải
   `isLocale()` + `DEFAULT_LOCALE`. Và rule `react-hooks/set-state-in-effect` cấm
   `useEffect`+`setState` — dùng `useSyncExternalStore` (xem `language-suggestion.tsx`).

### Nợ mang sang kế hoạch 2

- **`lib/i18n/translated.ts` là cái van.** Dịch xong trang nào PHẢI thêm khoá vào đó, nếu
  không trang đã dịch vẫn vô hình với sitemap, hreflang và dải gợi ý. Nên có test hai chiều
  đối chiếu với sự tồn tại của tệp `en.ts`.
- **Dịch `footer.tsx` TRƯỚC, không phải sau** — nó hiện trên cả 8 trang; để cuối thì trang
  đã dịch đầu tiên vẫn trông như chưa dịch.
- **Rút `generateMetadata` thành hàm dùng chung TRƯỚC khi viết trang thứ hai**, và hàm đó
  phải gác `TRANSLATED_ROUTES` — chép mẫu Triết Lý sang trang chưa dịch sẽ khai hreflang cho
  bản dịch không tồn tại.
- **8 chỗ còn ghi cứng đường dẫn tiếng Việt**: `hero-section.tsx:33,47`, `cta-section.tsx:20`,
  `learning-journey.tsx:18`, `lang-maker/page.tsx:130,293`, `hanh-trinh/[slug]/page.tsx:46,179`.
- **`lib/content/glossary.ts` hiện là mã chết** — không nơi nào gọi, và đã trôi khỏi
  `triet-ly/en.ts` ("Play – Make – Share" vs "Play, Make, Share"). Phải chốt dùng hay bỏ
  trước khi viết trang dịch tiếp theo.
- **Không test nào kiểm `ROUTES[*].vi` có thư mục thật.** Đổi tên thư mục → test xanh,
  production 404. Nên thêm một test `readdirSync`.
- **`SITE.url` rơi về `https://robot.edu.vn`** khi thiếu biến môi trường, nên trên preview
  của Vercel thì canonical, hreflang và sitemap đều trỏ về production.

---

## 23/09/2026 — Spike: nhiều root layout song song (Task 1, hạ tầng song ngữ)

Spike **ĐẠT**: Next 16.1.6 (Turbopack) cho phép hai root layout riêng ở hai route
group cùng cấp `app/` (không có `app/layout.tsx` chung) — `npm run build` qua,
`curl` xác nhận `probe-a` trả `<html lang="vi"` và `probe-b` trả `<html lang="en"`.
Mã thử đã xoá sạch, xem chi tiết `.superpowers/sdd/2026-09-23-song-ngu-ha-tang/task-1-report.md`.

---

## 20/09/2026 — Đưa bản Làng Maker lên domain chính thức

`robot.edu.vn` trước đó trỏ vào project `v0-robot-edu`, nên mọi lần deploy repo
này đều không đổi được nội dung khách nhìn thấy. Đợt này chuyển domain sang
đúng project `robot-edu-vn`.

**Đã làm**

1. Gỡ `robot.edu.vn` và `www.robot.edu.vn` khỏi project `v0-robot-edu`.
2. Gắn cả hai vào `robot-edu-vn` (`npx vercel domains add`).
3. Đặt `www` → **308 Permanent Redirect** → apex.

**Vì sao đảo chiều chuyển hướng.** Cấu hình cũ là apex → 307 tạm thời → www, và
www mới là bản phục vụ. Nay đảo lại: apex phục vụ, www trỏ về apex. Lý do là code
khai canonical ở apex (`lib/site.ts:4`, `app/sitemap.ts`, `app/robots.ts`); để
nguyên chiều cũ thì sitemap và thẻ OG trỏ một đằng, máy chủ phục vụ một nẻo.

**Nghiệm thu trên bản live**

| Kiểm tra | Kết quả |
|---|---|
| `http://robot.edu.vn` | 308 → `https://robot.edu.vn/` |
| `https://www.robot.edu.vn` | 308 → `https://robot.edu.vn/` |
| `/gioi-thieu` | 308 → `/lang-maker` |
| 16 route thật | 200 toàn bộ |
| Bốn người dẫn + hai hub trên `/lang-maker` | hiển thị đủ |
| Chuỗi "Where Math is a Playground" | 0 lần |

**Cách khôi phục nếu cần lùi.** Gắn lại `robot.edu.vn` + `www.robot.edu.vn` vào
project `v0-robot-edu`, đặt apex → 307 → www, www nối Production.

**Bẫy cho lần sau.** CLI **không** chuyển được domain giữa hai project:
`vercel domains add <d> <project> --force` luôn trả `alias_conflict` vì API không
trả project id. Bắt buộc vào dashboard project **cũ** → Settings → Domains →
Edit → **Remove** (gỡ khỏi project, khác với xoá khỏi tài khoản), rồi mới
`npx vercel domains add <d>` từ thư mục đã link project mới.

---

## 19/09/2026 — Mục "Người dẫn ở làng" (PR #1, merge `214d77d`)

Bốn vai Già Làng · Bô Lão · Nghệ nhân · Thợ cả, với người thật: Lê Ngọc Tuấn,
Đàm Phi Hùng, Trịnh Trần Viết Hưng, Phạm Việt. Mỗi người dẫn nối tới Maker Hub
bằng khoá `hubId`, có test chặn khoá trỏ vào hub không tồn tại.

Nghiệm thu: vitest 36/36 · `tsc --noEmit` sạch · `eslint` sạch · `next build`
xanh — chạy lại trên kết quả **sau khi gộp**, không phải trên nhánh.

---

## 07/09/2026 — Làng Maker thành tên chính, trang `/lang-maker`

Trang kể chuyện làng thay `/gioi-thieu` (redirect 308 giữ link cũ). Mười lăm mốc
mười năm, mỗi mốc bắt buộc có trường `nguon` — có test chặn mốc thiếu căn cứ.
Chân trang giữ pháp nhân `© 2026 OpenSTEM Foundation`, dẫn sang Dế STEM Foundation.

---

## 06/09/2026 — Vòng lặp ba nhịp Chơi → Làm → Chia sẻ (merge `35c114e`)

Bỏ thang 5 giai đoạn thiên công cụ phần mềm, chuyển sang vòng lặp ba nhịp theo
canon `~/Ai-Code/thingedu-canon`. Bốn URL giai đoạn cũ redirect 308 sang nhịp
tương ứng; `lib/content/nhip-slug.ts` giữ bản đồ slug cũ **vĩnh viễn** để dữ liệu
Firestore/Sheet cũ không vỡ. Thêm vitest.

Cùng đợt: thay 6 video rickroll bằng 15 video thật từ kênh MakerViet (lấy qua RSS
vì khoá API hỏng), 3 Maker Hub thật, bỏ số liệu "hơn 50 CLB" không có căn cứ.

---

## Việc còn treo

| Việc | Mức độ | Ghi chú |
|---|---|---|
| Mật khẩu admin nằm trong client component | **Cao** | `app/(public)/admin/page.tsx:34` chứa mật khẩu, dòng 57 chứa secret revalidate — cả hai gửi xuống trình duyệt mọi khách. `.env.example` đã khai sẵn `ADMIN_PASSWORD` + `REVALIDATION_SECRET` mà code không dùng. Nay site đã ở domain thật nên mức rủi ro khác trước. |
| `docs/SETUP_GUIDE.md` in mật khẩu thật | **Cao** | Dòng ~122 ghi thẳng giá trị `ADMIN_PASSWORD`. Đổi mật khẩu thì phải đổi cả ở đây, `scripts/seed-admin.ts:30` và trang admin. |
| Ba khoá Google hỏng | Trung bình | Một khoá dùng chung cho Sheets + YouTube + Gemini, đều `API_KEY_INVALID` → chat "Neo Trẻ" lỗi 500, Sheets CMS không đọc được (rơi về `lib/content/`, không vỡ trang). |
| Vercel chưa có biến môi trường | Trung bình | Kể cả Firebase. Code xử lý êm: `/dang-nhap` hiện hướng dẫn cấu hình thay vì lỗi trắng. |
| `SETUP_GUIDE.md` ghi sai gói Vercel | Thấp | Tài liệu ghi Pro $20/tháng; tài khoản thực tế đang ở **Hobby**. |
| Trường `danGi` của bốn người dẫn còn trống | Thấp | Thẻ nói ai ở hub nào, chưa nói họ dẫn gì ở đó. Chờ chủ dự án cung cấp. |
| Thang vai trò lệch canon | Thấp | Web dùng Già Làng · Bô Lão · Nghệ nhân · Thợ cả; canon (`GLOSSARY` mục 2) dùng Già làng · Thợ cả · Thợ học việc · Dân làng. "Bô Lão" không có trong canon. Canon ghi rõ ánh xạ này là điểm treo **P-08**, chờ chốt. |
| Nguồn VTV và fablabs.io chưa thành link bấm được | Thấp | Hiện là chữ thuần trong phần "Căn cứ:". |
