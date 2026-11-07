---
title: "Cánh tay máy"
description: "Ba servo chuyển động mượt và song song; hàm \"gắp\" và \"thả\" chuyển đồ từ trái sang phải."
nguon: "ThingEdu"
---

**Nhóm:** K12 cơ bản · **Mức:** 2 · vừa · **Khái niệm:** Nhiều servo quay cùng lúc, `bắt đầu quay servo` + `chờ các servo quay xong`, hàm

**Phần cứng:** Servo S1 (đế xoay), S2 (khuỷu tay), S3 (kẹp); Nút SW.

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → K12 cơ bản → Cánh tay máy**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-19-canh-tay-may.tb](/hoc-lieu/thingblock/vi-du/k12-19-canh-tay-may.tb)

> Bài 19 · Cánh tay máy (K4-M2)
> S1 xoay đế, S2 nâng hạ khuỷu tay, S3 đóng mở kẹp. Khối "bắt đầu xoay servo" cho nhiều servo chạy cùng lúc, khối "chờ các servo" đợi tất cả xong. Bấm SW để tay máy chuyển một món đồ từ bên trái sang bên phải.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
về chỗ cũ

vòng lặp Arduino
đợi cho đến khi <đọc nút SW>
bắt đầu quay servo [S1] tới góc (150) độ trong (1) giây        ← Quay sang trái và hạ tay cùng lúc.
bắt đầu quay servo [S2] tới góc (40) độ trong (1) giây
chờ các servo quay xong
gắp
bắt đầu quay servo [S1] tới góc (30) độ trong (1.5) giây
chờ các servo quay xong
thả
về chỗ cũ

định nghĩa gắp
bắt đầu quay servo [S3] tới góc (20) độ trong (0.5) giây
chờ các servo quay xong
bắt đầu quay servo [S2] tới góc (100) độ trong (0.8) giây
chờ các servo quay xong

định nghĩa thả
bắt đầu quay servo [S2] tới góc (40) độ trong (0.8) giây
chờ các servo quay xong
bắt đầu quay servo [S3] tới góc (80) độ trong (0.5) giây
chờ các servo quay xong

định nghĩa về chỗ cũ
bắt đầu quay servo [S1] tới góc (90) độ trong (1) giây
bắt đầu quay servo [S2] tới góc (100) độ trong (1) giây
bắt đầu quay servo [S3] tới góc (80) độ trong (1) giây
chờ các servo quay xong
```

## Chương trình làm gì

- Ba servo: **S1** xoay đế, **S2** nâng hạ khuỷu, **S3** kẹp (20 độ đóng, 80 độ mở). Hàm **về chỗ cũ** đưa cả ba về 90 / 100 / 80 độ *cùng lúc* nhờ ba khối **bắt đầu quay servo** rồi một khối **chờ các servo quay xong**.
- Bấm SW: đế xoay sang trái (150 độ) và hạ tay (S2 về 40) cùng lúc trong 1 giây; **gắp** (đóng kẹp, nâng tay); đế xoay sang phải (30 độ) 1,5 giây; **thả** (hạ tay, mở kẹp); về chỗ cũ.
- Khối **quay servo … trong … giây** (ví dụ Sim 5) chờ xong mới làm tiếp nên hai servo sẽ chạy lần lượt; muốn chạy song song phải dùng cặp *bắt đầu quay* + *chờ*.

## Thử thách

- Chuyển đồ từ phải sang trái: chỉ cần đổi hai số góc. Số nào?
- Thêm vị trí thứ ba ở giữa (90 độ) và chuyển đồ theo vòng: trái → giữa → phải.
- Rút thời gian từ 1 giây xuống 0,3 giây: tay máy có bị rơi đồ không? Vì sao nên quay chậm khi đang kẹp?

← [Xe điều khiển từ xa](/khoa-hoc/thingedu/thingblock/vi-du/k12-17-xe-dieu-khien-tu-xa) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Robot thi đấu bước 1: lái và nâng](/khoa-hoc/thingedu/thingblock/vi-du/k12-18-ftc-khoi-dong) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
