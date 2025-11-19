
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export function JoinButton() {
  return (
    <TouchableOpacity style={styles.joinButton}>
      <ThemedText style={styles.joinButtonText}>+ Gabung</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  joinButton: {
    position: 'absolute',
    right: 12,
    bottom: 180,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
});
