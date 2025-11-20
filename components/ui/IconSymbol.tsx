import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { StyleProp, TextStyle, OpaqueColorValue } from 'react-native';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

/**
 * Mapping SF Symbols → Material Icons
 * Tambahkan icon sesuai kebutuhan.
 */
const MAPPING = {
  // NAVIGATION
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'xmark': 'close',
  'plus': 'add',
  'checkmark': 'check',

  // CHAT + ACTIONS
  'paperplane.fill': 'send',
  'gift.fill': 'card-giftcard',

  // LIVE STREAMING
  'eye.fill': 'visibility',
  'mic.fill': 'mic',
  'mic.slash.fill': 'mic-off',
  'camera.rotate': 'flip-camera-android',
  'sparkles': 'auto-awesome',

  // FLASH
  'flash': 'flash-on',
  'flash.off': 'flash-off',

  // GAME
  'gamecontroller.fill': 'sports-esports',

  // MESSAGE
  'message.fill': 'message',

  // FALLBACK
  'default': 'help-outline',
} as const;

export function IconSymbol({
  name,
  size = 24,
  color = '#fff',
  style,
}: {
  name: keyof typeof MAPPING | string;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}) {
  // fallback jika name tidak ditemukan
  const iconName = (MAPPING as any)[name] ?? MAPPING['default'];

  return (
    <MaterialIcons
      name={iconName as MaterialIconName}
      size={size}
      color={color}
      style={style}
    />
  );
}