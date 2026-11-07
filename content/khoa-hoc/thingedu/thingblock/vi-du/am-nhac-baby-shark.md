---
title: "Cá mập con (Baby Shark)"
description: "Một câu nhạc lặp ba lần rồi kết, nhiều nốt Sol đi liền nhau."
nguon: "ThingEdu"
---

**Nhóm:** Âm nhạc · **Mức:** 1 · dễ · **Khái niệm:** Một câu nhạc lặp ba lần, nhiều nốt liền nhau

**Phần cứng:** Còi trên mạch.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Âm nhạc → Cá mập con (Baby Shark)**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải am-nhac-baby-shark.tb](/hoc-lieu/thingblock/vi-du/am-nhac-baby-shark.tb)

> Âm nhạc · Cá mập con (Baby Shark)
> Mỗi khối "chơi nốt" là một nốt nhạc: tên nốt (Do, Re, Mi…), quãng (số càng lớn càng cao) và độ dài tính bằng phách. Nhịp 115 BPM: mỗi phách dài 0,52 giây. Thử đổi nhịp, đổi nốt hoặc thêm câu nhạc của riêng em!

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt nhịp (115) BPM        ← Nhịp 115: số càng lớn nhạc càng nhanh.

vòng lặp Arduino
chơi nốt [Rê 4] trong (1) phách        ← Lần 1
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.25) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.25) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Rê 4] trong (1) phách        ← Lần 2
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.25) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.25) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Rê 4] trong (1) phách        ← Lần 3
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.25) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.25) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Rê 4] trong (1) phách        ← Kết
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Fa# 4] trong (2) phách
nghỉ (2) phách        ← Nghỉ 2 phách rồi chơi lại từ đầu.
```

## Chương trình làm gì

- Nhịp 115 BPM. Câu nhạc *Rê Mi Sol Sol Sol Sol Sol Sol Sol* lặp **ba lần** (chú thích Lần 1, 2, 3) rồi kết bằng ba nốt *Rê Mi Fa#* và nghỉ 2 phách.
- Chuỗi bảy nốt **Sol 4** xen độ dài 0,5 và 0,25 phách đi liền nhau: còi phát từng nốt tách rời nhau một chút nên vẫn nghe ra từng tiếng.
- Nốt kết **Fa# 4** là nốt thăng: ô tên nốt của khối có cả các nốt thăng.
- Ví dụ này cố tình viết dài để thấy ngay vì sao cần khối lặp (thử thách 1).

## Thử thách

- Bọc câu nhạc trong **lặp lại 3 lần**: chương trình còn bao nhiêu khối?
- Đổi các nốt Sol 4 thành Sol 5 ở lần thứ ba để giọng *cá mập bố* khác giọng *cá mập con*.
- Cho robot lắc (ví dụ 12) đúng ba lần theo ba câu nhạc.

← [Chúc mừng sinh nhật (Happy Birthday)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-happy-birthday) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Tiếng chuông ngân (Jingle Bells)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-jingle-bells) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
