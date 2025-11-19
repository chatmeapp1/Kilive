import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface CoinBalanceProps {
  coins: number;
  rank?: string;
  onPress?: () => void;
}

export function CoinBalance({ coins = 0, rank = "Tanpa Rank", onPress }: CoinBalanceProps) {
  const formatNumber = (n: number) => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return n.toString();
  };

  return (
    <View style={styles.wrapper}>
      {/* Coin Income Badge */}
      <Pressable style={styles.incomeBadge} onPress={onPress}>
        <ThemedText style={styles.coinIcon}>🪙</ThemedText>
        <ThemedText style={styles.coinText}>{formatNumber(coins)}</ThemedText>
      </Pressable>

      {/* Rank Badge */}
      <View style={styles.rankBadge}>
        <ThemedText style={styles.rankText}>{rank}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 110,
    left: 12,
    gap: 6,
  },

  incomeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20,20,20,0.65)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.45)',
    gap: 5,
  },

  coinIcon: {
    fontSize: 16,
  },

  coinText: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 3,
  },

  rankBadge: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },

  rankText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});