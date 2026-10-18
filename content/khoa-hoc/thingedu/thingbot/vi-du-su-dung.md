---
title: "Ví dụ sử dụng"
---

## Cơ bản

**1) Chạy 1 động cơ:**

Chúng ta sẽ cần: 

- Khung 
- Mạch ThingBot
- Pin 
- 1 động cơ DC vàng

Cách kết nối dây: 

Hãy kết nối mạch với pin (2 viên pin to) thông qua chân nguồn và cắm động cơ vào 1 trong 4 chân kết nối M1, M2, M3, M4.

**Code mẫu:** 

![](/hoc-lieu/media/5e969982a20b4fcb.webp)

**Giải thích: **\
"***When arduino begin**"* là lệnh bắt buộc để khởi tạo chương trình

"**init ThingBot**" là lệnh bắt buộc để khởi tạo kết nối với mạch ThingBot

"**set motor M1 go forward at 100**" : set động cơ ở vị trí M1 (bạn có thể thay đổi thành M2, M3, M4 nếu động cơ bạn đang cắm vào vị trí cắm đó trên mạch)

go "**forward**": tiến lên phía trước (hoặc bạn có thể chỉnh thành "backward" để động cơ quay hướng ngược lại)

at "**100**": bạn có thể chỉnh tốc độ từ 0 - 100.

**\**

**2) Làm sao để động cơ dừng?**

Sau phần 1) bạn sẽ thấy khi này động cơ sẽ quay liên tục, nếu muốn động cơ dừng lại bạn cần ra điều kiện dừng cho động cơ.

**Ví dụ:**

![](/hoc-lieu/media/f210a66567db1bb7.webp)

**Giải thích: **

Chúng ta set động cơ M1 chạy với tốc độ 100 trong 5s rồi set động cơ M1 chạy với tốc độ 0 (dừng)

Khối "wait 5 seconds" được gọi là delay - ta có thể hiểu trong trường hợp này động cơ sẽ chạy trong 5s và hết 5s sẽ thực hiện khối lệnh tiếp theo.

****\****

**3) Lặp lại hành động**

Bạn muốn động cơ có thể lặp lại chuyển động trước đó theo số lần nhất định? Vậy hay thử khối lệnh "repeat" nhé! 

Khối này sẽ giúp cho tất cả các khối lệnh được đặt bên trong nó sẽ được chạy tuần tự và lặp lại với số lần mà bạn muốn.

**Ví dụ: **

![](/hoc-lieu/media/aa52b8461f3f3ca1.webp)

**Giải thích:**

Khối "repeat" sẽ giúp bạn lặp lại tất cả các khối bên trong chúng n lần, bạn có thể chỉnh theo số lần mà bạn muốn nhé!

Trong đoạn code trên, động cơ sẽ chạy ở tốc độ 100 trong 5s rồi dừng 2s rồi sẽ lặp lại tất cả 10 lần nữa.

**\**

**4)Vậy còn lặp lại mãi mãi thì sao?**

Ồ, với việc lặp lại mãi mãi mà không cần quan tâm số lần lặp lại, bạn có thể thử khối lệnh "forever" nhé!

**Code mẫu:**

![](/hoc-lieu/media/20a2cf0ced78d0ed.webp)

**\**

****5) LED trên ThingBot**\**

Trên ThingBot sẽ có 2 led xanh biển và vàng để có thể lập trình nháy led hoặc để test kết nối giữa mạch và OpenBlock

![](/hoc-lieu/media/330dcf3c175ed443.webp)

Đây là code test dành cho led, với cấu hình "set led 1 hoặc 2" với giá trị tối đa là 100 và thấp nhất là 0

**6) Ngoài ra, trên ThingBot còn có 1 nút bấm hay "Switch"**\
![](/hoc-lieu/media/376e38354f717dbe.webp)\
Bạn có thể thử kết nối Switch với các thành phần khác nhé!

**Ví dụ:**\
![](/hoc-lieu/media/192855dedd5ff428.webp)\
Ở đây chúng ta có thể thấy, với code này, sẽ có thể bấm nút và led 1 sẽ sáng đèn.

