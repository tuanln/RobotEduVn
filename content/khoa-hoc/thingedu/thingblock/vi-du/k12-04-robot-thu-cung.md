---
title: "Robot thú cưng"
description: "Biến đầu tiên: đếm số lần vuốt (bấm SW); đủ 3 lần thì thú cưng vui, nháy đèn và hát."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Biến đầu tiên, đếm số lần bấm nút, `đợi cho đến khi`

**Phần cứng:** Nút SW; LED_1, LED_2; Còi.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Robot thú cưng**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-04-robot-thu-cung.tb](/hoc-lieu/thingblock/vi-du/k12-04-robot-thu-cung.tb)

> Bài 4 · Robot thú cưng (K1-M4)
> Mỗi lần em bấm nút SW là một lần vuốt ve. Biến "vuốt" đếm số lần. Đủ 3 lần, thú cưng vui: đèn nháy và hát một câu nhạc, rồi đếm lại từ đầu.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt [vuốt] thành [0]

vòng lặp Arduino
đợi cho đến khi <đọc nút SW>        ← Chờ một lần bấm rồi nhả, để một lần bấm chỉ đếm một lần.
đợi cho đến khi <không phải <đọc nút SW>>
thay đổi [vuốt] một lượng (1)
đặt đèn [L1] độ sáng (100)%
chơi nốt [Đô 5] trong (0.25) phách
đặt đèn [L1] độ sáng (0)%
nếu <(vuốt) = [3]> thì
  lặp lại (3) lần        ← Thú cưng vui!
    đặt đèn [L1] độ sáng (100)%
    đặt đèn [L2] độ sáng (100)%
    đợi (0.15) giây
    đặt đèn [L1] độ sáng (0)%
    đặt đèn [L2] độ sáng (0)%
    đợi (0.15) giây
  chơi nốt [Đô 5] trong (0.5) phách
  chơi nốt [Mi 5] trong (0.5) phách
  chơi nốt [Sol 5] trong (1) phách
  đặt [vuốt] thành [0]
```

## Chương trình làm gì

- Biến **vuốt** bắt đầu từ 0. Mỗi lần bấm nút SW được tính là một lần vuốt ve.
- Cặp khối **đợi cho đến khi nút SW** rồi **đợi cho đến khi không phải nút SW** là cách đếm một lần bấm chỉ một lần: chương trình chờ bấm xuống, rồi chờ nhả ra, mới cộng 1. Không có khối thứ hai, giữ nút 1 giây sẽ bị đếm hàng chục lần.
- Mỗi lần vuốt, đèn L1 nháy và còi kêu **Đô 5** ngắn để báo đã nhận.
- Khi **vuốt = 3**: hai đèn nháy 3 lần, còi hát ba nốt Đô Mi Sol, rồi đặt vuốt về 0 để chơi lại.

## Thử thách

- Đổi 3 thành 5. Rồi làm thú cưng *giận*: nếu bấm quá 6 lần liên tiếp thì còi kêu trầm (**Đô 4**).
- Thêm màn OLED in số lần vuốt (xem ví dụ 5 cách in biến lên màn).
- Bỏ khối `đợi cho đến khi không phải nút SW` rồi chạy thử: giữ nút xem biến tăng thế nào. Vì sao?

← [Đèn giao thông ngã tư](/khoa-hoc/thingedu/thingblock/vi-du/k12-03-den-giao-thong) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Đồng hồ đếm giờ chơi](/khoa-hoc/thingedu/thingblock/vi-du/k12-05-dong-ho-dem-gio) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
