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

## 28/10/2026 — Web mô phỏng ThingBot tại /mo-phong

- `robot.edu.vn/mo-phong` = app Vite riêng **ThingEdu/thingbot-sim** (AGPL-3.0, 10 bài, khối ThingBlock thật), project Vercel `thingbot-sim`. Repo này KHÔNG chứa mã của nó: `next.config.ts` chuyển tiếp ngầm (`rewrites.beforeFiles`) sang `https://thingbot-sim.vercel.app/mo-phong/…`, `lib/i18n/rewrite.ts` cho middleware bỏ qua `/mo-phong` (nếu không bị gắn `/vi` rồi 404).
- `?bai=N` mở thẳng bài N. Link đặt ở trang khóa ThingBlock (bảng 10 bài), Làm quen ThingBot (bài 1), R4U (bài 6, 9, 10). Link nên viết `/mo-phong?bai=N` không có `/` cuối — `/mo-phong/` bị Next 308 về `/mo-phong`.
- Cập nhật web mô phỏng: build + deploy ở repo thingbot-sim (phải build tại máy vì cần checkout ThingBlock nhánh `feat/sim-m0`), robot.edu.vn không cần deploy lại.
- Kiểm: `npm run check:khoa-hoc` (bắt cả link /mo-phong), và ở repo thingbot-sim `SIM_URL=https://robot.edu.vn/mo-phong npm run smoke`.
- Bài làm của học sinh lưu localStorage theo tên miền: bài làm trên thingbot-sim.vercel.app không chuyển sang robot.edu.vn.

## 22/10/2026 — ThingBlock: trang "Làm quen ThingBot" + "Sửa lỗi thường gặp" (62 trang, 16 tệp .tb)

**Việc:** rà lại khóa ThingBlock theo góc người mới cầm ThingBot. Thêm 2 trang:
- `lam-quen-thingbot`: bảng bộ phận ThingBotShield (ảnh đánh số 1–9 của khóa cũ)
  ↔ khối lệnh, nguồn pin 2×18650, chương trình kiểm tra `kiem-tra-thingbot.tb`
  (còi chào, LED 1 chờ SW, M1→M4 mỗi bánh 1 giây, servo S1 0/180/90, in Monitor)
  + phiếu ghi bánh nào ở cổng nào, bảng chiều bánh cho xe mecanum.
- `sua-loi`: kết nối/nạp, Live/Bluetooth, động cơ–servo–còi, cảm biến–OLED.
Link thêm từ index, lam-quen, cai-dat, bai-mau và khóa ThingBot cũ.

**Kiểm chứng:** tệp .tb mở được trong bản web ThingBlock, mã sinh ra biên dịch
được cho esp32c3 bằng arduino-cli của app; một agent rà đối chiếu mã nguồn
(blocks.ts/generator.ts), đã sửa 8 điểm (quyền Bluetooth macOS, Monitor dùng
USB CDC nên baud không quyết định, địa chỉ OLED ghi đúng nhãn `0x78 (0x3c)`…).
CHƯA chạy trên bo thật. Chân IO0/IO4 trên cổng 4 chân vẫn chờ xác nhận nhãn mạch.

**Lưu ý:** `samples.py` chỉ tất định ở `project.json`; zip mang dấu giờ nên chạy
lại thì 15 tệp cũ đổi byte — `git checkout` các tệp không đổi nội dung.

---

## 21/10/2026 — Khóa "Lập trình khối với ThingBlock" (12 trang + 15 bài mẫu .tb)

**Việc:** thêm khóa thứ 8 vào thư viện, `/khoa-hoc/thingedu/thingblock`: cài
đặt, làm quen giao diện (hai chế độ nạp / Live), 3 trang khối lệnh, 5 bài mẫu
K2/K3/K4/K6/R4U × V1–V3 (soạn từ lô thử 11/08 của The Lab, chỉnh theo
ThingBlock 0.4.0). Thư viện 48 → 60 trang. Trang ThingBlock ghi nguồn
"ThingEdu" qua frontmatter `nguon` (mặc định vẫn "Maker Việt").

**Bài mẫu kiểm chứng thế nào:**
- 15 tệp `.tb` sinh bằng `scripts/thingblock-bai-mau/samples.py` (tất định, chạy
  lại ra đúng từng byte). KHÔNG sửa tay tệp .tb.
