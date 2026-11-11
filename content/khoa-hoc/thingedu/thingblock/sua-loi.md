---
title: "Sửa lỗi thường gặp"
description: "Máy không thấy bo, nạp lỗi, không kết nối được Bluetooth, động cơ không chạy, cảm biến ra số lạ, camera không lên, CoBot đi lệch vạch: nguyên nhân và cách xử lý khi dùng ThingBlock"
nguon: "ThingEdu"
---

Gặp lỗi, hãy kiểm tra theo thứ tự: **nguồn pin → dây và cổng → chế độ (nạp hay Live) → chương trình**. Phần lớn lỗi của buổi đầu nằm ở hai bước đầu. Chạy [chương trình kiểm tra ThingBot](/khoa-hoc/thingedu/thingblock/lam-quen-thingbot) giúp tách lỗi phần cứng khỏi lỗi chương trình.

## Kết nối và nạp chương trình

**Bấm Connect mà danh sách cổng trống**

- Dây USB chỉ sạc được, không truyền dữ liệu: thử dây khác. Đây là nguyên nhân hay gặp nhất.
- Vừa mở ThingBlock: danh sách có thể trống tới một phút. Chờ rồi bấm lại.
- Cắm thẳng vào máy tính, không qua hub USB.
- Kiểm tra máy có thấy bo không: Windows mở **Device Manager**, mục **Ports (COM & LPT)** có một cổng COM mới khi cắm bo; macOS có thiết bị `/dev/cu.usbmodem…`; Linux có `/dev/ttyACM0`. Trên Linux nhớ thêm tài khoản vào nhóm `dialout` (xem [Cài đặt](/khoa-hoc/thingedu/thingblock/cai-dat)).

**Nạp báo lỗi ở bước biên dịch (Compiling your project…)**

- Chưa tải gói bo ESP32: chọn lại bo ThingBot và bấm **Download** trong hộp Board package.
- Dự án có khối **RGB LED Strip** hoặc ngoại vi **Servo** (chân GPIO): ở bản 0.4.0 và 0.5.0 hai nhóm này không biên dịch được với ThingBot. Lên bản 0.6, hoặc bỏ khối đó đi.
- Dùng khối danh sách: tới bản 0.6 vẫn chưa sinh mã đúng khi nạp. Dùng biến thường.
- Dùng khối tự tạo có tham số: bản 0.4.0 và 0.5.0 chưa sinh mã đúng. Lên bản 0.6, hoặc tạo khối không tham số và truyền giá trị qua biến.
- Nạp xong mà bo chạy chương trình **cũ**: lỗi của bản 0.4.0 và 0.5.0 khi nạp liên tiếp, bản 0.6 đã sửa. Ở bản cũ, bấm Nạp lần nữa.

**Nạp báo lỗi ở bước ghi xuống bo (Writing to your board…)**

- Một phần mềm khác đang giữ cổng (Arduino IDE, một cửa sổ ThingBlock thứ hai, Monitor của chương trình khác): đóng chúng rồi nạp lại.
- Rút dây USB, cắm lại, bấm **Connect** chọn lại cổng.
- Vẫn không được: đưa chip vào chế độ nạp bằng tay. Rút nguồn, tháo mạch ThingBot khỏi ThingBotShield, **giữ nút BOOT**, bấm nút còn lại một lần, rồi thả BOOT và nạp lại. Ảnh vị trí hai nút ở trang [Hỗ trợ sử dụng](/khoa-hoc/thingedu/thingbot/ho-tro-su-dung) (mục lỗi "error 31"). Nạp xong, cắm mạch lại vào ThingBotShield và bật nguồn.

**Nạp xong nhưng bo không chạy chương trình mới**

- Vừa nạp ở chế độ nạp bằng tay (giữ BOOT): rút nguồn rồi bật lại để chip chạy chương trình.

## Chế độ chạy trực tiếp (Live)

**Bấm Bắt đầu tìm kiếm mà không thấy ThingBot**

- Bo chưa có firmware Live, vừa nạp chương trình khác, hoặc vừa lên bản 0.6 (firmware Live mới): bấm **Update my Device** và cài firmware (cần cắm USB).
- Bluetooth của máy tính đang tắt. Máy cần Bluetooth 4.0 trở lên (Bluetooth LE).
- macOS: mở **Cài đặt hệ thống → Quyền riêng tư & Bảo mật → Bluetooth** và kiểm tra ThingBlock đã được bật.
- Điện thoại (app ThingBot Remote) hoặc máy khác đang nối với bo: mỗi lần chỉ một thiết bị. Ngắt kết nối thiết bị kia.
- Lớp học có nhiều robot: dán nhãn tên Bluetooth lên từng robot để học sinh chọn đúng bo của mình.

**Đang chạy Live thì robot không dừng**

