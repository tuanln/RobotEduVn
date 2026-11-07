---
title: "Làm quen ThingBot"
description: "Hai khối mũ \"khi Arduino khởi động\" và \"vòng lặp Arduino\", khởi động ThingBot."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 1 · dễ · **Khái niệm:** Khung chương trình: khởi động chạy một lần, vòng lặp chạy mãi

**Phần cứng:** Mạch ThingBot.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Làm quen ThingBot**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải sim-01-lam-quen-thingbot.tb](/hoc-lieu/thingblock/vi-du/sim-01-lam-quen-thingbot.tb)

> ThingBot Sim · Bài 1: Làm quen ThingBot
> Khung của mọi chương trình ThingBot: khối "khi Arduino khởi động" chạy một lần, khối "vòng lặp Arduino" chạy mãi mãi.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot

vòng lặp Arduino
```

## Chương trình làm gì

- Chương trình ThingBot nào cũng có hai khối mũ: **khi Arduino khởi động** chạy đúng một lần khi cắm điện, **vòng lặp Arduino** chạy đi chạy lại cho đến khi rút điện.
- Khối **khởi động ThingBot** nằm trong khởi động, báo cho mạch biết sẽ dùng động cơ, servo, đèn, còi của ThingBot.
- Ví dụ này chưa làm gì cả, nhưng đã *nạp được* và là chỗ bắt đầu của mọi bài sau. Trên khung Mô phỏng, bấm Chạy để thấy mạch ảo khởi động.

## Thử thách

- Kéo khối **đặt đèn L1 độ sáng 100 %** vào khởi động: đèn sáng mãi. Kéo sang vòng lặp: có khác gì không?
- Xoá khối *khởi động ThingBot* rồi nạp: còn chạy không? (Các khối ThingBot tự khởi động, nhưng giữ khối này cho rõ ràng.)
- Làm bài học tự chấm **ThingBot Sim 1** ở menu **Bài học** để được chấm từng bước.

[Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Đèn nhấp nháy](/khoa-hoc/thingedu/thingblock/vi-du/sim-02-den-nhap-nhay) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
