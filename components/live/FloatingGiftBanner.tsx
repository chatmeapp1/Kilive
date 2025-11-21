import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  username: string;
  giftName: string;
  avatar: string;
  totalSent: number;
  isActive: boolean;
  index: number;
  type?: 'lucky' | 'slucky' | 'luxury' | 'normal';
  onHide: () => void;
}

export default function FloatingGiftBanner({
  username,
  giftName,
  avatar,
  totalSent,
  isActive,
  index,
  type = 'normal',
  onHide,
}: Props) {

  const slideAnim = useRef(new Animated.Value(-260)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Slot offset
  const yOffset = index * 62;

  // Gradient colors per type
  const COLORS = {
    lucky: ['#00FFAA', '#00DD55'],
    slucky: ['#B673FF', '#8A2BE2'],
    luxury: ['#FFD36A', '#FFB800'],
    normal: ['#6AA8FF', '#AE6BFF'],
  };

  useEffect(() => {
    if (isActive) {
      // Slide In Animation
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

      // Bounce effect setiap angka naik
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.35,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        })
      ]).start();

    } else {
      // Hide Animation
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 230,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -260,
          duration: 230,
          useNativeDriver: true,
        })
      ]).start(({ finished }) => {
        if (finished) onHide();
      });
    }
  }, [isActive, totalSent]);

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
        colors={COLORS[type]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.banner}
      >
        <Image source={{ uri: avatar }} style={styles.avatar} />

        <View style={styles.textBlock}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.giftName}>{giftName}</Text>
        </View>

        <Animated.Text style={[styles.total, { transform: [{ scale: scaleAnim }] }]}>
          x{totalSent}
        </Animated.Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    width: '94%',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 42,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
  },
  textBlock: { flex: 1 },
  username: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  giftName: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 13,
  },
  total: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFF269',
    marginLeft: 8,
  },
});