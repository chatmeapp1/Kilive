import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function LiveOverlay({ children }: { children: React.ReactNode }) {
  return <View style={styles.overlay}>{children}</View>;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
});