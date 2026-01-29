# **FE SPEC - MINIGAME CƯỠI NGỰA VÀNG - SĂN NGÀN LỘC**

**Công nghệ:** React  
**Framework:** Vite + React  
**Version:** 1.0  
**Last Updated:** 28/01/2026

---

## **1. Screen – API Mapping**

### **Screen 1 – Entry/Landing Screen**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Entry/Landing | Get Game State | GET | `/game/state` | Lấy trạng thái game hiện tại (lượt chơi, tiến độ, mảnh ghép) |
| Entry/Landing | Initialize Game | POST | `/game/initialize` | Khởi tạo game lần đầu (tặng 10 lượt) |

**Request/Response:**
- **GET `/game/state`**: 
  - Request: Không có body, lấy user_id từ JWT token
  - Response: `{ success: true, data: { user_id, current_turns, provinces_completed, puzzle_pieces, ... } }`
- **POST `/game/initialize`**: 
  - Request: Không có body
  - Response: `{ success: true, data: { user_id, current_turns: 10, ... } }`

---

### **Screen 2 – Rule Screen (Popup)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Rule Screen | - | - | - | Không cần API, chỉ hiển thị UI |

---

### **Screen 3 – Bản Đồ Việt Nam Tổng Quát (Map Overview)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Map Overview | Get Provinces List | GET | `/provinces` | Lấy danh sách 34 tỉnh và trạng thái (chưa chơi/đang chơi/hoàn thành) |
| Map Overview | Get Game State | GET | `/game/state` | Lấy tiến độ: số tỉnh đã hoàn thành, mảnh ghép đã có, lượt còn lại |
| Map Overview | Daily Check-in | POST | `/game/checkin` | Điểm danh nhận +3 lượt |

**Request/Response:**
- **GET `/provinces`**: 
  - Response: `{ success: true, data: { provinces: [{ province_id, province_name, region, status, current_position }, ...] } }`
- **GET `/game/state`**: 
  - Response: `{ success: true, data: { current_turns, provinces_completed, puzzle_pieces, checkin_available, ... } }`
- **POST `/game/checkin`**: 
  - Request: Không có body
  - Response: `{ success: true, data: { checkin_date, turns_added: 3, current_turns, next_checkin_date } }`

---

### **Screen 4 – Màn Hình Bàn Cờ Tỉnh (Province Board)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Province Board | Start Province Game | POST | `/game/province/{province_id}/start` | Bắt đầu chơi tỉnh, lấy board layout |
| Province Board | Roll Dice | POST | `/game/province/{province_id}/roll-dice` | Gieo xúc xắc (server-side random) |

**Request/Response:**
- **POST `/game/province/{province_id}/start`**: 
  - Request: Không có body
  - Response: `{ success: true, data: { province_id, province_name, current_position: 1, board_layout: [...] } }`
- **POST `/game/province/{province_id}/roll-dice`**: 
  - Request: Không có body
  - Response: `{ success: true, data: { dice_result: 1-6, previous_position, new_position, square_type, reward: {...}, current_turns, province_completed: boolean } }`

---

### **Screen 5 – Reward Popup**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Reward Popup | - | - | - | Dữ liệu reward đã có trong response của Roll Dice API |

**Note:** Reward được trả về trong response của `/game/province/{province_id}/roll-dice`. Nếu reward.type = "money", tiền đã được cộng vào ví thưởng tự động bởi backend.

---

### **Screen 6 – Puzzle Popup (Mảnh Ghép)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Puzzle Popup | Get Puzzle Pieces | GET | `/game/puzzle-pieces` | Lấy danh sách mảnh ghép đã có |
| Puzzle Popup | Claim Puzzle Reward | POST | `/game/puzzle-pieces/claim-reward` | Hoàn thành 4 mảnh ghép, nhận thưởng lớn |

**Request/Response:**
- **GET `/game/puzzle-pieces`**: 
  - Response: `{ success: true, data: { pieces: [...], total_acquired, can_claim_reward } }`
- **POST `/game/puzzle-pieces/claim-reward`**: 
  - Request: Không có body
  - Response: `{ success: true, data: { reward_amount: 20000, transaction_id, wallet_balance, message } }`

