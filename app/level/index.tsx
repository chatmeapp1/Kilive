
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import LevelCard from '@/components/level/LevelCard';
import HostCard from '@/components/level/HostCard';
import TopRanking from '@/components/level/TopRanking';

export default function LevelScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Level</ThemedText>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <ThemedText style={styles.rulesButton}>aturan level</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Level Card */}
        <LevelCard
          level={31}
          experience={4134900}
          percentage={34}
          type="user"
        />

        {/* User Host Card */}
        <HostCard
          level={0}
          experience={0}
          percentage={0}
        />

        {/* User Level Top 5 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>User level Top5</ThemedText>
            <TouchableOpacity style={styles.rulesButtonGreen}>
              <ThemedText style={styles.rulesButtonText}>aturan naik papan</ThemedText>
            </TouchableOpacity>
          </View>

          <TopRanking
            rankings={[
              { rank: 1, username: 'mo', level: 57, avatar: 'https://via.placeholder.com/80', hasCrown: true },
              { rank: 2, username: 'user2', level: 52, avatar: 'https://via.placeholder.com/80', hasCrown: false },
              { rank: 3, username: 'oRLin ...', level: 49, avatar: 'https://via.placeholder.com/80', hasCrown: false },
              { rank: 4, username: '☆☆☆SU...', level: 17, avatar: 'https://via.placeholder.com/80', hasCrown: false },
              { rank: 5, username: 'R', level: 15, avatar: 'https://via.placeholder.com/80', hasCrown: false },
            ]}
          />
        </View>

        {/* User Host Top 5 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>User host Top5</ThemedText>

          <TopRanking
            rankings={[
              { rank: 1, username: 'host1', level: 60, avatar: 'https://via.placeholder.com/80', hasCrown: true },
              { rank: 2, username: 'oRLin ...', level: 40, avatar: 'https://via.placeholder.com/80', hasCrown: false },
              { rank: 3, username: 'cellcdc', level: 14, avatar: 'https://via.placeholder.com/80', hasCrown: false },
              { rank: 4, username: 'user4', level: 5, avatar: 'https://via.placeholder.com/80', hasCrown: false },
              { rank: 5, username: 'nacol', level: 3, avatar: 'https://via.placeholder.com/80', hasCrown: false },
            ]}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  rulesButton: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  rulesButtonGreen: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rulesButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
