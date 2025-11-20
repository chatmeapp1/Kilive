import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface GiftButtonProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export default function GiftButton({ onPress, style }: GiftButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <SvgIcon name="gift" size={22} color="#FFD54F" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.35)',
    position: 'absolute',
    right: 16,
    bottom: 90,
    zIndex: 60,
  },
});