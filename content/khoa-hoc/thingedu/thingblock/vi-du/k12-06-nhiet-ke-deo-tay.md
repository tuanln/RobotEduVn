---
title: "Nhiệt kế đeo tay"
description: "Đọc nhiệt độ, hiện lên OLED; nóng quá ngưỡng thì đèn đỏ và còi báo."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Đọc cảm biến vào biến, so sánh với ngưỡng, `nếu … thì … nếu không thì`

**Phần cứng:** Cảm biến DHT11 ở IO4; Màn OLED I2C; LED_1; Còi.

**Chạy thử trên:** ThingBot thật (khung Mô phỏng chưa có DHT11).

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Nhiệt kế đeo tay**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-06-nhiet-ke-deo-tay.tb](/hoc-lieu/thingblock/vi-du/k12-06-nhiet-ke-deo-tay.tb)

> Bài 6 · Nhiệt kế đeo tay (K4-M4)
> Cảm biến DHT11 cắm chân IO4. Chương trình đọc nhiệt độ mỗi 2 giây và so với "ngưỡng". Nóng hơn ngưỡng thì đèn sáng và còi kêu. Thử đổi ngưỡng rồi cầm cảm biến trong lòng bàn tay.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động DHT (1) chân [4] loại [DHT11]
khởi động OLED rộng (128) cao (64) địa chỉ I2C [0x3c] chip [SSD1306]
đặt [ngưỡng] thành [32]

vòng lặp Arduino
đặt [nhiệt độ] thành (DHT (1) đọc nhiệt độ [°C])
xoá OLED
đặt chữ OLED cỡ [1] màu [trắng] màu nền [đen]
đặt con trỏ OLED x: (0) y: (0)
OLED in [Nhiet do (C):] [xuống dòng]
đặt chữ OLED cỡ [3] màu [trắng] màu nền [đen]
đặt con trỏ OLED x: (0) y: (20)
OLED in (nhiệt độ) [xuống dòng]
hiện lên màn OLED
nếu <(nhiệt độ) > (ngưỡng)> thì        ← Nếu nóng hơn ngưỡng thì báo, không thì tắt đèn.
  đặt đèn [L1] độ sáng (100)%
  chơi nốt [La 5] trong (0.25) phách
nếu không thì
  đặt đèn [L1] độ sáng (0)%
đợi (2) giây        ← DHT11 chỉ đo được khoảng 1 lần mỗi giây.
```

## Chương trình làm gì

- Khởi động: khai báo **DHT 1 chân 4 loại DHT11** và màn OLED, đặt **ngưỡng** = 32 (độ C).
- Mỗi vòng: đọc nhiệt độ vào biến **nhiệt độ**, in nhãn cỡ 1 ở dòng trên và số đo cỡ 3 ở dòng dưới.
- **Nếu nhiệt độ > ngưỡng** thì L1 sáng và còi kêu La 5; **nếu không thì** tắt L1. Nhánh *nếu không* quan trọng: thiếu nó, đèn sáng rồi không bao giờ tắt.
- **Đợi 2 giây** vì DHT11 chỉ đo được khoảng một lần mỗi giây, đọc dồn dập sẽ ra số sai.

## Thử thách

- Nắm cảm biến trong lòng bàn tay 30 giây: nhiệt độ lên bao nhiêu? Hạ ngưỡng xuống 30 cho dễ thấy.
- Thêm ngưỡng dưới: lạnh hơn 20 °C thì L2 sáng.
- Thay còi kêu liên tục bằng kêu một lần lúc *vừa* vượt ngưỡng (cần một biến nhớ trạng thái, xem ví dụ 10).

← [Đồng hồ đếm giờ chơi](/khoa-hoc/thingedu/thingblock/vi-du/k12-05-dong-ho-dem-gio) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Trạm khí tượng của em](/khoa-hoc/thingedu/thingblock/vi-du/k12-07-tram-khi-tuong) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
