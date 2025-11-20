import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface IncomeDateRangeProps {
  startDate: string;
  endDate: string;
}

export default function IncomeDateRange({ startDate, endDate }: IncomeDateRangeProps) {
  return (
    <View style={styles.container}>
      
      {/* Start Date */}
      <View style={styles.dateItem}>
        <View style={styles.iconCircle}>
          <View style={styles.iconDot} />
        </View>
        <ThemedText style={styles.dateText}>{startDate}</ThemedText>
      </View>

      {/* Separator */}
      <ThemedText style={styles.separator}>To</ThemedText>

      {/* End Date */}
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

  /* Ganti IconSymbol → icon circle sederhana */
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
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