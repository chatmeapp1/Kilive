import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

import LiveVideoPlayer from '@/components/live/LiveVideoPlayer';
import LiveOverlay from '@/components/live/LiveOverlay';

import TopBar from '@/components/live/TopBar';
import CoinBalance from '@/components/live/CoinBalance';
import FloatingGift from '@/components/live/FloatingGift';
import BottomPanel from '@/components/live/BottomPanel';
import ChatMessageList from '@/components/live/ChatMessageList';
import SystemMessage from '@/components/live/SystemMessage';

export default function LiveViewerScreen() {
  const { hostId, hostName } = useLocalSearchParams();
  const [simpleMode, setSimpleMode] = useState(false);

  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
    })
    .onEnd(e => {
      if (e.translationX > 100) runOnJS(setSimpleMode)(true);
      if (e.translationX < -100) runOnJS(setSimpleMode)(false);
      translateX.value = withTiming(0);
    });

  const animatedOverlay = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const messages = [
    { id: '1', username: 'user1', level: 22, message: 'halo host!' },
    { id: '2', username: 'user2', level: 50, message: 'mantap nih host!' },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          {/* VIDEO */}
          <LiveVideoPlayer hostId={hostId} hostName={hostName} />

          {/* UI OVERLAY */}
          {!simpleMode && (
            <Animated.View style={[styles.overlayLayer, animatedOverlay]}>
              <LiveOverlay>

                <TopBar hostName={hostName} hostId={hostId} isFollowing={false} onFollowPress={() => {}} />

                <CoinBalance />

                <FloatingGift />

                <SystemMessage message="Platform ini melarang menampilkan ketelanjangan." />

                <ChatMessageList messages={messages} />

                <BottomPanel />

              </LiveOverlay>
            </Animated.View>
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlayLayer: {
    ...StyleSheet.absoluteFillObject,
  },
});