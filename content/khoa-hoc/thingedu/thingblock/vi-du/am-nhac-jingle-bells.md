---
title: "Tiếng chuông ngân (Jingle Bells)"
description: "Điệp khúc Jingle Bells; có nốt chấm dôi 1,5 phách và nốt móc đơn 0,5 phách."
nguon: "ThingEdu"
---

**Nhóm:** Âm nhạc · **Mức:** 2 · vừa · **Khái niệm:** Nốt chấm dôi 1,5 phách, móc đơn 0,5 phách

**Phần cứng:** Còi trên mạch.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Âm nhạc → Tiếng chuông ngân (Jingle Bells)**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải am-nhac-jingle-bells.tb](/hoc-lieu/thingblock/vi-du/am-nhac-jingle-bells.tb)

> Âm nhạc · Tiếng chuông ngân (Jingle Bells)
> Mỗi khối "chơi nốt" là một nốt nhạc: tên nốt (Do, Re, Mi…), quãng (số càng lớn càng cao) và độ dài tính bằng phách. Nhịp 140 BPM: mỗi phách dài 0,43 giây. Thử đổi nhịp, đổi nốt hoặc thêm câu nhạc của riêng em!

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt nhịp (140) BPM        ← Nhịp 140: số càng lớn nhạc càng nhanh.

vòng lặp Arduino
chơi nốt [Mi 4] trong (1) phách        ← Jingle bells (1)
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (2) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (2) phách
chơi nốt [Mi 4] trong (1) phách        ← Jingle all the way
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Đô 4] trong (1.5) phách
chơi nốt [Rê 4] trong (0.5) phách
chơi nốt [Mi 4] trong (4) phách
chơi nốt [Fa 4] trong (1) phách        ← Câu tiếp
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Fa 4] trong (1.5) phách
chơi nốt [Fa 4] trong (0.5) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (0.5) phách
chơi nốt [Mi 4] trong (0.5) phách
chơi nốt [Mi 4] trong (1) phách        ← Jingle bells (2)
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Rê 4] trong (2) phách
chơi nốt [Sol 4] trong (2) phách
chơi nốt [Fa 4] trong (1) phách        ← Câu kết
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (0.5) phách
chơi nốt [Mi 4] trong (0.5) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Đô 4] trong (4) phách
nghỉ (2) phách        ← Nghỉ 2 phách rồi chơi lại từ đầu.
```

## Chương trình làm gì

- Nhịp 140 BPM, nhanh hơn các bài khác. Điệp khúc *Mi Mi Mi, Mi Mi Mi, Mi Sol Đô Rê Mi*: nốt thứ ba mỗi cụm dài 2 phách.
- Có nốt **1,5 phách** (chấm dôi) đi cùng nốt **0,5 phách**: cộng lại vẫn tròn 2 phách, nhưng nghe *nhún* hơn hai nốt 1 phách.
- Câu kết đi xuống *Sol Sol Fa Rê Đô*.

## Thử thách

- Đổi mọi 1,5 / 0,5 thành 1 / 1 và nghe sự khác nhau.
- Thêm còi *leng keng*: xen nốt **Đô 6** ngắn 0,25 phách giữa các câu.
- Chạy ở 100 BPM rồi 200 BPM: tốc độ nào nghe đúng bài nhất?

← [Cá mập con (Baby Shark)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-baby-shark) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Khúc hoan ca (Ode to Joy)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-ode-to-joy) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
