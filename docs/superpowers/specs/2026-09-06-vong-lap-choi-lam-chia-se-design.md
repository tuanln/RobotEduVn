# Thiết kế: chuyển robot.edu.vn sang vòng lặp Chơi → Làm → Chia sẻ

> **Dự án:** RobotEduVn (robot.edu.vn)
> **Ngày:** 2026-09-06
> **Trạng thái:** Đã duyệt thiết kế — chờ lập kế hoạch thi công
> **Nguồn triết lý:** `~/Ai-Code/thingedu-canon` — `00-CANON/PHILOSOPHY.md`,
> `00-CANON/GLOSSARY.md`, `20-PROGRAM/LANG_MAKER_PLAYBOOK.md`

---

## 1. Vì sao đổi

Site đang tổ chức nội dung theo **thang 5 bậc công cụ phần mềm**: Khám Phá
(GCompris) → Tư Duy (KTurtle) → Lập Trình (Python) → IoT & Robot (Arduino) →
Chia Sẻ (GitHub). Ba vấn đề:

1. **Trái canon.** `PHILOSOPHY.md` mục 2 định nghĩa nhịp học là **vòng lặp ba
   nhịp Chơi → Make → Share**, lặp lại ở cả tầng một chương trình lẫn tầng hành
   trình 10 năm. Thang một chiều 5 bậc không phải mô hình của hệ sinh thái.
2. **Thiên tech.** Bốn trong năm bậc được đặt tên bằng kỹ năng máy tính, và mọi
   hoạt động mô tả đều diễn ra trên màn hình — ngược với `PHILOSOPHY.md` mục 9
   *physical-first*: "tách trẻ khỏi màn hình, mọi tương tác số bắt nguồn từ hành
   động vật lý".
3. **Không nói về chương trình thật.** Site không hề nhắc Bảo tàng Tò mò, HoS,
   nguyên tắc 7+1 hay buổi Make & Share — tức là phụ huynh đọc xong không biết
   phải làm gì tiếp theo.

**Quyết định của chủ dự án (2026-09-06):** gộp Tư Duy + Lập Trình + IoT & Robot
vào nhịp **Làm**; mô tả đúng chương trình thật của Làng Maker; **không đăng học
phí** trên site.

## 2. Mô hình mới

### 2.1 Ba nhịp, là vòng lặp chứ không phải thang

```
        ┌──────────────── vòng sau khó hơn ─────────────────┐
        │                                                   │
        ▼                                                   │
   🎪 CHƠI  ─────────►  🔨 LÀM  ─────────►  🎤 CHIA SẺ ──────┘
   Bảo tàng Tò mò      7 buổi dự án        Buổi thứ 8
   HoS miễn phí        cùng Coach Maker    Make & Share
```

Điểm bắt buộc phải thể hiện trên giao diện: **mũi tên quay lại**. Chia sẻ xong
không phải là tốt nghiệp — là quay lại Chơi ở vòng sau. Đây là khác biệt lớn
nhất so với bản 5 bậc.

### 2.2 Ánh xạ từ 5 giai đoạn cũ

| Giai đoạn cũ | Nhịp mới | Xử lý nội dung |
|---|---|---|
| `kham-pha` Khám Phá | `choi` **Chơi** | Viết lại quanh Bảo tàng Tò mò + HoS; GCompris rút xuống trang Công Cụ |
| `tu-duy` Tư Duy | `lam` **Làm** | Thành *hướng làm* "Điều khiển & tư duy máy tính" |
| `lap-trinh` Lập Trình | `lam` **Làm** | Thành *hướng làm* "Lập trình" |
| `iot-robot` IoT & Robot | `lam` **Làm** | Thành *hướng làm* "Robot, mạch điện & IoT" |
| `chia-se` Chia Sẻ | `chia-se` **Chia sẻ** | Giữ, bổ sung buổi thứ 8 Make & Share |

Ba *hướng làm* bên trong Làm là **song song, không xếp hạng** — trẻ 8 tuổi có
thể vào hướng robot, trẻ 14 tuổi có thể bắt đầu ở hướng điều khiển. Đây là tinh
thần Samba School (`PHILOSOPHY.md` mục 6): không phân lớp tách biệt theo trình độ.

## 3. Nội dung từng nhịp

Nguyên tắc viết chung, áp cho cả ba: **mở đầu bằng việc đứa trẻ làm, tên phần
mềm/thiết bị xuống cuối như chú thích.** Không câu nào mở đầu bằng tên sản phẩm.

### 3.1 Chơi

