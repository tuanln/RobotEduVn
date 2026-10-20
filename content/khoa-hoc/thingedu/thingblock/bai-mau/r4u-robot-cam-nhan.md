---
title: "R4U — Robot cảm nhận"
description: "Bài mẫu bậc R4U: robot né vật cản bằng siêu âm, ba vùng khoảng cách, chuyển tự lái và lái tay bằng PS2 với Khối của tôi"
nguon: "ThingEdu, Maker Việt"
---

**Trần kỹ năng R4U:** toàn bộ kỹ năng khối: chuyển động, cảm biến, điều kiện, biến, khối tự tạo.

**Thiết bị:** ThingBot + cảm biến siêu âm **HC-SR04P** (loại chạy 3,3 V) + tay cầm PS2 (V3).

**Đấu nối:** siêu âm: VCC, GND, **TRIG vào IO0**, **ECHO vào IO4**. Bộ thu PS2 cắm cổng PS2 trên ThingBotShield. Động cơ trái M1, phải M2.

**Chế độ:** nạp chương trình (cả V1, V2, V3). Chọn bo **ThingBot**, thêm ngoại vi **Ultrasonic**.

> Dùng HC-SR04 loại 5 V thì chân ECHO trả 5 V vào chân 3,3 V của ESP32-C3. Hãy dùng loại HC-SR04P hoặc thêm cầu chia áp (hai điện trở) ở chân ECHO.

## V1 — Buổi 3: Phản ứng theo khoảng cách

**Mục tiêu:** robot tự dừng trước vật cản, người học thấy `nếu … nếu không thì` điều khiển hành vi thật.

![Chương trình V1: vật gần hơn 20 cm thì dừng và kêu, không thì chạy tới](/hoc-lieu/thingblock/anh/r4u-robot-cam-nhan-v1.webp)

📥 [Tải r4u-robot-cam-nhan-v1.tb](/hoc-lieu/thingblock/tep/r4u-robot-cam-nhan-v1.tb)

```text
vòng lặp Arduino
  đặt [khoảng cách] thành (ultrasonic sensor pin TRIG (0) ECHO (4) read distance [cm])
  nếu <<(khoảng cách) > (0)> và <(khoảng cách) < (20)>> thì
    set motor [M1] go [forward] at (0)
    set motor [M2] go [forward] at (0)
    play note [C (Do)] octave [5] for (0.25) beats
  nếu không thì
    set motor [M1] go [forward] at (50)
    set motor [M2] go [forward] at (50)
  đợi (0.05) giây
```

**Chú thích cho Mentor**

- Điều kiện `khoảng cách > 0` loại bỏ số 0 mà cảm biến trả về khi sóng không dội về. Thiếu nó, robot dừng khựng giữa đường trống. Để các em tự phát hiện rồi mới hỏi "số 0 nghĩa là gì".
- Siêu âm **không thấy vật mềm và vật đặt chéo**: khăn, áo, tường nghiêng đều nuốt sóng. Cho người học thử với bìa cứng rồi với áo khoác.
- 20 cm là khoảng để robot kịp dừng ở tốc độ 50. Chạy nhanh hơn thì phải tăng ngưỡng: quan hệ này đáng để các em tự đo.

**Thử thách mở rộng:** đo quãng đường phanh ở tốc độ 30, 50, 80, lập bảng, chọn ngưỡng an toàn cho từng tốc độ.

## V2 — Buổi 5: Ba vùng khoảng cách, ba kiểu phản ứng

**Mục tiêu:** robot phân biệt "đường thoáng", "sắp tới vật" và "sát vật", phản ứng khác nhau, và đếm số lần phải né.

![Chương trình V2: sát dưới 10 cm thì lùi và xoay, dưới 25 cm thì chạy chậm, còn lại chạy nhanh](/hoc-lieu/thingblock/anh/r4u-robot-cam-nhan-v2.webp)

📥 [Tải r4u-robot-cam-nhan-v2.tb](/hoc-lieu/thingblock/tep/r4u-robot-cam-nhan-v2.tb)