- Mở từng tệp trong bản web ThingBlock dựng sạch từ upstream main (fce82d4),
  chụp ảnh khối thật; 11 bài chế độ nạp biên dịch được cho `esp32c3` bằng
  arduino-cli của app + thư viện của pack. 4 bài Live chỉ mở thử được (cần bo).
- Chưa chạy trên ThingBot thật.

**Lỗi ThingBlock 0.4.0 tìm thấy (chưa báo upstream):**
1. Pack **RGB LED Strip** không biên dịch cho ESP32 core 3.3.11 (Adafruit_NeoPixel
   vendored cũ: `RMT` undeclared) → bài đèn giao thông đổi sang module LED cắm
   cổng S (`set servo to pulse 4095/0`).
2. Biến kiểu float mất kiểu khi mở lại dự án: `Variable.toXML` (scratch-vm
   `engine/variable.ts`) không ghi `dataType` → sinh `int`.
3. Live: động cơ kẹp 0..100 (không lùi), mã chế độ chân gửi 0/1/2 trong khi
   firmware ESP32 dùng 0x01/0x03/0x05, siêu âm đảo chân trig/echo, Stop không
   tắt động cơ. Trang khóa học ghi rõ các giới hạn này.
4. Danh sách sinh mã kiểu JS; khối tự tạo có tham số không truyền tham số;
   `đặt lại đồng hồ bấm giờ` không làm gì khi nạp; nhãn vi "đống hồ".
5. Mọi khối phần cứng chỉ có tiếng Anh (scratch-vm `locales/vi.json` rỗng).

**Sửa kèm cho cả thư viện:** `<pre>` của shiki đè mất `overflow-x-auto`, link
dài không xuống dòng và hai chuỗi NBSP từ Moodle làm 12 trang cũ tràn ngang ở
390px → giờ 60/60 trang vừa màn điện thoại (đo bằng Chromium). Link tới tệp
`/hoc-lieu/...` render `<a download>` thay vì next/link.

**Rà soát độc lập:** không có lỗi nghiêm trọng; đã sửa 5 chỗ nội dung sai so với
mã (Encoder và ô chip SH1106 chỉ có SAU bản 0.4.0 → đánh dấu; khối buzzer không
phát tiếng; nhạc và servo không chạy cùng lúc; siêu âm không có vật trả ~340 cm
chứ không phải 0; giấy phép không phải toàn MIT — editor là AGPL-3.0) và bỏ ô
hiện biến "S" sót trong mẫu .tb.

**Còn mở:** chân header ThingBotShield ngoài IO0/IO4 chưa xác nhận (bài dùng
IO0, IO4); báo 5 lỗi trên cho đội ThingBlock; ảnh chụp lấy từ bản web (giao
diện giống app desktop nhưng không có ảnh hộp thoại cài đặt của hệ điều hành).

## 19/10/2026 — Thư viện khóa học /khoa-hoc (học liệu Maker Việt) + Next 16.3.8

**Việc:** ghép thư viện 7 khóa (48 trang) từ web makerviet (nội dung phục hồi
từ Moodle cũ) vào robot.edu.vn theo hướng A: fumadocs-core/mdx headless, giao
diện bằng component của site. Chỉ tiếng Việt — `/en/khoa-hoc` 404, KHÔNG vào
ROUTES/TRANSLATED_ROUTES. Merge `7ee4dc9`.

**Hạ tầng mới:**
- Vercel Blob `robot-edu-vn-hoc-lieu` (`store_LrywO2cvC6IZ8mOx`, sin1, công khai):
  19 tệp PDF/Word 54 MB dưới `khoa-hoc/…`, link tuyệt đối trong Markdown,
  danh sách ở `lib/khoa-hoc/tep-blob.ts`. Ảnh 6,2 MB ở `public/hoc-lieu/media`.
- Biến `BLOB_READ_WRITE_TOKEN` trên Vercel (cả 3 môi trường) do `vercel blob
  create-store` tự thêm.
- Next 16.1.6 → 16.3.8: bản cũ dính advisory critical (middleware bypass,
  request smuggling, CSRF Server Actions…), và Turbopack 16.1 không đọc được
  luật `condition.query` của fumadocs-mdx 15.4.

