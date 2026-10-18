---
title: "Về ThingBot"
---

## Mạch ThingBot - MEO

MEO là một dự dự án nguồn mở được khởi xướng bởi Maker Việt nhằm tạo ra một nền tảng mở về kết nối Iot dễ dàng dành cho đa đối tượng, đặc biệt là những người đang có hứng thú kết nối Iot nhưng không rành về công nghệ.

Mạch ThingBot là bo mạch phát triển phần cứng do MakerViet phát triển với mục đích phục vụ cho các dự án kết nối hệ thống các cảm biến nhằm đo đạc thông số từ môi trường một cách dễ dàng nhất. Mạch ThingBot gồm 2 mạch gắn chồng lên nhau đó chính là ThingBotCore và mạch mở rộng ThingBotShield.

Ngoài ra, ThingBot còn có thể kết nối với máy tính nhúng Pi, giúp bạn thực hiện được các dự án nâng cao hơn nữa về IoT, robot hay xe tự hành.

**1. Mạch ThingBotCore**

![](/hoc-lieu/media/b015146d67c25679.webp)

- Sử dụng vi điều khiển ESP32 C3
- Sở hữu khả năng kết nối truyền dữ liệu qua WIFI, Bluetooth, Bluetooth LE và các ưu điểm của dòng vi điều khiển ESP32
- Có chân cắm tương thích với Raspberry Pi
- Header cố định dành cho kết nối với ThingBotShield
- Cổng USB Type-C dùng để nạp code, cấp nguồn và giao tiếp Serial
- Cổng cấp nguồn 5v - 9V tối đa
- Mạch được tích hợp cơ chế bảo vệ chống ngược nguồn, chập nguồn

**2. Mạch ThingBotShield**

![](/hoc-lieu/media/1a64c1d523cf5627.webp)

**Chú thích:**

**1)** Switch - phím bấm

**2)** 4 Chân giao tiếp I2c (tương thích với mọi module sử dụng giao tiếp I2c) 

**3)** 6 Chân kết nối Receiver tay PS2 (theo đúng thứ tự cắm)

**4)** Các chân kết nối động cơ (tùy thuộc vào công suất nguồn cung cấp là bao nhiêu V mà nên chọn loại động cơ phù hợp) 

**5)** Nút bật tắt nguồn

**6)** Chân kết nối nguồn (có kí hiệu chân + và chân - , tối đa nguồn nhận 9V)

**7)** 5 Cặp chân kết nối với servo, đa cảm biến (bất kể cảm biến nào có 3 chân kết nối) theo thứ tự GND - 5V - S1, S2, S3, S4, S5 (chân âm - chân dương - chân tín hiệu)

**8)** 2 Cặp chân kết nối (chân GPIO) có thể kết nối với bất kì cảm biến nào có 4 chân kết nối 

**9)** Buzzer mini (còi báo mini)

**Link video Youtube về mạch ThingBot:**

**<https://www.youtube.com/watch?v=9mNA89_0LQg>**

## Bộ kit ThingBot 2024

