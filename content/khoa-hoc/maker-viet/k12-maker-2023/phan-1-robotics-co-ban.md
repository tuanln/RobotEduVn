---
title: "Phần 1: Robotics cơ bản"
---

Phần này cung cấp góc nhìn tổng quan và các khái niệm cơ bản về robotics

## 1.1. Robot là gì?

**1. Robot là gì?**

Robot là một cỗ máy được thiết kế làm một hoặc nhiều nhiệm vụ thay cho con người, giúp giải phóng sức lao động của con người.

Nói một cách đơn giản hơn, có thể hiểu robot là một máy tính có thêm động cơ, các cơ cấu cơ khí, được lập trình để dễ dàng di chuyển, vận động, thực hiện các nhiệm vụ mà con người mong muốn.

 

▶ Video: <https://youtu.be/fn3KWM1kuAw>

 \
Một mẫu robot của BostonDynamics

 

▶ Video: <https://youtu.be/GUv8IcDEKJg>

 \
Robot của đội Việt Nam tham dự giải đấu FGC

**2. Các thành phần của robot\**

Một chú Robot được tạo nên từ 3 phần cơ bản bao gồm: điện tử, cơ khí và lập trình. Để dễ hình dung hơn, chúng ta có thể tưởng tượng robot cũng giống như cơ thể một con người:

- **Điện tử:** các thành phần điện tử trong robot có thể kể đến như mạch điều khiển - ví như bộ não của robot; các cảm biến - ví như giác quan của robot; các hệ thống mạch điện tử, dây dẫn -  ví như mạch máu, dây thần kinh trong cơ thể giúp truyền năng lượng, tín hiệu giữa các cơ quan trong "cơ thể" của robot...  
- **Cơ khí:** là các cơ cấu cơ khí, động cơ (cơ cấu chấp hành) giúp robot di chuyển, vận động; cơ khí trong robot có thể ví như cơ bắp, chân tay, khung xương và da thịt của con người, cần phải chắc khỏe, linh hoạt và chính xác để thực hiện hiệu quả các nhiệm vụ. 
- **Lập trình:** lập trình có thể được hiểu là công việc "hướng dẫn" robot thực hiện các nhiệm vụ theo mong muốn của con người. Người lập trình robot cần viết ra các chương trình và nạp vào vi điều khiển (tức bộ não của robot) để giúp robot đọc được các tín hiệu điều khiển, kết hợp các tín hiệu từ hệ thống cảm biến (nếu có) để điều khiển các cơ cấu cơ khí chuyển động theo đúng yêu cầu nhiệm vụ đề ra.

**Một phần không thể thiếu** để robot có thể hoạt động được chính là phần **nguồn điện**, cung cấp năng lượng cho robot. Nguồn điện của robot quan trọng giống như trái tim của con người. Thông thường, robot sẽ được trang bị nguồn điện là pin hoặc ắc quy.

**3. Học chế tạo robot với bộ kit K12 Maker để bắt đầu hành trình trở thành chuyên gia robotics**\
Như chúng ta đã biết, robot là một sản phẩm đòi hỏi kiến thức chuyên môn ở cả 3 lĩnh vực cơ khí, điện tử và lập trình. Đó cũng là thử thách lớn nhất với các bạn trẻ mới bắt đầu học về robot.\
Bộ kit K12 Maker được ra đời để giúp các bạn trẻ vượt qua thách thức đó, thông qua việc đóng gói một số công nghệ giúp các bạn trẻ rút ngắn thời gian khi chế tạo robot. Đi kèm với đó là khóa học làm robot theo phương pháp project-based learning, giúp các trẻ tiếp cận với các kiến thức về robot một cách trực quan và hứng thú hơn.\
Để có thể học chế tạo robot với bộ kit K12 Maker, các bạn sẽ cần tiếp cận với các nội dung sau:

- Vi điều khiển là gì? Vi điều khiển ESP32;
- Arduino IDE: môi trường lập trình mã nguồn mở giúp tất cả mọi người dễ dàng tiếp cận với lập trình IoT/Robot;
- Ngôn ngữ lập trình C/C++;
- Kiến thức và kỹ thuật điện cơ bản: nguồn điện, công suất, an toàn điện...;
- Các khái niệm về điều khiển, điện tử, lập trình nhúng: PWM, các chuẩn giao tiếp truyền thông...;
- Kiến thức về các loại động cơ DC, servo;
- Kiến thức về cảm biến
- Tư duy về thiết kế hệ thống

