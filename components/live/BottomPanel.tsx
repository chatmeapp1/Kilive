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
import { IconSymbol } from '@/components/ui/IconSymbol';

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
            <IconSymbol name="paperplane.fill" size={20} color="#fff" />
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
            <IconSymbol name="line.3.horizontal" size={18} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <IconSymbol name="message.fill" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconBtn, styles.linkBtn]}>
            <IconSymbol name="link" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconBtn, styles.gameBtn]}>
            <IconSymbol name="gamecontroller.fill" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconBtn, styles.giftBtn]}>
            <IconSymbol name="gift.fill" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconBtn, styles.moreBtn]}>
            <IconSymbol name="ellipsis" size={20} color="#fff" />
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
  moreBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },

  realInputContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 55,     // ruang untuk send button
    position: 'relative', // FIX: supaya absolute child bekerja
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