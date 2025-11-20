import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LiveTopInfoProps {
  hostName: string;
  hostAvatar?: string;
  viewerCount: number;
  duration: string;
  onEndLive?: () => void;
}

export default function LiveTopInfo({ 
  hostName, 
  hostAvatar,
  viewerCount, 
  duration,
  onEndLive 
}: LiveTopInfoProps) {
  return (
    <View style={styles.container}>

      {/* LEFT SIDE */}
      <View style={styles.leftWrapper}>

        {/* HOST INFO */}
        <View style={styles.hostPill}>
          <View style={styles.avatarBox}>
            {hostAvatar ? (
              <Image source={{ uri: hostAvatar }} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person-circle" size={28} color="#fff" />
            )}
          </View>

          <View>
            <Text style={styles.hostName}>{hostName}</Text>
            <Text style={styles.duration}>{duration}</Text>
          </View>
        </View>

        {/* VIEWER COUNT */}
        <View style={styles.viewerBadge}>
          <Ionicons name="eye" size={14} color="#fff" />
          <Text style={styles.viewerCount}>{viewerCount}</Text>
        </View>
      </View>

      {/* END LIVE BUTTON */}
      {onEndLive && (
        <TouchableOpacity style={styles.endButton} onPress={onEndLive}>
          <Ionicons name="close" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 44,
    left: 16,
    right: 16,
    zIndex: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  hostPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 50,
    gap: 8,
  },

  avatarBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888',
  },

  avatarImg: {
    width: '100%',
    height: '100%',
  },

  hostName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  duration: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 11,
  },

  viewerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,77,77,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },

  viewerCount: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },

  endButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF4040',
    justifyContent: 'center',
    alignItems: 'center',
  },
});