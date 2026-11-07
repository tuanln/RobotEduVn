---
title: "Chong chóng điện gió"
description: "Bấm SW chuyển cấp gió 0–3; tốc độ tăng giảm dần bằng biến chứ không nhảy bậc."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Tốc độ phần trăm, tăng giảm dần bằng biến, `làm tròn`

**Phần cứng:** Động cơ M1 gắn cánh quạt; Nút SW; Màn OLED I2C.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Chong chóng điện gió**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-11-chong-chong-gio.tb](/hoc-lieu/thingblock/vi-du/k12-11-chong-chong-gio.tb)

> Bài 11 · Chong chóng điện gió (K4-M7)
> Tốc độ động cơ tính theo phần trăm, từ 0% (dừng) đến 100% (nhanh nhất). Mỗi lần bấm SW, cấp gió tăng 1 (0 → 1 → 2 → 3 → 0). Biến "tốc độ" nhích dần về tốc độ đích, cánh quạt quay nhanh lên từ từ như cối xay gió thật.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động OLED rộng (128) cao (64) địa chỉ I2C [0x3c] chip [SSD1306]
đặt chữ OLED cỡ [2] màu [trắng] màu nền [đen]
đặt [cấp] thành [0]
đặt [tốc độ] thành [0]

vòng lặp Arduino
nếu <đọc nút SW> thì
  thay đổi [cấp] một lượng (1)
  nếu <(cấp) > [3]> thì
    đặt [cấp] thành [0]
  đợi cho đến khi <không phải <đọc nút SW>>
đặt [đích] thành ((cấp) × (30))        ← Cấp 1, 2, 3 ứng với tốc độ đích 30%, 60%, 90%.
nếu <(tốc độ) < (đích)> thì
  thay đổi [tốc độ] một lượng (2)
nếu <(tốc độ) > (đích)> thì
  thay đổi [tốc độ] một lượng (-2)
động cơ [M1] chạy [tiến] tốc độ (làm tròn (tốc độ))%        ← Ô tốc độ chỉ nhận số, nên biến được đặt trong khối «làm tròn».
xoá OLED
đặt con trỏ OLED x: (0) y: (0)
OLED in (kết hợp [Cap gio: ] (cấp)) [xuống dòng]
OLED in (kết hợp [Toc do: ] (tốc độ)) [xuống dòng]
hiện lên màn OLED
đợi (0.05) giây
```

## Chương trình làm gì

- Nút SW chuyển **cấp** gió 0 → 1 → 2 → 3 → 0. Sau khi đổi cấp, chương trình chờ nhả nút để một lần bấm chỉ tăng một cấp.
- **đích** = cấp × 30, tức 0, 30, 60, 90 %. Biến **tốc độ** nhích 2 đơn vị mỗi vòng về phía đích, chứ không nhảy thẳng, nên cánh quạt quay nhanh lên từ từ.
- Khối động cơ chỉ nhận số, nên biến **tốc độ** được bọc trong **làm tròn** trước khi đưa vào ô tốc độ.
- OLED in cấp gió và tốc độ hiện tại; đợi 0,05 giây mỗi vòng nên từ 0 lên 90 % mất khoảng 2 giây.

## Thử thách

- Đổi 2 thành 10: cánh quạt phản ứng khác thế nào?
- Thêm cấp *bão*: cấp 4 chạy 100 % kèm còi kêu.
- Thay nút bấm bằng cảm biến siêu âm: tay càng gần, quạt càng nhanh (cần phép tính đổi cm sang %).

← [Cửa siêu thị tự mở](/khoa-hoc/thingedu/thingblock/vi-du/k12-10-cua-sieu-thi) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Robot vũ công](/khoa-hoc/thingedu/thingblock/vi-du/k12-12-robot-vu-cong) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
