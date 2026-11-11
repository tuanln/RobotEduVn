---
title: "Camera AI"
description: "Nhóm khối Camera AI của ThingBlock 0.8: webcam nhìn bàn tay, cử chỉ, đầu và vai; khung Sân chơi; chơi bằng chuột khi không có webcam; 11 trò chơi và 4 bài học; quyền riêng tư và an toàn"
nguon: "ThingEdu"
---

Camera AI *(từ bản 0.8)* cho máy tính **nhìn thấy em** qua webcam: bàn tay ở đâu, đang làm cử chỉ gì, đầu nghiêng bên nào. Em dùng những điều đó để chơi và để làm trò chơi của mình. **Không cần mạch**, không cần robot.

## Mở Camera AI

1. Mở ThingBlock, **không chọn mạch** (hộp Chọn mạch để *Không dùng mạch*, hoặc mở dự án mới).
2. Bấm nút góc dưới trái (**Thêm phần mở rộng**), chọn thẻ **Camera AI**.
3. Cột danh mục có thêm nhóm **Camera AI**; bên phải mở khung **Sân chơi**.

Nhanh hơn: **Tập tin → Ví dụ… → Camera AI (không cần mạch)**, mở một trò là có sẵn tất cả.

## Khung Sân chơi

Sân chơi hiện hình webcam và mọi thứ chương trình vẽ lên. Nút trên khung:

- **Camera / Tắt**: bật, tắt webcam. Khối `bật camera` cũng bật được.
- **Gương**: lật hình như soi gương. Em giơ tay phải, hình cũng giơ tay bên phải. Nên bật khi chơi.
- **Chọn camera**: *Camera mặc định*, camera khác nếu máy có, hoặc **Chuột (không cần webcam)**.
- **Xoá**: xoá mọi vật, điểm và đồng hồ đếm ngược.
- Góc khung hiện số **hình/giây**. Máy yếu thì số nhỏ, trò chơi giật; đóng bớt chương trình khác.

Sân chơi là một tấm bản đồ: **x** từ −240 (mép trái) tới 240 (mép phải), **y** từ −180 (mép dưới) tới 180 (mép trên). Giữa sân là x: 0, y: 0.

## Chơi bằng chuột khi không có webcam

Chọn **Chuột (không cần webcam)** trong ô Chọn camera. Máy sẽ vẽ một bàn tay giả đi theo con chuột, nên mọi trò đều chơi được:

| Em muốn | Làm trên bàn phím, chuột |
|---|---|
| Đưa ngón trỏ (hoặc đầu, ở trò dùng đầu) | Di chuột trên sân chơi |
| Nắm tay | Giữ chuột trái |
| Đổi cử chỉ (xoè tay, chữ V…) | Bấm chuột phải, hoặc phím **1–7** |
| Nghiêng đầu sang trái, phải | Giữ phím **←** hoặc **→** (đầu nghiêng dần) |
| Đầu thẳng lại | Phím **↑** |
| Gật đầu | Phím **↓** |
| Vỗ hai tay xuống | **Phím cách** (để con trỏ trên sân chơi) |

Có điện thoại thì cũng làm được webcam: iPhone với máy Mac bật *Continuity Camera*; Android hoặc Windows cài app DroidCam hay Iriun, rồi chọn camera đó trong ô Chọn camera.

## Khối Camera AI

**Tay.** AI tìm **21 điểm mốc** trên mỗi bàn tay: cổ tay, các khớp ngón và năm đầu ngón. Từ 21 điểm đó nó đoán **cử chỉ**.

| Khối | Ý nghĩa |
|---|---|
| `bật camera [soi gương]` / `tắt camera` / `dùng camera [camera mặc định]` | Bật, tắt, chọn camera (chọn *chuột* ở đây cũng được) |
| `khi camera sẵn sàng` | Khối mũ: webcam đã bật và mô hình đã nạp xong |
| `khi [tay bất kỳ] làm cử chỉ [nắm tay]` | Khối mũ: chạy mỗi lần tay *vừa đổi* sang cử chỉ đó |
| `[tay bất kỳ] đang làm cử chỉ [xoè tay]?` · `cử chỉ của [tay 1]` | Hỏi cử chỉ. Cử chỉ: nắm tay, xoè tay, ngón cái lên, ngón cái xuống, chữ V, chỉ lên, I love you |
| `x của [ngón trỏ] [tay bất kỳ]` · `y của …` | Vị trí một điểm trên tay: ngón trỏ, ngón cái, ngón giữa, cổ tay, lòng bàn tay |
| `số bàn tay` | Máy đang thấy mấy bàn tay |
| `khi hai tay vỗ xuống` | Khối mũ: hai tay cùng hạ xuống nhanh, như chim vỗ cánh |

Tay chọn được: *tay bất kỳ*, *tay 1*, *tay 2*, *tay trái*, *tay phải*. Hai người chơi thì mỗi người một tay.

**Đầu và thân.** Dùng một AI khác tìm **33 điểm** trên người (mũi, mắt, tai, vai, khuỷu tay, hông, đầu gối…). Lần đầu dùng phải nạp thêm mô hình, chờ vài giây.

