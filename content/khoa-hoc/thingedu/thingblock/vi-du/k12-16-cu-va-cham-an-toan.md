---
title: "Cú va chạm an toàn"
description: "Xe lao vào thành chắn, đo gia tốc đỉnh khi va chạm; so sánh có đệm và không đệm."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 3 · khó · **Khái niệm:** Cảm biến gia tốc, độ lớn vectơ, giữ giá trị lớn nhất, đơn vị g

**Phần cứng:** Cảm biến gia tốc MPU6050 (I2C); Màn OLED I2C; Động cơ M1, M2; Nút SW.

**Chạy thử trên:** ThingBot thật (khung Mô phỏng chưa có MPU6050).

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Cú va chạm an toàn**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-16-cu-va-cham-an-toan.tb](/hoc-lieu/thingblock/vi-du/k12-16-cu-va-cham-an-toan.tb)

> Bài 16 · Cú va chạm an toàn (K8-M1)
> Bấm SW: xe chạy thẳng 2 giây vào thành chắn. Chương trình đọc gia tốc 3 trục, tính độ lớn a = căn(ax² + ay² + az²) và giữ giá trị lớn nhất. Làm lại với thành chắn có đệm xốp rồi so sánh hai con số.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động mpu6050 dải gia tốc [±8 g] dải con quay [500 °/s] băng thông lọc [21 Hz]
khởi động OLED rộng (128) cao (64) địa chỉ I2C [0x3c] chip [SSD1306]
đặt chữ OLED cỡ [2] màu [trắng] màu nền [đen]

vòng lặp Arduino
xoá OLED
đặt con trỏ OLED x: (0) y: (0)
OLED in [Bam SW] [xuống dòng]
hiện lên màn OLED
đợi cho đến khi <đọc nút SW>
đợi (1) giây
đặt [lớn nhất] thành [0]
đặt [đếm] thành [0]
động cơ [M1] chạy [tiến] tốc độ (80)%
động cơ [M2] chạy [tiến] tốc độ (80)%
lặp lại cho đến khi <(đếm) > [199]>        ← Đo 200 lần trong khoảng 2 giây.
  mpu6050 đọc dữ liệu
  đặt [a] thành (căn bậc hai của ((((mpu6050 gia tốc trục [x] (m/s²)) × (mpu6050 gia tốc trục [x] (m/s²))) + ((mpu6050 gia tốc trục [y] (m/s²)) × (mpu6050 gia tốc trục [y] (m/s²)))) + ((mpu6050 gia tốc trục [z] (m/s²)) × (mpu6050 gia tốc trục [z] (m/s²)))))
  nếu <(a) > (lớn nhất)> thì
    đặt [lớn nhất] thành (a)
  thay đổi [đếm] một lượng (1)
  đợi (0.01) giây
động cơ [M1] chạy [tiến] tốc độ (0)%
động cơ [M2] chạy [tiến] tốc độ (0)%
xoá OLED        ← Đổi m/s² ra "g" (1 g = 9,8 m/s²).
đặt con trỏ OLED x: (0) y: (0)
OLED in [Dinh (g):] [xuống dòng]
OLED in ((làm tròn (((lớn nhất) ÷ (9.8)) × (10))) × (0.1)) [xuống dòng]
hiện lên màn OLED
đợi (5) giây
```

## Chương trình làm gì

- Cần module **MPU6050** cắm cổng I2C (cùng cổng với OLED, hai thiết bị khác địa chỉ nên dùng chung được).
- Bấm SW, đợi 1 giây rồi xe lao 80 % về phía thành chắn. Vòng đo **200 lần**, mỗi lần 0,01 giây (khoảng 2 giây): đọc gia tốc 3 trục, tính **a = căn bậc hai (ax² + ay² + az²)**, nếu a lớn hơn **lớn nhất** thì ghi lại.
- Dừng xe, in **Dinh (g)** = lớn nhất ÷ 9,8, làm tròn một chữ số thập phân (nhân 10, làm tròn, nhân 0,1). Đứng yên, a ≈ 1 g vì trọng lực; va chạm mạnh có thể lên 3–5 g.
- Làm hai lần: thành chắn cứng và thành có đệm xốp. Số nhỏ hơn là va chạm *mềm* hơn: đó là lý do xe hơi có vùng hấp thụ lực.

## Thử thách

- Lặp thí nghiệm 3 lần mỗi loại thành chắn, ghi bảng, lấy trung bình. Hai lần có ra cùng số không?
- Đổi tốc độ 80 % thành 50 %: đỉnh gia tốc giảm bao nhiêu?
- In cả thời điểm (số lần đo) lúc đạt đỉnh để biết va chạm xảy ra sau bao lâu.

← [Robot vượt chướng ngại](/khoa-hoc/thingedu/thingblock/vi-du/k12-15-vuot-chuong-ngai) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Xe điều khiển từ xa](/khoa-hoc/thingedu/thingblock/vi-du/k12-17-xe-dieu-khien-tu-xa) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
