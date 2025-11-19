import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function LiveVideoPlayer({ hostId, hostName }: any) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>
        Video Host {hostName || 'Host'} (Placeholder)
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#aaa',
    fontSize: 16,
  },
});