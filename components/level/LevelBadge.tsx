
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface LevelBadgeProps {
  level: number;
  type: 'user' | 'host';
}

export default function LevelBadge({ level, type }: LevelBadgeProps) {
  return (
    <View style={[styles.badge, type === 'host' ? styles.hostBadge : styles.userBadge]}>
      <IconSymbol 
        name={type === 'host' ? 'crown.fill' : 'star.fill'} 
        size={32} 
        color="#FFD700" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  hostBadge: {
    backgroundColor: 'rgba(0, 217, 181, 0.2)',
  },
});
