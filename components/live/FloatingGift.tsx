import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

interface FloatingGiftProps {
  username?: string;
  message?: string;
}

export function FloatingGift({
  username = "Matahari",
  message = "Menang 😊 4000",
}: FloatingGiftProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(255,210,90,0.95)',
          'rgba(255,150,80,0.95)',
          'rgba(255,85,160,0.95)',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.bubble}
      >
        <ThemedText style={styles.username}>{username}</ThemedText>
        <ThemedText style={styles.message}>{message}</ThemedText>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 210,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bubble: {
    width: screenWidth * 0.70, // 70% lebar layar
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#ffb6e6',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
  },
  username: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 2,
  },
  message: {
    color: '#fff',
    fontSize: 12.5,
    marginTop: 2,
  },
});