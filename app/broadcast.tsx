
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import RtcEngine, { ChannelProfileType, ClientRoleType } from 'react-native-agora';

import LiveVideoBox from '@/components/live/LiveVideoBox';
import LiveTopInfo from '@/components/live/LiveTopInfo';
import LiveActionsHost from '@/components/live/LiveActionsHost';
import LiveChatList from '@/components/live/LiveChatList';
import LiveChatInput from '@/components/live/LiveChatInput';
import GiftAnimationContainer from '@/components/live/GiftAnimationContainer';

const AGORA_APP_ID = 'a1cbca25bbb24ed086dac870aa4956e3';

export default function BroadcastScreen() {
  const router = useRouter();
  const [viewers, setViewers] = useState(0);
  const [duration, setDuration] = useState('00:00');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [coHosts, setCoHosts] = useState([]);
  const [agoraEngine, setAgoraEngine] = useState<RtcEngine | null>(null);
  const [roomId, setRoomId] = useState('');

  const messages = [
    { id: '1', username: 'user1', level: 22, message: 'Hello host!' },
    { id: '2', username: 'user2', level: 50, message: 'Amazing stream!' },
    { id: '3', username: 'user3', message: 'Can I be co-host?' },
  ];

  const gifts = [
    { id: '1', username: 'richUser', giftName: 'Rose', giftIcon: '🌹', amount: 5 },
  ];

  useEffect(() => {
    setupAgora();
    return () => {
      if (agoraEngine) {
        agoraEngine.leaveChannel();
        agoraEngine.destroy();
      }
    };
  }, []);

  const setupAgora = async () => {
    try {
      const engine = await RtcEngine.createWithContext({
        appId: AGORA_APP_ID,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });

      engine.enableVideo();
      engine.enableAudio();
      engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);

      // Start live stream
      const response = await fetch('YOUR_BACKEND_URL/api/live/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_TOKEN'
        },
        body: JSON.stringify({
          title: 'My Live Stream',
          category: 'general'
        })
      });

      const data = await response.json();
      if (data.success) {
        setRoomId(data.data.roomId);
        await engine.joinChannel(
          data.data.agora.token,
          data.data.agora.channel,
          null,
          0
        );
        setAgoraEngine(engine);
      }
    } catch (error) {
      console.error('Agora setup error:', error);
    }
  };

  const handleEndLive = async () => {
    if (agoraEngine) {
      await agoraEngine.leaveChannel();
      
      // End live on server
      await fetch('YOUR_BACKEND_URL/api/live/end', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_TOKEN'
        },
        body: JSON.stringify({ roomId })
      });
    }
    router.back();
  };

  const handleToggleMic = () => {
    if (agoraEngine) {
      agoraEngine.muteLocalAudioStream(!isMicMuted);
      setIsMicMuted(!isMicMuted);
    }
  };

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

      <View style={styles.videoBackground}>
        {renderVideoLayout()}
      </View>

      <View style={StyleSheet.absoluteFill}>
        <LiveTopInfo
          hostName="My Channel"
          viewerCount={viewers}
          duration={duration}
          onEndLive={handleEndLive}
        />

        <LiveActionsHost
          onSwitchCamera={() => agoraEngine?.switchCamera()}
          onToggleBeauty={() => {}}
          onToggleFlash={() => setIsFlashOn(!isFlashOn)}
          onToggleMic={handleToggleMic}
          onInviteCoHost={() => {}}
          onEndLive={handleEndLive}
          isMicMuted={isMicMuted}
          isFlashOn={isFlashOn}
        />

        <GiftAnimationContainer gifts={gifts} />
        <LiveChatList messages={messages} />
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
