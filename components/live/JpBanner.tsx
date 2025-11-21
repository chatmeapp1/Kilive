import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JpBanner({ milestone, amount }: any) {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>🎊 JP {milestone}s → +{amount} Coins!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 140,
    left: 10,
    right: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,215,0,0.85)',
    zIndex: 99,
  },
  text: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
});
