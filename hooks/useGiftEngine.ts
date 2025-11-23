import { useState } from 'react';

export type GiftCategory = 'normal' | 'lucky' | 'j-lucky' | 'luxury';

export interface GiftItem {
  id: string;
  name: string;
  price: number;
  category: GiftCategory;
}

export interface GiftResult {
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

// Define the types for Gift and GiftSendResult
export type Gift = GiftItem;
export interface GiftSendResult extends GiftResult {}

const JP_MILESTONES = [20, 50, 100, 200, 300, 500];

export function useGiftEngine(initialUserBalance: number = 0) {
  const [userBalance, setUserBalance] = useState(initialUserBalance);
  const [hostIncome, setHostIncome] = useState(0);

  const sendGift = (gift: Gift, combo: number = 1): GiftSendResult => {
    const totalCost = gift.price * combo;

    setUserBalance(prev => prev - totalCost);

    let hostIncomeAdd = 0;
    let isLuxuryLayer = false;

    // NORMAL GIFT
    if (gift.category === 'normal') {
      if (gift.price >= 1_000_000) {
        hostIncomeAdd = totalCost;
        isLuxuryLayer = true;
      } else {
        hostIncomeAdd = totalCost * 0.10;
      }
    }

    // LUCKY & J-LUCKY → 10% ke host
    if (gift.category === 'lucky' || gift.category === 'j-lucky') {
      hostIncomeAdd = totalCost * 0.10;
    }

    setHostIncome(prev => prev + hostIncomeAdd);

    // === JP SYSTEM ===
    let userReward = 0;
    let jackpotInfo;
    let doubleReward = 0;

    if (gift.category === 'lucky' || gift.category === 'j-lucky') {
      const milestone = JP_MILESTONES.find(m => combo === m);

      if (milestone) {
        const jpReward = gift.price * 10;
        userReward += jpReward;
        jackpotInfo = {
          type: gift.category,
          milestone,
          amount: jpReward,
        };
      }

      if (gift.category === 'j-lucky') {
        doubleReward = totalCost;
        userReward += doubleReward;
      }
    }

    if (userReward > 0) {
      setUserBalance(prev => prev + userReward);
    }

    return {
      totalCost,
      hostIncomeAdd,
      userReward,
      isLuxuryLayer,
      jackpot: jackpotInfo,
      doubleReward: doubleReward || undefined,
    };
  };

  return {
    userBalance,
    hostIncome,
    sendGift,
  };
}

export default useGiftEngine;