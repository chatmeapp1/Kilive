import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import TopBar from './TopBar';
import SystemMessage from './SystemMessage';
import CoinBalance from './IncomeHost';
import FloatingGift from './JpBanner';
import ChatMessageList from './ChatMessageList';
import BottomPanel from './BottomPanel';

export default function LiveOverlay({
  hostName,
  hostId,
  children,
}: {
  hostName: string;
  hostId: string;
  children?: React.ReactNode;
}) {
  return (
    <KeyboardAvoidingView
      style={styles.overlay}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Semua UI Overlay */}
      <TopBar hostName={hostName} hostId={hostId} isFollowing={false} onFollowPress={() => {}} />

      <CoinBalance />

      <SystemMessage message="Platform ini melarang menampilkan ketelanjangan." />

      <FloatingGift />

      <ChatMessageList
        messages={[
          { id: '1', username: 'user1', level: 22, message: 'halo host!' },
          { id: '2', username: 'user2', level: 50, message: 'mantap nih host!' },
        ]}
      />

      <BottomPanel />

      {/* Jika ada child tambahan */}
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
});