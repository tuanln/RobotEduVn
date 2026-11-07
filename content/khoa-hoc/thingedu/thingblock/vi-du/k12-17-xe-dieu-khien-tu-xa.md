---
title: "Xe điều khiển từ xa"
description: "Cần analog trái của tay PS2: đẩy tới để chạy, nghiêng ngang để rẽ; tốc độ tỉ lệ theo độ đẩy."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 3 · khó · **Khái niệm:** Cần analog PS2, vùng chết, lái vi sai (tiến + rẽ)

**Phần cứng:** Bộ thu tay cầm PS2 ở cổng PS2; Động cơ M1 (bánh trái), M2 (bánh phải).

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Xe điều khiển từ xa**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-17-xe-dieu-khien-tu-xa.tb](/hoc-lieu/thingblock/vi-du/k12-17-xe-dieu-khien-tu-xa.tb)

> Bài 17 · Xe điều khiển từ xa (K5-M7)
> Cần trái trả về số từ 0 đến 255, ở giữa là khoảng 128. "Tiến" = 128 − LY (đẩy lên là dương), "rẽ" = LX − 128. Bánh trái = tiến + rẽ, bánh phải = tiến − rẽ. Khối động cơ chỉ nhận tốc độ 0%..100%, nên số âm thì quay lùi.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động tay cầm PS2 trên ThingBot

vòng lặp Arduino
đọc dữ liệu tay cầm PS2
đặt [tiến] thành (((128) − (cần điều khiển PS2 [LY])) × (0.78))        ← Nhân 0,78 để 128 thành khoảng 100.
đặt [rẽ] thành (((cần điều khiển PS2 [LX]) − (128)) × (0.5))
nếu <(trị tuyệt đối của (tiến)) < [8]> thì        ← Vùng chết: cần nhả tay (lệch ít) thì coi như 0.
  đặt [tiến] thành [0]
nếu <(trị tuyệt đối của (rẽ)) < [6]> thì
  đặt [rẽ] thành [0]
đặt [trái] thành ((tiến) + (rẽ))
đặt [phải] thành ((tiến) − (rẽ))
nếu <(trái) > [0]> thì
  động cơ [M1] chạy [tiến] tốc độ (làm tròn (trái))%
nếu không thì
  động cơ [M1] chạy [lùi] tốc độ ((0) − (trái))%
nếu <(phải) > [0]> thì
  động cơ [M2] chạy [tiến] tốc độ (làm tròn (phải))%
nếu không thì
  động cơ [M2] chạy [lùi] tốc độ ((0) − (phải))%
đợi (0.02) giây
```

## Chương trình làm gì

- Cần trái trả về **LX, LY** từ 0 đến 255, nhả tay ở khoảng 128. **tiến** = (128 − LY) × 0,78: đẩy lên là dương, kéo xuống là âm, nhân 0,78 để 128 thành khoảng 100. **rẽ** = (LX − 128) × 0,5.
- **Vùng chết**: nếu trị tuyệt đối của tiến < 8 (rẽ < 6) thì coi là 0, để cần nhả tay không làm xe bò.
- Lái vi sai: **trái** = tiến + rẽ, **phải** = tiến − rẽ. Đẩy thẳng: hai bánh bằng nhau; nghiêng phải: bánh trái nhanh hơn nên xe cua phải.
- Khối động cơ ở ví dụ này chỉ nhận 0–100, nên mỗi bánh có **nếu … > 0** chạy tiến, **nếu không thì** chạy lùi với tốc độ 0 − giá trị (đổi dấu). Luôn **đọc dữ liệu tay cầm PS2** ở đầu vòng.

## Thử thách

- Đổi 0,78 thành 0,4: xe chạy chậm lại, dễ lái hơn trong nhà. Thêm nút R1 để chuyển nhanh/chậm (ví dụ 18 có sẵn cách làm).
- Dùng cần phải (RX, RY) thay cần trái.
- Bỏ vùng chết rồi nhả tay: xe có đứng yên không? Vì sao?

← [Cú va chạm an toàn](/khoa-hoc/thingedu/thingblock/vi-du/k12-16-cu-va-cham-an-toan) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Cánh tay máy](/khoa-hoc/thingedu/thingblock/vi-du/k12-19-canh-tay-may) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
