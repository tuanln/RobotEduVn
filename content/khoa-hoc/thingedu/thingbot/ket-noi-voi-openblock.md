---
title: "Kết nối với OpenBlock"
---

## Giao diện cơ bản

# 

Truy cập phần mềm OpenBlock

Sau khi cài đặt xong, bạn có thể mở phần mềm thông qua biểu tượng ngoài màn hình hoặc thông qua thanh tìm kiếm của hệ điều hành và gõ ***OpenBlock***, ta sẽ thấy được giao diện của phần mềm:

 ![](/hoc-lieu/media/dfab76b920427e29.webp)

Đây là giao diện chính của Scratch (ThingEduBlock dựa trên phiên bản [OpenBlock Desktop](https://github.com/openblockcc/openblock-desktop)), tại giao diện này chúng ta chỉ có thể lập trình với những block cơ bản nhất và điều khiển nhân vật “quái vật nhỏ” màu xanh lá ở bên phía bên phải màn hình.

# 

 

Kết nối phần cứng:

# 

# 

Bạn hãy sử dụng một dây type C để có thể kết nối tới mạch ThingBot, giống như hình nhé:

 ![](/hoc-lieu/media/a16ba14f23508d33.webp)

Tại giao diện chính, hãy chọn thiết bị mà bạn muốn lập trình bằng cách bấm vào ***No device selected*** trên thanh công cụ bên trên cùng:

 ![](/hoc-lieu/media/4d4025bbcf187730.webp)

và chọn thiết bị mà bạn muốn kết nối:

Như cách bạn có thể thấy, các thiết bị hiện OpenBlock hỗ trợ đó chính là Arduino Uno, Arduino Nano, Esp32, Esp32 – C3, Cobot V1, ThingBot và VIA – BanhMi.

 ![](/hoc-lieu/media/6769a112ec241e3a.webp)

Tương tự với những phần cứng khác, bạn hãy kết nối tới mạch đó trước rồi hãy kết nối trong ThingEduBlock nhé!

 Click vào biểu tượng của ThingBot:

 ![](/hoc-lieu/media/b5c7e2843e38c2ff.webp)

  và chọn cổng ***Connect***

  ![](/hoc-lieu/media/d2d077f2a54f40ae.webp)           

tiếp sau là ***Go to editor*** để có thể vào giao diện lập trình chính.

 ![](/hoc-lieu/media/ad1ccc8d17585751.webp)

Giao diện lập trình chính với phần cứng là ThingBot:

# 

 ![](/hoc-lieu/media/9d1c8d70944feb09.webp)

Như các bạn có thể thấy ở phần trên cùng là những thông tin về việc kết nối phần cứng của bạn:

![](/hoc-lieu/media/1d133cc30c923619.webp)

Ở mũi tên số 1, đó là mục ***File*** nơi mà bạn có thể chọn ***New***: tạo project mới, ***Load from your computer*** hoặc lưu về máy tính của bạn ***Save to your computer***. 

Tại vị trí thứ 2, đó chính là thể hiện tên của phần cứng bạn đã chọn.

Vị trí thứ 3, thể hiện tên thiết bị phần cứng đang kết nối và tên cổng kết nối.

Cuối cùng, mũi tên thứ 4 là nơi mà bạn có thể đặt tên cho Project của bạn.

## Lập trình ThingBot

Tiếp theo, sẽ là phần chính của OpenBlock đó chính là **lập trình** và kết nối cũng như nạp Code cho phần cứng. 

Như bạn có thể thấy, ở bên trái của giao diện, có 2 cột tách biệt nhau đó chính là đầu mục được phân tách sẵn của mỗi phần lập trình và trong mỗi đầu mục sẽ là những khối lệnh của riêng từng phần để có thể dễ dàng lập trình hơn.

![](/hoc-lieu/media/2fb3e49d50dbf89f.webp)

Tại mục ***Events*** và là mục đầu tiên, Block ***when Arduino begin*** - khối lệnh bắt buộc phải có và phải được đặt đầu tiên của mỗi chương trình.

Mục ***Control*** là những khối lệnh logic đơn giản như ***wait 1 seconds***: đợi 1 giây hoặc những khối logic như: 

***forever*** có chức năng tương tự ***vòng lặp loop***, khi bạn đặt lệnh trong khối này thì lệnh sẽ được thực thi lại vô hạn lần.

***wait*** có tác dụng như hàm delay(), đợi bao nhiêu lâu trước khi thực hiện lệnh tiếp theo.

***repeat*** thực thi khối lệnh bên trong bao nhiêu lần.

***if… then*** nếu khối ![](/hoc-lieu/media/d8661c679289c586.webp)lệnh bên trong đúng ![](/hoc-lieu/media/6a429c0cbb75c42d.webp) thì sẽ thực thi khối lệnh bên dưới:

***if… then… else*** tương tụ như trên nhưng trong trường hợp khối tlệnh bên trong if không đúng thì khối lệnh dưới else  sẽ được thực thi.![](/hoc-lieu/media/5eae0c997b16746a.webp)

![](/hoc-lieu/media/19dca4c162a02600.webp)

***wait until*** đợi cho tới thi khối lệnh bên trong được thực thi. 

![](/hoc-lieu/media/a36e1a5f0e1092e3.webp)

***repeat until*** lặp lại khối lệnh bên dưới cho đến khi khối lệnh sau ***until*** được thực thi.

Tại mục ***Operator*** - các chức năng như toán tử đơn giản trong lập trình như +, -, \*, /.![](/hoc-lieu/media/8538bedbc6747efb.webp)

***Variables***: tạo biến hoặc ***Make a list***: tạo danh sách. 

![](/hoc-lieu/media/13a81afcd26a627e.webp)

Mục ***My Blocks*** - tạo lập thêm block tùy biến của riêng bạn.![](/hoc-lieu/media/4e73e66517ce2b0f.webp)

***Pins*** - những khối lệnh dành cho việc setup các chân cắm và lấy dữ liệu và sẽ có những khối lệnh bắt buộc như ***set pin/ set digital pin*** và đọc giá trị từ pin như ***read digital pin/ read analog pin***. ![](/hoc-lieu/media/bc513aefd1f84ea3.webp)

***set pin/ set digital pin***: bạn điều chỉnh tùy theo vị trí cắm dây trên mạch của bạn.

***mode input/out***: thiết lập trạng thái mà bạn muốn chân pin đó làm gì.

***Serial*** - những khối lệnh dùng để xuất dữ liệu thông qua Serial Mornitor.\
![](/hoc-lieu/media/cd83f32283629033.webp)

Trong ***Data***: những khối lệnh nhằm tùy biến dữ liệu đầu ra của bạn.![](/hoc-lieu/media/593b90f263b216cd.webp)

***ThingBot*** - kết nối và gửi dữ liệu cho servo/động cơ, khối lệnh ***init board*** màu xanh lá là bắt buộc và phải để ở phần đầu trước khi ***set motor/ set servo***. ![](/hoc-lieu/media/646d15fce314081f.webp)

***set buzzer*** – set còi buzzer ở 0 hoặc 1![](/hoc-lieu/media/55bd17525f4afee0.webp)

***set led*** – tại chân 1 hoặc 2 và ở 0 – 100 (với 0 là tắt và từ 1 tới 100 là tăng dần độ sáng)

![](/hoc-lieu/media/4e3e27ac2e07eeee.webp) “read switch” sẽ đọc giá trị của nút nhấn bên hông của ThingBotShield.

**\
“init PS2 on ThingBot“ khởi tạo kết nối giữa receiver của tay cầm PS2 và ThingBot. ![](/hoc-lieu/media/0bc81707f02b5e25.webp) \
và LÀ KHỐI BẮT BUỘC KHI MUỐN SỬ DỤNG PS2**\

Khối ***set*** ***motor*** sẽ bao gồm ô lựa chọn đầu tiên đó chính là set chân động cơ nào giữa từ M1 đến M4 tùy vào vị trí bạn cắm động cơ trên ThingBot, ô lựa chọn thứ 2 đó chính là chọn hướng động cơ sẽ chạy bao gồm ***forward*** – động cơ sẽ khởi động lăn về phía trước, ***backward*** – động cơ sẽ khỏi động lăn ngược lại 

và ***at*** ***speed*** – tại tốc độ từ 0 – 100 và đối với **servo là angle (góc)** từ 0 đến 180\
1) Đối với động cơ **180 độ**: sẽ sử dụng từ góc **0 - 180**, servo sẽ quay tới góc đó. Tuy nhiên, với động cơ SG92 thì phần lớn sẽ ko quay đủ 180 độ do **giới hạn vật lý của chính servo (thường là 0-160 độ).** \
2) Đối với động cơ **360 độ:**

