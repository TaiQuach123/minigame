# **TÀI LIỆU FE SPEC - MINIGAME CƯỠI NGỰA VÀNG - SĂN NGÀN LỘC**

**Công nghệ:** React  
**Framework:** Vite + React  
**Version:** 1.0  
**Last Updated:** 28/01/2026

---

## **1. SCREEN – API MAPPING**

### **1.1 Screen 1 – Entry/Landing Screen**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Entry/Landing | Get User Game State | GET | `/api/game/state` | Lấy trạng thái game hiện tại (lượt chơi, tiến độ, mảnh ghép) |
| Entry/Landing | Initialize Game | POST | `/api/game/initialize` | Khởi tạo game lần đầu (tặng 10 lượt) |

**Request/Response:**
- **GET `/api/game/state`**: Lấy thông tin user game state
- **POST `/api/game/initialize`**: Khởi tạo game mới cho user

---

### **1.2 Screen 2 – Rule Screen (Popup)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Rule Screen | - | - | - | Không cần API, chỉ hiển thị UI |

---

### **1.3 Screen 3 – Bản Đồ Việt Nam Tổng Quát (Map Overview)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Map Overview | Get Provinces Status | GET | `/api/game/provinces` | Lấy danh sách 34 tỉnh và trạng thái (chưa chơi/đang chơi/hoàn thành) |
| Map Overview | Get User Progress | GET | `/api/game/progress` | Lấy tiến độ: số tỉnh đã hoàn thành, mảnh ghép đã có |
| Map Overview | Get Remaining Turns | GET | `/api/game/turns` | Lấy số lượt còn lại |
| Map Overview | Check-in Daily | POST | `/api/game/checkin` | Điểm danh nhận +3 lượt |

**Request/Response:**
- **GET `/api/game/provinces`**: Trả về danh sách tỉnh với status (not_started, in_progress, completed)
- **GET `/api/game/progress`**: Trả về progress object { completedProvinces: number, puzzlePieces: array }
- **GET `/api/game/turns`**: Trả về { remainingTurns: number }
- **POST `/api/game/checkin`**: Request body: { date: string }, Response: { success: boolean, turnsAdded: number }

---

### **1.4 Screen 4 – Màn Hình Bàn Cờ Tỉnh (Province Board)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Province Board | Get Board State | GET | `/api/game/board/{provinceId}` | Lấy trạng thái bàn cờ tỉnh (vị trí hiện tại, ô đã đi qua) |
| Province Board | Roll Dice | POST | `/api/game/dice/roll` | Gieo xúc xắc (server-side random) |
| Province Board | Move Player | POST | `/api/game/move` | Di chuyển player và nhận thưởng |
| Province Board | Complete Province | POST | `/api/game/province/complete` | Hoàn thành tỉnh khi đến ô FINISH |

**Request/Response:**
- **GET `/api/game/board/{provinceId}`**: Trả về { currentPosition: number, visitedTiles: array, provinceId: string }
- **POST `/api/game/dice/roll`**: Request body: { provinceId: string }, Response: { diceValue: number (1-6) }
- **POST `/api/game/move`**: Request body: { provinceId: string, diceValue: number }, Response: { newPosition: number, reward: object }
- **POST `/api/game/province/complete`**: Request body: { provinceId: string }, Response: { success: boolean, reward: object, puzzlePiece: object|null }

---

### **1.5 Screen 5 – Reward Popup**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Reward Popup | Update Wallet | POST | `/api/wallet/add` | Cộng tiền vào ví thưởng |
| Reward Popup | Get Reward Info | GET | `/api/game/reward/{rewardId}` | Lấy thông tin chi tiết reward (nếu cần) |

**Request/Response:**
- **POST `/api/wallet/add`**: Request body: { amount: number, source: string }, Response: { success: boolean, newBalance: number }
- **GET `/api/game/reward/{rewardId}`**: Trả về reward details

---

