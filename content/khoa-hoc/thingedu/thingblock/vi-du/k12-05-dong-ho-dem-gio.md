---
title: "Đồng hồ đếm giờ chơi"
description: "Bấm SW để bắt đầu đếm ngược 30 giây trên OLED; hết giờ thì còi kêu."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Đếm ngược bằng biến, in biến lên OLED, cỡ chữ

**Phần cứng:** Nút SW; Màn OLED I2C (thay ma trận LED); Còi.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Đồng hồ đếm giờ chơi**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-05-dong-ho-dem-gio.tb](/hoc-lieu/thingblock/vi-du/k12-05-dong-ho-dem-gio.tb)

> Bài 5 · Đồng hồ đếm giờ chơi (K2-M4)
> Bấm nút SW để bắt đầu. Biến "còn lại" giảm 1 sau mỗi giây và hiện trên màn OLED. Hết giờ, còi kêu báo. Đổi 30 thành số giây em muốn.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động OLED rộng (128) cao (64) địa chỉ I2C [0x3c] chip [SSD1306]

vòng lặp Arduino
xoá OLED
đặt chữ OLED cỡ [2] màu [trắng] màu nền [đen]
đặt con trỏ OLED x: (0) y: (0)
OLED in [Bam SW] [xuống dòng]
OLED in [de bat dau] [xuống dòng]
hiện lên màn OLED
đợi cho đến khi <đọc nút SW>
đợi cho đến khi <không phải <đọc nút SW>>
đợi (0.05) giây
đặt [còn lại] thành [30]
đặt chữ OLED cỡ [4] màu [trắng] màu nền [đen]
lặp lại cho đến khi <(còn lại) < [0]>        ← Mỗi vòng lặp chờ 1 giây rồi bớt 1, nên đồng hồ đếm theo giây.
  xoá OLED
  đặt con trỏ OLED x: (32) y: (16)
  OLED in (còn lại) [xuống dòng]
  hiện lên màn OLED
  đợi (1) giây
  thay đổi [còn lại] một lượng (-1)
lặp lại (3) lần        ← Hết giờ: còi kêu 3 lần.
  đặt đèn [L1] độ sáng (100)%
  chơi nốt [Đô 6] trong (0.5) phách
  đặt đèn [L1] độ sáng (0)%
  nghỉ (0.5) phách
```

## Chương trình làm gì

- Màn hình in lời mời *Bam SW de bat dau* (OLED chỉ hiện chữ không dấu) rồi chờ một lần bấm và nhả nút.
- Biến **còn lại** đặt 30. Vòng **lặp lại cho đến khi còn lại < 0**: in số, đợi 1 giây, bớt 1. Điều kiện là `< 0` chứ không phải `= 0` để số 0 cũng được hiện lên 1 giây.
- Hết giờ: 3 lần đèn L1 sáng cùng nốt **Đô 6** nửa phách, nghỉ nửa phách. Vòng lặp Arduino quay lại màn chờ.
- Cỡ chữ 2 cho lời mời, cỡ 4 cho số đếm: khối **đặt chữ OLED cỡ** đổi cỡ cho mọi lần in sau nó.

## Thử thách

- Đổi 30 thành thời gian đánh răng (120 giây). Số 3 chữ số có còn vừa màn không? Chỉnh con trỏ x.
- Bấm SW lần nữa trong lúc đếm thì dừng lại (gợi ý: thêm điều kiện vào `lặp lại cho đến khi`, như ví dụ 8).
- Hiện phút:giây thay vì tổng số giây (cần `làm tròn xuống` và phép chia).

← [Robot thú cưng](/khoa-hoc/thingedu/thingblock/vi-du/k12-04-robot-thu-cung) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Nhiệt kế đeo tay](/khoa-hoc/thingedu/thingblock/vi-du/k12-06-nhiet-ke-deo-tay) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
