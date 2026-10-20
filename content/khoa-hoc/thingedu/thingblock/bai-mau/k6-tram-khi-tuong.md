---
title: "K6 — Trạm khí tượng"
description: "Bài mẫu bậc K6: đo nhiệt độ, độ ẩm, kiểm chứng qua Serial, hiển thị lên màn OLED và phân loại thời tiết ba mức"
nguon: "ThingEdu, Maker Việt"
---

**Trần kỹ năng K6:** biến lưu số đo, **hiển thị màn hình**, điều kiện nhiều nhánh, khối tự tạo đơn giản.

**Thiết bị:** ThingBot + DHT11 + màn OLED 0,96" (SSD1306, địa chỉ 0x3C).

**Đấu nối:** chân dữ liệu DHT11 vào **IO4**. Màn OLED cắm cổng **I2C** trên ThingBotShield. Cả hai dùng chung 3,3 V và GND.

**Chế độ:** nạp chương trình (cả V1, V2, V3), vì màn OLED chỉ có ở chế độ nạp. Chọn bo **ThingBot**, thêm các ngoại vi ghi ở từng bước.

## V1 — Buổi 3: Đọc và in ra Serial

**Mục tiêu:** người học kiểm chứng cảm biến hoạt động ổn định trước khi tin vào số liệu.

Ngoại vi: **DHT Sensor**, **Serial**. Sau khi nạp, đặt ô baud ở khung **Monitor** là **115200**.

![Chương trình V1: in nhiệt độ và độ ẩm ra Serial mỗi 2 giây](/hoc-lieu/thingblock/anh/k6-tram-khi-tuong-v1.webp)

📥 [Tải k6-tram-khi-tuong-v1.tb](/hoc-lieu/thingblock/tep/k6-tram-khi-tuong-v1.tb)

```text
khi Arduino khởi động
  init dht (1) pin (4) model [dht11]
  begin serial at [115200] baud

vòng lặp Arduino
  serial print ("Nhiet do: ")
  serial print (dht (1) read temperature [°C])
  serial print (" Do am: ")
  serial print line (dht (1) read humidity)
  đợi (2) giây
```

**Chú thích cho Mentor**

- Buổi này dạy khái niệm **kiểm chứng**: trước khi hiển thị đẹp, phải chắc số liệu đúng đã.
- Cho người học chép 10 số đo liên tiếp ra giấy. Nếu có số nhảy lung tung (hoặc `nan`) thì đó là dữ liệu thật của cảm biến rẻ tiền: bài học lớn hơn nhiều so với việc mọi thứ chạy hoàn hảo.
- Serial chỉ đọc được khi còn cắm cáp USB. V3 sẽ không cần nó.

**Thử thách mở rộng:** tính tay giá trị trung bình của 10 số đo, so với một số đo đơn lẻ.

## V2 — Buổi 5: Hiển thị lên màn hình và đếm lần đo

**Mục tiêu:** trạm tự hiển thị số đo và đếm đã đo bao nhiêu lần.

Ngoại vi: **DHT Sensor**, **OLED**.

![Chương trình V2: đọc nhiệt, ẩm vào biến, in ba dòng lên OLED](/hoc-lieu/thingblock/anh/k6-tram-khi-tuong-v2.webp)

📥 [Tải k6-tram-khi-tuong-v2.tb](/hoc-lieu/thingblock/tep/k6-tram-khi-tuong-v2.tb)

```text
khi Arduino khởi động
  init dht (1) pin (4) model [dht11]
  init oled width (128) height (64) I2C address [0x78 (0x3c)]
  set oled text size [6x8] color [white] background color [black]
  đặt [số lần đo] thành (0)

vòng lặp Arduino
  đặt [nhiệt] thành (dht (1) read temperature [°C])
  đặt [ẩm] thành (dht (1) read humidity)
  thay đổi [số lần đo] một lượng (1)
  clear oled
  set oled cursor x: (0) y: (0)
  oled print ("Nhiet: ") [no-warp]
  oled print (nhiệt) [no-warp]
  set oled cursor x: (0) y: (16)
  oled print ("Am: ") [no-warp]
  oled print (ẩm) [no-warp]
  set oled cursor x: (0) y: (48)
  oled print ("Lan do: ") [no-warp]
  oled print (số lần đo) [no-warp]
  refresh oled display
  đợi (2) giây
```

