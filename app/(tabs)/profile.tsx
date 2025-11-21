
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
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
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUg-nMmK-oPbIbmjpylqnUMF28EtNqMSQOmW5-54zbPacNKW4g9KQbBas&s=10' }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <ThemedText style={styles.username}>GOPAY</ThemedText>
            <View style={styles.badges}>
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
          <ThemedText style={styles.achievementText}>Nobel ›</ThemedText>
        </LinearGradient>

        <LinearGradient
          colors={['#B8A3FF', '#8B7FE8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.achievementButton}
        >
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
          <ThemedText style={styles.balanceText}>Saldo akun: 38</ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.rechargeButton}
          onPress={() => router.push('/recharge')}
        >
          <ThemedText style={styles.rechargeText}>recharge</ThemedText>
        </TouchableOpacity>
      </LinearGradient>

      {/* Common Functions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Common functions</ThemedText>
        </View>

        <View style={styles.functionsGrid}>
          {[
            { icon: require('@/assets/function/ic_level.png'), label: 'Level', route: '/level' },
            { icon: require('@/assets/function/ic_fans.png'), label: 'Fans', route: '/fans' },
            { icon: require('@/assets/function/ic_income.png'), label: 'Income', route: '/income' },
            { icon: require('@/assets/function/ic_game.png'), label: 'Game', route: '/game' },
            { icon: require('@/assets/function/ic_bergabung.png'), label: 'Join', route: '/join' },
          ].map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.functionItem}
              onPress={() => item.route && router.push(item.route)}
            >
              <View style={styles.functionIcon}>
                <Image source={item.icon} style={styles.functionIconImage} />
              </View>
              <ThemedText style={styles.functionLabel}>{item.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Market Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Market</ThemedText>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.marketScroll}>
          {[
            { id: 1, image: require('@/assets/market/ic_market.png') },
            { id: 2, image: require('@/assets/market/ic_market1.png') },
            { id: 3, image: require('@/assets/market/ic_motor.png') },
            { id: 4, image: require('@/assets/market/ic_sport.png') },
          ].map((item) => (
            <TouchableOpacity key={item.id} style={styles.marketItem}>
              <Image
                source={item.image}
                style={styles.marketImage}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Settings Menu */}
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => router.push('/settings')}
      >
        <ThemedText style={styles.settingsText}>Settings</ThemedText>
        <ThemedText style={styles.settingsArrow}>›</ThemedText>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
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
  functionIconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
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
  settingsButton: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  settingsArrow: {
    fontSize: 24,
    color: '#666',
  },
});