---

### **Screen 7 – Check-in Popup**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Check-in Popup | Daily Check-in | POST | `/game/checkin` | Đã có ở Screen 3 |

---

### **Screen 8 – Completion Popup (Hoàn thành 4 mảnh)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Completion Popup | Claim Puzzle Reward | POST | `/game/puzzle-pieces/claim-reward` | Đã có ở Screen 6 |

---

## **2. State Management**

### **2.1 Init State**

```javascript
const initialState = {
  // User Info
  userId: null,
  isInitialized: false,
  
  // Game Progress
  currentTurns: 0,
  provincesCompleted: 0,
  provincesTotal: 34,
  
  // Current Game
  currentProvinceId: null,
  currentProvinceName: null,
  currentPosition: null, // 1-20
  
  // Puzzle Pieces
  puzzlePieces: {
    north: false,
    central: false,
    south: false,
    rare: false
  },
  
  // Board State
  boardLayout: null, // Array of 20 tiles
  visitedTiles: [], // Array of tile positions visited
  
  // Check-in
  lastCheckinDate: null,
  checkinAvailable: true,
  
  // UI State
  isLoading: false,
  error: null,
  currentScreen: 'landing', // 'landing' | 'map' | 'board' | 'reward' | 'puzzle' | 'checkin'
  showRulePopup: false,
  showRewardPopup: false,
  showPuzzlePopup: false,
  showCheckinPopup: false,
  showCompletionPopup: false,
  
  // Reward Data
  lastReward: null, // { type, amount, ... }
  
  // Dice
  lastDiceResult: null // 1-6
}
```

---

### **2.2 Playing State**

```javascript
// Khi user đang chơi trên bàn cờ
{
  ...initialState,
  isInitialized: true,
  currentTurns: 5, // Ví dụ
  currentProvinceId: 1,
  currentProvinceName: "Hà Nội",
  currentPosition: 5,
  visitedTiles: [1, 2, 3, 4, 5],
  boardLayout: [
    { position: 1, square_type: "start", ... },
    { position: 2, square_type: "blessing", ... },
    // ... 20 tiles
  ],
  currentScreen: 'board',
  isLoading: false
}
```

---

### **2.3 Result State**

```javascript
// Sau khi nhận thưởng
{
  ...playingState,
  currentPosition: 8, // Vị trí mới sau khi di chuyển
  visitedTiles: [1, 2, 3, 4, 5, 6, 7, 8],
  lastDiceResult: 3,
  currentTurns: 4, // Giảm 1 sau lượt chơi
  currentScreen: 'reward',
  showRewardPopup: true,
  lastReward: {
    type: "money",
    amount: 200,
    message: "Chúc mừng bạn nhận được 200 VNĐ!"
  }
}
```

---

### **2.4 Error State**

```javascript
{
  ...currentState,
  isLoading: false,
  error: "Bạn đã hết lượt chơi. Hãy điểm danh để nhận thêm lượt!",
  currentScreen: 'map' // Hoặc screen hiện tại
}
```

---

### **2.5 State Management Implementation (React Context)**

