
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface SystemMessageProps {
  message: string;
}

export default function SystemMessage({ message }: SystemMessageProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>ℹ️ {message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 140,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  text: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
  },
});
