---
title: "Điều khiển bằng điện thoại"
description: "Ngoại vi Phone control trong ThingBlock và app Android ThingBot Remote: nạp một khối, tải APK, lái robot qua Bluetooth trong lúc chương trình của học sinh đang chạy"
nguon: "ThingEdu"
---

Có hai cách để điện thoại nói chuyện với ThingBot. Cả hai dùng chung giao thức Bluetooth **ThingBot Telemetrix** của chế độ Live.

| | Phone control (khuyên dùng để thi) | Firmware Live + app |
|---|---|---|
| Trên bo chạy gì | **Chương trình của học sinh** (nạp từ ThingBlock) + một khối cho phép điện thoại | Chỉ firmware Live, không có chương trình riêng |
| Điện thoại làm gì | Lái, bấm còi, bật đèn, quay servo **cùng lúc** với các khối tự động của robot | Điều khiển mọi thứ bằng tay |
| Cần | ThingBlock 0.4.0 trở lên (nên 0.6), app ThingBot Remote | Cài firmware Live từ hộp kết nối, app ThingBot Remote |

Trang này hướng dẫn cách thứ nhất.

## Bước 1: thêm khối Phone control trong ThingBlock

1. Chọn bo **ThingBot**, bấm nút góc dưới trái, trong **Choose a Peripheral** bấm **Add** ở thẻ **Phone control**.
2. Kéo khối `allow phone control, board name [ThingBot]` vào `khi Arduino khởi động`. Chữ trong ô là **tên Bluetooth** điện thoại sẽ thấy. Lớp có nhiều robot thì đặt mỗi robot một tên: `ThingBot-To1`, `ThingBot-To2`…
3. Xếp phần tự động của robot như bình thường (cảm biến, OLED, tay PS2…). Lệnh từ điện thoại và khối của học sinh chạy song song trên bo.
4. Cắm USB, **Nạp**. Chương trình nạp xong là bo tự phát Bluetooth, không cần cài firmware Live.

Ví dụ *Robot FanRoc hoàn chỉnh* và *Xe điều khiển từ xa* trong **Tập tin → Ví dụ…** dùng tay PS2; thêm khối Phone control vào là lái được bằng cả hai.

> Chương trình có khối Phone control làm với bản cũ hơn 0.6 **phải nạp lại** bằng ThingBlock 0.6: bản 0.6 thống nhất chiều quay động cơ giữa chế độ nạp, Live và app, và sửa servo quay đủ 0–180°.

## Bước 2: cài app ThingBot Remote trên Android

App **ThingBot Remote** (tên kho: ThingBot Joystick) do Maker Việt × ThingEdu làm, mã nguồn và bản cài trên GitHub.

| Bản | Ngày | Tệp | Dùng để |
|---|---|---|---|
| **v0.3.0 Khối lệnh dạng cây** | 21/09/2026 | `ThingBot-KhoiLenhCay.apk` (khoảng 87 MB) | **Bản đang dùng.** Bảng điều khiển tự dựng và khối lệnh `NẾU…THÌ…NGƯỢC LẠI`, `ĐỢI`, `LẶP LẠI` |
| v0.2.0 Bảng widget | 21/09/2026 | `ThingBot-BangWidget.apk` | Bản trước, khối lệnh dạng danh sách phẳng |
| v0.1.0 Joystick | 07/09/2026 | `ThingBotJoystick.apk` | Lưu trữ, năm màn hình cố định, không nên dùng để dạy |

📥 **Tải bản v0.3.0:** tệp `ThingBot-KhoiLenhCay.apk` (87 MB, bản phát hành 21/09/2026) **đang được đưa lên máy chủ của Làng, link tải sẽ có tại đây trong vài ngày**. Trước mắt, mentor ở Làng chép tệp cho phụ huynh qua Zalo hoặc USB. Trên điện thoại:

