# Hướng Dẫn Cấu Hình & Triển Khai RobotEduVn Phase 2

> **Ngày:** 2026-04-05
> **Chi phí:** ~$20/tháng (Vercel Pro) + Firebase miễn phí
> **Thời gian setup:** ~30 phút

---

## 1. Tổng Quan Hạ Tầng

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Vercel Pro      │     │  Firebase        │     │  NEO One        │
│  $20/tháng       │     │  Spark (Free)    │     │  (tại lớp học)  │
│                  │     │                  │     │                  │
│  Next.js app     │────►│  Firestore DB    │◄────│  rfid_agent.py  │
│  API routes      │     │  Auth            │     │  RC522 RFID     │
│  SSR/ISR         │     │  (Singapore)     │     │  progress sync  │
│                  │     │                  │     │                  │
│  robot.edu.vn    │     │  robot-edu-vn    │     │  Offline queue  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 2. Bước 1: Tạo Firebase Project

### 2.1 Tạo Project

1. Vào https://console.firebase.google.com
2. Bấm **"Add project"**
3. Tên project: `robot-edu-vn`
4. Bật Google Analytics: **Không** (bỏ qua cho đơn giản)
5. Bấm **"Create project"**

### 2.2 Bật Firestore Database

1. Trong Firebase Console → **Build** → **Firestore Database**
2. Bấm **"Create database"**
3. Chọn location: **`asia-southeast1` (Singapore)** ← quan trọng, gần Việt Nam nhất
4. Chọn **"Start in production mode"**
5. Bấm **"Enable"**

### 2.3 Bật Authentication

1. Firebase Console → **Build** → **Authentication**
2. Bấm **"Get started"**
3. Tab **"Sign-in method"** → Bật **"Email/Password"**
4. Lưu

### 2.4 Lấy Firebase Config (Client)

1. Firebase Console → **Project settings** (⚙️ góc trái)
2. Tab **"General"** → cuộn xuống **"Your apps"**
3. Bấm **"Web"** (icon `</>`)
4. Đặt tên app: `robot-edu-vn-web`
5. Bấm **"Register app"**
6. Copy đoạn config:

```javascript
// Sẽ nhận được dạng:
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "robot-edu-vn.firebaseapp.com",
  projectId: "robot-edu-vn",
  storageBucket: "robot-edu-vn.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

### 2.5 Tạo Service Account (Admin SDK)

1. Firebase Console → **Project settings** → Tab **"Service accounts"**
2. Bấm **"Generate new private key"**
3. Tải file JSON (ví dụ: `robot-edu-vn-firebase-adminsdk.json`)
4. **KHÔNG commit file này lên git** — chỉ dùng giá trị bên trong

Từ file JSON, lấy 3 giá trị:
- `project_id`
- `client_email`
- `private_key`

---

## 3. Bước 2: Cấu Hình Environment Variables

### 3.1 File `.env.local` (development)

Tạo file `/robot-edu-vn/.env.local`:

```env
# ========================================
# FIREBASE CLIENT (public — dùng trên browser)
# ========================================
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=robot-edu-vn.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=robot-edu-vn
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=robot-edu-vn.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...

# ========================================
# FIREBASE ADMIN (secret — chỉ server-side)
# ========================================
FIREBASE_ADMIN_PROJECT_ID=robot-edu-vn
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@robot-edu-vn.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"

# ========================================
# DEVICE AUTH (NEO One gọi API)
# ========================================
DEVICE_SHARED_SECRET=thay-bang-chuoi-ngau-nhien-32-ky-tu

