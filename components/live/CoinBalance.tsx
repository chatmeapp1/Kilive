import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function CoinBalance() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>💰 Balance: 1000</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 10,
  },
  text: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
});