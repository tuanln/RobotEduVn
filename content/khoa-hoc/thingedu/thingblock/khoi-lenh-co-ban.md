---
title: "Khối lệnh cơ bản"
description: "Các nhóm khối lõi của ThingBlock: Sự kiện, Điều khiển, Cảm biến, Các phép toán, Các biến số, Khối của tôi và nhóm Arduino"
nguon: "ThingEdu"
---

Các nhóm khối lõi hiện tiếng Việt và giống Scratch. ThingBlock bỏ các nhóm Chuyển động, Hiển thị, Âm thanh của Scratch vì không có sân khấu và nhân vật: mọi thứ diễn ra trên bo mạch.

Ký hiệu trong bảng: **Nạp** = dùng được khi nạp chương trình xuống ThingBot; **Live** = dùng được ở chế độ chạy trực tiếp.

## Sự kiện

Khối mũ, đứng đầu mỗi chồng khối. Chồng khối không có mũ thì không chạy.

| Khối | Ý nghĩa | Chế độ |
|---|---|---|
| `khi Arduino khởi động` | Chạy **một lần** khi bo bật hoặc vừa nạp xong. Đặt ở đây các khối khởi tạo, gán giá trị ban đầu | Nạp |
| `vòng lặp Arduino` | Chạy **lặp đi lặp lại mãi** sau phần khởi động | Nạp |
| `Khi bấm vào` lá cờ xanh | Chạy khi bấm **Run** | Live |
| `khi bấm phím [phím trắng]` | Chạy khi bấm một phím trên bàn phím máy tính (phím trắng = phím cách) | Live |

## Điều khiển

| Khối | Ý nghĩa | Chế độ |
|---|---|---|
| `đợi (1) giây` | Chờ một khoảng thời gian, nhận cả số lẻ như 0.5 | Nạp, Live |
| `lặp lại (10)` | Lặp các khối bên trong đúng số lần | Nạp, Live |
| `liên tục` | Lặp mãi mãi | Nạp, Live |
| `nếu ⟨ ⟩ thì` | Chỉ chạy khi điều kiện đúng | Nạp, Live |
| `nếu ⟨ ⟩ thì … nếu không thì` | Hai nhánh: đúng làm việc này, sai làm việc kia | Nạp, Live |
| `đợi đến khi ⟨ ⟩` | Chờ tới khi điều kiện đúng | Nạp, Live |
| `lặp lại cho đến khi ⟨ ⟩` | Lặp tới khi điều kiện đúng thì thôi | Nạp, Live |
| `dừng lại [tất cả]` | Dừng chương trình | Nạp, Live |
| `print (Hello!)` | In chữ hoặc số ra khung Monitor | Live |

Ở chế độ nạp, `vòng lặp Arduino` đã tự lặp mãi nên thường không cần thêm `liên tục`.

## Cảm biến

| Khối | Ý nghĩa | Chế độ |
|---|---|---|
| `đồng hồ bấm giờ` | Số giây kể từ lúc bo bật | Nạp, Live |
| `đặt lại đồng hồ bấm giờ` | Đưa đồng hồ về 0. Ở chế độ nạp bản 0.4.0, khối này **chưa có tác dụng** | Live |
| `phím … được bấm?`, `chuột được nhấn?`, `hỏi … và đợi`… | Đọc bàn phím, chuột, câu trả lời trên máy tính | Live |

Cảm biến thật của robot (khoảng cách, nhiệt độ…) nằm ở nhóm ThingBot và các ngoại vi.

## Các phép toán

| Khối | Ý nghĩa |
|---|---|
| `( ) + ( )`, `-`, `*`, `/` | Cộng, trừ, nhân, chia |
| `lấy ngẫu nhiên từ (1) đến (10)` | Số ngẫu nhiên trong khoảng |
| `( ) > ( )`, `( ) < ( )`, `( ) = ( )` | So sánh, cho kết quả đúng/sai |
| `⟨ ⟩ và ⟨ ⟩`, `⟨ ⟩ hoặc ⟨ ⟩`, `không phải ⟨ ⟩` | Ghép điều kiện |
| `chia lấy dư`, `làm tròn`, `[giá trị tuyệt đối] của ( )` | Phép tính khác |
| `kết hợp`, `ký tự thứ … của chuỗi`, `độ dài của`, `… chứa ký tự …?` | Làm việc với chữ |

Tất cả dùng được ở cả hai chế độ.

## Các biến số

Bấm **Tạo một biến**, đặt tên, rồi dùng:

| Khối | Ý nghĩa |
|---|---|
| `đặt [biến] thành ( )` | Gán giá trị |
| `thay đổi [biến] một lượng (1)` | Cộng thêm (số âm để trừ) |
| khối tròn mang tên biến | Đọc giá trị biến |

Lưu ý khi nạp chương trình:

- Biến mặc định là **số nguyên**. Cảm biến DHT11 vốn trả số nguyên nên không sao.
- Nên đặt tên biến không dấu (`nhietDo`) nếu muốn mã C++ ở khung Generated Code dễ đọc. Tên có dấu vẫn chạy, chỉ là bị đổi thành dạng mã hóa.
- **Danh sách** (Tạo một Danh sách) chưa dùng được khi nạp ở bản 0.4.0: mã sinh ra không biên dịch được.

## Khối của tôi

Bấm **Tạo một khối** để gom một đoạn chương trình thành khối riêng, ví dụ `lái tay`. Khối `định nghĩa [lái tay]` chứa phần thân, còn khối `lái tay` dùng để gọi ở chỗ khác. Chương trình chính nhờ vậy đọc được như một câu.

Ở chế độ nạp bản 0.4.0, khối tự tạo **chưa nhận tham số**: tạo khối không có ô nhập.

## Nhóm Arduino

Xuất hiện khi đã chọn bo, dùng ở chế độ nạp. Tên khối hiện tiếng Anh:

| Khối | Ý nghĩa |
|---|---|
| `set pin (13) mode [OUTPUT]` | Đặt chế độ chân: OUTPUT (xuất), INPUT (nhận), INPUT_PULLUP (nhận, có điện trở kéo lên trong chip) |
| `digital write pin (13) [HIGH]` | Xuất mức cao (HIGH) hoặc thấp (LOW) ra chân |
| `read digital pin (2)` | Đọc mức của chân: 1 hoặc 0 |
| `analog write pin (9) value (128)` | Xuất xung PWM, giá trị 0–255 |
| `read analog pin (0)` | Đọc điện áp dạng số |
| `delay (1000) ms` | Chờ theo mili giây |

Trên ThingBot, chân **IO0** và **IO4** trên ThingBotShield là chân tự do để cắm cảm biến (xem nhãn in trên mạch). Đừng dùng chân 8 và 9: đó là đường I2C nối với chip điều khiển động cơ, dùng sai là động cơ, LED, còi ngừng chạy.
