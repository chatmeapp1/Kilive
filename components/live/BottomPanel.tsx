import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useRouter } from 'expo-router';

interface BottomPanelProps {
  onGiftPress?: () => void;
  onSend?: (text: string) => void;
}

export default function BottomPanel({ onGiftPress, onSend }: BottomPanelProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [typing, setTyping] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<TextInput>(null);

  const inputOffset = useSharedValue(0);

  // FOLLOW KEYBOARD
  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setTyping(true);
        inputOffset.value = withTiming(e.endCoordinates.height + 10, {
          duration: 220,
        });
      }
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        inputOffset.value = withTiming(0, { duration: 220 });
        setTyping(false);
      }
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const animatedInputStyle = useAnimatedStyle(() => ({
    bottom: inputOffset.value + (insets.bottom || 12),
  }));

  const sendMessage = () => {
    if (!message.trim()) return;

    onSend?.(message);
    setMessage('');
    Keyboard.dismiss();
    setTyping(false);
  };

  return (
    <>
      {/* INPUT FLOATING DI ATAS KEYBOARD */}
      {typing && (
        <Animated.View style={[styles.realInputContainer, animatedInputStyle]}>
          <TextInput
            ref={inputRef}
            style={styles.realInput}
            placeholder="Ketik pesan..."
            placeholderTextColor="#ccc"
            value={message}
            onChangeText={setMessage}
            autoFocus
          />

          {/* TOMBOL SEND */}
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path
                d="M22 2L11 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* MENU BAWAH */}
      {!typing && (
        <View style={[styles.bottomRow, { bottom: (insets.bottom || 12) + 12 }]}>
          {/* Bubble input semu */}
          <TouchableOpacity
            style={styles.inputBubble}
            onPress={() => {
              setTyping(true);
              setTimeout(() => inputRef.current?.focus(), 75);
            }}
          >
            <TextInput
              editable={false}
              placeholder="Obrol..."
              placeholderTextColor="#ccc"
              style={styles.inputBubbleText}
            />
          </TouchableOpacity>

          {/* ICON PESAN */}
          <TouchableOpacity 
            style={styles.iconBtn}
            onPress={() => {
              setTyping(true);
              setTimeout(() => inputRef.current?.focus(), 75);
            }}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* ICON GIFT */}
          <TouchableOpacity
            style={[styles.iconBtn, styles.giftBtn]}
            onPress={onGiftPress}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path
                d="M20 12V22H4V12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M22 7H2V12H22V7Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M12 22V7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z"
                stroke="white"
                strokeWidth="2"
              />
              <Path
                d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z"
                stroke="white"
                strokeWidth="2"
              />
            </Svg>
          </TouchableOpacity>

          {/* ICON GAME */}
          <TouchableOpacity 
            style={[styles.iconBtn, styles.gameBtn]}
            onPress={() => router.push('/game')}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path
                d="M6 9H6.01M10 9H10.01M15.5 11L17.5 13L21.5 9M3.68 8.2C3.86384 7.21207 4.38431 6.3212 5.15409 5.68046C5.92388 5.03972 6.89271 4.69364 7.89 4.70001H16.11C17.1073 4.69364 18.0761 5.03972 18.8459 5.68046C19.6157 6.3212 20.1362 7.21207 20.32 8.2L21.28 13.2C21.3897 13.8013 21.3474 14.4194 21.1565 15.0003C20.9656 15.5812 20.6316 16.1067 20.1835 16.5306C19.7354 16.9546 19.1873 17.2642 18.589 17.4327C17.9907 17.6012 17.3606 17.6234 16.752 17.4976C16.1434 17.3717 15.5746 17.1015 15.0966 16.71C14.6186 16.3185 14.2462 15.8175 14.013 15.25L12 10.75L9.987 15.25C9.75377 15.8175 9.38138 16.3185 8.90341 16.71C8.42544 17.1015 7.85664 17.3717 7.24802 17.4976C6.6394 17.6234 6.00928 17.6012 5.41098 17.4327C4.81268 17.2642 4.26462 16.9546 3.81652 16.5306C3.36843 16.1067 3.0344 15.5812 2.84352 15.0003C2.65263 14.4194 2.61028 13.8013 2.72 13.2L3.68 8.2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>

          {/* ICON CLOSE */}
          <TouchableOpacity 
            style={[styles.iconBtn, styles.closeBtn]}
            onPress={() => router.back()}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path
                d="M18 6L6 18M6 6L18 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  inputBubble: {
    flex: 1,
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  inputBubbleText: {
    color: '#fff',
    fontSize: 14,
  },

  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  giftBtn: { backgroundColor: '#EC4899' },
  gameBtn: { backgroundColor: '#3B82F6' },
  closeBtn: { backgroundColor: 'rgba(255,255,255,0.25)' },

  realInputContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 55,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 30,
  },

  realInput: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
  },

  sendBtn: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});