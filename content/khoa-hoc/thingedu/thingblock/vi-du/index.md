---
title: "Ví dụ có sẵn"
description: "52 ví dụ trong menu Tập tin → Ví dụ… của ThingBlock 0.8 (36 ThingBot, 5 CoBot, 11 Camera AI); 36 ví dụ ThingBot có trang hướng dẫn riêng: phần cứng, chương trình dịch ra chữ, chương trình làm gì, thử thách mở rộng"
nguon: "ThingEdu"
---

Menu **Tập tin → Ví dụ…** của ThingBlock có sẵn **52 ví dụ** (bản 0.8), chia sáu nhóm: 36 ví dụ cho **ThingBot** (có từ bản 0.6), 5 ví dụ **CoBot** và 11 trò **Camera AI** (từ bản 0.8). Mỗi ví dụ ThingBot dưới đây có một trang hướng dẫn để dùng ngay trong lớp: phần cứng cần cắm, chương trình dịch ra chữ để đọc không cần mở máy, chương trình làm gì, và ba thử thách mở rộng. Tệp `.tb` của từng ví dụ tải được ngay trên trang (cho bản 0.5.0 hoặc để gửi cho học sinh).

**Lộ trình gợi ý:** mười bài **Mô phỏng** trước, làm online ngay tại [robot.edu.vn/mo-phong](/mo-phong?bai=1) trên máy tính bảng hoặc máy tính, không cần cài gì và không cần mạch (đây là bài làm quen cho các hoạt động ở Làng), rồi **K12 cơ bản** theo mức 1 → 2 → 3, xen các bài **Âm nhạc** cho buổi nhẹ. Lớp chưa có mạch thì chơi **Camera AI** bằng webcam hoặc chuột. Hai robot **FanRoc** dành cho đội chuẩn bị thi; **CoBot** cho lớp có robot dò đường. Muốn được chấm từng bước, làm **19 bài học tự chấm** ở menu **Bài học** (danh sách ở cuối trang).

> Bản 0.8.0 đang là bản thử (pre-release 12/11/2026); bản ổn định 0.5.0 chưa có menu Ví dụ và khung Mô phỏng. Xem [Bản 0.8: có gì mới](/khoa-hoc/thingedu/thingblock/ban-0-8) và [Cài đặt](/khoa-hoc/thingedu/thingblock/cai-dat). Ở bản 0.8 (và trên bản online /mo-phong), hai ví dụ *Cảm biến khoảng cách* và *Dự án: xe tránh vật cản* được thay bằng *Mắt hồng ngoại* và *Dây chuyền phân loại trứng*.

## Mô phỏng ThingBot Sim (10 ví dụ)

Mười bài nền tảng, mỗi bài một khối mới. Cùng một bài có ba chỗ làm: **online** tại [robot.edu.vn/mo-phong](/mo-phong?bai=1) (trình duyệt, máy tính bảng, không cài gì: dùng cho buổi làm quen ở Làng), **bài học tự chấm** *ThingBot Sim 1–10* ở menu Bài học của ThingBlock 0.6, và **ví dụ** mở sẵn trong app để sửa tiếp. Cột *Online* dưới đây trỏ thẳng tới bài trên trình duyệt.