## 1.2. Cơ cấu chấp hành

**Cơ cấu chấp hành (Actuator)** hay thiết bị truyền động là bộ phận của robot, có nhiệm vụ chuyển đổi năng lượng thành các chuyển động vật lý.

Hiểu một cách đơn giản, cơ cấu chấp hành là thành phần **tạo ra sự chuyển động** trong robot. 

Có nhiều loại cơ cấu chấp hành như cơ cấu chấp hành **thủy lực,** cơ cấu chấp hành **khí nén,** cơ cấu chấp hành **điện (động cơ)**... Hai chuyển động cơ bản cơ cấu chấp hành có thể tạo ra là **chuyển động thẳng** và **chuyển động quay.**

Trong khuôn khổ khóa học này, chúng ta sẽ được làm quen với cơ cấu chấp hành là **động cơ điện một chiều (DC motor),** tạo ra các **chuyển động quay.** Bộ kit K12 Maker cung cấp cho chúng ta 2 loại động cơ là động cơ DC và động cơ servo.

**1. Động cơ DC thường (thường gọi tắt là động cơ DC)**

Động cơ điện một chiều (động cơ DC) được điều khiển bằng dòng điện một chiều. Bên trong động cơ sẽ có các phần như sau:

![Cấu tạo động cơ DC](/hoc-lieu/media/3d4a71154558f0c8.webp)

- **Rotor:** là bộ phận chính, có cấu tạo trục và được quấn các cuộn dây lại với nhau. Nhờ vậy mà sẽ tạo nên được một chiếc nam châm điện.
- **Stator:** có kết cấu giống với một chiếc nam châm vĩnh cửu, hay nam châm điện. Nhờ đó chúng sẽ hoạt động với công dụng tương đương.
- **Cổ góp (Commutator):** bộ phận này là nơi tiếp xúc và có khả năng truyền điện tới cho các cuộn dây ở trên rotor. Số điểm tiếp xúc ở trên cổ góp sẽ tương ứng với số dây được quấn ở trên bộ phận Rotor.
- **Chổi than (Brushes):** là nơi tiếp xúc và có thể tiếp điện được cho bộ phận cổ góp.

Nguyên lý hoạt động của động cơ DC đã khá quen thuộc với tất cả chúng ta khi được học qua chương trình môn Vật Lý phổ thông, vậy nên trong khóa học này, chúng ta sẽ không nhắc lại nguyên lý đó. Trong khóa học này, chúng ta sẽ quan tâm nhiều hơn tới các thức để điều khiển động cơ hoạt động theo ý muốn.

Về cơ bản, động cơ DC có 2 yếu tố cần điều khiển:

- **Tốc độ quay:** thay đổi bằng cách tăng giảm điện áp đặt vào 2 cực của động cơ. 
- **Chiều quay:** thay đổi bằng cách đảo chiều dòng điện chạy qua động cơ. 

Trong điều khiển robot, sẽ có các vi mạch điện tử (IC) chuyên dụng giúp chúng ta thực hiện việc điều khiển động cơ thông qua lập trình. Bạn sẽ cần tìm hiểu về các khái niệm **xung PWM, mạch cầu H.**

Động cơ DC có 2 thông số quan trọng nhất là **điện áp hoạt động** và **tốc độ.**

![Động cơ DC 555](/hoc-lieu/media/7c8f1eecbb50a9e6.webp)

Động cơ DC trong bộ kit K12 Maker là loại **động cơ 555** (tên gọi bắt nguồn từ kích thước của động cơ), có điện áp hoạt động **12V**, tốc độ từ **30, 180, 300, 1500 RPM** (được thay đổi tùy theo đối tượng sử dụng bộ kit)

Trong quá trình làm robot, ngoài **tốc độ** của động cơ, bạn cũng cần quan tâm tới **gia tốc/lực kéo** của động cơ. Hai giá trị này thường tỉ lệ nghịch với nhau, tốc độ quay càng cao, lực kéo càng yếu và ngược lại. Tuy nhiên, chúng ta hoàn toàn có thể kiểm soát vấn đề này bằng cách sử dụng các giải pháp như **hộp số,** thay đổi **tỉ số truyền** của các cơ cấu truyền động như **nhông - xích, puly - dây curoa**... Chúng ta sẽ cùng tìm hiểu sâu hơn về các giải pháp này ở những phần sau.

