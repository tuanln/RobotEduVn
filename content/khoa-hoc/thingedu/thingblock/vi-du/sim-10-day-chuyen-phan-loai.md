---
title: "Dự án: dây chuyền phân loại trứng"
description: "Dự án máy soi trứng: băng chuyền chở trứng qua mắt hồng ngoại, trứng hỏng (tối) bị servo gạt ra."
nguon: "ThingEdu"
---

**Nhóm:** Mô phỏng ThingBot Sim · **Mức:** 2 · vừa · **Khái niệm:** Dự án ghép: mắt hồng ngoại + động cơ + servo, nhìn → nghĩ → làm

**Phần cứng:** Mắt hồng ngoại (chân tín hiệu **IO4**), động cơ **M1** kéo băng chuyền, servo **S1** làm cần gạt.

**Làm quen online, không cần cài gì:** bài này là [Bài 10 trên ThingBot Sim](/mo-phong?bai=10). Mạch ảo có băng chuyền chở trứng tốt và trứng hỏng, đếm số quả vào đúng thùng, tự chấm và có gợi ý. Bấm **🔋 Nguồn** trước khi chạy.

**Mở ví dụ:** ThingBlock 0.8 → **Tập tin → Ví dụ… → Mô phỏng ThingBot Sim → Dự án: dây chuyền phân loại trứng**. Khối mắt hồng ngoại có từ bản 0.8. 📥 [Tải sim-10-day-chuyen-phan-loai.tb](/hoc-lieu/thingblock/vi-du/sim-10-day-chuyen-phan-loai.tb)

> ThingBot Sim · Bài 10: Dự án: dây chuyền phân loại trứng
> Nhiệm vụ: làm máy soi trứng của trại gà. Quả tốt sáng trong, quả hỏng tối đục; máy gạt quả hỏng ra.

## Giống cơ thể người

Dây chuyền giống em **nhặt hạt đậu đen lẫn trong rổ đậu xanh**: mắt nhìn từng hạt, não quyết định, tay gạt hạt lạ ra. Ở đây mắt hồng ngoại là mắt, ESP32-C3 là não, servo S1 là bàn tay. Nhà máy lựa trứng, lựa cà phê, hay robot FanRoc chọn bóng đều làm theo ba bước **nhìn → nghĩ → làm**, lặp mãi.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
động cơ [M1] chạy [tiến] tốc độ (40)%        ← Băng chuyền chạy 40%.
đặt servo [S1] góc (0) độ        ← Cần gạt nhấc lên lúc bắt đầu.

vòng lặp Arduino
nếu <(đọc mắt hồng ngoại [1 · IO4]) < [1500]> thì        ← Nhỏ hơn 1500: trứng hỏng.
  đặt servo [S1] góc (90) độ        ← Hạ cần gạt, đẩy vào thùng loại.
nếu không thì
  đặt servo [S1] góc (0) độ
đợi (0.05) giây        ← Đợi thật ngắn để kịp nhìn từng quả.
```

## Chương trình làm gì

| Việc | Học ở | Trên dây chuyền |
|---|---|---|
| Nhìn sáng, tối | Sim 6 | mắt hồng ngoại IO4, gắn ngay trên cần gạt |
| Quyết định | Sim 3, Sim 6 | số đọc nhỏ hơn 1500 là trứng hỏng |
| Chạy băng chuyền | Sim 7 | động cơ M1 |
| Gạt | Sim 5 | servo S1: 90 độ gạt, 0 độ cho qua |

- Trên mạch ảo: trứng tốt đọc khoảng 3300, băng chuyền trống khoảng 2600, trứng hỏng khoảng 900.
- Chỗ **nếu không thì** phải nhấc cần gạt lên (0 độ). Quên khối này thì cần gạt hạ mãi, trứng tốt cũng bị gạt.
- Khối **đợi** phải thật ngắn. Mắt chỉ nhìn thấy mỗi quả trong một khoảnh khắc; não bận đợi 1 giây thì trứng hỏng đã lọt qua.
- Bật công tắc nguồn trên mạch: động cơ và servo cần điện từ pin.

## Thử thách

- Còi báo: thêm khối phát nốt nhạc ngắn ngay sau khối servo 90 độ.
- Đổi tốc độ M1 thành 100, hoặc khối đợi thành 1 giây, rồi đếm số trứng lọt. Kỹ sư nhà máy phải cân giữa **nhanh** và **không sót**.
- Đếm số trứng hỏng bằng một biến và hiện lên màn OLED.

← [Tay cầm điều khiển](/khoa-hoc/thingedu/thingblock/vi-du/sim-09-tay-cam-ps2) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Đèn hội trăng rằm](/khoa-hoc/thingedu/thingblock/vi-du/k12-01-den-hoi-trang-ram) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.8 (bản thử 0.8.0-preview-20261112, kho ThingEdu/thingblock-editor), viết theo bài 10 của [ThingBot Sim](https://github.com/ThingEdu/thingbot-sim); lời hướng dẫn của Làng Maker.*
