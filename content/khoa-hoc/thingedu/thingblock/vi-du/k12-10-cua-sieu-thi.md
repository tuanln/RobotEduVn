---
title: "Cửa siêu thị tự mở"
description: "Người lại gần dưới 20 cm thì cửa mở, đi xa quá 40 cm thì cửa đóng (hai ngưỡng chống chập chờn)."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Cảm biến siêu âm, hai ngưỡng (trễ), biến trạng thái

**Phần cứng:** Cảm biến siêu âm: TRIG IO0, ECHO IO4; Servo S1 làm cánh cửa.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Cửa siêu thị tự mở**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-10-cua-sieu-thi.tb](/hoc-lieu/thingblock/vi-du/k12-10-cua-sieu-thi.tb)

> Bài 10 · Cửa siêu thị tự mở (K6-M9)
> Cảm biến siêu âm đo khoảng cách. Dùng HAI ngưỡng: gần hơn 20 cm thì mở, xa hơn 40 cm mới đóng. Ở giữa hai ngưỡng thì cửa giữ nguyên, nên không mở ra đóng vào liên tục.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
đặt [cửa mở] thành [0]
quay servo [S1] tới góc (0) độ trong (0.5) giây

vòng lặp Arduino
đặt [khoảng cách] thành (cảm biến siêu âm chân TRIG [0] ECHO [4] đọc khoảng cách [cm])
nếu <<(cửa mở) = [0]> và <(khoảng cách) < [20]>> thì
  đặt [cửa mở] thành [1]
  quay servo [S1] tới góc (90) độ trong (1) giây
nếu <<(cửa mở) = [1]> và <(khoảng cách) > [40]>> thì
  đợi (2) giây
  đặt [cửa mở] thành [0]
  quay servo [S1] tới góc (0) độ trong (1) giây
đợi (0.1) giây
```

## Chương trình làm gì

- Biến **cửa mở** nhớ trạng thái: 0 đóng, 1 mở. Khởi động: cửa đóng, servo S1 về 0 độ.
- Mỗi vòng đọc **khoảng cách** (cm) từ cảm biến TRIG 0 ECHO 4.
- **Nếu cửa đang đóng và khoảng cách < 20** thì mở (servo 90 độ trong 1 giây). **Nếu cửa đang mở và khoảng cách > 40** thì đợi 2 giây rồi đóng.
- Hai ngưỡng 20 và 40 cách xa nhau: người đứng ở 30 cm không làm cửa mở ra đóng vào liên tục. Đây là mẹo *trễ* (hysteresis) dùng trong mọi máy điều hòa, tủ lạnh.

## Thử thách

- Đặt cả hai ngưỡng bằng 25 rồi đứng đúng ở 25 cm: cửa làm sao? Giải thích.
- Đếm số người qua cửa (mỗi lần mở là một người) và in lên OLED.
- Cửa đang đóng dở mà có người quay lại thì mở ra ngay: đọc khoảng cách cả trong 2 giây chờ (dùng vòng lặp 20 lần × 0,1 giây).

← [Hộp mù bí ẩn](/khoa-hoc/thingedu/thingblock/vi-du/k12-09-hop-mu-bi-an) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Chong chóng điện gió](/khoa-hoc/thingedu/thingblock/vi-du/k12-11-chong-chong-gio) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