- **Là gì:** Bảo tàng Tò mò — hệ trạm trò chơi chạy liên tục tại Làng Maker.
  Mục đích là khơi tò mò, **không dạy gì cả**.
- **5 nhóm trò** (`GLOSSARY.md` mục 51): NEO Art Zone · NEO Arcade ·
  NEO AI Sport · NEO Sport · NEO Paper Play.
- **Cửa vào:** **HoS — Hour of STEAM** (`GLOSSARY.md` mục 42): buổi trải nghiệm
  **miễn phí 60–90 phút** cho người mới, cuối tuần tại 3 Maker Hub.
- **Nhân vật dẫn:** Faddy Dế / NEO Tre.
- Kết nhịp: tò mò → muốn tự làm → sang nhịp Làm.

### 3.2 Làm

- **Là gì:** **7 buổi dự án** tại Làng Maker cùng Coach Maker (nguyên tắc 7+1,
  `GLOSSARY.md` mục 40). Mỗi dự án là một microworld đủ nhỏ để trẻ làm chủ hoàn
  toàn, đủ thật để chạy trên thiết bị thật.
- **Ba hướng làm song song:**
  1. *Điều khiển & tư duy máy tính* — ra lệnh cho máy làm đúng ý mình (đồ nghề: KTurtle, ThingEduBlock)
  2. *Lập trình* — tự viết chương trình giải bài toán của mình (đồ nghề: Python)
  3. *Robot, mạch điện & IoT* — làm cho vật thật cử động và cảm nhận (đồ nghề: ThingBot, Arduino, NEO One)
- **Ba nguyên tắc dẫn buổi học**, mỗi cái một câu ngắn:
  - *Chạm trước, ký hiệu sau* — thao tác với vật thật trước, code/công thức đến sau (`PHILOSOPHY.md` mục 1, 9)
  - *Khó mà vui* (Hard Fun, mục 3) — dự án đủ thách thức nhưng do trẻ tự chọn
  - *Lỗi là thông tin* (Errors as Feedback, mục 4) — robot đi lệch không phải thua; Coach không sửa hộ mà hỏi ngược
- Kết nhịp: có sản phẩm chạy được → sang nhịp Chia sẻ.

### 3.3 Chia sẻ

- **Là gì:** **Buổi thứ 8 — Make & Share.** Trẻ **tự tổ chức** trình bày sản
  phẩm trước phụ huynh.
- **Văn hoá:** Gracious Professionalism (`PHILOSOPHY.md` mục 7) — trình bày để
  được góp ý và giúp nhau, không phải để hơn thua.
- **Đi xa hơn:** thi VRC / FIRST Global; quay lại làm mentor cho lớp sau
  (Thợ học việc → Thợ cả trong phân cấp Coach Maker).
- Kết nhịp: **quay lại Chơi** ở vòng sau, chủ đề khó hơn.

## 4. Thay đổi kỹ thuật

### 4.1 Kiểu dữ liệu và nội dung

- `lib/types.ts`: `LearningStage` từ 5 giá trị → `"choi" | "lam" | "chia-se"`.
- `lib/content/stages.ts` → **`lib/content/nhip.ts`**, export `NHIP: NhipInfo[]`.
  `NhipInfo` giữ các trường hiện có (slug, tiêu đề, màu, mô tả dài, huy hiệu) và
  thêm:
  - `taiLangMaker: string` — nhịp này diễn ra thế nào tại Làng Maker
  - `huong?: { title, doing, tools }[]` — chỉ nhịp Làm dùng, cho 3 hướng làm
  - `nguyenTac?: { title, desc }[]` — chỉ nhịp Làm dùng, cho 3 nguyên tắc
- Bỏ trường `ageRange` khỏi `NhipInfo`: tuổi không còn là trục phân loại. Thông
  tin "từ 4 đến 18 tuổi" chuyển thành một câu ở trang Hành Trình. Lưu ý
  `VideoItem.ageRange` **giữ nguyên** — đó là gợi ý độ tuổi của từng video, khác việc.

### 4.2 URL và redirect

| URL | Xử lý |
|---|---|
| `/hanh-trinh` | Trang vòng lặp 3 nhịp (viết lại) |
| `/hanh-trinh/choi`, `/hanh-trinh/lam` | Trang mới |
| `/hanh-trinh/chia-se` | Giữ nguyên đường dẫn, viết lại nội dung |
| `/hanh-trinh/kham-pha` | **301 →** `/hanh-trinh/choi` |
| `/hanh-trinh/tu-duy`, `/lap-trinh`, `/iot-robot` | **301 →** `/hanh-trinh/lam` |

