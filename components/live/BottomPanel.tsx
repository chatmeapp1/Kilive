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
import Svg, { Path, Circle, Line } from 'react-native-svg';

export default function BottomPanel() {
  const insets = useSafeAreaInsets();

  const [typing, setTyping] = useState(false);
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
    bottom: inputOffset.value + insets.bottom,
  }));

  return (
    <>
      {/* INPUT DI ATAS KEYBOARD */}
      {typing && (
        <Animated.View style={[styles.realInputContainer, animatedInputStyle]}>

          <TextInput
            ref={inputRef}
            style={styles.realInput}
            placeholder="Ketik pesan..."
            placeholderTextColor="#ccc"
            autoFocus
          />

          {/* FIXED: SEND BUTTON SELALU BISA DI KLIK */}
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
              console.log("SEND!");
              setTyping(false);
              Keyboard.dismiss();
            }}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>

        </Animated.View>
      )}

      {/* MENU BAWAH */}
      {!typing && (
        <View style={[styles.bottomRow, { bottom: insets.bottom + 12 }]}>
          <TouchableOpacity
            style={styles.inputBubble}
            onPress={() => {
              setTyping(true);
              setTimeout(() => inputRef.current?.focus(), 80);
            }}
          >
            <TextInput
              editable={false}
              placeholder="Obrol..."
              placeholderTextColor="#ccc"
              style={styles.inputBubbleText}
            />
          </TouchableOpacity>

          {/* Icon Pesan */}
          <TouchableOpacity style={styles.iconBtn}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>

          {/* Icon Gift */}
          <TouchableOpacity style={[styles.iconBtn, styles.giftBtn]}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path d="M20 12V22H4V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M22 7H2V12H22V7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M12 22V7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>

          {/* Icon Game */}
          <TouchableOpacity style={[styles.iconBtn, styles.gameBtn]}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path d="M6 9H6.01M10 9H10.01M15.5 11L17.5 13L21.5 9M3.68 8.2C3.86384 7.21207 4.38431 6.3212 5.15409 5.68046C5.92388 5.03972 6.89271 4.69364 7.89 4.70001H16.11C17.1073 4.69364 18.0761 5.03972 18.8459 5.68046C19.6157 6.3212 20.1362 7.21207 20.32 8.2L21.28 13.2C21.3897 13.8013 21.3474 14.4194 21.1565 15.0003C20.9656 15.5812 20.6316 16.1067 20.1835 16.5306C19.7354 16.9546 19.1873 17.2642 18.589 17.4327C17.9907 17.6012 17.3606 17.6234 16.752 17.4976C16.1434 17.3717 15.5746 17.1015 15.0966 16.71C14.6186 16.3185 14.2462 15.8175 14.013 15.25L12 10.75L9.987 15.25C9.75377 15.8175 9.38138 16.3185 8.90341 16.71C8.42544 17.1015 7.85664 17.3717 7.24802 17.4976C6.6394 17.6234 6.00928 17.6012 5.41098 17.4327C4.81268 17.2642 4.26462 16.9546 3.81652 16.5306C3.36843 16.1067 3.0344 15.5812 2.84352 15.0003C2.65263 14.4194 2.61028 13.8013 2.72 13.2L3.68 8.2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>

          {/* Icon Co-host / Rantai (Chain) */}
          <TouchableOpacity style={[styles.iconBtn, styles.linkBtn]}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6897C16.4231 14.4391 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05524 14.413 2.55921 13.47 3.47L11.75 5.18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0685 9.05889 10.3533 9.00771C9.63819 8.95653 8.92037 9.05964 8.24861 9.31029C7.57685 9.56094 6.96684 9.9529 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.542 3.52086 20.4691C4.4479 21.3961 5.70197 21.9219 7.01295 21.9333C8.32393 21.9447 9.58694 21.4407 10.53 20.53L12.24 18.82" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>

          {/* Icon X Close */}
          <TouchableOpacity style={[styles.iconBtn, styles.closeBtn]}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
    justifyContent: 'space-between',
  },

  inputBubbleText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },

  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  linkBtn: {
    backgroundColor: '#9333EA',
  },
  gameBtn: {
    backgroundColor: '#3B82F6',
  },
  giftBtn: {
    backgroundColor: '#EC4899',
  },
  closeBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  realInputContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 55,     // ruang untuk send button
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

  // FIX: tombol send absolute & clickable
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