```javascript
// contexts/GameContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react'

const GameContext = createContext()

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...state,
        isInitialized: true,
        userId: action.payload.user_id,
        currentTurns: action.payload.current_turns,
        provincesCompleted: action.payload.provinces_completed,
        puzzlePieces: {
          north: action.payload.has_north_piece || false,
          central: action.payload.has_central_piece || false,
          south: action.payload.has_south_piece || false,
          rare: action.payload.has_rare_piece || false
        },
        lastCheckinDate: action.payload.last_checkin_date,
        checkinAvailable: action.payload.checkin_available
      }
    
    case 'SET_CURRENT_PROVINCE':
      return {
        ...state,
        currentProvinceId: action.payload.province_id,
        currentProvinceName: action.payload.province_name,
        currentPosition: action.payload.current_position || 1,
        boardLayout: action.payload.board_layout,
        visitedTiles: action.payload.current_position ? [action.payload.current_position] : [1],
        currentScreen: 'board'
      }
    
    case 'ROLL_DICE':
      return {
        ...state,
        lastDiceResult: action.payload.dice_result,
        isLoading: true
      }
    
    case 'MOVE_PLAYER':
      return {
        ...state,
        currentPosition: action.payload.new_position,
        visitedTiles: [...state.visitedTiles, action.payload.new_position],
        currentTurns: action.payload.current_turns,
        lastDiceResult: action.payload.dice_result,
        isLoading: false
      }
    
    case 'RECEIVE_REWARD':
      return {
        ...state,
        lastReward: action.payload.reward,
        showRewardPopup: true,
        currentScreen: 'reward',
        // Update turns if reward is bonus_turn
        currentTurns: action.payload.reward.type === 'bonus_turn' 
          ? state.currentTurns + (action.payload.reward.turns_added || 0)
          : state.currentTurns
      }
    
    case 'RECEIVE_PUZZLE_PIECE':
      return {
        ...state,
        puzzlePieces: {
          ...state.puzzlePieces,
          [action.payload.piece_id]: true
        },
        showPuzzlePopup: true
      }
    
    case 'COMPLETE_PROVINCE':
      return {
        ...state,
        provincesCompleted: state.provincesCompleted + 1,
        currentTurns: state.currentTurns + 1, // +1 lượt khi hoàn thành tỉnh
        currentProvinceId: null,
        currentProvinceName: null,
        currentPosition: null,
        boardLayout: null,
        visitedTiles: [],
        currentScreen: 'map',
        showRewardPopup: false
      }
    
    case 'CHECK_IN':
      return {
        ...state,
        currentTurns: state.currentTurns + 3,
        lastCheckinDate: action.payload.checkin_date,
        checkinAvailable: false,
        showCheckinPopup: false
      }
    
    case 'CLAIM_PUZZLE_REWARD':
      return {
        ...state,
        showCompletionPopup: false,
        showPuzzlePopup: false,
        lastReward: {
          type: 'money',
          amount: action.payload.reward_amount,
          message: action.payload.message
        },
        showRewardPopup: true
      }
    
    case 'SET_SCREEN':
      return {
        ...state,
        currentScreen: action.payload
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    
    case 'CLOSE_POPUP':
      return {
        ...state,
        showRulePopup: false,
        showRewardPopup: false,
        showPuzzlePopup: false,
        showCheckinPopup: false,
        showCompletionPopup: false,
        error: null
      }
    
    default:
      return state
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Load game state on mount
  useEffect(() => {
    loadGameState()
  }, [])

  const loadGameState = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/minigame/v1/game/state', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
      
      if (response.status === 404) {
        // Game chưa được khởi tạo
        await initializeGame()
        return
      }
      
      const data = await response.json()
      if (data.success) {
        dispatch({ type: 'INITIALIZE_GAME', payload: data.data })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const initializeGame = async () => {
    try {
      const response = await fetch('/minigame/v1/game/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
      const data = await response.json()
      if (data.success) {
        dispatch({ type: 'INITIALIZE_GAME', payload: data.data })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}

// Helper function to get token
const getToken = () => {
  // Lấy token từ localStorage hoặc context của app chính
  return localStorage.getItem('auth_token') || ''
}
```

---

## **3. Validation**

### **3.1 Disable khi hết lượt**

**Rule:** Nếu `currentTurns === 0`, disable button "Gieo xúc xắc" và hiển thị thông báo.

**Implementation:**
```javascript
// components/ProvinceBoard.jsx
const { state, dispatch } = useGame()

const canRoll = state.currentTurns > 0 && !state.isLoading

const handleRollDice = async () => {
  if (state.currentTurns === 0) {
    dispatch({ 
      type: 'SET_ERROR', 
      payload: 'Bạn đã hết lượt chơi. Hãy điểm danh để nhận thêm lượt!' 
    })
    dispatch({ type: 'SET_SCREEN', payload: 'map' })
    return
  }
  
  // ... roll dice logic
}

<button 
  onClick={handleRollDice}
  disabled={!canRoll}
  className={!canRoll ? 'disabled' : ''}
>
  {state.currentTurns === 0 ? 'Hết lượt' : 'Gieo xúc xắc'}
</button>
```