Redirect khai trong `next.config.ts` (`redirects()`, `permanent: true`).
`app/sitemap.ts` tự cập nhật vì sinh từ `NHIP`.

### 4.3 Gắn lại thẻ 15 video

- → **Làm** (7): 4 video ThingBot, 2 bài Arduino, 1 ThingEduBlock
- → **Chia sẻ** (8): Maker Tech-Tutor, VRC ×2, FIRST Global ×3, Mobile Maker ×2
- → **Chơi**: **0 video.** Chấp nhận có chủ đích — trang Chơi mô tả 5 trạm chơi,
  không dựa vào video. Bộ lọc Video Hub còn 3 chip; chip Chơi vẫn hiện và cho
  trạng thái rỗng tử tế.

### 4.4 Các nơi khác phải sửa theo

- `components/common/stage-badge.tsx` — 5 khoá → 3 khoá, giữ biến thể dark.
- `components/video/video-filter.tsx`, `video-hub-content.tsx` — sinh chip từ `NHIP`.
- `components/home/learning-journey.tsx` — vẽ vòng lặp có mũi tên quay lại, bỏ đánh số 1-5.
- `components/home/hero-section.tsx` — bỏ tiêu đề "Khám Phá STEM & Robotics"
  (2 từ tiếng Anh to nhất trang), thay bằng thông điệp ba nhịp; hàng chip 5 → 3.
- `app/(public)/cong-cu/page.tsx` — đổi khung thành "đồ nghề trong xưởng", thêm
  câu *công cụ là phương tiện, không phải cấp bậc*; gắn lại thẻ nhịp cho từng công cụ.
- `app/(public)/triet-ly/page.tsx` — bổ sung vòng lặp ba nhịp, Hard Fun, Errors
  as Feedback, Microworld, Samba School, physical-first (hiện chỉ có 3 trụ cột).
- `lib/gemini.ts` — prompt dựng theo 3 nhịp + 7+1 + HoS.
- `lib/types/student.ts` và 2 trang dashboard — `currentStage` theo 3 nhịp, kèm
  `normalizeStage()` đọc được giá trị 5-bậc cũ để dữ liệu Firestore cũ không vỡ.
- `app/layout.tsx` — từ khoá SEO bỏ tên phần mềm, thêm "Làng Maker", "Chơi Làm Chia sẻ".
- `app/(public)/page.tsx` — ô số liệu thứ tư đang là "5 Giai đoạn" (đếm `STAGES`)
  thành "3 Nhịp" (đếm `NHIP`), ghi chú đổi từ "từ 4 đến 18 tuổi" thành "lặp lại,
  vòng sau khó hơn".
- `app/opengraph-image.tsx` — hàng "Khám Phá → Tư Duy → Lập Trình → IoT & Robot
  → Chia Sẻ" ở đáy ảnh OG thành "Chơi → Làm → Chia sẻ".

## 5. Ranh giới — cố ý KHÔNG làm

- **Không đăng học phí** (chủ dự án chốt 2026-09-06). Site chỉ nói buổi trải
  nghiệm HoS miễn phí; muốn học tiếp thì liên hệ Maker Hub.
- Không đăng lịch giờ cụ thể của từng hub — chỉ ghi "cuối tuần", vì `hubs.ts`
  chưa có lịch thật của cả ba hub.
- Không thêm ảnh 5 trạm Bảo tàng Tò mò (chưa có ảnh thật) — dùng thẻ chữ + emoji.
- Không đụng vào dashboard ngoài phần `currentStage`.
- Không đổi tên "Maker Hub" (đã chốt ở lần sửa trước).

## 6. Nghiệm thu

1. `npx tsc --noEmit` sạch, `npx eslint .` sạch, `npx next build` xanh.
2. Bốn URL cũ trả **308/301** về đúng đích, không 404: `kham-pha`, `tu-duy`,
   `lap-trinh`, `iot-robot`.
3. `/sitemap.xml` liệt kê 3 nhịp mới, không còn slug cũ.
4. Xem thật trên trình duyệt cả giao diện sáng và tối: trang chủ, `/hanh-trinh`,
   3 trang nhịp, `/video-hub` (đủ 3 chip + trạng thái rỗng của Chơi), `/cong-cu`,
   `/triet-ly`. Không lỗi console.
5. Đọc soát: không trang nào của 3 nhịp mở đầu bằng tên phần mềm; không chỗ nào
   còn hiện học phí.
