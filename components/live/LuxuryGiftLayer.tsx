import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

interface LuxuryGiftLayerProps {
  name: string;
  onFinish?: () => void; // penting untuk closing event
}

export default function LuxuryGiftLayer({ name, onFinish }: LuxuryGiftLayerProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in
    Animated.timing(opacity, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    // Auto fade-out after 2.2s
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && onFinish) onFinish();
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.layer, { opacity }]}>
      <Text style={styles.text}>🎉 LUXURY GIFT: {name}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
});