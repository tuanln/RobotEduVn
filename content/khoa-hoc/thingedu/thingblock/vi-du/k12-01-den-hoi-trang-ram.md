---
title: "Đèn hội trăng rằm"
description: "Hai đèn nháy so le như đèn lồng; lặp có đếm, đổi nhịp nhanh và chậm."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 1 · dễ · **Khái niệm:** Tuần tự, `lặp lại … lần`, khối `đợi`

**Phần cứng:** LED_1, LED_2 trên mạch.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Đèn hội trăng rằm**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-01-den-hoi-trang-ram.tb](/hoc-lieu/thingblock/vi-du/k12-01-den-hoi-trang-ram.tb)

> Bài 1 · Đèn hội trăng rằm (K1-M9)
> Hai đèn trên mạch thay nhau sáng như đèn lồng đung đưa. Đổi số lần lặp và thời gian chờ để đổi điệu múa của đèn.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
lặp lại (6) lần        ← Nháy nhanh 6 lần: đèn 1 sáng thì đèn 2 tắt, rồi đổi ngược lại.
  đặt đèn [L1] độ sáng (100)%
  đặt đèn [L2] độ sáng (0)%
  đợi (0.2) giây
  đặt đèn [L1] độ sáng (0)%
  đặt đèn [L2] độ sáng (100)%
  đợi (0.2) giây
lặp lại (3) lần        ← Rồi đung đưa chậm 3 lần.
  đặt đèn [L1] độ sáng (100)%
  đặt đèn [L2] độ sáng (100)%
  đợi (0.8) giây
  đặt đèn [L1] độ sáng (0)%
  đặt đèn [L2] độ sáng (0)%
  đợi (0.8) giây
```

## Chương trình làm gì

- Vòng lặp Arduino chạy mãi, nên điệu múa của đèn lặp đi lặp lại không cần khối nào khác.
- Đoạn **lặp lại 6 lần**: đèn L1 sáng khi L2 tắt rồi đổi ngược lại, mỗi nhịp 0,2 giây. Hai đèn so le như đèn lồng đung đưa.
- Đoạn **lặp lại 3 lần**: cả hai đèn cùng sáng, cùng tắt, mỗi nhịp 0,8 giây. Cùng là khối lặp, chỉ đổi số lần và thời gian chờ là ra một điệu khác.

## Thử thách

- Đổi 0,2 thành 0,05: mắt còn thấy đèn nháy không? Tìm số nhỏ nhất mà mắt vẫn thấy.
- Thêm đoạn lặp thứ ba: nháy nhanh dần (0,8 → 0,4 → 0,2 giây).
- Cho còi kêu một nốt mỗi khi đổi đèn (khối `chơi nốt`, xem ví dụ 2).

← [Dự án: dây chuyền phân loại trứng](/khoa-hoc/thingedu/thingblock/vi-du/sim-10-day-chuyen-phan-loai) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Người hùng quanh em: còi báo động](/khoa-hoc/thingedu/thingblock/vi-du/k12-02-coi-bao-dong) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
