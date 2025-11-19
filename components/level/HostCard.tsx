
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import LevelBadge from './LevelBadge';

interface HostCardProps {
  level: number;
  experience: number;
  percentage: number;
}

export default function HostCard({ level, experience, percentage }: HostCardProps) {
  return (
    <LinearGradient
      colors={['#00D9B5', '#B5F492']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.cardContent}>
        <LevelBadge level={level} type="host" />
        
        <View style={styles.levelInfo}>
          <ThemedText style={styles.levelTitle}>User host {level}</ThemedText>
          <ThemedText style={styles.experienceText}>
            nilai pengalaman {experience} {percentage}%
          </ThemedText>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${percentage}%` }]} />
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
    color: '#000',
    marginBottom: 4,
  },
  experienceText: {
    fontSize: 12,
    color: '#fff',
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
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});