| # | Ví dụ | Mức | Phần cứng ngoài mạch | Khái niệm | Online |
|---|---|---|---|---|---|
| 1 | [Làm quen ThingBot](/khoa-hoc/thingedu/thingblock/vi-du/sim-01-lam-quen-thingbot) | 1 | không | Khung chương trình: khởi động chạy một lần, vòng lặp chạy mãi | [Bài 1](/mo-phong?bai=1) |
| 2 | [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) | 1 | không | Bật, chờ, tắt, chờ: nhấp nháy bằng vòng lặp | [Bài 2](/mo-phong?bai=2) |
| 3 | [Nút bấm điều khiển đèn](/khoa-hoc/thingedu/thingblock/vi-du/sim-03-nut-bam-bat-den) | 1 | không | Đọc nút, `nếu … thì … nếu không thì` | [Bài 3](/mo-phong?bai=3) |
| 4 | [Màn hình OLED](/khoa-hoc/thingedu/thingblock/vi-du/sim-04-man-hinh-oled) | 1 | Màn OLED I2C | Khởi động OLED, in chữ, đặt con trỏ, hiện lên màn | [Bài 4](/mo-phong?bai=4) |
| 5 | [Servo quét](/khoa-hoc/thingedu/thingblock/vi-du/sim-05-servo-quet) | 1 | Servo S1 | Servo quay tới góc trong thời gian cho trước | [Bài 5](/mo-phong?bai=5) |
| 6 | [Mắt hồng ngoại](/khoa-hoc/thingedu/thingblock/vi-du/sim-06-mat-hong-ngoai) | 2 | Mắt hồng ngoại IO4; đèn L1 | Mắt hồng ngoại nhận bóng sáng/tối, ngưỡng, so sánh `<` (cần ThingBlock 0.8) | [Bài 6](/mo-phong?bai=6) |
| 7 | [Động cơ DC](/khoa-hoc/thingedu/thingblock/vi-du/sim-07-dong-co-m1) | 2 | Động cơ M1 | Động cơ DC: chiều tiến/lùi, tốc độ phần trăm | [Bài 7](/mo-phong?bai=7) |
| 8 | [Xe đi thẳng – rẽ](/khoa-hoc/thingedu/thingblock/vi-du/sim-08-xe-di-thang-re) | 2 | Động cơ M1 (bánh trái), M2 (bánh phải) | Hai bánh cùng chiều đi thẳng, dừng bằng tốc độ 0 | [Bài 8](/mo-phong?bai=8) |
| 9 | [Tay cầm điều khiển](/khoa-hoc/thingedu/thingblock/vi-du/sim-09-tay-cam-ps2) | 2 | Bộ thu tay cầm PS2 ở cổng PS2; Động cơ M1, M2 | Tay PS2: khởi động, đọc dữ liệu mỗi vòng, hỏi nút | [Bài 9](/mo-phong?bai=9) |
| 10 | [Dự án: dây chuyền phân loại trứng](/khoa-hoc/thingedu/thingblock/vi-du/sim-10-day-chuyen-phan-loai) | 2 | Mắt hồng ngoại IO4; Động cơ M1 (băng chuyền); Servo S1 (cần gạt) | Dự án ghép: mắt + động cơ + servo, phân loại theo sáng/tối (cần ThingBlock 0.8) | [Bài 10](/mo-phong?bai=10) |

## K12 cơ bản (18 ví dụ)

Mười tám dự án theo chương trình K12 Maker của Maker Việt (số bài gốc ghi trong mỗi trang), xếp theo mức 1 → 3. Phần lớn chạy được trên khung Mô phỏng; bài có DHT11 hay MPU6050 cần mạch thật.

