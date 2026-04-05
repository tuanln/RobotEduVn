# Phase 2: Hồ Sơ Học Sinh, Theo Dõi Tiến Trình & RFID

> **Dự án:** RobotEduVn (robot.edu.vn)
> **Ngày:** 2026-04-05
> **Trạng thái:** Thiết kế — chờ triển khai
> **Phụ thuộc:** Phase 1 MVP (đã hoàn thành)

---

## 1. Tổng Quan

### 1.1 Mục Tiêu

Xây dựng hệ thống quản lý hồ sơ học sinh với:
- **Dual ID:** Mỗi học sinh có 1 ID giấy (in trên thẻ) + 1 ID điện tử (RFID MIFARE)
- **Điểm danh tự động:** Quẹt thẻ RFID RC522 tại NEO One → ghi nhận giờ đến/về
- **Theo dõi tiến trình:** Tự động ghi nhận bài học đang làm trên NEO_CODE/NeoClaw → đồng bộ lên web
- **4 vai trò:** Admin, Giáo viên, Học sinh, Phụ huynh
- **Dashboard:** Mỗi vai trò thấy thông tin phù hợp

### 1.2 Quyết Định Kỹ Thuật

| Quyết Định | Lựa Chọn | Lý Do |
|-----------|---------|-------|
| Database | **Firebase Firestore** | Realtime sync, Google ecosystem, free tier lớn |
| Auth | **Firebase Auth** | Tích hợp sẵn với Firestore, hỗ trợ email/password |
| RFID | **RC522 (MIFARE 13.56MHz)** | Rẻ ($2/module, $0.3/thẻ), phổ biến giáo dục |
| RFID reader | **Python trên NEO One** | Firebase Python SDK, SPI kết nối RC522 |
| Domain | **robot.edu.vn** | Tài khoản chính cho toàn bộ hệ thống |

### 1.3 Kiến Trúc Tổng Thể

```
┌─────────────────────────────────────────────────────────────┐
│                    robot.edu.vn (Next.js)                     │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ Dashboard │ │ Profiles │ │ Progress │ │ Attendance   │   │
│  │ (4 roles)│ │ (CRUD)   │ │ (charts) │ │ (RFID logs)  │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘   │
│       └─────────────┴───────────┴───────────────┘           │
│                             │                                │
│                    Firebase Auth + Firestore                 │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   Firestore DB    │
                    │                   │
                    │  students         │
                    │  attendance       │
                    │  progress         │
                    │  users            │
                    └─────────┬─────────┘
                              │ Realtime Sync
              ┌───────────────┼───────────────┐
              │               │               │
     ┌────────┴───────┐ ┌────┴────┐ ┌────────┴───────┐
     │  NEO One #1    │ │ NEO #2  │ │  NEO One #N    │
     │                │ │         │ │                │
     │  rfid_agent.py │ │  ...    │ │  rfid_agent.py │
     │  ┌──────────┐  │ │         │ │                │
     │  │ RC522    │  │ │         │ │                │
     │  │ (SPI)    │  │ │         │ │                │
     │  └──────────┘  │ │         │ │                │
     │                │ │         │ │                │
     │  NEO_CODE /    │ │         │ │                │
     │  NeoClaw       │ │         │ │                │
     │  (progress     │ │         │ │                │
     │   reporter)    │ │         │ │                │
     └────────────────┘ └─────────┘ └────────────────┘
```

---

## 2. Data Model (Firestore Collections)

### 2.1 `students` — Hồ Sơ Học Sinh

```
students/{studentId}
│
├── paperId: string          // "STU-2026-0001" — ID giấy, in trên thẻ vật lý
├── rfidUid: string          // "A3:B2:C1:D0" — UID từ thẻ MIFARE RC522
│
├── fullName: string         // "Nguyễn Văn An"
├── nickname: string         // "An" — hiển thị trên app/NEO One
├── dateOfBirth: string      // "2016-05-12"
├── gender: string           // "male" | "female" | "other"
├── grade: number            // 4 (lớp hiện tại)
├── school: string           // "TH Lê Văn Tám"
│
├── parentPhone: string      // "0901234567"
├── parentEmail: string      // "phuhuynh@gmail.com"
├── parentName: string       // "Nguyễn Văn Bình"
│
├── avatarUrl: string        // URL ảnh đại diện
├── currentStage: string     // "kham-pha" | "tu-duy" | "lap-trinh" | "iot-robot" | "chia-se"
├── totalStars: number       // Tổng sao tích lũy
├── badges: string[]         // ["first-login", "explorer-5", ...]
├── streak: number           // Số ngày liên tiếp tham gia
├── lastActiveAt: Timestamp  // Lần hoạt động cuối
│
├── makerHubId: string       // "hub-hcm-01" — Maker Hub đăng ký
├── mentorId: string         // ID giáo viên/mentor phụ trách
│
├── status: string           // "active" | "inactive" | "graduated"
├── createdAt: Timestamp
├── updatedAt: Timestamp
```

