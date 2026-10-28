---
title: "Lập trình khối với ThingBlock"
description: "Cài đặt ThingBlock, làm quen giao diện, các khối lệnh cho ThingBot và 5 bài mẫu từ K2 đến R4U"
nguon: "ThingEdu"
---

ThingBlock là phần mềm lập trình kéo-thả khối lệnh của ThingEdu, dựng trên nền Scratch. Học sinh xếp khối như Scratch, còn ThingBlock tự đổi chương trình thành mã Arduino C++, biên dịch rồi nạp xuống bo **ThingBot**. ThingBlock miễn phí, mã nguồn mở trên GitHub, chạy trên Windows, macOS và Linux.

Khóa [Tài liệu người dùng ThingBot](/khoa-hoc/thingedu/thingbot) hướng dẫn lập trình bằng phần mềm cũ ThingEduBlock (dựa trên OpenBlock). Khóa này dành cho ThingBlock, phần mềm mới. Phần giới thiệu bộ kit và video lắp ráp ThingBot ở khóa cũ vẫn dùng chung được; cách dùng từng bộ phận với ThingBlock xem ở trang [Làm quen ThingBot](/khoa-hoc/thingedu/thingblock/lam-quen-thingbot).

## Nội dung khóa học

- [Cài đặt ThingBlock](/khoa-hoc/thingedu/thingblock/cai-dat) — tải bản cài, mở lần đầu, tải gói bo ESP32
- [Làm quen giao diện](/khoa-hoc/thingedu/thingblock/lam-quen) — chọn bo, hai chế độ chạy, lưu và mở dự án
- [Làm quen ThingBot](/khoa-hoc/thingedu/thingblock/lam-quen-thingbot) — bộ phận nào ứng với khối nào, nguồn pin, chương trình kiểm tra bo, xe mecanum
- [Khối lệnh cơ bản](/khoa-hoc/thingedu/thingblock/khoi-lenh-co-ban) — Sự kiện, Điều khiển, Phép toán, Biến, Khối của tôi, Arduino
- [Khối lệnh ThingBot](/khoa-hoc/thingedu/thingblock/khoi-lenh-thingbot) — động cơ, servo, LED, còi, nút SW, tay PS2 và chế độ chạy trực tiếp
- [Khối lệnh mở rộng](/khoa-hoc/thingedu/thingblock/khoi-lenh-mo-rong) — cảm biến DHT, siêu âm, màn OLED, Serial, MPU6050…
- [5 bài mẫu](/khoa-hoc/thingedu/thingblock/bai-mau) — Robot vũ công, Đèn giao thông, Nhiệt kế, Trạm khí tượng, Robot cảm nhận
- [Sửa lỗi thường gặp](/khoa-hoc/thingedu/thingblock/sua-loi) — không thấy bo, nạp lỗi, Bluetooth, động cơ, cảm biến

## Thử trên mô phỏng, chưa cần mạch

[ThingBot Sim](/mo-phong?bai=1) là mạch ThingBot ảo chạy ngay trên trình duyệt (máy tính hoặc máy tính bảng), không cần cài gì. Học sinh xếp **đúng các khối ThingBlock**, bấm Chạy rồi xem tín hiệu đi từ nút bấm vào chip, qua chip PCA9685 tới đèn, servo và động cơ. Mỗi bài tự chấm và có gợi ý khi làm sai.

| Bài | Nội dung |
|---|---|
| [1](/mo-phong?bai=1) | Làm quen ThingBot: tìm 13 bộ phận trên mạch |
| [2](/mo-phong?bai=2) | Đèn nhấp nháy |
| [3](/mo-phong?bai=3) | Nút bấm điều khiển đèn |
| [4](/mo-phong?bai=4) | Màn hình OLED |
| [5](/mo-phong?bai=5) | Servo quét |
| [6](/mo-phong?bai=6) | Cảm biến khoảng cách (siêu âm) |
| [7](/mo-phong?bai=7) | Động cơ DC |
| [8](/mo-phong?bai=8) | Xe đi thẳng, rẽ |
| [9](/mo-phong?bai=9) | Lái xe bằng tay cầm PS2 |
| [10](/mo-phong?bai=10) | Dự án: xe tránh vật cản |

Bài làm lưu trong trình duyệt của từng máy. Mô phỏng không nạp được xuống mạch thật: muốn chạy trên ThingBot, xếp lại các khối đó trong ThingBlock rồi bấm Nạp. Mã nguồn mở tại [ThingEdu/thingbot-sim](https://github.com/ThingEdu/thingbot-sim).

## Cần chuẩn bị

- Máy tính Windows 10/11 (64-bit), máy Mac chip Apple (M1 trở lên) hoặc Linux 64-bit (Ubuntu/Debian/Fedora).
- Bo ThingBot (gồm mạch ThingBot và ThingBotShield) cùng một dây USB Type-C **truyền được dữ liệu**. Dây chỉ để sạc thì máy không nhận bo.
- Kết nối Internet cho lần đầu dùng ThingBot, để tải gói bo ESP32.

> Các trang trong khóa viết theo **ThingBlock 0.4.0** (phát hành 26/09/2026). Những chỗ ghi *(sau bản 0.4.0)* là tính năng đã có trong mã nguồn nhưng chưa vào bản cài đặt: ngoại vi Rotary Encoder và ô chọn chip SH1106 cho màn OLED. Bản sau có thể đổi tên nút hoặc thêm khối.