| # | Ví dụ | Mức | Phần cứng ngoài mạch | Khái niệm |
|---|---|---|---|---|
| 11 | [Đèn hội trăng rằm](/khoa-hoc/thingedu/thingblock/vi-du/k12-01-den-hoi-trang-ram) | 1 | không | Tuần tự, `lặp lại … lần`, khối `đợi` |
| 12 | [Người hùng quanh em: còi báo động](/khoa-hoc/thingedu/thingblock/vi-du/k12-02-coi-bao-dong) | 1 | không | Nhịp (BPM), nốt nhạc theo phách, nghỉ |
| 13 | [Đèn giao thông ngã tư](/khoa-hoc/thingedu/thingblock/vi-du/k12-03-den-giao-thong) | 2 | Màn OLED I2C | Biến đếm ngược, `lặp lại cho đến khi`, điều kiện `và`, màn OLED |
| 14 | [Robot thú cưng](/khoa-hoc/thingedu/thingblock/vi-du/k12-04-robot-thu-cung) | 2 | không | Biến đầu tiên, đếm số lần bấm nút, `đợi cho đến khi` |
| 15 | [Đồng hồ đếm giờ chơi](/khoa-hoc/thingedu/thingblock/vi-du/k12-05-dong-ho-dem-gio) | 2 | Màn OLED I2C (thay ma trận LED) | Đếm ngược bằng biến, in biến lên OLED, cỡ chữ |
| 16 | [Nhiệt kế đeo tay](/khoa-hoc/thingedu/thingblock/vi-du/k12-06-nhiet-ke-deo-tay) | 2 | Cảm biến DHT11 ở IO4; Màn OLED I2C | Đọc cảm biến vào biến, so sánh với ngưỡng, `nếu … thì … nếu không thì` |
| 17 | [Trạm khí tượng của em](/khoa-hoc/thingedu/thingblock/vi-du/k12-07-tram-khi-tuong) | 2 | Cảm biến DHT11 ở IO4; Màn OLED I2C | Hai cảm biến, `kết hợp` chữ với số, điều kiện lồng nhau |
| 18 | [Bảng tin của lớp](/khoa-hoc/thingedu/thingblock/vi-du/k12-08-bang-tin-lop) | 2 | Màn OLED I2C (thay ma trận LED/LCD) | Biến trạng thái (trang), chờ có thời hạn, `hoặc` |
| 19 | [Hộp mù bí ẩn](/khoa-hoc/thingedu/thingblock/vi-du/k12-09-hop-mu-bi-an) | 2 | Servo S1 làm chốt khóa | Đếm nhịp bấm có thời hạn, so sánh với mã, servo làm chốt |
| 20 | [Cửa siêu thị tự mở](/khoa-hoc/thingedu/thingblock/vi-du/k12-10-cua-sieu-thi) | 2 | Cảm biến siêu âm: TRIG IO0, ECHO IO4; Servo S1 làm cánh cửa | Cảm biến siêu âm, hai ngưỡng (trễ), biến trạng thái |
| 21 | [Chong chóng điện gió](/khoa-hoc/thingedu/thingblock/vi-du/k12-11-chong-chong-gio) | 2 | Động cơ M1 gắn cánh quạt; Màn OLED I2C | Tốc độ phần trăm, tăng giảm dần bằng biến, `làm tròn` |
| 22 | [Robot vũ công](/khoa-hoc/thingedu/thingblock/vi-du/k12-12-robot-vu-cong) | 2 | Động cơ M1 (bánh trái), M2 (bánh phải) | Hàm (Khối của tôi) đầu tiên, động tác đặt tên, hai bánh ngược chiều |
| 23 | [Robot đưa thư](/khoa-hoc/thingedu/thingblock/vi-du/k12-13-robot-dua-thu) | 2 | Động cơ M1 (bánh trái), M2 (bánh phải) | Hàm dùng biến làm tham số, hiệu chỉnh thời gian rẽ |
| 24 | [Robot họa sĩ](/khoa-hoc/thingedu/thingblock/vi-du/k12-14-robot-hoa-si) | 3 | Động cơ M1, M2; Servo S1 gá bút | Lặp lồng nhau, hình đa giác, góc ngoài 360 ÷ số cạnh |
| 25 | [Robot vượt chướng ngại](/khoa-hoc/thingedu/thingblock/vi-du/k12-15-vuot-chuong-ngai) | 2 | Động cơ M1, M2 | Phản xạ: cảm biến chạm, số ngẫu nhiên |
| 26 | [Cú va chạm an toàn](/khoa-hoc/thingedu/thingblock/vi-du/k12-16-cu-va-cham-an-toan) | 3 | Cảm biến gia tốc MPU6050 (I2C); Màn OLED I2C; Động cơ M1, M2 | Cảm biến gia tốc, độ lớn vectơ, giữ giá trị lớn nhất, đơn vị g |
| 27 | [Xe điều khiển từ xa](/khoa-hoc/thingedu/thingblock/vi-du/k12-17-xe-dieu-khien-tu-xa) | 3 | Bộ thu tay cầm PS2 ở cổng PS2; Động cơ M1 (bánh trái), M2 (bánh phải) | Cần analog PS2, vùng chết, lái vi sai (tiến + rẽ) |
| 28 | [Cánh tay máy](/khoa-hoc/thingedu/thingblock/vi-du/k12-19-canh-tay-may) | 2 | Servo S1 (đế xoay), S2 (khuỷu tay), S3 (kẹp) | Nhiều servo quay cùng lúc, `bắt đầu quay servo` + `chờ các servo quay xong`, hàm |

## FanRoc (2 ví dụ)

Hai robot thi đấu lái bằng tay PS2, dùng cho mùa [FanRoc 2026–2027](/khoa-hoc/thingedu/thingbot/cac-cuoc-thi). Chạy thử trên khung Mô phỏng bằng tay PS2 ảo, rồi nạp xuống robot thật.

