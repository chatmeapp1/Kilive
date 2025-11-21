import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FloatingGiftBanner from './FloatingGiftBanner';

interface GiftPayload {
  spenderId: string;
  username: string;
  avatar: string;
  giftName: string;
  type?: 'normal' | 'lucky' | 'slucky' | 'luxury';
}

interface BannerData {
  id: string;
  username: string;
  giftName: string;
  avatar: string;
  count: number;
  type: 'normal' | 'lucky' | 'slucky' | 'luxury';
  isActive: boolean;
}

interface Props {
  activeGift: GiftPayload | null;
}

export default function FloatingGiftMultiContainer({ activeGift }: Props) {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const timers = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    if (!activeGift) return;

    const { spenderId, username, avatar, giftName, type = 'normal' } = activeGift;

    setBanners(prev => {
      const found = prev.find(b => b.id === spenderId);

      if (found) {
        // Update existing
        return prev.map(b =>
          b.id === spenderId
            ? { ...b, count: b.count + 1, isActive: true }
            : b
        );
      }

      // Insert new banner on top
      let updated = [...prev];

      // Keep only 4 slots
      if (updated.length >= 4) updated.pop();

      updated.unshift({
        id: spenderId,
        username,
        avatar,
        giftName,
        count: 1,
        type,
        isActive: true,
      });

      return updated;
    });

    // Reset or restart hide timer for this spender
    if (timers.current[spenderId]) clearTimeout(timers.current[spenderId]);

    timers.current[spenderId] = setTimeout(() => {
      setBanners(prev =>
        prev.map(b =>
          b.id === spenderId ? { ...b, isActive: false } : b
        )
      );
    }, 1500);

  }, [activeGift]);

  const removeBanner = (id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  };

  return (
    <View style={styles.container}>
      {banners.map((b, index) => (
        <FloatingGiftBanner
          key={b.id}
          username={b.username}
          giftName={b.giftName}
          avatar={b.avatar}
          totalSent={b.count}
          isActive={b.isActive}
          index={index}
          type={b.type}
          onHide={() => removeBanner(b.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 180,
    left: 10,
    width: '85%',
    zIndex: 999,
  },
});