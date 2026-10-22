---
title: "Sửa lỗi thường gặp"
description: "Máy không thấy bo, nạp lỗi, không kết nối được Bluetooth, động cơ không chạy, cảm biến ra số lạ: nguyên nhân và cách xử lý khi dùng ThingBlock với ThingBot"
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
- Dự án có khối **RGB LED Strip**: ở bản 0.4.0 khối này không biên dịch được với ThingBot. Bỏ khối đó đi.
- Dùng khối danh sách hoặc khối tự tạo có tham số: bản 0.4.0 chưa sinh mã đúng cho hai loại khối này khi nạp. Dùng biến thường và khối tự tạo không tham số.

**Nạp báo lỗi ở bước ghi xuống bo (Writing to your board…)**

- Một phần mềm khác đang giữ cổng (Arduino IDE, một cửa sổ ThingBlock thứ hai, Monitor của chương trình khác): đóng chúng rồi nạp lại.
- Rút dây USB, cắm lại, bấm **Connect** chọn lại cổng.
- Vẫn không được: đưa chip vào chế độ nạp bằng tay. Rút nguồn, tháo mạch ThingBot khỏi ThingBotShield, **giữ nút BOOT**, bấm nút còn lại một lần, rồi thả BOOT và nạp lại. Ảnh vị trí hai nút ở trang [Hỗ trợ sử dụng](/khoa-hoc/thingedu/thingbot/ho-tro-su-dung) (mục lỗi "error 31"). Nạp xong, cắm mạch lại vào ThingBotShield và bật nguồn.

**Nạp xong nhưng bo không chạy chương trình mới**

- Bo đang chạy firmware Live (đã dùng chế độ chạy trực tiếp): nạp lại ở chế độ nạp sẽ thay firmware Live. Ngược lại, muốn quay về Live phải bấm **Update my Device** để cài lại firmware Live.
- Vừa nạp ở chế độ nạp bằng tay (giữ BOOT): rút nguồn rồi bật lại để chip chạy chương trình.

## Chế độ chạy trực tiếp (Live)

**Bấm Bắt đầu tìm kiếm mà không thấy ThingBot**

- Bo chưa có firmware Live, hoặc vừa nạp chương trình khác: bấm **Update my Device** và cài firmware (cần cắm USB).
- Bluetooth của máy tính đang tắt. Máy cần Bluetooth 4.0 trở lên (Bluetooth LE).
- macOS: lần đầu ThingBlock xin quyền dùng Bluetooth, hãy bấm Cho phép. Nếu lỡ từ chối, bật lại ở **Cài đặt hệ thống → Quyền riêng tư & Bảo mật → Bluetooth**.
- Điện thoại (app ThingBot Remote) hoặc máy khác đang nối với bo: mỗi lần chỉ một thiết bị. Ngắt kết nối thiết bị kia.
- Lớp học có nhiều robot: dán nhãn tên Bluetooth lên từng robot để học sinh chọn đúng bo của mình.

**Đang chạy Live thì robot không dừng**

Bấm Stop hoặc mất Bluetooth **không tắt động cơ** ở bản 0.4.0. Bấm phím cách nếu chương trình có đoạn phanh `khi bấm phím phím trắng`, hoặc tắt công tắc nguồn pin. Luôn thêm đoạn phanh vào mọi chương trình Live.

**Robot chạy tiến được nhưng không lùi được ở Live**

Đúng như vậy ở bản 0.4.0: khối `motor speed` chỉ nhận 0 tới 100. Bài nào cần lùi hoặc xoay tại chỗ thì dùng chế độ nạp.

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
| Còi không kêu với khối `set buzzer` | Ở bản 0.4.0 khối này không phát tiếng. Dùng `play note` |
| Robot đứng yên ngay từ đầu, không khối nào chạy | Chương trình có `init PS2 on ThingBot` mà chưa cắm bộ thu PS2, hoặc cắm ngược chiều: khối này chờ mãi tới khi bộ thu trả lời |

## Cảm biến và màn hình

| Hiện tượng | Kiểm tra |
|---|---|
| Nhiệt độ hiện **nan** hoặc 0 | Dây DHT11 lỏng, cắm sai chân (ThingBot dùng **IO4**), đọc quá nhanh. Đợi 2 giây sau khi khởi tạo và giữa hai lần đọc |
| Số đo mất phần lẻ sau khi mở lại dự án | Bản 0.4.0 không lưu kiểu **Decimal** của biến: mở lại tệp thì biến thành số nguyên. Với DHT11 không sao vì cảm biến vốn trả số nguyên |
| Siêu âm luôn ra **0** | Cảm biến lỏng dây hoặc hỏng. Không có vật phía trước thì khối ra số lớn (khoảng 340 cm), không ra 0 |
| Siêu âm đo sai, số nhảy lung tung | Nhầm TRIG và ECHO (ThingBot dùng TRIG **IO0**, ECHO **IO4**); vật quá gần (dưới 3 cm) hoặc mặt vật xiên, mềm |
| Màn OLED không hiện gì | Cắm đúng cổng I2C chưa, địa chỉ trong khối `init` là **0x3C**, cuối mỗi lần vẽ có khối `refresh` chưa |
| Monitor hiện ký tự lạ | Tốc độ trong khung Monitor khác tốc độ ở khối `begin serial`. Chọn cùng một số, ví dụ 115200 |

Vẫn chưa được: ghi lại phiên bản ThingBlock (số trong tên tệp cài, ví dụ 0.4.0), hệ điều hành, ảnh chụp chương trình và thông báo lỗi, rồi báo cho đội ThingEdu.
