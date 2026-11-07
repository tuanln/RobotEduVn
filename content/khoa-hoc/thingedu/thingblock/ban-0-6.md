---
title: "Bản 0.6: có gì mới"
description: "ThingBlock 0.6 (bản thử 04/11/2026): mô phỏng ThingBot trong app, 14 bài học tự chấm, 36 ví dụ có sẵn, chế độ Live (ThingBot Telemetrix) lùi được và dừng được, điều khiển từ điện thoại, lưu tệp, tiếng Việt"
nguon: "ThingEdu"
---

ThingBlock 0.6 là bản chuẩn bị cho mùa thi **FanRoc 2026–2027**. Lần đầu tiên học sinh có thể học, làm bài và chạy thử chương trình **ngay trong ThingBlock mà chưa cần mạch**, rồi mang đúng chương trình đó nạp xuống ThingBot thật.

| | Bản thử 0.6.0 | Bản ổn định 0.5.0 |
|---|---|---|
| Ngày | 04/11/2026 (*pre-release*, đang lấy góp ý) | 30/10/2026 |
| Tải về | [v0.6.0-preview-20261104](https://github.com/ThingEdu/thingblock-desktop/releases/tag/v0.6.0-preview-20261104) | [v0.5.0](https://github.com/ThingEdu/thingblock-desktop/releases/tag/v0.5.0) |
| Có mô phỏng, bài học, ví dụ | Có | Không |

Cách cài xem [Cài đặt ThingBlock](/khoa-hoc/thingedu/thingblock/cai-dat). Bản 0.6 mở được mọi tệp `.tb` của bản cũ.

## 1. Mô phỏng ThingBot ngay trong app

Khung **Mô phỏng** bên phải vùng lập trình là một mạch ThingBot ảo vẽ đúng chân cắm của mạch thật: hai đèn L1, L2, nút **SW**, màn OLED (phóng to được), năm cổng servo S1–S5, bốn cổng động cơ M1–M4, còi phát tiếng ra loa máy tính, một **thanh trượt khoảng cách** thay cho cảm biến siêu âm và một **tay cầm PS2 ảo** (giữ nút để bấm).

- Nút **Chạy**, **Tạm dừng**, **Từng bước** (chạy một khối rồi dừng), **Chạy lại** (như vừa bật nguồn) và thanh tốc độ mô phỏng.
- Khối lệnh đổi thì khung báo *Khối lệnh đã đổi. Bấm Chạy để chạy chương trình mới.*
- Chương trình có khối chưa mô phỏng được thì khung liệt kê đúng khối đó, không im lặng.

Mô phỏng chạy chính các khối của chế độ nạp (`khi Arduino khởi động`, `vòng lặp Arduino`, nhóm ThingBot, OLED, Ultrasonic, PS2), nên **xếp xong trên mô phỏng là cắm dây bấm Nạp được ngay**. Khác với [ThingBot Sim trên web](/mo-phong?bai=1), bản trong app chạy khi không có mạng và dùng chung tệp `.tb` với dự án thật.

## 2. Mười bốn bài học tự chấm

Menu **Bài học** mở thư viện bài học. Mỗi bài dẫn từng bước ở cột trái, học sinh xếp khối, bấm Chạy, app chấm trên mô phỏng rồi báo *Giỏi lắm!* hoặc *Chưa đạt* kèm **Gợi ý**. Tiến độ được nhớ lại giữa các lần mở app.

| Nhóm | Bài | Phút |
|---|---|---|
| Làm quen | ThingBot Sim 1: Làm quen ThingBot | 10 |
| Đầu ra: đèn và còi | Bật tắt đèn · Đèn nhấp nháy · Màn hình OLED chào em · ThingBot Sim 2: Đèn nhấp nháy | 10–15 |
| Động cơ và servo | Servo ba cách quay · ThingBot Sim 5: Servo quét · ThingBot Sim 7: Động cơ DC · ThingBot Sim 8: Xe đi thẳng và rẽ | 15–20 |
| Đầu vào và màn OLED | ThingBot Sim 3: Nút bấm điều khiển đèn · ThingBot Sim 4: Màn hình OLED · ThingBot Sim 6: Cảm biến khoảng cách · ThingBot Sim 9: Tay cầm điều khiển · ThingBot Sim 10: Xe tránh vật cản | 15–25 |

Mười bài *ThingBot Sim* là chính 10 bài của [ThingBot Sim trên web](/mo-phong?bai=1), nay chấm điểm được trong app. Bài học cần **ThingBlock Link** đang chạy (bản cài đặt tự mở sẵn).

## 3. Ba mươi sáu ví dụ có sẵn

**Tập tin → Ví dụ…** mở thư viện ví dụ, lọc theo nhóm và tìm theo tên. Mở một ví dụ là có đủ bo, ngoại vi, khối và tên dự án; sửa rồi **Lưu thành…** là thành bài của mình. Ví dụ ghi rõ cắm gì vào đâu (DHT11 ở IO4, siêu âm TRIG IO0 / ECHO IO4, nút SW làm cản va…).

**K12 cơ bản (18 bài)** theo khung chương trình K1–K12 của ThingEdu:

| # | Ví dụ | Phần cứng |
|---|---|---|
| 1 | Đèn hội trăng rằm | LED trên mạch |
| 2 | Người hùng quanh em: còi báo động | Còi, LED |
| 3 | Đèn giao thông ngã tư | LED, nút SW, OLED |
| 4 | Robot thú cưng | Nút SW, LED, còi |
| 5 | Đồng hồ đếm giờ chơi | Nút SW, OLED, còi |
| 6 | Nhiệt kế đeo tay | DHT11, OLED, LED, còi |
| 7 | Trạm khí tượng của em | DHT11, OLED, LED |
| 8 | Bảng tin của lớp | OLED, nút SW |
| 9 | Hộp mù bí ẩn | Servo S1 làm chốt, nút SW, còi |
| 10 | Cửa siêu thị tự mở | Siêu âm, servo S1 |
| 11 | Chong chóng điện gió | Động cơ M1, nút SW, OLED |
| 12 | Robot vũ công | M1, M2, LED, còi |
| 13 | Robot đưa thư | M1, M2, nút SW |
| 14 | Robot họa sĩ | M1, M2, servo S1 gá bút |
| 15 | Robot vượt chướng ngại | M1, M2, nút SW làm cản va |
| 16 | Cú va chạm an toàn | MPU6050, OLED, M1, M2 |
| 17 | Xe điều khiển từ xa | Tay PS2, M1, M2 |
| 19 | Cánh tay máy | Servo S1, S2, S3, nút SW |

**FanRoc (2 bài)**, điểm xuất phát cho robot thi đấu:

| # | Ví dụ | Phần cứng |
|---|---|---|
| 18 | Robot thi đấu bước 1: lái và nâng | Tay PS2, M1 M2 lái, M3 cơ cấu nâng |
| 20 | Robot FanRoc hoàn chỉnh | Tay PS2, M1 M2 lái, M3 con lăn hút, M4 nâng, S1 tay nâng, S2 kẹp, S3 cửa xả |

Cách gán cổng trong hai bài này chỉ là gợi ý; đội tự đổi theo robot của mình.

**Âm nhạc (6 bài)**: Kìa con bướm vàng, Ngôi sao lấp lánh, Chúc mừng sinh nhật, Cá mập con, Tiếng chuông ngân, Khúc hoan ca. Còi trên mạch phát được, mô phỏng cũng phát tiếng.

**Mô phỏng ThingBot Sim (10 bài)**: lời giải của 10 bài học ở mục 2, từ Làm quen ThingBot tới Dự án: xe tránh vật cản.

Năm bài mẫu ba bước V1–V2–V3 của khóa này vẫn ở trang [5 bài mẫu](/khoa-hoc/thingedu/thingblock/bai-mau).

## 4. Chế độ Live (ThingBot Telemetrix) sửa những lỗi lớn

Chế độ chạy trực tiếp gửi lệnh từ máy tính xuống bo qua Bluetooth bằng firmware **ThingBot Telemetrix**. Bản 0.6 kèm firmware Live dựng lại, nên **phải cài lại firmware Live** một lần: mở hộp kết nối, cắm USB, bấm **Install**.

| Trước 0.6 | Từ 0.6 |
|---|---|
| Động cơ chỉ nhận 0–100, không lùi được | `motor speed` nhận **−100 tới 100**: số âm là lùi |
| Bấm Stop không tắt động cơ | **Stop tắt mọi động cơ và còi** |
| "Tiến" ở Live quay ngược với chương trình nạp | **Một chiều quay cho cả ba nơi**: nạp, Live, app điện thoại |
| Lùi M3 làm servo S5 giật | Đã sửa (M3 dùng đúng kênh) |
| Khối `set pin mode` không tác dụng, siêu âm mặc định đè chân PS2 | Khối chân chạy được; siêu âm mặc định **TRIG 0 / ECHO 4** |
| Phải chờ Bluetooth quét xong mới kết nối được | Kết nối ngay |

Đoạn phanh `khi bấm phím phím trắng` trong các bài mẫu vẫn nên giữ: mất Bluetooth giữa chừng thì bo vẫn giữ lệnh cuối.

## 5. Điều khiển từ điện thoại

Ngoại vi **Phone control** cho app Android **ThingBot Remote** lái robot trong lúc chương trình của học sinh đang chạy trên bo: thêm một khối `allow phone control, board name [ThingBot]` rồi nạp. Bản 0.6 sửa servo quay đủ 0–180° (trước đó kẹt ở hai đầu) và thống nhất chiều quay với chế độ nạp. Chương trình có khối này **phải nạp lại** bằng bản 0.6.

Hướng dẫn và tải app ở trang [Điều khiển bằng điện thoại](/khoa-hoc/thingedu/thingblock/dieu-khien-bang-dien-thoai).

## 6. Làm việc với tệp và giao diện

- **Lưu** hỏi nơi lưu lần đầu, sau đó ghi đè đúng tệp đó (⌘S / Ctrl+S). **Lưu thành…** luôn hỏi. Thanh tiêu đề hiện tên tệp, lưu xong báo *Đã lưu: đường dẫn*.
- Mở dự án khác khi đang có thay đổi chưa lưu thì app **hỏi trước**.
- Khối phần cứng, menu, hộp thoại và bài học **hiện tiếng Việt**. App nhớ ngôn ngữ và bo đã chọn. Dự án mới tên *ThingBlock Project*.
- Khung mã sinh ra và khung Serial **thu gọn được** để rộng chỗ xếp khối.
- Hộp **Chọn mạch** chỉ còn **ThingBot** và **VIA Bánh Mì**. Arduino Uno, Nano, ESP32, ESP32-C3 được ẩn; dự án cũ lưu trên các bo đó vẫn mở và nạp được.

## 7. Lỗi của bản 0.4.0 và 0.5.0 đã sửa

- `set buzzer to N pulse` nay dùng đúng giá trị, còi kêu được.
- `đặt lại đồng hồ bấm giờ` chạy đúng ở chế độ nạp.
- Biến **Decimal** giữ nguyên kiểu sau khi mở lại dự án.
- Ô số nhận biến; **khối tự tạo có tham số** sinh mã đúng.
- Dải **RGB LED Strip** và ngoại vi **Servo** biên dịch được cho ESP32.
- `start servo … over N seconds` tiếp tục quay như mong đợi; khối giải thích servo quay trong lúc `wait for servos` chạy.
- `init PS2 on ThingBot` mặc định đúng cổng PS2 và **không treo robot** khi chưa cắm bộ thu: bỏ qua sau khoảng 10 giây.
- **Nạp** luôn gửi đúng chương trình đang trên màn hình, không phải bản trước.
- Gói lõi ESP32 ghim bản 3.3.11 và có thể đóng gói sẵn để nạp **không cần mạng** tại sân thi.

## Chuẩn bị cho FanRoc 2026–2027

Bộ nội dung thi FanRoc 2026–2027 (bài học lái và cơ cấu, robot mẫu, luật, sân mô phỏng) **đang được chuẩn bị, sắp ra**. Có sẵn từ hôm nay: hai ví dụ FanRoc trong ThingBlock 0.6 và game mô phỏng sân thi [ThingBot FanRoc Game](https://github.com/ThingEdu/thingbot-sim/releases/tag/fanroc-v0.1.0) (macOS, Windows). Xem thêm ở trang [Các cuộc thi](/khoa-hoc/thingedu/thingbot/cac-cuoc-thi).

## Góp ý cho bản thử

Bản 0.6.0 là bản thử: nếu robot của bạn **chạy lùi khi bảo tiến**, hoặc một ví dụ không nạp được, hãy báo cho đội ThingEdu kèm tên tệp cài (`ThingBlock_0.6.0-preview-20261104…`), hệ điều hành và ảnh chụp chương trình. Bản cài chưa ký số: Windows SmartScreen và macOS Gatekeeper sẽ cảnh báo, chọn mở tiếp như hướng dẫn ở trang Cài đặt.

*Nguồn: ghi chú phát hành ThingBlock v0.6.0-preview-20261104 và v0.5.0 trên GitHub ThingEdu/thingblock-desktop; danh mục ví dụ và bài học trong mã nguồn ThingEdu/thingblock-editor (nhánh develop, 04/11/2026).*