**Validation Logic:**
```javascript
const validateRollDice = (state) => {
  if (state.currentTurns <= 0) {
    return {
      valid: false,
      error: 'Bạn đã hết lượt chơi. Hãy điểm danh để nhận thêm lượt!'
    }
  }
  if (state.isLoading) {
    return {
      valid: false,
      error: 'Đang xử lý, vui lòng đợi...'
    }
  }
  if (!state.currentProvinceId) {
    return {
      valid: false,
      error: 'Vui lòng chọn tỉnh để chơi'
    }
  }
  return { valid: true }
}
```

---

### **3.2 Prevent Double Click**

**Rule:** Disable button và set loading state khi đang xử lý request.

**Implementation:**
```javascript
const handleRollDice = async () => {
  const validation = validateRollDice(state)
  if (!validation.valid) {
    dispatch({ type: 'SET_ERROR', payload: validation.error })
    return
  }
  
  dispatch({ type: 'SET_LOADING', payload: true })
  
  try {
    const response = await fetch(
      `/minigame/v1/game/province/${state.currentProvinceId}/roll-dice`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      }
    )
    
    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.message || 'Có lỗi xảy ra')
    }
    
    // Update dice result
    dispatch({ 
      type: 'ROLL_DICE', 
      payload: { dice_result: data.data.dice_result } 
    })
    
    // Move player
    dispatch({ 
      type: 'MOVE_PLAYER', 
      payload: {
        new_position: data.data.new_position,
        current_turns: data.data.current_turns,
        dice_result: data.data.dice_result
      }
    })
    
    // Show reward if any
    if (data.data.reward) {
      dispatch({ 
        type: 'RECEIVE_REWARD', 
        payload: { reward: data.data.reward } 
      })
      
      // Check for puzzle piece
      if (data.data.reward.type === 'puzzle_piece') {
        dispatch({ 
          type: 'RECEIVE_PUZZLE_PIECE', 
          payload: { piece_id: data.data.reward.puzzle_piece.piece_id } 
        })
      }
    }
    
    // Check if province completed
    if (data.data.province_completed) {
      dispatch({ 
        type: 'COMPLETE_PROVINCE', 
        payload: { province_id: state.currentProvinceId } 
      })
    }
    
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message })
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false })
  }
}
```

**Debounce Implementation (Optional):**
```javascript
import { useRef, useCallback } from 'react'

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null)
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])
}

// Usage
const debouncedRollDice = useDebounce(handleRollDice, 500)
```

---

### **3.3 Validation Rules Summary**

| Validation | Condition | Action | Error Message |
| :---: | :---: | :---: | :---: |
| Roll Dice | `currentTurns === 0` | Disable button, show error | "Bạn đã hết lượt chơi" |
| Roll Dice | `isLoading === true` | Disable button | - |
| Roll Dice | `currentProvinceId === null` | Show error | "Vui lòng chọn tỉnh" |
| Check-in | `checkinAvailable === false` | Disable button | "Bạn đã điểm danh hôm nay" |
| Select Province | `currentTurns === 0` | Show popup | "Bạn đã hết lượt. Hãy điểm danh!" |
| Complete Province | `currentPosition !== 20` | Prevent action | - |
| Claim Puzzle Reward | `canClaimReward === false` | Disable button | "Chưa đủ 4 mảnh ghép" |

---

## **4. Event Tracking**

### **4.1 Event Tracking Table**