**2. Động cơ DC servo (thường gọi tắt là động cơ servo)**

Về cơ bản, cấu tạo bên trong của **động cơ DC servo** (hay động cơ servo) tương tự như động cơ DC, nhưng có thêm một mạch điện tử có chức năng nhận biết vị trí góc quay của trục động cơ, cho phép động cơ có thể được điều khiển để **quay chính xác đến một góc tùy ý** trong khoảng từ 0 đến 180 độ (khoảng này có thể khác tùy thuộc vào dòng động cơ).

Động cơ servo sẽ có 3 dây: **dây nâu** tương ứng với **chân âm (-)** của động cơ, **dây đỏ** tương ứng với **chân dương (+)** của động cơ, **dây cam** là chân tín hiệu giúp chúng ta truyền vào **tín hiệu điều khiển** để động cơ quay đến góc mong muốn.

Động cơ servo trong bộ kit K12 Maker là loại động cơ servo **MG996r**, với ưu điểm lực kéo rất khỏe. Bạn có thể tìm hiểu thêm datasheet của model động cơ này trên internet để biết thêm thông tin chi tiết.

![MG996r](/hoc-lieu/media/70570d5754e7570d.webp)

Ngoài ra, bộ kit K12 Maker cung cấp thêm một loại động cơ biến thể của MG996r, tạm gọi là **động cơ servo 360 độ.** Động cơ này được thay đổi một số chi tiết bên trong khiến nó có khả năng **quay tròn** liên tục (thay vì quay đến một vị trí góc nhất định như động cơ MG996r nguyên bản).

## 1.3. Cảm biến

Bài viết này đã được lược bỏ do nội dung cuộc thi VRC 2023 không yêu cầu sử dụng cảm biến

## 1.4. Lập trình Arduino cơ bản

Arduino là một nền tảng mã nguồn mở bao gồm các bo mạch vi điều khiển, hệ thống các module điện tử tương thích và bộ công cụ lập trình (IDE). Arduino rất đơn giản để những người chưa biết gì về điện tử, lập trình cũng có thể nhanh chóng tiếp cận; đồng thời, cộng đồng những người sử dụng Arduino rất lớn mạnh với tinh thần chia sẻ, chúng ta rất dễ dàng để tìm kiếm các nguồn tài liệu, các bài hướng dẫn, các chương trình mẫu hoặc hỏi đáp về Arduino trên các hội nhóm mạng xã hội, các diễn đàn, trang web trên Internet.

Với những ưu thế đó, Arduino được sử dụng rất rộng rãi trong cộng đồng những người làm robot, thiết bị thông minh, sản phẩm DIY... cũng như trong môi trường giáo dục dành cho học sinh sinh viên thực hiện các dự án.

Hãy cùng nhau thử lập trình với Arduino thông qua hướng dẫn từ 2 video nằm trong series chia sẻ về lập trình Arduino biên tập bởi Maker Việt. Sau khi thực hành, các bạn mới bắt đầu sẽ phần nào mường tượng được khái niệm về Arduino và cách thức lập trình trên nền tảng Arduino.

**Bài 1: Hello Arduino**

🔎 Giới thiệu chung về Arduino, cách cài đặt Arduino IDE, nạp chuơng trình

🔎 Huớng dẫn sử dụng mô phỏng Arduino online

🔎 Lập trình nháy led cơ bản theo 2 cách (có và không sử dụng hàm delay)

 

▶ Video: <https://youtu.be/4SfpeZu1VDc>

 

**Bài 2: Lập trình điều khiển động cơ với Arduino**

🔎 Giới thiệu động cơ DC và động cơ servo , nguyên lý hoạt động, cách điều khiển

🔎 Huớng lập lập trình điều khiển động cơ DC và động cơ servo , sử dụng PWM cơ bản

🔎 Cùng làm project điều khiển động cơ Servo qua Serial Monitor

 

▶ Video: <https://youtu.be/JTAzVEyW3TU>

 