**Quy tắc Paper ID:**
- Format: `STU-{năm}-{số 4 chữ số}` → `STU-2026-0001`
- Tự động tăng, in lên thẻ RFID vật lý
- Dùng khi mất thẻ hoặc tra cứu thủ công

**Quy tắc RFID UID:**
- Đọc từ thẻ MIFARE Classic (4 hoặc 7 byte UID)
- Format hex: `"A3:B2:C1:D0"` hoặc `"A3:B2:C1:D0:E5:F6:07"`
- Unique, không đổi theo thẻ vật lý

### 2.2 `attendance` — Điểm Danh

```
attendance/{autoId}
│
├── studentId: string        // → students/{studentId}
├── rfidUid: string          // UID đã quẹt (để đối chiếu)
├── paperId: string          // Paper ID (backup tra cứu)
│
├── deviceId: string         // "neo-one-hub01-01" — thiết bị NEO One
├── makerHubId: string       // "hub-hcm-01" — địa điểm
│
├── checkIn: Timestamp       // Giờ quẹt thẻ đến
├── checkOut: Timestamp|null // Giờ quẹt thẻ về (null nếu chưa về)
├── durationMinutes: number  // Tự tính khi checkOut
│
├── type: string             // "rfid" | "manual" | "auto"
├── note: string             // Ghi chú (nếu điểm danh thủ công)
├── createdAt: Timestamp
```

**Logic điểm danh:**
- Quẹt thẻ lần 1 trong ngày → `checkIn`
- Quẹt thẻ lần 2 → `checkOut`, tính `durationMinutes`
- Nếu không quẹt về → auto checkOut sau 4 giờ hoặc cuối buổi

### 2.3 `progress` — Tiến Trình Bài Học

```
progress/{autoId}
│
├── studentId: string        // → students/{studentId}
│
├── stage: string            // "kham-pha" | "tu-duy" | "lap-trinh" | "iot-robot" | "chia-se"
├── lessonId: string         // "py-05-for-loop" | "claw-03-movement" | "stem-q8"
├── lessonTitle: string      // "Vòng lặp for" — hiển thị
├── app: string              // "neo_code" | "neoclaw" | "neo_stem"
│
├── status: string           // "started" | "in_progress" | "completed"
├── score: number            // 0-3 sao
├── timeSpentMinutes: number // Thời gian làm bài
├── attempts: number         // Số lần thử
│
├── codeSnapshot: string     // Code cuối cùng (nếu có, tối đa 2000 ký tự)
├── errorCount: number       // Số lỗi gặp phải
│
├── deviceId: string         // NEO One nào
├── makerHubId: string
│
├── startedAt: Timestamp
├── completedAt: Timestamp|null
├── createdAt: Timestamp
```

**Logic ghi progress:**
- NEO_CODE/NeoClaw ghi khi: bắt đầu bài, hoàn thành bài, hoặc mỗi 5 phút
- Upsert theo `studentId + lessonId` (không tạo trùng)
- Score chỉ tăng (không giảm nếu làm lại)

### 2.4 `users` — Tài Khoản Đăng Nhập

```
users/{firebaseAuthUid}
│
├── email: string            // "gv.mai@robot.edu.vn" hoặc email cá nhân
├── displayName: string      // "Cô Mai"
├── role: string             // "admin" | "teacher" | "parent" | "student"
│
├── linkedStudentIds: string[]  // Danh sách studentId liên kết
│                                // teacher: học sinh quản lý
│                                // parent: con em
│                                // student: [chính mình]
│
├── makerHubId: string       // Maker Hub phụ trách (teacher)
├── phone: string
│
├── createdAt: Timestamp
├── updatedAt: Timestamp
```

