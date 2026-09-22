# Thiết kế: site song ngữ Việt–Anh và đưa hình ảnh lên 9 trang

> **Dự án:** RobotEduVn (robot.edu.vn)
> **Ngày:** 2026-09-23
> **Trạng thái:** Đã duyệt thiết kế — chờ lập kế hoạch thi công
> **Nối tiếp:** `2026-09-06-trang-lang-maker-design.md` (đã thi công xong)

---

## 1. Vì sao

Hai vấn đề độc lập, nhưng giải cùng lúc vì cả hai đều phải chạm vào nội dung của cả
chín trang — tách ra làm hai đợt thì phải sờ vào cùng những tệp đó hai lần.

**Một: site chỉ có tiếng Việt.** Dự án có quan hệ quốc tế thật (FIRST Global, đội tuyển
Việt Nam ở Geneva 2022), nhưng người nước ngoài mở `robot.edu.vn` thì không đọc được gì.

**Hai: toàn site không có một tấm ảnh nào.** Kiểm 2026-09-23: `public/` chỉ chứa 5 tệp
SVG mặc định của Next.js (`file`, `vercel`, `next`, `globe`, `window`), và không tệp
nguồn nào gọi `next/image` ngoài `components/common/cover-image.tsx` — mà component đó
hiện luôn rơi vào nhánh gradient vì chưa bài viết nào có ảnh. Mọi hình hiện tại là emoji,
icon Lucide và khối màu. Trang Làng Maker — trang mang mười năm lịch sử của dự án — là
trang nặng chữ nhất và cũng trắng ảnh nhất.

Chủ dự án chốt 2026-09-23: làm **song ngữ đầy đủ** (không phải gói giới thiệu rút gọn),
và có sẵn **kho ảnh mười năm** để lọc.

---

## 2. Phần A — Kiến trúc song ngữ

### 2.1 Quyết định: một cây trang, hai bộ chữ

Chọn phương án `[locale]` + mô-đun nội dung có kiểu. Hai phương án bị loại:

| Phương án | Vì sao loại |
|---|---|
| Hai cây route song song (`/en` riêng) | Nhân đôi chín vỏ trang. Sửa bản Việt mà quên bản Anh là việc chắc chắn xảy ra sau vài tháng; không có cơ chế nào chặn |
| Thư viện `next-intl` | Catalog ICU/JSON hợp với nhãn ngắn. Nội dung site này là văn xuôi dài nhiều đoạn, có trích dẫn và chú nguồn — nhét vào JSON thì khó đọc, khó sửa hơn TypeScript. Thêm một phụ thuộc mà không giải được việc khó nhất |

**Việc khó ở đây không phải định tuyến, mà là giữ hai bản chữ không trôi dạt khỏi nhau
theo thời gian.** Phương án được chọn là phương án duy nhất biến "dịch sót" thành lỗi
biên dịch.

### 2.2 Cây route

```
app/
  (site)/[locale]/          ← root layout riêng, <html lang={locale}>
    (public)/…              ← chín trang công khai
  (admin)/                  ← root layout riêng, <html lang="vi">
    dashboard/  dang-nhap/  ← KHÔNG dịch
```

Hai root layout là cách duy nhất để `<html lang>` đổi theo ngôn ngữ mà vẫn giữ khu quản
trị ngoài hệ đa ngữ. Next.js cho phép nhiều root layout khi tầng trên cùng chỉ gồm route
group và không có `app/layout.tsx`.

> **Đây là giả định kỹ thuật chưa kiểm chứng trên Next 16.1.6.** Nhiệm vụ đầu tiên của kế
> hoạch thi công là một spike dựng hai root layout rỗng và xác nhận cả hai cây cùng dựng
> được. Spike hỏng thì **dừng, báo chủ dự án**, không tự đổi hướng. Phương án lùi: giữ một
> root layout, đặt `lang` qua `generateMetadata` ở tầng `[locale]` và chấp nhận `<html lang>`
> tĩnh — kém hơn về SEO, nên chỉ dùng khi buộc phải.

### 2.3 Định tuyến và tiền tố