Bấm Stop **không tắt động cơ** ở bản 0.4.0 và 0.5.0; từ bản 0.6, Stop tắt mọi động cơ và còi. Mất Bluetooth giữa chừng thì bo giữ lệnh cuối ở mọi bản. Bấm phím cách nếu chương trình có đoạn phanh `khi bấm phím phím trắng`, hoặc tắt công tắc nguồn pin. Luôn thêm đoạn phanh vào mọi chương trình Live.

**Robot chạy tiến được nhưng không lùi được ở Live**

Đúng như vậy ở bản 0.4.0 và 0.5.0: khối `motor speed` chỉ nhận 0 tới 100. Từ bản 0.6 khối nhận −100 tới 100, số âm là lùi (nhớ cài lại firmware Live). Ở bản cũ, bài nào cần lùi hoặc xoay tại chỗ thì dùng chế độ nạp.

**Ở Live hoặc app điện thoại, "tiến" quay ngược với chương trình nạp**

Lỗi của firmware Live trước bản 0.6: hai chế độ dùng hai quy ước chiều khác nhau. Lên bản 0.6, cài lại firmware Live và nạp lại chương trình có khối Phone control. Nếu vẫn ngược trên một robot cụ thể, báo cho đội ThingEdu: chiều bánh chưa được đo trên mọi robot.

## Động cơ, servo, đèn, còi

| Hiện tượng | Kiểm tra |
|---|---|
| Không động cơ nào chạy | Bật công tắc nguồn, pin đã sạc, pin lắp đúng chiều. Nguồn USB không đủ chạy động cơ |
| Một động cơ không chạy | Giắc ở đúng cổng M chưa, cổng trong khối có khớp không. Đổi giắc sang cổng khác để biết lỗi ở động cơ hay ở cổng |
| Bánh quay ngược | Đảo giắc cắm động cơ, hoặc đổi `forward` thành `backward` cho bánh đó |
| Xe chạy lệch dù hai bánh cùng tốc độ | Bình thường: ma sát, động cơ không giống hệt nhau. Giảm tốc độ bánh chạy nhanh hơn vài đơn vị |
| Tốc độ nhỏ thì bánh đứng yên, chỉ kêu ù | Động cơ cần một mức tối thiểu mới thắng được ma sát. Tăng tốc độ lên |
| Servo giật về một phía khi còi đang kêu | Nhạc và servo không chạy cùng lúc được. Phát nhạc xong rồi mới quay servo |
| Servo rung, bo khởi động lại khi servo quay | Pin yếu, nhất là với servo lớn MG996R. Sạc pin |
| Còi không kêu với khối `set buzzer` | Ở bản 0.4.0 và 0.5.0 khối này không phát tiếng; bản 0.6 đã sửa. Dùng `play note` ở bản cũ |
| Lùi động cơ M3 thì servo S5 giật | Lỗi của bản trước 0.6 (M3 dùng nhầm kênh của S5). Lên bản 0.6 |
| Robot đứng yên ngay từ đầu, không khối nào chạy | Chương trình có `init PS2 on ThingBot` mà chưa cắm bộ thu PS2, hoặc cắm ngược chiều: ở bản 0.4.0 và 0.5.0 khối này chờ mãi tới khi bộ thu trả lời (khung Monitor hiện lặp lại `#try config 1`, `2`, `3`…). Từ bản 0.6 khối bỏ qua sau khoảng 10 giây |

## Cảm biến và màn hình

| Hiện tượng | Kiểm tra |
|---|---|
| Nhiệt độ hiện **nan** hoặc 0 | Dây DHT11 lỏng, cắm sai chân (ThingBot dùng **IO4**), đọc quá nhanh. Đợi 2 giây sau khi khởi tạo và giữa hai lần đọc |
| Số đo mất phần lẻ sau khi mở lại dự án | Bản 0.4.0 và 0.5.0 không lưu kiểu **Decimal** của biến: mở lại tệp thì biến thành số nguyên (với DHT11 không sao vì cảm biến vốn trả số nguyên). Bản 0.6 đã sửa |
| Siêu âm luôn ra **0** | Cảm biến lỏng dây hoặc hỏng. Không có vật phía trước thì khối ra số lớn (khoảng 340 cm), không ra 0 |
| Siêu âm đo sai, số nhảy lung tung | Nhầm TRIG và ECHO (ThingBot dùng TRIG **IO0**, ECHO **IO4**); vật quá gần (dưới 3 cm) hoặc mặt vật xiên, mềm |
| Màn OLED không hiện gì | Cắm đúng cổng I2C chưa, địa chỉ trong khối `init oled` là **0x78 (0x3c)**, cuối mỗi lần vẽ có khối `refresh oled display` chưa |
| Monitor không hiện gì | Chưa chọn đúng cổng của bo, hoặc chương trình chưa có khối `begin serial`. Dòng in trong `khi Arduino khởi động` chạy ngay khi nạp xong, mở Monitor muộn thì không thấy: rút dây USB cắm lại để chương trình chạy lại từ đầu |

