
import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
      <View style={styles.leftSection}>
        <View style={styles.hostInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View>
            <Text style={styles.hostName}>{hostName}</Text>
            <Text style={styles.duration}>{duration}</Text>
          </View>
        </View>
        
        <View style={styles.viewerBadge}>
          <IconSymbol name="eye.fill" size={14} color="#fff" />
          <Text style={styles.viewerCount}>{viewerCount}</Text>
        </View>
      </View>

      {onEndLive && (
        <TouchableOpacity style={styles.endButton} onPress={onEndLive}>
          <IconSymbol name="xmark" size={18} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingRight: 12,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
  },
  hostName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  duration: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
  },
  viewerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 4,
  },
  viewerCount: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  endButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
