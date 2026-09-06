# Robot.Edu.VN

Nền tảng giáo dục STEM & Robot mở cho trẻ em Việt Nam, xây theo triết lý Kiến tạo
(Constructionism) của Seymour Papert: **học bằng làm**.

Khởi xướng bởi MakerViet · ThingEdu · Rogo — dưới tên OpenSTEM Foundation.
Mục tiêu 5 năm (2026–2030): 1.000.000 trẻ em Việt Nam tiếp cận STEM & Robot.

- Sản phẩm: <https://robot.edu.vn>
- Liên hệ: lang@makerviet.org

## Nội dung nền tảng

**Vòng lặp ba nhịp Chơi → Làm → Chia sẻ** — từ 4 đến 18 tuổi, không phải thang
bậc phải leo:

| Nhịp | Việc trẻ làm |
|---|---|
| Chơi | Chạm, thử ở các trạm trò chơi (Bảo tàng Tò mò) cho đến khi bật ra một câu hỏi |
| Làm | Bảy buổi cùng người dẫn, theo một trong ba hướng song song (Điều khiển & tư duy máy tính, Lập trình, Robot & IoT) — không xếp hạng |
| Chia sẻ | Tự đứng lên kể lại hành trình làm, rồi quay ngược về nhịp Chơi cho vòng sau với câu hỏi khó hơn |

**Các khu vực chính:** Video Hub (video bài học từ kênh MakerViet), Mạng lưới
Maker Hub (Làng Maker), Tạp chí & Dự án cộng đồng, Trang cho mentor, Triết lý
Papert, và trợ lý AI "Neo Trẻ" (Gemini).

**Dashboard quản lý học sinh** (`/dashboard`) — hồ sơ, điểm danh, tiến trình;
đăng nhập bằng Firebase Auth. Xem `docs/specs/` cho thiết kế Phase 2 (RFID trên
NEO One).

## Công nghệ

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui ·
Firebase (Auth + Firestore) · Google Sheets làm CMS nhẹ · Gemini API · Vercel.

## Chạy tại máy

```bash
npm install
cp .env.example .env.local   # điền các khoá cần dùng
npm run dev                  # http://localhost:3000
```

Trang public chạy được **không cần** khoá nào — dữ liệu lấy từ `lib/content/`.
Thiếu khoá thì tính năng tương ứng tự tắt một cách êm:

| Biến môi trường | Thiếu thì sao |
|---|---|
| `GOOGLE_SHEETS_API_KEY`, `GOOGLE_SHEETS_ID` | Dùng nội dung tĩnh trong `lib/content/` |
| `GEMINI_API_KEY` | Chat widget báo chưa cấu hình |
| `NEXT_PUBLIC_FIREBASE_*`, `FIREBASE_ADMIN_*` | `/dang-nhap` và `/dashboard` báo chưa cấu hình |
| `ADMIN_PASSWORD` | Trang `/admin` không đăng nhập được |

## Nội dung được quản ở đâu

Nguồn sự thật là `lib/content/`, và Google Sheet (nếu cấu hình) sẽ **ghi đè** lúc chạy:

```
lib/content/nhip.ts       Ba nhịp Chơi/Làm/Chia sẻ (nội dung biên tập, ít đổi)
lib/content/nhip-slug.ts  Slug ba nhịp + bản đồ 5 slug cũ → nhịp mới
lib/content/videos.ts     Video thật từ kênh YouTube MakerViet
lib/content/hubs.ts       Maker Hub đang hoạt động
lib/content/articles.ts   Bài tạp chí / dự án (đang rỗng)
lib/content/nav.ts        Menu điều hướng
```

**Quy tắc nội dung: không có dữ liệu mẫu trên bản chạy thật.** Chỗ nào chưa có
nội dung thì hiện trạng thái rỗng tử tế, không điền video hay địa chỉ bịa. Các
con số trên trang chủ được tính từ chính dữ liệu này nên không bao giờ lệch.

Cột của Google Sheet xem trong `lib/sheets.ts` (3 sheet: `Videos`, `Articles`,
`Hubs`). Sau khi sửa Sheet, gọi `/api/revalidate` với `REVALIDATION_SECRET` để
làm mới cache (ISR 1 giờ).

## Lệnh

```bash
npm run dev      # chạy dev
npm run build    # build production
npm run lint     # eslint
npx tsc --noEmit # kiểm tra kiểu
npx tsx scripts/seed-admin.ts   # tạo tài khoản admin đầu tiên (cần Firebase)
```

## Tài liệu

- `docs/SETUP_GUIDE.md` — dựng Firebase, Vercel, biến môi trường
- `docs/specs/` — thiết kế Phase 2 (hồ sơ học sinh, RFID, theo dõi tiến trình)
