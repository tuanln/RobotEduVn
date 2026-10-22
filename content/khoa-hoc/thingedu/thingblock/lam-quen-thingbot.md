---
title: "Làm quen ThingBot"
description: "Mỗi bộ phận trên ThingBot ứng với khối lệnh nào, cách cấp nguồn pin, chương trình kiểm tra bo trước buổi học đầu và cách lái xe 4 bánh mecanum"
nguon: "ThingEdu"
---

Trang này dành cho buổi đầu cầm ThingBot: biết bộ phận nào điều khiển bằng khối nào, cấp nguồn đúng cách, rồi chạy một chương trình kiểm tra để chắc bo, động cơ và servo đều chạy **trước khi** học sinh bắt tay vào bài mẫu. Cách lắp khung xe xem video ở trang [Về ThingBot](/khoa-hoc/thingedu/thingbot/ve-thingbot).

## Bộ phận nào, khối nào

ThingBot gồm hai mạch chồng lên nhau: mạch **ThingBot** (chip ESP32-C3, cổng USB Type-C) ở trên và mạch mở rộng **ThingBotShield** ở dưới. Hầu hết những thứ cần cắm đều nằm trên ThingBotShield.

![Mạch ThingBotShield, đánh số từ 1 tới 9](/hoc-lieu/media/1a64c1d523cf5627.webp)

| Số trên ảnh | Bộ phận | Điều khiển bằng |
|---|---|---|
| 1 | Nút bấm **SW** | `read switch` |
| 2 | Cổng **I2C** 4 chân | Màn OLED, cảm biến MPU6050 (thêm ngoại vi) |
| 3 | Cổng **PS2** 6 chân, cắm bộ thu tay cầm | `init PS2 on ThingBot`, nhóm PS2 |
| 4 | Cổng động cơ **M1–M4** | `set motor [M1] go [forward] at (60)` |
| 5 | Công tắc nguồn | Không có khối: bật để động cơ, servo có điện |
| 6 | Jack nguồn pin (+ và −, tối đa 9 V) | Không có khối |
| 7 | Cổng **S1–S5**, mỗi cổng 3 chân GND – 5V – tín hiệu | `set servo [S1] to angle (90) degrees`, module 3 chân |
| 8 | Hai cổng 4 chân có chân GPIO | Cảm biến: DHT11, siêu âm (chân **IO0**, **IO4**) |
| 9 | Còi nhỏ | `play note [C (Do)] octave [4] for (1) beats` |

Hai đèn **LED 1**, **LED 2** trên bo điều khiển bằng `set led [1] (100)`. Động cơ, servo, LED và còi đều được điều khiển qua chip PCA9685, nối với ESP32-C3 bằng đường I2C (chân 8 và 9). Vì vậy đừng dùng chân 8, 9 cho cảm biến.

## Nguồn điện

- Bộ kit dùng **2 viên pin 18650** trong khay pin, cắm vào jack nguồn. Pin sạc đầy cho khoảng 8,4 V, dưới mức tối đa 9 V của bo. Lắp pin đúng chiều theo ký hiệu + và − in trên pin và trên khay.
- **Dây USB** chỉ nuôi mạch và dùng để nạp chương trình. Muốn động cơ hay servo chạy thì phải có pin và **bật công tắc nguồn** (số 5).
- Dấu hiệu pin yếu: robot chạy chậm dần, bo tự khởi động lại (chương trình chạy lại từ đầu) mỗi khi động cơ bắt đầu quay, servo giật. Khi đó sạc pin trước khi nghi chương trình sai.
- Rút pin hoặc tắt công tắc khi cất robot.

## Chương trình kiểm tra ThingBot

Chạy chương trình này một lần với mỗi robot trước buổi học đầu, hoặc mỗi khi robot "không chịu chạy". Mất khoảng 15 phút.

**Chuẩn bị:** robot đã lắp động cơ vào M1–M4 (xe 2 bánh thì chỉ M1, M2), một servo cắm cổng **S1** (dây nâu vào GND, dây đỏ vào 5V, dây vàng vào chân tín hiệu S1), pin đã sạc. **Kê robot lên** hộp hoặc giá để bánh quay tự do, không chạy trên mặt bàn.

![Chương trình kiểm tra: còi chào, đèn LED 1 chờ bấm SW, rồi lần lượt thử M1–M4 và servo S1](/hoc-lieu/thingblock/anh/kiem-tra-thingbot.webp)

📥 [Tải kiem-tra-thingbot.tb](/hoc-lieu/thingblock/tep/kiem-tra-thingbot.tb)

