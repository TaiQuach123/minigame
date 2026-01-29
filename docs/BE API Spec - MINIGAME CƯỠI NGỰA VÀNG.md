# **BE API SPEC - MINIGAME CƯỠI NGỰA VÀNG - SĂN NGÀN LỘC**

## **Tổng quan**

### **Tech Stack**
- **Framework**: FastAPI (Python 3.9+)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT Token (tích hợp với hệ thống Rovi Travel)
- **Cache**: Redis (cho session và rate limiting)
- **Task Queue**: Celery (cho các task async như tích hợp ví thưởng)

### **Base URL**
```
Production: https://api.rovitravel.com/minigame/v1
Staging: https://staging-api.rovitravel.com/minigame/v1
```

### **Authentication**
Tất cả API endpoints (trừ health check) yêu cầu authentication header:
```
Authorization: Bearer <JWT_TOKEN>
```

### **Response Format**
Tất cả responses đều theo format:
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "error_code": null
}
```

---

## **1. API Endpoints**

### **1.1 Health Check**

#### **GET /health**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Health Check |
| Method | GET |
| Endpoint | `/health` |
| Auth | No |

**Request**: None

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| status | string | "healthy" |
| timestamp | string | ISO 8601 timestamp |

**Example Response**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-28T10:00:00Z"
}
```

---

### **1.2 Initialize Game**

#### **POST /game/initialize**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Initialize Game |
| Method | POST |
| Endpoint | `/game/initialize` |
| Auth | Yes |

**Request**

| Field | Type | Required | Description |
| :---: | :---: | :---: | :---: |
| - | - | - | Không có body, lấy user_id từ JWT token |

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| user_id | integer | ID người dùng |
| initial_turns | integer | Số lượt khởi tạo (10 lượt) |
| current_turns | integer | Số lượt hiện tại |
| provinces_completed | integer | Số tỉnh đã hoàn thành (0) |
| provinces_total | integer | Tổng số tỉnh (34) |
| puzzle_pieces | array | Danh sách mảnh ghép đã có (rỗng) |
| current_province_id | integer\|null | ID tỉnh đang chơi (null nếu chưa chơi) |
| current_position | integer\|null | Vị trí hiện tại trên bàn cờ (null nếu chưa chơi) |

**Error Codes**

| Code | Meaning |
| :---: | :---: |
| 400 | User đã được khởi tạo game trước đó |
| 401 | Unauthorized - Token không hợp lệ |
| 500 | Internal server error |

**Example Response**
```json
{
  "success": true,
  "data": {
    "user_id": 12345,
    "initial_turns": 10,
    "current_turns": 10,
    "provinces_completed": 0,
    "provinces_total": 34,
    "puzzle_pieces": [],
    "current_province_id": null,
    "current_position": null
  },
  "message": "Game initialized successfully",
  "error_code": null
}
```

---

### **1.3 Get Game State**

#### **GET /game/state**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Get Game State |
| Method | GET |
| Endpoint | `/game/state` |
| Auth | Yes |

**Request**: None (lấy user_id từ JWT token)

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| user_id | integer | ID người dùng |
| current_turns | integer | Số lượt còn lại |
| provinces_completed | integer | Số tỉnh đã hoàn thành |
| provinces_total | integer | Tổng số tỉnh (34) |
| provinces_progress | array | Chi tiết tiến độ từng tỉnh |
| provinces_progress[].province_id | integer | ID tỉnh |
| provinces_progress[].province_name | string | Tên tỉnh |
| provinces_progress[].region | string | Vùng miền (Bắc/Trung/Nam) |
| provinces_progress[].status | string | Trạng thái: "not_started", "in_progress", "completed" |
| provinces_progress[].current_position | integer\|null | Vị trí hiện tại trên bàn cờ (1-20) |
| puzzle_pieces | array | Danh sách mảnh ghép đã có |
| puzzle_pieces[].piece_id | string | ID mảnh ghép ("north", "central", "south", "rare") |
| puzzle_pieces[].piece_name | string | Tên mảnh ghép |
| puzzle_pieces[].acquired_at | string | Thời gian nhận được (ISO 8601) |
| total_reward_amount | integer | Tổng số tiền đã nhận (VNĐ) |
| last_checkin_date | string\|null | Ngày điểm danh cuối cùng (YYYY-MM-DD) |
| checkin_available | boolean | Có thể điểm danh hôm nay không |

**Error Codes**

