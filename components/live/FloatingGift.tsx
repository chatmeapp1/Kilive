
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export function FloatingGift() {
  return (
    <View style={styles.floatingGift}>
      <LinearGradient
        colors={['rgba(147, 112, 219, 0.9)', 'rgba(138, 43, 226, 0.9)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.giftBubble}
      >
        <ThemedText style={styles.giftUser}>Matahari</ThemedText>
        <ThemedText style={styles.giftText}>Menang 😊 4000</ThemedText>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingGift: {
    position: 'absolute',
    left: 12,
    top: 220,
  },
  giftBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 4,
  },
  giftUser: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  giftText: {
    color: '#fff',
    fontSize: 13,
  },
});
