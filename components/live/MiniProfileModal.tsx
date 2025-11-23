
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Modal, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { getApiUrl, API_CONFIG } from '@/constants/ApiConfig';

interface MiniProfileModalProps {
  visible: boolean;
  userId: string;
  onClose: () => void;
}

export default function MiniProfileModal({ 
  visible, 
  userId, 
  onClose 
}: MiniProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (visible && userId) {
      fetchUserProfile();
    }
  }, [visible, userId]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        getApiUrl(`${API_CONFIG.ENDPOINTS.GET_PROFILE}/${userId}`)
      );
      const data = await response.json();
      
      if (data.success) {
        setProfile(data.data);
      }
    } catch (error) {
      console.log('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = () => {
    console.log('Follow user:', userId);
    // TODO: Implement follow API call
  };

  const handleSendGift = () => {
    console.log('Send gift to:', userId);
    onClose();
    // TODO: Open gift modal
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.modalContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#A855F7" />
          ) : profile ? (
            <>
              {/* Profile Image */}
              <Image
                source={{ 
                  uri: profile.avatar_url || 
                       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUg-nMmK-oPbIbmjpylqnUMF28EtNqMSQOmW5-54zbPacNKW4g9KQbBas&s=10' 
                }}
                style={styles.profileImage}
              />

              {/* Username with verified badge */}
              <View style={styles.usernameRow}>
                <ThemedText style={styles.username}>
                  {profile.username}
                </ThemedText>
                {profile.role === 'host' && (
                  <View style={styles.verifiedBadge}>
                    <ThemedText style={styles.verifiedText}>✓</ThemedText>
                  </View>
                )}
              </View>

              {/* User ID */}
              <ThemedText style={styles.userId}>
                ID: {profile.id}
              </ThemedText>

              {/* Bio */}
              {profile.bio && (
                <ThemedText style={styles.bio} numberOfLines={2}>
                  {profile.bio}
                </ThemedText>
              )}

              {/* Level Badges */}
              <View style={styles.levelRow}>
                <LinearGradient
                  colors={['#EC4899', '#F472B6']}
                  style={styles.levelBadge}
                >
                  <ThemedText style={styles.levelText}>
                    ⭐ User Level
                  </ThemedText>
                  <ThemedText style={styles.levelNumber}>1</ThemedText>
                </LinearGradient>

                {profile.role === 'host' && (
                  <LinearGradient
                    colors={['#A855F7', '#C084FC']}
                    style={styles.levelBadge}
                  >
                    <ThemedText style={styles.levelText}>
                      👑 Host Level
                    </ThemedText>
                    <ThemedText style={styles.levelNumber}>1</ThemedText>
                  </LinearGradient>
                )}
              </View>

              {/* Stats */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statLabel}>Follow</ThemedText>
                  <ThemedText style={styles.statNumber}>0</ThemedText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <ThemedText style={styles.statLabel}>Fans</ThemedText>
                  <ThemedText style={styles.statNumber}>0</ThemedText>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={onClose}
                >
                  <ThemedText style={styles.actionText}>OK</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.actionButton, styles.giftButton]}
                  onPress={handleSendGift}
                >
                  <ThemedText style={styles.actionText}>Send Gift</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.actionButton, styles.followButton]}
                  onPress={handleFollow}
                >
                  <ThemedText style={styles.actionText}>Follow</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={onClose}
                >
                  <ThemedText style={styles.actionText}>More</ThemedText>
                </TouchableOpacity>
              </View>

              {/* Report/Block Buttons */}
              <View style={styles.reportRow}>
                <TouchableOpacity style={styles.reportButton}>
                  <ThemedText style={styles.reportText}>Report</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockButton}>
                  <ThemedText style={styles.blockText}>Block</ThemedText>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <ThemedText style={styles.errorText}>Failed to load profile</ThemedText>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
    minHeight: 450,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#A855F7',
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  verifiedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  levelRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  levelBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 120,
  },
  levelText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  levelNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  giftButton: {
    backgroundColor: '#10B981',
  },
  followButton: {
    backgroundColor: '#A855F7',
  },
  actionText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '600',
  },
  reportRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  reportButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  blockButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  reportText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  blockText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  errorText: {
    color: '#666',
    fontSize: 14,
  },
});
