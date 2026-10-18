---
title: "Phần 3: Hướng dẫn lập trình Cobot"
---

## 3.1. Cài đặt môi trường lập trình

**a. Sử dụng Arduino IDE**

- Download và cài đặt Arduino IDE, hướng dẫn [tại đây](https://support.arduino.cc/hc/en-us/articles/360019833020-Download-and-install-Arduino-IDE "https://support.arduino.cc/hc/en-us/articles/360019833020-Download-and-install-Arduino-IDE")

- Cài đặt ESP32 core trên Arduino, hướng dẫn [tại đây](https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html# "https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html#")

**b. Sử dụng Platform IO**

Để sử dụng Platform IO các bạn cần có 1 code editor, chúng tôi khuyến nghị sử dụng [Visual Studio Code](https://code.visualstudio.com/download "Visual Studio Code")

Sau khi cài đặt VSCode, các bạn cài đặt thêm extension PlatformIO.

## 3.2. Cài đặt thư viện cần thiết

Để tiện lợi cho các mentor và các bạn thí sinh, chúng tôi đã tổng hợp toàn bộ các thư viện cơ bản cần thiết để sử dụng mạch CoBot trong quá trình tham gia khóa học này.

**1.** Thư viện cho cảm biến màu của TCS34725, bạn có thể tải xuống tại link sau: [https://www.arduinolibraries.info/libraries/adafruit-tcs34725](https://www.arduinolibraries.info/libraries/adafruit-tcs34725)

Để cài đặt thư viện, bạn giải nén file zip của thư viện tới Thư mục: ***Document \> Arduino \> libraries***

## 3.3. Sử dụng các chương trình mẫu

Các bạn có thể tải về các chương trình mẫu dành cho CoBot tại đây: [https://github.com/makerviet/vorc](https://github.com/makerviet/vorc)

Tại repo Github trên, có 2 chương trình mẫu: 

- **cobot_motors_test**: chương trình mẫu giúp các bạn tham khảo các hàm để điều khiển robot di chuyển (đi thẳng, đi lùi, rẽ trái, rẽ phải, dừng).
- **cobot_simple_line_following**: chương trình mẫu giúp các bạn tham khảo các hàm để đọc cảm biến hồng ngoại, cảm biến màu và xây dựng một thuật toán dò đường cơ bản.
