---
title: "Hộp mù bí ẩn"
description: "Bấm SW đúng số lần bí mật thì servo mở khóa hộp."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Đếm nhịp bấm có thời hạn, so sánh với mã, servo làm chốt

**Phần cứng:** Servo S1 làm chốt khóa; Nút SW; Còi.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Hộp mù bí ẩn**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-09-hop-mu-bi-an.tb](/hoc-lieu/thingblock/vi-du/k12-09-hop-mu-bi-an.tb)

> Bài 9 · Hộp mù bí ẩn (K3-M9)
> Servo S1 là chốt khóa nắp hộp. Mã bí mật là số lần bấm SW (mặc định 3). Bấm xong thì chờ 2 giây: đúng mã thì chốt mở 5 giây rồi tự khóa, sai thì còi kêu trầm.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt [mã bí mật] thành [3]
quay servo [S1] tới góc (0) độ trong (0.5) giây        ← Chốt ở 0 độ là khóa, 90 độ là mở.

vòng lặp Arduino
đặt [số lần bấm] thành [0]
đặt [chờ] thành [0]
lặp lại cho đến khi <(chờ) > [19]>        ← Đếm số lần bấm. Không bấm thêm trong 2 giây là xong.
  nếu <đọc nút SW> thì
    thay đổi [số lần bấm] một lượng (1)
    chơi nốt [Đô 5] trong (0.1) phách
    đợi cho đến khi <không phải <đọc nút SW>>
    đặt [chờ] thành [0]
  nếu không thì
    đợi (0.1) giây
    thay đổi [chờ] một lượng (1)
nếu <(số lần bấm) > [0]> thì
  nếu <(số lần bấm) = (mã bí mật)> thì
    chơi nốt [Đô 5] trong (0.25) phách
    chơi nốt [Mi 5] trong (0.25) phách
    chơi nốt [Sol 5] trong (0.5) phách
    quay servo [S1] tới góc (90) độ trong (1) giây
    đợi (5) giây
    quay servo [S1] tới góc (0) độ trong (1) giây
  nếu không thì
    chơi nốt [Đô 4] trong (1) phách
```

## Chương trình làm gì

- Servo S1 là chốt: **0 độ khóa, 90 độ mở**. Khởi động quay về 0 và đặt **mã bí mật** = 3.
- Vòng đếm: **số lần bấm** và **chờ** bắt đầu từ 0. Lặp cho đến khi **chờ > 19** (20 lần × 0,1 giây = 2 giây không bấm). Mỗi lần bấm: cộng 1, còi tích, chờ nhả nút, và đặt **chờ** về 0 để tính lại 2 giây từ lần bấm cuối.
- Hết 2 giây mà có bấm (**số lần bấm > 0**): đúng mã thì hát Đô Mi Sol, mở chốt 1 giây, giữ 5 giây rồi khóa lại; sai thì kêu một nốt trầm **Đô 4** dài 1 phách.

## Thử thách

- Đổi mã thành 5. Rồi đổi cách báo sai: đèn L1 nháy 3 lần.
- Khóa dần: sai 3 lần liên tiếp thì phải chờ 10 giây mới được thử lại (thêm biến **số lần sai**).
- Dùng 2 nút: nếu có cả nút SW và một nút ở cổng S2 (khối `read digital pin`), làm mã gồm cả hai nút.

← [Bảng tin của lớp](/khoa-hoc/thingedu/thingblock/vi-du/k12-08-bang-tin-lop) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Cửa siêu thị tự mở](/khoa-hoc/thingedu/thingblock/vi-du/k12-10-cua-sieu-thi) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
