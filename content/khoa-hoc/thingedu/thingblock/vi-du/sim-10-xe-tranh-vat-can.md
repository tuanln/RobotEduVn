---
title: "Dự án: xe tránh vật cản"
description: "Dự án: xe tự đi thẳng, gặp vật cản gần hơn 25 cm thì xoay né."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 2 · vừa · **Khái niệm:** Dự án ghép: cảm biến + động cơ, né vật cản

**Phần cứng:** Cảm biến siêu âm: TRIG IO0, ECHO IO4; Động cơ M1, M2.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Làm quen online, không cần cài gì:** bài này là [Bài 10 trên ThingBot Sim](/mo-phong?bai=10), mạch ảo chạy trên trình duyệt máy tính hoặc máy tính bảng, tự chấm và có gợi ý. Ở Làng, học sinh làm bài online trước, rồi mới mở ThingBlock.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Dự án: xe tránh vật cản**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-10-xe-tranh-vat-can.tb](/hoc-lieu/thingblock/vi-du/sim-10-xe-tranh-vat-can.tb)

> ThingBot Sim · Bài 10: Dự án: xe tránh vật cản
> Ghép bài 6 và bài 8: vật ở gần thì xoay, không thì đi thẳng.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
nếu <(cảm biến siêu âm chân TRIG [0] ECHO [4] đọc khoảng cách [cm]) < [25]> thì
  động cơ [M1] chạy [tiến] tốc độ (50)%
  động cơ [M2] chạy [lùi] tốc độ (50)%
nếu không thì
  động cơ [M1] chạy [tiến] tốc độ (50)%
  động cơ [M2] chạy [tiến] tốc độ (50)%
đợi (0.05) giây
```

## Chương trình làm gì

- Ghép Sim 6 và Sim 8: **nếu khoảng cách < 25** thì M1 tiến, M2 lùi (xoay né); **nếu không thì** hai bánh tiến 50 % (đi thẳng). Đợi 0,05 giây rồi đo lại.
- Xe xoay cho đến khi cảm biến không còn thấy vật trong 25 cm thì tự đi thẳng tiếp: không cần khối đợi riêng cho việc xoay.
- Trên khung Mô phỏng kéo thanh khoảng cách xuống dưới 25 để xem bánh đổi chiều.

## Thử thách

- Lùi 0,3 giây trước khi xoay để xe không cọ vào vật.
- Xoay ngẫu nhiên trái hoặc phải (khối số ngẫu nhiên, xem ví dụ K12 số 15).
- Xa vật thì chạy nhanh (80 %), gần dưới 50 cm chạy chậm (40 %), dưới 25 cm xoay.

← [Tay cầm điều khiển](/khoa-hoc/thingedu/thingblock/vi-du/sim-09-tay-cam-ps2) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Đèn hội trăng rằm](/khoa-hoc/thingedu/thingblock/vi-du/k12-01-den-hoi-trang-ram) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
