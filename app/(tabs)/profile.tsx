
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with gradient background */}
      <LinearGradient
        colors={['#A8FF78', '#78FFD6']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.editButton}>
          <ThemedText style={styles.editButtonText}>Edit</ThemedText>
        </TouchableOpacity>

        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <ThemedText style={styles.username}>GOPAY</ThemedText>
            <View style={styles.badges}>
              <IconSymbol name="star.fill" size={16} color="#FFD700" />
              <IconSymbol name="checkmark.seal.fill" size={16} color="#4A90E2" />
              <IconSymbol name="heart.fill" size={16} color="#FF69B4" />
            </View>
          </View>
          
          <ThemedText style={styles.userId}>ID:703256893</ThemedText>
          <ThemedText style={styles.bio}>karakteristik aku justru tanda tangan !</ThemedText>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>100</ThemedText>
              <ThemedText style={styles.statLabel}>Follow</ThemedText>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>0</ThemedText>
              <ThemedText style={styles.statLabel}>Fans</ThemedText>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Achievement Buttons */}
      <View style={styles.achievementRow}>
        <LinearGradient
          colors={['#FFB347', '#FF8C42']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.achievementButton}
        >
          <IconSymbol name="trophy.fill" size={24} color="#fff" />
          <ThemedText style={styles.achievementText}>Nobel ›</ThemedText>
        </LinearGradient>

        <LinearGradient
          colors={['#B8A3FF', '#8B7FE8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.achievementButton}
        >
          <IconSymbol name="sparkles" size={24} color="#fff" />
          <ThemedText style={styles.achievementText}>Pretty ›</ThemedText>
        </LinearGradient>
      </View>

      {/* Balance Card */}
      <LinearGradient
        colors={['#4ADE80', '#22C55E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.balanceCard}
      >
        <View style={styles.balanceLeft}>
          <IconSymbol name="dollarsign.circle.fill" size={32} color="#FFD700" />
          <ThemedText style={styles.balanceText}>Saldo akun: 38</ThemedText>
        </View>
        <TouchableOpacity style={styles.rechargeButton}>
          <ThemedText style={styles.rechargeText}>recharge</ThemedText>
        </TouchableOpacity>
      </LinearGradient>

      {/* Common Functions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="square.grid.2x2" size={20} color="#333" />
          <ThemedText style={styles.sectionTitle}>Common functions</ThemedText>
        </View>

        <View style={styles.functionsGrid}>
          {[
            { icon: '📈', label: 'Level' },
            { icon: '💎', label: 'Fans' },
            { icon: '💰', label: 'Income' },
            { icon: '🎮', label: 'Game' },
            { icon: '🤝', label: 'Join' },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.functionItem}>
              <View style={styles.functionIcon}>
                <ThemedText style={styles.functionEmoji}>{item.icon}</ThemedText>
              </View>
              <ThemedText style={styles.functionLabel}>{item.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Market Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <IconSymbol name="cart.fill" size={20} color="#333" />
          <ThemedText style={styles.sectionTitle}>Market</ThemedText>
          <IconSymbol name="chevron.right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.marketScroll}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} style={styles.marketItem}>
              <Image
                source={{ uri: `https://via.placeholder.com/80` }}
                style={styles.marketImage}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  editButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  userInfo: {
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  badges: {
    flexDirection: 'row',
    gap: 4,
  },
  userId: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  bio: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#ccc',
  },
  achievementRow: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  achievementButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  achievementText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  balanceCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  balanceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rechargeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rechargeText: {
    color: '#22C55E',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  functionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  functionItem: {
    width: '18%',
    alignItems: 'center',
    gap: 8,
  },
  functionIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionEmoji: {
    fontSize: 28,
  },
  functionLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  marketScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  marketItem: {
    marginRight: 12,
  },
  marketImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
});
