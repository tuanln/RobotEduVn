---
title: "Robot đưa thư"
description: "Xe đi theo lộ trình trên bản đồ sàn bằng các hàm đi thẳng, rẽ trái, rẽ phải; tự canh thời gian rẽ 90°."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Hàm dùng biến làm tham số, hiệu chỉnh thời gian rẽ

**Phần cứng:** Động cơ M1 (bánh trái), M2 (bánh phải); Nút SW.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Robot đưa thư**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-13-robot-dua-thu.tb](/hoc-lieu/thingblock/vi-du/k12-13-robot-dua-thu.tb)

> Bài 13 · Robot đưa thư (K1-M7)
> Bấm SW để xe xuất phát. Đặt biến "số giây" trước khi gọi "đi thẳng" để chọn quãng đường. Biến "rẽ 90" là thời gian xoay một góc vuông: em đo trên sàn thật rồi sửa con số cho đúng xe của mình.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt [rẽ 90] thành [0.6]        ← Thử 0,6 giây trước, xe rẽ quá thì giảm, rẽ thiếu thì tăng.

vòng lặp Arduino
đợi cho đến khi <đọc nút SW>
đợi (1) giây
đặt [số giây] thành [2]        ← Lộ trình: đi 2 giây, rẽ phải, đi 1 giây, rẽ trái, đi 1,5 giây là tới hộp thư.
đi thẳng
rẽ phải
đặt [số giây] thành [1]
đi thẳng
rẽ trái
đặt [số giây] thành [1.5]
đi thẳng

định nghĩa đi thẳng
động cơ [M1] chạy [tiến] tốc độ (60)%
động cơ [M2] chạy [tiến] tốc độ (60)%
đợi (số giây) giây
động cơ [M1] chạy [tiến] tốc độ (0)%
động cơ [M2] chạy [tiến] tốc độ (0)%
đợi (0.3) giây

định nghĩa rẽ phải
động cơ [M1] chạy [tiến] tốc độ (60)%
động cơ [M2] chạy [lùi] tốc độ (60)%
đợi (rẽ 90) giây
động cơ [M1] chạy [tiến] tốc độ (0)%
động cơ [M2] chạy [tiến] tốc độ (0)%
đợi (0.3) giây

định nghĩa rẽ trái
động cơ [M1] chạy [lùi] tốc độ (60)%
động cơ [M2] chạy [tiến] tốc độ (60)%
đợi (rẽ 90) giây
động cơ [M1] chạy [tiến] tốc độ (0)%
động cơ [M2] chạy [tiến] tốc độ (0)%
đợi (0.3) giây
```

## Chương trình làm gì

- Ba hàm **đi thẳng, rẽ phải, rẽ trái**. Hàm *đi thẳng* chạy hai bánh 60 % trong **số giây** rồi dừng và nghỉ 0,3 giây. Đặt biến **số giây** trước khi gọi là cách truyền *quãng đường* vào hàm.
- **rẽ 90** là số giây xe xoay đúng một góc vuông (hai bánh ngược chiều). Đặt 0,6 lúc khởi động; xe của em rẽ quá thì giảm, rẽ thiếu thì tăng.
- Lộ trình: chờ bấm SW, đợi 1 giây cho tay rời xe, rồi đi 2 giây, rẽ phải, đi 1 giây, rẽ trái, đi 1,5 giây.

## Thử thách

- Vẽ bản đồ sàn (hộp thư ở đâu) rồi viết lộ trình của riêng em bằng ba hàm có sẵn.
- Đo xem 1 giây xe đi được bao nhiêu cm, từ đó tính **số giây** cho quãng 50 cm.
- Thêm hàm **quay đầu** (rẽ 180 độ) dùng biến **rẽ 90** × 2.

← [Robot vũ công](/khoa-hoc/thingedu/thingblock/vi-du/k12-12-robot-vu-cong) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Robot họa sĩ](/khoa-hoc/thingedu/thingblock/vi-du/k12-14-robot-hoa-si) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
