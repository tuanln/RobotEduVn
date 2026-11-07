---
title: "Đèn nhấp nháy"
description: "Đèn LED_1 sáng nửa giây, tắt nửa giây, lặp mãi."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 1 · dễ · **Khái niệm:** Bật, chờ, tắt, chờ: nhấp nháy bằng vòng lặp

**Phần cứng:** LED_1 trên mạch.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Đèn nhấp nháy**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-02-den-nhap-nhay.tb](/hoc-lieu/thingblock/vi-du/sim-02-den-nhap-nhay.tb)

> ThingBot Sim · Bài 2: Đèn nhấp nháy
> Bật đèn, chờ, tắt đèn, chờ: vòng lặp làm đèn nhấp nháy mãi.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
đặt đèn [L1] độ sáng (100)%
đợi (0.5) giây
đặt đèn [L1] độ sáng (0)%
đợi (0.5) giây
```

## Chương trình làm gì

- Trong vòng lặp: đèn L1 sáng 100 %, **đợi 0,5 giây**, tắt (0 %), đợi 0,5 giây. Vòng lặp Arduino tự quay lại nên đèn nháy mãi, chu kỳ 1 giây.
- Không có khối đợi, mạch bật tắt hàng nghìn lần mỗi giây và mắt chỉ thấy đèn sáng mờ.
- Độ sáng là phần trăm: thử 30 % để thấy đèn mờ hơn.

## Thử thách

- Nháy nhanh gấp đôi (chu kỳ 0,5 giây). Cần đổi mấy số?
- Hai đèn nháy so le: L1 sáng khi L2 tắt (ví dụ K12 số 1 làm tiếp từ đây).
- Đèn sáng dần: lặp 10 lần, mỗi lần tăng độ sáng 10 (dùng biến).

← [Làm quen ThingBot](/khoa-hoc/thingedu/thingblock/vi-du/sim-01-lam-quen-thingbot) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Nút bấm điều khiển đèn](/khoa-hoc/thingedu/thingblock/vi-du/sim-03-nut-bam-bat-den) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