| Khối | Ý nghĩa |
|---|---|
| `x của đầu` · `y của đầu` | Vị trí đầu (điểm mũi) |
| `góc nghiêng đầu` | Độ; số âm là nghiêng sang trái |
| `đầu nghiêng [trái]?` · `khi nghiêng đầu sang [phải]` | Hỏi, hoặc khối mũ khi đầu bắt đầu nghiêng |
| `khi gật đầu` | Khối mũ: đầu cúi xuống rồi ngẩng lên |
| `thấy đầu?` · `[sao] chạm đầu?` | Máy có thấy đầu không; vật có đang ở trên đầu không |

**Sân chơi.** Vật là hình có sẵn: bóng, dế, giọt mưa, rổ, ngôi sao, bom, cây tre có khe, robot Tre. Mỗi vật có **tên** em đặt (viết không dấu cho dễ gõ).

| Khối | Ý nghĩa |
|---|---|
| `tạo [ngôi sao] tên [sao] tại x: (0) y: (0) cỡ (50)` | Tạo vật |
| `đưa [sao] tới x: () y: ()` | Đưa vật tới chỗ mới. Muốn vật *bám theo tay* thì đặt trong `liên tục` |
| `cho [bong] tốc độ x: () y: ()` · `đặt trọng lực (300)` | Vật tự bay; trọng lực kéo vật rơi, 0 là tắt trọng lực. Vật nảy ở mép, không rơi khỏi sân |
| `xoá [sao]` · `xoá mọi vật` · `x của [sao]` · `y của [sao]` | Xoá, hỏi vị trí |
| `[bong] chạm [ngón trỏ] [tay bất kỳ]?` · `[bong] chạm vật [de]?` · `[bong] chạm mép [dưới]?` | Hỏi va chạm |
| `khi [bong] chạm [đầu]` | Khối mũ va chạm: ngón trỏ, lòng bàn tay, cổ tay, đầu hoặc một mép |
| `nói [Giỏi lắm]` | Hiện một dòng chữ trên sân chơi |
| `cộng (1) điểm cho người chơi [1]` · `đặt điểm người chơi [1] bằng (0)` · `điểm người chơi [1]` · `[hiện] bảng điểm` | Điểm hai người chơi |
| `đếm ngược (30) giây` · `giây còn lại` · `khi hết giờ` | Đồng hồ đếm ngược |

Khối Camera AI dùng khối bắt đầu `Khi bấm vào` lá cờ xanh và `liên tục` như Scratch, chạy ngay trên máy tính. Không có khối `vòng lặp Arduino` ở đây.

## 11 trò và 4 bài học

Mười một trò trong **Tập tin → Ví dụ… → Camera AI** liệt kê ở [Bản 0.8: có gì mới](/khoa-hoc/thingedu/thingblock/ban-0-8#2-mười-một-trò-camera-ai). Bốn trò cuối là trò tập thể dục (vỗ tay, nghiêng đầu, gật đầu, ngồi xuống đứng lên).

Muốn tự làm trò, học bốn bài ở menu **Bài học → Camera AI (không cần mạch)**:

1. **Tay em trên màn hình** (15 phút): bật camera, thấy 21 chấm, ngôi sao đi theo ngón trỏ, gọi tên cử chỉ.
2. **Trò Bắt Dế** (20 phút): bóng theo ngón trỏ, chạm dế ghi điểm, đồng hồ 30 giây. Học `nếu … thì` và điểm.
3. **Đầu em điều khiển trò chơi** (20 phút): ngôi sao trên đầu, nghiêng đầu gọi tên. Cũng là bài tập cổ.
4. **Dế Xanh vỗ cánh** (15 phút): trọng lực, vỗ hai tay cho dế bay. Bài tập tay và vai.

## An toàn và quyền riêng tư

- **Hình ảnh chỉ xử lý trên máy em.** Không gửi lên mạng, không lưu lại. Mô hình AI nằm sẵn trong bản cài, mất mạng vẫn chạy.
- Lần đầu, máy hỏi quyền camera: chọn **Cho phép**. Chơi xong bấm **Tắt**.
- Trò thể dục: đứng lùi để camera thấy **cả đầu và vai**, dọn chỗ trống, làm **chậm**. Chóng mặt, mỏi, đau cổ thì **dừng** và ngồi nghỉ. Trẻ nhỏ chơi trò ngồi xuống đứng lên nên có người lớn ở cạnh.
- Phòng tối, ngược sáng, tay bị khuất thì AI đoán sai: bật đèn, ngồi quay mặt về phía cửa sổ.

Camera không lên: xem [Sửa lỗi thường gặp](/khoa-hoc/thingedu/thingblock/sua-loi#camera-ai).

*Nguồn: nhãn khối, khung Sân chơi và bài học Camera AI trong mã nguồn ThingEdu/thingblock-editor bản 0.8 (12/11/2026). Ý tưởng các trò Bắt Dế, Hứng Mưa, Đỡ Bóng từ NeoAiSport (ThingEdu).*