# ========================================
# CÁC KEY CŨ (giữ lại từ Phase 1)
# ========================================
GOOGLE_SHEETS_API_KEY=...
GOOGLE_SHEETS_ID=...
YOUTUBE_API_KEY=...
GEMINI_API_KEY=...
ADMIN_PASSWORD=openstem2026
REVALIDATION_SECRET=...
NEXT_PUBLIC_SITE_URL=https://robot.edu.vn
```

### 3.2 Cấu Hình Trên Vercel

1. Vào https://vercel.com → Project **RobotEduVn**
2. **Settings** → **Environment Variables**
3. Thêm từng biến ở trên (copy từ `.env.local`)
4. Phân loại:
   - `NEXT_PUBLIC_*` → chọn cả **Production + Preview + Development**
   - `FIREBASE_ADMIN_*` → chỉ chọn **Production + Preview**
   - `DEVICE_SHARED_SECRET` → chỉ **Production**

---

## 4. Bước 3: Nâng Cấp Vercel Pro

1. Vào https://vercel.com/pricing
2. Chọn **"Pro"** — $20/tháng
3. Thanh toán bằng thẻ Visa/Mastercard

### So sánh Free vs Pro

| Tài Nguyên | Free | Pro ($20) | Cần Cho Phase 2 |
|-----------|------|-----------|----------------|
| Bandwidth | 100 GB | 1 TB | ~10 GB/tháng ✅ |
| Serverless | 100 GB-hrs | 1000 GB-hrs | ~50 GB-hrs ✅ |
| Builds | 6000 phút | 24000 phút | ~500 phút ✅ |
| Team members | 1 | Unlimited | 3-5 người ✅ |
| Preview deployments | 100/ngày | Unlimited | ✅ |
| Analytics | Không | Có | ✅ |
| Password protection | Không | Có | ✅ Admin pages |

**Lý do cần Pro:** Team members, analytics, password protection cho admin, và headroom cho API calls từ NEO One.

---

## 5. Bước 4: Chuẩn Bị Phần Cứng RFID

### 5.1 Danh Sách Mua

| Vật Tư | Số Lượng | Đơn Giá | Tổng | Link Tham Khảo |
|--------|---------|---------|------|---------------|
| Module RC522 | 1-2 | ~45.000đ ($2) | 90.000đ | Shopee/Lazada "RC522 RFID" |
| Thẻ MIFARE Classic 1K | 20 | ~7.000đ ($0.3) | 140.000đ | Mua kèm module |
| Dây jumper Female-Female | 1 bộ | ~15.000đ | 15.000đ | 7 dây cho SPI |
| **Tổng** | | | **~245.000đ (~$10)** | |

### 5.2 Đấu Nối RC522 → NEO One

```
RC522 Module          NEO One (GPIO)
─────────────         ──────────────
VCC (3.3V)    ────►   Pin 1 (3.3V)
RST           ────►   GPIO 25 (Pin 22)
GND           ────►   Pin 6 (GND)
MISO          ────►   GPIO 9 / SPI0 MISO (Pin 21)
MOSI          ────►   GPIO 10 / SPI0 MOSI (Pin 19)
SCK           ────►   GPIO 11 / SPI0 SCLK (Pin 23)
SDA (SS)      ────►   GPIO 8 / SPI0 CE0 (Pin 24)
IRQ           ────►   (không nối)
```

### 5.3 Cài Đặt Trên NEO One

```bash
# Bật SPI
sudo raspi-config nonint do_spi 0

# Cài thư viện
pip install mfrc522 firebase-admin requests

# Test đọc thẻ
python3 -c "
from mfrc522 import SimpleMFRC522
reader = SimpleMFRC522()
print('Quẹt thẻ...')
id, text = reader.read()
print(f'UID: {id}')
"
```

---

## 6. Firestore Security Rules

Sau khi tạo Firestore, vào **Rules** tab và paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }

    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }

    function isAdmin() {
      return isSignedIn() && getUserRole() == 'admin';
    }

    function isTeacher() {
      return isSignedIn() && getUserRole() == 'teacher';
    }

    function isParentOf(studentId) {
      return isSignedIn() && getUserRole() == 'parent' &&
        studentId in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.linkedStudentIds;
    }

    // Students collection
    match /students/{studentId} {
      allow read: if isAdmin() || isTeacher() || isParentOf(studentId);
      allow create, update: if isAdmin() || isTeacher();
      allow delete: if isAdmin();
    }

    // Attendance collection
    match /attendance/{docId} {
      allow read: if isAdmin() || isTeacher();
      allow create: if true;  // NEO One devices (validated by API)
    }

    // Progress collection
    match /progress/{docId} {
      allow read: if isAdmin() || isTeacher()
                    || isParentOf(resource.data.studentId);
      allow create, update: if true;  // NEO One devices (validated by API)
    }

    // Users collection
    match /users/{userId} {
      allow read: if request.auth.uid == userId || isAdmin();
      allow create: if isAdmin();
      allow update: if request.auth.uid == userId || isAdmin();
    }

    // Counters (for auto-increment Paper ID)
    match /counters/{counterId} {
      allow read, write: if isAdmin() || isTeacher();
    }
  }
}
```