**Nghiệm thu trên https://robot.edu.vn:**
- `npm run check:khoa-hoc -- https://robot.edu.vn` → OK: 48 trang 200, 4.565
  link nội bộ + neo, 19 tệp Blob 200, ảnh có src, không lộ `**`, `/en/khoa-hoc…`
  404, tìm có dấu ra kết quả, API tìm trúng cache CDN (`x-vercel-cache: HIT`).
- `npm run check:en -- https://robot.edu.vn` → không rò chữ Việt.
- Sitemap 76 URL (28 + 48). Chrome: không lỗi console, mục đang đọc tô đúng.
- 293 test, tsc, eslint sạch.

**Bẫy:**
1. `vercel blob create-store` GHI ĐÈ `.env.local` bằng biến kéo từ Vercel —
   mất hết biến chỉ có ở máy. Sao lưu `.env.local` trước khi chạy.
2. Next 16.3.8: `generateStaticParams` trả `[]` cho MỘT giá trị locale cha là
   mất MỌI đường dẫn của route (cả 48 trang vi) → slug canh gác cho en.
3. remark-image biến ảnh `public/` thành import tĩnh: `src` tới component là
   object `{src,width,height}`; ảnh ngoài thì bị TẢI lúc build (host sập là
   deploy hỏng) — test chặn ảnh ngoài.
4. GET tìm kiếm của fumadocs là route động; `revalidate = false` vô tác dụng.
   Trên Vercel `s-maxage` bị CDN tiêu thụ, client chỉ thấy `max-age`.
5. `next dev` 16.3 tự sinh `AGENTS.md`/`CLAUDE.md` ở gốc repo — xoá, đừng commit.
6. Nguồn Moodle viết chữ đậm sai (`**…: **`, `\**`, `**` dính ảnh, NBSP) —
   đã sửa trong nội dung; cổng bắt `**` lộ ra.

**Còn treo:**
- makerviet.vercel.app chưa chuyển hướng về robot.edu.vn/khoa-hoc (chủ dự án
  quyết số phận /lang, /truong-lang, /chia-se bên đó).
- Nợ nhỏ từ đợt rà: link trong `<summary>` (nested-interactive), nhận trang
  tổng quan theo tên, tên gốc "Docs" ghi cứng, twitter/description trang khóa
  học, lastModified sitemap, `includeProcessedMarkdown` thừa, cây mục lục
  serialize 2 lần, Sheet menu header thiếu Description (có từ trước).

---

## 06/10/2026 — Song ngữ kế hoạch 2/3: 8 trang còn lại + khung trang

Nhánh `feat/song-ngu-tam-trang`. Chủ dự án chụp `/en` thấy còn nhiều chữ tiếng Việt —
đúng: kế hoạch 1 chỉ dịch Triết Lý. Đợt này dịch nốt khung trang (footer, skip link, chat,
nhãn nhịp, metadata gốc) và 8 trang, mọi route vào `TRANSLATED_ROUTES`. 258 test.

**Cổng nghiệm thu mới: `npm run check:en`** — đọc HTML thật của 15 trang `/en` (server
phải đang chạy), bỏ phần tử `lang="vi"`, liệt kê từ có dấu ngoài `lib/i18n/en-allowlist.mjs`.
Chạy trên bản `main` đang live: **2.082 chỗ rò + `/en/videos/<id>` 404**. Trên nhánh: **0**.

**Quy ước mới:** dữ liệu gốc tiếng Việt (tên hub, địa chỉ, tỉnh, tên người, `nguon`, tiêu đề
video YouTube, bài viết CMS) hiện trên trang `/en` PHẢI bọc `lang="vi"` — vừa đúng cho trình
đọc màn hình, vừa là cách script biết đó không phải chỗ dịch sót. Danh sách cho phép chỉ
chứa tên riêng và thuật ngữ làng; KHÔNG thêm từ thường.

**Đã sửa kèm:**
- `/en/videos/<id>` trước 404 (middleware từ chối mọi route động) — giờ 200, có metadata
  riêng, hreflang vi↔en. `shouldNoindex` tách sang `lib/i18n/noindex.ts`.
- Mọi link nội bộ qua `pathFor()`/`videoPath()`; test `noi-bo-khong-ghi-cung.test.ts` chặn
  `href="/cong-cu"` ghi cứng (đã phá thử, đỏ). Test `route-dirs.test.ts` chặn đổi tên thư
  mục route mà quên bảng `ROUTES` (nợ kế hoạch 1).
