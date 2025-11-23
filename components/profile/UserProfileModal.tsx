
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '@/services/ApiService';

const { height } = Dimensions.get('window');

interface UserProfileModalProps {
  visible: boolean;
  userId: string | null;
  onClose: () => void;
}

interface UserProfile {
  id: string;
  username: string;
  avatarUrl: string;
  bio: string;
  role: string;
  userLevel: number;
  hostLevel: number;
  followCount: number;
  fansCount: number;
  isFollowing: boolean;
}

export default function UserProfileModal({ 
  visible, 
  userId, 
  onClose 
}: UserProfileModalProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [slideAnim] = useState(new Animated.Value(height));

  useEffect(() => {
    if (visible && userId) {
      fetchProfile();
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, userId]);

  const fetchProfile = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const response: any = await ApiService.request(`/api/user/profile-detail/${userId}`);
      if (response.success) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!userId || !profile) return;

    try {
      if (profile.isFollowing) {
        await ApiService.request('/api/user/unfollow', {
          method: 'POST',
          body: { userId }
        });
        setProfile({ ...profile, isFollowing: false });
      } else {
        await ApiService.request('/api/user/follow', {
          method: 'POST',
          body: { userId }
        });
        setProfile({ ...profile, isFollowing: true });
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <Animated.View 
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.reportButton}>
              <ThemedText style={styles.reportText}>Report</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blockButton}>
              <ThemedText style={styles.blockText}>Block</ThemedText>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4ADE80" />
            </View>
          ) : profile ? (
            <>
              {/* Profile Header */}
              <View style={styles.profileHeader}>
                <Image
                  source={{ uri: profile.avatarUrl || 'https://via.placeholder.com/100' }}
                  style={styles.avatar}
                />
                <View style={styles.nameRow}>
                  <ThemedText style={styles.username}>{profile.username}</ThemedText>
                  <Ionicons name="female" size={20} color="#FF69B4" />
                </View>
                <ThemedText style={styles.userId}>ID:{profile.id}</ThemedText>
              </View>

              {/* Level Badges */}
              <View style={styles.levelContainer}>
                <LinearGradient
                  colors={['#A8FF78', '#78FFD6']}
                  style={styles.levelBadge}
                >
                  <Ionicons name="star" size={24} color="#fff" />
                  <View style={styles.levelInfo}>
                    <ThemedText style={styles.levelLabel}>User Level</ThemedText>
                    <ThemedText style={styles.levelNumber}>{profile.userLevel}</ThemedText>
                  </View>
                </LinearGradient>

                <LinearGradient
                  colors={['#FFD93D', '#FF6EC7']}
                  style={styles.levelBadge}
                >
                  <Ionicons name="trophy" size={24} color="#fff" />
                  <View style={styles.levelInfo}>
                    <ThemedText style={styles.levelLabel}>Host Level</ThemedText>
                    <ThemedText style={styles.levelNumber}>{profile.hostLevel}</ThemedText>
                  </View>
                </LinearGradient>
              </View>

              {/* Stats */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{profile.followCount}</ThemedText>
                  <ThemedText style={styles.statLabel}>Follow</ThemedText>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <ThemedText style={styles.statNumber}>{profile.fansCount}</ThemedText>
                  <ThemedText style={styles.statLabel}>Fans</ThemedText>
                </View>
              </View>

              {/* Action Buttons Bottom */}
              <View style={styles.bottomActions}>
                <TouchableOpacity 
                  style={[
                    styles.followButton,
                    profile.isFollowing && styles.followingButton
                  ]}
                  onPress={handleFollow}
                >
                  <ThemedText style={styles.followButtonText}>
                    {profile.isFollowing ? 'Following' : 'Follow'}
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.giftButton}>
                  <ThemedText style={styles.giftButtonText}>Send Gift</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.messageButton}>
                  <ThemedText style={styles.messageButtonText}>Obrolan pribadi</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.atButton}>
                  <ThemedText style={styles.atButtonText}>@TA</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.moreButton}>
                  <ThemedText style={styles.moreButtonText}>More</ThemedText>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: height * 0.75,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  reportButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  reportText: {
    color: '#fff',
    fontWeight: '600',
  },
  blockButton: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  blockText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 60,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  userId: {
    fontSize: 14,
    color: '#666',
  },
  levelContainer: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    gap: 16,
    marginBottom: 20,
  },
  levelBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  levelInfo: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  levelNumber: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  followButton: {
    flex: 1,
    backgroundColor: '#4ADE80',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: '#ccc',
  },
  followButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  giftButton: {
    flex: 1,
    backgroundColor: '#FF6EC7',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  giftButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#78FFD6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
  atButton: {
    backgroundColor: '#FFD93D',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  atButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  moreButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  moreButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
});