- **Khoảng** **0-75** sẽ **giảm tốc dần theo chiều kim đồng hồ**
- **Khoảng 75-85** sẽ **dừng hẳn**
- **Khoảng \>= 85** sẽ **tăng tốc dần theo ngược chiều kim đồng hồ**

**LƯU Ý: Không phải servo nào cũng sẽ giống nhau, nên, các bạn phải tìm đúng các giá trị mong muốn bằng cách thử nghiệm nhiều giá trị. VD: đối với servo mình đang dùng thì khoảng dừng của nó là 79, bắt đầu từ 80 sẽ tăng tốc dần theo ngược chiều kim đồng hồ.**

![](/hoc-lieu/media/ebc5daa9ab77454a.webp)

Tại mục ***PS2***: kết nối và lập trình tay cầm PS2, khối lệnh ***init ps2 receiver pin*** là bắt buộc và phải để ở trước những khối lệnh liên quan đến PS2 còn lại. \
![](/hoc-lieu/media/9e14740ade74419b.webp)

***init ps2 receiver pin DIN…*** – tùy thuộc vào vị trí kết nối các chân tín hiệu của khối receiver mà chúng ta sẽ hiệu chỉnh những ô lựa chọn này.![](/hoc-lieu/media/92dafee26cc43539.webp)

Sau khi, lập trình xong bạn có thể chọn ***Upload*** để có thể nạp code vào phần cứng. ![](/hoc-lieu/media/078a154c06b20cb5.webp)

Trong quá trình upload, sẽ có một cửa sổ hiện lên: ![](/hoc-lieu/media/35715d212bf59a25.webp)

Như trong hình, các bạn đã nạp code thành công cho phần cứng của mình nhờ sự xuất hiện của dòng chữ ***Upload success***.

Tuy nhiên, sẽ có lúc upload bị lỗi:\
![](/hoc-lieu/media/5f15985940c6fdc0.webp)

Ta có thể thấy dòng chữ ***Upload error*** thể hiện cho điều đó.

Lúc này, bạn cần kiểm tra lại code hoặc phần dây kết nối với phần cứng có gặp vấn đề gì không và hãy upload lại nhé!

**Lưu chương trình:** 

Bạn có thể lưu chương trình bằng cách chọn ***File*** -\> ***Save to your computer***.

