---
title: "Trạm khí tượng của em"
description: "Đo nhiệt độ và độ ẩm, hiện lên OLED kèm lời nhận xét thời tiết."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Hai cảm biến, `kết hợp` chữ với số, điều kiện lồng nhau

**Phần cứng:** Cảm biến DHT11 ở IO4; Màn OLED I2C; LED_1, LED_2.

**Chạy thử trên:** ThingBot thật (khung Mô phỏng chưa có DHT11).

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Trạm khí tượng của em**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-07-tram-khi-tuong.tb](/hoc-lieu/thingblock/vi-du/k12-07-tram-khi-tuong.tb)

> Bài 7 · Trạm khí tượng (K6-M4)
> Đo nhiệt độ và độ ẩm không khí rồi nhận xét: NONG (trên 32°C), AM UOT (độ ẩm trên 85%) hay DE CHIU. Ghi số đo vào vở mỗi giờ để vẽ biểu đồ thời tiết của lớp.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động DHT (1) chân [4] loại [DHT11]
khởi động OLED rộng (128) cao (64) địa chỉ I2C [0x3c] chip [SSD1306]
đặt chữ OLED cỡ [1] màu [trắng] màu nền [đen]

vòng lặp Arduino
đặt [nhiệt độ] thành (DHT (1) đọc nhiệt độ [°C])
đặt [độ ẩm] thành (DHT (1) đọc độ ẩm)
xoá OLED
đặt con trỏ OLED x: (0) y: (0)
OLED in (kết hợp [Nhiet do: ] (nhiệt độ)) [xuống dòng]
đặt con trỏ OLED x: (0) y: (16)
OLED in (kết hợp [Do am: ] (độ ẩm)) [xuống dòng]
đặt con trỏ OLED x: (0) y: (40)
nếu <(nhiệt độ) > [32]> thì        ← Nhận xét: kiểm tra nóng trước, rồi đến ẩm.
  OLED in [=> NONG] [xuống dòng]
  đặt đèn [L1] độ sáng (100)%
  đặt đèn [L2] độ sáng (0)%
nếu không thì
  nếu <(độ ẩm) > [85]> thì
    OLED in [=> AM UOT] [xuống dòng]
    đặt đèn [L1] độ sáng (0)%
    đặt đèn [L2] độ sáng (100)%
  nếu không thì
    OLED in [=> DE CHIU] [xuống dòng]
    đặt đèn [L1] độ sáng (0)%
    đặt đèn [L2] độ sáng (0)%
hiện lên màn OLED
đợi (2) giây
```

## Chương trình làm gì

- Đọc **nhiệt độ** và **độ ẩm** từ DHT11 vào hai biến, in lên hai dòng OLED bằng khối **kết hợp** (ghép chữ *Nhiet do:* với số đo).
- Nhận xét ở dòng y 40 bằng điều kiện lồng nhau: nóng hơn 32 °C thì *NONG* (L1 sáng); không thì xét tiếp độ ẩm trên 85 % là *AM UOT* (L2 sáng); còn lại là *DE CHIU* (tắt đèn). Thứ tự kiểm tra quyết định kết quả khi vừa nóng vừa ẩm.
- Tất cả in vào bộ nhớ màn, cuối cùng mới **hiện lên màn OLED** một lần nên màn không nhấp nháy.

## Thử thách

- Ghi số đo vào vở mỗi giờ trong một ngày rồi vẽ biểu đồ. Giờ nào nóng nhất?
- Đổi thứ tự: xét ẩm trước, nóng sau. Khi nào kết quả khác đi?
- Thêm nhận xét thứ tư *LANH* dưới 18 °C.

← [Nhiệt kế đeo tay](/khoa-hoc/thingedu/thingblock/vi-du/k12-06-nhiet-ke-deo-tay) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Bảng tin của lớp](/khoa-hoc/thingedu/thingblock/vi-du/k12-08-bang-tin-lop) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