**Auth flow theo vai trò:**
- **Admin:** Email/password, tạo bởi admin khác
- **Giáo viên:** Email/password, tạo bởi admin, link với Maker Hub
- **Phụ huynh:** Đăng ký bằng email/phone, link với student qua paperId
- **Học sinh:** Quẹt RFID = đăng nhập trên NEO One (không cần email)

---

## 3. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Students: admin/teacher đọc-ghi, parent đọc con mình, device ghi
    match /students/{studentId} {
      allow read: if isAdmin() || isTeacherOf(studentId) || isParentOf(studentId);
      allow write: if isAdmin() || isTeacherOf(studentId);
    }

    // Attendance: admin/teacher đọc, device ghi
    match /attendance/{docId} {
      allow read: if isAdmin() || isTeacher();
      allow create: if true; // NEO One devices ghi (dùng service account)
    }

    // Progress: tương tự attendance
    match /progress/{docId} {
      allow read: if isAdmin() || isTeacher() || isParentOf(resource.data.studentId);
      allow create, update: if true; // NEO One devices ghi
    }

    // Users: chỉ admin ghi, user đọc chính mình
    match /users/{userId} {
      allow read: if request.auth.uid == userId || isAdmin();
      allow write: if isAdmin();
    }

    // Helper functions
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    function isTeacher() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    function isTeacherOf(studentId) {
      return isTeacher() &&
        studentId in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.linkedStudentIds;
    }
    function isParentOf(studentId) {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'parent' &&
        studentId in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.linkedStudentIds;
    }
  }
}
```

---

## 4. API Routes (Next.js)

### 4.1 Tổng Quan Endpoints

```
/api/auth/
├── POST /login              — Đăng nhập (email/password)
├── POST /register           — Đăng ký (phụ huynh tự đăng ký)
├── POST /logout             — Đăng xuất
└── GET  /me                 — Thông tin user hiện tại

/api/students/
├── GET    /                 — Danh sách học sinh (filter by hub/teacher/status)
├── POST   /                 — Tạo hồ sơ mới (admin/teacher)
├── GET    /{id}             — Chi tiết 1 học sinh
├── PUT    /{id}             — Cập nhật hồ sơ
├── DELETE /{id}             — Vô hiệu hóa (soft delete → status=inactive)
├── POST   /{id}/link-rfid   — Liên kết thẻ RFID với học sinh
└── GET    /{id}/progress    — Tiến trình của 1 học sinh

/api/attendance/
├── POST /checkin            — Ghi điểm danh (từ NEO One, gửi rfidUid)
├── POST /checkout           — Ghi giờ về
└── GET  /                   — Lịch sử điểm danh (filter by date/hub/student)

/api/progress/
├── POST /report             — Ghi tiến trình bài học (từ NEO One)
└── GET  /                   — Tra cứu tiến trình (filter by student/stage/app)

/api/dashboard/
├── GET /admin               — Thống kê toàn hệ thống
├── GET /teacher             — Thống kê của giáo viên
├── GET /parent/{studentId}  — Tiến trình con em
└── GET /student/{studentId} — Tiến trình bản thân
```

### 4.2 API Check-in (NEO One gọi)

```
POST /api/attendance/checkin
Header: X-Device-Id: neo-one-hub01-01
        X-Device-Key: <shared secret>
Body:
{
  "rfidUid": "A3:B2:C1:D0",
  "makerHubId": "hub-hcm-01"
}

Response 200:
{
  "action": "checkin",         // hoặc "checkout"
  "student": {
    "paperId": "STU-2026-0001",
    "nickname": "An",
    "avatarUrl": "...",
    "currentStage": "lap-trinh",
    "totalStars": 45,
    "streak": 7
  },
  "message": "Chào An! Chúc em học vui!"  // Hiển thị trên NEO One
}

Response 404:
{
  "error": "rfid_not_found",
  "message": "Thẻ chưa đăng ký. Liên hệ giáo viên."
}
```

### 4.3 API Progress Report (NEO One gọi)

```
POST /api/progress/report
Header: X-Device-Id: neo-one-hub01-01
        X-Device-Key: <shared secret>
Body:
{
  "rfidUid": "A3:B2:C1:D0",
  "stage": "lap-trinh",
  "lessonId": "py-05-for-loop",
  "lessonTitle": "Vòng lặp for",
  "app": "neo_code",
  "status": "completed",
  "score": 3,
  "timeSpentMinutes": 25,
  "attempts": 2
}

