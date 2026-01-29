# ĐỀ XUẤT KIẾN TRÚC HỆ THỐNG - MINIGAME CƯỠI NGỰA VÀNG

**Timeline**: 1 tuần  
**Yêu cầu**: Backend + Frontend  
**Tech Stack**: Python (Backend), React (Frontend), MongoDB (Database), RabbitMQ (Message Queue)

---

## TỔNG QUAN YÊU CẦU KỸ THUẬT

### Backend Requirements:
- API để lưu/load game state (vị trí Tebbi, lượt chơi, mảnh ghép)
- API tích hợp ví thưởng qua RabbitMQ (hoàn tiền - async processing)
- API điểm danh (check-in theo mốc thời gian)
- API tracking events (game_started, dice_rolled, reward_received, puzzle_completed)
- Xử lý business logic (random thưởng, tính toán mảnh ghép, validation)
- Consumer RabbitMQ để xử lý trả thưởng async

### Frontend Requirements:
- 4-5 màn hình core (Entry, Game, Reward Popup, Puzzle Popup, Check-in)
- Animation cơ bản (xúc xắc quay, Tebbi di chuyển, popup)
- Responsive mobile-first
- State management (game state, UI state)
- Tích hợp với API backend

### Database Requirements:
- Lưu game state per user (vị trí, lượt, mảnh ghép)
- Lưu lịch sử điểm danh
- Lưu lịch sử thưởng (để audit và tracking)
- Lưu trạng thái reward processing (pending, processing, completed, failed)

---

## KIẾN TRÚC HỆ THỐNG ĐỀ XUẤT

### **Kiến trúc tổng quan**

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                              │
│  React 18 + Vite                                        │
│  - Deploy trên server riêng (Nginx/static hosting)      │
│  - Build static files                                    │
└──────────────────┬──────────────────────────────────────┘
                   │ REST API (HTTPS)
┌──────────────────▼──────────────────────────────────────┐
│              BACKEND API SERVER                          │
│  Python + FastAPI                                       │
│  - Deploy trên server riêng                             │
│  - REST API endpoints                                   │
│  - /api/game/state (GET/POST)                           │
│  - /api/game/dice (POST)                                │
│  - /api/reward/claim (POST) → Publish to RabbitMQ       │
│  - /api/checkin (POST)                                  │
│  - /api/tracking (POST)                                 │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼────────┐   ┌───────▼────────┐
│   MONGODB      │   │   RABBITMQ     │
│   Database     │   │   Message Queue│
│                │   │                │
│ - game_state   │   │ - reward_queue │
│ - checkin_hist │   │   (trả thưởng) │
│ - reward_hist  │   └───────┬────────┘
└────────────────┘           │
                              │ Consume messages
                    ┌─────────▼─────────┐
                    │  REWARD WORKER    │
                    │  (Python Consumer)│
                    │  - Process reward │
                    │  - Call ví API    │
                    │  - Update DB      │
                    └───────────────────┘