**Chú thích cho Mentor**

- `refresh oled display` là chỗ vấp kinh điển: OLED có bộ đệm, thiếu khối này thì **vẽ gì cũng không hiện**, và không có báo lỗi. Để các em vấp một lần rồi mới gợi ý.
- `clear oled` mỗi vòng, nếu không chữ mới đè lên chữ cũ thành mớ hỗn độn.
- Nhớ đổi **background color** sang **black**. Để mặc định là chữ trắng trên nền trắng, màn sáng trắng mà không thấy chữ.
- OLED không hiện được tiếng Việt có dấu, viết không dấu. Đây là giới hạn thật của phông chữ, nói thẳng với người học.
- Màn 1,3" thường dùng chip **SH1106**. Bản 0.4.0 chỉ chạy màn SSD1306 (0,96"); ô chọn chip SH1106 có ở bản sau.

**Thử thách mở rộng:** ghi lại số đo mỗi 10 phút trong một buổi, vẽ biểu đồ nhiệt, ẩm trên giấy kẻ ô.

## V3 — Buổi 7: Trạm hoàn chỉnh có cảnh báo

**Mục tiêu:** trạm chạy độc lập, tự phân loại thời tiết thành ba mức, sẵn sàng cho bản tin thời tiết ở Make & Share.

Ngoại vi: **DHT Sensor**, **OLED**. LED 1 trên bo làm đèn cảnh báo.

![Chương trình V3: OLED hiện số đo và NONG / AM UOT / DE CHIU](/hoc-lieu/thingblock/anh/k6-tram-khi-tuong-v3.webp)

📥 [Tải k6-tram-khi-tuong-v3.tb](/hoc-lieu/thingblock/tep/k6-tram-khi-tuong-v3.tb)

```text
khi Arduino khởi động
  init dht (1) pin (4) model [dht11]
  init oled width (128) height (64) I2C address [0x78 (0x3c)]
  set oled text size [6x8] color [white] background color [black]

vòng lặp Arduino
  đặt [nhiệt] …, đặt [ẩm] …
  clear oled
  (in "Nhiet: " nhiệt ở y = 0, "Am: " ẩm ở y = 16)
  set oled cursor x: (0) y: (40)
  nếu <(nhiệt) > (33)> thì
    oled print ("NONG") [no-warp]
    set led [1] (100)
  nếu không thì
    nếu <(ẩm) > (80)> thì
      oled print ("AM UOT") [no-warp]
      set led [1] (100)
    nếu không thì
      oled print ("DE CHIU") [no-warp]
      set led [1] (0)
  refresh oled display
  đợi (2) giây
```

**Chú thích cho Mentor**

- Điều kiện lồng nhau đúng trần K6. Vẽ sơ đồ cây ba nhánh lên bảng **trước khi** kéo khối: người học K6 đã đủ lớn để đọc sơ đồ.
- Ngưỡng 33 °C và 80 % nên do người học tự chọn sau khi xem dữ liệu buổi 5, không phải Mentor đưa. Đó là khác biệt giữa làm khoa học và làm theo mẫu.
- Chuẩn bị sẵn kịch bản "bản tin thời tiết": số đo mà không có câu chuyện thì không ai nhớ.

**Thử thách mở rộng:** gom đoạn in hai dòng số đo thành một **Khối của tôi** tên `vẽ số đo`, để chương trình chính gọn hơn. (Ở bản 0.4.0 khối tự tạo chưa nhận tham số khi nạp, nên tạo khối không có ô nhập.)