| # | Ví dụ | Mức | Phần cứng ngoài mạch | Khái niệm |
|---|---|---|---|---|
| 29 | [Robot thi đấu bước 1: lái và nâng](/khoa-hoc/thingedu/thingblock/vi-du/k12-18-ftc-khoi-dong) | 3 | Bộ thu tay cầm PS2; Động cơ M1, M2 (lái), M3 (cơ cấu nâng) | Lái kiểu xe tăng hai cần, cơ cấu nâng an toàn, nút bật/tắt chế độ |
| 30 | [Robot FanRoc hoàn chỉnh](/khoa-hoc/thingedu/thingblock/vi-du/k12-20-robot-fanroc) | 3 | Bộ thu tay cầm PS2 (khối init PS2 on ThingBot: chân 7/2/10/6); M1 bánh trái, M2 bánh phải, M3 con lăn hút, M4 nâng; S1 tay nâng, S2 kẹp, S3 cửa xả | Robot thi đấu đủ cơ cấu: lái vi sai, con lăn, nâng, tay servo giới hạn góc, kẹp, cửa xả |

## Âm nhạc (6 ví dụ)

Sáu bài hát chơi trên còi của ThingBot bằng khối `chơi nốt`, từ dễ đến khó. Dùng để học nốt nhạc, phách và khối lặp.

| # | Ví dụ | Mức | Phần cứng ngoài mạch | Khái niệm |
|---|---|---|---|---|
| 31 | [Kìa con bướm vàng](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-kia-con-buom-vang) | 1 | không | Nốt nhạc theo phách, câu nhạc lặp hai lần |
| 32 | [Ngôi sao lấp lánh (Twinkle Twinkle Little Star)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-twinkle) | 1 | không | Giai điệu đi từng bậc, học tên nốt |
| 33 | [Chúc mừng sinh nhật (Happy Birthday)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-happy-birthday) | 1 | không | Nốt ngắn 0,25 phách và nốt dài 2 phách, nốt thăng |
| 34 | [Cá mập con (Baby Shark)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-baby-shark) | 1 | không | Một câu nhạc lặp ba lần, nhiều nốt liền nhau |
| 35 | [Tiếng chuông ngân (Jingle Bells)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-jingle-bells) | 2 | không | Nốt chấm dôi 1,5 phách, móc đơn 0,5 phách |
| 36 | [Khúc hoan ca (Ode to Joy)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-ode-to-joy) | 2 | không | Giai điệu đi liền bậc, hai câu chỉ khác nốt kết |

## CoBot (5 ví dụ) *(từ bản 0.8)*

Năm ví dụ cho robot dò đường **CoBot**, chọn mạch CoBot rồi nạp xuống xe (CoBot chưa có mô phỏng). Khối, chân cắm và cách chỉnh ngưỡng ở trang [Mạch CoBot](/khoa-hoc/thingedu/thingblock/cobot).

| # | Ví dụ | Mức | Cần | Khái niệm |
|---|---|---|---|---|
| 37 | Xe giao hàng chạy thử | 1 | CoBot | Tiến, lùi, rẽ, xoay tại chỗ rồi dừng |
| 38 | Bốn mắt nhìn sàn | 1 | CoBot, dây USB | In số 4 mắt lên Monitor, tìm ngưỡng chia vạch và nền |
| 39 | Dò line: xe theo vạch | 2 | Sân có vạch | Mắt ngoài cùng thấy vạch thì xoay về phía đó, còn lại đi thẳng |
| 40 | Xe buýt dừng ở trạm đỏ | 2 | Sân dò line có một ô đỏ | Dò line; cảm biến màu thấy đỏ thì dừng 3 giây rồi đi tiếp |
| 41 | Tìm đường trong mê cung vạch | 3 | Mê cung vẽ bằng vạch, có ngõ cụt | Gặp ngã rẽ trái thì rẽ trái, ngõ cụt thì quay đầu (bám tường trái) |

## Camera AI (11 ví dụ, không cần mạch) *(từ bản 0.8)*

Mười một trò chơi bằng **webcam** (hoặc chuột nếu máy không có webcam): máy nhìn bàn tay, cử chỉ, đầu và vai của em. Mở ra là chơi được ngay, không chọn mạch. Khối và cách chơi bằng chuột ở trang [Camera AI](/khoa-hoc/thingedu/thingblock/camera-ai).

