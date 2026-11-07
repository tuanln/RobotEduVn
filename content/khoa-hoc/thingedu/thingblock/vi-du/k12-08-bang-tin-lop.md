---
title: "Bảng tin của lớp"
description: "Bảng tin 3 trang tự lật; bấm SW để sang trang ngay."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Biến trạng thái (trang), chờ có thời hạn, `hoặc`

**Phần cứng:** Màn OLED I2C (thay ma trận LED/LCD); Nút SW.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Bảng tin của lớp**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-08-bang-tin-lop.tb](/hoc-lieu/thingblock/vi-du/k12-08-bang-tin-lop.tb)

> Bài 8 · Bảng tin của lớp (K5-M9)
> Biến "trang" cho biết đang hiện tin nào (1, 2 hoặc 3). Sau 5 giây, hoặc khi bấm nút SW, bảng tin lật sang trang sau. Em sửa nội dung các trang thành tin của lớp mình (màn OLED chỉ hiện chữ không dấu).

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động OLED rộng (128) cao (64) địa chỉ I2C [0x3c] chip [SSD1306]
đặt [trang] thành [1]

vòng lặp Arduino
xoá OLED
đặt chữ OLED cỡ [1] màu [trắng] màu nền [đen]
đặt con trỏ OLED x: (0) y: (0)
OLED in (kết hợp [BANG TIN LOP 5A  ] (kết hợp (trang) [/3])) [xuống dòng]
đặt chữ OLED cỡ [2] màu [trắng] màu nền [đen]
đặt con trỏ OLED x: (0) y: (20)
nếu <(trang) = [1]> thì
  OLED in [Thu 6:] [xuống dòng]
  OLED in [Hoi chua!] [xuống dòng]
nếu <(trang) = [2]> thì
  OLED in [Truc nhat:] [xuống dòng]
  OLED in [To 2] [xuống dòng]
nếu <(trang) = [3]> thì
  OLED in [Nho mang] [xuống dòng]
  OLED in [ao mua] [xuống dòng]
hiện lên màn OLED
đặt [đếm] thành [0]        ← Chờ tối đa 5 giây (50 lần × 0,1 giây), bấm SW thì thôi chờ.
lặp lại cho đến khi <<đọc nút SW> hoặc <(đếm) > [49]>>
  đợi (0.1) giây
  thay đổi [đếm] một lượng (1)
đợi cho đến khi <không phải <đọc nút SW>>
thay đổi [trang] một lượng (1)
nếu <(trang) > [3]> thì
  đặt [trang] thành [1]
```

## Chương trình làm gì

- Biến **trang** (1, 2, 3) cho biết đang hiện tin nào. Dòng đầu in *BANG TIN LOP 5A 1/3* bằng hai khối **kết hợp** lồng nhau.
- Ba khối **nếu trang = 1 / 2 / 3** in nội dung trang đó ở cỡ chữ 2. Sửa chữ trong các khối **OLED in** thành tin của lớp mình (không dấu).
- Chờ lật trang: biến **đếm** từ 0, vòng **lặp lại cho đến khi nút SW hoặc đếm > 49**, mỗi vòng đợi 0,1 giây. Vậy tự lật sau 5 giây, hoặc lật ngay khi bấm nút.
- Sau đó chờ nhả nút, tăng **trang** lên 1, quá 3 thì về 1.

## Thử thách

- Thêm trang 4. Cần sửa mấy chỗ? (Gợi ý: hai.)
- Giữ nút SW để *dừng* ở trang đang xem, nhả ra mới chạy tiếp.
- Đổi 49 để trang quan trọng hiện lâu hơn trang khác (mỗi trang một thời gian riêng, dùng `nếu trang = …`).

← [Trạm khí tượng của em](/khoa-hoc/thingedu/thingblock/vi-du/k12-07-tram-khi-tuong) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Hộp mù bí ẩn](/khoa-hoc/thingedu/thingblock/vi-du/k12-09-hop-mu-bi-an) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
