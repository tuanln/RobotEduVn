---
title: "Làm quen giao diện"
description: "Thanh menu, chọn bo ThingBot, thêm ngoại vi, hai chế độ chạy (nạp chương trình và chạy trực tiếp), lưu và mở dự án"
nguon: "ThingEdu"
---

## Các vùng trên màn hình

![Giao diện ThingBlock khi đã chọn bo ThingBot](/hoc-lieu/thingblock/anh/08-che-do-nap.webp)

- **Thanh menu** (trên cùng): Settings (ngôn ngữ, giao diện sáng/tối), **Tập tin**, **Chỉnh sửa**, nút chọn bo (**Select board** hoặc **Board: ThingBot**), ô tên dự án, **Hướng dẫn**.
- **Cột danh mục** (trái): các nhóm khối có chấm màu, bấm vào để nhảy tới nhóm đó.
- **Hộp khối**: các khối của nhóm đang chọn. Kéo khối sang vùng lập trình.
- **Vùng lập trình** (giữa): nơi xếp khối. Ba nút tròn ở góc dưới để phóng to, thu nhỏ và về cỡ mặc định.
- **Cột bên phải**: nút điều khiển bo, khung **Generated Code** (mã Arduino C++ do ThingBlock sinh ra, chỉ đọc) và khung **Monitor** (xem dữ liệu bo gửi lên qua cổng Serial).
- **Nút góc dưới trái** (hình khối có dấu +): thêm ngoại vi hoặc phần mở rộng.

## Chọn bo ThingBot

Bấm **Select board**. Hộp **Choose a Device** hiện các bo được hỗ trợ:

![Hộp chọn bo: No board, Arduino Uno, Arduino Nano, ESP32, ESP32-C3, ThingBot, VIA Banh Mi](/hoc-lieu/thingblock/anh/02-chon-bo.webp)

Chọn thẻ **ThingBot**. Cột danh mục có thêm các nhóm **Arduino**, **ThingBot** và **PS2**, nút trên menu đổi thành **Board: ThingBot**.

![Danh mục khối sau khi chọn ThingBot](/hoc-lieu/thingblock/anh/03-da-chon-thingbot.webp)

## Thêm ngoại vi (cảm biến, màn hình…)

Khi đã chọn ThingBot, bấm nút góc dưới trái để mở **Choose a Peripheral**. Bấm **Add** trên thẻ cần dùng, ví dụ **DHT Sensor** để đo nhiệt độ. Nhóm khối mới xuất hiện ở cột danh mục. Thẻ ghi **Included** là ngoại vi đã có sẵn theo bo (tay PS2 đi kèm ThingBot).

![Thư viện ngoại vi: DHT, Rotary Encoder, MPU6050, OLED, PCA9685, Phone control, PS2, RGB LED Strip, Serial, Servo, Ultrasonic](/hoc-lieu/thingblock/anh/04-thu-vien-ngoai-vi.webp)

Danh sách đầy đủ ở trang [Khối lệnh mở rộng](/khoa-hoc/thingedu/thingblock/khoi-lenh-mo-rong).

## Hai cách chạy chương trình

ThingBlock có hai chế độ. Mỗi dự án chỉ dùng một chế độ, khối của chế độ này không chạy được ở chế độ kia.

| | Nạp chương trình | Chạy trực tiếp (Live) |
|---|---|---|
| Chọn bo | **ThingBot** | **No board**, rồi thêm phần mở rộng **ThingBot Telemetrix** |
| Khối bắt đầu | `khi Arduino khởi động`, `vòng lặp Arduino` | `Khi bấm vào` lá cờ xanh, `khi bấm phím …` |
| Chương trình chạy ở đâu | Trên bo, sau khi nạp | Trên máy tính, gửi lệnh xuống bo qua Bluetooth |
| Rút dây hoặc tắt máy tính | Bo **vẫn chạy** | Chương trình dừng |
| Số khối phần cứng | Đầy đủ: động cơ, servo, nhạc, OLED, cảm biến… | 14 khối cơ bản |
| Hợp với | Sản phẩm hoàn chỉnh, mang đi trưng bày | Thử nhanh, sửa là chạy ngay |

