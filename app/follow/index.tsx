
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity,
  StatusBar,
  ActivityIndicator 
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ApiService from '@/services/ApiService';
import UserProfileModal from '@/components/profile/UserProfileModal';

interface FollowingUser {
  id: string;
  username: string;
  avatar_url: string;
  fans_count: number;
}

export default function FollowScreen() {
  const router = useRouter();
  const [following, setFollowing] = useState<FollowingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchFollowing();
  }, []);

  const fetchFollowing = async () => {
    try {
      setLoading(true);
      const response: any = await ApiService.request('/api/user/following');
      if (response.success) {
        setFollowing(response.data.following);
      }
    } catch (error) {
      console.error('Error fetching following:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      await ApiService.request('/api/user/unfollow', {
        method: 'POST',
        body: { userId }
      });
      // Remove from list
      setFollowing(prev => prev.filter(u => u.id !== userId));
    } catch (error) {
      console.error('Error unfollowing:', error);
    }
  };

  const handleUserPress = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  const renderItem = ({ item }: { item: FollowingUser }) => (
    <TouchableOpacity 
      style={styles.userItem}
      onPress={() => handleUserPress(item.id)}
    >
      <Image
        source={{ 
          uri: item.avatar_url || 'https://via.placeholder.com/50' 
        }}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <ThemedText style={styles.username}>{item.username}</ThemedText>
        <ThemedText style={styles.fansCount}>{item.fans_count} Fans</ThemedText>
      </View>
      <TouchableOpacity 
        style={styles.followingButton}
        onPress={() => handleUnfollow(item.id)}
      >
        <ThemedText style={styles.followingText}>Following</ThemedText>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#A8FF78', '#78FFD6']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Follow</ThemedText>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ADE80" />
        </View>
      ) : (
        <FlatList
          data={following}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>
                You're not following anyone yet
              </ThemedText>
            </View>
          }
        />
      )}

      <UserProfileModal 
        visible={selectedUserId !== null}
        userId={selectedUserId}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  fansCount: {
    fontSize: 14,
    color: '#666',
  },
  followingButton: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followingText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
