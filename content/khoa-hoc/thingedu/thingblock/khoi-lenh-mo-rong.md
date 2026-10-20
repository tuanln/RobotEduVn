---
title: "Khối lệnh mở rộng"
description: "Các ngoại vi thêm vào ThingBot: cảm biến DHT, siêu âm, màn OLED, Serial, MPU6050, núm xoay, servo chân thường, PCA9685, điều khiển bằng điện thoại"
nguon: "ThingEdu"
---

Ngoại vi chỉ có ở **chế độ nạp**. Khi đã chọn bo ThingBot, bấm nút góc dưới trái, chọn **Add** trên thẻ ngoại vi. Dự án lưu lại danh sách ngoại vi nên lần sau mở tệp không phải thêm lại.

| Thẻ trong thư viện | Nhóm khối | Dùng để |
|---|---|---|
| DHT Sensor | DHT | Đo nhiệt độ, độ ẩm |
| Ultrasonic | Ultrasonic | Đo khoảng cách bằng siêu âm HC-SR04 |
| OLED | OLED | Màn hình OLED 0,96" (SSD1306); màn 1,3" (SH1106) *(sau bản 0.4.0)* |
| Serial | Serial | Gửi, nhận chữ qua cổng USB, xem ở khung Monitor |
| MPU6050 Sensor | MPU6050 | Cảm biến gia tốc và con quay 6 trục |
| Rotary Encoder | Encoder | Núm xoay có nút bấm *(sau bản 0.4.0)* |
| Servo | Servo | Servo cắm thẳng vào chân GPIO (không qua cổng S) |
| PCA9685 Module | PCA9685 | Module PWM 16 kênh gắn thêm |
| Phone control | Phone | Cho app điện thoại ThingBot Remote điều khiển robot trong lúc chương trình chạy |
| RGB LED Strip | RGB LED Strip | Dải LED màu NeoPixel |
| PS2 Remote Control | PS2 | Có sẵn theo ThingBot, xem [Khối lệnh ThingBot](/khoa-hoc/thingedu/thingblock/khoi-lenh-thingbot) |

> **RGB LED Strip chưa dùng được với ThingBot ở bản 0.4.0**: thư viện NeoPixel đi kèm không biên dịch được với nhân ESP32 mà ThingBlock cài. Tạm thời dùng LED thường hoặc module LED cắm cổng S.

## DHT — nhiệt độ, độ ẩm

| Khối | Ý nghĩa |
|---|---|
| `init dht (1) pin (2) model [dht11]` | Khởi tạo cảm biến số 1 ở chân đã chọn, loại dht11/dht21/dht22. Với ThingBot, cắm chân dữ liệu vào **IO4** và đặt pin là 4 |
| `dht (1) read temperature [°C]` | Nhiệt độ °C (hoặc °F) |
| `dht (1) read humidity` | Độ ẩm % |

DHT11 cần khoảng 1–2 giây giữa hai lần đọc. Thêm `đợi (2) giây` trong vòng lặp và chờ 2 giây sau khi khởi tạo.

## Ultrasonic — khoảng cách

| Khối | Ý nghĩa |
|---|---|
| `ultrasonic sensor pin TRIG (2) ECHO (3) read distance [cm]` | Khoảng cách tính bằng cm hoặc inch. Không cần khối khởi tạo |

Trên ThingBot dùng TRIG **0**, ECHO **4**. Không có vật phía trước thì khối trả số lớn (khoảng 340 cm trở lên). Khối trả **0** khi cảm biến lỏng dây hoặc hỏng, nên điều kiện "vật ở gần" nên viết là *khoảng cách > 0 **và** khoảng cách < 20*: lỏng dây thì robot không tưởng nhầm là sắp đâm. Cảm biến HC-SR04 loại 5 V trả tín hiệu 5 V vào chân 3,3 V của ESP32-C3: nên dùng loại HC-SR04P (chạy được 3,3 V) hoặc thêm cầu chia áp ở chân ECHO.

## OLED — màn hình

Cắm màn OLED vào cổng I2C trên ThingBotShield (chung đường với chip điều khiển động cơ, không xung đột).

| Khối | Ý nghĩa |
|---|---|
| `init oled width (128) height (64) I2C address [0x78 (0x3c)]` | Khởi tạo màn SSD1306. Sau bản 0.4.0 khối có thêm ô `chip [SSD1306]` để chọn **SH1106** cho màn 1,3" |
| `set oled text size [6x8] color [white] background color [black]` | Cỡ chữ và màu. **Đổi nền sang black**, để mặc định là chữ trắng trên nền trắng |
| `set oled cursor x: (0) y: (0)` | Vị trí bắt đầu in chữ (điểm ảnh) |
| `oled print ( ) [no-warp]` | In chữ hoặc số. `no-warp` in tiếp trên cùng dòng, `warp` in xong xuống dòng |
| `clear oled` | Xóa bộ đệm |
| `refresh oled display` | Đẩy bộ đệm lên màn. **Thiếu khối này thì màn không hiện gì** |
| `oled draw line / rect / circle / round rect / triangle …`, `oled fill …` | Vẽ hình viền hoặc tô kín |
| `oled start scroll [right] …`, `oled stop scroll` | Cuộn chữ (không có tác dụng với chip SH1106) |

Màn OLED không hiện được chữ tiếng Việt có dấu: viết không dấu.

## Serial — trao đổi với máy tính

| Khối | Ý nghĩa |
|---|---|
| `begin serial at [9600] baud` | Mở cổng Serial. Chọn cùng tốc độ với ô baud ở khung Monitor (mặc định 115200) |
| `serial print (Hello)` / `serial print line (Hello)` | In không xuống dòng / có xuống dòng |
| `serial data available?` | Đúng khi máy tính vừa gửi dữ liệu |
| `read serial text` / `read serial number` | Đọc chữ / đọc số máy tính gửi xuống (ô Send message ở khung Monitor) |

## MPU6050 — gia tốc, con quay

| Khối | Ý nghĩa |
|---|---|
| `init mpu6050 accelerometer range [2G] gyro range [250°/s] filter bandwidth [260Hz]` | Khởi tạo, cắm vào cổng I2C |
| `mpu6050 read data` | Đọc một mẫu mới (gọi mỗi vòng) |
| `mpu6050 [x] axis acceleration (m/s^2)` | Gia tốc theo trục x, y, z |
| `mpu6050 [x] axis rotation (rad/s)` | Tốc độ quay theo trục |
| `mpu6050 temperature (℃)` | Nhiệt độ của chip |

## Encoder — núm xoay *(sau bản 0.4.0)*

| Khối | Ý nghĩa |
|---|---|
| `init encoder pin A (2) pin B (10) button pin (7)` | Khởi tạo núm xoay |
| `encoder position` | Số nấc đã xoay (âm khi xoay ngược) |
| `reset encoder position` | Đặt lại về 0 |
| `encoder button pressed?` | Đúng khi núm đang được nhấn |

## Các ngoại vi khác

- **Servo**: `set servo pin (9) to (90) degrees`, servo cắm thẳng vào chân GPIO. Servo cắm cổng S1–S5 thì dùng khối của nhóm ThingBot.
- **PCA9685**: khởi tạo, đặt góc từng kênh hoặc mọi kênh, đặt tần số và giá trị PWM, dành cho module PCA9685 gắn thêm. ThingBot đã có sẵn một chip PCA9685 cho động cơ và cổng S nên thường không cần.
- **Phone control**: `allow phone control, board name (ThingBot)`, đặt trong `khi Arduino khởi động`. Bo phát Bluetooth để app ThingBot Remote lái robot trong lúc chương trình vẫn chạy.
