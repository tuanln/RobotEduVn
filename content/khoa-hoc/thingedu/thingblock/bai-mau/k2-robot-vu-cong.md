---
title: "K2 — Robot vũ công"
description: "Bài mẫu bậc K2: robot nhảy theo nhịp bằng tuần tự, khối lặp và khối chờ"
nguon: "ThingEdu, Maker Việt"
---

**Trần kỹ năng K2:** tối đa khoảng 10 khối, tuần tự + `lặp lại` + khối chờ. Chưa dùng biến, chưa dùng điều kiện.

**Thiết bị:** ThingBot nguyên bộ, không cắm thêm gì. Động cơ bánh trái ở cổng **M1**, bánh phải ở **M2**. LED 1, LED 2 và còi có sẵn trên bo. Bật công tắc nguồn pin: nguồn USB không đủ chạy động cơ.

**Chế độ:** chạy trực tiếp (V1, V2), nạp chương trình (V3).

## V1 — Buổi 3: Một động tác đơn

**Mục tiêu:** người học thấy robot làm đúng thứ tự các lệnh mình xếp.

Chọn **No board**, thêm phần mở rộng **ThingBot Telemetrix**, bấm **Connect ThingBot**.

![Chương trình V1: hai động cơ chạy 2 giây rồi dừng, phím cách để phanh](/hoc-lieu/thingblock/anh/k2-robot-vu-cong-v1.webp)

📥 [Tải k2-robot-vu-cong-v1.tb](/hoc-lieu/thingblock/tep/k2-robot-vu-cong-v1.tb)

```text
Khi bấm vào [lá cờ xanh]
  motor [M1] speed (50)
  motor [M2] speed (50)
  đợi (2) giây
  motor [M1] speed (0)
  motor [M2] speed (0)

khi bấm phím [phím trắng]        ← phanh khẩn cấp
  motor [M1] speed (0)
  motor [M2] speed (0)
```

**Chú thích cho Mentor**

- Người học hay quên khối dừng, robot chạy mất. Nút Stop của ThingBlock không tắt động cơ, nên dạy ngay từ buổi đầu: bấm phím cách là phanh.
- Hai bánh cùng tốc độ mà robot vẫn lệch là chuyện bình thường (ma sát, pin yếu). Đừng chỉnh số cho tới khi thẳng tuyệt đối. Hỏi người học *vì sao lệch* thì giá trị hơn.
- Robot không nhúc nhích: kiểm tra công tắc nguồn pin trước khi nghi chương trình.

**Thử thách mở rộng:** cho robot rẽ trái bằng cách chỉ chạy một bánh. Bánh nào phải chạy?

## V2 — Buổi 5: Khớp động tác với nhịp đếm

**Mục tiêu:** người học dùng khối lặp để robot nhún đúng số nhịp đã đếm.

![Chương trình V2: lặp 4 lần, mỗi nhịp một bánh chạy và một đèn sáng](/hoc-lieu/thingblock/anh/k2-robot-vu-cong-v2.webp)

📥 [Tải k2-robot-vu-cong-v2.tb](/hoc-lieu/thingblock/tep/k2-robot-vu-cong-v2.tb)

```text
Khi bấm vào [lá cờ xanh]
  lặp lại (4)
    LED [LED 1] [on]
    motor [M1] speed (60)
    đợi (0.5) giây
    motor [M1] speed (0)
    LED [LED 1] [off]
    LED [LED 2] [on]
    motor [M2] speed (60)
    đợi (0.5) giây
    motor [M2] speed (0)
    LED [LED 2] [off]

khi bấm phím [phím trắng]
  motor [M1] speed (0)
  motor [M2] speed (0)
```

**Chú thích cho Mentor**

- Đây là lần đầu người học gặp khối lặp. Để các em viết 4 nhịp bằng tay trước, dài ngoằng, rồi mới giới thiệu `lặp lại`. Cảm giác "gọn hẳn" là thứ dạy được, không giảng được.
- Mỗi nhịp chỉ một bánh chạy nên robot lắc qua lắc lại như đang nhún. Ở chế độ Live động cơ chỉ chạy tiến, nên động tác xoay tại chỗ (hai bánh ngược chiều) để dành cho V3.
- Khối `đợi` sau mỗi động tác rất quan trọng: thiếu nó các nhịp dính vào nhau, nhìn không ra vũ đạo.

**Thử thách mở rộng:** đổi số lần lặp và thời gian chờ cho khớp một câu hát các em chọn.

## V3 — Buổi 7: Tiết mục hoàn chỉnh

**Mục tiêu:** robot tự diễn trọn tiết mục khi bật nguồn, không cần nối máy tính, sẵn sàng cho Make & Share.

Chọn bo **ThingBot**, nạp bằng **Upload**.

![Chương trình V3: nhạc mở màn, rồi xoay qua lại với đèn nháy lặp mãi](/hoc-lieu/thingblock/anh/k2-robot-vu-cong-v3.webp)

📥 [Tải k2-robot-vu-cong-v3.tb](/hoc-lieu/thingblock/tep/k2-robot-vu-cong-v3.tb)

```text
khi Arduino khởi động
  play note [C (Do)] octave [4] for (0.5) beats
  play note [E (Mi)] octave [4] for (0.5) beats
  play note [G (Sol)] octave [4] for (1) beats

vòng lặp Arduino
  set led [1] (100)
  set motor [M1] go [forward] at (60)
  set motor [M2] go [backward] at (60)
  đợi (1) giây
  set led [1] (0)
  set led [2] (100)
  set motor [M1] go [backward] at (60)
  set motor [M2] go [forward] at (60)
  đợi (1) giây
  set led [2] (0)
  set motor [M1] go [forward] at (0)
  set motor [M2] go [forward] at (0)
  đợi (2) giây
```

**Chú thích cho Mentor**

- Đổi sang chế độ nạp là bước lớn với K2: phải bấm Upload và **chờ**. Nói trước rằng lần nạp đầu lâu hơn, tránh các em bấm liên tục.
- Ở chế độ nạp, hướng quay chọn bằng **forward/backward**, tốc độ luôn là số dương. Hai bánh ngược chiều thì robot xoay tại chỗ: nhiều em tưởng phải có khối "xoay" riêng.
- `vòng lặp Arduino` nghĩa là robot diễn hoài. Với buổi trưng bày đó là điều ta muốn. Muốn dừng thì tắt công tắc nguồn.
- Đã nạp chương trình thì firmware Live bị xóa. Muốn quay lại Live, dùng **Update my Device** trong hộp kết nối.

**Thử thách mở rộng:** thêm một nốt nhạc ngắn ở đầu mỗi vòng để robot "vào nhạc".
