
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function LiveViewerScreen() {
  const { hostId, hostName } = useLocalSearchParams();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Live Stream View */}
      <View style={styles.streamView}>
        <ThemedText style={styles.streamPlaceholder}>Live Stream Video</ThemedText>
      </View>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Host Info */}
        <View style={styles.hostInfoContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.hostAvatar}
          />
          <View style={styles.hostDetails}>
            <ThemedText style={styles.hostName}>{hostName || 'Zoey'}</ThemedText>
            <ThemedText style={styles.hostId}>ID: 90303</ThemedText>
          </View>
          <TouchableOpacity 
            style={styles.followButton}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <IconSymbol name={isFollowing ? "checkmark" : "plus"} size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Top Right Badges */}
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

      {/* Left Side - Coin Balance */}
      <View style={styles.coinBalance}>
        <View style={styles.coinBadge}>
          <ThemedText style={styles.coinIcon}>🪙</ThemedText>
          <ThemedText style={styles.coinText}>90</ThemedText>
        </View>
        <View style={styles.rankBadge}>
          <ThemedText style={styles.rankText}>Tanpa Rank</ThemedText>
        </View>
      </View>

      {/* Floating Gift Message */}
      <View style={styles.floatingGift}>
        <LinearGradient
          colors={['rgba(147, 112, 219, 0.9)', 'rgba(138, 43, 226, 0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.giftBubble}
        >
          <ThemedText style={styles.giftUser}>Matahari</ThemedText>
          <ThemedText style={styles.giftText}>Menang 😊 4000</ThemedText>
        </LinearGradient>
      </View>

      {/* Bottom User Info Panel */}
      <View style={styles.bottomPanel}>
        {/* User Profile Section */}
        <View style={styles.userProfileSection}>
          <View style={styles.userNameRow}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.userProfileAvatar}
            />
            <ThemedText style={styles.userName}>Tara dito! 😍😭</ThemedText>
          </View>
          
          <View style={styles.userNameRow}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.userProfileAvatar}
            />
            <ThemedText style={styles.userName}>Zoey ✨</ThemedText>
          </View>

          {/* User Details */}
          <View style={styles.userDetailsBox}>
            <ThemedText style={styles.userDetailText}>Usia: 31 tahun</ThemedText>
            <ThemedText style={styles.userDetailText}>Tinggi dan berat: 151cm/45kg</ThemedText>
            <ThemedText style={styles.userDetailText}>Talent: Nyanyi, Menari, Memasak</ThemedText>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>77119</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statIcon}>💜</ThemedText>
                <ThemedText style={styles.statNumber}>43</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statText}>NH**Panda🐼</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statText}>Bergabung</ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Warning Text */}
        <ThemedText style={styles.warningText}>
          Dilarang platform diakses melanggar aturan yang berlaku. Jika konten mengandung kekerasan, konten vulgar, atau konten ilegal lainnya, akun akan di blokir.
        </ThemedText>

        {/* Bottom Action Bar */}
        <View style={styles.bottomActionBar}>
          <TouchableOpacity style={styles.actionBarButton}>
            <View style={styles.messageIconContainer}>
              <IconSymbol name="paperplane.fill" size={24} color="#fff" />
              <View style={styles.notificationBadge}>
                <ThemedText style={styles.badgeNumber}>2</ThemedText>
              </View>
            </View>
            <ThemedText style={styles.actionLabel}>Obrol...</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBarButton}>
            <IconSymbol name="sparkles" size={28} color="#A78BFA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBarButton}>
            <IconSymbol name="gamecontroller.fill" size={28} color="#60A5FA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBarButton}>
            <IconSymbol name="gift.fill" size={28} color="#F472B6" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBarButton}>
            <IconSymbol name="ellipsis" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Side Gabung Button */}
      <TouchableOpacity style={styles.joinButton}>
        <ThemedText style={styles.joinButtonText}>+ Gabung</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  streamView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streamPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
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
  coinBalance: {
    position: 'absolute',
    left: 12,
    top: 110,
    gap: 8,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  coinIcon: {
    fontSize: 16,
  },
  coinText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rankBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rankText: {
    color: '#fff',
    fontSize: 11,
  },
  floatingGift: {
    position: 'absolute',
    left: 12,
    top: 220,
  },
  giftBubble: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 4,
  },
  giftUser: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  giftText: {
    color: '#fff',
    fontSize: 13,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingTop: 12,
    paddingBottom: 8,
  },
  userProfileSection: {
    paddingHorizontal: 16,
    gap: 8,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  userProfileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
  },
  userName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  userDetailsBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 12,
    gap: 6,
  },
  userDetailText: {
    color: '#fff',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statIcon: {
    fontSize: 14,
  },
  statText: {
    color: '#fff',
    fontSize: 11,
  },
  warningText: {
    color: '#999',
    fontSize: 9,
    paddingHorizontal: 16,
    marginTop: 8,
    lineHeight: 12,
  },
  bottomActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  actionBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageIconContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    color: '#999',
    fontSize: 11,
    marginTop: 4,
  },
  joinButton: {
    position: 'absolute',
    right: 12,
    bottom: 180,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
});
