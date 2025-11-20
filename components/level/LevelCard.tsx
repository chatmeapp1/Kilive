
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

interface LevelCardProps {
  level: number;
  experience: number;
  percentage: number;
  type: 'user' | 'host';
}

const getLevelIcon = (level: number) => {
  if (level >= 1 && level <= 9) {
    return require('@/assets/level/ic_blue.png');
  } else if (level >= 10 && level <= 19) {
    return require('@/assets/level/ic_green.png');
  } else if (level >= 20 && level <= 29) {
    return require('@/assets/level/ic_yellow.png');
  } else if (level >= 30 && level <= 49) {
    return require('@/assets/level/ic_orange.png');
  } else if (level >= 50 && level <= 75) {
    return require('@/assets/level/ic_red.png');
  } else if (level >= 76 && level <= 100) {
    return require('@/assets/level/ic_black.png');
  }
  return require('@/assets/level/ic_blue.png');
};

export default function LevelCard({ level, experience, percentage, type }: LevelCardProps) {
  const levelIcon = getLevelIcon(level);

  return (
    <LinearGradient
      colors={['#FFD93D', '#FF6EC7', '#B892FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconBadgeContainer}>
          <Image source={levelIcon} style={styles.iconBadge} />
          <View style={styles.levelNumberContainer}>
            <ThemedText style={styles.levelNumber}>{level}</ThemedText>
          </View>
        </View>
        
        <View style={styles.levelInfo}>
          <ThemedText style={styles.levelTitle}>User level {level}</ThemedText>
          <ThemedText style={styles.experienceText}>
            nilai pengalaman {experience.toLocaleString()} {percentage}%
          </ThemedText>
          
          <View style={styles.progressBarContainer}>
            <LinearGradient
              colors={['#00D9FF', '#00FF85']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBar, { width: `${percentage}%` }]}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBadgeContainer: {
    width: 64,
    height: 64,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBadge: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  levelNumberContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  experienceText: {
    fontSize: 12,
    color: '#000',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});