| Code | Meaning |
| :---: | :---: |
| 404 | Game chưa được khởi tạo |
| 401 | Unauthorized |

**Example Response**
```json
{
  "success": true,
  "data": {
    "user_id": 12345,
    "current_turns": 7,
    "provinces_completed": 2,
    "provinces_total": 34,
    "provinces_progress": [
      {
        "province_id": 1,
        "province_name": "Hà Nội",
        "region": "Bắc",
        "status": "completed",
        "current_position": 20
      },
      {
        "province_id": 2,
        "province_name": "Hải Phòng",
        "region": "Bắc",
        "status": "in_progress",
        "current_position": 12
      }
    ],
    "puzzle_pieces": [
      {
        "piece_id": "north",
        "piece_name": "Xuân Bắc",
        "acquired_at": "2026-01-28T09:00:00Z"
      }
    ],
    "total_reward_amount": 268,
    "last_checkin_date": "2026-01-28",
    "checkin_available": false
  },
  "message": "Success",
  "error_code": null
}
```

---

### **1.4 Start Province Game**

#### **POST /game/province/{province_id}/start**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Start Province Game |
| Method | POST |
| Endpoint | `/game/province/{province_id}/start` |
| Auth | Yes |

**Request**

| Field | Type | Required | Description |
| :---: | :---: | :---: | :---: |
| province_id | integer | Yes | ID tỉnh (path parameter) |

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| province_id | integer | ID tỉnh |
| province_name | string | Tên tỉnh |
| region | string | Vùng miền |
| current_position | integer | Vị trí hiện tại (1 = START) |
| board_layout | array | Layout bàn cờ 20 ô |
| board_layout[].position | integer | Vị trí ô (1-20) |
| board_layout[].square_type | string | Loại ô: "start", "finish", "event", "reward", "bonus_turn", "challenge", "blessing" |
| board_layout[].description | string | Mô tả ô |

**Error Codes**

| Code | Meaning |
| :---: | :---: |
| 400 | Không đủ lượt chơi (current_turns = 0) |
| 404 | Tỉnh không tồn tại |
| 409 | Đã hoàn thành tỉnh này rồi |
| 401 | Unauthorized |

**Example Response**
```json
{
  "success": true,
  "data": {
    "province_id": 1,
    "province_name": "Hà Nội",
    "region": "Bắc",
    "current_position": 1,
    "board_layout": [
      {
        "position": 1,
        "square_type": "start",
        "description": "Điểm xuất phát"
      },
      {
        "position": 3,
        "square_type": "reward",
        "description": "Tiền thưởng"
      },
      {
        "position": 6,
        "square_type": "event",
        "description": "Săn mảnh ghép"
      }
    ]
  },
  "message": "Province game started",
  "error_code": null
}
```

---

### **1.5 Roll Dice**

#### **POST /game/province/{province_id}/roll-dice**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Roll Dice |
| Method | POST |
| Endpoint | `/game/province/{province_id}/roll-dice` |
| Auth | Yes |

**Request**

| Field | Type | Required | Description |
| :---: | :---: | :---: | :---: |
| province_id | integer | Yes | ID tỉnh (path parameter) |

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| dice_result | integer | Kết quả xúc xắc (1-6) |
| previous_position | integer | Vị trí trước đó |
| new_position | integer | Vị trí mới sau khi di chuyển |
| square_type | string | Loại ô mới |
| reward | object\|null | Thưởng nhận được (nếu có) |
| reward.type | string | Loại thưởng: "money", "bonus_turn", "puzzle_piece", "blessing", "challenge" |
| reward.amount | integer\|null | Số tiền (VNĐ) nếu type = "money" |
| reward.turns_added | integer\|null | Số lượt thêm nếu type = "bonus_turn" |
| reward.puzzle_piece | object\|null | Mảnh ghép nếu type = "puzzle_piece" |
| reward.blessing_text | string\|null | Câu chúc nếu type = "blessing" |
| reward.challenge_effect | string\|null | Hiệu ứng thử thách nếu type = "challenge" |
| current_turns | integer | Số lượt còn lại sau lượt này |
| province_completed | boolean | Đã hoàn thành tỉnh chưa (đến ô 20) |

**Error Codes**

| Code | Meaning |
| :---: | :---: |
| 400 | Không đủ lượt chơi (current_turns = 0) |
| 400 | Tỉnh chưa được bắt đầu |
| 400 | Đã hoàn thành tỉnh này rồi |
| 404 | Tỉnh không tồn tại |
| 401 | Unauthorized |
| 500 | Lỗi khi tính toán thưởng |

