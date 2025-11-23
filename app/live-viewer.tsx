
import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

import LiveVideoPlayer from '@/components/live/LiveVideoPlayer';
import LiveOverlay from '@/components/live/LiveOverlay';
import LiveActionsCoHost from '@/components/live/LiveActionsCoHost';
import LiveVideoBox from '@/components/live/LiveVideoBox';
import GiftModal from '@/components/live/GiftModal';
import LuxuryGiftLayer from '@/components/live/LuxuryGiftLayer';
import FloatingGiftMultiContainer from '@/components/live/FloatingGiftMultiContainer';
import JpBanner from '@/components/live/JpBanner';

import { useLiveState } from '@/hooks/useLiveState';
import useGiftEngine from '@/hooks/useGiftEngine';

export default function LiveViewerScreen() {
  const { hostId, hostName } = useLocalSearchParams();
  const [simpleMode, setSimpleMode] = useState(false);
  const [isCoHost, setIsCoHost] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [luxuryGiftName, setLuxuryGiftName] = useState<string | null>(null);
  const [jpInfo, setJpInfo] = useState<{ milestone: number; amount: number } | null>(null);
  const [activeGift, setActiveGift] = useState<any>(null);

  // Use live state hook
  const liveState = useLiveState();
  const { userBalance, hostIncome, sendGift } = useGiftEngine(1000);

  const handleSendMessage = (message: string) => {
    liveState.addMessage('You', message, 1);
  };

  const handleSendGift = (gift: any, combo: number) => {
    const result = sendGift(gift, combo);

    setActiveGift({
      spenderId: "USER_" + Math.random(),
      username: String(hostName || "Host"),
      avatar: "https://i.imgur.com/4ZQZ4zO.png",
      giftName: gift.name,
      type: gift.category,
    });

    if (result.isLuxuryLayer) {
      setLuxuryGiftName(gift.name);
      setTimeout(() => setLuxuryGiftName(null), 3000);
    }

    if (result.jackpot) {
      setJpInfo({
        milestone: result.jackpot.milestone,
        amount: result.jackpot.amount
      });
      setTimeout(() => setJpInfo(null), 3000);
    }
  };

  const translateX = useSharedValue(0);
  const gesture = Gesture.Pan()
    .onUpdate(e => translateX.value = e.translationX)
    .onEnd(e => {
      if (e.translationX > 100) runOnJS(setSimpleMode)(true);
      if (e.translationX < -100) runOnJS(setSimpleMode)(false);
      translateX.value = withTiming(0);
    });

  const animatedOverlay = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          {isCoHost ? (
            <View style={styles.coHostVideoContainer}>
              <View style={styles.coHostGrid}>
                <LiveVideoBox username="Host" isHost={true} />
                <LiveVideoBox username="You" isMuted={liveState.isMicMuted} />
              </View>
            </View>
          ) : (
            <LiveVideoPlayer hostId={hostId} hostName={hostName} />
          )}

          {!simpleMode && (
            <Animated.View style={[styles.overlayLayer, animatedOverlay]}>
              <LiveOverlay
                hostName={String(hostName || "Host")}
                hostId={String(hostId || "0")}
                hostAvatar="https://i.pravatar.cc/150?img=1"
                balance={hostIncome}
                messages={liveState.messages}
                onSendMessage={handleSendMessage}
                onGiftPress={() => setShowGiftModal(true)}
                onSendGift={handleSendGift}
                agoraEngine={null}
                isHostAway={false}
                viewers={liveState.viewers}
                viewerCount={liveState.viewerCount}
              />

              {isCoHost && (
                <LiveActionsCoHost
                  isMicMuted={liveState.isMicMuted}
                  onToggleMic={liveState.toggleMic}
                  onLeave={() => setIsCoHost(false)}
                />
              )}
            </Animated.View>
          )}

          {luxuryGiftName && <LuxuryGiftLayer name={luxuryGiftName} />}

          {jpInfo && (
            <JpBanner milestone={jpInfo.milestone} amount={jpInfo.amount} />
          )}

          <GiftModal
            visible={showGiftModal}
            onClose={() => setShowGiftModal(false)}
            onSendGift={handleSendGift}
            userBalance={userBalance}
          />

          <FloatingGiftMultiContainer activeGift={activeGift} />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlayLayer: { ...StyleSheet.absoluteFillObject },
  coHostVideoContainer: { flex: 1, backgroundColor: '#000' },
  coHostGrid: { flex: 1, flexDirection: 'row' },
});
