---
title: "Người hùng quanh em: còi báo động"
description: "Còi xe cứu hỏa hai nốt cao thấp, đèn chớp theo nhịp nhạc."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 1 · dễ · **Khái niệm:** Nhịp (BPM), nốt nhạc theo phách, nghỉ

**Phần cứng:** Còi trên mạch; LED_1, LED_2.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Người hùng quanh em: còi báo động**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-02-coi-bao-dong.tb](/hoc-lieu/thingblock/vi-du/k12-02-coi-bao-dong.tb)

> Bài 2 · Còi báo động (K2-M10)
> Xe cứu hỏa, xe cứu thương kêu hai nốt cao, thấp xen nhau. Thử đổi nhịp (tempo) và nốt nhạc để làm tiếng còi của riêng em.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt nhịp (120) BPM        ← Nhịp 120: mỗi phách dài nửa giây.

vòng lặp Arduino
lặp lại (4) lần
  đặt đèn [L1] độ sáng (100)%
  đặt đèn [L2] độ sáng (0)%
  chơi nốt [La 5] trong (0.5) phách
  đặt đèn [L1] độ sáng (0)%
  đặt đèn [L2] độ sáng (100)%
  chơi nốt [Mi 5] trong (0.5) phách
đặt đèn [L1] độ sáng (0)%
đặt đèn [L2] độ sáng (0)%
nghỉ (2) phách        ← Lặng 2 phách rồi kêu lại.
```

## Chương trình làm gì

- **Đặt nhịp 120 BPM** ở khởi động: mỗi phách dài nửa giây, nên nốt 0,5 phách kêu 0,25 giây.
- Lặp 4 lần cặp nốt **La 5** (cao) rồi **Mi 5** (thấp). Đèn L1 sáng khi kêu nốt cao, L2 sáng khi kêu nốt thấp: đèn chớp đúng nhịp còi.
- Hết 4 lần thì tắt cả hai đèn và **nghỉ 2 phách** (1 giây) rồi vòng lặp Arduino cho kêu lại từ đầu.

## Thử thách

- Đổi nhịp thành 60 rồi 240: tiếng còi thay đổi thế nào? Khối `chơi nốt` không đổi, chỉ đổi một số.
- Làm còi xe cảnh sát: ba nốt thay vì hai (thêm **Đô 6**).
- Thêm nút SW: chỉ kêu khi đang giữ nút (xem ví dụ Sim 3 về `nếu … thì … nếu không thì`).

← [Đèn hội trăng rằm](/khoa-hoc/thingedu/thingblock/vi-du/k12-01-den-hoi-trang-ram) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Đèn giao thông ngã tư](/khoa-hoc/thingedu/thingblock/vi-du/k12-03-den-giao-thong) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
