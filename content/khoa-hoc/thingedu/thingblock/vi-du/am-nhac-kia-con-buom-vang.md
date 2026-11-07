---
title: "Kìa con bướm vàng"
description: "Bài hát thiếu nhi quen thuộc: mỗi câu nhạc lặp lại hai lần, rất dễ nhớ."
nguon: "ThingEdu"
---

**Nhóm:** Âm nhạc · **Mức:** 1 · dễ · **Khái niệm:** Nốt nhạc theo phách, câu nhạc lặp hai lần

**Phần cứng:** Còi trên mạch.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Âm nhạc → Kìa con bướm vàng**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải am-nhac-kia-con-buom-vang.tb](/hoc-lieu/thingblock/vi-du/am-nhac-kia-con-buom-vang.tb)

> Âm nhạc · Kìa con bướm vàng
> Mỗi khối "chơi nốt" là một nốt nhạc: tên nốt (Do, Re, Mi…), quãng (số càng lớn càng cao) và độ dài tính bằng phách. Nhịp 120 BPM: mỗi phách dài 0,5 giây. Thử đổi nhịp, đổi nốt hoặc thêm câu nhạc của riêng em!

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt nhịp (120) BPM        ← Nhịp 120: số càng lớn nhạc càng nhanh.

vòng lặp Arduino
chơi nốt [Đô 4] trong (1) phách        ← Kìa con bướm vàng (2 lần)
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách        ← Xòe đôi cánh (2 lần)
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Sol 4] trong (2) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Sol 4] trong (2) phách
chơi nốt [Sol 4] trong (0.5) phách        ← Tung cánh bay lên trời (2 lần)
chơi nốt [La 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Fa 4] trong (0.5) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [La 4] trong (0.5) phách
chơi nốt [Sol 4] trong (0.5) phách
chơi nốt [Fa 4] trong (0.5) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Đô 4] trong (1) phách        ← Em ngồi xem (2 lần)
chơi nốt [Sol 3] trong (1) phách
chơi nốt [Đô 4] trong (2) phách
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Sol 3] trong (1) phách
chơi nốt [Đô 4] trong (2) phách
nghỉ (2) phách        ← Nghỉ 2 phách rồi chơi lại từ đầu.
```

## Chương trình làm gì

- Nhịp 120 BPM: mỗi phách nửa giây. Mỗi khối **chơi nốt** là một nốt: tên (Đô, Rê, Mi…), quãng (4 là quãng giữa, 5 cao hơn) và độ dài tính bằng phách.
- Bài hát (giai điệu *Frère Jacques*) có bốn câu, mỗi câu hát hai lần nên các khối đi thành từng cặp giống nhau. Chú thích trên khối đánh dấu đầu mỗi câu.
- Vòng lặp Arduino hát lại từ đầu khi hết bài; thêm **nghỉ** vài phách ở cuối nếu muốn ngắt quãng.

## Thử thách

- Mỗi câu lặp hai lần: bọc mỗi câu trong khối **lặp lại 2 lần** để chương trình ngắn đi một nửa.
- Đổi nhịp 120 thành 90 rồi 180.
- Cho đèn L1 sáng ở nốt đầu mỗi câu để *nhìn* thấy nhịp.

← [Robot FanRoc hoàn chỉnh](/khoa-hoc/thingedu/thingblock/vi-du/k12-20-robot-fanroc) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Ngôi sao lấp lánh (Twinkle Twinkle Little Star)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-twinkle) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
