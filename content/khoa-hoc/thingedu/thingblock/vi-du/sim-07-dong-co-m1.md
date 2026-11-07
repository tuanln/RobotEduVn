---
title: "Động cơ DC"
description: "Động cơ M1 quay tới 2 giây rồi quay lùi 2 giây, lặp mãi."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 2 · vừa · **Khái niệm:** Động cơ DC: chiều tiến/lùi, tốc độ phần trăm

**Phần cứng:** Động cơ M1.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Làm quen online, không cần cài gì:** bài này là [Bài 7 trên ThingBot Sim](/mo-phong?bai=7), mạch ảo chạy trên trình duyệt máy tính hoặc máy tính bảng, tự chấm và có gợi ý. Ở Làng, học sinh làm bài online trước, rồi mới mở ThingBlock.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Động cơ DC**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-07-dong-co-m1.tb](/hoc-lieu/thingblock/vi-du/sim-07-dong-co-m1.tb)

> ThingBot Sim · Bài 7: Động cơ DC
> Bật công tắc nguồn động cơ trên mạch trước khi chạy. Tốc độ từ 0% (dừng) đến 100% (nhanh nhất).

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
động cơ [M1] chạy [tiến] tốc độ (60)%
đợi (2) giây
động cơ [M1] chạy [lùi] tốc độ (60)%
đợi (2) giây
```

## Chương trình làm gì

- Động cơ M1 chạy **tiến 60 %** 2 giây rồi **lùi 60 %** 2 giây, lặp mãi.
- Tốc độ từ 0 % (dừng) đến 100 %. Dưới khoảng 30 % động cơ thường không đủ lực quay.
- Mạch thật: bật công tắc nguồn pin trước khi chạy, nguồn USB không đủ cho động cơ.

## Thử thách

- Thêm M2 chạy ngược chiều M1: hai bánh ngược nhau thì xe làm gì?
- Tăng dần tốc độ 20 → 40 → 60 → 80 → 100, mỗi mức 1 giây, rồi dừng 2 giây.
- Thêm nút SW: bấm mới chạy, nhả thì dừng.

← [Cảm biến khoảng cách](/khoa-hoc/thingedu/thingblock/vi-du/sim-06-cam-bien-khoang-cach) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Xe đi thẳng – rẽ](/khoa-hoc/thingedu/thingblock/vi-du/sim-08-xe-di-thang-re) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
