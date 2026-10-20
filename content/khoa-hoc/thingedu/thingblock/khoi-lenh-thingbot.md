---
title: "Khối lệnh ThingBot"
description: "Động cơ, servo, LED, còi, nhạc, nút SW, tay PS2 khi nạp chương trình; 14 khối ThingBot Telemetrix khi chạy trực tiếp"
nguon: "ThingEdu"
---

Tên khối phần cứng hiện **tiếng Anh**. Bảng dưới ghi đúng chữ trên khối kèm nghĩa tiếng Việt.

## Nhóm ThingBot (chế độ nạp)

Có sẵn khi chọn bo ThingBot. Các khối tự khởi tạo mạch nên không cần khối khởi tạo riêng.

| Khối | Ý nghĩa |
|---|---|
| `init ThingBot` | Khởi tạo bo. Không bắt buộc: mọi khối ThingBot đã tự khởi tạo |
| `set motor [M1] go [forward] at (0)` | Chạy động cơ M1–M4 tiến (**forward**) hoặc lùi (**backward**), tốc độ 0–100. Tốc độ 0 là dừng |
| `set servo [S1] to angle (90) degrees` | Quay servo ở cổng S1–S5 tới góc 0–180° |
| `move servo [S1] to angle (90) degrees over (1) seconds` | Quay từ từ tới góc trong số giây đã cho, xong mới chạy khối sau |
| `start servo [S1] to angle (90) degrees over (1) seconds` | Bắt đầu quay từ từ nhưng chạy tiếp ngay, nhờ đó nhiều servo quay cùng lúc |
| `wait for servos` | Chờ mọi servo vừa `start` quay xong |
| `release servo [S1]` | Ngắt xung, servo thả lỏng |
| `set servo [S1] to pulse (0)` | Đặt độ rộng xung thô 0–4095 cho cổng S. Đặt 4095 thì chân tín hiệu gần như luôn ở mức cao, dùng để bật module LED cắm cổng S |
| `set led [1] (0)` | Độ sáng LED 1 hoặc LED 2 trên bo, 0–100 |
| `set tempo to (120) BPM` | Nhịp nhạc (số phách mỗi phút) |
| `play note [C (Do)] octave [4] for (1) beats` | Còi phát nốt Đô…Si, quãng 3–6, trong số phách đã cho |
| `rest for (1) beats` | Nghỉ (im lặng) theo phách |
| `set buzzer to (0) pulse` | Bật/tắt còi: 0 là tắt, số khác 0 là kêu liên tục. Muốn ra nốt nhạc thì dùng `play note` |
| `read switch` | Đúng khi nút **SW** trên ThingBotShield đang được bấm |
| `init PS2 on ThingBot` | Khởi tạo bộ thu tay PS2 cắm cổng PS2 của ThingBotShield |

Lưu ý:

- Khi còi đang phát nốt, tín hiệu servo bị xáo trộn một chút. Đừng vừa phát nhạc vừa điều khiển servo chính xác.
- "Tiến" hay "lùi" thực tế phụ thuộc cách cắm dây động cơ. Chạy thử, nếu bánh quay ngược thì đảo giắc cắm hoặc đổi forward/backward.

## Nhóm PS2 (chế độ nạp)

Tay cầm PS2 không dây đi kèm ThingBot nên nhóm này có sẵn.

| Khối | Ý nghĩa |
|---|---|
| `read PS2 receiver data` | Đọc trạng thái tay cầm. Gọi mỗi vòng lặp, trước khi hỏi nút |
| `PS2 [up] button is pressed?` | Đúng khi nút đang được bấm: up, down, left, right, triangle, circle, cross, square, L1–L3, R1–R3, select, start |
| `PS2 get joystick [LX]` | Vị trí cần analog LX, LY, RX, RY: 0–255, ở giữa khoảng 128 |
| `init PS2 receiver pin DIN (2) DOUT (3) CS (4) CLK (5)` | Khởi tạo bộ thu PS2 cắm ở chân tự chọn. Với ThingBot dùng `init PS2 on ThingBot` |

`init PS2 on ThingBot` chờ tới khi bộ thu trả lời. Nếu chưa cắm bộ thu, robot đứng yên ở bước này.

## ThingBot Telemetrix (chế độ chạy trực tiếp)

Thêm bằng nút **Thêm phần mở rộng** khi chọn **No board**. Xem cách kết nối ở trang [Làm quen giao diện](/khoa-hoc/thingedu/thingblock/lam-quen).

![Chương trình Live: đọc DHT11 và bật LED trên bo](/hoc-lieu/thingblock/anh/06-live-k4.webp)

| Khối | Ý nghĩa |
|---|---|
| `motor [M1] speed (50)` | Tốc độ động cơ 0–100 (chỉ chạy tiến). 0 là dừng |
| `servo [S1] angle (90)` | Góc servo 0–180° |
| `LED [LED 1] [on]` | Bật/tắt LED 1 hoặc LED 2 trên bo |
| `buzzer frequency (50)` | Còi kêu, mức 0 (tắt) tới 100 |
| `setup [DHT11] sensor on pin (4)` | Khai báo cảm biến DHT11/DHT22 ở chân |
| `temperature (°C) on pin (4)` | Nhiệt độ đọc từ DHT |
| `humidity (%) on pin (4)` | Độ ẩm đọc từ DHT |
| `setup ultrasonic trigger (7) echo (8)` | Khai báo cảm biến siêu âm |
| `ultrasonic distance (cm)` | Khoảng cách đo bằng siêu âm |
| `set pin (13) mode [OUTPUT]`, `digital write pin`, `digital read pin`, `analog read pin`, `PWM write pin` | Điều khiển chân trực tiếp |

Ở bản 0.4.0, chế độ Live được kiểm chứng với động cơ chạy tiến, LED, còi và DHT. Các khối chân và siêu âm ở Live còn lỗi với firmware đi kèm: dùng chế độ nạp cho những việc đó. DHT cập nhật khoảng 3 giây một lần, và trong vài giây đầu khối nhiệt độ trả về 0 vì chưa có số đo nào.
