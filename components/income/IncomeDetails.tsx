
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import DiamondIcon from '@/components/ui/DiamondIcon';

interface IncomeDetailsProps {
  date: string;
  poin: number;
  luxury: number;
  lucky: number;
  sLucky: number;
}

export default function IncomeDetails({ date, poin, luxury, lucky, sLucky }: IncomeDetailsProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Details</ThemedText>

      <View style={styles.detailRow}>
        <ThemedText style={styles.label}>Date</ThemedText>
        <ThemedText style={styles.value}>{date}</ThemedText>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.labelWithIcon}>
          <ThemedText style={styles.label}>Poin</ThemedText>
          <DiamondIcon size={16} color="#22C55E" />
          <ThemedText style={styles.label}>:</ThemedText>
        </View>
        <ThemedText style={styles.value}>{poin}</ThemedText>
      </View>

      <View style={styles.detailRow}>
        <ThemedText style={styles.label}>Luxury:</ThemedText>
        <ThemedText style={styles.value}>{luxury}</ThemedText>
      </View>

      <View style={styles.detailRow}>
        <ThemedText style={styles.label}>Lucky:</ThemedText>
        <ThemedText style={styles.value}>{lucky}</ThemedText>
      </View>

      <View style={styles.detailRow}>
        <ThemedText style={styles.label}>S-Lucky:</ThemedText>
        <ThemedText style={styles.value}>{sLucky}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});