| # | Trò | Mức | Em dùng gì | Khái niệm |
|---|---|---|---|---|
| 42 | Tay em trên sân chơi | 1 | Ngón trỏ, cử chỉ | Vật đi theo tay, gọi tên cử chỉ |
| 43 | Bắt Dế | 1 | Ngón trỏ | Va chạm, điểm, đồng hồ 30 giây |
| 44 | Hứng Mưa | 2 | Lòng bàn tay | Vật rơi, +1 khi hứng, −1 khi rơi xuống đáy |
| 45 | Đỡ Bóng | 2 | Lòng bàn tay | Trọng lực, đỡ bóng bay lên |
| 46 | Hái sao né bom | 2 | Ngón trỏ | Điểm cộng, điểm trừ, vật đổi chỗ mỗi 2 giây |
| 47 | Oẳn tù tì | 3 | Cử chỉ nắm tay, xoè tay, chữ V | Đếm ngược, số ngẫu nhiên, bảng điểm em và máy |
| 48 | Phản xạ cử chỉ | 3 | Cử chỉ | Sân chơi gọi, em làm theo thật nhanh |
| 49 | Dế Xanh bay | 3 | Vỗ hai tay (thể dục tay–vai) | Trọng lực, vỗ tay để bay, lách qua khe tre |
| 50 | Thể dục cổ: nghiêng đầu hứng sao | 2 | Nghiêng đầu (thể dục cổ) | Đầu điều khiển robot Tre hứng sao, 60 giây |
| 51 | Gật đầu đếm nhịp | 1 | Gật đầu (thể dục cổ) | Đếm 10 lần gật chậm |
| 52 | Ngồi xuống né bóng | 2 | Ngồi xuống, đứng lên (thể dục chân) | Bóng bay ngang tầm đầu, 60 giây |

Bốn trò cuối là trò **tập thể dục**: đứng lùi để camera thấy cả đầu và vai, làm chậm, chóng mặt thì dừng. Hình ảnh camera chỉ xử lý trên máy, không gửi đi đâu.

## Chân cắm dùng trong các ví dụ

| Thiết bị | Cắm vào |
|---|---|
| Động cơ bánh trái, bánh phải | Cổng **M1**, **M2** (M3, M4 cho con lăn, cơ cấu nâng) |
| Servo | Cổng **S1**–**S5**, chân tín hiệu đúng chiều |
| Màn OLED 128×64, MPU6050 | Cổng **I2C** (dùng chung được, khác địa chỉ) |
| DHT11 | Chân dữ liệu vào **IO4**, nguồn 3,3 V và GND |
| Siêu âm HC-SR04 | TRIG vào **IO0**, ECHO vào **IO4** |
| Bộ thu tay PS2 | Cổng **PS2**, đúng thứ tự chân |

LED 1, LED 2, còi và nút **SW** có sẵn trên mạch. Chạy động cơ phải bật công tắc nguồn pin; nguồn USB không đủ. Trước buổi đầu, chạy [chương trình kiểm tra ThingBot](/khoa-hoc/thingedu/thingblock/lam-quen-thingbot) để biết bánh nào ở cổng nào.

## 19 bài học tự chấm (menu Bài học)

Khác với ví dụ (mở ra là có chương trình hoàn chỉnh), **bài học** dẫn từng bước: em kéo khối theo hướng dẫn, bấm **Chạy**, mạch ảo tự kiểm tra (đèn có sáng, servo có đúng góc, OLED có đúng chữ…) rồi mới cho sang bước sau. Có gợi ý khi kẹt. Tiến độ lưu trên máy. Số phút và tên bài theo bản 0.8; bản 0.6 có 14 bài đầu (bài 6 và 10 khi đó là *Cảm biến khoảng cách* và *Xe tránh vật cản*).