**7) Trên Thingbot cũng sẽ còn có cả còi mini (Mini Buzzer) **\
![](/hoc-lieu/media/e264c540b92b94c0.webp)\
Bạn cũng có thể thử với buzzer nhé, giá trị của còi sẽ từ 0 - 100 là tối đa.\
**Code mẫu: **\
![](/hoc-lieu/media/05a31bc24f2cea0e.webp)\
Code này sẽ bật còi buzzer và còi sẽ kêu liên tục

**8)Thử kết nối "Switch" với "Buzzer" nhé:**\
**Ví dụ:**\
![](/hoc-lieu/media/139730929ba7d9b0.webp)\
Bạn dự đoán xem code này sẽ làm được gì, với 2 thành phần nút bấm "Switch" và còi "Buzzer"

## Cơ bản 2

**2. Cơ bản kết nối 2**

**2.1) Hãy thử với 2 động cơ nhé!**

Chúng ta sẽ cần:

- Khung 
- Mạch ThingBot
- Pin 
- 2 động cơ DC vàng

Hãy kết nối mạch với pin (2 viên pin to) thông qua chân nguồn và cắm động cơ vào 2 trong 4 chân kết nối M1, M2, M3, M4.

**Code mẫu:**

![](/hoc-lieu/media/1a93ff6f0adea447.webp)

Sau đó bạn hãy thử với các khối lệnh "repeat", "wait", "forever" nhé!

**2.2) Với 4 động cơ thì chúng ta nên làm thế nào?**

Chúng ta sẽ cần:

- Khung 
- Mạch ThingBot
- Pin 
- 4 động cơ DC vàng

Cũng giống như bên trên các bạn nhé!

**Code mẫu: **

![](/hoc-lieu/media/2fb9efa62afb6c1d.webp)

Sau đó bạn hãy thử với các khối lệnh "repeat", "wait", "forever" nhé!

**2.3)Servo thì sao? Servo là gì ?**

Giải thích 1 cách dễ hiểu và ngắn gọn thì động cơ servo giống như động cơ thường nhưng khác ở 1 điểm là nó có thể điều chỉnh được ở các góc, dừng lại, tiến tới góc đó,... Sẽ có 1 số các loại servo khác nhau như servo quay liên tục, servo 180 độ,...

 Đối với servo chúng ta sẽ sử dụng khối lệnh: 

![](/hoc-lieu/media/b3719246ee1f16fb.webp)

**Ví dụ:**

**Tôi muốn quay servo S1 tới góc 100 độ (đối với servo 180 độ)**![](/hoc-lieu/media/d9d548e17320c568.webp)

## Nâng cao

![](/hoc-lieu/media/223507bf99e5f9d6.webp)

**6) Hãy thử**** kết nối tay PS2 với ThingBot nhé!**

**Chúng ta sẽ cần:**

- **Khung **
- ******Mạch ThingBot******
- ******Pin ******
- **Receiver**

**\**

Sử dụng dây 6 pin kết nối theo đúng vị trí chân header 6 pin của ThingBot đối với receiver của PS2. Bạn hãy lưu ý chân đầu và cuối của receiver và ThingBotShield nhé, bởi với cùng thứ tự cắm nhưng nếu lộn ngược lại thì sẽ không hoạt động.

cùng với đó là trong ThingEduBlock ta cần khởi tạo kết nối của receiver PS2 đối với ThingBotShield:

**Ví dụ** đây sẽ là code nếu bạn muốn ThingBot di chuyển đi thẳng hoặc đi lùi với 2 bánh mecanum sử dụng động cơ DC trong bộ kit:

**Giải thích:**

Với 3 khối khởi tạo trên cùng, ta có thể thấy khối **Read PS2 receiver data (đọc dữ liệu từ PS2) **được đặt trong** vòng lặp forever **đó là bởi chúng ta sẽ cần đọc dữ liệu từ tay cầm thông qua** receiver** liên tục và vì thế chúng ta phải lặp lại khối đó**.**

**Với khối lệnh sau đó sẽ được hiểu như sau: Nếu (if...) phím "up" của PS2 được nhấn thì 2 khối bên dưới sẽ được thực thi không thì (else...) nếu (if...) phím "down" được nhấn thì 2 khối bên dưới sẽ được thực thi còn không thì sẽ thực hiện 2 khối cuối cùng.**

**Code mẫu full:\
![](/hoc-lieu/media/3544d89d3686174c.webp)\**

