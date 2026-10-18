---
title: "Phần 3: Làm việc với mạch VIA"
---

Phần này hướng dẫn các kỹ thuật cơ bản để làm việc với mạch VIA, phục vụ cho việc chế tạo robot.

## 3.1. Cấp nguồn và lưu ý an toàn

Có nhiều cách để bạn cấp nguồn cho mạch VIA B, tùy theo trường hợp sử dụng các bạn có thể lựa chọn:

**1. CẤP NGUỒN 5V: **Cấp nguồn qua cổng USB Type-C bằng cáp USB Type-C kết nối với máy tính

***Lưu ý:*** Cấp nguồn 5V chỉ cho phép bạn nạp code và kiểm tra mạch điều khiển. Để sử dụng khối mạch công suất, cần cấp nguồn 12V theo cách bên dưới

**2. CẤP NGUỒN 12V: **Bạn có thể lựa chọn 1 trong 2 cách sau:

- **Cấp nguồn qua cổng cấp nguồn DC 12V (jack XT-60) trên mạch công suất. **(đây là cách tiện lợi và an toàn nhất do pin lipo được cung cấp trong bộ kit K12 Maker sử dụng cùng loại jack)

![Cách cấp nguồn bằng pin lipo ](/hoc-lieu/media/2410bc92e6ce1c07.webp)

- Cấp nguồn qua cổng cấp nguồn DC 12V (DC5.5x2.5MM) trên mạch điều khiển

**CÁC LƯU Ý AN TOÀN KHI SỬ DỤNG MẠCH VIA B:**

- Nên sử dụng dây cáp USB Type C có chất lượng tốt
- Không nên cắm mạch VIA B qua bộ chia USB (USB HUB).
- Nếu có thể, nên cắm mạch VIA B vào cổng USB 3.0 để đảm bảo nguồn cung cấp năng lượng cho mạch.
- **Không cắm ngược chiều nguồn điện** cho mạch công suất VIA B.
- **Không cắm nguồn điện trực tiếp vào chân IO** của mạch VIA B, hay bất cứ connector nào không phục vụ cho việc cấp nguồn.
- Không cắm các thiết bị chưa rõ tương thích chân vào mạch VIA B.
- Tuyệt đối **không cắm pin vào header I2C (connector 4 chân) hoặc header SPI (connector 6 chân)** trên mạch công suất.
- **Không đặt mạch trực tiếp lên bề mặt kim loại** có tính chất dẫn điện trong lúc mạch đang được cấp nguồn để tránh việc chập các chân tín hiệu và chân nguồn, dẫn đến hỏng hoàn toàn mạch.

## 3.2. Hướng dẫn lập trình với mạch VIA

**Các bạn thực hiện lập trình cho mạch VIA theo hướng dẫn sau: [Hướng dẫn lập trình cho mạch VIA](https://github.com/makerviet/via-k12maker "https://github.com/makerviet/via-k12maker").**
