---
title: "Cài đặt ThingBlock"
description: "Tải bản cài cho Windows, macOS, Linux; mở lần đầu khi bản cài chưa ký số, cấp quyền camera cho Camera AI và tải gói bo ESP32 cho ThingBot"
nguon: "ThingEdu"
---

## Tải bản cài

Có hai bản để chọn:

- **Bản thử 0.8.0** (12/11/2026): có Camera AI, mạch CoBot, cảm biến màu, mô phỏng, bài học, ví dụ và các sửa lỗi lớn ở chế độ Live. Dùng bản này để học theo khóa và chuẩn bị FanRoc. Bản cài **sắp có** ở [ThingEdu/thingblock-desktop/releases](https://github.com/ThingEdu/thingblock-desktop/releases), bản ghi `0.8.0-preview-20261112` (bản thử đánh dấu *Pre-release*); trong lúc chờ, dùng bản thử 0.6. Bản thử trước đó là [0.6.0](/khoa-hoc/thingedu/thingblock/ban-0-6) (04/11/2026).
- **Bản ổn định 0.5.0** (30/10/2026): chưa có mô phỏng, Camera AI, CoBot. Trang tải: [releases/latest](https://github.com/ThingEdu/thingblock-desktop/releases/latest).

Ở mục **Assets** của trang tải, chọn tệp hợp với máy của bạn. Tên tệp bắt đầu bằng `ThingBlock_` và số bản (ví dụ `ThingBlock_0.5.0_x64-setup.exe`, `ThingBlock_0.6.0-preview-20261104_aarch64.dmg`):

| Máy tính | Chọn tệp |
|---|---|
| Windows 10/11, 64-bit | đuôi `_x64-setup.exe` |
| Mac chip Apple (M1, M2, M3…) | đuôi `_aarch64.dmg` |
| Ubuntu, Debian (64-bit) | đuôi `_amd64.deb` |
| Fedora, openSUSE (64-bit) | đuôi `.x86_64.rpm` |

Tệp nặng khoảng 80 MB (Windows) tới 130 MB (macOS, Linux). **Không có** bản cho Mac chip Intel và cho máy Linux ARM (Raspberry Pi, NEO One…). Bản mới mở được tệp `.tb` lưu từ bản cũ.

> **Bản cài chưa được ký số.** Ký số là cách nhà làm phần mềm "đóng dấu" để máy tính biết tệp là thật. ThingBlock chưa mua dấu này, nên Windows và macOS sẽ **cảnh báo một lần** khi mở. Đó là cảnh báo chung cho mọi phần mềm chưa ký, không phải vi-rút. Làm theo hai mục dưới để mở tiếp.

## Cài trên Windows

1. Mở tệp `…_x64-setup.exe` vừa tải.
2. Windows hiện hộp **"Windows protected your PC"** (SmartScreen). Bấm **More info**, rồi **Run anyway**.
3. Làm theo trình cài đặt, xong thì mở ThingBlock từ menu Start.

## Cài trên macOS

1. Mở tệp `…_aarch64.dmg`, kéo biểu tượng **ThingBlock** vào thư mục **Applications**.
2. Lần đầu, **đừng nhấp đúp**: vào Applications, **nhấp chuột phải vào ThingBlock rồi chọn Mở**, và bấm **Mở** lần nữa trong hộp cảnh báo. Chỉ phải làm một lần.
3. Nếu lỡ nhấp đúp và macOS chặn: vào **Cài đặt hệ thống → Quyền riêng tư & Bảo mật**, kéo xuống mục Bảo mật và bấm **Vẫn mở** cho ThingBlock, rồi mở lại.

## Cài trên Linux

Với Ubuntu/Debian, mở Terminal ở thư mục chứa tệp vừa tải và chạy (thay đúng tên tệp đã tải):

```bash
sudo apt install ./ThingBlock_<bản>_amd64.deb
```

Với Fedora: `sudo dnf install ./ThingBlock-<bản>.x86_64.rpm`.

Để ThingBlock được dùng cổng USB của bo mà không cần quyền quản trị, thêm tài khoản của bạn vào nhóm `dialout`, rồi đăng xuất và đăng nhập lại:

```bash
sudo usermod -aG dialout $USER
```

## Mở ThingBlock lần đầu

![Màn hình ThingBlock khi mới mở, chưa chọn bo](/hoc-lieu/thingblock/anh/01-man-hinh-dau.webp)

- Lần đầu mở, ThingBlock tự chép bộ công cụ biên dịch (khoảng 300 MB) vào thư mục dữ liệu của bạn. Việc này chạy ngầm một lần.
- Phần giao diện và tên khối lõi hiện tiếng Việt theo ngôn ngữ của máy. Muốn đổi, vào **Settings → Language → Tiếng Việt**. Từ bản 0.6, app nhớ ngôn ngữ và bo đã chọn cho lần mở sau.
- Ở bản 0.5.0 trở về trước, các khối phần cứng (ThingBot, cảm biến, màn hình…) hiện **tiếng Anh** kể cả khi giao diện đặt tiếng Việt; từ bản 0.6 dịch cả khối phần cứng, menu, hộp thoại và bài học. Các trang khối lệnh trong khóa ghi chữ tiếng Anh trên khối kèm nghĩa, để dùng được với cả hai bản.
- Cùng với app có **ThingBlock Link**, chương trình nhỏ chạy ngầm để biên dịch, nạp và chấm bài học. Bản cài tự mở nó; nếu menu Bài học báo *cần ứng dụng ThingBlock Link*, mở ThingBlock lại.

## Cho phép dùng camera (Camera AI) *(từ bản 0.8)*

Camera AI cần webcam. Lần đầu chạy khối `bật camera` hoặc bấm **Camera** ở khung Sân chơi, máy hỏi có cho ThingBlock dùng camera không: chọn **Cho phép**. Hình ảnh chỉ xử lý trên máy, không gửi đi đâu.

Lỡ chọn *Không cho phép* thì bật lại:

- **macOS**: Cài đặt hệ thống → Quyền riêng tư & Bảo mật → **Camera**, bật công tắc cạnh ThingBlock, rồi mở lại app.
- **Windows**: Settings → Privacy & security → **Camera**, bật *Let desktop apps access your camera*.

Máy không có webcam thì chọn **Chuột (không cần webcam)** ở ô Chọn camera, hoặc dùng điện thoại làm camera. Xem [Camera AI](/khoa-hoc/thingedu/thingblock/camera-ai).

## Tải gói bo ESP32 cho ThingBot

ThingBot (và CoBot) dùng chip ESP32-C3. Bộ biên dịch cho ESP32 rất nặng (khoảng 1 GB) nên không có sẵn trong bản cài.

1. Bấm **Select board** (từ bản 0.6: **Chọn mạch**) trên thanh menu và chọn **ThingBot** (hoặc **CoBot**).
2. ThingBlock mở hộp **Board package**, báo gói bo chưa được cài và hỏi có tải ngay không. Bấm **Download**.
3. Chờ vài phút tới khi tải xong. Bước này cần Internet và chỉ làm một lần. Từ bản 0.6, ThingBlock ghim lõi ESP32 bản 3.3.11 và cho phép đóng gói sẵn để sân thi không có mạng vẫn nạp được.

Thư mục dữ liệu của ThingBlock:

| Máy | Đường dẫn |
|---|---|
| Windows | `%LOCALAPPDATA%\ThingBlock` |
| macOS | `~/Library/Application Support/ThingBlock` |
| Linux | `~/.local/share/ThingBlock` |

## Nối bo ThingBot với máy tính

- Cắm dây USB Type-C vào mạch ThingBot. ThingBot dùng cổng USB có sẵn của chip ESP32-C3, nên trên Windows 10/11 và macOS thường **không cần cài driver**.
- Nếu ThingBlock không thấy bo: thử dây khác (nhiều dây chỉ sạc được), thử cổng USB khác. Ngay sau khi mở ThingBlock, danh sách cổng có thể trống tới một phút trong lúc phần mềm khởi động. Chờ một chút rồi thử lại. Các lỗi khác xem [Sửa lỗi thường gặp](/khoa-hoc/thingedu/thingblock/sua-loi).
- Động cơ và servo cần **nguồn pin**: bật công tắc nguồn trên ThingBotShield. Nguồn USB chỉ đủ cho mạch, không đủ cho động cơ.

Tiếp theo: [Làm quen giao diện](/khoa-hoc/thingedu/thingblock/lam-quen).
