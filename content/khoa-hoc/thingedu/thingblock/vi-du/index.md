---
title: "36 ví dụ có sẵn"
description: "Mỗi ví dụ trong menu Tập tin → Ví dụ… của ThingBlock 0.6 có một trang hướng dẫn: phần cứng, chương trình dịch ra chữ, chương trình làm gì, thử thách mở rộng"
nguon: "ThingEdu"
---

Từ bản 0.6, ThingBlock có sẵn **36 ví dụ** ở menu **Tập tin → Ví dụ…**, chia bốn nhóm. Mỗi ví dụ dưới đây có một trang hướng dẫn để dùng ngay trong lớp: phần cứng cần cắm, chương trình dịch ra chữ để đọc không cần mở máy, chương trình làm gì, và ba thử thách mở rộng. Tệp `.tb` của từng ví dụ tải được ngay trên trang (cho bản 0.5.0 hoặc để gửi cho học sinh).

**Lộ trình gợi ý:** mười bài **Mô phỏng** trước (không cần mạch), rồi **K12 cơ bản** theo mức 1 → 2 → 3, xen các bài **Âm nhạc** cho buổi nhẹ. Hai robot **FanRoc** dành cho đội chuẩn bị thi. Muốn được chấm từng bước, làm **14 bài học tự chấm** ở menu **Bài học** (danh sách ở cuối trang).

> Bản 0.6.0 đang là bản thử (pre-release 04/11/2026); bản ổn định 0.5.0 chưa có menu Ví dụ và khung Mô phỏng. Xem [Bản 0.6: có gì mới](/khoa-hoc/thingedu/thingblock/ban-0-6) và [Cài đặt](/khoa-hoc/thingedu/thingblock/cai-dat).

## Mô phỏng ThingBot Sim (10 ví dụ)

Mười bài nền tảng, mỗi bài một khối mới, chạy được ngay trên khung **Mô phỏng** không cần mạch. Cùng nội dung với mười bài ở [robot.edu.vn/mo-phong](/mo-phong) và với mười bài học tự chấm *ThingBot Sim 1–10* ở menu **Bài học**.

| # | Ví dụ | Mức | Phần cứng ngoài mạch | Khái niệm |
|---|---|---|---|---|
| 1 | [Làm quen ThingBot](/khoa-hoc/thingedu/thingblock/vi-du/sim-01-lam-quen-thingbot) | 1 | không | Khung chương trình: khởi động chạy một lần, vòng lặp chạy mãi |
| 2 | [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) | 1 | không | Bật, chờ, tắt, chờ: nhấp nháy bằng vòng lặp |
| 3 | [Nút bấm điều khiển đèn](/khoa-hoc/thingedu/thingblock/vi-du/sim-03-nut-bam-bat-den) | 1 | không | Đọc nút, `nếu … thì … nếu không thì` |
| 4 | [Màn hình OLED](/khoa-hoc/thingedu/thingblock/vi-du/sim-04-man-hinh-oled) | 1 | Màn OLED I2C | Khởi động OLED, in chữ, đặt con trỏ, hiện lên màn |
| 5 | [Servo quét](/khoa-hoc/thingedu/thingblock/vi-du/sim-05-servo-quet) | 1 | Servo S1 | Servo quay tới góc trong thời gian cho trước |
| 6 | [Cảm biến khoảng cách](/khoa-hoc/thingedu/thingblock/vi-du/sim-06-cam-bien-khoang-cach) | 2 | Cảm biến siêu âm: TRIG IO0, ECHO IO4 | Cảm biến siêu âm, so sánh `<` |
| 7 | [Động cơ DC](/khoa-hoc/thingedu/thingblock/vi-du/sim-07-dong-co-m1) | 2 | Động cơ M1 | Động cơ DC: chiều tiến/lùi, tốc độ phần trăm |
| 8 | [Xe đi thẳng – rẽ](/khoa-hoc/thingedu/thingblock/vi-du/sim-08-xe-di-thang-re) | 2 | Động cơ M1 (bánh trái), M2 (bánh phải) | Hai bánh cùng chiều đi thẳng, dừng bằng tốc độ 0 |
| 9 | [Tay cầm điều khiển](/khoa-hoc/thingedu/thingblock/vi-du/sim-09-tay-cam-ps2) | 2 | Bộ thu tay cầm PS2 ở cổng PS2; Động cơ M1, M2 | Tay PS2: khởi động, đọc dữ liệu mỗi vòng, hỏi nút |
| 10 | [Dự án: xe tránh vật cản](/khoa-hoc/thingedu/thingblock/vi-du/sim-10-xe-tranh-vat-can) | 2 | Cảm biến siêu âm: TRIG IO0, ECHO IO4; Động cơ M1, M2 | Dự án ghép: cảm biến + động cơ, né vật cản |

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

