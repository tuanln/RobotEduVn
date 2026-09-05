# Font cho ảnh OG

`BeVietnamPro-Regular.ttf` và `BeVietnamPro-Bold.ttf` — bản gốc từ
[Google Fonts](https://fonts.google.com/specimen/Be+Vietnam+Pro), giấy phép
SIL Open Font License 1.1 (xem `OFL.txt`).

Nhúng trong repo thay vì để `next/og` tải động từ Google Fonts: bản tải động
không có dấu tiếng Việt và sẽ hỏng khi build không ra được Internet.
Dùng qua `lib/og-fonts.ts`.