```text
khi Arduino khởi động
  đặt [số lần né] thành (0)

vòng lặp Arduino
  đặt [khoảng cách] thành (ultrasonic … read distance [cm])
  nếu <(khoảng cách) > (0) và (khoảng cách) < (10)> thì
    thay đổi [số lần né] một lượng (1)
    set motor [M1] go [backward] at (50)
    set motor [M2] go [backward] at (50)
    đợi (0.6) giây
    set motor [M1] go [forward] at (50)
    set motor [M2] go [backward] at (50)
    đợi (0.4) giây
  nếu không thì
    nếu <(khoảng cách) > (0) và (khoảng cách) < (25)> thì
      (hai động cơ forward tốc độ 30)
    nếu không thì
      (hai động cơ forward tốc độ 70)
  đợi (0.05) giây
```

**Chú thích cho Mentor**

- Thứ tự kiểm tra rất quan trọng: vùng **sát** phải xét **trước** vùng **gần**. Đảo lại thì robot cứ bò chậm vào tường mà không bao giờ lùi. Đây là bài học về độ ưu tiên.
- Biến `số lần né` không điều khiển gì cả: nó là **dữ liệu để suy ngẫm**. Thêm ngoại vi Serial để in ra, cuối buổi hỏi nhóm nào ít phải né nhất và vì sao.
- Lùi rồi xoay là mẫu thoát hiểm kinh điển. Thời gian 0,6 s và 0,4 s cần chỉnh theo pin: pin đầy thì robot xoay nhiều hơn.

**Thử thách mở rộng:** cho robot nhớ lần trước đã xoay bên nào để lần sau xoay hướng ngược lại.

## V3 — Buổi 7: Tự lái và lái tay bằng PS2

**Mục tiêu:** robot tự chạy né vật cản; người học bấm **START** trên tay PS2 để chuyển giữa tự lái và lái tay. Đây là bài thi đấu của Make & Share.

![Chương trình V3: chương trình chính gọi hai Khối của tôi là tự lái và lái tay](/hoc-lieu/thingblock/anh/r4u-robot-cam-nhan-v3.webp)

📥 [Tải r4u-robot-cam-nhan-v3.tb](/hoc-lieu/thingblock/tep/r4u-robot-cam-nhan-v3.tb)

```text
khi Arduino khởi động
  init PS2 on ThingBot
  đặt [tự động] thành (1)

vòng lặp Arduino
  read PS2 receiver data
  nếu <PS2 [start] button is pressed?> thì
    đặt [tự động] thành ((1) - (tự động))
    đợi (0.5) giây
  nếu <(tự động) = (1)> thì
    tự lái
  nếu không thì
    lái tay
  đợi (0.02) giây

định nghĩa [tự lái]
  đặt [khoảng cách] thành (ultrasonic … read distance [cm])
  nếu <(khoảng cách) > (0) và (khoảng cách) < (15)> thì
    (M1 forward 60, M2 backward 60: xoay tránh)
  nếu không thì
    (M1, M2 forward 60: chạy thẳng)

định nghĩa [lái tay]
  nếu <PS2 [up] …> thì tiến
  nếu không thì nếu <PS2 [down] …> thì lùi
  nếu không thì nếu <PS2 [left] …> thì xoay trái
  nếu không thì nếu <PS2 [right] …> thì xoay phải
  nếu không thì dừng
```

**Chú thích cho Mentor**

- `đặt [tự động] thành ((1) - (tự động))` là mẹo lật công tắc bằng phép trừ: 1 thành 0, 0 thành 1. Nhiều em sẽ viết `nếu tự động = 1 thì đặt 0, nếu không thì đặt 1`: cũng đúng, cứ để các em dùng cách mình hiểu rồi mới giới thiệu cách gọn.
- `đợi (0.5) giây` sau khi bấm START là chống dội. Thiếu nó, một lần bấm bị đếm thành nhiều lần và chế độ nhảy loạn.
- Hai **Khối của tôi** `tự lái` và `lái tay` là điểm nhấn của R4U: chương trình chính đọc được như một câu, chi tiết giấu bên trong. Đây là lần đầu người học thấy **trừu tượng hóa** có ích thật.
- `init PS2 on ThingBot` chờ tới khi thấy bộ thu PS2: chưa cắm bộ thu thì robot đứng yên. Bật tay cầm trước khi bật robot.
- Thi đấu tính giờ thì quy định pin: nhóm dùng pin gần cạn sẽ có thông số hoàn toàn khác.

**Thử thách mở rộng:** ghi lại thời gian mỗi lần chạy thử, mỗi lần chỉ chỉnh một tham số, lập bảng để chứng minh cải tiến: đúng tinh thần kỹ thuật thực nghiệm.
