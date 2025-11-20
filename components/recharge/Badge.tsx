
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface BadgeProps {
  text: string;
}

export default function Badge({ text }: BadgeProps) {
  return (
    <View style={styles.badge}>
      <ThemedText style={styles.badgeText}>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#7B2FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '600',
  },
});
