---
title: "Nút bấm điều khiển đèn"
description: "Giữ nút SW thì đèn sáng, nhả ra thì tắt (nếu … thì … nếu không thì)."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 1 · dễ · **Khái niệm:** Đọc nút, `nếu … thì … nếu không thì`

**Phần cứng:** Nút SW; LED_1.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Nút bấm điều khiển đèn**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-03-nut-bam-bat-den.tb](/hoc-lieu/thingblock/vi-du/sim-03-nut-bam-bat-den.tb)

> ThingBot Sim · Bài 3: Nút bấm điều khiển đèn
> Mỗi vòng lặp, mạch hỏi "nút SW có đang được bấm không?" rồi bật hoặc tắt đèn.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
nếu <đọc nút SW> thì
  đặt đèn [L1] độ sáng (100)%
nếu không thì
  đặt đèn [L1] độ sáng (0)%
```

## Chương trình làm gì

- Mỗi vòng lặp mạch hỏi **đọc nút SW** (đúng khi đang giữ nút). Đúng thì L1 sáng 100 %, sai thì 0 %.
- Vì vòng lặp chạy liên tục, đèn phản ứng gần như tức thì khi bấm hay nhả nút.
- Trên khung Mô phỏng, bấm và giữ nút SW của mạch ảo bằng chuột.

## Thử thách

- Đổi chỗ 100 và 0: đèn sáng khi *không* bấm. Dùng ở đâu? (Đèn hành lang tắt khi có người bấm.)
- Bấm một lần thì đèn bật, bấm lần nữa thì tắt (công tắc bập bênh): cần một biến nhớ trạng thái, xem ví dụ K12 số 11.
- Giữ nút thì còi kêu Đô 5 thay vì đèn.

← [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Màn hình OLED](/khoa-hoc/thingedu/thingblock/vi-du/sim-04-man-hinh-oled) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
