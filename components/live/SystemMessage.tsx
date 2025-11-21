import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface SystemMessageProps {
  message: string;
}

export default function SystemMessage({ message }: SystemMessageProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>ℹ️ {message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    // POSISI DI BAWAH, TEPAT DI ATAS CHAT LIST
    bottom: 385, // bisa turunkan ke 100 atau 90 jika terlalu tinggi

    left: 16,
    right: 16,

    backgroundColor: 'rgba(0,0,0,0.35)', // transparan lembut
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    zIndex: 20,

    // Smooth look
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },

  text: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});