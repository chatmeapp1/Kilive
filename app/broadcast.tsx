import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import LiveVideoPlayer from '@/components/live/LiveVideoPlayer';
import LiveOverlay from '@/components/live/LiveOverlay';
import LiveActionsHost from '@/components/live/LiveActionsHost';
import GiftModal from '@/components/live/GiftModal';
import LuxuryGiftLayer from '@/components/live/LuxuryGiftLayer';
import FloatingGiftMultiContainer from '@/components/live/FloatingGiftMultiContainer';
import JpBanner from '@/components/live/JpBanner';

import useGiftEngine from '@/hooks/useGiftEngine';
import { useLiveState } from '@/hooks/useLiveState';
import { useAgoraEngine } from '@/hooks/useAgoraEngine';
import { useSocketConnection } from '@/hooks/useSocketConnection';
import LiveEndSummary from '@/components/live/LiveEndSummary';

export default function BroadcastScreen() {
  const router = useRouter();

  const [hostName] = useState('MyChannel');
  const [hostId] = useState('12345');
  const [startTime] = useState(Date.now());

  // Use custom hooks
  const liveState = useLiveState();
  const { userBalance, hostIncome, sendGift } = useGiftEngine(1000);
  
  const agoraEngine = useAgoraEngine({
    channelName: `live_${hostId}`,
    uid: parseInt(hostId),
    isHost: true,
  });

  const socket = useSocketConnection({
    roomId: `live_${hostId}`,
    userId: hostId,
    username: hostName,
  });
  
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showEndSummary, setShowEndSummary] = useState(false);
  const [luxuryGiftName, setLuxuryGiftName] = useState<string | null>(null);
  const [jpInfo, setJpInfo] = useState<{ milestone: number; amount: number } | null>(null);
  const [activeGift, setActiveGift] = useState<any>(null);

  useEffect(() => {
    return () => {
      agoraEngine.cleanup();
      socket.disconnectSocket();
    };
  }, []);

  const handleStartBroadcast = async () => {
    try {
      liveState.setIsBroadcasting(true);
      Alert.alert('Broadcast Started', 'You are now live!');
    } catch (error) {
      Alert.alert('Error', 'Failed to start broadcast');
      console.error(error);
    }
  };

  const handleEndBroadcast = async () => {
    liveState.setIsBroadcasting(false);
    await agoraEngine.cleanup();
    socket.disconnectSocket();
    setShowEndSummary(true);
  };

  const handleCloseSummary = () => {
    setShowEndSummary(false);
    router.back();
  };

  const handleShareSummary = () => {
    // TODO: Implement share functionality
    Alert.alert('Share', 'Share functionality coming soon!');
  };

  const calculateDuration = () => {
    return Math.floor((Date.now() - startTime) / 1000);
  };

  const handleSendMessage = (msg: string) => {
    if (!msg.trim()) return;
    socket.sendMessage(msg);
    liveState.addMessage(hostName, msg, 99);
  };

  const handleSendGift = (gift: any, combo: number) => {
    const result = sendGift(gift, combo);

    // Set active gift for FloatingGiftMultiContainer
    setActiveGift({
      spenderId: "VIEWER_" + Math.random(),
      username: "Viewer " + Math.floor(Math.random() * 100),
      avatar: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70),
      giftName: gift.name,
      type: gift.category,
    });

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

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <LiveVideoPlayer
          hostId={hostId}
          hostName={hostName}
          isHost={true}
        />

        <LiveOverlay
          hostName={hostName}
          hostId={hostId}
          hostAvatar="https://i.pravatar.cc/150?img=50"
          balance={hostIncome}
          messages={liveState.messages}
          onSendMessage={handleSendMessage}
          onGiftPress={() => setShowGiftModal(true)}
          onSendGift={handleSendGift}
          agoraEngine={agoraEngine.agoraEngine}
          isHostAway={liveState.isHostAway}
          viewers={liveState.viewers}
          viewerCount={liveState.viewerCount}
        />

        <LiveActionsHost
          isMicMuted={liveState.isMicMuted}
          isFlashOn={liveState.flashEnabled}
          isBeautyOn={liveState.beautyEnabled}
          onToggleFlash={liveState.toggleFlash}
          onSwitchCamera={liveState.toggleCamera}
          onToggleBeauty={liveState.toggleBeauty}
          onToggleMic={liveState.toggleMic}
          onEndLive={handleEndBroadcast}
        />

        {/* Luxury Gift Layer */}
        {luxuryGiftName && <LuxuryGiftLayer name={luxuryGiftName} />}

        {/* JP Banner */}
        {jpInfo && (
          <JpBanner milestone={jpInfo.milestone} amount={jpInfo.amount} />
        )}

        {/* Gift Modal */}
        <GiftModal
          visible={showGiftModal}
          onClose={() => setShowGiftModal(false)}
          onSendGift={handleSendGift}
          userBalance={userBalance}
        />

        {/* Floating Gift Container */}
        <FloatingGiftMultiContainer activeGift={activeGift} />

        {/* Live End Summary */}
        <LiveEndSummary
          visible={showEndSummary}
          onClose={handleCloseSummary}
          onShare={handleShareSummary}
          hostName={hostName}
          hostAvatar="https://i.pravatar.cc/150?img=50"
          duration={calculateDuration()}
          viewers={liveState.viewerCount}
          crystalEarned={hostIncome}
          newFans={5}
          thumbsUp={120}
        />

      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});