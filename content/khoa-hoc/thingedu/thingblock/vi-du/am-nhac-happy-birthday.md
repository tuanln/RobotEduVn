---
title: "Chúc mừng sinh nhật (Happy Birthday)"
description: "Nhạc chúc mừng sinh nhật; có nốt ngắn 0,25 phách và nốt dài 2 phách."
nguon: "ThingEdu"
---

**Nhóm:** Âm nhạc · **Mức:** 1 · dễ · **Khái niệm:** Nốt ngắn 0,25 phách và nốt dài 2 phách, nốt thăng

**Phần cứng:** Còi trên mạch.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Âm nhạc → Chúc mừng sinh nhật (Happy Birthday)**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải am-nhac-happy-birthday.tb](/hoc-lieu/thingblock/vi-du/am-nhac-happy-birthday.tb)

> Âm nhạc · Chúc mừng sinh nhật (Happy Birthday)
> Mỗi khối "chơi nốt" là một nốt nhạc: tên nốt (Do, Re, Mi…), quãng (số càng lớn càng cao) và độ dài tính bằng phách. Nhịp 120 BPM: mỗi phách dài 0,5 giây. Thử đổi nhịp, đổi nốt hoặc thêm câu nhạc của riêng em!

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt nhịp (120) BPM        ← Nhịp 120: số càng lớn nhạc càng nhanh.

vòng lặp Arduino
chơi nốt [Sol 4] trong (0.75) phách        ← Câu 1
chơi nốt [Sol 4] trong (0.25) phách
chơi nốt [La 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Đô 5] trong (1) phách
chơi nốt [Si 4] trong (2) phách
chơi nốt [Sol 4] trong (0.75) phách        ← Câu 2
chơi nốt [Sol 4] trong (0.25) phách
chơi nốt [La 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Rê 5] trong (1) phách
chơi nốt [Đô 5] trong (2) phách
chơi nốt [Sol 4] trong (0.75) phách        ← Câu 3 (lên cao)
chơi nốt [Sol 4] trong (0.25) phách
chơi nốt [Sol 5] trong (1) phách
chơi nốt [Mi 5] trong (1) phách
chơi nốt [Đô 5] trong (1) phách
chơi nốt [Si 4] trong (1) phách
chơi nốt [La 4] trong (2) phách
chơi nốt [Fa 5] trong (0.75) phách        ← Câu 4
chơi nốt [Fa 5] trong (0.25) phách
chơi nốt [Mi 5] trong (1) phách
chơi nốt [Đô 5] trong (1) phách
chơi nốt [Rê 5] trong (1) phách
chơi nốt [Đô 5] trong (2) phách
nghỉ (2) phách        ← Nghỉ 2 phách rồi chơi lại từ đầu.
```

## Chương trình làm gì

- Nhịp 120 BPM. Mỗi câu mở đầu bằng cặp nốt *Sol Sol* dài ngắn (0,75 và 0,25 phách): đây là nhịp *chấm dôi* làm bài hát có đà.
- Nốt cuối mỗi câu kéo dài 2 phách. Câu 3 lên tới **Sol 5** (quãng 5) rồi đi xuống; câu 4 bắt đầu ở **Fa 5**.
- Bốn câu, mỗi câu 6–7 khối: chú thích trên khối đánh dấu đầu câu. Cuối bài nghỉ 2 phách rồi hát lại.

## Thử thách

- Đổi 0,75 / 0,25 thành 0,5 / 0,5: bài hát nghe *đều* đi thế nào?
- Thêm đèn nháy theo mỗi nốt (xem ví dụ 2).
- Chờ bấm nút SW rồi mới hát, để làm hộp quà biết hát.

← [Ngôi sao lấp lánh (Twinkle Twinkle Little Star)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-twinkle) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Cá mập con (Baby Shark)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-baby-shark) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
