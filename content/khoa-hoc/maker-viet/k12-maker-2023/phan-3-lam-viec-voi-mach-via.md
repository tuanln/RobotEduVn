---
title: "Phần 3: Làm việc với mạch VIA"
---

Phần này hướng dẫn các kỹ thuật cơ bản để làm việc với mạch VIA, phục vụ cho việc chế tạo robot

## 3.1. Cấp nguồn và lưu ý an toàn

Có nhiều cách để bạn cấp nguồn cho mạch VIA B, tùy theo trường hợp sử dụng các bạn có thể lựa chọn:

**1. CẤP NGUỒN 5V:** Cấp nguồn qua cổng USB Type-C bằng cáp USB Type-C kết nối với máy tính

***Lưu ý:*** Cấp nguồn 5V chỉ cho phép bạn nạp code và kiểm tra mạch điều khiển. Để sử dụng khối mạch công suất, cần cấp nguồn 12V theo cách bên dưới

**2. CẤP NGUỒN 12V:** Bạn có thể lựa chọn 1 trong 2 cách sau:

- **Cấp nguồn qua cổng cấp nguồn DC 12V (jack XT-60) trên mạch công suất.** (đây là cách tiện lợi và an toàn nhất do pin lipo được cung cấp trong bộ kit K12 Maker sử dụng cùng loại jack)\
  **Lưu ý:** chỉ sử dụng jack chuyển đổi XT60 cung cấp cùng bộ kit K12 Maker để cấp nguồn cho mạch công suất VIA phiên bản cho VRC 2023. 

![cap nguon](/hoc-lieu/media/0b931344ab3ac378.webp)

- Cấp nguồn qua cổng cấp nguồn DC 12V (DC5.5x2.5MM) trên mạch điều khiển

**CÁC LƯU Ý AN TOÀN KHI SỬ DỤNG MẠCH VIA B:**

- Nên sử dụng dây cáp USB Type C có chất lượng tốt
- Không nên cắm mạch VIA B qua bộ chia USB (USB HUB).
- Nếu có thể, nên cắm mạch VIA B vào cổng USB 3.0 để đảm bảo nguồn cung cấp năng lượng cho mạch.
- **Không cắm ngược chiều nguồn điện** cho mạch công suất VIA B.
- **Không cắm nguồn điện trực tiếp vào chân IO** của mạch VIA B, hay bất cứ connector nào không phục vụ cho việc cấp nguồn.
- Không cắm các thiết bị chưa rõ tương thích chân vào mạch VIA B.
- Tuyệt đối **không cắm pin vào header I2C (connector 4 chân) hoặc header SPI (connector 6 chân)** trên mạch công suất.
- **Không đặt mạch trực tiếp lên bề mặt kim loại** có tính chất dẫn điện trong lúc mạch đang được cấp nguồn để tránh việc chập các chân tín hiệu và chân nguồn, dẫn đến hỏng hoàn toàn mạch.

## 3.2. Cài đặt môi trường lập trình cho mạch VIA

