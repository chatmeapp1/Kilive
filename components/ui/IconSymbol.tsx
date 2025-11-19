// Fallback untuk Android & Web menggunakan MaterialIcons
// SF Symbols hanya ada di iOS, jadi mapping manual diperlukan.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

type IconMapping = Record<
  SymbolViewProps['name'],
  ComponentProps<typeof MaterialIcons>['name']
>;

type IconSymbolName = keyof typeof MAPPING;

/**
 * Tambahkan mapping icon SF Symbols → Material Icons di sini.
 * Pastikan nama sesuai dengan daftar icon Material pada halaman Expo Icons.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'xmark': 'close',
  'plus': 'add',
  'checkmark': 'check',
  'message.fill': 'message',
  'link': 'link',
  'gamecontroller.fill': 'sports-esports',
  'ellipsis': 'more-horiz',
  'gift.fill': 'card-giftcard',
  'eye.fill': 'visibility',
  'camera.rotate': 'flip-camera-android',
  'sparkles': 'auto-awesome',
  'mic.fill': 'mic',
} as IconMapping;

/**
 * Komponen icon universal.
 * - iOS akan menggunakan expo-symbols (jika file IconSymbol.ios.tsx tersedia)
 * - Android & Web akan memakai MaterialIcons sebagai fallback
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}