### **1.6 Screen 6 – Puzzle Popup (Mảnh Ghép)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Puzzle Popup | Get Puzzle Pieces | GET | `/api/game/puzzle` | Lấy danh sách mảnh ghép đã có |
| Puzzle Popup | Complete Puzzle | POST | `/api/game/puzzle/complete` | Hoàn thành 4 mảnh ghép, nhận thưởng lớn |

**Request/Response:**
- **GET `/api/game/puzzle`**: Trả về { pieces: array, completed: boolean }
- **POST `/api/game/puzzle/complete`**: Response: { success: boolean, reward: object (20,000 VNĐ) }

---

### **1.7 Screen 7 – Check-in Popup**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Check-in Popup | Check-in Daily | POST | `/api/game/checkin` | Điểm danh nhận +3 lượt (đã có ở Screen 3) |

---

### **1.8 Screen 8 – Completion Popup (Hoàn thành 4 mảnh)**

| Screen | API | Method | Endpoint | Note |
| :---: | :---: | :---: | :---: | :---: |
| Completion Popup | Complete Puzzle | POST | `/api/game/puzzle/complete` | Đã có ở Screen 6 |

---

## **2. STATE MANAGEMENT**

### **2.1 Global State Structure (React Context)**

```javascript
// GameContext.js
const GameState = {
  // User Info
  userId: string,
  isInitialized: boolean,
  
  // Game Progress
  remainingTurns: number,
  completedProvinces: number[], // Array of province IDs
  currentProvince: string | null, // Province ID đang chơi
  
  // Puzzle Pieces
  puzzlePieces: {
    north: boolean,      // Mảnh Bắc
    central: boolean,   // Mảnh Trung
    south: boolean,     // Mảnh Nam
    rare: boolean       // Mảnh Hiếm
  },
  
  // Board State
  boardState: {
    provinceId: string,
    currentPosition: number, // 1-20
    visitedTiles: number[], // Array of tile positions
    lastDiceRoll: number | null
  },
  
  // Check-in
  checkInStatus: {
    lastCheckInDate: string | null,
    canCheckIn: boolean
  },
  
  // UI State
  ui: {
    currentScreen: 'landing' | 'map' | 'board' | 'reward' | 'puzzle' | 'checkin',
    isLoading: boolean,
    error: string | null,
    showRulePopup: boolean
  }
}
```

### **2.2 State Flow**

#### **Init State**
```javascript
const initialState = {
  userId: null,
  isInitialized: false,
  remainingTurns: 0,
  completedProvinces: [],
  currentProvince: null,
  puzzlePieces: {
    north: false,
    central: false,
    south: false,
    rare: false
  },
  boardState: null,
  checkInStatus: {
    lastCheckInDate: null,
    canCheckIn: true
  },
  ui: {
    currentScreen: 'landing',
    isLoading: true,
    error: null,
    showRulePopup: false
  }
}
```

#### **Playing State**
```javascript
// Khi user đang chơi trên bàn cờ
{
  ...initialState,
  isInitialized: true,
  remainingTurns: 5, // Ví dụ
  currentProvince: 'ha-noi',
  boardState: {
    provinceId: 'ha-noi',
    currentPosition: 5,
    visitedTiles: [1, 2, 3, 4, 5],
    lastDiceRoll: null
  },
  ui: {
    currentScreen: 'board',
    isLoading: false
  }
}
```

#### **Result State**
```javascript
// Sau khi nhận thưởng
{
  ...playingState,
  boardState: {
    ...boardState,
    currentPosition: 8, // Vị trí mới sau khi di chuyển
    lastDiceRoll: 3
  },
  ui: {
    currentScreen: 'reward',
    showRewardPopup: true,
    rewardData: {
      type: 'money',
      amount: 2006,
      message: 'Chúc mừng bạn nhận được 2.026 VNĐ!'
    }
  }
}
```

#### **Error State**
```javascript
{
  ...currentState,
  ui: {
    ...ui,
    error: 'Bạn đã hết lượt chơi',
    isLoading: false
  }
}
```