- Tiếng Việt **không có tiền tố**: `/lang-maker` giữ nguyên URL đang chạy.
- Tiếng Anh có tiền tố: `/en/maker-village`.
- `middleware.ts` viết lại `/lang-maker` → `/vi/lang-maker` trong nội bộ. Người dùng
  không thấy tiền tố `vi` bao giờ.
- **Không tự động chuyển ngôn ngữ theo IP hay `Accept-Language`.** Chỉ hiện một dải nhỏ
  đóng được, gợi ý sang bản tiếng Anh. Tự động chuyển làm người dùng bực và làm Google
  index sai.
- Lựa chọn ngôn ngữ nhớ trong `localStorage`, không phải cookie phía máy chủ — tránh làm
  hỏng cache tĩnh.

### 2.4 Bảng ánh xạ slug — một nguồn sự thật

`lib/i18n/routes.ts` là nơi duy nhất khai bảng này. Từ nó sinh ra: thẻ `hreflang`, nút
chuyển ngôn ngữ, và `sitemap.ts`.

| vi | en |
|---|---|
| `/` | `/en` |
| `/lang-maker` | `/en/maker-village` |
| `/hanh-trinh` | `/en/how-we-learn` |
| `/hanh-trinh/choi` | `/en/how-we-learn/play` |
| `/hanh-trinh/lam` | `/en/how-we-learn/make` |
| `/hanh-trinh/chia-se` | `/en/how-we-learn/share` |
| `/triet-ly` | `/en/philosophy` |
| `/cong-cu` | `/en/tools` |
| `/cho-mentor` | `/en/for-mentors` |
| `/video-hub` | `/en/videos` |
| `/cong-dong` | `/en/community` |
| `/cong-dong/maker-hub` | `/en/community/maker-hubs` |
| `/cong-dong/du-an` | `/en/community/projects` |
| `/cong-dong/tap-chi` | `/en/community/magazine` |

**Nút chuyển ngôn ngữ phải chuyển sang đúng trang tương ứng**, không đá về trang chủ.
Trang không có bản đối ứng thì nút bị vô hiệu kèm chú thích, không dẫn tới 404.

### 2.5 Nội dung tách khỏi giao diện

Đây là khối lượng công việc thật. Văn xuôi hiện nằm cứng trong JSX (ví dụ mảng `pillars`
trong `app/(public)/triet-ly/page.tsx`) và trong `lib/content/*.ts`.

```
lib/content/<trang>/
  types.ts   ← một interface duy nhất
  vi.ts      ← chữ hiện tại, nhấc nguyên từ JSX ra, KHÔNG sửa câu chữ
  en.ts      ← bản dịch, cùng interface
```

Trang trở thành vỏ mỏng, nhận nội dung theo `locale`.

**Nhấc chữ ra và dịch là hai bước tách rời.** Bước nhấc phải giữ nguyên từng dấu câu của
bản tiếng Việt — có vậy mới kiểm tra được bằng cách so trang trước và sau khi nhấc.

### 2.6 Thuật ngữ làng

Chủ dự án chốt: **giữ tiếng Việt kèm chú giải tiếng Anh**, không dịch hẳn sang tiếng Anh
(mất bản sắc, lại trùng với từ vựng đã mòn ở nước ngoài) và không để trần (người đọc mới
không hiểu gì).

`lib/content/glossary.ts` chốt cách dịch một lần cho cả site:

| Tiếng Việt | Chú giải tiếng Anh |
|---|---|
| Làng Maker | the Maker Village |
| Dân làng | Villager — a newcomer; plays first, registers nothing |
| Thợ học việc | Apprentice |
| Thợ cả | Master — leads the session by making alongside, not by lecturing |
| Già làng | Village Elder |
| Nghệ nhân | Artisan — a trade master from outside the village; stands beside the ladder, not on it |
| Chơi – Làm – Chia sẻ | Play – Make – Share |
| Maker Hub | giữ nguyên, đã là tiếng Anh |

Quy tắc hiển thị: **lần đầu xuất hiện trên mỗi trang** thì kèm chú giải; các lần sau chỉ
còn tên tiếng Việt.

### 2.7 SEO và metadata

