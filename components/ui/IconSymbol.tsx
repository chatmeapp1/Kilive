
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { StyleProp, TextStyle, OpaqueColorValue } from 'react-native';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

/**
 * Mapping SF Symbols → Material Icons
 * Complete mapping untuk semua icon yang digunakan di project
 */
const MAPPING = {
  // NAVIGATION
  'chevron.left': 'chevron-left',
  'chevron.right': 'chevron-right',
  'chevron.down': 'keyboard-arrow-down',
  'chevron.up': 'keyboard-arrow-up',
  'xmark': 'close',
  'plus': 'add',
  'checkmark': 'check',
  'arrow.left': 'arrow-back',
  'arrow.right': 'arrow-forward',

  // CHAT + ACTIONS
  'paperplane.fill': 'send',
  'paperplane': 'send',
  'gift.fill': 'card-giftcard',
  'gift': 'card-giftcard',
  'message.fill': 'message',
  'message': 'message',

  // LIVE STREAMING
  'eye.fill': 'visibility',
  'eye': 'visibility',
  'mic.fill': 'mic',
  'mic': 'mic',
  'mic.slash.fill': 'mic-off',
  'mic.slash': 'mic-off',
  'camera.rotate': 'flip-camera-android',
  'camera': 'camera-alt',
  'videocam': 'videocam',
  'videocam.fill': 'videocam',

  // BEAUTY & EFFECTS
  'sparkles': 'auto-awesome',
  'sparkles.fill': 'auto-awesome',
  'wand.and.stars': 'auto-fix-high',

  // FLASH
  'flash': 'flash-on',
  'flash.on': 'flash-on',
  'flash.off': 'flash-off',
  'bolt.fill': 'flash-on',
  'bolt': 'flash-on',

  // GAME
  'gamecontroller.fill': 'sports-esports',
  'gamecontroller': 'sports-esports',

  // PEOPLE & SOCIAL
  'person.fill': 'person',
  'person': 'person',
  'person.circle': 'account-circle',
  'person.circle.fill': 'account-circle',
  'person.add': 'person-add',
  'person.add.fill': 'person-add',
  'heart.fill': 'favorite',
  'heart': 'favorite-border',
  'star.fill': 'star',
  'star': 'star-border',

  // UI ELEMENTS
  'house.fill': 'home',
  'house': 'home',
  'magnifyingglass': 'search',
  'gearshape.fill': 'settings',
  'gearshape': 'settings',
  'bell.fill': 'notifications',
  'bell': 'notifications-none',
  'ellipsis.circle': 'more-horiz',
  'ellipsis': 'more-horiz',

  // MEDIA
  'play.fill': 'play-arrow',
  'play': 'play-arrow',
  'pause.fill': 'pause',
  'pause': 'pause',
  'stop.fill': 'stop',
  'stop': 'stop',

  // DOCUMENTS & FILES
  'doc.fill': 'description',
  'doc': 'description',
  'folder.fill': 'folder',
  'folder': 'folder',

  // MONEY & COMMERCE
  'dollarsign.circle': 'attach-money',
  'creditcard.fill': 'credit-card',
  'cart.fill': 'shopping-cart',

  // TIME
  'clock.fill': 'access-time',
  'clock': 'access-time',
  'calendar': 'event',

  // COMMUNICATION
  'phone.fill': 'phone',
  'phone': 'phone',
  'envelope.fill': 'email',
  'envelope': 'email',

  // LOCATION
  'location.fill': 'location-on',
  'location': 'location-on',
  'map.fill': 'map',
  'map': 'map',

  // UTILITY
  'trash.fill': 'delete',
  'trash': 'delete',
  'pencil': 'edit',
  'square.and.pencil': 'edit',
  'link': 'link',
  'share': 'share',
  'lock.fill': 'lock',
  'lock': 'lock',
  'unlock.fill': 'lock-open',

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
