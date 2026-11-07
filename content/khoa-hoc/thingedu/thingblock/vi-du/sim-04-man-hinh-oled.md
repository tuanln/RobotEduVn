---
title: "Màn hình OLED"
description: "Khởi động màn OLED, in hai dòng chữ rồi làm mới màn hình."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 1 · dễ · **Khái niệm:** Khởi động OLED, in chữ, đặt con trỏ, hiện lên màn

**Phần cứng:** Màn OLED I2C.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Làm quen online, không cần cài gì:** bài này là [Bài 4 trên ThingBot Sim](/mo-phong?bai=4), mạch ảo chạy trên trình duyệt máy tính hoặc máy tính bảng, tự chấm và có gợi ý. Ở Làng, học sinh làm bài online trước, rồi mới mở ThingBlock.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Màn hình OLED**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-04-man-hinh-oled.tb](/hoc-lieu/thingblock/vi-du/sim-04-man-hinh-oled.tb)

> ThingBot Sim · Bài 4: Màn hình OLED
> Màn OLED cắm cổng I2C. Viết chữ vào bộ nhớ màn hình rồi phải "refresh" thì chữ mới hiện ra.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động OLED rộng (128) cao (64) địa chỉ I2C [0x3c] chip [SSD1306]
OLED in [Xin chao] [xuống dòng]
đặt con trỏ OLED x: (0) y: (16)
OLED in [ThingBot] [xuống dòng]
hiện lên màn OLED

vòng lặp Arduino
```

## Chương trình làm gì

- Màn OLED 128 × 64 điểm cắm cổng I2C, địa chỉ 0x3c, chip SSD1306: khối **khởi động OLED** để nguyên các số này.
- **OLED in** viết chữ vào *bộ nhớ* màn hình; **đặt con trỏ OLED x 0 y 16** xuống dòng thứ hai (mỗi dòng chữ cỡ 1 cao 8 điểm, y 16 là cách một dòng); **hiện lên màn OLED** mới thật sự vẽ ra. Thiếu khối cuối, màn vẫn trắng.
- Mọi khối nằm trong khởi động nên chữ in một lần rồi giữ nguyên; vòng lặp rỗng.
- OLED chỉ hiện chữ không dấu.

## Thử thách

- Chuyển các khối sang vòng lặp và thêm **xoá OLED** ở đầu: có gì khác? Thêm **đợi** xem màn có nhấp nháy không.
- In tên em cỡ chữ 2 (khối **đặt chữ OLED cỡ**).
- Đếm số giây từ lúc bật máy lên màn (biến + đợi 1 giây).

← [Nút bấm điều khiển đèn](/khoa-hoc/thingedu/thingblock/vi-du/sim-03-nut-bam-bat-den) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Servo quét](/khoa-hoc/thingedu/thingblock/vi-du/sim-05-servo-quet) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
