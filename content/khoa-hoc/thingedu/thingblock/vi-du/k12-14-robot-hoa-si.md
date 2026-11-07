---
title: "Robot họa sĩ"
description: "Lặp lồng nhau vẽ hình vuông, tam giác; servo nâng hạ bút giữa các hình."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 3 · khó · **Khái niệm:** Lặp lồng nhau, hình đa giác, góc ngoài 360 ÷ số cạnh

**Phần cứng:** Động cơ M1, M2; Servo S1 gá bút; Nút SW.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Robot họa sĩ**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-14-robot-hoa-si.tb](/hoc-lieu/thingblock/vi-du/k12-14-robot-hoa-si.tb)

> Bài 14 · Robot họa sĩ (K3-M2)
> Gắn bút vào servo S1 (0 độ là hạ bút, 60 độ là nhấc bút). Mỗi hình có "số cạnh" cạnh, sau mỗi cạnh xe xoay một góc ngoài bằng 360 : số cạnh. Biến "xoay 1 độ" là số giây để xe xoay 1 độ, em đo rồi sửa cho đúng.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt [xoay 1 độ] thành [0.0067]
nhấc bút

vòng lặp Arduino
đợi cho đến khi <đọc nút SW>
đợi (1) giây
đặt [số cạnh] thành [4]
vẽ hình
động cơ [M1] chạy [tiến] tốc độ (50)%        ← Xe chạy sang chỗ trống rồi vẽ tam giác.
động cơ [M2] chạy [tiến] tốc độ (50)%
đợi (1.5) giây
đặt [số cạnh] thành [3]
vẽ hình

định nghĩa vẽ hình
hạ bút
lặp lại (số cạnh) lần        ← Lặp lồng nhau: mỗi cạnh là "đi thẳng rồi xoay".
  động cơ [M1] chạy [tiến] tốc độ (50)%
  động cơ [M2] chạy [tiến] tốc độ (50)%
  đợi (1) giây
  động cơ [M1] chạy [tiến] tốc độ (50)%
  động cơ [M2] chạy [lùi] tốc độ (50)%
  đợi (((360) ÷ (số cạnh)) × (xoay 1 độ)) giây
động cơ [M1] chạy [tiến] tốc độ (0)%
động cơ [M2] chạy [tiến] tốc độ (0)%
nhấc bút

định nghĩa hạ bút
quay servo [S1] tới góc (0) độ trong (0.5) giây

định nghĩa nhấc bút
quay servo [S1] tới góc (60) độ trong (0.5) giây
```

## Chương trình làm gì

- Bút gắn vào servo S1: hàm **hạ bút** quay về 0 độ, **nhấc bút** lên 60 độ.
- Hàm **vẽ hình**: hạ bút, rồi **lặp lại (số cạnh) lần**: đi thẳng 1 giây, xoay tại chỗ trong **(360 ÷ số cạnh) × xoay 1 độ** giây. Vuông: 4 cạnh, mỗi lần xoay 90 độ; tam giác: 3 cạnh, xoay 120 độ.
- **xoay 1 độ** = 0,0067 giây là thời gian xe xoay đúng 1 độ (ở tốc độ 50 %). Đo một vòng 360 độ của xe mình mất mấy giây rồi chia cho 360.
- Lộ trình: bấm SW, vẽ hình vuông, chạy sang chỗ trống 1,5 giây, vẽ tam giác. Vòng lặp Arduino quay lại chờ bấm nút.

## Thử thách

- Vẽ lục giác và ngũ giác chỉ bằng cách đổi **số cạnh**.
- Vẽ ngôi sao 5 cánh: góc xoay mỗi lần là 144 độ, không còn là 360 ÷ 5. Sửa hàm thế nào?
- Hình vẽ ra không khép kín: do bánh trượt, pin yếu hay **xoay 1 độ** sai? Thử từng giả thuyết.

← [Robot đưa thư](/khoa-hoc/thingedu/thingblock/vi-du/k12-13-robot-dua-thu) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Robot vượt chướng ngại](/khoa-hoc/thingedu/thingblock/vi-du/k12-15-vuot-chuong-ngai) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
