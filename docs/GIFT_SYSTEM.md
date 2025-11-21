# Gift System Documentation

## Overview
Sistem gift yang terintegrasi dengan live streaming yang mendukung 3 kategori gift: S-Lucky, Lucky, dan Luxury.

## Gift Categories

### S-Lucky
- Gift dengan jackpot special dan double coin rewards
- Combo tersedia: 1, 3, 9, 19, 99, 199
- **Special Jackpot** (untuk gift harga 200+):
  - 500s: Reward 1M coins
  - 1000s: Reward 2M coins (jackpot besar)
- **Double Coin Bonus**: Setiap purchase mendapat double coins kembali berdasarkan total cost

### Lucky  
- Gift dengan jackpot standard
- Combo tersedia: 1, 3, 9, 19, 99, 199
- **Jackpot Milestones**: Reward saat mencapai combo tertentu
  - 20s: Reward 10x harga gift
  - 50s: Reward 10x harga gift
  - 100s: Reward 10x harga gift
  - 200s: Reward 10x harga gift
  - 300s: Reward 10x harga gift
  - 500s: Reward 10x harga gift

### Luxury
- Gift premium tanpa jackpot
- Tidak ada combo (langsung beli 1x)
- Untuk gift eksklusif dan high-value

## Host Income Distribution

### Lucky & S-Lucky Gifts
- Host menerima **10%** dari total harga gift
- Contoh: Gift 100 coins x 10 combo = 1000 coins total
  - Host income: 100 coins (10%)

### Luxury Gifts > 1M coins
- Host menerima **50%** dari total harga gift
- Contoh: Gift 2M coins
  - Host income: 1M coins (50%)

### Luxury Gifts < 1M coins
- Host menerima **10%** dari total harga gift (default)

## User Rewards

### S-Lucky Rewards
1. **Double Coin Bonus**: Total cost dikembalikan 100%
   - Purchase 500 coins → Get 500 coins back
2. **Special Jackpot** (harga 200+ coins):
   - Combo 500s: +1M coins
   - Combo 1000s: +2M coins

### Lucky Rewards
- **JP Milestones**: Reward 10x harga gift saat mencapai:
  - 20s, 50s, 100s, 200s, 300s, 500s combo

## Implementation Files

### Components
- `components/live/GiftModal.tsx` - Modal UI untuk memilih gift
- `components/live/BottomPanel.tsx` - Bottom panel dengan gift button
- `components/live/CoinBalance.tsx` - Display user balance

### Main Integration
- `app/live-viewer.tsx` - Gift modal integration & reward logic

## Gift Flow

1. User klik icon gift di bottom panel
2. GiftModal terbuka dengan 3 tabs (S-Lucky, Lucky, Luxury)
3. User pilih gift dan combo (jika Lucky/S-Lucky)
4. User klik "Send"
5. System:
   - Deduct coins dari user balance
   - Calculate host income
   - Check dan berikan jackpot rewards
   - Update balance

## Future Enhancements
- Full screen gift animation
- Gift history
- Leaderboard system
- Multi-gift combo animation
