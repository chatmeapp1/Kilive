
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface JoinOptionProps {
  title: string;
  onPress: () => void;
}

export default function JoinOption({ title, onPress }: JoinOptionProps) {
  return (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <ThemedText style={styles.optionTitle}>{title}</ThemedText>
      <ThemedText style={styles.arrow}>›</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  arrow: {
    fontSize: 24,
    color: '#999',
  },
});
