import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface SystemMessageProps {
  message: string;
}

export function SystemMessage({ message }: SystemMessageProps) {
  return (
    <View style={styles.systemMessageContainer}>
      <ThemedText style={styles.systemMessageText}>{message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  systemMessageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 12,
  },
  systemMessageText: {
    color: '#fff',
    fontSize: 11,
    lineHeight: 15,
    opacity: 0.9,
  },
});