```

### **Tech Stack**

**Frontend:**
- **Framework**: React 18 + Vite
- **State Management**: Zustand hoặc React Query (cho server state)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion hoặc CSS animations
- **HTTP Client**: Axios
- **Build Tool**: Vite (fast build, HMR)
- **Deploy**: Static files trên server riêng (Nginx)

**Backend:**
- **Runtime**: Python 3.11+
- **Framework**: FastAPI (async, auto docs, type-safe)
- **Database**: MongoDB (PyMongo hoặc Motor cho async)
- **Message Queue**: RabbitMQ (pika hoặc aio-pika cho async)
- **ORM/ODM**: Beanie (async MongoDB ODM) hoặc Motor (low-level)
- **Deploy**: Server riêng (Gunicorn + Uvicorn workers)

**Infrastructure:**
- **Server**: Server riêng (có sẵn)
- **Web Server**: Nginx (reverse proxy cho API + serve static files)
- **Process Manager**: Supervisor hoặc systemd (cho API server và RabbitMQ consumer)
- **Database**: MongoDB (có thể local hoặc remote)
- **Message Queue**: RabbitMQ (có thể local hoặc remote)

### **Ưu điểm**

✅ **Async Reward Processing**:
- RabbitMQ cho phép xử lý trả thưởng async, không block API response
- Có thể retry tự động nếu ví API lỗi
- Dễ scale worker khi traffic tăng

✅ **Kiểm soát tốt**:
- Full control over server và infrastructure
- Dễ debug với logs tập trung
- Có thể tối ưu performance theo nhu cầu

✅ **Flexible & Scalable**:
- RabbitMQ cho phép thêm nhiều workers khi cần
- MongoDB dễ scale horizontal
- Có thể thêm background jobs dễ dàng

✅ **Tech Stack Phù Hợp**:
- FastAPI: async, auto docs, type-safe
- MongoDB: NoSQL phù hợp với game state (flexible schema)
- RabbitMQ: Reliable message queue, đã có sẵn trong hệ thống

✅ **Phù hợp với Infrastructure Hiện Tại**:
- Tận dụng server riêng đã có
- Không cần setup infrastructure mới
- Dễ tích hợp với hệ thống hiện tại

### **Nhược điểm**

⚠️ **Setup phức tạp hơn**:
- Cần setup MongoDB connection
- Cần setup RabbitMQ connection và queues
- Cần deploy và monitor cả API server và worker

⚠️ **Cần quản lý nhiều services**:
- API server, MongoDB, RabbitMQ, Worker
- Cần monitor health của tất cả services
- Cần handle restarts, updates

⚠️ **Timeline có thể căng**:
- Setup mất 0.5-1 ngày
- Cần test integration giữa các services
- Có thể cần thời gian để debug issues

### **Timeline breakdown (1 tuần)**

- **Day 1**: Setup project structure, MongoDB schema, RabbitMQ queues, basic API endpoints
- **Day 2**: Implement core APIs (game state, dice roll), MongoDB models
- **Day 3**: Frontend core screens (Game Screen, Reward Popup)
- **Day 4**: Business logic (dice roll, reward calculation, puzzle system), RabbitMQ publisher
- **Day 5**: RabbitMQ consumer (reward worker), check-in system, integrations
- **Day 6**: Animation, polish UI/UX, error handling
- **Day 7**: Testing, bug fixes, deploy, monitoring setup

### **Code Structure Example**

```
minigame/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dice.tsx
│   │   │   ├── Map.tsx
│   │   │   ├── RewardPopup.tsx
│   │   │   └── PuzzlePopup.tsx
│   │   ├── pages/
│   │   │   ├── Entry.tsx
│   │   │   ├── Game.tsx
│   │   │   └── CheckIn.tsx
│   │   ├── hooks/
│   │   │   └── useGameState.ts
│   │   ├── lib/
│   │   │   └── api.ts          # API client
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── main.py             # FastAPI app entry
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── game.py     # Game endpoints
│   │   │   │   ├── reward.py   # Reward endpoints
│   │   │   │   └── checkin.py  # Check-in endpoints
│   │   │   └── dependencies.py # Auth, DB dependencies
│   │   ├── models/
│   │   │   ├── game_state.py   # MongoDB models
│   │   │   ├── checkin.py
│   │   │   └── reward.py
│   │   ├── services/
│   │   │   ├── game_service.py # Business logic
│   │   │   ├── reward_service.py
│   │   │   └── rabbitmq_client.py # RabbitMQ publisher
│   │   └── config.py           # Config, env vars
│   ├── workers/
│   │   └── reward_worker.py    # RabbitMQ consumer
│   ├── requirements.txt
│   └── .env.example
├── docker-compose.yml          # Local dev (MongoDB, RabbitMQ)
└── README.md
```

---

## CHI TIẾT IMPLEMENTATION

### **Database Schema (MongoDB)**

```python
# models/game_state.py
from beanie import Document
from datetime import datetime
from typing import List, Optional

class GameState(Document):
    user_id: str  # Primary key
    current_position: int = 1  # 1-34
    current_round: int = 1
    remaining_turns: int = 3
    puzzle_pieces: List[str] = []  # ["xuan_bac", "xuan_trung", "xuan_nam", "xuan_bien_dao"]
    total_rewards: int = 0
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    
    class Settings:
        name = "game_states"
        indexes = ["user_id"]

# models/checkin.py
class CheckIn(Document):
    user_id: str
    checkin_time: datetime
    time_slot: str  # "08:00", "12:00", "18:00", "22:00"
    reward_turns: int = 1
    created_at: datetime = datetime.now()
    
    class Settings:
        name = "checkins"
        indexes = [
            "user_id",
            ("user_id", "checkin_time"),
            ("user_id", "time_slot")
        ]