| Event Name | Trigger | Screen | Parameters | Note |
| :---: | :---: | :---: | :---: | :---: |
| `game_view` | Load screen | Landing/Rule | `{ screen: 'landing' }` | Track khi user vào minigame |
| `game_start` | Click "Bắt đầu chơi" | Rule | `{ userId, timestamp }` | Track khi user bắt đầu game |
| `game_initialized` | Game initialized | Landing | `{ userId, initialTurns: 10 }` | Track khi khởi tạo game |
| `map_view` | Load map screen | Map Overview | `{ completedProvinces: number }` | Track khi xem bản đồ |
| `province_select` | Click vào tỉnh | Map Overview | `{ provinceId, provinceName }` | Track khi chọn tỉnh |
| `province_start` | Start province game | Province Board | `{ provinceId, provinceName }` | Track khi bắt đầu chơi tỉnh |
| `dice_roll` | Click "Gieo xúc xắc" | Province Board | `{ provinceId, diceValue, remainingTurns }` | Track mỗi lần gieo xúc xắc |
| `player_move` | Player di chuyển | Province Board | `{ provinceId, fromPosition, toPosition, tileType }` | Track di chuyển |
| `reward_received` | Nhận thưởng | Reward Popup | `{ rewardType, rewardValue, provinceId }` | Track mỗi reward |
| `puzzle_piece_received` | Nhận mảnh ghép | Puzzle Popup | `{ pieceType, provinceId }` | Track khi nhận mảnh ghép |
| `province_complete` | Đến ô FINISH | Province Board | `{ provinceId, totalTurns, timeSpent }` | Track hoàn thành tỉnh |
| `puzzle_complete` | Đủ 4 mảnh ghép | Completion Popup | `{ rewardValue, totalProvinces }` | Track milestone lớn |
| `checkin_complete` | Điểm danh thành công | Check-in Popup | `{ date, turnsAdded: 3 }` | Track điểm danh |
| `puzzle_reward_claimed` | Nhận thưởng lớn | Completion Popup | `{ rewardAmount: 20000, totalProvinces }` | Track nhận thưởng 4 mảnh |
| `game_finish` | Nhận thưởng lớn | Completion Popup | `{ totalReward, totalProvinces }` | Track kết thúc game |

---

### **4.2 Event Tracking Implementation**

```javascript
// utils/analytics.js
export const trackEvent = (eventName, parameters = {}) => {
  // Integration with analytics service (Google Analytics, Mixpanel, etc.)
  if (window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      event_category: 'minigame_tet',
      event_label: 'Cưỡi ngựa vàng - Săn ngàn lộc'
    })
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Event:', eventName, parameters)
  }
  
  // Optional: Send to backend
  fetch('/minigame/v1/analytics/track', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      event: eventName,
      parameters,
      timestamp: new Date().toISOString(),
      userId: getUserId()
    })
  }).catch(err => console.error('Analytics error:', err))
}

// Usage in components
import { trackEvent } from '../utils/analytics'

const handleRollDice = async () => {
  trackEvent('dice_roll', {
    provinceId: state.currentProvinceId,
    remainingTurns: state.currentTurns
  })
  
  // ... roll dice logic
  const diceValue = await rollDice()
  
  trackEvent('player_move', {
    provinceId: state.currentProvinceId,
    diceValue,
    newPosition: newPosition
  })
  
  if (reward) {
    trackEvent('reward_received', {
      rewardType: reward.type,
      rewardValue: reward.amount || reward.turns_added,
      provinceId: state.currentProvinceId
    })
  }
}
```

---

## **5. Component Structure**

### **5.1 Component Tree**

```
App.jsx
├── GameProvider (Context)
│   ├── LandingScreen (Screen 1)
│   │   └── RulePopup (Screen 2)
│   ├── MapOverviewScreen (Screen 3)
│   │   ├── MapChart
│   │   ├── PlayerInfo (Lượt, Mảnh ghép)
│   │   ├── CheckInButton
│   │   └── CheckInPopup (Screen 7)
│   ├── ProvinceBoardScreen (Screen 4)
│   │   ├── BoardHeader
│   │   ├── BoardGame
│   │   │   ├── BoardTile (20 tiles)
│   │   │   └── PlayerMarker
│   │   ├── DiceRollScreen
│   │   │   └── Dice3D
│   │   └── PlayerInfo
│   ├── RewardPopup (Screen 5)
│   ├── PuzzlePopup (Screen 6)
│   └── CompletionPopup (Screen 8)
```

---

### **5.2 Key Components**

