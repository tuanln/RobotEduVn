---
title: "Cài đặt ThingBlock"
description: "Tải bản cài cho Windows, macOS, Linux; mở lần đầu và tải gói bo ESP32 cho ThingBot"
nguon: "ThingEdu"
---

## Tải bản cài

Mở trang phát hành của ThingBlock: [github.com/ThingEdu/thingblock-desktop/releases/latest](https://github.com/ThingEdu/thingblock-desktop/releases/latest). Ở mục **Assets**, chọn tệp hợp với máy của bạn:

| Máy tính | Tệp cần tải (bản 0.4.0) | Dung lượng |
|---|---|---|
| Windows 10/11, 64-bit | `ThingBlock_0.4.0_x64-setup.exe` | khoảng 85 MB |
| Mac chip Apple (M1, M2, M3…) | `ThingBlock_0.4.0_aarch64.dmg` | khoảng 131 MB |
| Ubuntu, Debian (64-bit) | `ThingBlock_0.4.0_amd64.deb` | khoảng 134 MB |
| Fedora, openSUSE (64-bit) | `ThingBlock-0.4.0-1.x86_64.rpm` | khoảng 134 MB |

Bản 0.4.0 **không có** bản cho Mac chip Intel và cho máy Linux ARM (Raspberry Pi, NEO One…).

## Cài trên Windows

1. Mở tệp `ThingBlock_0.4.0_x64-setup.exe` vừa tải.
2. Bản cài chưa được ký số nên Windows có thể hiện hộp **"Windows protected your PC"** (SmartScreen). Bấm **More info**, rồi **Run anyway**.
3. Làm theo trình cài đặt, xong thì mở ThingBlock từ menu Start.

## Cài trên macOS

1. Mở tệp `ThingBlock_0.4.0_aarch64.dmg`, kéo biểu tượng **ThingBlock** vào thư mục **Applications**.
2. Lần đầu mở, macOS có thể chặn vì ứng dụng chưa được Apple chứng thực. Vào **Cài đặt hệ thống → Quyền riêng tư & Bảo mật**, kéo xuống mục Bảo mật và bấm **Vẫn mở** cho ThingBlock, rồi mở lại.

## Cài trên Linux

Với Ubuntu/Debian, mở Terminal ở thư mục chứa tệp vừa tải và chạy:

```bash
sudo apt install ./ThingBlock_0.4.0_amd64.deb
```

Với Fedora: `sudo dnf install ./ThingBlock-0.4.0-1.x86_64.rpm`.

Để ThingBlock được dùng cổng USB của bo mà không cần quyền quản trị, thêm tài khoản của bạn vào nhóm `dialout`, rồi đăng xuất và đăng nhập lại:

```bash
sudo usermod -aG dialout $USER
```

## Mở ThingBlock lần đầu

![Màn hình ThingBlock khi mới mở, chưa chọn bo](/hoc-lieu/thingblock/anh/01-man-hinh-dau.webp)

- Lần đầu mở, ThingBlock tự chép bộ công cụ biên dịch (khoảng 300 MB) vào thư mục dữ liệu của bạn. Việc này chạy ngầm một lần.
- Phần giao diện và tên khối lõi hiện tiếng Việt theo ngôn ngữ của máy. Muốn đổi, vào **Settings → Language → Tiếng Việt**.
- Các khối phần cứng (ThingBot, cảm biến, màn hình…) hiện **tiếng Anh**, kể cả khi giao diện đặt tiếng Việt. Các trang khối lệnh trong khóa này giải nghĩa từng khối.

## Tải gói bo ESP32 cho ThingBot

ThingBot dùng chip ESP32-C3. Bộ biên dịch cho ESP32 rất nặng (khoảng 1 GB) nên không có sẵn trong bản cài.

1. Bấm **Select board** trên thanh menu và chọn **ThingBot**.
2. ThingBlock mở hộp **Board package**, báo gói bo chưa được cài và hỏi có tải ngay không. Bấm **Download**.
3. Chờ vài phút tới khi tải xong. Bước này cần Internet và chỉ làm một lần.

Thư mục dữ liệu của ThingBlock:

| Máy | Đường dẫn |
|---|---|
| Windows | `%LOCALAPPDATA%\ThingBlock` |
| macOS | `~/Library/Application Support/ThingBlock` |
| Linux | `~/.local/share/ThingBlock` |

## Nối bo ThingBot với máy tính

- Cắm dây USB Type-C vào mạch ThingBot. ThingBot dùng cổng USB có sẵn của chip ESP32-C3, nên trên Windows 10/11 và macOS thường **không cần cài driver**.
- Nếu ThingBlock không thấy bo: thử dây khác (nhiều dây chỉ sạc được), thử cổng USB khác. Ngay sau khi mở ThingBlock, danh sách cổng có thể trống tới một phút trong lúc phần mềm khởi động. Chờ một chút rồi thử lại.
- Động cơ và servo cần **nguồn pin**: bật công tắc nguồn trên ThingBotShield. Nguồn USB chỉ đủ cho mạch, không đủ cho động cơ.

Tiếp theo: [Làm quen giao diện](/khoa-hoc/thingedu/thingblock/lam-quen).
