
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface GiftButtonProps {
  onPress?: () => void;
}

export default function GiftButton({ onPress }: GiftButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <IconSymbol name="gift.fill" size={28} color="#FFD700" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
});