## 14 bài học tự chấm (menu Bài học)

Khác với ví dụ (mở ra là có chương trình hoàn chỉnh), **bài học** dẫn từng bước: em kéo khối theo hướng dẫn, bấm **Chạy**, mạch ảo tự kiểm tra (đèn có sáng, servo có đúng góc, OLED có đúng chữ…) rồi mới cho sang bước sau. Có gợi ý khi kẹt. Tiến độ lưu trên máy.

| Nhóm | Bài | Phút | Ví dụ tương ứng |
|---|---|---|---|
| Làm quen | ThingBot Sim 1: Làm quen ThingBot | 10 | [Làm quen ThingBot](/khoa-hoc/thingedu/thingblock/vi-du/sim-01-lam-quen-thingbot) |
| Đầu ra | Bật tắt đèn | 10 | [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) |
| Đầu ra | Đèn nhấp nháy | 10 | [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) |
| Đầu ra | Màn hình OLED chào em | 15 | [Màn hình OLED](/khoa-hoc/thingedu/thingblock/vi-du/sim-04-man-hinh-oled) |
| Đầu ra | ThingBot Sim 2: Đèn nhấp nháy | 15 | [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) |
| Động cơ | Servo ba cách quay | 15 | [Servo quét](/khoa-hoc/thingedu/thingblock/vi-du/sim-05-servo-quet) |
| Động cơ | ThingBot Sim 5: Servo quét | 15 | [Servo quét](/khoa-hoc/thingedu/thingblock/vi-du/sim-05-servo-quet) |
| Động cơ | ThingBot Sim 7: Động cơ DC | 15 | [Động cơ DC](/khoa-hoc/thingedu/thingblock/vi-du/sim-07-dong-co-m1) |
| Động cơ | ThingBot Sim 8: Xe đi thẳng và rẽ | 20 | [Xe đi thẳng – rẽ](/khoa-hoc/thingedu/thingblock/vi-du/sim-08-xe-di-thang-re) |
| Đầu vào | ThingBot Sim 3: Nút bấm điều khiển đèn | 15 | [Nút bấm điều khiển đèn](/khoa-hoc/thingedu/thingblock/vi-du/sim-03-nut-bam-bat-den) |
| Đầu vào | ThingBot Sim 4: Màn hình OLED | 15 | [Màn hình OLED](/khoa-hoc/thingedu/thingblock/vi-du/sim-04-man-hinh-oled) |
| Đầu vào | ThingBot Sim 6: Cảm biến khoảng cách | 20 | [Cảm biến khoảng cách](/khoa-hoc/thingedu/thingblock/vi-du/sim-06-cam-bien-khoang-cach) |
| Đầu vào | ThingBot Sim 9: Tay cầm điều khiển | 20 | [Tay cầm điều khiển](/khoa-hoc/thingedu/thingblock/vi-du/sim-09-tay-cam-ps2) |
| Đầu vào | ThingBot Sim 10: Xe tránh vật cản | 25 | [Dự án: xe tránh vật cản](/khoa-hoc/thingedu/thingblock/vi-du/sim-10-xe-tranh-vat-can) |

Bài *Bật tắt đèn*, *Đèn nhấp nháy*, *Màn hình OLED chào em*, *Servo ba cách quay* là bốn bài gốc của ThingBlock (không có trong /mo-phong); mười bài *ThingBot Sim* là bản tự chấm của mười bài mô phỏng.

*Nguồn: 36 ví dụ và 14 bài học trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn và lộ trình của Làng Maker.*
