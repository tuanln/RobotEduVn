# Thiết kế: đổi tên sang Làng Maker và dựng trang kể chuyện Làng Maker

> **Dự án:** RobotEduVn (robot.edu.vn)
> **Ngày:** 2026-09-06
> **Trạng thái:** Đã duyệt thiết kế — chờ lập kế hoạch thi công
> **Nối tiếp:** `2026-09-06-vong-lap-choi-lam-chia-se-design.md` (đã thi công xong)

---

## 1. Vì sao

Site đang mang **hai** tên tổ chức song song mà không phân vai: "OpenSTEM Foundation"
(hero, triết lý, giới thiệu, JSON-LD, prompt AI) và "Làng Maker" (tiêu đề trang hành
trình, các khối "Tại Làng Maker"). Người đọc không biết đâu là tên chính.

Chủ dự án chốt 2026-09-06: **Làng Maker là tên chính**. "OpenSTEM Foundation" chỉ còn ở
dòng bản quyền chân trang, và trở thành **link sang Dế STEM Foundation**.

Đồng thời site chưa có chỗ nào kể Làng Maker là gì, ai sống trong đó, và mười năm vừa
rồi đã xảy ra chuyện gì — trong khi đó là tài sản lớn nhất của dự án.

## 2. Ba việc

### 2.1 Đổi tên xuyên site

`OpenSTEM Foundation` → `Làng Maker` tại: hero eyebrow, phụ đề trang Triết Lý, tiêu đề
trang Cộng Đồng, prompt Gemini, `alternateName` trong JSON-LD, câu gợi ý chat widget,
`authors` trong metadata, và mô tả trang Dự Án.

**Ngoại lệ cố ý giữ nguyên:** dòng bản quyền chân trang `© 2026 OpenSTEM Foundation` —
đó là pháp nhân, không phải tên thương hiệu.

### 2.2 Chân trang liên kết sang Dế STEM Foundation

Dòng bản quyền thành link tới `https://de-stem-foundation.vercel.app`
(kiểm 2026-09-06: HTTP 200), mở tab mới, có `rel="noopener noreferrer"`.

### 2.3 Trang `/lang-maker` — gộp luôn `/gioi-thieu`

Trang mới **thay thế** `/gioi-thieu`; `/gioi-thieu` redirect **301** sang `/lang-maker`.
Lý do gộp: sau khi đổi tên, `/gioi-thieu` sẽ mang tiêu đề "Về Làng Maker" — hai trang
cùng nói về làng khiến người đọc phải đoán vào cái nào.

Nội dung `/gioi-thieu` hiện có (làng là gì · tầm nhìn · sứ mệnh) **chuyển nguyên sang**
trang mới, đổi chủ ngữ từ OpenSTEM Foundation sang Làng Maker.

## 3. Nội dung trang `/lang-maker`

Bốn khối, theo thứ tự.

### 3.1 Luận đề — "Dùng robot để tạo ra đứa trẻ"

Câu mở của cả trang. Ý: robot không phải đích đến, **đứa trẻ mới là thứ được làm ra**.
Mười năm làm robot, sản phẩm thật sự là một cộng đồng người biết làm.

Nối vào Papert: đồ vật được lập trình là **đối tác tư duy** của trẻ, không phải môn học
phải thuộc (canon `PHILOSOPHY.md` mục 1, "Đồng tư duy").

Kèm khẩu hiệu gốc của Maker Hanoi: **"Your contributions, we share"** — cái gốc của nhịp
Chia sẻ hôm nay.

### 3.2 Người trong làng — bốn bậc và một khách

Thang MakerCoach (canon `LANG_MAKER_PLAYBOOK.md` mục 90-93, `GLOSSARY.md` mục 48):

| Vai | Là ai |
|---|---|
| **Dân làng** | Người mới đến. Chơi trước đã, chưa cần biết gì. |
| **Thợ học việc** | Đang học nghề, làm cùng thợ cả, chưa được chứng nhận. |
| **Thợ cả** | Làm chủ một nghề, kèm được người khác. |
| **Già làng** | Dẫn làng, chứng nhận tay nghề. |

Cộng một vai đứng cạnh, không thuộc thang: **Nghệ nhân** — người có nghề riêng, ghé làng
truyền lại (canon `GLOSSARY.md` mục 38, `TRUYEN_THONG_PHONG_TAP_STEM.md`).

**Câu chốt bắt buộc của khối này:** đứa trẻ bước vào làng là **dân làng**, và con đường đi
lên là có thật — chính là nhịp Chia sẻ, khi em quay lại dẫn lớp sau.

Tinh thần nền: Samba School của Papert (`PHILOSOPHY.md` mục 6) — người mới học cạnh người
giỏi trong cùng một việc thật, không chia lớp theo tuổi.

### 3.3 Mười năm

