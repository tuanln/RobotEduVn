---
title: "Robot vượt chướng ngại"
description: "Phản xạ va chạm: chạm cản va thì lùi, rẽ ngẫu nhiên rồi đi tiếp."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Phản xạ: cảm biến chạm, số ngẫu nhiên

**Phần cứng:** Động cơ M1, M2; Nút SW làm cản va phía trước.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Robot vượt chướng ngại**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-15-vuot-chuong-ngai.tb](/hoc-lieu/thingblock/vi-du/k12-15-vuot-chuong-ngai.tb)

> Bài 15 · Robot vượt chướng ngại (K2-M7)
> Gắn một thanh cản va sao cho khi xe đâm vào vật thì thanh đè lên nút SW. Xe đi thẳng; khi chạm thì lùi lại, rẽ một góc ngẫu nhiên rồi đi tiếp.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
nếu <đọc nút SW> thì
  động cơ [M1] chạy [lùi] tốc độ (60)%
  động cơ [M2] chạy [lùi] tốc độ (60)%
  đợi (0.5) giây
  động cơ [M1] chạy [tiến] tốc độ (60)%        ← Rẽ ngẫu nhiên từ 0,3 đến 0,8 giây để không mắc kẹt mãi một chỗ.
  động cơ [M2] chạy [lùi] tốc độ (60)%
  đợi ((số ngẫu nhiên từ (3) đến (8)) × (0.1)) giây
nếu không thì
  động cơ [M1] chạy [tiến] tốc độ (50)%
  động cơ [M2] chạy [tiến] tốc độ (50)%
đợi (0.02) giây
```

## Chương trình làm gì

- Thanh cản va gắn trước xe sao cho đâm vào vật thì thanh đè lên nút SW. Nút SW trở thành cảm biến chạm.
- Mỗi vòng: **nếu nút SW** (đang chạm) thì lùi 0,5 giây, rồi xoay (M1 tiến, M2 lùi) trong **(số ngẫu nhiên từ 3 đến 8) × 0,1** giây, tức 0,3–0,8 giây; **nếu không thì** đi thẳng 50 %.
- Góc rẽ ngẫu nhiên để xe không bị kẹt mãi ở góc tường: hai lần chạm cùng chỗ sẽ rẽ hai góc khác nhau.
- Đợi 0,02 giây cuối vòng để đọc nút đều đặn.

## Thử thách

- Bỏ ngẫu nhiên, luôn xoay 0,5 giây, rồi thả xe vào góc phòng: xem nó kẹt thế nào.
- Đếm số lần chạm, chạm 10 lần thì dừng hẳn và hát.
- Thay nút SW bằng cảm biến siêu âm để *tránh trước khi chạm* (ví dụ Sim 10).

← [Robot họa sĩ](/khoa-hoc/thingedu/thingblock/vi-du/k12-14-robot-hoa-si) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Cú va chạm an toàn](/khoa-hoc/thingedu/thingblock/vi-du/k12-16-cu-va-cham-an-toan) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
