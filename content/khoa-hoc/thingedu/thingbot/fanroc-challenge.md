---
title: "ThingBot FanRoc Challenge"
description: "Sân FANROC ảo trên máy tính (bộ cài TiFa 0.8.0): lái robot thi đấu, lập trình qua 12 nhiệm vụ con rùa, viết chương trình ở Xưởng, xuất tệp .tb"
nguon: "ThingEdu"
---

**ThingBot FanRoc Challenge** là sân thi FANROC ảo cho macOS và Windows. Em lái robot ThingBot thi đấu, học lập trình robot bằng khối ThingBlock qua từng nhiệm vụ, rồi tải chương trình về dạng tệp `.tb` để chia sẻ và mở trong ThingBlock. **TiFa** là tên bộ cài.

Hành trình gợi ý có bốn bước, đúng vòng **Chơi → Làm → Chia sẻ** của Làng:

1. **Chơi thi đấu**: lái robot bằng bàn phím, hiểu luật và cách ghi điểm.
2. **Nhiệm vụ con rùa**: lập trình robot qua 12 nhiệm vụ, từ đi thẳng tới đấu trọn một trận.
3. **Xưởng lập trình**: viết chương trình cho robot của em và mang vào trận.
4. **Chia sẻ tệp .tb**: tải chương trình về, gửi cho bạn và thầy cô.

## Tải và cài

