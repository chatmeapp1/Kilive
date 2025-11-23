
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface LiveEndSummaryProps {
  visible: boolean;
  onClose: () => void;
  onShare: () => void;
  hostName: string;
  hostAvatar: string;
  duration: number;
  viewers: number;
  crystalEarned: number;
  newFans: number;
  thumbsUp: number;
}

export default function LiveEndSummary({
  visible,
  onClose,
  onShare,
  hostName,
  hostAvatar,
  duration,
  viewers,
  crystalEarned,
  newFans,
  thumbsUp,
}: LiveEndSummaryProps) {
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <SvgIcon name="close" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>The 5th live ended.</Text>

          {/* Host Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: hostAvatar }}
              style={styles.avatar}
            />
          </View>

          {/* Host Name */}
          <Text style={styles.hostName}>{hostName}</Text>

          {/* Duration */}
          <Text style={styles.duration}>
            Effective live length: {formatDuration(duration)}
          </Text>

          {/* Stats Grid */}
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Browse users</Text>
                <Text style={styles.statValue}>{viewers}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Crystal</Text>
                <Text style={styles.statValue}>{crystalEarned}</Text>
              </View>
            </View>

            <View style={styles.statRowDivider} />

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Newly fans</Text>
                <Text style={styles.statValue}>{newFans}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Thumb up</Text>
                <Text style={styles.statValue}>{thumbsUp}</Text>
              </View>
            </View>
          </View>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={onShare}>
            <Text style={styles.shareButtonText}>share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 12,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  duration: {
    fontSize: 13,
    color: '#999',
    marginBottom: 24,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: '#3A3A3A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statRowDivider: {
    height: 1,
    backgroundColor: '#4A4A4A',
    marginVertical: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#4A4A4A',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  shareButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00D9B5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
