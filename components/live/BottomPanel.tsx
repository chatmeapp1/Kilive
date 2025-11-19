
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

export function BottomPanel() {
  return (
    <View style={styles.bottomPanel}>
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

      <ThemedText style={styles.warningText}>
        Dilarang platform diakses melanggar aturan yang berlaku. Jika konten mengandung kekerasan, konten vulgar, atau konten ilegal lainnya, akun akan di blokir.
      </ThemedText>

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
  );
}

const styles = StyleSheet.create({
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
  badgeNumber: {
    color: '#fff',
    fontSize: 11,
  },
  actionLabel: {
    color: '#999',
    fontSize: 11,
    marginTop: 4,
  },
});
