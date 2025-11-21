import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function LuxuryGiftLayer({ name }: { name: string }) {
  return (
    <View style={styles.layer}>
      <Text style={styles.text}>🎉 LUXURY GIFT: {name}</Text>
    </View>
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
    fontWeight: '700'
  }
});
