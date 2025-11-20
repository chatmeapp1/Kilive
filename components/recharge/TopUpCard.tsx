
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Badge from './Badge';

interface TopUpCardProps {
  name: string;
  logo: any;
  subtitle: string;
  bestChoice: boolean;
}

export default function TopUpCard({ name, logo, subtitle, bestChoice }: TopUpCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      {bestChoice && <Badge text="Best Choice" />}
      
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} />
        <ThemedText style={styles.name}>{name}</ThemedText>
        <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '31%',
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
});