| Nhóm | Bài | Phút | Ví dụ tương ứng | Online |
|---|---|---|---|---|
| Làm quen | ThingBot Sim 1: Làm quen ThingBot | 15 | [Làm quen ThingBot](/khoa-hoc/thingedu/thingblock/vi-du/sim-01-lam-quen-thingbot) | [Bài 1](/mo-phong?bai=1) |
| Làm quen | Từ điển điện tử cho người mới *(0.8)* | 20 | – (bài đọc, không chấm) | – |
| Đầu ra | Bật tắt đèn | 12 | [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) | – |
| Đầu ra | Đèn nhấp nháy | 12 | [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) | – |
| Đầu ra | Màn hình OLED chào em | 18 | [Màn hình OLED](/khoa-hoc/thingedu/thingblock/vi-du/sim-04-man-hinh-oled) | – |
| Đầu ra | ThingBot Sim 2: Đèn nhấp nháy | 15 | [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) | [Bài 2](/mo-phong?bai=2) |
| Động cơ | Servo ba cách quay | 18 | [Servo quét](/khoa-hoc/thingedu/thingblock/vi-du/sim-05-servo-quet) | – |
| Động cơ | ThingBot Sim 5: Servo quét | 20 | [Servo quét](/khoa-hoc/thingedu/thingblock/vi-du/sim-05-servo-quet) | [Bài 5](/mo-phong?bai=5) |
| Động cơ | ThingBot Sim 7: Động cơ DC | 15 | [Động cơ DC](/khoa-hoc/thingedu/thingblock/vi-du/sim-07-dong-co-m1) | [Bài 7](/mo-phong?bai=7) |
| Động cơ | ThingBot Sim 8: Xe đi thẳng và rẽ | 20 | [Xe đi thẳng – rẽ](/khoa-hoc/thingedu/thingblock/vi-du/sim-08-xe-di-thang-re) | [Bài 8](/mo-phong?bai=8) |
| Đầu vào | ThingBot Sim 3: Nút bấm điều khiển đèn | 20 | [Nút bấm điều khiển đèn](/khoa-hoc/thingedu/thingblock/vi-du/sim-03-nut-bam-bat-den) | [Bài 3](/mo-phong?bai=3) |
| Đầu vào | ThingBot Sim 4: Màn hình OLED | 20 | [Màn hình OLED](/khoa-hoc/thingedu/thingblock/vi-du/sim-04-man-hinh-oled) | [Bài 4](/mo-phong?bai=4) |
| Đầu vào | ThingBot Sim 6: Mắt hồng ngoại *(0.8)* | 20 | [Mắt hồng ngoại](/khoa-hoc/thingedu/thingblock/vi-du/sim-06-mat-hong-ngoai) | [Bài 6](/mo-phong?bai=6) |
| Đầu vào | ThingBot Sim 9: Tay cầm điều khiển | 20 | [Tay cầm điều khiển](/khoa-hoc/thingedu/thingblock/vi-du/sim-09-tay-cam-ps2) | [Bài 9](/mo-phong?bai=9) |
| Đầu vào | ThingBot Sim 10: Dây chuyền phân loại trứng *(0.8)* | 25 | [Dự án: dây chuyền phân loại trứng](/khoa-hoc/thingedu/thingblock/vi-du/sim-10-day-chuyen-phan-loai) | [Bài 10](/mo-phong?bai=10) |
| Camera AI | Camera AI 1: Tay em trên màn hình *(0.8)* | 15 | Tay em trên sân chơi | – |
| Camera AI | Camera AI 2: Trò Bắt Dế *(0.8)* | 20 | Bắt Dế | – |
| Camera AI | Camera AI 3: Đầu em điều khiển trò chơi *(0.8)* | 20 | Thể dục cổ: nghiêng đầu hứng sao | – |
| Camera AI | Camera AI 4: Dế Xanh vỗ cánh *(0.8)* | 15 | Dế Xanh bay | – |

Bài *Bật tắt đèn*, *Đèn nhấp nháy*, *Màn hình OLED chào em*, *Servo ba cách quay* là bốn bài gốc của ThingBlock (không có trong /mo-phong); mười bài *ThingBot Sim* là bản tự chấm của mười bài mô phỏng. Bốn bài *Camera AI* không cần mạch, dùng webcam hoặc chuột.

*Nguồn: 36 ví dụ và 14 bài học trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); 52 ví dụ và 19 bài học trong ThingBlock 0.8 (nhánh phát hành 0.8, 12/11/2026); lời hướng dẫn và lộ trình của Làng Maker.*
