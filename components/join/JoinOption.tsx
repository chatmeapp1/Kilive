
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface JoinOptionProps {
  title: string;
  onPress: () => void;
}

export default function JoinOption({ title, onPress }: JoinOptionProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