| Component | File Path | Props | State | Description |
| :---: | :---: | :---: | :---: | :---: |
| `App` | `src/App.jsx` | - | - | Root component, routing logic |
| `GameProvider` | `src/contexts/GameContext.jsx` | `children` | Global game state | Context provider |
| `LandingScreen` | `src/screens/LandingScreen.jsx` | - | `showRulePopup` | Entry screen |
| `RulePopup` | `src/components/RulePopup.jsx` | `onClose` | - | Rules explanation |
| `MapOverviewScreen` | `src/screens/MapOverviewScreen.jsx` | - | `selectedProvince` | Map với 34 tỉnh |
| `MapChart` | `src/components/MapChart.jsx` | `provinces, onProvinceClick` | - | Interactive map |
| `ProvinceBoardScreen` | `src/screens/ProvinceBoardScreen.jsx` | `provinceId` | `boardState` | Bàn cờ 20 ô |
| `BoardGame` | `src/components/BoardGame.jsx` | `provinceId, onClose` | `playerPosition` | Board container |
| `BoardTile` | `src/components/BoardTile.jsx` | `tile, position, isCurrent` | - | Individual tile |
| `DiceRollScreen` | `src/components/DiceRollScreen.jsx` | `onRollComplete` | `isRolling, diceValue` | Dice animation |
| `Dice3D` | `src/components/Dice3D.jsx` | `value` | - | 3D dice component |
| `RewardPopup` | `src/components/RewardPopup.jsx` | `reward, onClose` | - | Reward display |
| `PuzzlePopup` | `src/components/PuzzlePopup.jsx` | `puzzlePieces, onClose` | - | Puzzle pieces display |
| `CheckInPopup` | `src/components/CheckInPopup.jsx` | `onClose` | `canCheckIn` | Check-in modal |
| `CompletionPopup` | `src/components/CompletionPopup.jsx` | `reward, onClose` | - | 4 pieces completion |
| `PlayerInfo` | `src/components/PlayerInfo.jsx` | `turns, puzzlePieces` | - | Player stats |

---

## **6. Technical Implementation**

### **6.1 API Service Layer**

```javascript
// services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/minigame/v1'

const getToken = () => {
  return localStorage.getItem('auth_token') || ''
}

export const apiService = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || `API Error: ${response.statusText}`)
    }
    return response.json()
  },
  
  async post(endpoint, data = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || `API Error: ${response.statusText}`)
    }
    return response.json()
  }
}

// Usage
import { apiService } from '../services/api'

const loadGameState = async () => {
  try {
    const data = await apiService.get('/game/state')
    dispatch({ type: 'INITIALIZE_GAME', payload: data.data })
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message })
  }
}
```

---

### **6.2 Error Handling**

```javascript
// utils/errorHandler.js
export const handleApiError = (error, dispatch) => {
  let errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
  
  if (error.message) {
    // Error từ API response
    errorMessage = error.message
  } else if (error.response) {
    switch (error.response.status) {
      case 400:
        errorMessage = error.response.data?.message || 'Yêu cầu không hợp lệ.'
        break
      case 401:
        errorMessage = 'Vui lòng đăng nhập lại.'
        // Redirect to login
        break
      case 403:
        errorMessage = 'Bạn không có quyền thực hiện hành động này.'
        break
      case 404:
        errorMessage = 'Không tìm thấy dữ liệu.'
        break
      case 500:
        errorMessage = 'Lỗi server. Vui lòng thử lại sau.'
        break
      default:
        errorMessage = error.response.data?.message || errorMessage
    }
  }
  
  dispatch({ type: 'SET_ERROR', payload: errorMessage })
  
  // Show toast notification
  showToast(errorMessage, 'error')
}
```

---

### **6.3 Loading States**

```javascript
// components/LoadingSpinner.jsx
const LoadingSpinner = ({ message = 'Đang tải...' }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  )
}

// Usage
{state.isLoading && <LoadingSpinner message="Đang gieo xúc xắc..." />}
```

---

## **7. Styling Guidelines**

### **7.1 Color Palette**