1. Nhận tệp `.apk` (qua link tải ở trên khi có, hoặc do mentor gửi); tệp nằm trong thư mục Tải xuống.
2. Android hỏi *Cài ứng dụng không rõ nguồn gốc*: cho phép với trình duyệt đang dùng. APK chưa ký kho nên Play Protect có thể hỏi thêm một lần, chọn **Vẫn cài đặt**.
3. Mở app, cấp quyền **Bluetooth** và **Vị trí** (Android cần quyền vị trí để quét Bluetooth LE).

Chưa có bản iPhone. iPad, máy tính bảng Android dùng được như điện thoại.

## Bước 3: lái

1. Bật nguồn ThingBot (công tắc trên ThingBotShield). Động cơ chỉ chạy khi có pin, nguồn USB không đủ.
2. Trong app, tạo một **sản phẩm** rồi bấm **Kết nối**, chọn đúng tên Bluetooth đã đặt ở khối.
3. **Bảng điều khiển**: cần gạt lái hai bánh, thanh trượt servo và động cơ, nút đèn, nút còi, đồng hồ cảm biến. Chế độ **Sửa bảng** cho kéo widget từ khay ra, xếp theo robot của mình. Có sẵn bảy mẫu, trong đó mẫu *Nhà nuôi tằm* của dự án BlueSilk.
4. **Khối lệnh** (huy hiệu 🧩 ở góc widget trong chế độ Sửa bảng): hai loại mũ. `KHI BẤM` chạy một kịch bản tuần tự, có `ĐỢI` và `LẶP LẠI n lần`. `KHI <điều kiện>` là luật phản xạ, xét lại mỗi nhịp, ví dụ *khi nhiệt độ > 30 thì bật quạt*. App cố ý **không có** `LẶP MÃI` và không cho lồng vòng lặp trong vòng lặp.

## An toàn: ba điều phải nhớ

- **Đóng app không dừng được xe.** Rời bảng điều khiển thì app gửi lệnh dừng, nhưng vuốt tắt app, app bị Android tắt hay mất Bluetooth thì bo **giữ nguyên lệnh cuối** và xe chạy tới khi hết pin hoặc có người tắt nguồn. Khi thử, để tay gần công tắc nguồn; trong chương trình ThingBlock nên có khối tự dừng động cơ khi cảm biến siêu âm thấy vật quá gần.
- **Mỗi bo chỉ nhận một kết nối Bluetooth.** Đang nối Live trong ThingBlock thì điện thoại không thấy bo, và ngược lại. Ngắt bên kia trước.
- **Lớp nhiều robot**: đặt tên Bluetooth khác nhau trong khối và dán nhãn lên robot, để học sinh không lái nhầm xe bạn.

## Không thấy robot trong app?

| Hiện tượng | Kiểm tra |
|---|---|
| Quét không ra tên bo | Chương trình đã có khối `allow phone control` và đã nạp xong chưa; nguồn đã bật chưa; ThingBlock còn đang nối Live không |
| Thấy bo nhưng kết nối rớt ngay | Pin yếu; đứng gần hơn (Bluetooth LE trong lớp học khoảng 10 m) |
| Lái tiến mà xe lùi | Nạp lại bằng ThingBlock 0.6; vẫn ngược thì đảo giắc động cơ như hướng dẫn ở [Sửa lỗi thường gặp](/khoa-hoc/thingedu/thingblock/sua-loi) |
| Servo không tới góc 0 hoặc 180 | Nạp lại bằng ThingBlock 0.6 (bản cũ kẹt hai đầu) |
| App không cài được | Android 8 trở lên; cho phép cài từ trình duyệt; còn trống hơn 200 MB |

*Nguồn: ghi chú phát hành ThingBlock 0.4.0 và 0.6.0 (ThingEdu/thingblock-desktop), tài liệu kho ThingEdu/thingbot-remote (bản v0.3.0, 21/09/2026).*
