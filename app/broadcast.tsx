import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

import LiveVideoBox from '@/components/live/LiveVideoBox';
import LiveTopInfo from '@/components/live/LiveTopInfo';
import LiveActionsHost from '@/components/live/LiveActionsHost';
import LiveChatList from '@/components/live/LiveChatList';
import LiveChatInput from '@/components/live/LiveChatInput';
import GiftAnimationContainer from '@/components/live/GiftAnimationContainer';

export default function BroadcastScreen() {
  const router = useRouter();
  const [viewers, setViewers] = useState(127);
  const [duration, setDuration] = useState('12:34');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);

  const [coHosts, setCoHosts] = useState([]);

  const messages = [
    { id: '1', username: 'user1', level: 22, message: 'Hello host!' },
    { id: '2', username: 'user2', level: 50, message: 'Amazing stream!' },
    { id: '3', username: 'user3', message: 'Can I be co-host?' },
  ];

  const gifts = [
    { id: '1', username: 'richUser', giftName: 'Rose', giftIcon: '🌹', amount: 5 },
  ];

  const handleEndLive = () => router.back();

  const renderVideoLayout = () => {
    if (coHosts.length === 0) {
      return (
        <View style={styles.videoFullScreen}>
          <LiveVideoBox username="Host" isHost={true} isMuted={isMicMuted} />
        </View>
      );
    }

    if (coHosts.length === 1) {
      return (
        <View style={styles.gridRow}>
          <LiveVideoBox username="Host" isHost={true} isMuted={isMicMuted} />
          <LiveVideoBox username={coHosts[0].username} isMuted={false} />
        </View>
      );
    }

    if (coHosts.length === 2) {
      return (
        <View style={styles.grid2Rows}>
          <View style={styles.gridRow}>
            <LiveVideoBox username="Host" isHost={true} />
            <LiveVideoBox username={coHosts[0].username} />
          </View>
          <LiveVideoBox username={coHosts[1].username} />
        </View>
      );
    }

    return (
      <View style={styles.grid2Rows}>
        <View style={styles.gridRow}>
          <LiveVideoBox username="Host" isHost={true} />
          <LiveVideoBox username={coHosts[0].username} />
        </View>
        <View style={styles.gridRow}>
          <LiveVideoBox username={coHosts[1].username} />
          <LiveVideoBox username={coHosts[2].username} />
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* VIDEO BACKGROUND */}
      <View style={styles.videoBackground}>
        {renderVideoLayout()}
      </View>

      {/* ALL UI OVERLAY ABSOLUTE */}
      <View style={StyleSheet.absoluteFill}>
        
        {/* TOP INFO */}
        <LiveTopInfo
          hostName="My Channel"
          viewerCount={viewers}
          duration={duration}
          onEndLive={handleEndLive}
        />

        {/* RIGHT ACTION BUTTONS */}
        <LiveActionsHost
          onSwitchCamera={() => {}}
          onToggleBeauty={() => {}}
          onToggleFlash={() => setIsFlashOn(!isFlashOn)}
          onToggleMic={() => setIsMicMuted(!isMicMuted)}
          onInviteCoHost={() => {}}
          onEndLive={handleEndLive}
          isMicMuted={isMicMuted}
          isFlashOn={isFlashOn}
        />

        {/* GIFT ANIMATIONS */}
        <GiftAnimationContainer gifts={gifts} />

        {/* CHAT LIST */}
        <LiveChatList messages={messages} />

        {/* CHAT INPUT */}
        <LiveChatInput
          onSend={(msg) => console.log(msg)}
          onGiftPress={() => console.log('Open gifts')}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  videoBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  videoFullScreen: {
    flex: 1,
  },

  gridRow: {
    flexDirection: 'row',
    flex: 1,
  },

  grid2Rows: {
    flex: 1,
  },
});