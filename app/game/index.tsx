import React from 'react';
import { StyleSheet, View, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import GameCard from '@/components/game/GameCard';

export default function GameScreen() {
  const router = useRouter();

  return (
    <>
      {/* Hilangkan header default Expo */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Status bar transparan supaya header gradient full sampai atas */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.container}>
        
        {/* Header with gradient background */}
        <LinearGradient
          colors={['#A8FF78', '#78FFD6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" size={24} color="#000" />
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>Game Center</ThemedText>

            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.closeButton}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Content Area */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Jackpot Banner */}
          <View style={styles.jackpotBanner}>
            <Image
              source={{ uri: 'https://via.placeholder.com/400x150/FFD700/000000?text=777+JACKPOT' }}
              style={styles.jackpotImage}
            />
          </View>

          <View style={styles.jackpotBadge}>
            <ThemedText style={styles.jackpotText}>Jackpot</ThemedText>
          </View>

          {/* Hot Games Section */}
          <View style={styles.section}>
            <View style={styles.gamesGrid}>
              <GameCard
                title="Legend of hero"
                badge="HOT"
                imageUri="https://via.placeholder.com/150/FF6B6B/FFFFFF?text=HERO"
              />
              <GameCard
                title="dim sum"
                badge="HOT"
                imageUri="https://via.placeholder.com/150/FFA500/FFFFFF?text=DIM+SUM"
              />
              <GameCard
                title="Vampire"
                badge="HOT"
                imageUri="https://via.placeholder.com/150/9B59B6/FFFFFF?text=VAMPIRE"
              />
            </View>
          </View>

          {/* Classic Games Section */}
          <ThemedText style={styles.sectionTitle}>Classic games</ThemedText>

          <View style={styles.section}>
            <View style={styles.gamesGrid}>
              <GameCard
                title="Greedy"
                badge="NEW"
                badgeColor="#22C55E"
                imageUri="https://via.placeholder.com/150/3498db/FFFFFF?text=GREEDY"
              />
              <GameCard
                title="Fortune Slot"
                badge="NEW"
                badgeColor="#22C55E"
                imageUri="https://via.placeholder.com/150/e74c3c/FFFFFF?text=FORTUNE"
              />
              <GameCard
                title="Zeus Slot"
                badge="NEW"
                badgeColor="#22C55E"
                imageUri="https://via.placeholder.com/150/2980b9/FFFFFF?text=ZEUS"
              />
            </View>
          </View>

          {/* More Games */}
          <View style={styles.section}>
            <View style={styles.gamesGrid}>
              <GameCard
                title="Zeus"
                imageUri="https://via.placeholder.com/150/8e44ad/FFFFFF?text=ZEUS"
              />
              <GameCard
                title="Foutune has arrived"
                imageUri="https://via.placeholder.com/150/f39c12/FFFFFF?text=FORTUNE"
              />
              <GameCard
                title="Gem Kingdom"
                imageUri="https://via.placeholder.com/150/16a085/FFFFFF?text=GEM"
              />
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5F5E3',
  },
  header: {
    paddingTop: 60,   // ditambah agar tidak terhalang status bar
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    fontSize: 16,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  jackpotBanner: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  jackpotImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  jackpotBadge: {
    alignSelf: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  jackpotText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});