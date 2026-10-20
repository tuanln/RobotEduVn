---
title: "K3 — Đèn giao thông"
description: "Bài mẫu bậc K3: đèn giao thông ba màu và nút cho người đi bộ, điều kiện nếu…thì đầu tiên"
nguon: "ThingEdu, Maker Việt"
---

**Trần kỹ năng K3:** thêm `nếu … thì`, **một điều kiện mỗi chương trình**. Bắt đầu đọc nút bấm.

**Thiết bị:** ThingBot + 3 module LED đơn loại 3 chân (đỏ, vàng, xanh lá).

**Đấu nối:** cắm module LED **đỏ** vào cổng **S1**, **vàng** vào **S2**, **xanh** vào **S3**, đúng thứ tự GND – 5V – tín hiệu in trên mạch. Nút cho người đi bộ là nút **SW** có sẵn trên ThingBotShield.

**Chế độ:** nạp chương trình (cả V1, V2, V3). Chọn bo **ThingBot**, bấm **Upload**.

> Cổng S1–S5 vốn để cắm servo. Khối `set servo [S1] to pulse (4095)` giữ chân tín hiệu gần như luôn ở mức cao nên LED sáng hẳn, `pulse (0)` thì LED tắt.

## V1 — Buổi 3: Ba đèn sáng lần lượt

**Mục tiêu:** người học điều khiển ba đèn sáng đúng thứ tự với thời lượng tự đặt.

![Chương trình V1: xanh 5 giây, vàng 2 giây, đỏ 5 giây](/hoc-lieu/thingblock/anh/k3-den-giao-thong-v1.webp)

📥 [Tải k3-den-giao-thong-v1.tb](/hoc-lieu/thingblock/tep/k3-den-giao-thong-v1.tb)

```text
vòng lặp Arduino
  set servo [S1] to pulse (0)        ← đỏ tắt
  set servo [S2] to pulse (0)        ← vàng tắt
  set servo [S3] to pulse (4095)     ← xanh sáng
  đợi (5) giây
  set servo [S1] to pulse (0)
  set servo [S2] to pulse (4095)     ← vàng sáng
  set servo [S3] to pulse (0)
  đợi (2) giây
  set servo [S1] to pulse (4095)     ← đỏ sáng
  set servo [S2] to pulse (0)
  set servo [S3] to pulse (0)
  đợi (5) giây
```

**Chú thích cho Mentor**

- Mỗi pha đặt cả ba đèn, kể cả đèn tắt. Thiếu một khối tắt là hai đèn sáng cùng lúc: cho các em tự tìm lỗi này.
- Module cắm ngược chiều thì không sáng (và không hỏng). Hỏi các em "làm sao biết chiều nào đúng" thay vì cắm hộ.

**Thử thách mở rộng:** đo bằng đồng hồ bấm giây xem một vòng đèn hết bao lâu, so với tổng các số các em đặt.

## V2 — Buổi 5: Nút cho người đi bộ

**Mục tiêu:** người học dùng `nếu … thì` để đèn phản ứng với nút bấm: điều kiện đầu tiên.

![Chương trình V2: đèn xanh, nếu bấm nút SW thì chuyển đỏ 5 giây](/hoc-lieu/thingblock/anh/k3-den-giao-thong-v2.webp)

📥 [Tải k3-den-giao-thong-v2.tb](/hoc-lieu/thingblock/tep/k3-den-giao-thong-v2.tb)

```text
vòng lặp Arduino
  set servo [S1] to pulse (0)
  set servo [S2] to pulse (0)
  set servo [S3] to pulse (4095)     ← xanh
  nếu <read switch> thì
    set servo [S1] to pulse (4095)   ← đỏ cho người đi bộ qua
    set servo [S2] to pulse (0)
    set servo [S3] to pulse (0)
    đợi (5) giây
```

**Chú thích cho Mentor**

- Đúng trần K3: chỉ **một** khối `nếu`. Em nào muốn thêm nhánh "nếu không thì", khen ý tưởng và hẹn lên K4.
- Chương trình chỉ hỏi nút mỗi vòng một lần. Ở đây vòng lặp chạy rất nhanh nên bấm là ăn ngay; nhưng nếu thêm `đợi` vào đầu vòng, nút phải giữ lâu mới ăn. Đó là hạt giống của khái niệm "quét" ở lớp trên.

**Thử thách mở rộng:** thêm đèn vàng 2 giây trước khi chuyển đỏ, vẫn chỉ dùng một khối `nếu`.

## V3 — Buổi 7: Mô hình ngã tư hoàn chỉnh

**Mục tiêu:** mô hình chạy độc lập bằng pin trên bàn trưng bày.

![Chương trình V3: vòng đèn đầy đủ, nút SW kéo dài pha đỏ thêm 3 giây](/hoc-lieu/thingblock/anh/k3-den-giao-thong-v3.webp)

📥 [Tải k3-den-giao-thong-v3.tb](/hoc-lieu/thingblock/tep/k3-den-giao-thong-v3.tb)

```text
vòng lặp Arduino
  (xanh sáng) đợi (5) giây
  (vàng sáng) đợi (2) giây
  (đỏ sáng)
  nếu <read switch> thì
    đợi (3) giây
  đợi (5) giây
```

*(Mỗi "(… sáng)" là ba khối `set servo` như V1.)*

**Chú thích cho Mentor**

- Nút ở đây kéo dài pha đỏ thêm 3 giây thay vì cắt ngang: an toàn hơn và đúng cách đèn thật hoạt động. Đáng để hỏi các em "vì sao không cho đổi đèn ngay lập tức".
- Nút chỉ được hỏi đúng lúc vừa chuyển đỏ, nên phải đang giữ nút lúc đó. Em nào phát hiện ra điều này là đã sẵn sàng cho biến ở K4.
- Nhắc các em dán nhãn lên mô hình. Buổi Make & Share sẽ có người hỏi "dây này đi đâu".

**Thử thách mở rộng:** làm ngã tư hai chiều với 6 đèn (thêm module ở S4, S5 và dùng LED trên bo), hai hướng ngược pha nhau.