### **2.3 Context Provider Implementation**

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
        remainingTurns: action.payload.turns,
        ...action.payload
      }
    case 'ROLL_DICE':
      return {
        ...state,
        boardState: {
          ...state.boardState,
          lastDiceRoll: action.payload.diceValue
        }
      }
    case 'MOVE_PLAYER':
      return {
        ...state,
        boardState: {
          ...state.boardState,
          currentPosition: action.payload.newPosition,
          visitedTiles: [...state.boardState.visitedTiles, action.payload.newPosition]
        },
        remainingTurns: state.remainingTurns - 1
      }
    case 'RECEIVE_REWARD':
      return {
        ...state,
        // Update based on reward type
      }
    case 'COMPLETE_PROVINCE':
      return {
        ...state,
        completedProvinces: [...state.completedProvinces, action.payload.provinceId],
        remainingTurns: state.remainingTurns + 1, // +1 lượt khi hoàn thành tỉnh
        currentProvince: null,
        boardState: null
      }
    case 'RECEIVE_PUZZLE_PIECE':
      return {
        ...state,
        puzzlePieces: {
          ...state.puzzlePieces,
          [action.payload.pieceType]: true
        }
      }
    case 'CHECK_IN':
      return {
        ...state,
        remainingTurns: state.remainingTurns + 3,
        checkInStatus: {
          lastCheckInDate: new Date().toISOString(),
          canCheckIn: false
        }
      }
    case 'SET_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload
        }
      }
    case 'SET_LOADING':
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: action.payload
        }
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
      const response = await fetch('/api/game/state')
      const data = await response.json()
      dispatch({ type: 'INITIALIZE_GAME', payload: data })
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
```

---

## **3. VALIDATION**

### **3.1 Disable khi hết lượt**

**Rule:** Nếu `remainingTurns === 0`, disable button "Gieo xúc xắc" và hiển thị thông báo.

**Implementation:**
```javascript
// components/ProvinceBoard.jsx
const { state } = useGame()
const canRoll = state.remainingTurns > 0 && !state.ui.isLoading

<button 
  onClick={handleRollDice}
  disabled={!canRoll}
  className={!canRoll ? 'disabled' : ''}
>
  {state.remainingTurns === 0 ? 'Hết lượt' : 'Gieo xúc xắc'}
