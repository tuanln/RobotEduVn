---
title: "Robot FanRoc hoàn chỉnh"
description: "Mẫu robot thi đấu: lái vi sai bằng cần trái, tay nâng bằng cần phải, con lăn, nâng, kẹp, cửa xả, giữ L2 để chạy chậm."
nguon: "ThingEdu"
---

**Nhóm:** FanRoc · **Mức:** 3 · khó · **Khái niệm:** Robot thi đấu đủ cơ cấu: lái vi sai, con lăn, nâng, tay servo giới hạn góc, kẹp, cửa xả

**Phần cứng:** Bộ thu tay cầm PS2 (khối init PS2 on ThingBot: chân 7/2/10/6); M1 bánh trái, M2 bánh phải, M3 con lăn hút, M4 nâng; S1 tay nâng, S2 kẹp, S3 cửa xả.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → FanRoc → Robot FanRoc hoàn chỉnh**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-20-robot-fanroc.tb](/hoc-lieu/thingblock/vi-du/k12-20-robot-fanroc.tb)

> Bài 20 · Robot FanRoc hoàn chỉnh (K7-M9)
> Gán cổng trong bài là ĐỀ XUẤT; đội chỉnh lại theo robot của mình (đảo forward/backward nếu bánh quay ngược).
> • Cần trái: lái (M1 trái, M2 phải, vi sai). Giữ L2: chạy chậm 40%.
> • R1 hút / R2 nhả: con lăn M3. ▲/▼: nâng hạ M4.
> • Cần phải lên/xuống: tay nâng S1 (giới hạn 20–160 độ để không kẹt servo).
> • ○ đóng kẹp, ✕ mở kẹp (S2). Giữ □: mở cửa xả S3.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động tay cầm PS2 trên ThingBot
đặt [góc tay] thành [90]
đặt [góc kẹp] thành [80]
đặt servo [S1] góc (làm tròn (góc tay)) độ        ← Ô góc chỉ nhận số, nên biến được đặt trong khối «làm tròn».
đặt servo [S2] góc (làm tròn (góc kẹp)) độ
đặt servo [S3] góc (0) độ        ← Cửa xả đóng ở 0 độ.

vòng lặp Arduino
đọc dữ liệu tay cầm PS2
lái
con lăn và nâng
tay và kẹp
đợi (0.02) giây

định nghĩa lái
nếu <nút [L2] của PS2 đang bấm?> thì
  đặt [hệ số] thành [0.3]
nếu không thì
  đặt [hệ số] thành [0.78]
đặt [tiến] thành (((128) − (cần điều khiển PS2 [LY])) × (hệ số))
đặt [rẽ] thành (((cần điều khiển PS2 [LX]) − (128)) × ((hệ số) × (0.6)))
nếu <(trị tuyệt đối của (tiến)) < [5]> thì
  đặt [tiến] thành [0]
nếu <(trị tuyệt đối của (rẽ)) < [4]> thì
  đặt [rẽ] thành [0]
đặt [trái] thành ((tiến) + (rẽ))
đặt [phải] thành ((tiến) − (rẽ))
nếu <(trái) > [0]> thì        ← Khối động cơ chỉ nhận tốc độ 0%..100%, nên tách chiều bằng nếu/không thì.
  động cơ [M1] chạy [tiến] tốc độ (làm tròn (trái))%
nếu không thì
  động cơ [M1] chạy [lùi] tốc độ ((0) − (trái))%
nếu <(phải) > [0]> thì
  động cơ [M2] chạy [tiến] tốc độ (làm tròn (phải))%
nếu không thì
  động cơ [M2] chạy [lùi] tốc độ ((0) − (phải))%

định nghĩa con lăn và nâng
nếu <nút [R1] của PS2 đang bấm?> thì
  động cơ [M3] chạy [tiến] tốc độ (100)%
nếu không thì
  nếu <nút [R2] của PS2 đang bấm?> thì
    động cơ [M3] chạy [lùi] tốc độ (80)%
  nếu không thì
    động cơ [M3] chạy [tiến] tốc độ (0)%
nếu <nút [lên] của PS2 đang bấm?> thì
  động cơ [M4] chạy [tiến] tốc độ (80)%
nếu không thì
  nếu <nút [xuống] của PS2 đang bấm?> thì
    động cơ [M4] chạy [lùi] tốc độ (60)%
  nếu không thì
    động cơ [M4] chạy [tiến] tốc độ (0)%

định nghĩa tay và kẹp
nếu <(cần điều khiển PS2 [RY]) < [60]> thì        ← Cần phải lên: tay nâng lên 2 độ mỗi vòng; xuống: hạ 2 độ.
  thay đổi [góc tay] một lượng (2)
nếu <(cần điều khiển PS2 [RY]) > [196]> thì
  thay đổi [góc tay] một lượng (-2)
nếu <(góc tay) > [160]> thì
  đặt [góc tay] thành [160]
nếu <(góc tay) < [20]> thì
  đặt [góc tay] thành [20]
đặt servo [S1] góc (làm tròn (góc tay)) độ
nếu <nút [tròn] của PS2 đang bấm?> thì
  đặt [góc kẹp] thành [20]
nếu <nút [chéo X] của PS2 đang bấm?> thì
  đặt [góc kẹp] thành [80]
đặt servo [S2] góc (làm tròn (góc kẹp)) độ
nếu <nút [vuông] của PS2 đang bấm?> thì
  đặt servo [S3] góc (90) độ
nếu không thì
  đặt servo [S3] góc (0) độ
```

## Chương trình làm gì

- Vòng lặp chính chỉ gọi ba hàm **lái**, **con lăn và nâng**, **tay và kẹp** sau khi đọc tay PS2. Mỗi hàm lo một cụm cơ cấu nên đội có thể chia nhau sửa.
- **Lái** (cần trái): như ví dụ 17, thêm giữ **L2** để chạy chậm (hệ số 0,3 thay 0,78); rẽ nhân thêm 0,6 cho đỡ nhạy.
- **Con lăn và nâng**: R1 hút (M3 tiến 100 %), R2 nhả (M3 lùi 80 %); ▲ nâng (M4 tiến 80 %), ▼ hạ (M4 lùi 60 %); nhả nút là 0 %.
- **Tay và kẹp**: cần phải lên/xuống làm biến **góc tay** tăng/giảm 2 độ mỗi vòng, kẹp trong **20–160 độ** để servo S1 không bị kẹt; ○ đóng kẹp S2 (20 độ), ✕ mở (80 độ); giữ □ mở cửa xả S3 (90 độ), nhả thì đóng (0 độ). Biến đưa vào ô góc phải bọc trong **làm tròn**.
- Gán cổng là **đề xuất**: bánh quay ngược thì đổi tiến/lùi, góc kẹp tùy cơ khí của đội.

## Thử thách

- Đo góc kẹp thật của robot em (đóng hết mấy độ, mở hết mấy độ) rồi sửa 20/80.
- Thêm nút **tam giác**: về tư thế ban đầu (tay 90, kẹp mở, cửa đóng) bằng một hàm.
- Lái bằng điện thoại thay tay PS2: trang [Điều khiển bằng điện thoại](/khoa-hoc/thingedu/thingblock/dieu-khien-bang-dien-thoai). Cơ cấu nào nên giữ trên tay PS2?

← [Robot thi đấu bước 1: lái và nâng](/khoa-hoc/thingedu/thingblock/vi-du/k12-18-ftc-khoi-dong) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Kìa con bướm vàng](/khoa-hoc/thingedu/thingblock/vi-du/am-nhac-kia-con-buom-vang) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
