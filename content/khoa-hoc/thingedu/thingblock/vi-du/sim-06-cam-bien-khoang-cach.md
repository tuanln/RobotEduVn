---
title: "Cảm biến khoảng cách"
description: "Vật lại gần hơn 20 cm thì đèn LED_1 sáng báo động."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 2 · vừa · **Khái niệm:** Cảm biến siêu âm, so sánh `<`

**Phần cứng:** Cảm biến siêu âm: TRIG IO0, ECHO IO4; LED_1.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Cảm biến khoảng cách**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-06-cam-bien-khoang-cach.tb](/hoc-lieu/thingblock/vi-du/sim-06-cam-bien-khoang-cach.tb)

> ThingBot Sim · Bài 6: Cảm biến khoảng cách
> Cảm biến siêu âm cắm TRIG IO0, ECHO IO4. Vật gần hơn ngưỡng thì đèn sáng, xa thì tắt.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
nếu <(cảm biến siêu âm chân TRIG [0] ECHO [4] đọc khoảng cách [cm]) < [20]> thì
  đặt đèn [L1] độ sáng (100)%
nếu không thì
  đặt đèn [L1] độ sáng (0)%
đợi (0.05) giây
```

## Chương trình làm gì

- Cảm biến siêu âm HC-SR04 cắm **TRIG IO0, ECHO IO4**; khối **đọc khoảng cách** trả về số cm.
- **Nếu khoảng cách < 20** thì L1 sáng, **nếu không thì** tắt. Đợi 0,05 giây giữa hai lần đo để cảm biến kịp nghe tiếng vọng.
- Trên khung Mô phỏng, kéo thanh trượt *Vật cản cách cảm biến* để thử.

## Thử thách

- Thêm còi: càng gần kêu càng dày (đợi = khoảng cách × 0,01 giây).
- In khoảng cách lên OLED (ghép ví dụ Sim 4).
- Hai ngưỡng: dưới 10 cm hai đèn, 10–20 cm một đèn, xa hơn tắt.

← [Servo quét](/khoa-hoc/thingedu/thingblock/vi-du/sim-05-servo-quet) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Động cơ DC](/khoa-hoc/thingedu/thingblock/vi-du/sim-07-dong-co-m1) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
