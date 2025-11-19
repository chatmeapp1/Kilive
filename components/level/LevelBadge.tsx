
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface LevelBadgeProps {
  level: number;
  type: 'user' | 'host';
}

export default function LevelBadge({ level, type }: LevelBadgeProps) {
  const getBadgeImage = () => {
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
    // Default to blue if outside range
    return require('@/assets/level/ic_blue.png');
  };

  const getLevelTextColor = () => {
    if (level >= 76 && level <= 100) {
      return '#fff'; // White text for black badge
    }
    return '#fff'; // Black text for other badges
  };

  return (
    <View style={styles.badgeContainer}>
      <Image source={getBadgeImage()} style={styles.badgeImage} />
      <View style={styles.levelNumberContainer}>
        <ThemedText style={[styles.levelNumber, { color: getLevelTextColor() }]}>
          {level}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    width: 48,
    height: 48,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeImage: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  levelNumberContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
