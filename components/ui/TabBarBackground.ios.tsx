import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

/**
 * Background blur untuk TabBar.
 * Otomatis mengikuti tema iOS (systemChromeMaterial)
 * dan tetap smooth di Android.
 */
export default function BlurTabBarBackground() {
  return (
    <BlurView
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

/**
 * Hook untuk mengetahui tinggi tab bar,
 * dipakai jika ingin menambah padding di layar.
 */
export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}