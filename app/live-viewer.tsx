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
import LiveActionsCoHost from '@/components/live/LiveActionsCoHost';
import LiveVideoBox from '@/components/live/LiveVideoBox';
import GiftModal from '@/components/live/GiftModal';

export default function LiveViewerScreen() {
  const { hostId, hostName } = useLocalSearchParams();
  const [simpleMode, setSimpleMode] = useState(false);
  
  // Co-host mode state
  const [isCoHost, setIsCoHost] = useState(false); // Set true untuk test co-host mode
  const [isMicMuted, setIsMicMuted] = useState(false);

  // Gift modal state
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [userBalance, setUserBalance] = useState(1000); // Initial balance

  // Handle gift send
  const handleSendGift = (gift: any, combo: number) => {
    const totalCost = gift.price * combo;
    const category = gift.category;

    // Deduct from user balance
    setUserBalance(prev => prev - totalCost);

    // Calculate host income based on gift type
    let hostIncome = 0;
    if (category === 'slucky' || category === 'lucky') {
      // 10% goes to host for lucky gifts
      hostIncome = totalCost * 0.1;
    } else if (totalCost >= 1000000) {
      // 50% goes to host for gifts above 1M
      hostIncome = totalCost * 0.5;
    } else {
      // Default 10% for other luxury gifts
      hostIncome = totalCost * 0.1;
    }

    // Check for jackpot rewards (Lucky & S-Lucky only)
    if (category === 'slucky' || category === 'lucky') {
      checkJackpotReward(gift, combo, totalCost);
    }

    console.log('Gift sent:', gift.name, 'x', combo);
    console.log('Total cost:', totalCost);
    console.log('Host income:', hostIncome);
  };

  const checkJackpotReward = (gift: any, combo: number, totalCost: number) => {
    // JP Lucky rewards at: 20s, 50s, 100s, 200s, 300s, 500s
    const jpMilestones = [20, 50, 100, 200, 300, 500];
    
    // Lucky-S special rewards at 500s and 1000s when price is 200+
    if (gift.category === 'slucky' && gift.price >= 200) {
      const specialMilestones = [500, 1000];
      // At 500s: reward 1M coins
      // At 1000s: reward 2M coins (double)
      specialMilestones.forEach(milestone => {
        if (combo >= milestone) {
          const reward = milestone === 500 ? 1000000 : 2000000;
          setUserBalance(prev => prev + reward);
          console.log(`🎉 JACKPOT! You won ${reward} coins at ${milestone}s!`);
        }
      });
    }

    // S-Lucky gets double coins based on gift price
    if (gift.category === 'slucky') {
      const doubleReward = totalCost;
      setUserBalance(prev => prev + doubleReward);
      console.log(`💎 S-Lucky bonus: ${doubleReward} coins!`);
    }

    // Regular JP milestones
    jpMilestones.forEach(milestone => {
      if (combo === milestone) {
        const baseReward = gift.price * 10; // 10x gift price as reward
        setUserBalance(prev => prev + baseReward);
        console.log(`🎊 JP Milestone ${milestone}s reached! Reward: ${baseReward} coins!`);
      }
    });
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

                {!isCoHost && <CoinBalance balance={userBalance} />}

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