**Example Response**
```json
{
  "success": true,
  "data": {
    "dice_result": 4,
    "previous_position": 1,
    "new_position": 5,
    "square_type": "blessing",
    "reward": {
      "type": "blessing",
      "blessing_text": "An khang thịnh vượng, vạn sự như ý!"
    },
    "current_turns": 6,
    "province_completed": false
  },
  "message": "Dice rolled successfully",
  "error_code": null
}
```

**Example Response (Nhận tiền thưởng)**
```json
{
  "success": true,
  "data": {
    "dice_result": 2,
    "previous_position": 5,
    "new_position": 7,
    "square_type": "reward",
    "reward": {
      "type": "money",
      "amount": 200
    },
    "current_turns": 6,
    "province_completed": false
  },
  "message": "Dice rolled successfully",
  "error_code": null
}
```

**Example Response (Nhận mảnh ghép)**
```json
{
  "success": true,
  "data": {
    "dice_result": 3,
    "previous_position": 7,
    "new_position": 10,
    "square_type": "event",
    "reward": {
      "type": "puzzle_piece",
      "puzzle_piece": {
        "piece_id": "north",
        "piece_name": "Xuân Bắc"
      }
    },
    "current_turns": 6,
    "province_completed": false
  },
  "message": "Dice rolled successfully",
  "error_code": null
}
```

**Example Response (Hoàn thành tỉnh)**
```json
{
  "success": true,
  "data": {
    "dice_result": 3,
    "previous_position": 17,
    "new_position": 20,
    "square_type": "finish",
    "reward": {
      "type": "bonus_turn",
      "turns_added": 1
    },
    "current_turns": 7,
    "province_completed": true
  },
  "message": "Province completed!",
  "error_code": null
}
```

---

### **1.6 Daily Check-in**

#### **POST /game/checkin**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Daily Check-in |
| Method | POST |
| Endpoint | `/game/checkin` |
| Auth | Yes |

**Request**: None (lấy user_id từ JWT token)

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| checkin_date | string | Ngày điểm danh (YYYY-MM-DD) |
| turns_added | integer | Số lượt được cộng (+3) |
| current_turns | integer | Số lượt hiện tại sau khi cộng |
| next_checkin_date | string | Ngày điểm danh tiếp theo (YYYY-MM-DD) |

**Error Codes**

| Code | Meaning |
| :---: | :---: |
| 400 | Đã điểm danh hôm nay rồi |
| 401 | Unauthorized |

**Example Response**
```json
{
  "success": true,
  "data": {
    "checkin_date": "2026-01-28",
    "turns_added": 3,
    "current_turns": 10,
    "next_checkin_date": "2026-01-29"
  },
  "message": "Check-in successful",
  "error_code": null
}
```

---

### **1.7 Get Puzzle Pieces**

#### **GET /game/puzzle-pieces**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Get Puzzle Pieces |
| Method | GET |
| Endpoint | `/game/puzzle-pieces` |
| Auth | Yes |

**Request**: None

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| pieces | array | Danh sách 4 mảnh ghép |
| pieces[].piece_id | string | ID mảnh ghép |
| pieces[].piece_name | string | Tên mảnh ghép |
| pieces[].region | string\|null | Vùng miền (nếu là mảnh vùng) |
| pieces[].is_acquired | boolean | Đã có mảnh này chưa |
| pieces[].acquired_at | string\|null | Thời gian nhận được |
| total_acquired | integer | Tổng số mảnh đã có (0-4) |
| can_claim_reward | boolean | Có thể nhận thưởng lớn chưa (đủ 4 mảnh) |

**Error Codes**

| Code | Meaning |
| :---: | :---: |
| 401 | Unauthorized |

**Example Response**
```json
{
  "success": true,
  "data": {
    "pieces": [
      {
        "piece_id": "north",
        "piece_name": "Xuân Bắc",
        "region": "Bắc",
        "is_acquired": true,
        "acquired_at": "2026-01-28T09:00:00Z"
      },
      {
        "piece_id": "central",
        "piece_name": "Xuân Trung",
        "region": "Trung",
        "is_acquired": false,
        "acquired_at": null
      },
      {
        "piece_id": "south",
        "piece_name": "Xuân Nam",
        "region": "Nam",
        "is_acquired": false,
        "acquired_at": null
      },
      {
        "piece_id": "rare",
        "piece_name": "Xuân Biển Đảo",
        "region": null,
        "is_acquired": false,
        "acquired_at": null
      }
    ],
    "total_acquired": 1,
    "can_claim_reward": false
  },
  "message": "Success",
  "error_code": null
}
```

