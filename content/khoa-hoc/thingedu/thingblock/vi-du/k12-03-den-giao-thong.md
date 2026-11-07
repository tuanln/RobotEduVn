---
title: "Đèn giao thông ngã tư"
description: "Đèn xanh/đỏ có đếm ngược trên OLED; bấm SW để xin đường cho người đi bộ."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Biến đếm ngược, `lặp lại cho đến khi`, điều kiện `và`, màn OLED

**Phần cứng:** LED_1 (đèn đỏ), LED_2 (đèn xanh); Nút SW; Màn OLED I2C.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Đèn giao thông ngã tư**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-03-den-giao-thong.tb](/hoc-lieu/thingblock/vi-du/k12-03-den-giao-thong.tb)

> Bài 3 · Đèn giao thông ngã tư (K3-M4)
> LED_1 là đèn đỏ, LED_2 là đèn xanh. Màn OLED đếm ngược số giây. Đang đèn xanh mà bấm nút SW thì đèn chuyển đỏ sớm để người đi bộ sang đường.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động OLED rộng (128) cao (64) địa chỉ I2C [0x3c] chip [SSD1306]
đặt chữ OLED cỡ [4] màu [trắng] màu nền [đen]

vòng lặp Arduino
đặt đèn [L2] độ sáng (100)%        ← Đèn xanh 10 giây. Bấm SW thì chỉ còn 3 giây.
đặt đèn [L1] độ sáng (0)%
đặt [giây] thành [10]
lặp lại cho đến khi <(giây) = [0]>
  nếu <<đọc nút SW> và <(giây) > [3]>> thì
    đặt [giây] thành [3]
  xoá OLED
  đặt con trỏ OLED x: (40) y: (16)
  OLED in (giây) [xuống dòng]
  hiện lên màn OLED
  đợi (1) giây
  thay đổi [giây] một lượng (-1)
đặt đèn [L2] độ sáng (0)%        ← Đèn đỏ 8 giây cho người đi bộ.
đặt đèn [L1] độ sáng (100)%
đặt [giây] thành [8]
lặp lại cho đến khi <(giây) = [0]>
  xoá OLED
  đặt con trỏ OLED x: (40) y: (16)
  OLED in (giây) [xuống dòng]
  hiện lên màn OLED
  đợi (1) giây
  thay đổi [giây] một lượng (-1)
```

## Chương trình làm gì

- Biến **giây** là số giây còn lại của pha đèn. Mỗi vòng của **lặp lại cho đến khi giây = 0**: xoá màn, in số, đợi 1 giây, bớt 1.
- Pha xanh: L2 sáng, đếm từ 10. Trong lúc đếm, nếu **nút SW đang bấm và giây > 3** thì đặt giây = 3, nên đèn xanh kết thúc sớm cho người đi bộ. Điều kiện `giây > 3` tránh việc bấm nút làm đồng hồ nhảy *lên* 3 khi đã còn 1–2 giây.
- Pha đỏ: L1 sáng, đếm từ 8, không bị nút bấm cắt ngang. Hết pha đỏ, vòng lặp Arduino quay lại pha xanh.
- Màn OLED phải **xoá** rồi **hiện lên màn** mỗi lần in, nếu không số cũ chồng lên số mới. Cỡ chữ 4 để số to, đặt con trỏ x 40 y 16 cho vào giữa màn.

## Thử thách

- Thêm pha vàng 2 giây (cả hai đèn cùng sáng) giữa xanh và đỏ.
- Cho còi kêu tích tắc mỗi giây trong pha đỏ để người khiếm thị biết đang được sang đường.
- Nếu bấm SW trong pha đỏ thì… không nên làm gì cả. Thử bỏ điều kiện `giây > 3` xem chuyện gì xảy ra khi bấm nút lúc còn 2 giây.

← [Người hùng quanh em: còi báo động](/khoa-hoc/thingedu/thingblock/vi-du/k12-02-coi-bao-dong) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Robot thú cưng](/khoa-hoc/thingedu/thingblock/vi-du/k12-04-robot-thu-cung) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
