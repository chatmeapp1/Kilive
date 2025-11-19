
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
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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
              { rank: 1, username: 'mo', level: 57, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBLG-OMXWXKkokkRiX_JmZmnX0ch8IUB3OR6K0HQ9qLA&s=10', hasCrown: true },
              { rank: 2, username: 'user2', level: 52, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLEujmvxZMrWdCI2Rf6OdBSWnqAdwFMtH1BZGrIaG5A&s=10', hasCrown: false },
              { rank: 3, username: 'hana ...', level: 49, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3hIV0YkPTrBHgKdXi6BORSmqk_XPyORdZBBwBZfZOtA&s=10', hasCrown: false },
              { rank: 4, username: '☆☆☆SU...', level: 17, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnnCypKUMznh74khV1XWbnNDpNperfk9UnFvula4Dow&s=10', hasCrown: false },
              { rank: 5, username: 'R', level: 15, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTegxD1iaRNE6Z9tx1axbRwpOlRdUyFnr7wbCDrVBOlHngz0k80Q58VXYo&s=10', hasCrown: false },
            ]}
          />
        </View>

        {/* User Host Top 5 */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>User host Top5</ThemedText>

          <TopRanking
            rankings={[
              { rank: 1, username: 'host1', level: 60, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY-eH4olfUjGxRMrF18XTKa0fyx0dzjKN49w&s', hasCrown: true },
              { rank: 2, username: 'jaka ...', level: 40, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRhK8VZOU0BvuQ4shpI9LqPRuzhNDcSJ7gf4_PZvXk9u6cigT5OYakhjx&s=10', hasCrown: false },
              { rank: 3, username: 'cellcdc', level: 14, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUtYTlcuxD8jslGmsmTGrNS3VxGs-xHMXn9TMEzk2KRTvb7l88IgQhi3M&s=10', hasCrown: false },
              { rank: 4, username: 'user4', level: 5, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEcUPBRu0ie1w-Uk40prvdG7cWDtExGCbqOFh9uD5PuA65DqIHr43W6vfE&s=10', hasCrown: false },
              { rank: 5, username: 'nacol', level: 3, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvmBI-FpC78Q4gxpOQosbtWSS4B0MtX68O8ZQJErP6zOglaA3a-TYKzFU&s=10', hasCrown: false },
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