---

### **1.8 Claim Puzzle Reward**

#### **POST /game/puzzle-pieces/claim-reward**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Claim Puzzle Reward |
| Method | POST |
| Endpoint | `/game/puzzle-pieces/claim-reward` |
| Auth | Yes |

**Request**: None

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| reward_amount | integer | Số tiền thưởng lớn (VNĐ) |
| transaction_id | string | ID giao dịch tích hợp ví thưởng |
| wallet_balance | integer | Số dư ví thưởng sau khi cộng |
| message | string | Thông báo thành công |

**Error Codes**

| Code | Meaning |
| :---: | :---: |
| 400 | Chưa đủ 4 mảnh ghép |
| 400 | Đã nhận thưởng rồi |
| 500 | Lỗi khi tích hợp ví thưởng |
| 401 | Unauthorized |

**Example Response**
```json
{
  "success": true,
  "data": {
    "reward_amount": 20000,
    "transaction_id": "TXN_20260128_123456",
    "wallet_balance": 20268,
    "message": "Cưỡi Ngựa Vàng - Rước Ngàn Lộc! Bạn nhận được 20000 VNĐ"
  },
  "message": "Reward claimed successfully",
  "error_code": null
}
```

---

### **1.9 Get Provinces List**

#### **GET /provinces**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Get Provinces List |
| Method | GET |
| Endpoint | `/provinces` |
| Auth | Yes |

**Request**: None

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| provinces | array | Danh sách 34 tỉnh thành |
| provinces[].province_id | integer | ID tỉnh |
| provinces[].province_name | string | Tên tỉnh |
| provinces[].region | string | Vùng miền (Bắc/Trung/Nam) |
| provinces[].coordinates | object | Tọa độ trên bản đồ |
| provinces[].status | string | Trạng thái của user: "not_started", "in_progress", "completed" |
| provinces[].current_position | integer\|null | Vị trí hiện tại trên bàn cờ |

**Error Codes**

| Code | Meaning |
| :---: | :---: |
| 401 | Unauthorized |

**Example Response**
```json
{
  "success": true,
  "data": {
    "provinces": [
      {
        "province_id": 1,
        "province_name": "Hà Nội",
        "region": "Bắc",
        "coordinates": {
          "lat": 21.0285,
          "lng": 105.8542
        },
        "status": "completed",
        "current_position": 20
      },
      {
        "province_id": 2,
        "province_name": "Hải Phòng",
        "region": "Bắc",
        "coordinates": {
          "lat": 20.8449,
          "lng": 106.6881
        },
        "status": "in_progress",
        "current_position": 12
      }
    ]
  },
  "message": "Success",
  "error_code": null
}
```

---

### **1.10 Get Province Details**

#### **GET /provinces/{province_id}**

**API Information**

| Item | Value |
| ----- | ----- |
| API name | Get Province Details |
| Method | GET |
| Endpoint | `/provinces/{province_id}` |
| Auth | Yes |

**Request**

| Field | Type | Required | Description |
| :---: | :---: | :---: | :---: |
| province_id | integer | Yes | ID tỉnh (path parameter) |

**Response**

| Field | Type | Description |
| :---: | :---: | :---: |
| province_id | integer | ID tỉnh |
| province_name | string | Tên tỉnh |
| region | string | Vùng miền |
| description | string | Mô tả tỉnh |
| coordinates | object | Tọa độ trên bản đồ |
| user_status | string | Trạng thái của user |
| user_current_position | integer\|null | Vị trí hiện tại của user |

**Error Codes**

| Code | Meaning |
| :---: | :---: |
| 404 | Tỉnh không tồn tại |
| 401 | Unauthorized |

---

## **2. 🎲 Random Logic (Luật Random)**

### **2.1 Dice Roll**

**Logic**: Random số từ 1-6 với phân phối đều
```python
import random
dice_result = random.randint(1, 6)
```

**Lưu ý**: 
- Random server-side, không trust FE
- Lưu log mỗi lần roll để audit

---

### **2.2 Reward Configuration**

#### **2.2.1 Tiền Thưởng (Reward Squares: 3, 8, 13, 18)**

| Reward | Value (VNĐ) | Rate (%) |
| :---: | :---: | :---: |
| Giải An Ủi | 68 | 60% |
| Giải Khích Lệ | 200 | 30% |
| Giải May Mắn | 2,026 | 10% |

