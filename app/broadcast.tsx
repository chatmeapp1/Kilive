import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, AppState } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import LiveOverlay from '@/components/live/LiveOverlay';
import BeautyPanel from '@/components/live/BeautyPanel';

import RtcEngine, {
  ClientRoleType,
  ChannelProfileType,
} from 'react-native-agora';

import { getApiUrl, API_CONFIG } from '@/constants/ApiConfig';

const AGORA_APP_ID = 'a1cbca25bbb24ed086dac870aa4956e3';

export default function BroadcastScreen() {
  const [agoraEngine, setAgoraEngine] = useState<RtcEngine | null>(null);
  const [roomId, setRoomId] = useState('');

  const [isHostAway, setIsHostAway] = useState(false);

  const [hostInfo, setHostInfo] = useState({
    name: '',
    avatar: '',
    id: '',
  });

  const [messages, setMessages] = useState([
    { id: '1', username: 'user2', level: 50, message: 'Host mantap!' },
    { id: '2', username: 'You', level: 10, message: 'Halooo' },
    { id: '3', username: 'You', level: 10, message: 'Apa kabar host?' },
  ]);

  const [jpQueue, setJpQueue] = useState<any[]>([]);

  // ============================
  // BEAUTY FILTER STATE
  // ============================
  const [beautyVisible, setBeautyVisible] = useState(false);

  const [beautyValues, setBeautyValues] = useState({
    lighteningLevel: 0.4,
    smoothnessLevel: 0.5,
    rednessLevel: 0.1,
    sharpnessLevel: 0.2,
    faceSlimLevel: 0.3,
    eyeEnlargeLevel: 0.3,
  });

  // ============================================================
  // DETEKSI HOST PERGI KE APLIKASI LAIN (MODE AWAY)
  // ============================================================
  useEffect(() => {
    const sub = AppState.addEventListener("change", (st) => {
      setIsHostAway(st !== "active");
    });
    return () => sub.remove();
  }, []);

  // ============================================================
  // INIT AGORA + CALL START API
  // ============================================================
  useEffect(() => {
    setupAgora();
    return () => {
      agoraEngine?.leaveChannel();
      agoraEngine?.destroy();
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

      // Call backend start live
      const res = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.START_LIVE), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Live Room', category: 'general' }),
      });

      const json = await res.json();

      setHostInfo({
        name: json.data.host?.username || "Host Channel",
        avatar: json.data.host?.avatar || "",
        id: json.data.host?.id || json.data.hostId,
      });

      setRoomId(json.data.roomId);

      await engine.joinChannel(
        json.data.agora.token,
        json.data.agora.channel,
        null,
        0
      );

      // SET BEAUTY INITIAL
      engine.setBeautyEffectOptions(true, beautyValues);

      setAgoraEngine(engine);
    } catch (error) {
      console.log("AGORA INIT ERROR:", error);
    }
  };

  // ============================================================
  // BEAUTY FILTER APPLY LIVE
  // ============================================================
  const updateBeautyValue = (key: string, val: number) => {
    setBeautyValues(prev => {
      const updated = { ...prev, [key]: val };

      if (agoraEngine) {
        agoraEngine.setBeautyEffectOptions(true, updated);
      }

      return updated;
    });
  };

  // ============================================================
  // SEND CHAT MESSAGE
  // ============================================================
  const handleSendMessage = (msg: string) => {
    if (!msg.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        username: "You",
        level: 10,
        message: msg,
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Video Placeholder */}
      <View style={styles.videoPlaceholder} />

      {/* LIVE OVERLAY */}
      <LiveOverlay
        hostName={hostInfo.name}
        hostId={hostInfo.id}
        hostAvatar={hostInfo.avatar}
        balance={0}
        messages={messages}
        jpQueue={jpQueue}
        onSendMessage={handleSendMessage}
        onGiftPress={() => console.log("Open Gift Modal")}
        agoraEngine={agoraEngine}
        isHostAway={isHostAway}
      />

      {/* BEAUTY SLIDER PANEL */}
      <BeautyPanel
        visible={beautyVisible}
        values={beautyValues}
        onChange={updateBeautyValue}
        onClose={() => setBeautyVisible(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#111',
  },
});