Response 200:
{
  "ok": true,
  "newBadges": ["loop-master"],      // Huy hiệu mới (nếu có)
  "totalStars": 48,
  "message": "Xuất sắc! Em đạt 3 sao! 🌟"
}
```

---

## 5. NEO One — RFID Agent (Python)

### 5.1 Phần Cứng

```
NEO One (ARM Linux)
  │
  ├── GPIO/SPI ──── RC522 Module
  │                  ├── VCC → 3.3V
  │                  ├── GND → GND
  │                  ├── MISO → SPI0 MISO
  │                  ├── MOSI → SPI0 MOSI
  │                  ├── SCK → SPI0 SCLK
  │                  ├── SDA → SPI0 CE0 (GPIO 8)
  │                  └── RST → GPIO 25
  │
  ├── USB ──── ThingBot (NeoClaw robot)
  └── WiFi ──── robot.edu.vn API
```

### 5.2 rfid_agent.py — Luồng Hoạt Động

```
Khởi động
    │
    ▼
Chờ quẹt thẻ (polling RC522)
    │
    ▼
Đọc UID từ thẻ MIFARE
    │
    ▼
POST /api/attendance/checkin {rfidUid}
    │
    ├── 200 OK → Hiển thị "Chào {nickname}! ⭐{stars}" trên màn hình
    │            → Phát âm thanh chào
    │            → Load NEO_CODE/NeoClaw với profile học sinh
    │
    ├── 404 → Hiển thị "Thẻ chưa đăng ký"
    │         → Beep cảnh báo
    │
    └── Network error → Lưu offline, đồng bộ sau
    │
    ▼
Quay lại chờ quẹt thẻ
```

### 5.3 progress_reporter.py — Đồng Bộ Tiến Trình

```
NEO_CODE/NeoClaw chạy bài học
    │
    ▼
Khi hoàn thành bài / mỗi 5 phút:
    │
    ▼
POST /api/progress/report {rfidUid, lessonId, status, score, ...}
    │
    ├── 200 OK → Cập nhật UI (sao mới, huy hiệu)
    │
    └── Network error → Queue lại, retry sau 30 giây
```

---

## 6. Web UI — Các Trang Mới

### 6.1 Route Structure

```
app/
├── dang-nhap/page.tsx          — Trang đăng nhập
├── dang-ky/page.tsx            — Đăng ký phụ huynh
│
├── dashboard/
│   ├── page.tsx                — Dashboard chung (redirect theo role)
│   ├── admin/
│   │   ├── page.tsx            — Tổng quan hệ thống
│   │   ├── students/page.tsx   — Quản lý học sinh (CRUD, lọc, tìm)
│   │   ├── students/[id]/page.tsx  — Chi tiết 1 học sinh
│   │   ├── teachers/page.tsx   — Quản lý giáo viên
│   │   ├── attendance/page.tsx — Báo cáo điểm danh
│   │   └── hubs/page.tsx       — Quản lý Maker Hub
│   │
│   ├── teacher/
│   │   ├── page.tsx            — Tổng quan lớp
│   │   ├── students/page.tsx   — Danh sách học sinh của mình
│   │   ├── students/[id]/page.tsx  — Tiến trình chi tiết
│   │   ├── attendance/page.tsx — Điểm danh hôm nay
│   │   └── link-rfid/page.tsx  — Liên kết thẻ RFID cho học sinh mới
│   │
│   ├── parent/
│   │   ├── page.tsx            — Tổng quan con em
│   │   └── [studentId]/page.tsx — Tiến trình chi tiết con
│   │
│   └── student/
│       └── page.tsx            — Hồ sơ + tiến trình + huy hiệu
```

### 6.2 Dashboard Giáo Viên (Mockup)

```
┌──────────────────────────────────────────────────────────┐
│  robot.edu.vn    [Dashboard]  [Học sinh]  [Điểm danh]   │
│                                          Cô Mai ▼       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  📊 Tổng Quan Hôm Nay                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │    12    │ │     8    │ │    45    │ │     3    │   │
│  │ Có mặt  │ │ Bài xong │ │ ⭐ Sao   │ │ 🏅 Huy   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                          │
│  👩‍🎓 Học Sinh Đang Hoạt Động                             │
│  ┌────┬──────────┬────────────┬───────┬──────┐          │
│  │ ID │ Tên      │ Đang học   │ Bước  │ ⭐   │          │
│  ├────┼──────────┼────────────┼───────┼──────┤          │
│  │001 │ An       │ Vòng lặp   │ 🟢 3  │ 45   │          │
│  │002 │ Bình     │ Robot arm  │ 🔴 4  │ 32   │          │
│  │003 │ Chi      │ Quang hợp  │ 🟡 2  │ 28   │          │
│  └────┴──────────┴────────────┴───────┴──────┘          │
│                                                          │
│  📈 Tiến Trình Tuần Này                                 │
│  ████████████░░░░ 75% hoàn thành mục tiêu               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 6.3 Dashboard Phụ Huynh