**Logic**:
```python
import random

def get_money_reward():
    rand = random.random() * 100
    if rand < 60:
        return 68
    elif rand < 90:
        return 200
    else:
        return 2026
```

#### **2.2.2 Thêm Lượt (Bonus Turn Squares: 7, 14, 19)**

| Reward | Value | Rate (%) |
| :---: | :---: | :---: |
| +1 lượt | 1 | 70% |
| +2 lượt | 2 | 30% |

**Logic**:
```python
def get_bonus_turns():
    rand = random.random() * 100
    if rand < 70:
        return 1
    else:
        return 2
```

#### **2.2.3 Thử Thách (Challenge Squares: 4, 10, 17)**

| Effect | Description | Rate (%) |
| :---: | :---: | :---: |
| Lùi bước | Lùi lại 1-3 ô | 40% |
| Đứng im | Không di chuyển lượt tiếp theo | 30% |
| Trừ xu | Trừ 1 lượt | 30% |

**Logic**:
```python
def get_challenge_effect():
    rand = random.random() * 100
    if rand < 40:
        steps_back = random.randint(1, 3)
        return {"type": "move_back", "steps": steps_back}
    elif rand < 70:
        return {"type": "skip_next_turn"}
    else:
        return {"type": "lose_turn", "turns": 1}
```

#### **2.2.4 Mảnh Ghép (Event Squares: 6, 16)**

**Điều kiện để rơi mảnh ghép:**

1. **Mảnh Vùng Miền (Bắc/Trung/Nam)**:
   - Chỉ rơi tại các tỉnh thuộc vùng đó
   - Tỷ lệ rơi: 30% khi vào ô Event
   - Nếu đã có mảnh vùng đó rồi → không rơi nữa
   - **Bảo hiểm**: Nếu hoàn thành hết tỉnh trong vùng mà chưa có mảnh → tự động tặng ở tỉnh cuối

2. **Mảnh Hiếm**:
   - Chỉ xuất hiện khi:
     - Đã có đủ 3 mảnh vùng miền
     - Đã hoàn thành ≥ 50% bản đồ (17/34 tỉnh)
   - Tỷ lệ rơi: 20% khi vào ô Event (nếu đủ điều kiện)
   - **Bảo hiểm**: Nếu hoàn thành hết 34 tỉnh mà chưa có → tự động tặng ở tỉnh thứ 34

**Logic**:
```python
def get_puzzle_piece_reward(user_id, province_id, province_region):
    # Kiểm tra điều kiện mảnh hiếm
    user_state = get_user_game_state(user_id)
    has_all_region_pieces = (
        user_state.has_north_piece and
        user_state.has_central_piece and
        user_state.has_south_piece
    )
    provinces_completed = user_state.provinces_completed
    can_get_rare = has_all_region_pieces and provinces_completed >= 17
    
    # Kiểm tra bảo hiểm
    if should_guarantee_region_piece(user_id, province_region):
        return get_region_piece(province_region)
    
    if provinces_completed == 33 and not user_state.has_rare_piece:
        return {"type": "rare_piece"}
    
    # Random mảnh ghép
    rand = random.random() * 100
    
    if rand < 30:
        # Rơi mảnh vùng miền
        if not user_state.has_region_piece(province_region):
            return {"type": "region_piece", "region": province_region}
    
    if can_get_rare and rand < 20 and not user_state.has_rare_piece:
        return {"type": "rare_piece"}
    
    # Không rơi mảnh ghép
    return None
```

#### **2.2.5 Lời Chúc (Blessing Squares: các ô còn lại)**

Random từ danh sách câu chúc Tết có sẵn:
- "An khang thịnh vượng"
- "Vạn sự như ý"
- "Tấn tài tấn lộc"
- "Cung chúc tân xuân"
- v.v.

---

### **2.3 Rules**

- **Random server-side**: Tất cả logic random đều chạy trên server
- **Lưu theo user + date**: Log mỗi lần roll dice và reward để audit
- **Không trust FE**: Frontend chỉ gửi request, server quyết định tất cả
- **Deterministic khi cần**: Có thể dùng seed để test/replay (optional)

---

## **3. Database Schema**

### **3.1 Tables**

#### **3.1.1 users_game_state**

Lưu trạng thái game của mỗi user