- `hreflang` hai chiều `vi` ↔ `en`, cộng `x-default` trỏ về bản tiếng Việt.
- `canonical` mỗi trang trỏ về chính nó theo đúng ngôn ngữ. Giữ nguyên gốc
  `https://robot.edu.vn` đang khai ở `lib/site.ts`.
- `sitemap.ts` liệt kê cả hai ngôn ngữ, sinh từ bảng ở 2.4.
- `openGraph.locale` đổi theo ngôn ngữ (`vi_VN` / `en_US`).
- Ảnh OG cần bản tiếng Anh riêng. **Cảnh báo đã biết:** font nhúng BeVietnamPro chỉ có 459
  điểm mã và không có glyph mũi tên — bản tiếng Anh dùng `»`, tuyệt đối không dùng `→ ↻`.

### 2.8 Ngoài phạm vi, cố ý

- **Không dịch `dashboard` và `dang-nhap`** — khu quản trị nội bộ.
- **Không dịch máy rồi để đó.** Bản tiếng Anh viết như viết bản gốc, giữ giọng văn.
- **Giữ nguyên trường `nguon` không dịch** — đó là căn cứ dẫn nguồn, là bằng chứng, không
  phải văn. Dịch tên tệp lưu trữ hay tên chương trình truyền hình sẽ làm mất khả năng
  truy nguyên.
- **Không đụng năm redirect cũ** trong `next.config.ts`.
- **Không sửa ba khoá Google hỏng, không sửa mật khẩu admin hard-code.** Ghi lại ở đây để
  không quên, nhưng nằm ngoài việc này.

---

## 3. Phần B — Hình ảnh

### 3.1 Ba nguyên tắc lọc

1. **Ảnh phải chứng minh điều chữ đang khẳng định.** Trang Làng Maker nói "mở cửa từ
   2016" thì một tấm ảnh xưởng năm 2016 làm việc đó. Ảnh stock trẻ em cười trước laptop
   thì không, và còn làm site mất tin cậy.
2. **Ưu tiên ảnh không rõ mặt** (chủ dự án chốt): bàn tay đang lắp, sản phẩm đang cầm,
   chụp sau lưng, góc rộng thấy không khí chứ không thấy ai. **Ngoại lệ: người lớn** —
   người dẫn, nghệ nhân, mentor thì chân dung rõ mặt là tốt và xin phép dễ.
3. **Ý tưởng trừu tượng thì vẽ, đừng chụp.** Trang Triết Lý không có gì để chụp.

### 3.2 Bản đồ đặt ảnh

P0 = thiếu thì trang yếu hẳn · P1 = nên có · P2 = có thì tốt

#### Trang chủ
| Vị trí | Ảnh | Ưu tiên |
|---|---|---|
| Hero | Ảnh quan trọng nhất toàn site. Góc rộng trong xưởng đang làm việc: nhiều bàn tay, đồ nghề bày ra, lộn xộn thật. Không dàn dựng, không ai nhìn máy ảnh | P0 |
| Vòng lặp ba nhịp | 3 ảnh Chơi / Làm / Chia sẻ | P0 |
| Số liệu | Không cần ảnh — số đã tự nói | — |
| Đối tác | 5 logo: MakerViet, ThingEdu, Rogo, FPT Shop, FIRST Global | P1 |
| Kêu gọi | Bàn tay trẻ giơ sản phẩm vừa làm xong | P2 |

#### Làng Maker
| Vị trí | Ảnh | Ưu tiên |
|---|---|---|
| "Dùng robot để tạo ra đứa trẻ" | Một đứa trẻ cầm con robot **nó tự làm**, chụp từ phía sau qua vai. Luận đề cả trang nằm ở tấm này | P0 |
| "Mười năm" — 15 mốc | **Mỗi mốc một ảnh của đúng năm đó** (danh sách ở 3.3) | P0 |
| "Mười năm làm đồ nghề" | 9 ảnh sản phẩm nền sạch, bày thành dòng tiến hoá: MEO 1.0, MEO 2.0, K12 Maker, ABC Maker 1.0 / 1.5 / 2.0, Maker Bot 2020, VIA, ThingBot & NEO One | P0 |
| "Người dẫn ở làng" | Chân dung 4 người dẫn + 2 nghệ nhân, đang làm việc chứ không đứng chụp | P0 |
| "Người trong làng" — 5 vai | Vẽ sơ đồ thang bậc thay vì chụp (xem 3.4) | P1 |
| "Vào làng thế nào?" | Cửa một Maker Hub đang mở | P2 |

