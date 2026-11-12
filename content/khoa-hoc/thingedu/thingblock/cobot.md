---
title: "Mạch CoBot"
description: "Lập trình robot dò đường CoBot bằng ThingBlock 0.8: chân cắm, khối động cơ, bốn mắt dò line, đèn, cảm biến màu, năm ví dụ và cách chỉnh ngưỡng khi xe đi lệch vạch"
nguon: "ThingEdu, Maker Việt"
---

**CoBot** là robot dò đường của Làng Maker: xe hai bánh chạy theo **vạch** dán trên sàn, do ThingEdu và Maker Việt làm, mã Arduino mẫu mở tại [makerviet/cobot-arduino](https://github.com/makerviet/cobot-arduino). Từ bản 0.8, ThingBlock lập trình được CoBot bằng khối.

## Trên xe có gì

| Bộ phận | Nối vào chip | Khối |
|---|---|---|
| Chip | ESP32-C3, như ThingBot; cổng USB có sẵn trên chip | |
| Động cơ bánh trái | IO2, IO10 | `CoBot [tiến] tốc độ…`, `động cơ [trái] tốc độ…` |
| Động cơ bánh phải | IO6, IO5 | như trên |
| Mắt dò line 1, 2, 3, 4 (trái → phải) | IO4, IO3, IO1, IO0 | `đọc mắt [1]`, `mắt [1] thấy vạch?` |
| Đèn hồng ngoại của mắt | chung một chân | `[bật] đèn hồng ngoại của mắt` |
| Đèn trắng dưới gầm | | `[bật] đèn trắng` |
| Cảm biến màu | Cổng I2C (SDA IO8, SCL IO9) | nhóm **Cảm biến màu**, có sẵn khi chọn CoBot |

Mỗi **mắt dò line** có một đèn hồng ngoại (mắt người không thấy) và một "con ngươi" đo ánh sáng hắt về. Như em rọi đèn pin xuống sàn trong phòng tối: nền sáng hắt lại nhiều, vạch đen "nuốt" ánh sáng. Mắt trả về số **0 tới 4095**: vạch tối cho số nhỏ, nền sáng cho số lớn. Đèn hồng ngoại phải **bật** thì mắt mới thấy; khối `khởi động CoBot` bật sẵn.

Em không cần nhớ số chân: chọn mạch **CoBot** là các khối đã biết chân nào nối gì. Số chân chỉ để đọc khung **Mã Arduino**, nơi mỗi dòng có chú thích tiếng Việt.

## Chọn mạch và nạp

1. **Chọn mạch → CoBot**. Cột danh mục có thêm nhóm **CoBot** và **Cảm biến màu**.
2. Xếp khối dưới `khi Arduino khởi động` và `vòng lặp Arduino` như với ThingBot. Bắt đầu bằng `khởi động CoBot`.
3. Cắm USB, **Connect**, **Nạp**. Lần đầu cần tải gói bo ESP32 (như [Cài đặt](/khoa-hoc/thingedu/thingblock/cai-dat)).

CoBot **chưa có mô phỏng** và **chưa có chế độ Live**: khung bên phải báo *CoBot chưa có mô phỏng. Nạp chương trình xuống mạch để chạy thử.* Kê xe lên để bánh không chạm sàn khi thử động cơ.

## Khối CoBot

| Khối | Ý nghĩa |
|---|---|
| `khởi động CoBot` | Chuẩn bị hai động cơ, bật đèn hồng ngoại của mắt, tắt đèn trắng. Đặt trong `khi Arduino khởi động` |
| `CoBot [tiến] tốc độ (50) %` | Tiến, lùi, rẽ trái, rẽ phải, xoay trái, xoay phải. Tốc độ 0–100. *Rẽ*: một bánh đứng, bánh kia chạy. *Xoay*: hai bánh ngược chiều, xe quay tại chỗ |
| `dừng CoBot` | Hai bánh đứng |
| `động cơ [trái] tốc độ (50) %` | Từng bánh, −100 tới 100; số âm là bánh quay lùi |
| `bánh phải nhanh hơn bánh trái (10) %` | Hai động cơ không bao giờ quay nhanh y hệt nhau. Xe đi thẳng mà lệch sang phải thì thử 10; lệch sang trái thì dùng số âm |
| `đọc mắt [1]` | Số 0–4095 của một mắt |
| `mắt [1] thấy vạch?` | Đúng/sai, so số đọc với ngưỡng |
| `mắt thấy vạch khi số đọc [≤] (2000)` | Đặt ngưỡng và chiều so sánh. ≤ là nhỏ hơn hoặc bằng (vạch tối trên nền sáng), ≥ là lớn hơn hoặc bằng (vạch sáng trên nền tối) |
| `mẫu 4 mắt` | Bốn chữ số từ mắt 1 tới mắt 4, 1 là thấy vạch: `0110` là hai mắt giữa thấy vạch |
| `mẫu 4 mắt là [0110]?` | So với một mẫu; viết `x` cho mắt nào thấy hay không cũng được |
| `[bật] đèn hồng ngoại của mắt` | Tắt để tiết kiệm pin khi không dò line |
| `[bật] đèn trắng` | Chiếu sáng mặt sàn dưới cảm biến màu, để màu đọc như nhau cả khi phòng tối |

Khối cảm biến màu (`khởi động cảm biến màu`, `cảm biến màu đọc [đỏ]`, `cảm biến màu thấy màu [đỏ]?`, `tên màu cảm biến thấy`) xem ở [Khối lệnh mở rộng](/khoa-hoc/thingedu/thingblock/khoi-lenh-mo-rong#cảm-biến-màu-i2c-từ-bản-08).

## Năm ví dụ

**Tập tin → Ví dụ… → CoBot**, từ dễ đến khó:

| # | Ví dụ | Mức | Cần | Em học gì |
|---|---|---|---|---|
| 1 | Xe giao hàng chạy thử | 1 | CoBot | Tiến, lùi, rẽ, xoay tại chỗ rồi dừng. Kiểm tra bánh nào quay ngược |
| 2 | Bốn mắt nhìn sàn | 1 | CoBot, dây USB | In số của 4 mắt lên khung Monitor. Đặt xe lên vạch rồi lên nền, ghi hai số, chọn **ngưỡng** ở giữa |
| 3 | Dò line: xe theo vạch | 2 | Sân có vạch (băng dính đen trên nền sáng) | Mắt ngoài cùng thấy vạch thì xoay về phía đó, còn lại đi thẳng |
| 4 | Xe buýt dừng ở trạm đỏ | 2 | Sân dò line có dán một ô đỏ | Dò line; cảm biến màu thấy đỏ thì dừng 3 giây như xe buýt đón khách, rồi đi tiếp |
| 5 | Tìm đường trong mê cung vạch | 3 | Mê cung vẽ bằng vạch, ngã rẽ vuông góc, có ngõ cụt | Gặp ngã rẽ trái thì rẽ trái, ngõ cụt thì quay đầu, cứ thế tới đích (quy tắc bám tường trái) |

## Xe đi lệch vạch thì sao

Kiểm theo thứ tự:

1. **Pin**: bật công tắc, pin đã sạc. Pin yếu thì bánh chậm, xe bò lệch.
2. **Ngưỡng**: chạy ví dụ *Bốn mắt nhìn sàn*, đọc số khi mắt ở trên vạch và trên nền. Nếu số trên vạch *lớn hơn* số trên nền (vạch sáng, nền tối), đổi khối `mắt thấy vạch khi số đọc` từ **≤** sang **≥**. Nếu hai số gần nhau, lau mắt, hạ xe thấp hơn hoặc dùng băng dính đen đậm hơn.
3. **Đèn hồng ngoại** đang bật chưa (`khởi động CoBot` đã bật sẵn).
4. **Hai bánh lệch tốc độ**: dùng `bánh phải nhanh hơn bánh trái (…) %`, thử 10 hoặc −10.
5. **Ánh sáng phòng**: nắng chiếu thẳng xuống sàn làm mắt đọc sai. Kéo rèm hoặc đổi chỗ.

Vẫn chưa được: báo cho đội ThingEdu kèm số đọc của 4 mắt trên vạch và trên nền, ảnh sân và ảnh chương trình.

*Nguồn: nhãn khối và chân cắm CoBot trong mã nguồn ThingEdu/thingblock-editor bản 0.8 (12/11/2026), theo mẫu Arduino mở makerviet/cobot-arduino.*
