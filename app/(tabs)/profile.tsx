
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
            source={{ uri: 'data:image/jpeg;base64,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' }}
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
            { icon: require('@/assets/function/ic_level.png'), label: 'Level', route: '/level' },
            { icon: require('@/assets/function/ic_fans.png'), label: 'Fans', route: null },
            { icon: require('@/assets/function/ic_income.png'), label: 'Income', route: null },
            { icon: require('@/assets/function/ic_game.png'), label: 'Game', route: null },
            { icon: require('@/assets/function/ic_bergabung.png'), label: 'Join', route: null },
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
          <IconSymbol name="cart.fill" size={20} color="#333" />
          <ThemedText style={styles.sectionTitle}>Market</ThemedText>
          <IconSymbol name="chevron.right" size={20} color="#999" style={{ marginLeft: 'auto' }} />
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
});
