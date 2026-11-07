---
title: "Cài đặt ThingBlock"
description: "Tải bản cài cho Windows, macOS, Linux; mở lần đầu và tải gói bo ESP32 cho ThingBot"
nguon: "ThingEdu"
---

## Tải bản cài

Có hai bản để chọn:

- **Bản thử 0.6.0** (04/11/2026): có mô phỏng, bài học, ví dụ và các sửa lỗi lớn ở chế độ Live. Dùng bản này để học theo khóa và chuẩn bị FanRoc. Trang tải: [v0.6.0-preview-20261104](https://github.com/ThingEdu/thingblock-desktop/releases/tag/v0.6.0-preview-20261104).
- **Bản ổn định 0.5.0** (30/10/2026): chưa có mô phỏng. Trang tải: [releases/latest](https://github.com/ThingEdu/thingblock-desktop/releases/latest).

Ở mục **Assets** của trang tải, chọn tệp hợp với máy của bạn:

| Máy tính | Bản thử 0.6.0 | Bản ổn định 0.5.0 |
|---|---|---|
| Windows 10/11, 64-bit | `ThingBlock_0.6.0-preview-20261104_x64-setup.exe` (78 MB) | `ThingBlock_0.5.0_x64-setup.exe` (78 MB) |
| Mac chip Apple (M1, M2, M3…) | `ThingBlock_0.6.0-preview-20261104_aarch64.dmg` (125 MB) | `ThingBlock_0.5.0_aarch64.dmg` (124 MB) |
| Ubuntu, Debian (64-bit) | `ThingBlock_0.6.0-preview-20261104_amd64.deb` (128 MB) | `ThingBlock_0.5.0_amd64.deb` (127 MB) |
| Fedora, openSUSE (64-bit) | `ThingBlock-0.6.0-preview-20261104-1.x86_64.rpm` (127 MB) | `ThingBlock-0.5.0-1.x86_64.rpm` (127 MB) |

Cả hai bản **không có** bản cho Mac chip Intel và cho máy Linux ARM (Raspberry Pi, NEO One…). Bản 0.6 mở được tệp `.tb` lưu từ bản cũ.

## Cài trên Windows

1. Mở tệp `…_x64-setup.exe` vừa tải.
2. Bản cài chưa được ký số nên Windows có thể hiện hộp **"Windows protected your PC"** (SmartScreen). Bấm **More info**, rồi **Run anyway**.
3. Làm theo trình cài đặt, xong thì mở ThingBlock từ menu Start.

## Cài trên macOS

1. Mở tệp `…_aarch64.dmg`, kéo biểu tượng **ThingBlock** vào thư mục **Applications**.
2. Lần đầu mở, macOS có thể chặn vì ứng dụng chưa được Apple chứng thực. Vào **Cài đặt hệ thống → Quyền riêng tư & Bảo mật**, kéo xuống mục Bảo mật và bấm **Vẫn mở** cho ThingBlock, rồi mở lại.

## Cài trên Linux

Với Ubuntu/Debian, mở Terminal ở thư mục chứa tệp vừa tải và chạy:

```bash
sudo apt install ./ThingBlock_0.6.0-preview-20261104_amd64.deb
```

Với Fedora: `sudo dnf install ./ThingBlock-0.6.0-preview-20261104-1.x86_64.rpm`. Bản 0.5.0 thay tên tệp tương ứng.

Để ThingBlock được dùng cổng USB của bo mà không cần quyền quản trị, thêm tài khoản của bạn vào nhóm `dialout`, rồi đăng xuất và đăng nhập lại:

```bash
sudo usermod -aG dialout $USER
```

## Mở ThingBlock lần đầu

![Màn hình ThingBlock khi mới mở, chưa chọn bo](/hoc-lieu/thingblock/anh/01-man-hinh-dau.webp)

- Lần đầu mở, ThingBlock tự chép bộ công cụ biên dịch (khoảng 300 MB) vào thư mục dữ liệu của bạn. Việc này chạy ngầm một lần.
- Phần giao diện và tên khối lõi hiện tiếng Việt theo ngôn ngữ của máy. Muốn đổi, vào **Settings → Language → Tiếng Việt**. Từ bản 0.6, app nhớ ngôn ngữ và bo đã chọn cho lần mở sau.
- Ở bản 0.5.0 trở về trước, các khối phần cứng (ThingBot, cảm biến, màn hình…) hiện **tiếng Anh** kể cả khi giao diện đặt tiếng Việt; bản 0.6 dịch cả khối phần cứng, menu, hộp thoại và bài học. Các trang khối lệnh trong khóa ghi chữ tiếng Anh trên khối kèm nghĩa, để dùng được với cả hai bản.

## Tải gói bo ESP32 cho ThingBot

ThingBot dùng chip ESP32-C3. Bộ biên dịch cho ESP32 rất nặng (khoảng 1 GB) nên không có sẵn trong bản cài.

1. Bấm **Select board** (bản 0.6: **Chọn mạch**) trên thanh menu và chọn **ThingBot**.
2. ThingBlock mở hộp **Board package**, báo gói bo chưa được cài và hỏi có tải ngay không. Bấm **Download**.
3. Chờ vài phút tới khi tải xong. Bước này cần Internet và chỉ làm một lần. Bản 0.6 ghim lõi ESP32 bản 3.3.11 và cho phép đóng gói sẵn để sân thi không có mạng vẫn nạp được.

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
