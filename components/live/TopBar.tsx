
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';

interface TopBarProps {
  hostName: string;
  hostId?: string;
  isFollowing: boolean;
  onFollowPress: () => void;
}

export function TopBar({ hostName, hostId, isFollowing, onFollowPress }: TopBarProps) {
  const router = useRouter();

  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <IconSymbol name="chevron.left" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.hostInfoContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }}
          style={styles.hostAvatar}
        />
        <View style={styles.hostDetails}>
          <ThemedText style={styles.hostName}>{hostName || 'Zoey'}</ThemedText>
          <ThemedText style={styles.hostId}>ID: {hostId || '90303'}</ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.followButton}
          onPress={onFollowPress}
        >
          <IconSymbol name={isFollowing ? "checkmark" : "plus"} size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.topRightBadges}>
        <View style={styles.badgeItem}>
          <ThemedText style={styles.badgeText}>⭐</ThemedText>
        </View>
        <View style={styles.badgeItem}>
          <ThemedText style={styles.badgeText}>F</ThemedText>
          <ThemedText style={styles.badgeNumber}>25</ThemedText>
        </View>
        <View style={styles.viewerAvatars}>
          <Image source={{ uri: 'https://via.placeholder.com/30' }} style={styles.miniAvatar} />
          <Image source={{ uri: 'https://via.placeholder.com/30' }} style={styles.miniAvatar} />
          <View style={styles.viewerCount}>
            <ThemedText style={styles.viewerCountText}>67</ThemedText>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <IconSymbol name="xmark" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 8,
  },
  hostAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#fff',
  },
  hostDetails: {
    gap: 2,
  },
  hostName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  hostId: {
    color: '#fff',
    fontSize: 10,
    opacity: 0.8,
  },
  followButton: {
    backgroundColor: '#9333EA',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRightBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 'auto',
  },
  badgeItem: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeNumber: {
    color: '#fff',
    fontSize: 11,
  },
  viewerAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  viewerCount: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 32,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  viewerCountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
