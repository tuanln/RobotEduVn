---
title: "K4 — Nhiệt kế"
description: "Bài mẫu bậc K4: đọc nhiệt độ DHT11, một biến làm ngưỡng, nếu…nếu không thì"
nguon: "ThingEdu, Maker Việt"
---

**Trần kỹ năng K4:** `nếu … thì … nếu không thì`, **một biến** làm ngưỡng, đọc cảm biến và phản ứng.

**Thiết bị:** ThingBot + cảm biến nhiệt độ, độ ẩm **DHT11**.

**Đấu nối:** chân dữ liệu của DHT11 vào **IO4**, VCC vào 3,3 V, GND vào GND. Đèn báo là LED 1 và LED 2 có sẵn trên bo.

**Chế độ:** chạy trực tiếp (V1, V2), nạp chương trình (V3).

## V1 — Buổi 3: Đọc nhiệt độ lần đầu

**Mục tiêu:** người học thấy con số nhiệt độ thật đổi theo vật nóng, lạnh chạm vào cảm biến.

Chọn **No board**, thêm **ThingBot Telemetrix**, bấm **Connect ThingBot**. Số đo hiện ở khung **Monitor**.

![Chương trình V1: in nhiệt độ ra Monitor mỗi 2 giây](/hoc-lieu/thingblock/anh/k4-nhiet-ke-v1.webp)

📥 [Tải k4-nhiet-ke-v1.tb](/hoc-lieu/thingblock/tep/k4-nhiet-ke-v1.tb)

```text
Khi bấm vào [lá cờ xanh]
  setup [DHT11] sensor on pin (4)
  liên tục
    print (temperature (°C) on pin (4))
    đợi (2) giây
```

**Chú thích cho Mentor**

- Vài giây đầu số đo là **0**: cảm biến chưa kịp gửi số nào. Bỏ qua, đó không phải hỏng.
- DHT11 chỉ cho số nguyên và cập nhật khoảng 3 giây một lần. Nói trước để người học khỏi sốt ruột.
- Cho các em áp ngón tay lên cảm biến rồi thả ra, xem số lên xuống. Đó là khoảnh khắc "cảm biến là thật".

**Thử thách mở rộng:** đo ở 3 chỗ trong phòng, đoán trước chỗ nào nóng nhất rồi mới đo.

## V2 — Buổi 5: Ngưỡng cảnh báo

**Mục tiêu:** người học dùng một biến làm ngưỡng và cho đèn phản ứng hai chiều.

![Chương trình V2: nóng hơn ngưỡng thì LED 2 sáng, ngược lại LED 1 sáng](/hoc-lieu/thingblock/anh/k4-nhiet-ke-v2.webp)

📥 [Tải k4-nhiet-ke-v2.tb](/hoc-lieu/thingblock/tep/k4-nhiet-ke-v2.tb)

```text
Khi bấm vào [lá cờ xanh]
  setup [DHT11] sensor on pin (4)
  đặt [ngưỡng] thành (30)
  liên tục
    nếu <(temperature (°C) on pin (4)) > (ngưỡng)> thì
      LED [LED 2] [on]
      LED [LED 1] [off]
    nếu không thì
      LED [LED 2] [off]
      LED [LED 1] [on]
    đợi (1) giây
```

**Chú thích cho Mentor**

- Đặt ngưỡng bằng **biến** chứ không gõ thẳng 30 vào ô so sánh. Cả bài học nằm ở chỗ này: đổi một chỗ, cả chương trình đổi theo.
- Chọn 30 vì nhiệt độ phòng ở Việt Nam thường 28–32 °C, chạm tay vào là vượt ngưỡng: người học thấy đèn đổi sau vài giây.
- Đèn nhấp nháy qua lại quanh ngưỡng là hiện tượng thật của mọi hệ điều khiển. Đừng vội sửa, hỏi các em cách xử lý: hạt giống của khái niệm trễ.

**Thử thách mở rộng:** đổi ngưỡng bằng phím bàn phím (`khi bấm phím …`) thay vì sửa chương trình.

## V3 — Buổi 7: Nhiệt kế chạy độc lập

**Mục tiêu:** nhiệt kế chạy bằng pin, có đèn báo, mang đi Make & Share.

Chọn bo **ThingBot**, thêm ngoại vi **DHT Sensor**, bấm **Upload**.

![Chương trình V3: đọc DHT11 vào biến nhiệt, so với ngưỡng, bật LED](/hoc-lieu/thingblock/anh/k4-nhiet-ke-v3.webp)

📥 [Tải k4-nhiet-ke-v3.tb](/hoc-lieu/thingblock/tep/k4-nhiet-ke-v3.tb)

```text
khi Arduino khởi động
  init dht (1) pin (4) model [dht11]
  đặt [ngưỡng] thành (30)
  đợi (2) giây

vòng lặp Arduino
  đặt [nhiệt] thành (dht (1) read temperature [°C])
  nếu <(nhiệt) > (ngưỡng)> thì
    set led [2] (100)
    set led [1] (0)
  nếu không thì
    set led [2] (0)
    set led [1] (100)
  đợi (2) giây
```

**Chú thích cho Mentor**

- Lưu số đo vào biến `nhiệt` **một lần** rồi mới so sánh, thay vì gọi khối đọc nhiều lần. Với DHT11 điều này còn quan trọng về kỹ thuật: mỗi lần gọi là một lần đọc cảm biến.
- `đợi (2) giây` sau khi khởi tạo và cuối mỗi vòng là bắt buộc với DHT11: đọc dày hơn thì cảm biến trả số cũ hoặc lỗi.
- Vỏ hộp phải để hở cảm biến ra ngoài. Bọc kín thì đo nhiệt độ của chính cái vỏ.

**Thử thách mở rộng:** thêm còi (`play note`) kêu khi vượt ngưỡng, nhưng chỉ kêu **một lần** lúc vừa vượt chứ không kêu liên tục.
