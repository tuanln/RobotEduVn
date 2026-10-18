---
title: "Phần 2: Robotics với bộ kit K12 Maker"
---

Phần này cung cấp các thông tin về bộ kit K12 Maker, các thành phần và hướng dẫn thao tác với các thành phần trong bộ kit.

## 2.1. Bộ kit K12 Maker

**1. Khởi đầu hành trình trở thành chuyên gia robotics**

Như chúng ta đã biết, robot là một sản phẩm đòi hỏi kiến thức chuyên môn ở cả 3 lĩnh vực cơ khí, điện tử và lập trình. Đó cũng là thử thách lớn nhất với các bạn trẻ mới bắt đầu học về robot.

Bộ kit K12 Maker được ra đời để giúp các bạn trẻ vượt qua thách thức đó, thông qua việc đóng gói một số công nghệ giúp các bạn trẻ rút ngắn thời gian khi chế tạo robot. Đi kèm với đó là khóa học làm robot theo phương pháp project-based learning, giúp các trẻ tiếp cận với các kiến thức về robot một cách trực quan và hứng thú hơn.

Để có thể học chế tạo robot với bộ kit K12 Maker, các bạn sẽ cần tiếp cận với các nội dung sau:

- Vi điều khiển là gì? Vi điều khiển ESP32
- Arduino IDE: môi trường lập trình mã nguồn mở giúp tất cả mọi người dễ dàng tiếp cận với lập trình IoT/Robot
- Ngôn ngữ lập trình C/C++
- Kiến thức và kỹ thuật điện cơ bản: nguồn điện, công suất, an toàn điện...
- Các khái niệm về điều khiển, điện tử, lập trình nhúng: PWM, các chuẩn giao tiếp truyền thông...
- Kiến thức về các loại động cơ DC, servo,...
- Kiến thức về cảm biến
- Tư duy về thiết kế hệ thống

**2. Các thành phần trong bộ kit K12 Maker (dành cho FARC 2025)**