- `glossary.ts` chốt DÙNG: thêm Bô Lão, sửa "Play, Make, Share" khớp Triết Lý.
- Trích dẫn 2017 bản tiếng Anh là NGUYÊN VĂN, tìm được trong slide gốc
  `My Drive/IoT Lab/VIA Project/Maker Hanoi - Review.pptx`.
- 15 trang tiếng Việt giống hệt từng chữ so với trước (so HTML thật), trừ `<title>` trang
  một video: trước là tên site, nay là tên video.

**Bẫy mới:**
1. **Cổng 3001 trên máy này là đường hầm ssh của dịch vụ khác** (trả 302 → /login). Chạy
   bản thứ hai thì dùng cổng khác, và luôn `lsof -iTCP:<cổng> -sTCP:LISTEN` trước.
2. **Turbopack không build được worktree có `node_modules` symlink** ("points out of the
   filesystem root"). Muốn build `main` để so thì `git checkout main` ngay tại repo.
3. **vitest bỏ qua kiểu** — xoá `types.ts` không làm test đỏ. Muốn chứng minh test nội dung
   bắt lỗi thì xoá một khoá trong `en.ts`, đừng xoá kiểu.
4. **Trang chủ tự khai title có tên site** phải dùng `{ absolute }`, không thì template
   `%s | Robot.Edu.VN` nhân đôi tên.
5. **Danh sách `/en/videos` dựng phía client** (Suspense + `useSearchParams`), HTML server chỉ
   có "Loading videos…" — script không thấy thẻ video ở trang danh sách; thẻ được quét qua
   trang một video.

**Sau hai đợt rà độc lập (code + ngôn ngữ), đã sửa thêm:**
- **Nút chuyển ngôn ngữ sai trong HTML server ở MỌI trang tĩnh** (có từ kế hoạch 1):
  prerender chạy ở đường dẫn nội bộ nên `usePathname()` thấy `/en/cong-cu`, render
  `<button disabled>`; client thấy `/en/tools`, render `<a>` → lỗi hydrate, React dựng
  lại cả cây ở mỗi lần tải trang. Sửa bằng `publicPath()` trong `routes.ts`.
- **Script quét mù thuộc tính**: `alt` tiếng Việt của ảnh video lọt mà không bị bắt. Lõi quét
  tách ra `lib/i18n/leak-scan.mjs` (có test), quét thêm alt/title/aria-label/placeholder/
  meta content — lộ ra cả `keywords` tiếng Việt trên mọi trang `/en`, đã dịch.
- **Script cho xanh giả với thẻ rỗng**: `<img lang="vi">` không có thẻ đóng nên bị cắt tới
  cuối trang. Nay thẻ rỗng chỉ bỏ đúng thẻ đó, thiếu thẻ đóng thì ném lỗi.
- 27 chỗ tiếng Anh: tiêu đề "Using robots to make children" (đọc thành *sinh con*), nhãn
  ngày dạng d/m (người Mỹ đọc 3/12 là 12 tháng 3 — có test chặn), "guide" thống nhất cho
  người dẫn, câu Bác Hồ "use" chứ không "bring", sentence case cho H2 và nút.
- Trang tiếng Việt nay có canonical/hreflang/OG riêng từng trang (trước dùng mặc định gốc).

**Chờ chủ dự án chốt (cả hai bản ngữ):**
1. "Bốn vai. **Ba** trong số đó cũng là bậc trong thang" — thật ra chỉ Già Làng và Thợ cả là
   bậc (Nghệ nhân đứng cạnh thang, Bô Lão ngoài thang). Sửa thành "Hai"?
2. VSC, FARC, GreenBot ở trang Công Cụ — tên đầy đủ là gì để chú giải bản tiếng Anh?
3. "Già làng" / "Già Làng", "Maker Việt" / "MakerViet", "NEO Tre" / "Neo Trẻ" — chọn một cách viết.

**Nợ còn lại:**
- Ảnh OG bản tiếng Anh (spec 2.7). Khối "Bản tiếng Việt đang được cộng đồng dịch" chờ chốt.
- Kế hoạch 3 (69 ảnh + 5 sơ đồ).

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