```
┌──────────────────────────────────────────────────────────┐
│  robot.edu.vn                    Anh Bình (Phụ huynh) ▼ │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  👦 Nguyễn Văn An — Lớp 4, TH Lê Văn Tám               │
│  STU-2026-0001 | Maker Hub: FPT Shop Quận 7             │
│                                                          │
│  🔥 Chuỗi ngày liên tiếp: 7 ngày                       │
│                                                          │
│  📍 Hành Trình 5 Bước                                   │
│  [■■■■■] Khám phá    ✅ Hoàn thành                      │
│  [■■■■■] Tư duy      ✅ Hoàn thành                      │
│  [■■■░░] Lập trình   🔵 Đang học (60%)                  │
│  [░░░░░] IoT & Robot  ⬜ Chưa bắt đầu                   │
│  [░░░░░] Chia sẻ      ⬜ Chưa bắt đầu                   │
│                                                          │
│  📅 Hoạt Động Gần Đây                                   │
│  • 04/04: Học "Vòng lặp for" — 3⭐ (25 phút)            │
│  • 03/04: Học "Biến số" — 2⭐ (30 phút)                 │
│  • 02/04: Điểm danh Maker Hub (90 phút)                  │
│                                                          │
│  🏅 Huy Hiệu (8/29)                                     │
│  [🌟] [🔬] [💻] [🏆] [📚] [🎯] [🤖] [⚡]              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 7. Hệ Thống Huy Hiệu & Sao

### 7.1 Quy Tắc Tính Sao

| Hành Động | Sao |
|----------|-----|
| Hoàn thành bài học | 1-3 ⭐ (theo score) |
| Điểm danh mỗi ngày | +1 ⭐ |
| Chuỗi 7 ngày liên tiếp | +5 ⭐ bonus |
| Chuỗi 30 ngày | +20 ⭐ bonus |

### 7.2 Huy Hiệu

| ID | Tên | Điều Kiện |
|----|-----|----------|
| `first-login` | Bước chân đầu tiên | Quẹt thẻ lần đầu |
| `explorer-5` | Nhà thám hiểm | Hoàn thành 5 bài Khám phá |
| `thinker-5` | Nhà tư duy | Hoàn thành 5 bài Tư duy |
| `coder-10` | Lập trình viên nhí | Hoàn thành 10 bài Lập trình |
| `robot-master` | Bậc thầy Robot | Hoàn thành 5 bài IoT/Robot |
| `perfect-star` | Ngôi sao hoàn hảo | Đạt 3⭐ trong 10 bài liên tiếp |
| `streak-7` | Kiên trì 7 ngày | 7 ngày liên tiếp |
| `streak-30` | Siêu kiên trì | 30 ngày liên tiếp |
| `helper` | Người giúp đỡ | Giúp 3 bạn khác (mentor ghi nhận) |
| `maker` | Nhà sáng tạo | Hoàn thành 1 dự án Chia sẻ |

---

## 8. Luồng Đăng Ký Học Sinh Mới

```
Giáo viên mở dashboard → [Thêm học sinh mới]
    │
    ▼
Nhập: Họ tên, ngày sinh, lớp, trường, SĐT/email phụ huynh
    │
    ▼
Hệ thống tự tạo:
  → Paper ID: STU-2026-0042
  → studentId (Firestore doc ID)
    │
    ▼
Giáo viên lấy thẻ RFID mới → Mở trang [Liên kết RFID]
    │
    ▼
Quẹt thẻ vào RC522 của NEO One
    │
    ▼
POST /api/students/{id}/link-rfid {rfidUid}
    │
    ▼
In/viết Paper ID lên thẻ vật lý: "STU-2026-0042"
    │
    ▼
