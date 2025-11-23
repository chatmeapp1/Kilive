import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
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

export default function BroadcastScreen() {
  const router = useRouter();
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('front');
  const [beautyEnabled, setBeautyEnabled] = useState(false);

  const agoraEngineRef = useRef<any>(null);

  const [hostName] = useState('MyChannel');
  const [hostId] = useState('12345');

  // Gift Engine Integration
  const { userBalance, hostIncome, sendGift } = useGiftEngine(1000);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [luxuryGiftName, setLuxuryGiftName] = useState<string | null>(null);
  const [jpInfo, setJpInfo] = useState<{ milestone: number; amount: number } | null>(null);
  const [activeGift, setActiveGift] = useState<any>(null);

  // Messages state
  const [messages, setMessages] = useState([
    { id: "1", username: "viewer1", level: 15, message: "Hello host!" },
    { id: "2", username: "viewer2", level: 30, message: "Nice stream!" }
  ]);

  // Viewers state
  const [viewers] = useState([
    { id: "v1", avatar: "https://i.pravatar.cc/150?img=1", username: "user1" },
    { id: "v2", avatar: "https://i.pravatar.cc/150?img=2", username: "user2" },
    { id: "v3", avatar: "https://i.pravatar.cc/150?img=3", username: "user3" },
  ]);

  const [viewerCount] = useState(125);
  const [isHostAway, setIsHostAway] = useState(false);

  useEffect(() => {
    // Initialize Agora here if needed
    return () => {
      // Cleanup Agora
      if (agoraEngineRef.current) {
        agoraEngineRef.current.leaveChannel();
        agoraEngineRef.current.destroy();
      }
    };
  }, []);

  const handleStartBroadcast = async () => {
    try {
      // Initialize Agora and start broadcast
      setIsBroadcasting(true);
      Alert.alert('Broadcast Started', 'You are now live!');
    } catch (error) {
      Alert.alert('Error', 'Failed to start broadcast');
      console.error(error);
    }
  };

  const handleEndBroadcast = async () => {
    Alert.alert(
      'End Broadcast',
      'Are you sure you want to end this broadcast?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End',
          style: 'destructive',
          onPress: () => {
            setIsBroadcasting(false);
            if (agoraEngineRef.current) {
              agoraEngineRef.current.leaveChannel();
            }
            router.back();
          }
        }
      ]
    );
  };

  const handleSendMessage = (msg: string) => {
    if (!msg.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      username: hostName,
      level: 99,
      message: msg.trim()
    };

    setMessages(prev => [...prev, newMessage]);
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
          messages={messages}
          onSendMessage={handleSendMessage}
          onGiftPress={() => setShowGiftModal(true)}
          onSendGift={handleSendGift}
          agoraEngine={agoraEngineRef.current}
          isHostAway={isHostAway}
          viewers={viewers}
          viewerCount={viewerCount}
        />

        <LiveActionsHost
          isBroadcasting={isBroadcasting}
          flashEnabled={flashEnabled}
          cameraType={cameraType}
          onToggleFlash={() => setFlashEnabled(!flashEnabled)}
          onSwitchCamera={() => setCameraType(prev => prev === 'front' ? 'back' : 'front')}
          onToggleBroadcast={isBroadcasting ? handleEndBroadcast : handleStartBroadcast}
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