| Column | Type | Constraints | Description |
| :---: | :---: | :---: | :---: |
| id | BIGSERIAL | PRIMARY KEY | ID bản ghi |
| user_id | INTEGER | NOT NULL, UNIQUE | ID người dùng |
| current_turns | INTEGER | NOT NULL, DEFAULT 10 | Số lượt hiện tại |
| provinces_completed | INTEGER | NOT NULL, DEFAULT 0 | Số tỉnh đã hoàn thành |
| total_reward_amount | INTEGER | NOT NULL, DEFAULT 0 | Tổng tiền thưởng đã nhận (VNĐ) |
| has_north_piece | BOOLEAN | NOT NULL, DEFAULT FALSE | Có mảnh ghép Bắc |
| has_central_piece | BOOLEAN | NOT NULL, DEFAULT FALSE | Có mảnh ghép Trung |
| has_south_piece | BOOLEAN | NOT NULL, DEFAULT FALSE | Có mảnh ghép Nam |
| has_rare_piece | BOOLEAN | NOT NULL, DEFAULT FALSE | Có mảnh ghép Hiếm |
| puzzle_reward_claimed | BOOLEAN | NOT NULL, DEFAULT FALSE | Đã nhận thưởng 4 mảnh chưa |
| last_checkin_date | DATE | NULL | Ngày điểm danh cuối cùng |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Thời gian tạo |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Thời gian cập nhật |

**Indexes**:
- `idx_users_game_state_user_id` on `user_id`

---

#### **3.1.2 provinces**

Danh sách 34 tỉnh thành

| Column | Type | Constraints | Description |
| :---: | :---: | :---: | :---: |
| id | SERIAL | PRIMARY KEY | ID tỉnh |
| province_name | VARCHAR(100) | NOT NULL, UNIQUE | Tên tỉnh |
| region | VARCHAR(20) | NOT NULL | Vùng miền (Bắc/Trung/Nam) |
| latitude | DECIMAL(10,7) | NOT NULL | Vĩ độ |
| longitude | DECIMAL(10,7) | NOT NULL | Kinh độ |
| description | TEXT | NULL | Mô tả tỉnh |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Thời gian tạo |

**Indexes**:
- `idx_provinces_region` on `region`

---

#### **3.1.3 user_province_progress**

Tiến độ của user trên từng tỉnh

| Column | Type | Constraints | Description |
| :---: | :---: | :---: | :---: |
| id | BIGSERIAL | PRIMARY KEY | ID bản ghi |
| user_id | INTEGER | NOT NULL | ID người dùng |
| province_id | INTEGER | NOT NULL | ID tỉnh |
| status | VARCHAR(20) | NOT NULL, DEFAULT 'not_started' | Trạng thái: not_started/in_progress/completed |
| current_position | INTEGER | NULL | Vị trí hiện tại trên bàn cờ (1-20) |
| completed_at | TIMESTAMP | NULL | Thời gian hoàn thành |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Thời gian tạo |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Thời gian cập nhật |

**Indexes**:
- `idx_user_province_progress_user_province` on `(user_id, province_id)` UNIQUE
- `idx_user_province_progress_user_id` on `user_id`
- `idx_user_province_progress_province_id` on `province_id`

---

#### **3.1.4 dice_rolls**

Log mỗi lần gieo xúc xắc

| Column | Type | Constraints | Description |
| :---: | :---: | :---: | :---: |
| id | BIGSERIAL | PRIMARY KEY | ID bản ghi |
| user_id | INTEGER | NOT NULL | ID người dùng |
| province_id | INTEGER | NOT NULL | ID tỉnh |
| dice_result | INTEGER | NOT NULL | Kết quả xúc xắc (1-6) |
| previous_position | INTEGER | NOT NULL | Vị trí trước đó |
| new_position | INTEGER | NOT NULL | Vị trí mới |
| square_type | VARCHAR(20) | NOT NULL | Loại ô |
| reward_type | VARCHAR(20) | NULL | Loại thưởng |
| reward_value | JSONB | NULL | Giá trị thưởng (JSON) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Thời gian tạo |

**Indexes**:
- `idx_dice_rolls_user_id` on `user_id`
- `idx_dice_rolls_created_at` on `created_at`

---

#### **3.1.5 rewards**

Log các phần thưởng đã nhận