```css
:root {
  /* Primary Colors - Tết Theme */
  --color-red-primary: #E53E3E;
  --color-red-dark: #C53030;
  --color-yellow-primary: #F6E05E;
  --color-yellow-dark: #D69E2E;
  
  /* Secondary Colors */
  --color-green-primary: #48BB78;
  --color-white: #FFFFFF;
  --color-blue-info: #4299E1;
  
  /* State Colors */
  --color-success: #48BB78;
  --color-warning: #F6E05E;
  --color-error: #E53E3E;
  --color-disabled: #A0AEC0;
  
  /* Background */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7FAFC;
  --bg-overlay: rgba(0, 0, 0, 0.5);
}
```

---

### **7.2 Typography**

```css
:root {
  /* Font Families */
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', 'Roboto', system-ui, sans-serif;
  
  /* Font Sizes */
  --font-size-h1: 28px;
  --font-size-h2: 22px;
  --font-size-body: 16px;
  --font-size-caption: 14px;
  --font-size-button: 18px;
  
  /* Font Weights */
  --font-weight-bold: 700;
  --font-weight-medium: 500;
  --font-weight-regular: 400;
}
```

---

### **7.3 Animation Guidelines**

```css
/* Dice Roll Animation */
@keyframes diceRoll {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

.dice-rolling {
  animation: diceRoll 1.5s ease-in-out;
}

/* Player Move Animation */
@keyframes slideTile {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

.tile-moving {
  animation: slideTile 0.5s ease-in-out;
}

/* Popup Animation */
@keyframes popupFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.popup {
  animation: popupFadeIn 0.3s ease-out;
}
```

---

## **8. Testing Strategy**

### **8.1 Unit Tests**

```javascript
// __tests__/GameContext.test.js
import { renderHook, act } from '@testing-library/react'
import { GameProvider, useGame } from '../contexts/GameContext'

describe('GameContext', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useGame(), {
      wrapper: GameProvider
    })
    
    expect(result.current.state.currentTurns).toBe(0)
    expect(result.current.state.isInitialized).toBe(false)
  })
  
  it('should update turns after check-in', () => {
    const { result } = renderHook(() => useGame(), {
      wrapper: GameProvider
    })
    
    act(() => {
      result.current.dispatch({
        type: 'CHECK_IN',
        payload: { checkin_date: '2026-01-28' }
      })
    })
    
    expect(result.current.state.currentTurns).toBe(3)
  })
})
```

---

## **9. Performance Optimization**

### **9.1 Code Splitting**

```javascript
// Lazy load screens
import { lazy, Suspense } from 'react'

const MapOverviewScreen = lazy(() => import('./screens/MapOverviewScreen'))
const ProvinceBoardScreen = lazy(() => import('./screens/ProvinceBoardScreen'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MapOverviewScreen />
    </Suspense>
  )
}
```

---

### **9.2 Memoization**

```javascript
// Memoize expensive calculations
import { useMemo } from 'react'

const MapOverviewScreen = () => {
  const provincesWithStatus = useMemo(() => {
    return provinces.map(province => ({
      ...province,
      status: getProvinceStatus(province.id)
    }))
  }, [provinces])
  
  // ...
}
```

---

## **10. Deployment Checklist**

- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Event tracking verified
- [ ] Responsive design tested (mobile/tablet)
- [ ] Performance optimized (bundle size < 1.5MB)
- [ ] Accessibility checked (WCAG AA)
- [ ] Cross-browser testing completed
- [ ] Analytics integration verified

---

## **11. Appendix**

### **11.1 Environment Variables**

```env
VITE_API_BASE_URL=https://api.rovitravel.com/minigame/v1
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_ENV=production
```

### **11.2 Dependencies**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@react-three/fiber": "^8.0.0",
    "@react-three/drei": "^9.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.0.0",
    "@testing-library/react": "^14.0.0"
  }
}
```

---

**Tài liệu này được tạo dựa trên BA Spec và BE API Spec, cần được review bởi Frontend Lead và Tech Lead trước khi bắt đầu development.**

**Version:** 1.0  
**Last Updated:** 28/01/2026  
**Owner:** Frontend Team  
**Status:** Draft - Pending Review
