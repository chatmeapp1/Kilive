import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface SystemMessageProps {
  message: string;
}

export function SystemMessage({ message }: SystemMessageProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        <ThemedText style={styles.title}>Peringatan Sistem</ThemedText>
        <ThemedText style={styles.text}>{message}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  box: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  title: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 4,
  },
  text: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 16,
    opacity: 0.9,
  },
});