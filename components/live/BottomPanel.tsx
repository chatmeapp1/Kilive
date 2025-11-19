
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

export function BottomPanel() {
  return (
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

      {/* Bottom Action Bar - Updated Layout */}
      <View style={styles.bottomActionBar}>
        {/* Input Text Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Obrol..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Message/Notification Icon */}
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconWrapper}>
            <IconSymbol name="envelope.fill" size={26} color="#fff" />
            <View style={styles.notificationBadge}>
              <ThemedText style={styles.badgeNumber}>1</ThemedText>
            </View>
          </View>
        </TouchableOpacity>

        {/* Co-Host Icon (Chain/Link) */}
        <TouchableOpacity style={[styles.actionButton, styles.coHostButton]}>
          <IconSymbol name="link" size={26} color="#fff" />
        </TouchableOpacity>

        {/* Game Icon */}
        <TouchableOpacity style={[styles.actionButton, styles.gameButton]}>
          <IconSymbol name="gamecontroller.fill" size={26} color="#fff" />
        </TouchableOpacity>

        {/* Gift Icon */}
        <TouchableOpacity style={[styles.actionButton, styles.giftButton]}>
          <IconSymbol name="gift.fill" size={26} color="#fff" />
        </TouchableOpacity>

        {/* More Menu (3 dots) */}
        <TouchableOpacity style={[styles.actionButton, styles.moreButton]}>
          <IconSymbol name="ellipsis" size={26} color="#fff" />
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
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
  },
  textInput: {
    color: '#fff',
    fontSize: 13,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  iconWrapper: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#EF4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeNumber: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  coHostButton: {
    backgroundColor: '#9333EA',
  },
  gameButton: {
    backgroundColor: '#3B82F6',
  },
  giftButton: {
    backgroundColor: '#EC4899',
  },
  moreButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
