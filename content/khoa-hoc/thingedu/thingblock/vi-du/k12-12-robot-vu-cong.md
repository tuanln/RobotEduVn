---
title: "Robot vũ công"
description: "Hàm đầu tiên: ghép các động tác \"lắc trái\", \"lắc phải\", \"xoay vòng\" thành một điệu nhảy có nhạc."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Hàm (Khối của tôi) đầu tiên, động tác đặt tên, hai bánh ngược chiều

**Phần cứng:** Động cơ M1 (bánh trái), M2 (bánh phải); LED_1, LED_2; Còi.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Robot vũ công**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-12-robot-vu-cong.tb](/hoc-lieu/thingblock/vi-du/k12-12-robot-vu-cong.tb)

> Bài 12 · Robot vũ công (K2-M2)
> Mỗi khối hồng là một HÀM: một động tác được đặt tên. Vòng lặp chính chỉ gọi tên động tác, nên đổi điệu nhảy rất dễ. Đặt robot trên sàn rộng trước khi chạy.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt nhịp (150) BPM

vòng lặp Arduino
lặp lại (2) lần        ← Điệu nhảy: lắc trái, lắc phải hai lần rồi xoay một vòng.
  lắc trái
  lắc phải
xoay vòng
dừng

định nghĩa lắc trái
đặt đèn [L1] độ sáng (100)%
động cơ [M1] chạy [lùi] tốc độ (60)%
động cơ [M2] chạy [tiến] tốc độ (60)%
chơi nốt [Đô 5] trong (0.5) phách
đặt đèn [L1] độ sáng (0)%

định nghĩa lắc phải
đặt đèn [L2] độ sáng (100)%
động cơ [M1] chạy [tiến] tốc độ (60)%
động cơ [M2] chạy [lùi] tốc độ (60)%
chơi nốt [Mi 5] trong (0.5) phách
đặt đèn [L2] độ sáng (0)%

định nghĩa xoay vòng
đặt đèn [L1] độ sáng (100)%
đặt đèn [L2] độ sáng (100)%
động cơ [M1] chạy [tiến] tốc độ (80)%
động cơ [M2] chạy [lùi] tốc độ (80)%
chơi nốt [Sol 5] trong (1) phách
chơi nốt [Đô 6] trong (1) phách

định nghĩa dừng
động cơ [M1] chạy [tiến] tốc độ (0)%
động cơ [M2] chạy [tiến] tốc độ (0)%
đặt đèn [L1] độ sáng (0)%
đặt đèn [L2] độ sáng (0)%
nghỉ (1) phách
```

## Chương trình làm gì

- Bốn khối hồng **lắc trái, lắc phải, xoay vòng, dừng** là bốn *hàm*: mỗi hàm là một động tác được đặt tên. Vòng lặp chính chỉ gọi tên: lặp 2 lần (lắc trái, lắc phải), xoay vòng, dừng.
- **Lắc trái**: M1 lùi, M2 tiến (xe xoay trái) trong lúc còi kêu Đô 5 nửa phách; đèn L1 sáng. **Lắc phải** ngược lại với nốt Mi 5 và đèn L2.
- **Xoay vòng**: hai bánh ngược chiều 80 % trong hai nốt Sol 5, Đô 6 (2 phách). Nhịp 150 BPM nên mỗi phách 0,4 giây.
- **Dừng**: tốc độ 0 cho cả hai bánh, tắt đèn, nghỉ 1 phách. Thời gian mỗi động tác chính là độ dài nốt nhạc: khối `chơi nốt` vừa kêu vừa chờ.

## Thử thách

- Đổi điệu nhảy chỉ bằng cách đổi thứ tự gọi hàm trong vòng lặp chính, không sửa hàm nào.
- Thêm hàm **tiến lùi**: tiến 1 phách, lùi 1 phách.
- Cho một bạn cầm tay PS2 (ví dụ Sim 9): bấm nút nào thì robot làm động tác đó.

← [Chong chóng điện gió](/khoa-hoc/thingedu/thingblock/vi-du/k12-11-chong-chong-gio) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Robot đưa thư](/khoa-hoc/thingedu/thingblock/vi-du/k12-13-robot-dua-thu) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
