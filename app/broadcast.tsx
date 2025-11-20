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

  // Co-host state
  const [coHosts, setCoHosts] = useState<Array<{ id: string; username: string }>>([]);

  const messages = [
    { id: '1', username: 'user1', level: 22, message: 'Hello host!' },
    { id: '2', username: 'user2', level: 50, message: 'Amazing stream!' },
    { id: '3', username: 'user3', message: 'Can I be co-host?' },
  ];

  const gifts = [
    { id: '1', username: 'richUser', giftName: 'Rose', giftIcon: '🌹', amount: 5 },
  ];

  const handleEndLive = () => {
    router.back();
  };

  const handleSendMessage = (message: string) => {
    console.log('Send message:', message);
  };

  const renderVideoLayout = () => {
    if (coHosts.length === 0) {
      // Full screen host only
      return (
        <View style={styles.videoFullScreen}>
          <LiveVideoBox username="Host" isHost={true} isMuted={isMicMuted} />
        </View>
      );
    } else if (coHosts.length === 1) {
      // 2 grid layout
      return (
        <View style={styles.videoGrid2}>
          <LiveVideoBox username="Host" isHost={true} isMuted={isMicMuted} />
          <LiveVideoBox username={coHosts[0].username} isMuted={false} />
        </View>
      );
    } else if (coHosts.length === 2) {
      // 3 grid layout
      return (
        <View style={styles.videoGrid3}>
          <View style={styles.videoRow}>
            <LiveVideoBox username="Host" isHost={true} isMuted={isMicMuted} />
            <LiveVideoBox username={coHosts[0].username} />
          </View>
          <LiveVideoBox username={coHosts[1].username} />
        </View>
      );
    } else {
      // 4 grid layout
      return (
        <View style={styles.videoGrid4}>
          <View style={styles.videoRow}>
            <LiveVideoBox username="Host" isHost={true} isMuted={isMicMuted} />
            <LiveVideoBox username={coHosts[0].username} />
          </View>
          <View style={styles.videoRow}>
            <LiveVideoBox username={coHosts[1].username} />
            <LiveVideoBox username={coHosts[2].username} />
          </View>
        </View>
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Video Background */}
      <View style={styles.videoBackground}>
        {renderVideoLayout()}
      </View>

      {/* UI Overlay */}
      <View style={styles.overlay}>
        {/* Top Info */}
        <LiveTopInfo
          hostName="My Channel"
          viewerCount={viewers}
          duration={duration}
          onEndLive={handleEndLive}
        />

        {/* Right Actions */}
        <LiveActionsHost
          onSwitchCamera={() => console.log('Switch camera')}
          onToggleBeauty={() => console.log('Toggle beauty')}
          onToggleFlash={() => setIsFlashOn(!isFlashOn)}
          onToggleMic={() => setIsMicMuted(!isMicMuted)}
          onInviteCoHost={() => console.log('Invite co-host')}
          onEndLive={handleEndLive}
          isMicMuted={isMicMuted}
          isFlashOn={isFlashOn}
        />

        {/* Gift Animations */}
        <GiftAnimationContainer gifts={gifts} />

        {/* Chat List */}
        <LiveChatList messages={messages} />

        {/* Chat Input */}
        <LiveChatInput
          onSend={handleSendMessage}
          onGiftPress={() => console.log('Open gift panel')}
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
    left: 0,
    right: 0,
    bottom: 0,
  },
  videoFullScreen: {
    flex: 1,
  },
  videoGrid2: {
    flex: 1,
    flexDirection: 'row',
  },
  videoGrid3: {
    flex: 1,
  },
  videoGrid4: {
    flex: 1,
  },
  videoRow: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
  },
});