```text
khi Arduino khởi động
  begin serial at [115200] baud
  play note [C (Do)] octave [4] for (0.5) beats
  play note [E (Mi)] octave [4] for (0.5) beats
  play note [G (Sol)] octave [4] for (1) beats
  serial print line (ThingBot san sang. Bam nut SW de kiem tra.)

vòng lặp Arduino
  set led [1] (100)                ← LED 1 sáng: đang chờ bấm SW
  đợi đến khi <read switch>
  set led [1] (0)
  set led [2] (100)                ← LED 2 sáng: đang kiểm tra
  thử động cơ
  thử servo
  set led [2] (0)
  serial print line (Xong. Bam SW de thu lai.)

định nghĩa thử động cơ             ← lặp lại cho M2, M3, M4
  serial print line (M1 chay tien)
  set motor [M1] go [forward] at (60)
  đợi (1) giây
  set motor [M1] go [forward] at (0)
  đợi (0.5) giây

định nghĩa thử servo
  serial print line (Servo S1: 0 - 180 - 90 do)
  set servo [S1] to angle (0) degrees,   đợi (1) giây
  set servo [S1] to angle (180) degrees, đợi (1) giây
  set servo [S1] to angle (90) degrees,  đợi (1) giây
```

**Các bước:**

1. Mở tệp bằng **Tập tin → Load from your computer**. Dự án đã chọn sẵn bo ThingBot và ngoại vi Serial.
2. Cắm USB, bấm **Connect**, chọn cổng của bo, bấm **Upload**, chờ báo *Your board is ready to go.*
3. Mở khung **Monitor**, chọn tốc độ **115200**. Bật công tắc nguồn pin.
4. Bấm nút **SW**. Mỗi bánh quay 1 giây theo thứ tự M1 → M2 → M3 → M4, Monitor ghi bánh nào đang chạy. Sau đó servo quay về 0°, sang 180° rồi về giữa 90°.
5. Ghi kết quả vào bảng dưới. Bấm SW lần nữa để thử lại.

**Đọc kết quả:**

| Thấy gì | Nghĩa là |
|---|---|
| Còi phát 3 nốt khi vừa nạp xong | Bo và chip PCA9685 chạy tốt |
| LED 1 sáng, bấm SW thì LED 1 tắt, LED 2 sáng | Nút SW và hai LED tốt |
| Monitor không hiện chữ | Chưa chọn đúng cổng hoặc tốc độ 115200 |
| Monitor ghi "M2 chay tien" mà bánh không quay | Chưa bật công tắc, pin yếu, hoặc lỏng giắc M2 |
| Bánh quay nhưng **ngược chiều tiến** | Đảo giắc cắm của động cơ đó, hoặc nhớ dùng `backward` cho bánh đó |
| Servo không quay hoặc rung | Cắm ngược chiều chân, hoặc pin yếu (servo lớn MG996R kéo nhiều điện) |
| Bo khởi động lại, còi phát lại 3 nốt | Pin yếu: sạc pin |

**Phiếu ghi cho từng robot** (điền theo những gì thấy ở bước 4):

| Cổng | Bánh nào (trước trái, trước phải, sau trái, sau phải) | Quay đúng chiều tiến? |
|---|---|---|
| M1 | | |
| M2 | | |
| M3 | | |
| M4 | | |

Các bài mẫu trong khóa giả định **M1 là bánh trái, M2 là bánh phải** và `forward` là tiến. Nếu robot của bạn khác, đổi giắc cho khớp hoặc sửa cổng trong khối.

## Xe 4 bánh mecanum

Bánh mecanum có các con lăn xiên, nhờ đó xe đi ngang được mà không cần quay đầu. Bánh phải lắp **đúng vị trí** như hình ở trang [Về ThingBot](/khoa-hoc/thingedu/thingbot/ve-thingbot) (mục Bộ kit ThingBot 2024), nếu không xe chỉ tiến lùi được.

Dùng phiếu ghi ở trên để biết cổng nào là bánh nào, rồi đặt chiều cho từng bánh theo bảng (**T** = `forward`, **L** = `backward`, cùng một tốc độ):

| Muốn xe | Trước trái | Trước phải | Sau trái | Sau phải |
|---|---|---|---|---|
| Tiến | T | T | T | T |
| Lùi | L | L | L | L |
| Đi ngang sang phải | T | L | L | T |
| Đi ngang sang trái | L | T | T | L |
| Xoay tại chỗ sang phải | T | L | T | L |
| Xoay tại chỗ sang trái | L | T | L | T |

Nếu lệnh "đi ngang" lại làm xe xoay tròn hoặc đứng yên rung, hai bánh đang lắp đổi chỗ cho nhau: kiểm tra lại hướng con lăn. Bài [R4U — Robot cảm nhận](/khoa-hoc/thingedu/thingblock/bai-mau/r4u-robot-cam-nhan) V3 có cách lái bằng tay PS2: thêm hai nút L1, R1 cho đi ngang là một thử thách mở rộng hay.

Gặp lỗi khác: xem [Sửa lỗi thường gặp](/khoa-hoc/thingedu/thingblock/sua-loi).

Tiếp theo: [Khối lệnh cơ bản](/khoa-hoc/thingedu/thingblock/khoi-lenh-co-ban).
