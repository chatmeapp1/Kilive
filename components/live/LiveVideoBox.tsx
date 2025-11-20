import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LiveVideoBoxProps {
  username?: string;
  isMuted?: boolean;
  isHost?: boolean;
}

export default function LiveVideoBox({ username, isMuted, isHost }: LiveVideoBoxProps) {
  return (
    <View style={styles.container}>
      
      {/* VIDEO Placeholder */}
      <View style={styles.videoPlaceholder}>
        <Ionicons name="videocam-outline" size={40} color="#666" />
        <Text style={styles.videoText}>Connecting...</Text>
      </View>

      {/* USER INFO */}
      {username && (
        <View style={styles.userInfo}>
          <Text style={styles.username} numberOfLines={1}>{username}</Text>

          {isHost && (
            <View style={styles.hostBadge}>
              <Text style={styles.hostBadgeText}>HOST</Text>
            </View>
          )}

          {isMuted && (
            <Ionicons name="mic-off" size={14} color="#fff" style={{ marginLeft: 4 }} />
          )}
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },

  videoPlaceholder: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  videoText: {
    marginTop: 6,
    fontSize: 12,
    color: '#777',
  },

  userInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },

  username: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    maxWidth: 80,
  },

  hostBadge: {
    marginLeft: 6,
    backgroundColor: '#FFD700',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },

  hostBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
});