#### Cách Học và ba trang nhịp
| Trang | Ảnh | Ưu tiên |
|---|---|---|
| Cách Học | Dùng lại 3 ảnh nhịp + sơ đồ vòng lặp | P1 |
| Chơi | 5 trạm Bảo tàng Tò mò, mỗi trạm một ảnh | P1 |
| Làm | **Một dự án chụp 4 lần**: buổi 1 (đống linh kiện) → buổi 3 (hỏng, đang sửa) → buổi 5 → buổi 7 (chạy được). Chuỗi này thuyết phục hơn mọi đoạn văn giải thích "học bằng làm" | P0 |
| Chia sẻ | Trẻ đứng trình bày, chụp **từ phía sau khán giả**: thấy lưng đứa trẻ, màn hình, người ngồi nghe. Vừa đúng quy tắc không rõ mặt, vừa là bố cục kể chuyện tốt nhất | P0 |

#### Công Cụ — trang dễ làm nhất, không cần xin phép ai
Bảy công cụ, bảy ảnh, đủ được trong một buổi chiều:
- **Chụp màn hình:** GCompris, KTurtle, Python
- **Chụp sản phẩm nền trắng:** ThingBot, NEO One, K12 Maker, VIA (thêm một ảnh VIA đang
  chạy trên sa bàn)

P0 — hiện bảy công cụ chỉ có chữ mô tả, phụ huynh không hình dung được đang nói về cái gì.

#### Maker Hub
Ba hub thật × 2 ảnh = **6 ảnh**: mặt tiền (để nhận ra khi tới) + bên trong (để biết con
mình sẽ ngồi ở đâu). Ba hub: 190 Xã Đàn · 29 Dương Khuê · FPT Shop Quang Trung, Thanh Hoá.

P0 — không ai dẫn con đến một địa chỉ mà họ chưa thấy mặt.

#### Triết Lý
| Trụ cột | Xử lý | Ưu tiên |
|---|---|---|
| Tư tưởng Hồ Chí Minh — Bình dân học vụ | Ảnh tư liệu lớp bình dân học vụ, **phải kiểm tra bản quyền trước**; không rõ thì dùng sơ đồ ba lực lượng | P1 |
| Papert — Kiến tạo | Chân dung Papert, **phải kiểm tra giấy phép MIT Media Lab trước**; không rõ thì chỉ dùng sơ đồ vòng lặp | P1 |
| FIRST Coopertition | Ảnh thật đội tuyển Việt Nam ở Geneva 2022 và FIRST Global 2018 | P0 |

#### Hai trang còn lại
- **Cho Mentor:** ảnh buổi đào tạo người dẫn 2023 (người lớn, rõ mặt được) — P1
- **Video Hub:** đã có thumbnail YouTube. **Không cần thêm gì** — trang duy nhất đang đủ ảnh

### 3.3 Danh sách lọc từ kho mười năm

Theo đúng 15 mốc đã khai trong `lib/content/lang-maker.ts`. Mỗi mốc cần **một** tấm.

| Mốc | Ảnh cần tìm |
|---|---|
| 5/2016 | Xưởng chung Hà Nội ngày đầu. Kể cả ảnh xấu, ảnh điện thoại — càng thô càng thật |
| 3/12/2016 | Ngày hội IoT đầu tiên, góc rộng thấy đông người |
| 11/12/2016 | Ê-kíp VTV đang quay trong xưởng |
| 6/2017 | Bối cảnh lúc phát biểu câu định hình mười năm sau |
| 1/2018 | Vietnam IoT Day |
| 2018 | FIRST Global — đội tuyển, cờ Việt Nam |
| 2018–2019 | Cuộc Đua Số — xe trên đường đua |
| 2020 | VIA — xe tự hành mã nguồn mở |
| 2021 | Vietnam STEAM Challenge mùa hai |
| 5/2022 | "Mang xưởng đi tỉnh" — trên đường, đang dỡ đồ nghề xuống |
| 6/2022 | Chung kết Vietnam Robotics Challenge |
| 10/2022 | Geneva — đội tuyển Việt Nam. Dùng lại ở trang Triết Lý |
| 2023 | Buổi đào tạo người dẫn |
| 2024–2025 | ThingBot, NEO One thành sản phẩm |
| 2026 | Ba Maker Hub mở cửa |

