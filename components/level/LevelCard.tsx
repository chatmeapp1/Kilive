
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import LevelBadge from './LevelBadge';

interface LevelCardProps {
  level: number;
  experience: number;
  percentage: number;
  type: 'user' | 'host';
}

export default function LevelCard({ level, experience, percentage, type }: LevelCardProps) {
  return (
    <LinearGradient
      colors={['#FFD93D', '#FF6EC7', '#B892FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.cardContent}>
        <LevelBadge level={level} type={type} />
        
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
    padding: 20,
    marginTop: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  experienceText: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});