**Link Youtube video về bộ kit ThingBot:**\
[Giới thiệu bộ Kit ThingBot](https://www.youtube.com/watch?v=Y9jM5MlzRVY "Giới thiệu bộ Kit ThingBot")

Code mẫu như trong video:\
![](/hoc-lieu/media/de1550e8093148ac.webp)

**ThingBot sẽ đi kèm 1 bộ kit với:**\
**1 servo SG90 360 (kèm tay servo) và 1 servo SG90 180 (kèm tay servo)** với dây màu vàng là chân tín hiệu (cắm vào chân S1-S5), dây đỏ là dây nguồn dương (chân 5V), dây nâu là dây nguồn âm (chân GND)

Đối với bộ kit đang sử dụng động cơ **servo SG90 360 và 180** (phân biệt với 180 độ bằng cách xoay thử) với chân pin cắm hướng mặt có lỗ hở ra ngoài theo chuẩn quy tắc chung\
![](/hoc-lieu/media/af01c184084e8b3f.webp)

**4 động cơ DC giảm tốc 1:48 (kèm ốc)**\
Điện áp: 3-12VDC, khuyến nghị ở giải điện áp (6-8VDC)\
![](/hoc-lieu/media/4e3b9b032685d968.webp)

1 mạch ThingBot\
2 khung sắt cố định + 4 bánh mecanum

![](/hoc-lieu/media/7eb2d115c4fa2485.webp)\
Lưu ý: khi lắp bánh mecanum bạn phải đặt đúng vị trí của các bánh theo như hình sau:\
![](/hoc-lieu/media/56e1926405ec734f.webp)

1 khay 2 pin 18650\
![](/hoc-lieu/media/005eeb7b9a2f5b40.webp)\
Pin 18650 - 2 viên\
![](/hoc-lieu/media/c9b8c9971efce08b.webp)

Sạc Pin 18650\
![](/hoc-lieu/media/24ad2d74fab6b165.webp)\
Lưu ý: khi các bạn cắm pin hãy nhớ cắm đúng đầu âm và dương nhé!\
Kí hiệu đầu âm hoặc dương được in sẵn trên pin và bộ sạc.

1 tay cầm PS2 và đầu nhận tín hiệu (Receiver)\
![](/hoc-lieu/media/df8f1b1dad5acb26.webp)

**Bạn có thể gắn bất cứ động cơ nào có dải điện áp hoạt động từ 5V đến 9V**

## Bộ kit ThingBot 2025

**Link video cách lắp bộ kit ThingBot 2025**

<https://www.youtube.com/watch?v=N72W9EYd26I>

**ThingBot sẽ đi kèm 1 bộ kit với:**\
**1 servo SG92R (kèm tay servo) và 1 servo MG995R/MG996 (kèm tay servo)** với dây màu vàng là chân tín hiệu (cắm vào chân S1-S5), dây đỏ là dây nguồn dương (chân 5V), dây nâu là dây nguồn âm (chân GND)

Đối với bộ kit đang sử dụng động cơ **servo SG90 360 và 180** (phân biệt với 180 độ bằng cách xoay thử) với chân pin cắm hướng mặt có lỗ hở ra ngoài theo chuẩn quy tắc chung.\
![](/hoc-lieu/media/af01c184084e8b3f.webp)

**Servo MG995R/ MG996**

![](/hoc-lieu/media/c9bd9654da8a0b77.webp)

**4 động cơ DC giảm tốc 1:48 (kèm ốc)**\
Điện áp: 3-12VDC, khuyến nghị ở giải điện áp (6-8VDC)\
![](/hoc-lieu/media/4e3b9b032685d968.webp)

**1 mạch ThingBot**

![](/hoc-lieu/media/9ec07ac1d98e465b.webp)

**Khung mica** + 4 bánh\
![](/hoc-lieu/media/4362ae016f47fb14.webp)![](/hoc-lieu/media/a0e0a83452cc0c2c.webp)![](/hoc-lieu/media/b06a11367234fd72.webp)

**Cơ cấu in 3D\
![](/hoc-lieu/media/470c02ff85c1001f.webp)\
1 khay 2 pin 18650**

![](/hoc-lieu/media/9478d97a3df2aaf0.webp)

Pin 18650 - 2 viên\
![](/hoc-lieu/media/c9b8c9971efce08b.webp)

Sạc Pin 18650\
![](/hoc-lieu/media/24ad2d74fab6b165.webp)\
Lưu ý: khi các bạn cắm pin hãy nhớ cắm đúng đầu âm và dương nhé!\
Kí hiệu đầu âm hoặc dương được in sẵn trên pin và bộ sạc.

1 tay cầm PS2 và đầu nhận tín hiệu (Receiver)\
![](/hoc-lieu/media/df8f1b1dad5acb26.webp)

**Dây 6 Pin**

![](/hoc-lieu/media/c6e4eb43b7863d50.webp)

## Cài đặt phần mềm OpenBlock

**Cài đặt:**

**Nếu bạn muốn xem video thì đây nhé:**\
[https://www.youtube.com/watch?v=Tfql_FykiT4](https://www.youtube.com/watch?v=Tfql_FykiT4 "https://www.youtube.com/watch?v=Tfql_FykiT4")


**Còn nếu bạn muốn đọc thì phần dưới sẽ giống hệt như trong video**

**Link cài đặt mới nhất của OpenBlock:** <https://github.com/thingedublock/thingedublock-desktop/releases/tag/v1.0.2>


**Hiện tại, OpenBlock chỉ hỗ trợ trên hệ điều hành Windows và bạn có thể tải về.**

![1_setup](/hoc-lieu/media/4ae6dff3e730ba3a.webp)

**Lưu ý: Chọn đúng phiên bản Windows (x32 hoặc x64).**  


**Sau đó bạn sẽ cần phải cài đặt gói hỗ trợ phần mềm bằng link dưới đây:**\
**<https://github.com/thingblock/thingblock-external-resources/releases/tag/v1.3.0>\
(bản cập nhật ngày 29/1)\
Hãy chọn file .exe và tải về nhé!**

**Hướng dẫn cài đặt:**

**Tải về và giải nén file .rar nhé!**

![2_setup](/hoc-lieu/media/75af003030e1fb9c.webp)

**Khi cửa sổ hiện lên, chọn *Next*.**

![3_setup](/hoc-lieu/media/5734d2285eca3ca9.webp)

**Chọn ổ đĩa cài đặt và nhấn *Install*.**

![4_setup](/hoc-lieu/media/18cae82b8ff89f0e.webp)

Đối với gói hỗ trợ phần mềm thì chúng ta sẽ cài đặt theo các bước sau nhé:\
Sau khi tải về, bạn hãy chạy file .exe vừa tải và bấm **Install:** ![](/hoc-lieu/media/e655a241f23d8a99.webp)

Cài xong, các bạn sẽ thấy hiện lên 1 cửa sổ như thế này:\
![](/hoc-lieu/media/26cef37a2958182a.webp)

Lúc này, bạn hãy bấm bất cứ phím nào để tiếp tục nhé!\
Tới đây bạn chỉ cần nhấn **Finish** là đã thành công cài đặt.

![](/hoc-lieu/media/1ccc3c83583dfd38.webp)
