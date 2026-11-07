---
title: "Robot thi đấu bước 1: lái và nâng"
description: "Lái kiểu xe tăng bằng hai cần, L1/R1 nâng hạ, START bật chế độ chạy chậm chính xác; nhả tay là dừng."
nguon: "ThingEdu"
---

**Nhóm:** FanRoc · **Mức:** 3 · khó · **Khái niệm:** Lái kiểu xe tăng hai cần, cơ cấu nâng an toàn, nút bật/tắt chế độ

**Phần cứng:** Bộ thu tay cầm PS2; Động cơ M1, M2 (lái), M3 (cơ cấu nâng).

**Chạy thử trên:** khung **Mô phỏng** (không cần mạch) hoặc ThingBot thật.

**Mở ví dụ:** ThingBlock 0.6 → **Tập tin → Ví dụ… → FanRoc → Robot thi đấu bước 1: lái và nâng**. Bản 0.5.0 không có menu Ví dụ: tải tệp rồi mở bằng **Tập tin → Load from your computer**. 📥 [Tải k12-18-ftc-khoi-dong.tb](/hoc-lieu/thingblock/vi-du/k12-18-ftc-khoi-dong.tb)

> Bài 18 · Robot thi đấu bước 1 (K8-M2, chuyển nền từ NeoBot sang ThingBot)
> Lái kiểu xe tăng: cần trái điều khiển bánh trái (M1), cần phải điều khiển bánh phải (M2). L1 nâng, R1 hạ (M3); nhả nút là cơ cấu dừng ngay. Bấm START để bật/tắt chế độ chạy chậm (40%) khi cần căn chỉnh chính xác.

## Chương trình

Dịch từ chương trình khối sang chữ, nhãn khối theo ThingBlock tiếng Việt. Dòng thụt vào là khối nằm trong khối trên; `←` là chú thích đính kèm khối trong ví dụ.

```text
khi Arduino khởi động
khởi động ThingBot
khởi động tay cầm PS2 trên ThingBot
đặt [chậm] thành [0]
đặt [giữ START] thành [0]

vòng lặp Arduino
đọc dữ liệu tay cầm PS2
nếu <nút [start] của PS2 đang bấm?> thì        ← Chỉ đổi chế độ ở LẦN ĐẦU thấy START được bấm; giữ nút không làm đổi liên tục.
  nếu <(giữ START) = [0]> thì
    đặt [chậm] thành ((1) − (chậm))
    đặt [giữ START] thành [1]
nếu không thì
  đặt [giữ START] thành [0]
nếu <(chậm) = [1]> thì
  đặt [hệ số] thành [0.3]
  đặt đèn [L1] độ sáng (100)%
nếu không thì
  đặt [hệ số] thành [0.78]
  đặt đèn [L1] độ sáng (0)%
đặt [trái] thành (((128) − (cần điều khiển PS2 [LY])) × (hệ số))
đặt [phải] thành (((128) − (cần điều khiển PS2 [RY])) × (hệ số))
nếu <(trị tuyệt đối của (trái)) < [6]> thì
  đặt [trái] thành [0]
nếu <(trị tuyệt đối của (phải)) < [6]> thì
  đặt [phải] thành [0]
nếu <(trái) > [0]> thì
  động cơ [M1] chạy [tiến] tốc độ (làm tròn (trái))%
nếu không thì
  động cơ [M1] chạy [lùi] tốc độ ((0) − (trái))%
nếu <(phải) > [0]> thì
  động cơ [M2] chạy [tiến] tốc độ (làm tròn (phải))%
nếu không thì
  động cơ [M2] chạy [lùi] tốc độ ((0) − (phải))%
nếu <nút [L1] của PS2 đang bấm?> thì        ← Cơ cấu nâng: nhả nút thì tốc độ 0%, an toàn.
  động cơ [M3] chạy [tiến] tốc độ (80)%
nếu không thì
  nếu <nút [R1] của PS2 đang bấm?> thì
    động cơ [M3] chạy [lùi] tốc độ (60)%
  nếu không thì
    động cơ [M3] chạy [tiến] tốc độ (0)%
đợi (0.02) giây
```

## Chương trình làm gì

- Lái **xe tăng**: cần trái (LY) điều khiển bánh trái M1, cần phải (RY) điều khiển bánh phải M2, cùng công thức (128 − cần) × hệ số, vùng chết 6, tách chiều tiến/lùi như ví dụ 17.
- Nút **START** bật/tắt chế độ chậm: biến **chậm** đổi 0 ↔ 1 bằng phép **1 − chậm**, nhưng chỉ ở *lần đầu* thấy nút bấm (biến **giữ START**), nên giữ nút không làm chế độ nhảy liên tục. Chậm: hệ số 0,3 và đèn L1 sáng; thường: 0,78.
- Cơ cấu nâng M3: giữ **L1** nâng 80 %, giữ **R1** hạ 60 %, nhả cả hai thì tốc độ 0. Nhả tay là dừng, đó là quy tắc an toàn cho mọi cơ cấu thi đấu.

## Thử thách

- Thêm nút **SELECT** để đảo chiều lái (xe chạy lùi thành chạy tới) khi robot quay đầu về phía mình.
- Giới hạn nâng: thêm công tắc hành trình ở cổng S4 (khối `read digital pin`), chạm thì không nâng nữa.
- Chuyển sang lái *arcade* (một cần, ví dụ 17). Đội em thích kiểu nào hơn? Vì sao?

← [Cánh tay máy](/khoa-hoc/thingedu/thingblock/vi-du/k12-19-canh-tay-may) · [Danh sách ví dụ](/khoa-hoc/thingedu/thingblock/vi-du) · [Robot FanRoc hoàn chỉnh](/khoa-hoc/thingedu/thingblock/vi-du/k12-20-robot-fanroc) →

*Nguồn: ví dụ có sẵn trong ThingBlock 0.6 (kho ThingEdu/thingblock-editor, nhánh develop, 04/11/2026); lời hướng dẫn của Làng Maker.*