| Column | Type | Constraints | Description |
| :---: | :---: | :---: | :---: |
| id | BIGSERIAL | PRIMARY KEY | ID bản ghi |
| user_id | INTEGER | NOT NULL | ID người dùng |
| reward_type | VARCHAR(20) | NOT NULL | Loại thưởng: money/bonus_turn/puzzle_piece |
| reward_value | JSONB | NOT NULL | Giá trị thưởng (JSON) |
| amount | INTEGER | NULL | Số tiền (nếu là money) |
| transaction_id | VARCHAR(100) | NULL | ID giao dịch ví thưởng |
| province_id | INTEGER | NULL | ID tỉnh (nếu có) |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Thời gian tạo |

**Indexes**:
- `idx_rewards_user_id` on `user_id`
- `idx_rewards_created_at` on `created_at`
- `idx_rewards_transaction_id` on `transaction_id`

---

#### **3.1.6 checkins**

Log điểm danh hàng ngày

| Column | Type | Constraints | Description |
| :---: | :---: | :---: | :---: |
| id | BIGSERIAL | PRIMARY KEY | ID bản ghi |
| user_id | INTEGER | NOT NULL | ID người dùng |
| checkin_date | DATE | NOT NULL | Ngày điểm danh |
| turns_added | INTEGER | NOT NULL, DEFAULT 3 | Số lượt được cộng |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Thời gian tạo |

**Indexes**:
- `idx_checkins_user_date` on `(user_id, checkin_date)` UNIQUE
- `idx_checkins_user_id` on `user_id`

---

#### **3.1.7 puzzle_pieces**

Chi tiết mảnh ghép đã nhận

| Column | Type | Constraints | Description |
| :---: | :---: | :---: | :---: |
| id | BIGSERIAL | PRIMARY KEY | ID bản ghi |
| user_id | INTEGER | NOT NULL | ID người dùng |
| piece_id | VARCHAR(20) | NOT NULL | ID mảnh ghép (north/central/south/rare) |
| piece_name | VARCHAR(100) | NOT NULL | Tên mảnh ghép |
| province_id | INTEGER | NULL | ID tỉnh nhận được |
| acquired_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Thời gian nhận được |

**Indexes**:
- `idx_puzzle_pieces_user_piece` on `(user_id, piece_id)` UNIQUE
- `idx_puzzle_pieces_user_id` on `user_id`

---

### **3.2 Relationships**

```
users_game_state (1) ──< (many) user_province_progress
users_game_state (1) ──< (many) dice_rolls
users_game_state (1) ──< (many) rewards
users_game_state (1) ──< (many) checkins
users_game_state (1) ──< (many) puzzle_pieces

provinces (1) ──< (many) user_province_progress
provinces (1) ──< (many) dice_rolls
```

---

## **4. Sequence Diagrams**

### **4.1 Initialize Game**

```
User → API: POST /game/initialize
API → DB: Check if user exists in users_game_state
DB → API: Not found
API → DB: Insert new record (10 turns)
API → DB: Insert 34 records in user_province_progress (not_started)
DB → API: Success
API → User: Return game state
```

---

### **4.2 Roll Dice**

```
User → API: POST /game/province/{id}/roll-dice
API → DB: Check user_turns > 0
API → DB: Get current position
API → Logic: Random dice (1-6)
API → Logic: Calculate new position
API → Logic: Determine square type
API → Logic: Calculate reward (random based on square type)
API → DB: Update user_province_progress (new_position)
API → DB: Update users_game_state (decrease turns, update reward if money)
API → DB: Insert dice_rolls log
API → DB: Insert rewards log
API → Wallet API: Add money to wallet (if reward is money) [Async]
API → User: Return dice result + reward
```

---

### **4.3 Daily Check-in**

```
User → API: POST /game/checkin
API → DB: Check last_checkin_date != today
DB → API: Last checkin was yesterday
API → DB: Insert checkin record
API → DB: Update users_game_state (add 3 turns, update last_checkin_date)
DB → API: Success
API → User: Return checkin result
```

---

### **4.4 Claim Puzzle Reward**

```
User → API: POST /game/puzzle-pieces/claim-reward
API → DB: Check has all 4 puzzle pieces
API → DB: Check puzzle_reward_claimed = false
API → Wallet API: Add 20000 VNĐ to wallet [Sync]
Wallet API → API: Transaction ID
API → DB: Update users_game_state (puzzle_reward_claimed = true)
API → DB: Insert rewards log
API → User: Return reward confirmation
```

---

## **5. Integration Points**

### **5.1 Wallet System Integration**

**Endpoint**: `POST /wallet/add-reward`
**Method**: HTTP POST
**Auth**: Service-to-service token

