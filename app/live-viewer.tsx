import React, { useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

import LiveVideoPlayer from '@/components/live/LiveVideoPlayer';
import LiveOverlay from '@/components/live/LiveOverlay';

import TopBar from '@/components/live/TopBar';
import IncomeHost from '@/components/live/IncomeHost';
import FloatingGift from '@/components/live/FloatingGift';
import BottomPanel from '@/components/live/BottomPanel';
import ChatMessageList from '@/components/live/ChatMessageList';
import SystemMessage from '@/components/live/SystemMessage';
import LiveActionsCoHost from '@/components/live/LiveActionsCoHost';
import LiveVideoBox from '@/components/live/LiveVideoBox';
import GiftModal from '@/components/live/GiftModal';
import LuxuryGiftLayer from '@/components/live/LuxuryGiftLayer';
import JpBanner from '@/components/live/JpBanner';

import useGiftEngine from '@/src/hooks/useGiftEngine';

export default function LiveViewerScreen() {
  const { hostId, hostName } = useLocalSearchParams();
  const [simpleMode, setSimpleMode] = useState(false);
  
  // Co-host mode state
  const [isCoHost, setIsCoHost] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);

  // Gift Engine
  const { userBalance, hostIncome, sendGift } = useGiftEngine(1000);

  // Gift modal state
  const [showGiftModal, setShowGiftModal] = useState(false);

  // Luxury layer and JP banner state
  const [luxuryGiftName, setLuxuryGiftName] = useState<string | null>(null);
  const [jpInfo, setJpInfo] = useState<{ milestone: number; amount: number } | null>(null);

  const handleSendGift = (gift: any, combo: number) => {
    const result = sendGift({
      id: gift.id,
      name: gift.name,
      price: gift.price,
      category: gift.category,
    }, combo);

    console.log('GIFT RESULT:', result);

    // Show luxury layer if applicable
    if (result.isLuxuryLayer) {
      setLuxuryGiftName(gift.name);
      setTimeout(() => setLuxuryGiftName(null), 3000);
    }

    // Show JP banner if jackpot
    if (result.jackpot) {
      setJpInfo({ milestone: result.jackpot.milestone, amount: result.jackpot.amount });
      setTimeout(() => setJpInfo(null), 3000);
    }
  };

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
          {isCoHost ? (
            // Co-host mode: Show grid layout
            <View style={styles.coHostVideoContainer}>
              <View style={styles.coHostGrid}>
                <LiveVideoBox username="Host" isHost={true} />
                <LiveVideoBox username="You (Co-host)" isMuted={isMicMuted} />
              </View>
            </View>
          ) : (
            // Normal viewer mode
            <LiveVideoPlayer hostId={hostId} hostName={hostName} />
          )}

          {/* UI OVERLAY */}
          {!simpleMode && (
            <Animated.View style={[styles.overlayLayer, animatedOverlay]}>
              <LiveOverlay 
                hostName={typeof hostName === 'string' ? hostName : 'Unknown'}
                hostId={typeof hostId === 'string' ? hostId : 'unknown'}
              >

                <TopBar 
                  hostName={typeof hostName === 'string' ? hostName : 'Unknown'} 
                  hostId={typeof hostId === 'string' ? hostId : 'unknown'} 
                  isFollowing={false} 
                  onFollowPress={() => {}} 
                />

                {!isCoHost && <IncomeHost balance={hostIncome} />}

                <FloatingGift />

                <SystemMessage message="Platform ini melarang menampilkan ketelanjangan." />

                <ChatMessageList messages={messages} />

                {isCoHost ? (
                  // Co-host actions
                  <LiveActionsCoHost
                    onSwitchCamera={() => console.log('Switch camera')}
                    onToggleMic={() => setIsMicMuted(!isMicMuted)}
                    onLeave={() => setIsCoHost(false)}
                    isMicMuted={isMicMuted}
                  />
                ) : (
                  // Normal viewer panel
                  <BottomPanel onGiftPress={() => setShowGiftModal(true)} />
                )}

              </LiveOverlay>
            </Animated.View>
          )}

          {/* Luxury Gift Layer */}
          {luxuryGiftName && <LuxuryGiftLayer name={luxuryGiftName} />}

          {/* JP Banner */}
          {jpInfo && <JpBanner milestone={jpInfo.milestone} amount={jpInfo.amount} />}

          {/* Gift Modal */}
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
  overlayLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  coHostVideoContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  coHostGrid: {
    flex: 1,
    flexDirection: 'row',
  },
});