Bản mới nhất: **0.8.0** (11/11/2026). Trang phát hành: [github.com/ThingEdu/thingbot-sim/releases/tag/fanroc-v0.8.0](https://github.com/ThingEdu/thingbot-sim/releases/tag/fanroc-v0.8.0). Bản mới hơn (nếu có) luôn ở [releases/latest](https://github.com/ThingEdu/thingbot-sim/releases/latest).

| Máy | Tệp tải |
|---|---|
| macOS (chip Apple và chip Intel) | [TiFa_0.8.0_universal.dmg](https://github.com/ThingEdu/thingbot-sim/releases/download/fanroc-v0.8.0/TiFa_0.8.0_universal.dmg) (9 MB) |
| Windows | [TiFa_0.8.0_x64-setup.exe](https://github.com/ThingEdu/thingbot-sim/releases/download/fanroc-v0.8.0/TiFa_0.8.0_x64-setup.exe) (3 MB) hoặc [TiFa_0.8.0_x64_en-US.msi](https://github.com/ThingEdu/thingbot-sim/releases/download/fanroc-v0.8.0/TiFa_0.8.0_x64_en-US.msi) (4 MB) |

Ứng dụng **chưa được ký số**, nên lần đầu mở máy sẽ cảnh báo:

- **macOS**: mở tệp `.dmg`, kéo TiFa vào **Applications**. Lần đầu mở: bấm chuột phải vào TiFa › **Mở** › **Mở**. Trên macOS 15 trở lên, nếu máy chỉ hiện nút **Xong**: vào **Cài đặt hệ thống › Quyền riêng tư & Bảo mật**, kéo xuống cuối, bấm **Vẫn mở** cạnh dòng báo TiFa, rồi mở lại.
- **Windows**: chạy tệp `-setup.exe` hoặc `.msi`. Nếu SmartScreen chặn, bấm **More info** › **Run anyway**.

Mở app sẽ thấy màn chính có bốn ô: **Giải đấu**, **Trận lẻ · Đấu tập**, **Nhiệm vụ**, **Xưởng lập trình**, bên dưới là **Luật chơi** và **Robot mẫu**. Chọn bằng chuột hoặc phím mũi tên, Enter để vào. Nút ⚙ ở góc phải mở cài đặt.

## 1. Chơi thi đấu

Đọc **Luật chơi** trước để biết sân có gì (Khu Chữa Cháy, bốn núi, cờ, Vùng Bảo Vệ) và cách ghi điểm; mở **Robot mẫu** xem các mẫu robot và cơ cấu của chúng. Rồi vào **Trận lẻ · Đấu tập**:

- **Trận lẻ**: một trận 3 phút đúng luật, liên minh Đỏ đấu liên minh Xanh, mỗi bên 2 robot. Robot không do em lái thì máy lái.
- **Đấu tập**: sân tự do, không tính giờ, lỗi chỉ nhắc chứ không phạt. Dùng để tập lái.

Bàn phím là tay cầm PS2 ảo (bảng đầy đủ ở ⚙ › Phím điều khiển):

| Phím | Việc |
|---|---|
| W A S D hoặc mũi tên | tiến, lùi, quay trái, quay phải |
| Q / E | đi ngang (chỉ đế 4 bánh omni, mecanum) |
| I J K L (hoặc 1 2 3 4) | nút △ □ ✕ ○: hút, xả, nâng, cắm cờ… tuỳ robot |
| U O Y P | nút L1 R1 L2 R2 |

Có tay cầm chơi game thật thì cắm vào máy là dùng được. Hai bạn chung một máy: bật ⚙ › **Hai bạn chơi**, bàn phím chia đôi.

Trong trận, mỗi lần được cộng điểm, bị trừ điểm hay bị phạt, góc phải dưới hiện một dòng báo kèm lý do. Thẻ robot bên trái nhắc khi robot sắp phạm luật.

Lái quen rồi thì thử **Giải đấu**: 8 đội, đúng luật FANROC, 1–2 bạn chơi. Giữa các trận em ở **Pit**: xem bảng xếp hạng, xem nhanh trận của máy, hoặc vào Xưởng sửa chương trình. Giải tự lưu, tắt app mở lại vẫn đấu tiếp.

## 2. Nhiệm vụ con rùa

Robot để lại vệt trên sân như bút của con rùa, nên em thấy ngay robot đã đi đường nào. 12 nhiệm vụ chia 4 chặng, làm theo thứ tự hay nhảy cóc đều được:

| Chặng | Nhiệm vụ |
|---|---|
| 1 · Hai bánh xe | 1 Làm quen robot · 2 Đi thẳng · 3 Cong và xoay · 4 Đo robot |
| 2 · Con rùa robot | 5 Khối "tiến (m)" · 6 Khối "rẽ phải/trái (độ)" · 7 Hình vuông · 8 Gỡ lỗi |
| 3 · Việc trên sân | 9 Dọn Khu Chữa Cháy · 10 Cắm cờ · 11 Về Vùng Bảo Vệ |
| 4 · Thi đấu | 12 Trận đầu tiên |

Mỗi nhiệm vụ:

1. Đọc **Mục tiêu** trong bảng hướng dẫn (bấm **Tiếp** xem từng bước gợi ý; nút **HƯỚNG DẪN** mở lại).
2. Xem thẻ **THỬ THÁCH** ở góc trên phải: điều kiện để được ⭐, ⭐⭐, ⭐⭐⭐.
3. Ghép khối dưới «khi Arduino khởi động» (chạy một lần) hoặc «vòng lặp Arduino» (chạy lặp mãi), y như ThingBlock.
4. Bấm **▶ Chạy**. Điều kiện nào đạt thì thẻ THỬ THÁCH tự tích ✓.
5. Robot dừng hẳn thì game tự chấm (hoặc bấm **Chấm**): số sao kèm gợi ý sửa, ví dụ "Còn hụt 4 cm — thử tăng thời gian đợi?".
6. **Xem lại vệt**, **Làm lại**, hoặc **Nhiệm vụ tiếp**. Tiến độ, số sao và chương trình đều tự lưu.

Nhiệm vụ 5 và 6 dạy **tạo khối của em**: mục **Khối của em** (chấm hồng) › **Tạo một khối** › đặt tên, bấm **+ Thêm ô số** nếu khối cần một số (như "mét") › **Tạo khối**, rồi kéo các khối vào dưới khối hồng «định nghĩa …».

## 3. Xưởng lập trình

**Xưởng lập trình** là nơi viết chương trình cho robot của em để mang vào trận: chọn mẫu robot và đế, viết chương trình lái tay hoặc tự chạy, bấm ▶ thử ngay trên sân, rồi **Lưu** (mỗi lần lưu là một bản mới: v1, v2…). Vào **Trận lẻ** hay **Giải đấu**, robot của em chạy bản đã lưu, nhãn ghi "Của em v…". **Về mặc định** xoá bản đã lưu, quay về chương trình mẫu.

## 4. Chia sẻ tệp .tb

Trong **Xưởng**, bấm **Tải .tb** (ở các màn có khung Khối, nút tải nằm trên thanh chạy). App lưu tệp vào thư mục **Downloads** với tên dạng `fanroc-<mẫu robot>-<ngày>-<giờ>.tb`, tải nhiều lần không ghi đè tệp cũ. Gửi tệp cho bạn hoặc thầy cô qua tin nhắn, email, Drive; mở bằng [ThingBlock](/khoa-hoc/thingedu/thingblock) để nạp lên ThingBot thật.

Cần biết:

- Game **chỉ xuất** được tệp `.tb`, **chưa mở lại** được tệp `.tb`. Chương trình trong game vẫn tự lưu trên máy em.
- Chương trình có **khối của em có ô số** (như «tiến (mét)») tải về được nhưng **chưa nạp được lên ThingBot thật**; game báo khi em tải. Muốn nạp robot thật thì dùng khối của em không có ô số, hoặc ghép thẳng các khối.

## Học tiếp

- Mạch ThingBot ảo trên trình duyệt, không cần cài: [10 bài Mô phỏng](/mo-phong?bai=1), trong đó bài 6 dạy mắt hồng ngoại nhận bóng FanRoc sáng, tối.
- Hai ví dụ robot FanRoc trong ThingBlock: [Robot thi đấu bước 1](/khoa-hoc/thingedu/thingblock/vi-du/k12-18-ftc-khoi-dong) và [Robot FanRoc hoàn chỉnh](/khoa-hoc/thingedu/thingblock/vi-du/k12-20-robot-fanroc).
- Luật mùa thi và lịch: [Các cuộc thi](/khoa-hoc/thingedu/thingbot/cac-cuoc-thi).

*Nguồn: hướng dẫn học sinh trong kho [ThingEdu/thingbot-sim](https://github.com/ThingEdu/thingbot-sim/blob/fanroc-v0.8.0/docs/fanroc/huong-dan-hoc-sinh.md) (tag fanroc-v0.8.0). Game theo giấy phép AGPL-3.0, mã nguồn đúng của bản này: [thingbot-sim tại fanroc-v0.8.0](https://github.com/ThingEdu/thingbot-sim/tree/fanroc-v0.8.0); nguồn từng phần dùng lại (ThingBlock, three.js, Rapier, JSZip, UrSimulator, CAD sân và robot của ThingEdu) ghi ở tệp `NGUON.md` trong bộ cài và trong game ở ⚙ › Nguồn. Tên FANROC dùng có xin phép ban tổ chức; luật trong game là bản tóm tắt bằng lời riêng.*