## Camera AI

*(từ bản 0.8)* Camera AI không cần mạch, nên lỗi thường ở webcam và quyền.

**Khung Sân chơi báo *Chưa được phép dùng camera***

- Lần đầu máy hỏi quyền mà em chọn *Không*: bật lại trong cài đặt hệ thống (macOS: *Quyền riêng tư & Bảo mật → Camera*; Windows: *Privacy & security → Camera*), rồi **mở lại ThingBlock**. Cách làm ở trang [Cài đặt](/khoa-hoc/thingedu/thingblock/cai-dat).

**Báo *Máy này không có camera*, hoặc hình đen**

- Máy không có webcam, hoặc webcam đang bị app khác giữ (Zoom, Meet, trình duyệt): đóng app kia rồi bấm **Camera** lại.
- Máy có hai camera: mở ô **Chọn camera** ở khung Sân chơi và chọn camera khác.
- Không có webcam: chọn **Chuột (không cần webcam)**. Chuột là ngón trỏ, giữ chuột trái là nắm tay, phím mũi tên là nghiêng và gật đầu, phím cách là vỗ hai tay. Hoặc dùng điện thoại làm camera (xem [Camera AI](/khoa-hoc/thingedu/thingblock/camera-ai)).

**Có hình nhưng không thấy chấm trên tay, hoặc chấm nhảy lung tung**

- Phòng tối hoặc ngược sáng: bật đèn, quay mặt về phía cửa sổ.
- Tay quá gần hoặc ra ngoài khung hình; hai tay chồng lên nhau. Đưa tay ra xa một chút, giơ cả bàn tay.
- Trò dùng đầu: đứng lùi để camera thấy **cả đầu và vai**. Lần đầu dùng khối đầu, app nạp thêm mô hình, chờ vài giây.
- Số **hình/giây** ở góc khung nhỏ (dưới 10): máy đang bận, đóng bớt chương trình khác.

**Cử chỉ không nhận**

- Giữ cử chỉ một chút (khoảng nửa giây), bàn tay quay về phía camera. Khối `khi … làm cử chỉ` chỉ chạy lúc tay *vừa đổi* sang cử chỉ đó, đổi sang cử chỉ khác rồi làm lại.
- Chơi bằng chuột: bấm chuột phải hoặc phím 1–7 để đổi cử chỉ; giữ chuột trái là nắm tay.

**Vật không đi theo tay**

- Khối `đưa … tới x: y:` phải nằm trong `liên tục`. Tên vật trong khối phải giống hệt tên lúc `tạo`.

## CoBot

*(từ bản 0.8)* CoBot chưa có mô phỏng và chưa có chế độ Live: mọi thứ thử trên robot thật.

| Hiện tượng | Kiểm tra |
|---|---|
| Khung bên phải báo *CoBot chưa có mô phỏng* | Đúng như vậy ở bản 0.8. Cắm USB, bấm Nạp để chạy trên robot |
| Xe không chạy | Bật công tắc nguồn, pin đã sạc. Chương trình có `khởi động CoBot` trong `khi Arduino khởi động` chưa |
| Xe đi lệch vạch, bỏ vạch | Đổi khối `mắt thấy vạch khi số đọc` giữa **≤** và **≥** (vạch đen trên nền sáng dùng ≤, vạch sáng trên nền tối dùng ≥). Đo lại ngưỡng bằng ví dụ *Bốn mắt nhìn sàn*: đặt mắt trên vạch rồi trên nền, chọn số ở giữa. Lau mắt, tránh nắng chiếu thẳng xuống sàn |
| Mắt luôn ra số nhỏ dù trên nền sáng | Đèn hồng ngoại đang tắt: `khởi động CoBot` bật sẵn, kiểm tra không có khối `tắt đèn hồng ngoại của mắt` |
| Xe đi thẳng mà lệch sang một bên | Hai động cơ không giống hệt nhau: dùng `bánh phải nhanh hơn bánh trái (10) %`, lệch sang trái thì số âm |
| Cảm biến màu luôn ra *đen* | Phòng tối hoặc vật quá xa: bật `đèn trắng`, để vật cách cảm biến 1–2 cm |

Vẫn chưa được: ghi lại phiên bản ThingBlock (số trong tên tệp cài, ví dụ 0.5.0 hay 0.8.0-preview-20261112), hệ điều hành, ảnh chụp chương trình và thông báo lỗi, rồi báo cho đội ThingEdu. Nhiều lỗi ở trang này đã được sửa ở bản 0.6 và 0.8, xem [Bản 0.6: có gì mới](/khoa-hoc/thingedu/thingblock/ban-0-6) và [Bản 0.8: có gì mới](/khoa-hoc/thingedu/thingblock/ban-0-8).
