---
title: "Lập trình khối với ThingBlock"
description: "Cài đặt ThingBlock 0.6, mô phỏng và bài học trong app, các khối lệnh cho ThingBot, điều khiển bằng điện thoại và 5 bài mẫu từ K2 đến R4U"
nguon: "ThingEdu"
---

ThingBlock là phần mềm lập trình kéo-thả khối lệnh của ThingEdu, dựng trên nền Scratch. Học sinh xếp khối như Scratch, còn ThingBlock tự đổi chương trình thành mã Arduino C++, biên dịch rồi nạp xuống bo **ThingBot**. ThingBlock miễn phí, mã nguồn mở trên GitHub, chạy trên Windows, macOS và Linux.

> **Mới: ThingBlock 0.6** (bản thử 04/11/2026) có **mô phỏng ThingBot ngay trong app**, **14 bài học tự chấm**, **36 ví dụ có sẵn** (gồm 2 robot FanRoc, mỗi ví dụ có [trang hướng dẫn riêng](/khoa-hoc/thingedu/thingblock/vi-du)), chế độ Live lùi được và dừng được, điều khiển từ điện thoại, lưu tệp và giao diện tiếng Việt. Xem [Bản 0.6: có gì mới](/khoa-hoc/thingedu/thingblock/ban-0-6). Bộ bài học thi **FanRoc 2026–2027 đang chuẩn bị, sắp ra**.

Khóa [Tài liệu người dùng ThingBot](/khoa-hoc/thingedu/thingbot) hướng dẫn lập trình bằng phần mềm cũ ThingEduBlock (dựa trên OpenBlock). Khóa này dành cho ThingBlock, phần mềm mới. Phần giới thiệu bộ kit và video lắp ráp ThingBot ở khóa cũ vẫn dùng chung được; cách dùng từng bộ phận với ThingBlock xem ở trang [Làm quen ThingBot](/khoa-hoc/thingedu/thingblock/lam-quen-thingbot).

## Nội dung khóa học

- [Bản 0.6: có gì mới](/khoa-hoc/thingedu/thingblock/ban-0-6) — mô phỏng trong app, 14 bài học, 36 ví dụ, Live sửa lỗi, điều khiển từ điện thoại
- [Cài đặt ThingBlock](/khoa-hoc/thingedu/thingblock/cai-dat) — tải bản cài, mở lần đầu, tải gói bo ESP32
- [Làm quen giao diện](/khoa-hoc/thingedu/thingblock/lam-quen) — chọn bo, hai chế độ chạy, mô phỏng, lưu và mở dự án
- [Làm quen ThingBot](/khoa-hoc/thingedu/thingblock/lam-quen-thingbot) — bộ phận nào ứng với khối nào, nguồn pin, chương trình kiểm tra bo, xe mecanum
- [Khối lệnh cơ bản](/khoa-hoc/thingedu/thingblock/khoi-lenh-co-ban) — Sự kiện, Điều khiển, Phép toán, Biến, Khối của tôi, Arduino
- [Khối lệnh ThingBot](/khoa-hoc/thingedu/thingblock/khoi-lenh-thingbot) — động cơ, servo, LED, còi, nút SW, tay PS2 và chế độ chạy trực tiếp
- [Khối lệnh mở rộng](/khoa-hoc/thingedu/thingblock/khoi-lenh-mo-rong) — cảm biến DHT, siêu âm, màn OLED, Serial, MPU6050…
- [Điều khiển bằng điện thoại](/khoa-hoc/thingedu/thingblock/dieu-khien-bang-dien-thoai) — khối Phone control, tải app ThingBot Remote (APK), lái qua Bluetooth
- [36 ví dụ có sẵn](/khoa-hoc/thingedu/thingblock/vi-du) — hướng dẫn từng ví dụ của menu Tập tin → Ví dụ…: 10 mô phỏng, 18 K12, 2 FanRoc, 6 bài nhạc; 14 bài học tự chấm
- [5 bài mẫu](/khoa-hoc/thingedu/thingblock/bai-mau) — Robot vũ công, Đèn giao thông, Nhiệt kế, Trạm khí tượng, Robot cảm nhận
- [Sửa lỗi thường gặp](/khoa-hoc/thingedu/thingblock/sua-loi) — không thấy bo, nạp lỗi, Bluetooth, động cơ, cảm biến

## Thử trên mô phỏng, chưa cần mạch

Từ bản 0.6, ThingBlock có sẵn khung **Mô phỏng** và menu **Bài học** ngay trong app (xem [Bản 0.6: có gì mới](/khoa-hoc/thingedu/thingblock/ban-0-6)). Chưa cài ThingBlock thì dùng bản web dưới đây.

[ThingBot Sim](/mo-phong?bai=1) là mạch ThingBot ảo chạy ngay trên trình duyệt (máy tính hoặc máy tính bảng), không cần cài gì. Học sinh xếp **đúng các khối ThingBlock**, bấm Chạy rồi xem tín hiệu đi từ nút bấm vào chip, qua chip PCA9685 tới đèn, servo và động cơ. Mỗi bài tự chấm và có gợi ý khi làm sai.

| Bài | Nội dung |
|---|---|
| [1](/mo-phong?bai=1) | Làm quen ThingBot: tìm 13 bộ phận trên mạch |
| [2](/mo-phong?bai=2) | Đèn nhấp nháy |
| [3](/mo-phong?bai=3) | Nút bấm điều khiển đèn |
| [4](/mo-phong?bai=4) | Màn hình OLED |
| [5](/mo-phong?bai=5) | Servo quét |
| [6](/mo-phong?bai=6) | Mắt hồng ngoại: nhận bóng FanRoc sáng, tối |
| [7](/mo-phong?bai=7) | Động cơ DC |
| [8](/mo-phong?bai=8) | Xe đi thẳng, rẽ |
| [9](/mo-phong?bai=9) | Lái xe bằng tay cầm PS2 |
| [10](/mo-phong?bai=10) | Dự án: dây chuyền phân loại trứng |

Bài làm lưu trong trình duyệt của từng máy. Mô phỏng không nạp được xuống mạch thật: muốn chạy trên ThingBot, xếp lại các khối đó trong ThingBlock rồi bấm Nạp. Mã nguồn mở tại [ThingEdu/thingbot-sim](https://github.com/ThingEdu/thingbot-sim).

## Cần chuẩn bị

- Máy tính Windows 10/11 (64-bit), máy Mac chip Apple (M1 trở lên) hoặc Linux 64-bit (Ubuntu/Debian/Fedora).
- Bo ThingBot (gồm mạch ThingBot và ThingBotShield) cùng một dây USB Type-C **truyền được dữ liệu**. Dây chỉ để sạc thì máy không nhận bo.
- Kết nối Internet cho lần đầu dùng ThingBot, để tải gói bo ESP32.

> Các trang trong khóa viết theo **ThingBlock 0.4.0** (26/09/2026) và được cập nhật theo **0.5.0** (30/10/2026) và **0.6.0 bản thử** (04/11/2026). Chỗ nào ghi *(từ bản 0.5.0)* hay *(từ bản 0.6)* là tính năng chỉ có ở bản đó trở đi. Bản thử 0.6 còn lấy góp ý nên tên nút có thể đổi.