</button>
```

**Validation Logic:**
```javascript
const validateRollDice = () => {
  if (state.remainingTurns <= 0) {
    dispatch({ type: 'SET_ERROR', payload: 'Bạn đã hết lượt chơi. Hãy điểm danh để nhận thêm lượt!' })
    return false
  }
  if (state.ui.isLoading) {
    return false // Prevent double click
  }
  if (!state.currentProvince) {
    dispatch({ type: 'SET_ERROR', payload: 'Vui lòng chọn tỉnh để chơi' })
    return false
  }
  return true
}
```

### **3.2 Prevent Double Click**

**Rule:** Disable button và set loading state khi đang xử lý request.

**Implementation:**
```javascript
const handleRollDice = async () => {
  if (!validateRollDice()) return
  
  dispatch({ type: 'SET_LOADING', payload: true })
  
  try {
    // Disable button during API call
    const response = await fetch('/api/game/dice/roll', {
      method: 'POST',
      body: JSON.stringify({ provinceId: state.currentProvince })
    })
    
    const data = await response.json()
    dispatch({ type: 'ROLL_DICE', payload: { diceValue: data.diceValue } })
    
    // Move player
    await handleMovePlayer(data.diceValue)
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message })
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false })
  }
}
```

**Debounce Implementation (Optional):**
```javascript
import { useRef } from 'react'

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null)
  
  return (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

// Usage
const debouncedRollDice = useDebounce(handleRollDice, 500)
```

### **3.3 Validation Rules Summary**

| Validation | Condition | Action | Error Message |
| :---: | :---: | :---: | :---: |
| Roll Dice | `remainingTurns === 0` | Disable button, show error | "Bạn đã hết lượt chơi" |
| Roll Dice | `isLoading === true` | Disable button | - |
| Roll Dice | `currentProvince === null` | Show error | "Vui lòng chọn tỉnh" |
| Check-in | `canCheckIn === false` | Disable button | "Bạn đã điểm danh hôm nay" |
| Select Province | `remainingTurns === 0` | Show popup | "Bạn đã hết lượt. Hãy điểm danh!" |
| Complete Province | `currentPosition !== 20` | Prevent action | - |

---

## **4. EVENT TRACKING**

### **4.1 Event Tracking Table**

| Event Name | Trigger | Screen | Parameters | Note |
| :---: | :---: | :---: | :---: | :---: |
| `game_view` | Load screen | Landing/Rule | `{ screen: 'landing' }` | Track khi user vào minigame |
| `game_start` | Click "Bắt đầu chơi" | Rule | `{ userId, timestamp }` | Track khi user bắt đầu game |
| `map_view` | Load map screen | Map Overview | `{ completedProvinces: number }` | Track khi xem bản đồ |
| `province_select` | Click vào tỉnh | Map Overview | `{ provinceId, provinceName }` | Track khi chọn tỉnh |
| `dice_roll` | Click "Gieo xúc xắc" | Province Board | `{ provinceId, diceValue, remainingTurns }` | Track mỗi lần gieo xúc xắc |
| `player_move` | Player di chuyển | Province Board | `{ provinceId, fromPosition, toPosition, tileType }` | Track di chuyển |
| `reward_received` | Nhận thưởng | Reward Popup | `{ rewardType, rewardValue, provinceId }` | Track mỗi reward |
| `puzzle_piece_received` | Nhận mảnh ghép | Puzzle Popup | `{ pieceType, provinceId }` | Track khi nhận mảnh ghép |
| `province_complete` | Đến ô FINISH | Province Board | `{ provinceId, totalTurns, timeSpent }` | Track hoàn thành tỉnh |
| `puzzle_complete` | Đủ 4 mảnh ghép | Completion Popup | `{ rewardValue, totalProvinces }` | Track milestone lớn |
| `checkin_complete` | Điểm danh thành công | Check-in Popup | `{ date, turnsAdded }` | Track điểm danh |
| `game_finish` | Nhận thưởng lớn | Completion Popup | `{ totalReward, totalProvinces }` | Track kết thúc game |

### **4.2 Event Tracking Implementation**

```javascript
// utils/analytics.js
export const trackEvent = (eventName, parameters = {}) => {
  // Integration with analytics service (Google Analytics, Mixpanel, etc.)
  if (window.gtag) {
    window.gtag('event', eventName, parameters)
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Event:', eventName, parameters)
  }
  
  // Optional: Send to backend
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    provinceId: state.currentProvince,
    remainingTurns: state.remainingTurns
  })
  
  // ... roll dice logic
  const diceValue = await rollDice()
  
  trackEvent('player_move', {
    provinceId: state.currentProvince,
    diceValue,
    newPosition: newPosition
  })
}
```

---

## **5. COMPONENT STRUCTURE**

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
│   │   └── CheckInPopup (Screen 6)
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

### **5.2 Component List**

| Component | File Path | Props | State | Description |
| :---: | :---: | :---: | :---: | :---: |
| `App` | `src/App.jsx` | - | `currentScreen` | Root component, routing logic |
| `GameProvider` | `src/contexts/GameContext.jsx` | `children` | Global game state | Context provider |
| `LandingScreen` | `src/screens/LandingScreen.jsx` | - | `showRulePopup` | Entry screen |
| `RulePopup` | `src/components/RulePopup.jsx` | `onClose` | - | Rules explanation |
| `MapOverviewScreen` | `src/screens/MapOverviewScreen.jsx` | - | `selectedProvince` | Map với 34 tỉnh |
| `MapChart` | `src/components/MapChart.jsx` | `mapData, onProvinceClick` | - | Interactive map |
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

### **5.3 Key Components Implementation**

#### **5.3.1 MapOverviewScreen**

```javascript
// screens/MapOverviewScreen.jsx
import { useState, useEffect } from 'react'
import { useGame } from '../contexts/GameContext'
import MapChart from '../components/MapChart'
import PlayerInfo from '../components/PlayerInfo'
import CheckInPopup from '../components/CheckInPopup'
import { trackEvent } from '../utils/analytics'

