---
title: "Bản 0.8: có gì mới"
description: "ThingBlock 0.8 (bản thử 12/11/2026): Camera AI chơi bằng tay và đầu không cần mạch, 11 trò chơi, mạch CoBot dò đường, cảm biến màu I2C, 19 bài học, 52 ví dụ, Từ điển điện tử, bài 6 và 10 ThingBot Sim viết lại"
nguon: "ThingEdu"
---

ThingBlock 0.8 là bản thử tiếp theo của [bản 0.6](/khoa-hoc/thingedu/thingblock/ban-0-6). Có ba thứ mới to: **Camera AI** (máy tính nhìn thấy bàn tay và đầu của em qua webcam, không cần mạch), **mạch CoBot** (robot dò đường của Làng Maker) và **cảm biến màu**. Bài học và ví dụ cũng được viết lại cho người mới, mỗi bài mở bằng một việc ngoài đời.

| | Bản thử 0.8.0 | Bản ổn định 0.5.0 |
|---|---|---|
| Ngày | 12/11/2026 (*preview*, bản thử đang lấy góp ý) | 30/10/2026 |
| Tải về | [Trang phát hành ThingEdu/thingblock-desktop](https://github.com/ThingEdu/thingblock-desktop/releases), chọn bản `0.8.0-preview-20261112` | [v0.5.0](https://github.com/ThingEdu/thingblock-desktop/releases/tag/v0.5.0) |
| Camera AI, CoBot, cảm biến màu | Có | Không |
| Mô phỏng, bài học, ví dụ trong app | Có (19 bài học, 52 ví dụ) | Không |

Bản 0.8 có **mọi thứ của bản 0.6** (mô phỏng ThingBot trong app, bài học tự chấm, ví dụ có sẵn, chế độ Live lùi được, điều khiển từ điện thoại, lưu tệp tiếng Việt) cộng thêm những điều dưới đây. Bản 0.8 mở được mọi tệp `.tb` của bản cũ. Cách cài xem [Cài đặt ThingBlock](/khoa-hoc/thingedu/thingblock/cai-dat): bản cài **chưa ký số**, máy sẽ cảnh báo một lần khi mở.

## 1. Camera AI: chơi bằng tay và đầu, không cần mạch

Em bật webcam, giơ tay lên: ThingBlock vẽ **21 chấm** lên bàn tay em (cổ tay, các khớp ngón, năm đầu ngón). Đó là AI nhìn tay. Nó cũng nhìn được **đầu và vai** của em: đầu đang ở đâu, nghiêng sang bên nào, có gật không, hai tay có vỗ xuống không. Không cần robot, không cần mạch.

**AI** ở đây là một chương trình đã học từ rất nhiều ảnh, nên nó *đoán* được bàn tay ở đâu trong hình. Có lúc nó đoán sai: tay bị khuất, phòng tối, hai tay chồng lên nhau. Khi đó các chấm nhảy lung tung. Đó là điều bình thường của AI.

**Nhóm khối Camera AI** nằm trong thư viện khối mở rộng (nút góc dưới trái) khi em **chưa chọn mạch**. Khối chia ba phần:

- **Tay**: `bật camera [soi gương]`, `khi [tay bất kỳ] làm cử chỉ [nắm tay]`, `x của [ngón trỏ] [tay bất kỳ]`, `cử chỉ của [tay]`, `số bàn tay`, `khi hai tay vỗ xuống`. Cử chỉ máy nhận được: **nắm tay, xoè tay, ngón cái lên, ngón cái xuống, chữ V, chỉ lên, I love you**. Điểm trên tay chọn được: ngón trỏ, ngón cái, ngón giữa, cổ tay, lòng bàn tay.
- **Đầu và thân**: `x của đầu`, `y của đầu`, `góc nghiêng đầu`, `khi nghiêng đầu sang [trái]`, `khi gật đầu`, `thấy đầu?`, `[vật] chạm đầu?`. Lần đầu dùng khối đầu, app nạp thêm mô hình nhìn người (33 điểm trên cơ thể), chờ vài giây.
- **Sân chơi**: `tạo [ngôi sao] tên [sao] tại x: y: cỡ`, `đưa [sao] tới x: y:`, `cho [bóng] tốc độ x: y:`, `đặt trọng lực`, `[bóng] chạm [ngón trỏ] [tay bất kỳ]?`, `[bóng] chạm mép [dưới]?`, `khi [bóng] chạm [đầu]`, `nói [chữ]`, `cộng [1] điểm cho người chơi [1]`, `đếm ngược [30] giây`, `khi hết giờ`, `[hiện] bảng điểm`.

**Khung Sân chơi** mở bên phải vùng lập trình, thay cho khung Mô phỏng. Nó hiện hình webcam, các vật em tạo ra (bóng, con dế, giọt mưa, rổ, ngôi sao, bom, cây tre có khe, robot Tre), điểm của hai người chơi và đồng hồ đếm ngược. Vật biết **rơi** (nếu em đặt trọng lực), **nảy** ở mép và **chạm nhau**. Sân chơi là một tấm bản đồ: x từ −240 (trái) tới 240 (phải), y từ −180 (dưới) tới 180 (trên). Trên khung có nút **Camera / Tắt**, **Gương** (lật hình như soi gương), **Chọn camera** và **Xoá** (xoá mọi vật, điểm, đồng hồ).

**Không có webcam vẫn chơi được.** Trong ô **Chọn camera**, chọn **Chuột (không cần webcam)**:

- Ngón trỏ đi theo con chuột. Ở trò dùng đầu thì *đầu* đi theo chuột.
- **Giữ chuột trái** là nắm tay. **Chuột phải** hoặc phím **1–7** đổi sang cử chỉ khác.
- **Giữ phím ← hoặc →**: nghiêng đầu dần. **↑**: đầu thẳng lại. **↓**: gật đầu. **Phím cách**: vỗ hai tay.

Không có webcam nhưng có điện thoại? iPhone với máy Mac thì bật *Continuity Camera*; Android hoặc Windows thì cài một app biến điện thoại thành webcam (DroidCam, Iriun), rồi chọn camera đó trong ô Chọn camera.

> **Quyền riêng tư.** Hình ảnh từ camera **chỉ được xử lý ngay trên máy của em**, không gửi lên mạng, không lưu lại. Mô hình AI nằm sẵn trong bản cài. Lần đầu dùng, máy hỏi quyền camera: chọn **Cho phép**. Thầy cô và phụ huynh có thể tắt camera bất cứ lúc nào bằng nút **Tắt** trên khung Sân chơi.

## 2. Mười một trò Camera AI

**Tập tin → Ví dụ… → Camera AI (không cần mạch)** có 11 trò, mở ra là chơi được ngay. Mức 1 là dễ nhất.

| # | Trò | Mức | Em chơi thế nào |
|---|---|---|---|
| 1 | Tay em trên sân chơi | 1 | Ngôi sao đi theo ngón trỏ; sân chơi gọi tên cử chỉ em làm |
| 2 | Bắt Dế | 1 | Quả bóng theo ngón trỏ; chạm con dế để ghi điểm trong 30 giây |
| 3 | Hứng Mưa | 2 | Rổ theo lòng bàn tay; hứng giọt mưa +1, để rơi xuống đáy −1 |
| 4 | Đỡ Bóng | 2 | Bóng rơi theo trọng lực; đưa lòng bàn tay vào bóng để đỡ nó bay lên |
| 5 | Hái sao né bom | 2 | Lướt ngón trỏ qua ngôi sao +1, chạm bom −3; bom đổi chỗ mỗi 2 giây |
| 6 | Oẳn tù tì | 3 | Đếm 3-2-1 rồi ra búa, bao hoặc kéo; máy chọn ngẫu nhiên, có bảng điểm |
| 7 | Phản xạ cử chỉ | 3 | Sân chơi gọi một cử chỉ; làm đúng thật nhanh để ghi điểm |
| 8 | Dế Xanh bay | 3 | **Thể dục tay–vai**: vỗ hai tay xuống để Dế Xanh bay lên, lách qua khe giữa hai cây tre |
| 9 | Thể dục cổ: nghiêng đầu hứng sao | 2 | **Thể dục cổ**: nghiêng đầu chậm sang trái, phải để robot Tre chạy tới hứng sao rơi |
| 10 | Gật đầu đếm nhịp | 1 | **Thể dục cổ**: gật đầu chậm 10 lần, sân chơi đếm giúp em |
| 11 | Ngồi xuống né bóng | 2 | **Thể dục chân**: bóng bay ngang tầm đầu, em ngồi xuống chậm để né rồi đứng lên |

Bốn trò cuối (8, 9, 10, 11) là **trò tập thể dục**. Trước khi chơi:

- Đứng lùi để camera thấy cả **đầu và vai**, dọn chỗ trống quanh em.
- Làm **chậm**, nhất là vài lần đầu. Nghiêng đầu, gật đầu nhẹ nhàng, đừng giật.
- Thấy **chóng mặt, mỏi hay đau cổ** thì dừng lại, ngồi nghỉ. Trò chơi không quan trọng bằng cái cổ của em.
- Người lớn ở cạnh khi trẻ nhỏ chơi trò ngồi xuống đứng lên.

Muốn tự làm trò của mình, học bốn bài **Camera AI 1–4** ở menu Bài học (mục 5).

## 3. Mạch CoBot: robot dò đường của Làng Maker

Hộp **Chọn mạch** có thêm **CoBot**, bên cạnh ThingBot và VIA Bánh Mì. CoBot là robot dò đường (đi theo vạch đen dán trên sàn) do ThingEdu và Maker Việt làm, chip ESP32-C3 như ThingBot. Trên xe có:

- **Hai động cơ**: bánh trái, bánh phải.
- **Bốn mắt dò line** dưới gầm, đánh số 1 (trái) tới 4 (phải). Mỗi mắt là một đèn hồng ngoại và một "con ngươi" đo ánh sáng hắt về, như em rọi đèn pin xuống sàn trong phòng tối: nền sáng hắt lại nhiều, vạch đen hắt lại ít. Mắt trả về số từ **0 tới 4095**.
- **Cảm biến màu** nối cổng I2C, có sẵn trên xe (xem mục 4).
- **Đèn hồng ngoại** của mắt và **đèn trắng** chiếu sáng dưới gầm cho cảm biến màu.

Khối CoBot gọn, động từ đứng trước: `khởi động CoBot`, `CoBot [tiến] tốc độ (50) %` (tiến, lùi, rẽ trái, rẽ phải, xoay trái, xoay phải), `dừng CoBot`, `động cơ [trái] tốc độ (50) %` (−100 tới 100, số âm là lùi), `bánh phải nhanh hơn bánh trái (10) %` (chỉnh khi xe đi thẳng mà lệch), `đọc mắt [1]`, `mắt [1] thấy vạch?`, `mắt thấy vạch khi số đọc [≤] (ngưỡng)`, `mẫu 4 mắt` (bốn chữ số như `0110`: hai mắt giữa thấy vạch), `mẫu 4 mắt là [0110]?`, `[bật] đèn hồng ngoại của mắt`, `[bật] đèn trắng`.

**Năm ví dụ CoBot** ở Tập tin → Ví dụ… → CoBot: *Xe giao hàng chạy thử* (tiến, lùi, rẽ, xoay rồi dừng), *Bốn mắt nhìn sàn* (in số bốn mắt lên Monitor để tìm ngưỡng), *Dò line: xe theo vạch*, *Xe buýt dừng ở trạm đỏ* (cảm biến màu thấy ô đỏ thì dừng 3 giây), *Tìm đường trong mê cung vạch* (gặp ngã rẽ trái thì rẽ trái, ngõ cụt thì quay đầu).

Khung **Mã Arduino** của CoBot có **chú thích tiếng Việt** từng đoạn: chân nào nối gì, số đọc 0–4095 nghĩa là gì, xe đoán màu theo quy tắc nào. Em đọc được mã mình vừa ghép.

**CoBot chưa có mô phỏng**: khung bên phải báo *CoBot chưa có mô phỏng. Nạp chương trình xuống mạch để chạy thử.* Cắm USB, bấm Nạp như với ThingBot. CoBot cũng chưa có chế độ Live. Chi tiết chân cắm và cách chỉnh ngưỡng ở trang [Mạch CoBot](/khoa-hoc/thingedu/thingblock/cobot).

## 4. Cảm biến màu (I2C)

Thẻ **Colour Sensor (I2C)** trong thư viện ngoại vi, dùng được trên **mọi mạch** (ThingBot cắm vào cổng I2C; CoBot có sẵn). Cảm biến có ba "con ngươi" đỏ, xanh lá, xanh dương, giống ba loại tế bào nhìn màu trong mắt người.

- `khởi động cảm biến màu`
- `cảm biến màu đọc [đỏ]`: đỏ, xanh lá, xanh dương hoặc độ sáng, trả về số.
- `cảm biến màu thấy màu [đỏ]?`: đen, đỏ, xanh lá, xanh dương, vàng, trắng.
- `tên màu cảm biến thấy`: trả về tên màu để in lên OLED hay Monitor.

Mắt hồng ngoại chỉ thấy *sáng hay tối*; bóng đỏ và bóng vàng cho số gần nhau. Muốn phân biệt màu thì cần cảm biến này. Khối và cách cắm ở [Khối lệnh mở rộng](/khoa-hoc/thingedu/thingblock/khoi-lenh-mo-rong#cảm-biến-màu-i2c-từ-bản-08).

## 5. Mười chín bài học

Menu **Bài học** có 19 bài (bản 0.6 có 14). Mỗi bài dẫn từng bước, em xếp khối, bấm Chạy, app chấm rồi báo *Giỏi lắm!* hay gợi ý. Mười sáu bài được **viết lại cho người mới**: mở bằng một việc ngoài đời (soi trứng ở trại gà, nồi cơm điện, nút chuông cửa), có câu **Đoán trước** để em đoán rồi mới thử, và bước **Hiểu sâu** giải thích vì sao. Bài học cần **ThingBlock Link** đang chạy (bản cài tự mở sẵn).

| Nhóm | Bài | Phút |
|---|---|---|
| Làm quen | ThingBot Sim 1: Làm quen ThingBot · **Từ điển điện tử cho người mới** | 15 · 20 |
| Đầu ra: đèn và còi | Bật tắt đèn · Đèn nhấp nháy · Màn hình OLED chào em · ThingBot Sim 2: Đèn nhấp nháy | 12–18 |
| Động cơ và servo | Servo ba cách quay · ThingBot Sim 5: Servo quét · ThingBot Sim 7: Động cơ DC · ThingBot Sim 8: Xe đi thẳng và rẽ | 15–20 |
| Đầu vào và màn OLED | ThingBot Sim 3: Nút bấm điều khiển đèn · ThingBot Sim 4: Màn hình OLED · **ThingBot Sim 6: Mắt hồng ngoại** · ThingBot Sim 9: Tay cầm điều khiển · **ThingBot Sim 10: Dây chuyền phân loại trứng** | 20–25 |
| Camera AI (không cần mạch) | **Camera AI 1: Tay em trên màn hình** · **Camera AI 2: Trò Bắt Dế** · **Camera AI 3: Đầu em điều khiển trò chơi** · **Camera AI 4: Dế Xanh vỗ cánh** | 15–20 |

Bài in đậm là bài mới hoặc viết lại hẳn ở bản 0.8:

- **Từ điển điện tử cho người mới** (không chấm điểm): chip, điện, chân IO, đầu vào và đầu ra, bật/tắt và mức, độ sáng bằng cách chớp thật nhanh, mạch công suất, I2C, servo, ngưỡng, Sân chơi… mỗi từ so với một đồ vật quen (nồi cơm điện, bồn nước, dây thần kinh, núm vặn âm lượng). Quên từ nào thì mở lại bài này để tra.
- **ThingBot Sim 6: Mắt hồng ngoại** thay cho bài *Cảm biến khoảng cách* của bản 0.6. Em cắm một mắt hồng ngoại (cùng loại với mắt dưới gầm CoBot) vào cổng cảm biến IO4 và làm **đèn báo bóng tối màu** cho sân FanRoc. Mạch ảo có thanh **Bóng**: không có bóng, trắng, vàng, đỏ, xanh dương, đen. Bóng trắng cho số khoảng 3500, bóng đen khoảng 300; em tự chọn **ngưỡng** nằm giữa hai nhóm.
- **ThingBot Sim 10: Dây chuyền phân loại trứng** thay cho bài *Xe tránh vật cản*. Động cơ M1 kéo **băng chuyền trứng**, mắt hồng ngoại IO4 soi từng quả, servo S1 gạt quả hỏng vào *Thùng loại*, quả tốt đi tiếp. Mạch ảo đếm *gạt đúng bao nhiêu trứng hỏng, cho qua bao nhiêu trứng tốt, nhầm bao nhiêu*. Bước Hiểu sâu: đặt khối đợi 1 giây thì trứng hỏng lọt qua, vì não đứng chờ trong lúc trứng chạy qua mắt.
- **Camera AI 1–4**: bật camera và thấy 21 chấm trên tay, ngôi sao theo ngón trỏ, gọi tên cử chỉ; trò Bắt Dế có điểm và đồng hồ; đầu em điều khiển trò chơi (bài tập cổ); Dế Xanh vỗ cánh (bài tập tay–vai, có trọng lực).

Bài học cũng sửa ba chỗ nói sai của bản trước: khối `OLED in` mặc định *xuống dòng* khi hết dòng; khối `khởi động ThingBot` không bắt buộc; cổng I2C trên ThingBotShield cấp 5 V.

Hai bài *Cảm biến khoảng cách* và *Xe tránh vật cản* của bản 0.6 **không còn trong app 0.8** (cả bài học lẫn ví dụ). Em vẫn làm được chúng trên [ThingBot Sim web](/mo-phong?bai=6), và tệp `.tb` vẫn tải được ở trang [Cảm biến khoảng cách](/khoa-hoc/thingedu/thingblock/vi-du/sim-06-cam-bien-khoang-cach) và [Xe tránh vật cản](/khoa-hoc/thingedu/thingblock/vi-du/sim-10-xe-tranh-vat-can).

## 6. Năm mươi hai ví dụ

**Tập tin → Ví dụ…** nay có **52** ví dụ, sáu nhóm:

| Nhóm | Số | Có từ |
|---|---|---|
| Mô phỏng ThingBot Sim | 10 | 0.6 |
| K12 cơ bản | 18 | 0.6 |
| FanRoc | 2 | 0.6 |
| Âm nhạc | 6 | 0.6 |
| **CoBot** | **5** | **0.8** |
| **Camera AI (không cần mạch)** | **11** | **0.8** |

Cả 52 ví dụ được viết lại ghi chú cho người mới: **tên biến tiếng Việt**, và mỗi con số "lạ" trong chương trình (vì sao 1500, vì sao 0,05 giây) có chú thích đính kèm khối. Hai ví dụ *Mắt hồng ngoại* và *Dây chuyền phân loại trứng* thay cho *Cảm biến khoảng cách* và *Xe tránh vật cản* trong nhóm Mô phỏng. Trang hướng dẫn từng ví dụ ở [Ví dụ có sẵn](/khoa-hoc/thingedu/thingblock/vi-du).

## 7. Sửa lỗi

- Đóng ThingBlock **không còn để trình biên dịch Arduino chạy ngầm** trong máy.
- Editor nối với **ThingBlock Link** theo cách mới (Link là chương trình nhỏ chạy cùng app, lo việc biên dịch, nạp và chấm bài học).
- macOS **hỏi quyền camera đúng cách**, nên Camera AI mở được webcam trong ứng dụng.
- Nhãn khối CoBot và cảm biến màu gọn hơn; mã Arduino sinh ra có chú thích tiếng Việt.

## 8. Cần biết

- **Camera AI** nằm trong thư viện khối mở rộng khi **chưa chọn mạch**. Mở một ví dụ Camera AI là dùng được ngay, không phải thêm gì.
- Lần đầu dùng camera, máy hỏi quyền: chọn **Cho phép**. Lỡ chọn *Không* thì vào cài đặt hệ thống (macOS: *Quyền riêng tư & Bảo mật → Camera*; Windows: *Privacy → Camera*) bật cho ThingBlock, rồi mở lại app. Cách xử lý khi camera không lên ở [Sửa lỗi thường gặp](/khoa-hoc/thingedu/thingblock/sua-loi#camera-ai).
- **CoBot chưa có mô phỏng**: nạp chương trình xuống robot để chạy. Xe đi **lệch vạch** thì đổi khối `mắt thấy vạch khi số đọc` giữa **≤** và **≥**, hoặc đo lại ngưỡng bằng ví dụ *Bốn mắt nhìn sàn*.
- **Bản cài chưa được ký số**: Windows SmartScreen và macOS Gatekeeper sẽ cảnh báo. Trên macOS, **nhấp chuột phải vào ThingBlock rồi chọn Mở**. Trên Windows, bấm **More info → Run anyway**. Chỉ làm một lần.
- Bản thử có thể đổi tên nút, nhãn khối trước bản chính thức.

## Góp ý cho bản thử

Camera không lên, một trò chơi không nhận cử chỉ, CoBot đi sai, hay một ví dụ không nạp được: báo cho đội ThingEdu kèm tên tệp cài (`ThingBlock_0.8.0-preview-20261112…`), hệ điều hành, loại webcam và ảnh chụp chương trình. Lỗi về Live, điện thoại, tệp xem thêm ở [Bản 0.6: có gì mới](/khoa-hoc/thingedu/thingblock/ban-0-6).

*Nguồn: ghi chú phát hành ThingBlock 0.8.0-preview-20261112 trên GitHub ThingEdu/thingblock-desktop; nhãn khối, bài học và danh mục ví dụ trong mã nguồn ThingEdu/thingblock-editor (nhánh phát hành 0.8, 12/11/2026). Ý tưởng các trò Bắt Dế, Hứng Mưa, Đỡ Bóng từ NeoAiSport (ThingEdu); trò Hái sao né bom từ Dancing with AI (MIT RAISE); khối CoBot theo mẫu Arduino mở makerviet/cobot-arduino.*