**Trước khi tiến hành cài đặt và thiết lập môi trường lập trình cho mạch VIA, bạn thực hiện kết nối mạch với máy tính, cài đặt driver (nếu thiếu) và xác định cổng COM theo hướng dẫn sau: [Khởi tạo mạch VIA B – VIA Autonomous (makerviet.org)](https://via.makerviet.org/vi/docs/2_get_started_with_via_hardware/4_initiating-project/)**

**I. CÀI ĐẶT TRÌNH BIÊN DỊCH**

**a. Sử dụng Arduino IDE**

Download và cài đặt Arduino IDE, hướng dẫn [tại đây](https://docs.arduino.cc/software/ide-v1/tutorials/Windows)

Cài đặt ESP32 và ESP8266 trên Arduino, hướng dẫn [tại đây](https://docs.google.com/document/d/1WFyEflvI95kBhTy5K8GR6UFhdqSyHiY7/edit?usp=sharing&ouid=115848758332783494967&rtpof=true&sd=true)

**b. Sử dụng Platform IO** (tùy chọn dành cho các đội có nhiều kinh nghiệm hơn)

Để sử dụng Platform IO các bạn cần có 1 code editor, chúng tôi khuyến nghị sử dụng [Visual Studio Code](https://code.visualstudio.com/download)

Sau khi cài đặt VSCode, các bạn cài đặt thêm extension PlatformIO.

**II. CÀI ĐẶT CÁC THƯ VIỆN CẦN THIẾT**

Để tiện lợi cho các mentor và các bạn thí sinh, chúng tôi đã tổng hợp toàn bộ các thư viện cơ bản cần thiết để sử dụng mạch VIA trong quá trình tham gia khóa học này, bạn có thể tải xuống tại link sau:

[Download](https://drive.google.com/file/d/1i-P7q-LL2w-zpT1lbxIkT5o65C3ZBFhd/view?usp=sharing)

Để cài đặt tất cả các thư viện, bạn giải nén file trên tới Thư mục: *Document \> Arduino \> libraries*

Gói các thư viện trên bao gồm:

- Thư viện Adafruit_BusIO
- Thư viện Adafruit_PWM_Servo_Driver_Library
- Thư viện AdruinoJson
- Thư viện AsyncTCP
- Thư viện ESPAsyncTCP
- Thư viện ESPAsyncWebServer
- Thư viện ESPUI
- Thư viện PS2X_lib

**THAM KHẢO:** Video hướng dẫn kết nối và lập trình mạch VIA với Platform IO

 

▶ Video: <https://youtu.be/tpS330kW68I>

 

## 3.3. Sử dụng các chương trình lập trình mẫu

Đội ngũ phát triển của nền tảng VIA đã cung cấp sẵn cho chúng ta một số chương trình mẫu về điều khiển động cơ qua wifi, điều khiển động cơ với Gamepad PS2 để giúp bạn tiếp cận nhanh với việc lập trình cho mạch VIA.

Bạn cũng có thể sử dụng các chương trình này để kiểm tra hoạt động của mạch VIA, của động cơ và tay điều khiển Gamepad PS2.

**Các chương trình mẫu kèm theo hướng dẫn được lưu trữ tại link sau:**

[maker-bot/firmware at main · makerviet/maker-bot · GitHub](https://github.com/makerviet/maker-bot/tree/main/firmware "maker-bot/firmware at main · makerviet/maker-bot · GitHub")

Để hiểu chi tiết hơn về cách lập trình điều khiển khiển các loại động cơ, cách đọc tín hiệu từ tay điều khiển Gamepad PS2 để ứng dụng vào điều khiển robot, các bạn có thể xem các bài viết tiếp theo.

## 3.4. Điều khiển động cơ với mạch VIA

Dưới đây là các tài liệu hướng dẫn điều khiển các loại động cơ với mạch VIA B:

[Điều khiển động cơ với mạch VIA B – VIA Autonomous (makerviet.org)](https://via.makerviet.org/vi/docs/3_robotics-with-via/2_motor-control-with-via/ "Điều khiển động cơ với mạch VIA B – VIA Autonomous (makerviet.org)")

[Điều khiển động cơ servo với mạch VIA B – VIA Autonomous (makerviet.org)](https://via.makerviet.org/vi/docs/3_robotics-with-via/3_servo-control-with-via/ "Điều khiển động cơ servo với mạch VIA B – VIA Autonomous (makerviet.org)")

## 3.5. Sử dụng gamepad PS2 với mạch VIA

Dưới đây là tài liệu hướng dẫn sử dụng gamepad PS2 với mạch VIA:

[Sử dụng gamepad với mạch VIA – VIA Autonomous (makerviet.org)](https://via.makerviet.org/vi/docs/3_robotics-with-via/4_gamepad-with-via/ "Sử dụng gamepad với mạch VIA – VIA Autonomous (makerviet.org)")
