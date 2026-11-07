---
title: "Ngôi sao lấp lánh (Twinkle Twinkle Little Star)"
description: "Giai điệu đi lên rồi đi xuống từng bậc, hợp để học tên các nốt Do Re Mi."
nguon: "ThingEdu"
---

**Nhóm:** Âm nhạc · **Mức:** 1 · dễ · **Khái niệm:** Giai điệu đi từng bậc, học tên nốt

**Phần cứng:** Còi trên mạch.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Âm nhạc → Ngôi sao lấp lánh (Twinkle Twinkle Little Star)**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải am-nhac-twinkle.tb](/hoc-lieu/thingblock/vi-du/am-nhac-twinkle.tb)

> Âm nhạc · Ngôi sao lấp lánh (Twinkle Twinkle Little Star)
> Mỗi khối "chơi nốt" là một nốt nhạc: tên nốt (Do, Re, Mi…), quãng (số càng lớn càng cao) và độ dài tính bằng phách. Nhịp 110 BPM: mỗi phách dài 0,55 giây. Thử đổi nhịp, đổi nốt hoặc thêm câu nhạc của riêng em!

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt nhịp (110) BPM        ← Nhịp 110: số càng lớn nhạc càng nhanh.

vòng lặp Arduino
chơi nốt [Đô 4] trong (1) phách        ← Câu 1
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [La 4] trong (1) phách
chơi nốt [La 4] trong (1) phách
chơi nốt [Sol 4] trong (2) phách
chơi nốt [Fa 4] trong (1) phách        ← Câu 2
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Đô 4] trong (2) phách
chơi nốt [Sol 4] trong (1) phách        ← Câu 3
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Rê 4] trong (2) phách
chơi nốt [Sol 4] trong (1) phách        ← Câu 4
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Rê 4] trong (2) phách
chơi nốt [Đô 4] trong (1) phách        ← Câu 5
chơi nốt [Đô 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [Sol 4] trong (1) phách
chơi nốt [La 4] trong (1) phách
chơi nốt [La 4] trong (1) phách
chơi nốt [Sol 4] trong (2) phách
chơi nốt [Fa 4] trong (1) phách        ← Câu 6
chơi nốt [Fa 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Mi 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Rê 4] trong (1) phách
chơi nốt [Đô 4] trong (2) phách
nghỉ (2) phách        ← Nghỉ 2 phách rồi chơi lại từ đầu.
```

## Chương trình làm gì

- Nhịp 110 BPM. Câu đầu *Đô Đô Sol Sol La La Sol* là bảy nốt quen thuộc để tập đọc tên nốt trên khối.
- Giai điệu đi lên từng bậc rồi đi xuống từng bậc (Fa Fa Mi Mi Rê Rê Đô): nhìn thứ tự nốt trong các khối là thấy đường đi của giai điệu.
- Nốt cuối mỗi câu dài 2 phách, còn lại 1 phách.

## Thử thách

- Chuyển lên quãng 5 (đổi ô quãng từ 4 thành 5 ở mọi khối): bài hát cao hơn, còn giai điệu không đổi.
- Hai câu giữa (*Sol Sol Fa Fa Mi Mi Rê*) giống hệt nhau: dùng khối lặp.
- Viết nốt của một bài khác mà em thuộc, ví dụ *Bắc kim thang*, từ tên nốt trong sách nhạc.

← [Kìa con bướm vàng](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-kia-con-buom-vang) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Chúc mừng sinh nhật (Happy Birthday)](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-happy-birthday) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
