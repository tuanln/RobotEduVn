---
title: "Kết nối với Arduino IDE"
---

## Kết nối Arduino IDE với mạch ThingBot

Kết nối với Arduino IDE:

Giao diện cơ bản khi chưa kết nối:

![](/hoc-lieu/media/a62aaae4c9d13d9b.webp)

Click chọn ![](/hoc-lieu/media/2e4961996b52441a.webp) để có thể lựa chọn loại mạch và cổng kết nối.

Chọn "Select other boards and port", tìm và chọn "ESP32C3 Dev Module" ![](/hoc-lieu/media/0e5d46a705fd76bf.webp)

Ports - cổng: sẽ tuỳ vào máy của các bạn, nhưng phần lớn sẽ hiện đuôi "(USB)" bên cạnh "COMxx Serial Port" - giống như thế này: 

![](/hoc-lieu/media/18efd30b346deabf.webp)\
Trong trường hợp máy bạn không nhận ra được đang cắm port nào thì bạn phải tải "driver CH340" để có thể giao tiếp được với mạch qua cổng cắm.

Sau khi đã kết nối thành công và đang kết nối, phông chữ sẽ được in đậm:

![](/hoc-lieu/media/fd10e2cb812025be.webp)

Từ giờ, bạn đã có thể lập trình ThingBot với Arduino IDE rồi!

Lưu ý: nếu bạn muốn hiển thị kết quả trong Serial thì bắt buộc bạn phải bật trong "Tools" ở thanh công cụ trên cùng, tìm "**USB CDC on Boot**" và chuyển từ "**Disabled**" thành "**Enabled**" và rút dây kết nối, cắm lại mạch. Từ đó, bạn sẽ in kết quả ra được Serial!

![](/hoc-lieu/media/1202315b5021727c.webp)