Phát thẻ cho học sinh → Sẵn sàng sử dụng
```

---

## 9. Luồng Phụ Huynh Đăng Ký

```
Phụ huynh mở robot.edu.vn/dang-ky
    │
    ▼
Chọn "Tôi là Phụ huynh"
    │
    ▼
Nhập: Email, mật khẩu, họ tên, số điện thoại
    │
    ▼
Nhập Paper ID của con: "STU-2026-0042"
  (in trên thẻ RFID của học sinh)
    │
    ▼
Hệ thống kiểm tra:
  → Paper ID tồn tại? → Tên học sinh khớp với thông tin đã đăng ký?
    │
    ▼
Xác nhận → Tạo user role=parent, linkedStudentIds=[studentId]
    │
    ▼
Phụ huynh có thể xem tiến trình con em
```

---

## 10. Offline Handling (NEO One)

Khi NEO One mất mạng:

```
Quẹt thẻ RFID
    │
    ▼
Gọi API → Timeout/Error
    │
    ▼
Lưu vào local queue (SQLite trên NEO One):
  offline_queue.db
  ├── {rfidUid, action: "checkin", timestamp}
  ├── {rfidUid, lessonId, status, score, ...}
    │
    ▼
Background sync mỗi 30 giây:
  → Có mạng? → Gửi hết queue → Xóa đã gửi
  → Không mạng? → Thử lại sau 30 giây
    │
    ▼
Trong khi offline:
  → Vẫn cho học sinh dùng NEO_CODE/NeoClaw bình thường
  → Hiển thị "⚠ Offline — dữ liệu sẽ đồng bộ sau"
  → Tra cứu RFID từ local cache (đã biết từ lần online trước)
```

---

## 11. Kế Hoạch Triển Khai (Phases)

### Phase 2A: Foundation (2 tuần)

| # | Việc | Ưu Tiên |
|---|------|---------|
| 1 | Setup Firebase project (Firestore + Auth) | Cao |
| 2 | Tạo Firestore collections + security rules | Cao |
| 3 | API routes: `/api/auth/*`, `/api/students/*` | Cao |
| 4 | Trang đăng nhập/đăng ký | Cao |
| 5 | Dashboard layout + navigation (4 roles) | Cao |

### Phase 2B: Student Management (2 tuần)

| # | Việc | Ưu Tiên |
|---|------|---------|
| 6 | CRUD học sinh (tạo, sửa, xóa, tìm kiếm) | Cao |
| 7 | Trang chi tiết học sinh + tiến trình | Cao |
| 8 | Hệ thống Paper ID tự động | Cao |
| 9 | Dashboard giáo viên | Cao |
| 10 | Dashboard phụ huynh | Trung bình |

### Phase 2C: RFID & Progress (2 tuần)

| # | Việc | Ưu Tiên |
|---|------|---------|
| 11 | API check-in/check-out (RFID) | Cao |
| 12 | API progress report | Cao |
| 13 | Python rfid_agent.py cho NEO One | Cao |
| 14 | Python progress_reporter.py | Cao |
| 15 | Trang liên kết RFID | Cao |
| 16 | Offline queue trên NEO One | Trung bình |

### Phase 2D: Gamification & Polish (1 tuần)

| # | Việc | Ưu Tiên |
|---|------|---------|
| 17 | Hệ thống sao + huy hiệu | Trung bình |
| 18 | Dashboard học sinh (xem tiến trình bản thân) | Trung bình |
| 19 | Báo cáo điểm danh (admin/teacher) | Trung bình |
| 20 | Biểu đồ tiến trình (charts) | Thấp |

**Tổng ước tính: 7 tuần**

---

## 12. Environment Variables Mới

```env
# Firebase (thêm vào .env.local)
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=robot-edu-vn.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=robot-edu-vn
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=robot-edu-vn.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

# Firebase Admin (server-side)
FIREBASE_ADMIN_PROJECT_ID=robot-edu-vn
FIREBASE_ADMIN_CLIENT_EMAIL=xxx@robot-edu-vn.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Device auth (NEO One)
DEVICE_SHARED_SECRET=xxx
```

---

## 13. Dependencies Mới

```json
{
  "firebase": "^11.0.0",
  "firebase-admin": "^13.0.0",
  "recharts": "^2.15.0"
}
```

---

*Spec này là cơ sở cho implementation plan Phase 2 của robot.edu.vn.*
*Tác giả: ThingEdu — OpenSTEM Foundation*