---

## 7. Firestore Indexes

Tạo composite indexes cho queries thường dùng:

```
Collection: attendance
  Fields: studentId ASC, checkIn DESC
  Fields: makerHubId ASC, checkIn DESC

Collection: progress
  Fields: studentId ASC, createdAt DESC
  Fields: studentId ASC, stage ASC, status ASC

Collection: students
  Fields: makerHubId ASC, status ASC, fullName ASC
  Fields: mentorId ASC, status ASC
```

Indexes sẽ tự tạo khi query lần đầu (Firestore tự gợi ý qua error message).

---

## 8. Checklist Trước Khi Bắt Đầu Code

### Tài Khoản & Dịch Vụ

- [ ] Tạo Firebase project `robot-edu-vn`
- [ ] Bật Firestore (region `asia-southeast1`)
- [ ] Bật Authentication (Email/Password)
- [ ] Lấy Firebase Client Config (6 giá trị)
- [ ] Tạo Service Account, tải JSON key
- [ ] Nâng cấp Vercel Pro ($20/tháng)
- [ ] Thêm environment variables trên Vercel

### Phần Cứng (cho pilot)

- [ ] Mua 1-2 module RC522 (~90.000đ)
- [ ] Mua 20 thẻ MIFARE Classic (~140.000đ)
- [ ] Đấu nối RC522 vào NEO One, test đọc UID

### Code

- [ ] Tạo file `.env.local` với đầy đủ biến môi trường
- [ ] Cài `firebase` + `firebase-admin` packages
- [ ] Test kết nối Firestore từ local dev
- [ ] Deploy thử lên Vercel, kiểm tra env vars

---

## 9. Ước Tính Chi Phí Hàng Tháng

### Pilot (< 100 học sinh)

| Dịch Vụ | Chi Phí |
|---------|---------|
| Vercel Pro | $20 |
| Firebase Spark | $0 |
| Domain robot.edu.vn | ~$1 |
| **Tổng** | **~$21/tháng** |

### Mở Rộng (100-500 học sinh)

| Dịch Vụ | Chi Phí |
|---------|---------|
| Vercel Pro | $20 |
| Firebase Blaze (pay-as-you-go) | ~$5-10 |
| Domain | ~$1 |
| **Tổng** | **~$26-31/tháng** |

### Mở Rộng Lớn (500-5000 học sinh)

| Dịch Vụ | Chi Phí |
|---------|---------|
| Vercel Pro | $20 |
| Firebase Blaze | ~$20-50 |
| Domain | ~$1 |
| **Tổng** | **~$41-71/tháng** |

---

## 10. Giới Hạn Firebase Free Tier (Spark)

| Tài Nguyên | Miễn Phí | Ghi Chú |
|-----------|---------|---------|
| Firestore reads | **50.000/ngày** | ~500 HS × 100 reads = 50K ✅ |
| Firestore writes | **20.000/ngày** | ~500 HS × 40 writes = 20K ✅ |
| Firestore storage | **1 GB** | Đủ cho hàng chục nghìn records |
| Auth users | **Không giới hạn** | ✅ |
| Auth verifies | **10.000/tháng** | ✅ |
| Hosting | **10 GB/tháng** | Không dùng (dùng Vercel) |

**Kết luận:** Free tier đủ cho **vài trăm học sinh**. Chỉ cần nâng Blaze ($5-10/tháng) khi vượt 500 học sinh.

---

*Tài liệu này là phần bổ sung cho spec Phase 2.*
*Cần hỗ trợ: liên hệ ThingEdu team.*
