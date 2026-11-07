---
title: "Tay cầm điều khiển"
description: "Giữ nút ▲ thì xe đi tới, ▼ thì lùi, nhả ra thì dừng."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 2 · vừa · **Khái niệm:** Tay PS2: khởi động, đọc dữ liệu mỗi vòng, hỏi nút

**Phần cứng:** Bộ thu tay cầm PS2 ở cổng PS2; Động cơ M1, M2.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Làm quen online, không cần cài gì:** bài này là [Bài 9 trên ThingBot Sim](/mo-phong?bai=9), mạch ảo chạy trên trình duyệt máy tính hoặc máy tính bảng, tự chấm và có gợi ý. Ở Làng, học sinh làm bài online trước, rồi mới mở ThingBlock.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Tay cầm điều khiển**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-09-tay-cam-ps2.tb](/hoc-lieu/thingblock/vi-du/sim-09-tay-cam-ps2.tb)

> ThingBot Sim · Bài 9: Tay cầm điều khiển
> Khối "init PS2 on ThingBot" dùng đúng chân cổng PS2 của mạch. Đọc tay cầm ở đầu mỗi vòng lặp.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động tay cầm PS2 trên ThingBot

vòng lặp Arduino
đọc dữ liệu tay cầm PS2
nếu <nút [lên] của PS2 đang bấm?> thì
  động cơ [M1] chạy [tiến] tốc độ (50)%
  động cơ [M2] chạy [tiến] tốc độ (50)%
nếu không thì
  nếu <nút [xuống] của PS2 đang bấm?> thì
    động cơ [M1] chạy [lùi] tốc độ (50)%
    động cơ [M2] chạy [lùi] tốc độ (50)%
  nếu không thì
    động cơ [M1] chạy [tiến] tốc độ (0)%
    động cơ [M2] chạy [tiến] tốc độ (0)%
đợi (0.02) giây
```

## Chương trình làm gì

- **Khởi động tay cầm PS2 trên ThingBot** dùng đúng chân của cổng PS2 trên mạch. Ở đầu mỗi vòng phải **đọc dữ liệu tay cầm PS2**, sau đó mới hỏi nút.
- Giữ **▲** thì hai bánh tiến 50 %; không thì nếu giữ **▼** hai bánh lùi; không giữ gì thì tốc độ 0. Điều kiện lồng *nếu không thì → nếu* xét ưu tiên ▲ trước ▼.
- Trên khung Mô phỏng có tay cầm PS2 ảo để bấm thử.

## Thử thách

- Thêm ◀ ▶: một bánh tiến, một bánh lùi để xoay.
- Nút ○ bấm còi, nút □ bật đèn.
- Dùng cần analog để tốc độ theo độ đẩy: ví dụ K12 số 17.

← [Xe đi thẳng – rẽ](/khoa-hoc/thingedu/thingblock/vi-du/sim-08-xe-di-thang-re) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Dự án: xe tránh vật cản](/khoa-hoc/thingedu/thingblock/vi-du/sim-10-xe-tranh-vat-can) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