**Tổng toàn site: 69 ảnh, trong đó 54 là P0.** Con số nghe lớn, nhưng chia theo cách lấy
thì phần lớn không phụ thuộc vào buổi học nào cả:

| Nhóm | Số lượng | Cách lấy | Gồm |
|---|---|---|---|
| Ảnh lịch sử | 15 | Lọc từ kho, không chụp mới | 15 mốc dòng thời gian |
| Đồ vật và ảnh màn hình | 17 | Chụp mới, **không cần ai đồng ý** | 9 đồ nghề + 8 công cụ |
| Hoạt động | 17 | Chụp ở buổi học tới | Hero, 3 nhịp, trẻ cầm robot, 5 trạm Chơi, chuỗi 4 buổi Làm, Chia sẻ, kêu gọi, cửa hub |
| Maker Hub | 6 | Chụp tại ba địa điểm | Mặt tiền + bên trong × 3 |
| Chân dung người lớn | 7 | Xin phép trực tiếp | 4 người dẫn + 2 nghệ nhân + 1 buổi đào tạo 2023 |
| Logo đối tác | 5 | Xin từ đối tác | MakerViet, ThingEdu, Rogo, FPT Shop, FIRST Global |
| Ảnh ngoài | 2 | **Phải kiểm giấy phép** | Papert, bình dân học vụ |

Hai ảnh FIRST Global 2018 và Geneva 2022 ở trang Triết Lý **dùng lại** ảnh của dòng thời
gian, không tính thêm.

Nhóm 17 ảnh đồ vật và ảnh màn hình là nhóm nên làm trước: không chờ ai, không xin phép ai,
và phủ trọn hai trang (Công Cụ, và khối đồ nghề của Làng Maker).

### 3.4 Năm sơ đồ nên vẽ thay vì chụp

SVG tự dựng, chạy đúng cả nền sáng lẫn nền tối. **Chữ trong sơ đồ cũng nằm trong
`vi.ts`/`en.ts`** nên dịch được như mọi nội dung khác.

1. **Vòng lặp ba nhịp** Chơi → Làm → Chia sẻ → quay lại Chơi. Nâng
   `components/nhip/vong-lap.tsx` hiện có thành SVG thật
2. **Thang bốn bậc** Dân làng → Thợ học việc → Thợ cả → Già làng, với **Nghệ nhân đứng
   cạnh thang chứ không trên thang** — chi tiết này chữ rất khó diễn đạt mà hình thì
   hiển nhiên
3. **Bản đồ Việt Nam** chấm vị trí Maker Hub, thay cho con số "tỉnh thành" đang trơ
4. **Dòng chín đời đồ nghề** MEO 1.0 → NEO One
5. **Mô hình ba lực lượng** Đội chủ lực / Bộ đội địa phương / Dân quân tự vệ

### 3.5 Kỹ thuật ảnh

- Đặt tại `public/anh/<trang>/`.
- Dùng `next/image`, **bỏ `unoptimized`** đang đặt trong `components/common/cover-image.tsx`.
- **Giữ nguyên cơ chế rơi về gradient** của `CoverImage`: chưa có ảnh thì vẽ nền gradient
  chứ không để ảnh vỡ. Nhờ vậy ghép ảnh được dần từng tấm, không cần đủ 60 tấm mới lên
  được bản thật.
- WebP kèm AVIF. Hero ≤ 200KB, ảnh thường ≤ 80KB.
- `alt` khai **riêng cho từng ngôn ngữ**, nằm trong `vi.ts`/`en.ts`. TypeScript do đó cũng
  bắt lỗi khi bản tiếng Anh thiếu alt — cùng cơ chế chống trôi dạt ở 2.5.