### Nạp chương trình

1. Chọn bo **ThingBot**, xếp khối dưới `khi Arduino khởi động` (chạy một lần lúc bật) và `vòng lặp Arduino` (chạy lặp mãi).
2. Cắm dây USB, bấm **Connect** và chọn cổng của bo.
3. Bấm **Upload**. ThingBlock lần lượt báo *Compiling your project…* (đang biên dịch), *Writing to your board…* (đang ghi xuống bo) và *Your board is ready to go.* (xong). Lần nạp đầu lâu hơn các lần sau.
4. Muốn xem số liệu bo gửi lên, thêm ngoại vi **Serial**, dùng khối `serial print line` và xem ở khung **Monitor** (chọn đúng tốc độ baud).

### Chạy trực tiếp (Live)

1. Chọn **No board** trong hộp chọn bo (hoặc mở dự án mới, mặc định là không có bo).
2. Bấm nút góc dưới trái (**Thêm phần mở rộng**), chọn **ThingBot Telemetrix**.

   ![Hộp Chọn Phần mở rộng với thẻ ThingBot Telemetrix](/hoc-lieu/thingblock/anh/05-thu-vien-mo-rong.webp)

3. Trên thanh menu xuất hiện nút **Connect ThingBot**. Bấm vào, bật nguồn ThingBot, bấm **Bắt đầu tìm kiếm** rồi chọn bo trong danh sách.

   ![Hộp kết nối ThingBot Telemetrix](/hoc-lieu/thingblock/anh/07-ket-noi-thingbot.webp)

4. Bấm **Run** (hoặc lá cờ xanh) để chạy, **Stop** để dừng.

**Lần đầu dùng Live, hoặc sau khi đã nạp chương trình khác**, bo cần firmware Live: trong hộp kết nối bấm **Update my Device**, cắm dây USB, bấm **Install** và chờ tới khi báo *Firmware installed*. Việc này xóa chương trình đang có trên bo. Ngược lại, nạp chương trình ở chế độ nạp sẽ xóa firmware Live.

> **Lưu ý về chế độ Live ở bản 0.4.0**
> - Bấm **Stop** hoặc mất kết nối Bluetooth **không tắt động cơ**: bánh xe giữ nguyên tốc độ cuối. Hãy luôn thêm một đoạn `khi bấm phím phím trắng` đặt tốc độ hai động cơ về 0 để làm phanh khẩn cấp (các bài mẫu đều có).
> - Động cơ chỉ nhận tốc độ 0 tới 100 nên **chỉ chạy tiến**. Bài nào cần lùi hoặc xoay tại chỗ thì dùng chế độ nạp.
> - Mỗi lần chỉ một thiết bị nối Bluetooth được với bo. Muốn dùng app điện thoại ThingBot Remote, ngắt kết nối trong ThingBlock trước.
> - Các bài mẫu trong khóa chỉ dùng Live với động cơ chạy tiến, LED trên bo và cảm biến DHT11.

## Lưu và mở dự án

![Menu Tập tin](/hoc-lieu/thingblock/anh/09-menu-tap-tin.webp)

- **Tập tin → Lưu về máy tính**: lưu dự án thành tệp đuôi **.tb**. Tên tệp lấy theo ô tên dự án trên thanh menu.
- **Tập tin → Load from your computer**: mở tệp `.tb`. Dự án nhớ cả bo và các ngoại vi đã thêm, nên mở ra là có đủ nhóm khối.
- **Tập tin → Mới**: dự án trống.

Các bài mẫu trong khóa đều có tệp `.tb` để tải về và mở thẳng. Xem [5 bài mẫu](/khoa-hoc/thingedu/thingblock/bai-mau).