# models/reward.py
class Reward(Document):
    user_id: str
    reward_type: str  # "money", "message", "turns"
    reward_value: dict  # {amount: 5000} or {turns: 1} or {message: "..."}
    province_position: Optional[int] = None
    status: str = "pending"  # "pending", "processing", "completed", "failed"
    rabbitmq_message_id: Optional[str] = None
    error_message: Optional[str] = None
    created_at: datetime = datetime.now()
    completed_at: Optional[datetime] = None
    
    class Settings:
        name = "rewards"
        indexes = [
            "user_id",
            "status",
            "created_at"
        ]
```

### **RabbitMQ Setup**

```python
# config/rabbitmq.py
RABBITMQ_CONFIG = {
    "host": "localhost",  # hoặc IP của RabbitMQ server
    "port": 5672,
    "username": "guest",
    "password": "guest",
    "exchange": "minigame_exchange",
    "reward_queue": "reward_queue",
    "reward_routing_key": "reward.process"
}

# Setup queues và exchanges (chạy một lần để init)
# Queue: reward_queue (durable=True)
# Exchange: minigame_exchange (type=direct, durable=True)
# Binding: reward_queue -> minigame_exchange (routing_key="reward.process")
```

### **API Endpoints Structure**

```
GET  /api/game/state          # Lấy game state của user
POST /api/game/dice           # Gieo xúc xắc, di chuyển Tebbi
POST /api/game/reset-round    # Reset vòng sau khi hoàn thành 4 mảnh
POST /api/reward/claim        # Claim reward → Publish to RabbitMQ (async)
GET  /api/reward/status/:id   # Kiểm tra trạng thái reward processing
POST /api/checkin             # Điểm danh tại mốc thời gian
GET  /api/checkin/status      # Kiểm tra trạng thái điểm danh hôm nay
POST /api/tracking            # Track events (analytics)
```

### **RabbitMQ Flow cho Reward Processing**

```
1. User nhận reward (tiền) → API /api/reward/claim
   ↓
2. API tạo Reward document với status="pending"
   ↓
3. API publish message vào RabbitMQ queue "reward_queue"
   Message payload:
   {
     "reward_id": "mongodb_id",
     "user_id": "user123",
     "reward_type": "money",
     "reward_value": {"amount": 5000},
     "timestamp": "2025-01-27T10:00:00Z"
   }
   ↓
4. API response ngay lập tức: {"status": "processing", "reward_id": "..."}
   ↓
5. Reward Worker (consumer) nhận message
   ↓
6. Worker update Reward status="processing"
   ↓
7. Worker call ví thưởng API
   ↓
8. Nếu thành công:
   - Update Reward status="completed"
   - Update GameState.total_rewards
   - Acknowledge message
   ↓
9. Nếu thất bại:
   - Update Reward status="failed", error_message
   - Retry logic (max 3 lần với exponential backoff)
   - Nếu vẫn fail → Dead letter queue để xử lý sau
```

### **Reward Worker Implementation**

```python
# workers/reward_worker.py
import asyncio
import aio_pika
from app.models.reward import Reward
from app.services.ví_api import VíAPI

async def process_reward(message: aio_pika.IncomingMessage):
    async with message.process():
        payload = json.loads(message.body)
        reward_id = payload["reward_id"]
        
        # Update status to processing
        reward = await Reward.get(reward_id)
        reward.status = "processing"
        await reward.save()
        
        try:
            # Call ví thưởng API
            ví_api = VíAPI()
            result = await ví_api.add_money(
                user_id=payload["user_id"],
                amount=payload["reward_value"]["amount"]
            )
            
            # Update status to completed
            reward.status = "completed"
            reward.completed_at = datetime.now()
            await reward.save()
            
            # Update game state
            game_state = await GameState.find_one(GameState.user_id == payload["user_id"])
            game_state.total_rewards += payload["reward_value"]["amount"]
            await game_state.save()
            
        except Exception as e:
            # Update status to failed
            reward.status = "failed"
            reward.error_message = str(e)
            await reward.save()
            # Message sẽ được retry hoặc move to DLQ

async def main():
    connection = await aio_pika.connect_robust(
        "amqp://guest:guest@localhost/"
    )
    channel = await connection.channel()
    queue = await channel.declare_queue("reward_queue", durable=True)
    
    await queue.consume(process_reward)
    await asyncio.Future()  # Run forever
```

### **Frontend State Management**

```typescript
// hooks/useGameState.ts
interface GameState {
  currentPosition: number;      // 1-34
  currentRound: number;
  remainingTurns: number;
  puzzlePieces: string[];      // ["xuan_bac", ...]
  totalRewards: number;
  isLoading: boolean;
  error: string | null;
}