- Mỗi ảnh khai kèm **`nguon` và `namChup`**, theo đúng quy tắc `nguon` bắt buộc mà chủ dự
  án đã đặt cho dòng thời gian. **Ảnh lịch sử không nói được nguồn thì không đăng.**
- `DOCS/ANH-DONG-THUAN.md` ghi nhận đồng thuận cho từng ảnh có người nhận diện được.

---

## 4. Thứ tự thi công

Phần A và Phần B đụng cùng những tệp nội dung, nên thứ tự quan trọng.

| Đợt | Việc | Vì sao đứng ở đây |
|---|---|---|
| 0 | Spike hai root layout | Hỏng thì cả Phần A phải thiết kế lại. Phải biết trước khi đụng chín trang |
| 1 | Nhấc chữ khỏi JSX vào `vi.ts`, **chưa dịch gì** | Kiểm chứng được: trang trước và sau phải giống hệt nhau |
| 2 | Dựng `[locale]`, middleware, bảng slug, nút chuyển ngôn ngữ — chỉ có `vi` | Hạ tầng chạy được trước khi có chữ tiếng Anh |
| 3 | Viết `en.ts` cho chín trang + `glossary.ts` | Đến đây TypeScript sẽ bắt mọi chỗ dịch sót |
| 4 | `hreflang`, sitemap hai ngữ, ảnh OG tiếng Anh | Sau khi các trang tiếng Anh đã tồn tại |
| 5 | Năm sơ đồ SVG | Không phụ thuộc kho ảnh — làm được ngay, không phải chờ |
| 6 | Ghép ảnh thật theo mức ưu tiên P0 → P1 → P2 | Cơ chế gradient cho phép ghép dần, không chặn phát hành |

Đợt 5 và 6 chạy song song được với 3 và 4: sơ đồ và ảnh không phụ thuộc hạ tầng đa ngữ.

## 5. Kiểm chứng

| Hạng mục | Cách kiểm |
|---|---|
| Đợt 1 không đổi chữ | So bản dựng trước/sau; nội dung hiển thị phải giống từng dấu câu |
| Không dịch sót | `tsc` phải báo lỗi khi xoá một trường khỏi `en.ts`. **Phải thử phá hỏng thật để chứng minh cơ chế có tác dụng**, không được chỉ khẳng định |
| URL tiếng Việt không đổi | 14 đường dẫn ở 2.4 (cột vi) vẫn trả 200, không redirect |
| Năm redirect cũ còn sống | Kiểm lại 5 mục trong `next.config.ts` |
| Nút chuyển ngôn ngữ | Từ mỗi trang, bấm chuyển phải sang đúng trang đối ứng, không về trang chủ |
| `hreflang` | Cặp vi ↔ en hai chiều, có `x-default` |
| Ảnh thiếu | Trang vẫn dựng được và hiện gradient, không vỡ, không 404 |
| Ảnh có nguồn | Mọi ảnh lịch sử đều có `nguon` khác rỗng |

> **Lưu ý đã biết, đừng vấp lại:** `next.config.ts` không nạp lại khi dev server đang
> chạy — phải khởi động lại mới thấy redirect và cấu hình ảnh mới.

## 6. Còn treo, cần chủ dự án quyết sau

1. **Giấy phép chân dung Seymour Papert** — MIT Media Lab. Chưa rõ thì trang Triết Lý chỉ
   dùng sơ đồ.
2. **Bản quyền ảnh tư liệu bình dân học vụ** — tương tự.
3. **Ảnh có rõ mặt trẻ em:** mặc định loại. Nếu về sau có giấy đồng ý của phụ huynh thì
   bổ sung, ghi vào `DOCS/ANH-DONG-THUAN.md`.
4. **Bản dịch tên chương trình và giải đấu** trong dòng thời gian: giữ nguyên tên tiếng
   Việt hay kèm chú giải? Đề xuất giữ nguyên + chú giải lần đầu, giống thuật ngữ làng.