const MapOverviewScreen = () => {
  const { state, dispatch } = useGame()
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [provinces, setProvinces] = useState([])

  useEffect(() => {
    trackEvent('map_view', {
      completedProvinces: state.completedProvinces.length
    })
    loadProvinces()
  }, [])

  const loadProvinces = async () => {
    const response = await fetch('/api/game/provinces')
    const data = await response.json()
    setProvinces(data.provinces)
  }

  const handleProvinceClick = (provinceId) => {
    if (state.remainingTurns === 0) {
      // Show error popup
      return
    }
    
    trackEvent('province_select', { provinceId })
    dispatch({ type: 'SET_CURRENT_PROVINCE', payload: provinceId })
    // Navigate to board screen
  }

  return (
    <div className="map-overview-screen">
      <PlayerInfo 
        turns={state.remainingTurns}
        puzzlePieces={state.puzzlePieces}
      />
      <MapChart 
        provinces={provinces}
        onProvinceClick={handleProvinceClick}
        completedProvinces={state.completedProvinces}
      />
      {showCheckIn && (
        <CheckInPopup onClose={() => setShowCheckIn(false)} />
      )}
    </div>
  )
}
```

#### **5.3.2 ProvinceBoardScreen**

```javascript
// screens/ProvinceBoardScreen.jsx
import { useState, useEffect } from 'react'
import { useGame } from '../contexts/GameContext'
import BoardGame from '../components/BoardGame'
import DiceRollScreen from '../components/DiceRollScreen'
import RewardPopup from '../components/RewardPopup'
import { trackEvent } from '../utils/analytics'

const ProvinceBoardScreen = ({ provinceId }) => {
  const { state, dispatch } = useGame()
  const [showDiceScreen, setShowDiceScreen] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [rewardData, setRewardData] = useState(null)

  const handleRollDice = async () => {
    if (!validateRollDice()) return
    
    setShowDiceScreen(true)
    trackEvent('dice_roll', {
      provinceId,
      remainingTurns: state.remainingTurns
    })
  }

  const handleDiceComplete = async (diceValue) => {
    setShowDiceScreen(false)
    
    // Call API to move player
    const response = await fetch('/api/game/move', {
      method: 'POST',
      body: JSON.stringify({
        provinceId,
        diceValue
      })
    })
    
    const data = await response.json()
    
    dispatch({ type: 'MOVE_PLAYER', payload: {
      newPosition: data.newPosition,
      reward: data.reward
    }})
    
    trackEvent('player_move', {
      provinceId,
      diceValue,
      newPosition: data.newPosition,
      tileType: data.reward.type
    })
    
    // Show reward popup
    setRewardData(data.reward)
    setShowReward(true)
    
    // Check if completed province
    if (data.newPosition === 20) {
      handleCompleteProvince()
    }
  }

  const handleCompleteProvince = async () => {
    const response = await fetch('/api/game/province/complete', {
      method: 'POST',
      body: JSON.stringify({ provinceId })
    })
    
    const data = await response.json()
    
    dispatch({ type: 'COMPLETE_PROVINCE', payload: {
      provinceId,
      reward: data.reward,
      puzzlePiece: data.puzzlePiece
    }})
    
    trackEvent('province_complete', { provinceId })
    
    if (data.puzzlePiece) {
      trackEvent('puzzle_piece_received', {
        pieceType: data.puzzlePiece.type,
        provinceId
      })
    }
  }

  return (
    <div className="province-board-screen">
      <BoardGame 
        provinceId={provinceId}
        currentPosition={state.boardState?.currentPosition || 1}
        onRollDice={handleRollDice}
      />
      {showDiceScreen && (
        <DiceRollScreen
          onRollComplete={handleDiceComplete}
          canRoll={state.remainingTurns > 0}
        />
      )}
      {showReward && rewardData && (
        <RewardPopup
          reward={rewardData}
          onClose={() => {
            setShowReward(false)
            setRewardData(null)
          }}
        />
      )}
    </div>
  )
}
```

---

## **6. TECHNICAL IMPLEMENTATION**

### **6.1 Routing/Navigation**

```javascript
// App.jsx
import { useState, useEffect } from 'react'
import { GameProvider, useGame } from './contexts/GameContext'
import LandingScreen from './screens/LandingScreen'
import MapOverviewScreen from './screens/MapOverviewScreen'
import ProvinceBoardScreen from './screens/ProvinceBoardScreen'

