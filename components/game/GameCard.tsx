
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface GameCardProps {
  title: string;
  imageUri: string;
  badge?: string;
  badgeColor?: string;
  onPress?: () => void;
}

export default function GameCard({ title, imageUri, badge, badgeColor = '#FF6B6B', onPress }: GameCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {badge && (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <ThemedText style={styles.badgeText}>{badge}</ThemedText>
          </View>
        )}
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '31%',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
  },
});
