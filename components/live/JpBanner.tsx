import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface JpBannerProps {
  avatar: string;
  username: string;
  giftName: string;
  milestone: number;     // 20s, 50s, 100s, dst
  amount?: number;       // Reward coins (boleh undefined)
  index?: number;        // Slot multi banner (0–3)
  onHide?: () => void;   // Auto remove
}

export default function JpBanner({
  avatar,
  username,
  giftName,
  milestone,
  amount = 0,           // default 0 supaya tidak undefined
  index = 0,
  onHide,
}: JpBannerProps) {

  const slideAnim = useRef(new Animated.Value(-260)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const yOffset = 140 + index * 58; // setiap banner naik 58px

  useEffect(() => {
    // Slide in
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto hide
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -260,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onHide) onHide();
      });
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  const safeAmount = Number.isFinite(amount) ? amount : 0;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          top: yOffset,
          opacity: opacityAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={['#FFE259', '#FFA751']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.banner}
      >
        <Image source={{ uri: avatar }} style={styles.avatar} />

        <View style={styles.textBlock}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.giftName}>{giftName}</Text>
        </View>

        <Text style={styles.jpValue}>JP {milestone}s</Text>
        <Text style={styles.reward}>
          +{safeAmount.toLocaleString('id-ID')}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 10,
    right: 10,
    zIndex: 99,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    elevation: 4,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderColor: '#fff',
    borderWidth: 2,
    marginRight: 10,
  },
  textBlock: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  giftName: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 12,
  },
  jpValue: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 17,
    marginRight: 8,
  },
  reward: {
    color: '#FFD700',
    fontWeight: '900',
    fontSize: 20,
  },
});