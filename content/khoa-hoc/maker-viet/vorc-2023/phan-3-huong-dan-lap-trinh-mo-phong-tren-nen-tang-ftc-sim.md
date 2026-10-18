---
title: "Phần 3: Hướng dẫn lập trình mô phỏng trên nền tảng FTC Sim"
---

## 3.1. Giới  thiệu chung

A.GIỚI THIỆU CHUNG

FTC Sim là một trang web mô phỏng hoạt động của robot trong cuộc thi FIRST Tech Challenge (FTC) và FIRST Global Challenge (FGC). Trang web này được phát triển bởi pixelpad và được quản lý bởi FIRST Robotics Canada.

![Hướng dẫn truy cập ban đầu](/hoc-lieu/media/92f4287101bd66fe.webp)

Để bắt đầu chúng ta chọn Menu → Courses

FTCSim được chia thành nhiều bài học khác nhau với mức độ từ dễ đến khó.

![Bài học lập trình](/hoc-lieu/media/9b1b2802b0cd1860.webp)

![Bài học lập trình](/hoc-lieu/media/968ad3f818f89667.webp)

Mỗi bài học đều có hướng dẫn tại phần “Guide”, giúp các bạn dễ dàng học và thực hành

Các bạn có thể bắt đầu tại phần "FTC Intro", nói có những bài hướng dẫn ban đầu về lập trình cho robot di chuyển

## 3.2.Các công cụ thao tác trong mô phỏng FTC Sim

1. Camera

![Sử dụng camera trong mô phỏng FTC Sim](/hoc-lieu/media/901326cb5eb41b2b.webp)

Nhấn giữ chuột phải để xoay camera đến nhiều hướng khác nhau

Sử dụng các phím: W A S D để di chuyển tiến lên / lùi xuống / sang trái / sang phải

Sử dụng phím: Q để lên thẳng, E để đi thẳng xuống

Nếu góc camera bị kẹt / khó nhìn, chọn Edit -\> Reset Camera để góc camera quay về ban đầu

2\. Cấu trúc chương trình

Tất cả các câu lệnh của chương trình sẽ nằm bên trong khối Block này 

![runOpMode](/hoc-lieu/media/de0b1f24039319df.webp)

Khi Robot được kết nối, nó sẽ dừng lại và đợi cho đến khi nhận được lệnh Khởi động. Lệnh Bắt đầu sẽ không được gửi cho đến khi người dùng nhấn nút Bắt đầu “RUN”. Bất kỳ mã nào sau khối sẽ được thực thi sau khi nhấn nút Bắt đầu.

!["Run" Block](/hoc-lieu/media/070fd08ccc2177e0.webp)

Khi chương trình được chạy, các khối lệnh sẽ được chạy tuần tự cho đến khi chương trình bị ngừng.

Đây là cấu trúc chương trình hoàn chỉnh:

![Cấu trúc chương trình hoàn chỉnh](/hoc-lieu/media/b547ffd571e5439c.webp)

## 3.3. Hướng dẫn lập trình cơ bản

A. Lập trình cơ bản

1.LinearOpMode

![Block sleep](/hoc-lieu/media/bc5e66fd348cbdb7.webp)

Hàm sleep này dùng để tạm ngưng chương trình trong 1 khoảng thời gian

![](/hoc-lieu/media/9fdb395cc8596c1c.webp)

Kiểm tra opMode có được sử dụng hay không

Trả về giá trị : True/False

![](/hoc-lieu/media/6ead44c77641942b.webp)

Kiểm tra opMode đã được khởi động chưa

Trả về giá trị : True/False

![](/hoc-lieu/media/8d4b20ea86dce484.webp)

Lấy thời gian chương trình chạy theo đơn vị giây

![](/hoc-lieu/media/dca05aef1acfe1a7.webp)

Kiểm tra opMode có được yêu cầu dừng

Trả về giá trị : True/False

2\. Động cơ

![Trả về dữ liệu từ Encoder cho biết vị trí hiện tại của động cơ](/hoc-lieu/media/9af7bb58c9ec9ec0.webp)

Trả về dữ liệu từ Encoder cho biết vị trí hiện tại của động cơ

![Chọn chiều quay của động cơ: REVERSE / FORWARD](/hoc-lieu/media/b09038263d3deb2b.webp)

Chọn chiều quay của động cơ: REVERSE / FORWARD

![Trả về chiều quay hiện tại của động cơ ](/hoc-lieu/media/d7449cd483a8b83a.webp)

Trả về chiều quay hiện tại của động cơ

Hướng dẫn chọn chế độ chạy của động cơ : 

RUN_USING_ENCODER : động cơ được kiểm soát dựa vào gia tốc của nó thay vì công suất đầu vào.  Khi động cơ được đặt ở chế độ RUN_USING_ENCODER, nó sẽ tự động sử dụng bộ mã hóa để giúp động cơ hoạt động ổn định ở bất kỳ tốc độ nào được đặt cho động cơ.

RUN_WITHOUT_ENCODER: động cơ sẽ không sử dụng giá trị mã hóa được cắm vào để thực hiện các tác vụ như điều khiển vị trí hoặc tốc độ của nó.

STOP_AND_RESET_ENCODER: Thao tác này sẽ đặt lại giá trị encoder của động cơ về 0. Điều này sẽ đảm bảo rằng các tích số mã hóa là nhất quán cho mỗi lần chạy và khiến động cơ hoạt động như mong đợi ở mỗi lần chạy.

RUN_TO_POSITION: Nó cho phép động cơ chạy đến một giá trị tích số mục tiêu cụ thể được đặt ra, và động cơ sẽ di chuyển đến vị trí đó và giữ nguyên. Nó sử dụng Vòng điều khiển PID tích hợp để thực hiện điều này.

![](/hoc-lieu/media/160be3895dee5cfb.webp)

Đặt điện áp đầu vào cho động cơ từ -1 → 1

![](/hoc-lieu/media/b9816f2cade5586f.webp)

Trả về giá trị điện áp đầu vào của động cơ

![](/hoc-lieu/media/2e66004f0c4f5893.webp)

Đặt vị trí động cơ dựa vào dữ liệu từ Encoder

![](/hoc-lieu/media/b1880d680aca9966.webp)

Trả về vị trí mà động cơ đã được đặt

![](/hoc-lieu/media/6a5d8f9600fd65ee.webp)

Khi điện áp đầu vào bằng 0, khi để ZeroPowerBehavior: BRAKE động cơ sẽ tự động phanh ; nếu để FLOAT: động cơ sẽ tự chạy chậm dần và dừng hẳn

3\. Cảm biến IMU

![](/hoc-lieu/media/d4acdc99b69ee6dd.webp)

Trả về hướng tuyệt đối của cảm biến dưới dạng tập hợp ba góc với các tham số được chỉ định.

![](/hoc-lieu/media/275e035fef424a1c.webp)

Trả về góc nghiêng dưới dạng ĐỘ, hoặc RADIAN

![](/hoc-lieu/media/a8628c09bab8c505.webp)

Trả về gia tốc với đơn vị m/s^2

4\. Cảm biến màu

![](/hoc-lieu/media/782854a1a09fc5bb.webp)

Cảm biến màu trả về ba giá trị RGB ( RED, GREEN, BLUE)

5. Cảm biến khoảng cách

![](/hoc-lieu/media/a5721ed718141d24.webp)

Trả về khoảng cách với đơn vị là: MM, CM, M, INCH