- Phần điện tử: **Bộ mạch điều khiển robot VIA B - Bánh mì**; bộ gamepad RF,...
- Phần nguồn: pin lipo 3s 11.1V 2600mAh
- Các động cơ DC 555 12V 180/300/1500RPM, động cơ servo MG996r 180/360 độ (thông tin về các loại động cơ trong bộ kit K12 Maker đã được trình bài trong bài viết về [cơ cấu chấp hành](/khoa-hoc/maker-viet/k12-maker-2024/phan-1-robotics-co-ban#12-cơ-cấu-chấp-hành) ở phần 1 của khóa học này)
- Phần cơ khí: nhôm định hình 1515 và các phụ kiện gá, bánh xe,...

Thông tin chi tiết về các thành phần trong bộ kit xem tại [đây](https://docs.google.com/document/d/1t7Lr_TLwJS1Pw_HYsNfK1AozpBzc4wcf1x4aK70qTtk/edit?usp=share_link).

Điểm nổi bật trong bộ kit K12 Maker là **bộ mạch điều khiển robot VIA B - Bánh mì** do Maker Việt phát triển, là một sản phẩm của dự án [VIA - Vietnam Autonomous](https://via.makerviet.org/vi/). Chúng ta sẽ tìm hiểu sâu hơn về bộ mạch này tại các bài tiếp theo.

## 2.2. Mạch VIA - nền tảng VIA

Vietnam Autonomous là một dự án nguồn mở được khởi xướng bởi Maker Việt nhằm tạo ra một nền tảng mở về robotics và xe tự hành cho học sinh, sinh viên và những người đam mê công nghệ tại Việt Nam.

VIA B – Bánh Mì là bo mạch phát triển phần cứng do MakerViet phát triển với mục đích phục vụ cho các dự án robotics và xe tự hành của các bạn trẻ Việt Nam. Mạch VIA B gồm module mạch điều khiển và module mạch công suất (Motor Shield) thiết kế để cắm chồng lên nhau.

Mạch điều khiển VIA và mạch công suất VIA được thiết kế với kích thước tiêu chuẩn “Arduino-size”, giúp bạn dễ dàng kết hợp với đa dạng các bo mạch phát triển, bo mạch chức năng khác như Arduino Uno, các mạch điều khiển động cơ khác,…

Mạch điều khiển VIA có chân kết nối với máy tính nhúng Pi, giúp bạn thực hiện được các dự án nâng cao hơn về IoT, robot hay xe tự hành.

**1. Mạch điều khiển**

![Mạch điều khiển VIA](/hoc-lieu/media/92de5de2c233ca7e.webp)

Mạch điều khiển VIA

- Sử dụng vi điều khiển ESP32-WROVER-E 16MB.
- Sở hữu khả năng kết nối truyền dữ liệu qua WIFI, Bluetooth, Bluetooth LE và các ưu điểm của dòng vi điều khiển ESP32 (xem datasheet để biết thêm thông tin chi tiết)
- Có header tương thích với Raspberry PI.
- Tương thích ngược với Arduino UNO shield.
- 1 cổng UART, 1 cổng I2C, 1 cổng CAN
- Cổng USB Type-C dùng để nạp code, cấp nguồn và giao tiếp Serial
- Module Gyro-Accelerometer MPU6050 tích hợp trên mạch
- Module thời gian thực RTC DS1307
- Cổng cấp nguồn DC 12V (DC5.5x2.5MM)
- Mạch được tích hợp cơ chế bảo vệ chống ngược nguồn, chập nguồn.

**2. Mạch công suất (Motor Shield)**

![Mạch công suất VIA](/hoc-lieu/media/af98891982bbe37f.webp)

Mạch công suất VIA

- Sử dụng IC băm xung PCA9685, 4 IC cầu H TA6586
- 4 đầu ra động cơ DC 12v , 6 đầu ra động cơ Servo
- 1 cổng cấp nguồn DC 12V (jack KF-3.81-2 hoặc jack XT-60 tùy theo lô sản xuất)
- Các cổng giao tiếp mở rộng: 1 cổng I2C, 1 cổng SPI
- Header GPIO mở rộng: 6 chân GPIO, 2 chân cấp nguồn 5V-GND

## 2.3. Sử dụng pin và lưu ý an toàn

**LƯU Ý QUAN TRỌNG:** Pin LiPo 3S được cung cấp trong bộ kit K12 Maker là loại pin có dòng xả cao, công suất lớn, cần được bảo quản và sử dụng đúng cách để đảm bảo an toàn, đồng thời kéo dài tuổi thọ của pin. Chúng ta cần tuyệt đối tuân thủ các hướng dẫn sau:

- **Không được để hai cực của pin chạm vào nhau,** sẽ gây hiện tượng ngắn mạch, dẫn tới nguy cơ cháy nổ.
- Không được tháo rời, ném hoặc gây tác động mạnh với pin.
- Trong quá trình chạy robot cần thường xuyên kiểm tra điện áp của pin. Khi điện áp pin **xuống dưới 11V**, ngưng sử dụng và mang pin đi sạc. **(TUYỆT ĐỐI KHÔNG CHỜ TỚI LÚC ĐỘNG CƠ CHẠY YẾU, NGƯNG CHẠY MỚI SẠC PIN)**
- Khi sạc pin cần chú ý đặt pin và bộ sạc trên bề mặt khô ráo, thoáng mát, không để gần các vật dễ cháy. Trong quá trình sạc cần chú ý các dấu hiệu bất thường của pin và bộ sạc như nóng chảy, phồng rộp.
- Khi thấy cell pin có dấu hiệu bị nóng, phồng rộp hoặc rách cell pin, cần ngưng sử dụng ngay.
- Thải bỏ pin đúng cách, bao gồm xả pin và vô hiệu hóa hoặc gửi tới các trung tâm xử lý chuyên nghiệp.

**1. Hướng dẫn đo pin và sạc pin**

Đầu jack 4 pin trên pin chỉ sử dụng cho mục đích đo pin và sạc pin, **không được cắm đầu jack này vào bất kỳ cổng kết nối nào trên mạch VIA hay bất kỳ thiết bị nào.**

**a. Đo pin**

Cắm đầu jack 4 pin trên pin vào bộ đo pin theo chiều như hình dưới (phần dây màu đen ứng với cực (-) trên bộ đo pin)

![Đo pin](/hoc-lieu/media/4ea7f65a755ea222.webp)

Đọc các thông số trên màn hình của bộ đo:

![Đo pin 2](/hoc-lieu/media/373c0fecec0d8fc9.webp)

- **All:** điện áp tổng của pin, khi điện áp này xuống **dưới 11V**, cần ngưng sử dụng và mang pin đi sạc
- **1, 2, 3:** điện áp của từng cell pin, cần chú ý điện áp giữa các cell không được chênh lệch quá nhiều, trong trường hợp điện áp giữa các cell pin **chênh lệch quá 0.3V**, cần ngưng sử dụng và sạc đầy để giúp điện áp các cell cân bằng trở lại.

**b. Sạc pin**

Cắm pin vào bộ sạc như hình dưới:

![Sạc pin](/hoc-lieu/media/f027896671346c52.webp)

Trên bộ sạc pin sẽ có **3 đèn báo trạng thái** của từng cell pin, **màu đỏ** báo hiệu cell pin đang được sạc, **màu xanh** báo hiệu cell pin đã được sạc đầy, **đèn nhấp nháy** báo hiệu cell pin chưa được kết nối (cần kiểm tra lại jack cắm đã kết nối chắc chắn hay chưa).

**Chú ý:** Nên đợi cả 3 cell pin được sạc đầy hoàn toàn **(3 đèn báo chuyển sang màu xanh)** mới rút pin để đảm bảo điện áp của các cell luôn cân bằng, đảm bảo tuổi thọ của pin.

**2. Hướng dẫn sử dụng pin để cấp nguồn cho robot thông qua mạch VIA B**

Kết nối pin vào mạch VIA thông qua jack chuyển đổi XT60 như hình dưới:

![Kết nối pin và mạch](/hoc-lieu/media/2410bc92e6ce1c07.webp)

**Cảnh báo: tuyệt đối không vừa sử dụng, vừa sạc pin**

**Mẹo nhỏ:** trong quá trình sử dụng robot, bạn có thể cắm cả bộ đo pin vào pin để tiện theo dõi điện áp của pin

**Lưu ý:** chỉ sử dụng jack chuyển đổi XT60 cung cấp cùng bộ kit K12 Maker để cấp nguồn cho mạch công suất VIA phiên bản cho FARC 2025.

## 2.4. Sử dụng phụ kiện gá

Bài viết này nhằm giúp những bạn lần đầu tiên tiếp xúc với các chi tiết cơ khí trong bộ kit có thể nắm được ngay các thao tác cơ bản để lắp một bộ khung xe robot cơ bản để thử điều khiển robot

**1. Cách sử dụng các phụ kiện gá nhôm định hình**

Đầu tiên, chúng ta sẽ cần tạo nên một "khung xương" cho robot bằng các cấu kiện nhôm định hình được cung cấp trong bộ kit K12 Maker. 

Để liên kết các thanh nhôm với nhau, chúng ta sẽ cần sử dụng các phụ kiện gá. Bộ kit K12 Maker cung cấp nhiều loại miếng gá, tuy nhiên chúng ta sẽ cùng nhau làm quen với cách lắp một miếng gá vuông cơ bản, các loại gá khác sẽ có cách thao tác tương tự, các bạn hoàn toàn có thể tự tìm hiểu.

**Bước 1:** Chuẩn bị các phụ kiện gá nhôm cần thiết (miếng gá góc 90 độ, ốc vuông, vít M4 đầu lục lăng)

![gá nhôm 1](/hoc-lieu/media/f4b5da02029ea435.webp)

**Bước 2:** Đặt ốc vuông vào rãnh định hình của thanh nhôm

![](/hoc-lieu/media/cd9edff7501640b1.webp)

**Bước 3:** Cố định gá nhôm vào thanh nhôm bằng vít M4 đầu lục giác (sử dụng bộ dụng cụ vặn vít lục giác)

![gá nhôm 3](/hoc-lieu/media/5087670faceb5b5d.webp)

**Bước 4:** Thực hiện cố định gá nhôm với thanh nhôm còn lại

![gá nhôm 4](/hoc-lieu/media/fc312bfc3cfa276c.webp)

**Bước 5:** Tinh chỉnh và siết chặt ốc vít

![gá nhôm 5](/hoc-lieu/media/0855445a90e72c1f.webp)

**2. Cách sử dụng gá động cơ DC**

Để robot có thể di chuyển được, chúng ta sẽ cần gắn thêm các động cơ lên khung xe. Để làm điều đó, chúng ta sẽ sử dụng bộ gá động cơ DC

**Bước 1:** Cố định miếng gá động cơ DC lên khung xe bằng ốc vuông và vít M4 đầu lục lăng

![Miếng gá động cơ](/hoc-lieu/media/f15c0548a3d1a0dc.webp)

**Bước 2:** Cố định động cơ vào miếng gá động cơ bằng loại vít chuyên dụng đi kèm bộ gá động cơ

![oc ga dong co](/hoc-lieu/media/be16c08013ba8f48.webp)

**Lưu ý:** Sử dụng đúng loại vít chuyên dụng để gá động cơ được cung cấp kèm theo bộ kit, sử dụng sai loại vít có thể gây hư hỏng các thành phần bên trong động cơ. Bạn không nhất thiết phải cố định động cơ vào miếng gá bằng cả 6 vít, nhưng nên sử dụng ít nhất 4 vít để đảm bảo chắc chắn.

**3. Cách gá bánh xe vào động cơ**

Để robot thực sự di chuyển được, chúng ta sẽ cần gắn thêm các bánh xe.

Trên trục động cơ sẽ có 1 phần khuyết, trên lỗ trục bánh xe sẽ có 2 vị trí **ốc gá trục** (còn được gọi là **chí gá trục**), chúng ta sẽ lắp bánh xe vào trục động cơ sao cho 1 trong 2 vị trí ốc gá trục này trùng với **phần khuyết trên trục động cơ**, sau đó siết chặt 2 ốc gá này bằng bộ dụng cụ vặn vít lục giác.

![phan khuyet](/hoc-lieu/media/62ef9d756572640a.webp)

![oc siet banh xe](/hoc-lieu/media/4f5adaff0533cb4b.webp)

**4. Thử lắp ráp một mô hình khung xe robot đơn giản!**

Bạn hãy thử lắp ráp một mô hình khung xe robot đơn giản như hình dưới để tập điều khiển robot:

![khung xe 1](/hoc-lieu/media/b29a6349daf31bad.webp)

![khung xe 2](/hoc-lieu/media/b667d9eb575aa1d1.webp)

Sau khi đã lắp được một bộ khung xe robot đơn giản như trên, bạn hãy xem và thực hành theo các bài trong [Phần 3: Hướng dẫn làm việc với mạch VIA](/khoa-hoc/maker-viet/k12-maker-2025/phan-3-lam-viec-voi-mach-via) để có thể tạo ra một chú robot mini, có thể di chuyển và điều khiển bằng tay Gamepad PS2 ngay lập tức! 

![khung xe 3](/hoc-lieu/media/fa762e13f702c985.webp)

**5. Mẹo nhỏ: gá nhôm định hình với các phụ kiện gá ngoài bộ kit K12 Maker**

Trong quá trình làm robot, có thể các bạn sẽ cần nhiều hơn số lượng phụ kiện gá mà bộ kit K12 Maker cung cấp. Loại miếng gá và ốc gá chuyên dụng dành cho nhôm định hình 1515 được cung cấp trong bộ kit K12 Maker có rất ít nguồn mua tại Việt Nam. 

Tuy nhiên, bạn có thể áp dụng "mẹo nhỏ" sau để gá nhôm với các phụ kiện gá rất phổ biến tại Việt Nam, có thể tìm mua tại bất kỳ cửa hàng kim khí nào tại địa phương: **vít M4, đai ốc M4, các loại miếng gá vuông, chữ T, chữ L**...

Đội thi hoàn toàn có thể sáng tạo thêm các cách gá khác, sử dụng các loại ốc vít, đai ốc, bu lông khác phù hợp với ý tưởng thiết kế của đội mình. Hãy cùng nhau chia sẻ các mẹo vặt của đội mình trong phần Sharing Zone nhé!

![ga nhom backup 1](/hoc-lieu/media/5b98190f396b431a.webp)

![ga nhom backup 2](/hoc-lieu/media/46381a5cd2bf6e6d.webp)

![ga nhom 3](/hoc-lieu/media/6e4800d03962d66f.webp)

