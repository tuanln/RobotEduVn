---
title: "Xe đi thẳng – rẽ"
description: "Hai bánh cùng quay tới 2 giây cho xe đi thẳng rồi dừng; đổi chiều một bánh để xe xoay."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 2 · vừa · **Khái niệm:** Hai bánh cùng chiều đi thẳng, dừng bằng tốc độ 0

**Phần cứng:** Động cơ M1 (bánh trái), M2 (bánh phải).

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Xe đi thẳng – rẽ**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-08-xe-di-thang-re.tb](/hoc-lieu/thingblock/vi-du/sim-08-xe-di-thang-re.tb)

> ThingBot Sim · Bài 8: Xe đi thẳng – rẽ
> Hai bánh quay cùng chiều: xe đi thẳng. Ngược chiều: xe xoay tại chỗ.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
động cơ [M1] chạy [tiến] tốc độ (50)%
động cơ [M2] chạy [tiến] tốc độ (50)%
đợi (2) giây
động cơ [M1] chạy [tiến] tốc độ (0)%
động cơ [M2] chạy [tiến] tốc độ (0)%

vòng lặp Arduino
```

## Chương trình làm gì

- Trong **khởi động** (chạy một lần): M1 và M2 cùng tiến 50 % trong 2 giây rồi đặt tốc độ 0. Xe đi thẳng một đoạn rồi đứng yên; vòng lặp rỗng.
- Dừng xe là đặt tốc độ 0, không có khối *dừng* riêng. Quên khối này thì xe chạy mãi.
- Hai bánh ngược chiều thì xe xoay tại chỗ (xem ví dụ K12 số 12, 13).

## Thử thách

- Thêm sau khi dừng: M1 tiến, M2 lùi trong 0,6 giây để xe rẽ phải, rồi đi thẳng tiếp.
- Chuyển sang vòng lặp: xe đi thẳng 2 giây, dừng 1 giây, lặp mãi.
- Vẽ hình vuông (bốn lần đi thẳng + rẽ 90 độ) — ví dụ K12 số 14 làm tiếp.

← [Động cơ DC](/khoa-hoc/thingedu/thingblock/vi-du/sim-07-dong-co-m1) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Tay cầm điều khiển](/khoa-hoc/thingedu/thingblock/vi-du/sim-09-tay-cam-ps2) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
