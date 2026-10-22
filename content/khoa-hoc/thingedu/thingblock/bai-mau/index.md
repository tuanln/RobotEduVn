---
title: "5 bài mẫu"
description: "Năm dự án ThingBlock theo bậc kỹ năng K2, K3, K4, K6, R4U, mỗi bài ba bước V1–V2–V3 kèm tệp .tb tải về"
nguon: "ThingEdu, Maker Việt"
---

Mỗi bài mẫu đi qua ba buổi theo nhịp **7+1**:

- **V1 (buổi 3)**: một ý tưởng nhỏ, chạy được ngay.
- **V2 (buổi 5)**: thêm đúng một khái niệm mới (khối lặp, điều kiện, biến…).
- **V3 (buổi 7)**: sản phẩm hoàn chỉnh, nạp xuống bo để chạy độc lập khi trưng bày ở buổi Make & Share.

Mỗi chương trình có ảnh khối và **tệp .tb** để tải về, mở bằng **Tập tin → Load from your computer**. Cả 11 chương trình chế độ nạp đã được biên dịch thử cho ThingBot bằng ThingBlock 0.4.0.

| Bài | Thiết bị | Khái niệm chính | Chế độ |
|---|---|---|---|
| [K2 — Robot vũ công](/khoa-hoc/thingedu/thingblock/bai-mau/k2-robot-vu-cong) | ThingBot nguyên bộ | Tuần tự, `lặp lại`, khối chờ | Live (V1, V2), nạp (V3) |
| [K3 — Đèn giao thông](/khoa-hoc/thingedu/thingblock/bai-mau/k3-den-giao-thong) | ThingBot + 3 module LED | Điều kiện `nếu … thì` đầu tiên | Nạp |
| [K4 — Nhiệt kế](/khoa-hoc/thingedu/thingblock/bai-mau/k4-nhiet-ke) | ThingBot + DHT11 | Đọc cảm biến, một biến, `nếu … nếu không thì` | Live (V1, V2), nạp (V3) |
| [K6 — Trạm khí tượng](/khoa-hoc/thingedu/thingblock/bai-mau/k6-tram-khi-tuong) | ThingBot + DHT11 + OLED | Kiểm chứng số liệu, hiển thị, điều kiện lồng nhau | Nạp |
| [R4U — Robot cảm nhận](/khoa-hoc/thingedu/thingblock/bai-mau/r4u-robot-cam-nhan) | ThingBot + siêu âm + tay PS2 | Cảm biến, biến trạng thái, Khối của tôi | Nạp |

## Chân cắm dùng trong các bài

| Thiết bị | Cắm vào |
|---|---|
| Động cơ bánh trái, bánh phải | Cổng M1, M2 |
| DHT11 | Chân dữ liệu vào **IO4**, nguồn 3,3 V và GND |
| Siêu âm HC-SR04P | TRIG vào **IO0**, ECHO vào **IO4** |
| Module LED 3 chân | Cổng S1, S2, S3 (GND, 5V, tín hiệu) |
| Màn OLED | Cổng I2C |
| Bộ thu tay PS2 | Cổng PS2, đúng thứ tự chân |

LED 1, LED 2, còi và nút **SW** có sẵn trên bo, không cần cắm thêm.

Trước bài đầu tiên, chạy [chương trình kiểm tra ThingBot](/khoa-hoc/thingedu/thingblock/lam-quen-thingbot) với từng robot để biết bánh nào ở cổng nào và chắc động cơ, servo đều chạy.

> **An toàn khi chạy Live**: bấm Stop **không** tắt động cơ. Các bài Live đều có đoạn `khi bấm phím phím trắng` để phanh: bấm phím cách là robot dừng. Kê robot lên giá hoặc đặt trên sàn, đừng chạy thử trên mặt bàn.

*Nguồn: lô thử 5 bài mẫu của The Lab — Maker Việt × ThingEdu (11/08/2026), chỉnh lại theo ThingBlock 0.4.0.*
