import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface BeautyButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export default function BeautyButton({ onPress, style }: BeautyButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={0.8}
    >
      <Svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 4C10.1435 4 8.36301 4.7375 7.05025 6.05025C5.7375 7.36301 5 9.14348 5 11C5 14.667 7.333 18 12 20C16.667 18 19 14.667 19 11C19 9.14348 18.2625 7.36301 16.9497 6.05025C15.637 4.7375 13.8565 4 12 4Z"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.5 11C9.5 10.337 9.76339 9.70107 10.2322 9.23223C10.7011 8.76339 11.337 8.5 12 8.5C12.663 8.5 13.2989 8.76339 13.7678 9.23223C14.2366 9.70107 14.5 10.337 14.5 11"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});