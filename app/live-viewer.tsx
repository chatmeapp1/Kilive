import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

import LiveVideoPlayer from '@/components/live/LiveVideoPlayer';
import LiveOverlay from '@/components/live/LiveOverlay';

import TopBar from '@/components/live/TopBar';
import IncomeHost from '@/components/live/IncomeHost';
import BottomPanel from '@/components/live/BottomPanel';
import ChatMessageList from '@/components/live/ChatMessageList';
import SystemMessage from '@/components/live/SystemMessage';
import LiveActionsCoHost from '@/components/live/LiveActionsCoHost';
import LiveVideoBox from '@/components/live/LiveVideoBox';
import GiftModal from '@/components/live/GiftModal';
import LuxuryGiftLayer from '@/components/live/LuxuryGiftLayer';

import FloatingGiftMultiContainer from '@/components/live/FloatingGiftMultiContainer';
import JpBanner from '@/components/live/JpBanner';

import useGiftEngine from '@/hooks/useGiftEngine';

export default function LiveViewerScreen() {
  const { hostId, hostName } = useLocalSearchParams();
  const [simpleMode, setSimpleMode] = useState(false);

  const [isCoHost, setIsCoHost] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);

  const { userBalance, hostIncome, sendGift } = useGiftEngine(1000);

  const [showGiftModal, setShowGiftModal] = useState(false);

  const [luxuryGiftName, setLuxuryGiftName] = useState<string | null>(null);
  const [jpInfo, setJpInfo] = useState<{ milestone: number; amount: number } | null>(null);

  // State for the active gift to be displayed in FloatingGiftMultiContainer
  const [activeGift, setActiveGift] = useState(null);

  const handleSendGift = (gift: any, combo: number) => {
    const result = sendGift(gift, combo);

    // Set the active gift for the FloatingGiftMultiContainer
    setActiveGift({
      spenderId: "USER_" + Math.random(), // Placeholder, should be user ID
      username: String(hostName || "Host"), // Placeholder, should be sender's username
      avatar: "https://i.imgur.com/4ZQZ4zO.png", // Placeholder, should be sender's avatar
      giftName: gift.name,
      type: gift.category,
    });

    // Floating multi-banner (spender tap-tap)
    // The previous setFloatingGift state is replaced by setActiveGift for consistency
    // setFloatingGift({
    //   spenderId: "USER_" + Math.random(),
    //   username: gift.name,
    //   avatar: gift.icon || "https://i.imgur.com/4ZQZ4zO.png",
    //   giftName: gift.name,
    // });

    // Luxury Layer
    if (result.isLuxuryLayer) {
      setLuxuryGiftName(gift.name);
      setTimeout(() => setLuxuryGiftName(null), 3000);
    }

    // JP Milestone
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

  const messages = [
    { id: "1", username: "user1", level: 22, message: "halo host!" },
    { id: "2", username: "user2", level: 50, message: "mantap nih host!" }
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />

          {isCoHost ? (
            <View style={styles.coHostVideoContainer}>
              <View style={styles.coHostGrid}>
                <LiveVideoBox username="Host" isHost={true} />
                <LiveVideoBox username="You" isMuted={isMicMuted} />
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
                onSendGift={handleSendGift} // Pass the handleSendGift function as onSendGift prop
              >
                <TopBar
                  hostName={String(hostName || "Host")}
                  hostId={String(hostId || "0")}
                  isFollowing={false}
                  onFollowPress={() => {}}
                />

                {!isCoHost && (
                  <IncomeHost balance={hostIncome} />
                )}

                {/* Pass the activeGift state to FloatingGiftMultiContainer */}
                <FloatingGiftMultiContainer activeGift={activeGift} />

                <SystemMessage message="Platform ini melarang menampilkan ketelanjangan." />

                <ChatMessageList messages={messages} />

                {isCoHost ? (
                  <LiveActionsCoHost
                    isMicMuted={isMicMuted}
                    onToggleMic={() => setIsMicMuted(!isMicMuted)}
                    onLeave={() => setIsCoHost(false)}
                  />
                ) : (
                  <BottomPanel onGiftPress={() => setShowGiftModal(true)} />
                )}

              </LiveOverlay>
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