const AppContent = () => {
  const { state } = useGame()
  
  const renderScreen = () => {
    switch (state.ui.currentScreen) {
      case 'landing':
        return <LandingScreen />
      case 'map':
        return <MapOverviewScreen />
      case 'board':
        return <ProvinceBoardScreen provinceId={state.currentProvince} />
      default:
        return <LandingScreen />
    }
  }
  
  return (
    <div className="app">
      {renderScreen()}
    </div>
  )
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}
```

### **6.2 API Service Layer**

```javascript
// services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const apiService = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    return response.json()
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    return response.json()
  }
}

// Usage
import { apiService } from '../services/api'

const loadGameState = async () => {
  try {
    const data = await apiService.get('/game/state')
    dispatch({ type: 'INITIALIZE_GAME', payload: data })
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message })
  }
}
```

### **6.3 Error Handling**

```javascript
// utils/errorHandler.js
export const handleApiError = (error, dispatch) => {
  let errorMessage = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
  
  if (error.response) {
    switch (error.response.status) {
      case 400:
        errorMessage = 'Yêu cầu không hợp lệ.'
        break
      case 401:
        errorMessage = 'Vui lòng đăng nhập lại.'
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
  } else if (error.message) {
    errorMessage = error.message
  }
  
  dispatch({ type: 'SET_ERROR', payload: errorMessage })
  
  // Show toast notification
  showToast(errorMessage, 'error')
}
```

### **6.4 Loading States**

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
{state.ui.isLoading && <LoadingSpinner message="Đang gieo xúc xắc..." />}
```

### **6.5 Responsive Design**

```javascript
// hooks/useResponsive.js
import { useState, useEffect } from 'react'

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return { isMobile }
}

// Usage in components
const { isMobile } = useResponsive()
```

---

## **7. STYLING GUIDELINES**

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

## **8. TESTING STRATEGY**

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
    
    expect(result.current.state.remainingTurns).toBe(0)
    expect(result.current.state.isInitialized).toBe(false)
  })
  
  it('should update turns after check-in', () => {
    const { result } = renderHook(() => useGame(), {
      wrapper: GameProvider
    })
    
    act(() => {
      result.current.dispatch({
        type: 'CHECK_IN',
        payload: { turnsAdded: 3 }
      })
    })
    
    expect(result.current.state.remainingTurns).toBe(3)
  })
})
```

### **8.2 Integration Tests**

```javascript
// __tests__/ProvinceBoard.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProvinceBoardScreen from '../screens/ProvinceBoardScreen'

describe('ProvinceBoardScreen', () => {
  it('should disable roll button when no turns left', () => {
    // Mock state with 0 turns
    render(<ProvinceBoardScreen provinceId="ha-noi" />)
    
    const rollButton = screen.getByText('Gieo xúc xắc')
    expect(rollButton).toBeDisabled()
  })
  
  it('should show error when trying to roll with no turns', async () => {
    // Test implementation
  })
})
```

---

## **9. PERFORMANCE OPTIMIZATION**

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

### **9.3 Image Optimization**

- Use WebP format for images
- Lazy load images with `loading="lazy"`
- Use responsive images with `srcset`

---

## **10. DEPLOYMENT CHECKLIST**

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

## **11. APPENDIX**

### **11.1 Environment Variables**

```env
VITE_API_BASE_URL=https://api.rovitravel.com
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
    "vite": "^4.0.0"
  }
}
```

---

**Tài liệu này được tạo dựa trên BA Spec và cần được review bởi Frontend Lead và Tech Lead trước khi bắt đầu development.**

**Version:** 1.0  
**Last Updated:** 28/01/2026  
**Owner:** Frontend Team  
**Status:** Draft - Pending Review
