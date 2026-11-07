---
title: "Khúc hoan ca (Ode to Joy)"
description: "Giai điệu đi từng bậc liền nhau; hai câu giống nhau, chỉ khác nốt kết."
nguon: "ThingEdu"
---

**Nhóm:** Âm nhạc · **Mức:** 2 · vừa · **Khái niệm:** Giai điệu đi liền bậc, hai câu chỉ khác nốt kết

**Phần cứng:** Còi trên mạch.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Âm nhạc → Khúc hoan ca (Ode to Joy)**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải am-nhac-ode-to-joy.tb](/hoc-lieu/thingblock/vi-du/am-nhac-ode-to-joy.tb)

> Âm nhạc · Khúc hoan ca (Ode to Joy)
> Mỗi khối "chơi nốt" là một nốt nhạc: tên nốt (Do, Re, Mi…), quãng (số càng lớn càng cao) và độ dài tính bằng phách. Nhịp 120 BPM: mỗi phách dài 0,5 giây. Thử đổi nhịp, đổi nốt hoặc thêm câu nhạc của riêng em!

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt nhịp (120) BPM        ← Nhịp 120: số càng lớn nhạc càng nhanh.

vòng lặp Arduino
chơi nốt [Mi 4] trong (1) phách        ← Câu 1
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Đô 4] trong (1) phách        ← Câu 2 (kết trên Re)
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (1.5) phách
chơi nốt [Rê 4] trong (0.5) phách
chơi nốt [Rê 4] trong (2) phách
chơi nốt [Mi 4] trong (1) phách        ← Câu 3
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Đô 4] trong (1) phách        ← Câu 4 (kết trên Do)
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Rê 4] trong (1.5) phách
chơi nốt [Đô 4] trong (0.5) phách
chơi nốt [Đô 4] trong (2) phách
nghỉ (2) phách        ← Nghỉ 2 phách rồi chơi lại từ đầu.
```

## Chương trình làm gì

- Nhịp 120 BPM. Giai điệu của Beethoven đi từng bậc liền nhau *Mi Mi Fa Sol Sol Fa Mi Rê Đô Đô Rê Mi*, rất dễ dò theo trên các khối.
- Nửa đầu (câu 1–2) và nửa sau (câu 3–4) giống hệt nhau, chỉ khác ba nốt kết: nửa đầu kết *Mi Rê Rê*, nửa sau kết *Rê Đô Đô*. Trong ba nốt kết, nốt đầu 1,5 phách, nốt giữa 0,5 phách, nốt cuối 2 phách.
- Một bài hát của dàn nhạc giao hưởng chơi được trên còi của ThingBot bằng đúng một loại khối.

## Thử thách

- Tách phần chung của hai câu thành một hàm **câu chính**, rồi gọi hàm + hai nốt kết khác nhau.
- Hát ở quãng 5 cho câu thứ hai.
- Tìm trên sách nhạc một bài 8 nốt khác và viết thành khối.

← [Tiếng chuông ngân (Jingle Bells)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-jingle-bells) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du)

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
