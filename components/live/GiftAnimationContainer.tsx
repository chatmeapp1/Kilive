import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

interface GiftAnimation {
  id: string;
  username: string;
  giftName: string;
  giftIcon: string;
  amount?: number;
}

interface Props {
  gifts?: GiftAnimation[];
}

export default function GiftAnimationContainer({ gifts = [] }: Props) {
  return (
    <View style={styles.container}>
      {gifts.map((gift) => (
        <AnimatedGiftItem key={gift.id} gift={gift} />
      ))}
    </View>
  );
}

function AnimatedGiftItem({ gift }: { gift: GiftAnimation }) {
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Slide in + fade in
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Slide out after 2.5s
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2500);
  }, []);

  return (
    <Animated.View
      style={[
        styles.giftItem,
        {
          opacity: opacityAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <Text style={styles.giftIcon}>{gift.giftIcon}</Text>

      <View style={styles.textWrapper}>
        <Text style={styles.username}>{gift.username}</Text>
        <Text style={styles.giftText}>
          sent {gift.giftName}
          {gift.amount ? ` ×${gift.amount}` : ''}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 160, // tepat di atas chat list
    left: 12,
    gap: 6,
    zIndex: 40,
  },
  giftItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 4,
  },
  giftIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  textWrapper: {
    flexDirection: 'column',
  },
  username: {
    color: '#FFD54F',
    fontWeight: '600',
    fontSize: 12,
  },
  giftText: {
    color: '#fff',
    fontSize: 11,
  },
});