**Request**:
```json
{
  "user_id": 12345,
  "amount": 200,
  "source": "minigame_tet",
  "description": "Thưởng minigame Cưỡi ngựa vàng",
  "transaction_ref": "MG_20260128_123456"
}
```

**Response**:
```json
{
  "success": true,
  "transaction_id": "TXN_20260128_123456",
  "new_balance": 20268
}
```

**Error Handling**:
- Nếu wallet API fail → Retry 3 lần với exponential backoff
- Nếu vẫn fail → Log error và queue để retry sau (Celery task)
- User vẫn nhận thưởng trong game, nhưng tiền sẽ được cộng sau

---

### **5.2 User Authentication**

**Method**: JWT Token từ hệ thống Rovi Travel chính
**Header**: `Authorization: Bearer <token>`
**User Info**: Decode từ JWT để lấy `user_id`

---

## **6. Error Handling**

### **6.1 Common Error Codes**

| HTTP Code | Error Code | Meaning | Solution |
| :---: | :---: | :---: | :---: |
| 400 | GAME_NOT_INITIALIZED | Game chưa được khởi tạo | Call /game/initialize first |
| 400 | INSUFFICIENT_TURNS | Không đủ lượt chơi | Check-in hoặc chờ lượt mới |
| 400 | ALREADY_CHECKED_IN | Đã điểm danh hôm nay | Chờ ngày mai |
| 400 | PUZZLE_INCOMPLETE | Chưa đủ 4 mảnh ghép | Tiếp tục chơi |
| 400 | REWARD_ALREADY_CLAIMED | Đã nhận thưởng rồi | - |
| 404 | PROVINCE_NOT_FOUND | Tỉnh không tồn tại | Kiểm tra province_id |
| 404 | GAME_STATE_NOT_FOUND | Game state không tồn tại | Initialize game |
| 409 | PROVINCE_ALREADY_COMPLETED | Đã hoàn thành tỉnh này | Chọn tỉnh khác |
| 500 | WALLET_INTEGRATION_ERROR | Lỗi tích hợp ví | Retry sau |
| 500 | INTERNAL_ERROR | Lỗi server | Contact support |

---

## **7. Performance & Scalability**

### **7.1 Caching Strategy**

- **Redis Cache**:
  - User game state: TTL 5 phút
  - Provinces list: TTL 1 giờ
  - Check-in status: TTL đến end of day

### **7.2 Database Optimization**

- Indexes trên các foreign keys và columns thường query
- Partition `dice_rolls` và `rewards` theo tháng nếu cần
- Connection pooling với SQLAlchemy

### **7.3 Rate Limiting**

- Dice roll: 10 requests/minute per user
- Check-in: 1 request/day per user
- General API: 100 requests/minute per user

---

## **8. Security Considerations**

1. **Input Validation**: Validate tất cả inputs từ FE
2. **SQL Injection**: Sử dụng ORM (SQLAlchemy), không dùng raw SQL
3. **XSS**: Sanitize tất cả outputs
4. **CSRF**: Sử dụng JWT token, không cần CSRF token
5. **Rate Limiting**: Prevent abuse với rate limits
6. **Audit Log**: Log tất cả dice rolls và rewards để audit

---

## **9. Testing Requirements**

### **9.1 Unit Tests**

- Random logic functions
- Reward calculation
- Puzzle piece eligibility
- Check-in logic

### **9.2 Integration Tests**

- API endpoints
- Database operations
- Wallet integration (mock)

### **9.3 E2E Tests**

- Complete game flow từ initialize đến claim reward
- Multiple users playing simultaneously
- Edge cases (hết lượt, hoàn thành tỉnh, etc.)

---

## **10. Deployment**

### **10.1 Environment Variables**

```bash
DATABASE_URL=postgresql://user:pass@localhost/minigame
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=your-secret-key
WALLET_API_URL=https://api.rovitravel.com/wallet
WALLET_API_KEY=your-api-key
ENVIRONMENT=production|staging|development
```

### **10.2 Docker**

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## **11. Monitoring & Logging**

### **11.1 Metrics to Track**

- API response times
- Dice roll distribution (để verify random)
- Reward distribution
- User engagement (turns used per day)
- Puzzle completion rate
- Wallet integration success rate

### **11.2 Logging**

- Log level: INFO cho normal operations, ERROR cho exceptions
- Log format: JSON structured logs
- Log all dice rolls và rewards để audit trail

---

**Version**: 1.0
**Last Updated**: 2026-01-28
**Owner**: Backend Team
**Status**: Draft - Pending Review
