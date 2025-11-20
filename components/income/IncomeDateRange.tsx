
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface IncomeDateRangeProps {
  startDate: string;
  endDate: string;
}

export default function IncomeDateRange({ startDate, endDate }: IncomeDateRangeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.dateItem}>
        <View style={styles.iconCircle}>
          <IconSymbol name="clock" size={16} color="#fff" />
        </View>
        <ThemedText style={styles.dateText}>{startDate}</ThemedText>
      </View>

      <ThemedText style={styles.separator}>To</ThemedText>

      <ThemedText style={styles.dateText}>{endDate}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  separator: {
    fontSize: 14,
    color: '#999',
    marginHorizontal: 12,
  },
});
