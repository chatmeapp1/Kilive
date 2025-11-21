# Gift Engine System - Complete Implementation

## Overview
Seluruh sistem gift telah diganti dengan arsitektur terpusat menggunakan `useGiftEngine` hook. Semua logic gift sekarang terpusat di satu tempat.

## File Structure

### Core Engine
- **`src/hooks/useGiftEngine.ts`** - Gift engine utama dengan semua logic gift

### Components
- **`components/live/GiftModal.tsx`** - UI modal untuk memilih gift (updated)
- **`components/live/LuxuryGiftLayer.tsx`** - Full-screen layer untuk luxury gift
- **`components/live/JpBanner.tsx`** - Floating banner untuk jackpot notification
- **`components/live/IncomeHost.tsx`** - Display host income balance

### Main Integration
- **`app/live-viewer.tsx`** - Live screen dengan gift engine integration

## Gift Categories

### 1. Normal
- Gift standar tanpa jackpot
- Host income: **10%** dari total cost
- **Special**: Jika harga gift >= 1M coins → Host dapat **100%** + Luxury Layer muncul
- Tidak ada combo system

### 2. Lucky
- Gift dengan jackpot system
- Host income: **10%** dari total cost
- Combo tersedia: 1, 3, 9, 19, 99, 199
- **JP Milestones**: Reward **10x harga gift** saat combo mencapai:
  - 20s, 50s, 100s, 200s, 300s, 500s

### 3. J-Lucky (Jackpot Lucky)
- Gift premium dengan jackpot + double reward
- Host income: **10%** dari total cost
- Combo tersedia: 1, 3, 9, 19, 99, 199
- **JP Milestones**: Reward **10x harga gift** saat combo mencapai:
  - 20s, 50s, 100s, 200s, 300s, 500s
- **Double Reward**: User mendapat kembali **100%** dari total cost

### 4. Luxury
- Gift eksklusif tanpa jackpot dan combo
- Langsung beli 1x saja
- Host income: **10%** dari total cost (default)

## Gift Engine Logic

### Input
```typescript
interface GiftItem {
  id: string;
  name: string;
  price: number;
  category: 'normal' | 'lucky' | 'j-lucky' | 'luxury';
}
```

### Output
```typescript
interface GiftResult {
  totalCost: number;
  hostIncomeAdd: number;
  userReward: number;
  isLuxuryLayer: boolean;
  jackpot?: {
    type: 'lucky' | 'j-lucky';
    milestone: number;
    amount: number;
  };
  doubleReward?: number;
}
```

## Flow

1. User klik gift icon → Modal terbuka
2. User pilih kategori (Normal/Lucky/J-Lucky/Luxury)
3. User pilih gift dan combo (jika Lucky/J-Lucky)
4. User klik "Send"
5. `useGiftEngine.sendGift()` dipanggil:
   - Deduct user balance
   - Calculate host income
   - Check jackpot milestones
   - Apply double reward (J-Lucky)
   - Return result
6. LiveViewerScreen handle result:
   - Show Luxury Layer jika `isLuxuryLayer === true`
   - Show JP Banner jika ada jackpot
   - Update UI dengan balance baru

## Example Scenarios

### Scenario 1: Normal Gift 500 coins
- Input: Normal gift, price 500, combo 1
- User balance: -500
- Host income: +50 (10%)
- User reward: 0
- Luxury layer: NO

### Scenario 2: Lucky Gift at 100s Combo
- Input: Lucky gift, price 200, combo 100
- User balance: -20,000
- Host income: +2,000 (10%)
- User reward: +2,000 (JP milestone 10x)
- Luxury layer: NO

### Scenario 3: J-Lucky Gift at 50s Combo
- Input: J-Lucky gift, price 300, combo 50
- User balance: -15,000 + 15,000 (double) + 3,000 (JP) = +3,000
- Host income: +1,500 (10%)
- User reward: +18,000 (double + JP)
- Luxury layer: NO

### Scenario 4: Normal Gift 1M coins
- Input: Normal gift, price 1,000,000, combo 1
- User balance: -1,000,000
- Host income: +1,000,000 (100% karena >= 1M)
- User reward: 0
- Luxury layer: **YES** (show full screen)

## Benefits

✅ **Centralized Logic** - Semua gift logic di satu tempat  
✅ **Type Safe** - Full TypeScript support  
✅ **Easy to Test** - Logic terpisah dari UI  
✅ **Maintainable** - Mudah di-update dan debug  
✅ **Scalable** - Mudah menambah kategori gift baru  

## Future Enhancements
- Gift animation system
- Gift history tracking
- Leaderboard integration
- Reward notification animations
