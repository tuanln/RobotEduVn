---
title: "Servo quét"
description: "Servo S1 quay qua lại giữa 0 và 180 độ, mỗi lượt trong 1 giây."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 1 · dễ · **Khái niệm:** Servo quay tới góc trong thời gian cho trước

**Phần cứng:** Servo S1.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Servo quét**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-05-servo-quet.tb](/hoc-lieu/thingblock/vi-du/sim-05-servo-quet.tb)

> ThingBot Sim · Bài 5: Servo quét
> Khối "move servo … over … seconds" cho servo quay mượt tới góc đích.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
quay servo [S1] tới góc (0) độ trong (1) giây
quay servo [S1] tới góc (180) độ trong (1) giây
```

## Chương trình làm gì

- Servo S1 quay giữa **0** và **180 độ**, mỗi lượt đúng **1 giây**, lặp mãi. Khối **quay servo … tới góc … trong … giây** chờ servo tới nơi rồi mới chạy khối tiếp theo.
- Trên khung Mô phỏng, cần servo S1 quét qua lại; trên mạch thật, servo cắm cổng S1 (chân tín hiệu đúng chiều).
- Khối **đặt servo … góc** (ví dụ K12 số 20) quay *ngay lập tức*, giật hơn nhưng nhanh.

## Thử thách

- Quét 0 → 90 → 180 → 90 → 0 để servo dừng ở giữa.
- Đổi 1 giây thành 0,2 giây rồi 5 giây.
- Hai servo S1, S2 quét ngược chiều nhau *cùng lúc* (cần cặp **bắt đầu quay servo** + **chờ các servo quay xong**, xem bài học *Servo ba cách quay*).

← [Màn hình OLED](/khoa-hoc/thingedu/thingblock/vi-du/sim-04-man-hinh-oled) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Cảm biến khoảng cách](/khoa-hoc/thingedu/thingblock/vi-du/sim-06-cam-bien-khoang-cach) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