Mở đầu bằng câu của người sáng lập, **có ngày tháng**, trích từ slide
`Maker Hanoi - Review VIA Project.pdf` (Google Drive, tệp ghi 12/2020, slide ghi "Tuan Le,
June 2017"):

> "Tôi muốn tạo ra nhiều lab như Maker Hanoi ở trường học, ở nông thôn, ở các tỉnh của
> Việt Nam. Mọi bạn trẻ đều cần được chạm vào công nghệ, được có ước mơ của riêng mình.
> Chúng tôi muốn mang STEM và Robot đến với tất cả mọi người."
> — Tuấn Lê, 6/2017

Ghi rõ đây là bản dịch từ nguyên văn tiếng Anh trong slide.

**Dòng thời gian.** Mỗi mốc BẮT BUỘC mang một trường `nguon` nói căn cứ ở đâu. Không mốc
nào được vào trang mà thiếu căn cứ.

| Năm | Mốc | Căn cứ |
|---|---|---|
| 5/2016 | Maker Hanoi ra đời — thành viên FabLab Global, phi lợi nhuận | Slide Review (Drive) + hồ sơ fablabs.io |
| 12/2016 | Vietnam IoT Weekend — toà FPT, Duy Tân, Cầu Giấy | Slide Review |
| 11/12/2016 | VTV đưa tin "Maker Hanoi — điểm đến của nhiều bạn trẻ yêu thích công nghệ" | vtv.vn (kiểm 200) |
| 6/2017 | Tuyên ngôn của người sáng lập | Slide Review |
| 1/2018 | Vietnam IoT Day — Lương Yên Coworking | Slide Review |
| 2018 | Bắt đầu hành trình FIRST Global Challenge | Hồ sơ Drive `FIRST ROBOTIC/FGC 2018` |
| 2018–2019 | Cuộc Đua Số — nguồn dữ liệu cho dòng xe tự hành | Slide Review |
| 2020 | Maker Bot 2020 · VIA (Vietnam Autonomous) mã nguồn mở · Vietnam STEAM Challenge | Slide Review + hồ sơ Drive |
| 2021 | Vietnam STEAM Challenge 2021 | Hồ sơ Drive |
| 5/2022 | Mobile Maker Tour — ExploraScience & Fschool Quy Nhơn | Video MakerViet |
| 6/2022 | Chung kết Vietnam Robotics Challenge 2022 | Video MakerViet |
| 10/2022 | FIRST Global Challenge — Geneva | Video MakerViet |
| 2023 | Khoá Arduino · Maker Tech-Tutor · CoBot · VRC 2023 | Video MakerViet + hồ sơ Drive |
| 2024–2025 | FGC 2024, 2025 · ThingBot & ThingEduBlock · Kit ThingBot 2025–2026 | Hồ sơ Drive + video MakerViet |
| 2026 | Ba Maker Hub mở cửa: 190 Xã Đàn · 29 Dương Khuê · FPT Shop Thanh Hoá | `lib/content/hubs.ts` |

**Mạch thứ hai trong cùng khối — dòng đồ nghề mười năm:**
MEO 1.0 → MEO 2.0 → K12 Maker → ABC Maker 1.0 → 1.5 → 2.0 → Maker Bot 2020 → VIA →
ThingBot & NEO One (nay). Nguồn: slide Review, trang "Project Maker".
Đây là bằng chứng vật chất cho luận đề 3.1.

### 3.4 Cửa vào

Dẫn sang `/cong-dong/maker-hub` (tìm hub gần nhất) và `/hanh-trinh/choi` (nhịp đầu tiên).

## 4. Thay đổi kỹ thuật

- Tạo `lib/content/lang-maker.ts` — export `NGUOI_TRONG_LANG: VaiLang[]` và
  `MUOI_NAM: MocThoiGian[]`. `MocThoiGian` BẮT BUỘC có trường `nguon: string`.
- Tạo `app/(public)/lang-maker/page.tsx`.
- Xoá `app/(public)/gioi-thieu/page.tsx`; thêm redirect 301 `/gioi-thieu` → `/lang-maker`
  vào `next.config.ts`.
- `app/sitemap.ts`: bỏ `/gioi-thieu`, thêm `/lang-maker`.
- `lib/content/nav.ts` + `components/layout/footer.tsx`: nhãn "Giới Thiệu" → "Làng Maker",
  href `/lang-maker`.
- `components/layout/footer.tsx`: dòng bản quyền thành link Dế STEM Foundation.
- Đổi tên tại 8 file nêu ở mục 2.1.
- Test `lib/content/lang-maker.test.ts`: mọi mốc có `nguon` không rỗng; thang bốn bậc đúng
  thứ tự Dân làng → Thợ học việc → Thợ cả → Già làng; không mốc nào ở tương lai.

## 5. Ranh giới — cố ý KHÔNG làm

- **Không dẫn `makerhanoi.org`** — kiểm 2026-09-06: tên miền không phân giải.
- Không bịa mốc. Mốc nào chỉ có bằng chứng là *thư mục Drive* thì diễn đạt dè dặt
  ("hồ sơ ... trong lưu trữ"), không khẳng định thành tích.
- Không đăng ảnh từ slide Drive lên web (chưa rõ quyền hình ảnh trẻ em).
- Không nêu tên riêng ai ngoài người sáng lập ở câu trích 6/2017.
- Không đổi dòng bản quyền pháp nhân ở chân trang.
- Không đụng dashboard.

## 6. Nghiệm thu

1. `npx tsc --noEmit`, `npx eslint .`, `npx vitest run`, `npx next build` — xanh.
2. `/gioi-thieu` trả **308** về `/lang-maker`; `/lang-maker` trả 200.
3. `/sitemap.xml` có `lang-maker`, không còn `gioi-thieu`.
4. Quét: `grep -rn "OpenSTEM Foundation" app components lib` chỉ còn đúng chân trang.
5. Chân trang có link `de-stem-foundation.vercel.app` kèm `rel="noopener noreferrer"`.
6. Trang `/lang-maker` hiện đủ: 5 vai, câu trích 6/2017, dòng thời gian có căn cứ từng
   mốc, dòng đồ nghề, hai nút cửa vào. Xem thật cả sáng lẫn tối, không lỗi console.
7. `curl` lại link VTV và fablabs.io trước khi commit — phải 200.
   ⚠️ **vtv.vn chặn user-agent mặc định của curl** (trả 503 lúc thì 200 lúc). Phải kiểm
   bằng UA trình duyệt, nếu không sẽ báo trượt oan:
   `curl -sIL -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" <url>`
   Đã xác minh 2026-09-06: với UA trình duyệt thì 200 ổn định 3/3 lần.