interface RewardStatus {
  rewardId: string;
  status: "pending" | "processing" | "completed" | "failed";
}

// Actions
- loadGameState()
- rollDice()
- claimReward() → Returns rewardId, poll status
- checkRewardStatus(rewardId) → Poll status until completed
- checkIn()
- resetRound()
```

### **Deployment Checklist**

**Frontend:**
- [ ] Build production: `npm run build`
- [ ] Copy dist/ folder lên server
- [ ] Config Nginx để serve static files
- [ ] Set environment variables (API_URL)
- [ ] Test frontend

**Backend API Server:**
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Set environment variables (.env):
  - MONGODB_URL
  - RABBITMQ_URL
  - VÍ_API_URL, VÍ_API_KEY
  - SECRET_KEY
- [ ] Run với Gunicorn + Uvicorn:
  ```bash
  gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
  ```
- [ ] Config Nginx reverse proxy cho API
- [ ] Setup Supervisor/systemd để auto-restart
- [ ] Test API endpoints

**MongoDB:**
- [ ] Install MongoDB (nếu chưa có)
- [ ] Create database: `minigame`
- [ ] Create indexes (tự động qua Beanie models)
- [ ] Test connection

**RabbitMQ:**
- [ ] Install RabbitMQ (nếu chưa có)
- [ ] Create exchange: `minigame_exchange` (type=direct, durable)
- [ ] Create queue: `reward_queue` (durable)
- [ ] Bind queue to exchange với routing_key: `reward.process`
- [ ] Setup Dead Letter Queue (optional, cho failed messages)
- [ ] Test connection

**Reward Worker:**
- [ ] Deploy worker script
- [ ] Setup Supervisor/systemd để chạy worker
- [ ] Test worker consume messages
- [ ] Monitor worker logs

**Nginx Config:**
```nginx
# Frontend
server {
    listen 80;
    server_name minigame.example.com;
    root /var/www/minigame/frontend/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Backend API
server {
    listen 80;
    server_name api.minigame.example.com;
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Integrations:**
- [ ] Ví thưởng API integration
- [ ] Test reward flow end-to-end
- [ ] Analytics tracking (nếu có)
- [ ] Monitoring và logging setup

---

## TÀI LIỆU THAM KHẢO

### Backend:
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Beanie (MongoDB ODM)](https://beanie-odm.dev/)
- [aio-pika (RabbitMQ async client)](https://aio-pika.readthedocs.io/)
- [Gunicorn + Uvicorn](https://www.uvicorn.org/deployment/)

### Frontend:
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Zustand State Management](https://zustand-demo.pmnd.rs/)
- [React Query](https://tanstack.com/query/latest)

### Infrastructure:
- [MongoDB Manual](https://www.mongodb.com/docs/)
- [RabbitMQ Tutorials](https://www.rabbitmq.com/getstarted.html)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Supervisor Process Manager](http://supervisord.org/)

---

## LƯU Ý QUAN TRỌNG

### **Timeline 1 tuần - Ưu tiên:**

1. **Day 1-2**: Setup infrastructure và core APIs (quan trọng nhất)
   - MongoDB connection và models
   - RabbitMQ setup và basic publisher
   - Core game APIs (state, dice)

2. **Day 3-4**: Frontend và business logic
   - Frontend screens cơ bản
   - Reward calculation logic
   - RabbitMQ consumer (worker) - có thể làm đơn giản trước

3. **Day 5-6**: Polish và integration
   - Animation
   - Error handling
   - End-to-end testing

4. **Day 7**: Deploy và bug fixes

### **Rủi ro và Giải pháp:**

⚠️ **RabbitMQ setup phức tạp**:
- Giải pháp: Có thể làm sync trước (call ví API trực tiếp), sau đó refactor sang async

⚠️ **MongoDB connection issues**:
- Giải pháp: Dùng connection pooling, handle reconnection

⚠️ **Worker crash**:
- Giải pháp: Setup Supervisor với auto-restart, monitor logs

⚠️ **Timeline căng**:
- Giải pháp: Ưu tiên core features, bỏ các tính năng optional (check-in có thể làm đơn giản hơn)

---

**Tech Stack Summary**: Python (FastAPI) + React + MongoDB + RabbitMQ - Phù hợp với infrastructure hiện tại và yêu cầu async reward processing.
