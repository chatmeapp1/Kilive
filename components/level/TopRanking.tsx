
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

interface RankingItem {
  rank: number;
  username: string;
  level: number;
  avatar: string;
  hasCrown: boolean;
}

interface TopRankingProps {
  rankings: RankingItem[];
}

export default function TopRanking({ rankings }: TopRankingProps) {
  const renderRankItem = (item: RankingItem) => {
    const isTopThree = item.rank <= 3;
    const crownSize = item.rank === 1 ? 40 : 30;
    
    return (
      <View key={item.rank} style={[styles.rankItem, item.rank === 1 && styles.topRank]}>
        <View style={styles.rankBadge}>
          <ThemedText style={styles.rankNumber}>{item.rank}</ThemedText>
        </View>
        
        <View style={styles.avatarContainer}>
          {item.hasCrown && (
            <View style={[styles.crown, { width: crownSize, height: crownSize }]}>
              <ThemedText style={styles.crownEmoji}>👑</ThemedText>
            </View>
          )}
          
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          
          <View style={styles.levelBadge}>
            <ThemedText style={styles.levelBadgeText}>🌟 {item.level}</ThemedText>
          </View>
        </View>
        
        <ThemedText style={styles.username} numberOfLines={1}>
          {item.username}
        </ThemedText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F5F5F5', '#E8E8E8']}
        style={styles.podium}
      >
        {/* Rank 2 */}
        <View style={styles.rank2Container}>
          {rankings[1] && renderRankItem(rankings[1])}
        </View>
        
        {/* Rank 1 */}
        <View style={styles.rank1Container}>
          {rankings[0] && renderRankItem(rankings[0])}
        </View>
        
        {/* Rank 3 */}
        <View style={styles.rank3Container}>
          {rankings[2] && renderRankItem(rankings[2])}
        </View>
      </LinearGradient>
      
      {/* Rank 4 and 5 */}
      <View style={styles.bottomRanks}>
        <View style={styles.bottomRankRow}>
          {rankings[3] && renderRankItem(rankings[3])}
        </View>
        <View style={styles.bottomRankRow}>
          {rankings[4] && renderRankItem(rankings[4])}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 12,
  },
  rank1Container: {
    flex: 1,
    alignItems: 'center',
  },
  rank2Container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  rank3Container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  topRank: {
    transform: [{ scale: 1.1 }],
  },
  rankItem: {
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  crown: {
    position: 'absolute',
    top: -26,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crownEmoji: {
    fontSize: 25,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    borderWidth: 3,
    borderColor: '#fff',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    maxWidth: 80,
    textAlign: 'center',
  },
  bottomRanks: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    paddingVertical: 12,
  },
  bottomRankRow: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
