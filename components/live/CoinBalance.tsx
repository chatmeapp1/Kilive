
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export function CoinBalance() {
  return (
    <View style={styles.coinBalance}>
      <View style={styles.coinBadge}>
        <ThemedText style={styles.coinIcon}>🪙</ThemedText>
        <ThemedText style={styles.coinText}>90</ThemedText>
      </View>
      <View style={styles.rankBadge}>
        <ThemedText style={styles.rankText}>Tanpa Rank</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coinBalance: {
    position: 'absolute',
    left: 12,
    top: 110,
    gap: 8,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  coinIcon: {
    fontSize: 16,
  },
  coinText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rankBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rankText: {
    color: '#fff',
    fontSize: 11,
  },
});
