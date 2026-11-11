---
title: "Mắt hồng ngoại"
description: "Mắt nhận bóng FanRoc: bóng tối màu (xanh dương, đen) thì đèn L1 sáng, bóng sáng màu thì tắt."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 2 · vừa · **Khái niệm:** Mắt hồng ngoại, ngưỡng, so sánh `<`

**Phần cứng:** Mắt hồng ngoại cắm cổng cảm biến, chân tín hiệu **IO4**; đèn L1.

**Làm quen online, không cần cài gì:** bài này là [Bài 6 trên ThingBot Sim](/mo-phong?bai=6). Mạch ảo có thanh **Bóng** để đặt từng quả bóng FanRoc trước mắt, tự chấm và có gợi ý. Ở Làng, học sinh làm bài online trước, rồi mới mở ThingBlock.

**Mở ví dụ:** ThingBlock 0.8 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Mắt hồng ngoại**. Khối mắt hồng ngoại có từ bản 0.8: bản 0.6 trở về trước mở tệp này sẽ thiếu khối. 📥 [Tải sim-06-mat-hong-ngoai.tb](/hoc-lieu/thingblock/vi-du/sim-06-mat-hong-ngoai.tb)

> ThingBot Sim · Bài 6: Mắt hồng ngoại
> Nhiệm vụ: robot FanRoc phải biết quả bóng trước mặt là quả tối màu hay sáng màu. Tối màu thì đèn L1 sáng.

## Giống cơ thể người

Mắt hồng ngoại giống em **rọi đèn pin vào đồ vật trong phòng tối**. Đồ màu sáng hắt ánh sáng lại nhiều, đồ màu tối "nuốt" ánh sáng. Mắt có một bóng đèn hồng ngoại (người không nhìn thấy) và một "con ngươi" đo xem ánh sáng hắt lại nhiều hay ít, rồi báo cho não một con số từ 0 tới 4095.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
nếu <(đọc mắt hồng ngoại [1 · IO4]) < [1500]> thì        ← 1500 là ngưỡng sáng/tối.
  đặt đèn [L1] độ sáng (100)%
nếu không thì
  đặt đèn [L1] độ sáng (0)%
đợi (0.05) giây        ← Mỗi giây mắt nhìn 20 lần.
```

## Chương trình làm gì

- Khối **đọc mắt hồng ngoại [1 · IO4]** (nhóm **Cobot IR**) trả về một số: hắt lại càng nhiều, số càng lớn.
- **Nếu số đọc < 1500** thì đèn L1 sáng, **nếu không thì** tắt. Mắt chỉ đưa ra con số, còn đèn chỉ cần biết có hay không: **ngưỡng** 1500 biến con số thành "tối" hoặc "sáng".
- Khối ghi "1 · IO4" vì trên xe CoBot, mắt số 1 cũng nằm ở chân IO4.

| Bóng | Số đọc trên mạch ảo | So với 1500 |
|---|---|---|
| trắng | khoảng 3500 | sáng |
| vàng | khoảng 3100 | sáng |
| đỏ | khoảng 2300 | sáng |
| xanh dương | khoảng 1100 | tối |
| đen | khoảng 300 | tối |

Trên robot thật, số đọc còn đổi theo khoảng cách từ mắt tới bóng và đèn trong phòng. Em đặt từng quả, xem số, rồi tự chọn ngưỡng nằm giữa hai nhóm.

**Mắt hồng ngoại không thấy màu.** Đỏ và vàng khác hẳn nhau với mắt người, nhưng mắt hồng ngoại chỉ thấy hắt lại nhiều hay ít, nên hai quả này cho số gần nhau. Muốn biết chắc "đây là bóng đỏ" thì dùng **cảm biến màu (I2C)** trong mục mở rộng của ThingBlock 0.8: nó có ba "con ngươi" đỏ, lục, lam như ba loại tế bào nhìn màu trong mắt người.

## Thử thách

- Hiện số đọc lên màn OLED (ghép ví dụ Sim 4), ghi lại số của từng quả bóng vào vở.
- Thêm còi: bóng tối màu thì còi kêu một tiếng ngắn.
- Ghép với ví dụ Sim 10: dùng mắt này để lựa trứng trên băng chuyền.

← [Servo quét](/khoa-hoc/thingedu/thingblock/vi-du/sim-05-servo-quet) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Động cơ DC](/khoa-hoc/thingedu/thingblock/vi-du/sim-07-dong-co-m1) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.8 (bản thử 0.8.0-preview-20261112, kho ThingEdu/thingblock-editor), viết theo bài 6 của [ThingBot Sim](https://github.com/ThingEdu/thingbot-sim); chân mắt hồng ngoại theo xe CoBot của Maker Việt; lời hướng dẫn của Làng Maker.*
