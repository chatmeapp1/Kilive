import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function FloatingGift() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>🎁 Gift animation here</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 150,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 10,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});