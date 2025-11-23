
export interface Message {
  id: string;
  username: string;
  level?: number;
  vip?: number;
  message: string;
  avatar?: string;
}

export interface Viewer {
  id: string;
  avatar: string;
  username: string;
  level?: number;
  vip?: number;
}

export interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'normal' | 'lucky' | 'j-lucky' | 'luxury';
}

export interface FloatingGift {
  spenderId: string;
  username: string;
  avatar: string;
  giftName: string;
  type?: 'lucky' | 'slucky' | 'luxury' | 'normal';
}

export interface JackpotInfo {
  milestone: number;
  amount: number;
  avatar?: string;
  username?: string;
  giftName?: string;
}

export interface LiveState {
  isBroadcasting: boolean;
  flashEnabled: boolean;
  cameraType: 'front' | 'back';
  beautyEnabled: boolean;
  isMicMuted: boolean;
  isHostAway: boolean;
  messages: Message[];
  viewers: Viewer[];
  viewerCount: number;
}

export interface BeautySettings {
  smooth: number;
  light: number;
  red: number;
}

export interface GiftSendResult {
  success: boolean;
  newBalance: number;
  isLuxuryLayer: boolean;
  jackpot?: {
    milestone: number;
    amount: number;
  };
}
