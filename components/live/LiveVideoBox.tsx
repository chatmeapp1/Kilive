
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface LiveVideoBoxProps {
  username?: string;
  isMuted?: boolean;
  isHost?: boolean;
}

export default function LiveVideoBox({ username, isMuted, isHost }: LiveVideoBoxProps) {
  return (
    <View style={styles.container}>
      <View style={styles.videoPlaceholder}>
        <Text style={styles.placeholderText}>📹</Text>
      </View>
      
      {username && (
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          {isHost && <Text style={styles.hostBadge}>HOST</Text>}
          {isMuted && <Text style={styles.mutedIcon}>🔇</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: '#000',
    margin: 4,
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
  },
  userInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  username: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  hostBadge: {
    backgroundColor: '#FFD700',
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mutedIcon: {
    fontSize: 12,
  },
});
