
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import DiamondIcon from '@/components/ui/DiamondIcon';
import IncomeDateRange from '@/components/income/IncomeDateRange';
import IncomeDetails from '@/components/income/IncomeDetails';
import { Stack } from 'expo-router';

export default function IncomeScreen() {
  const [startDate] = useState('2025-11-13');
  const [endDate] = useState('2025-11-20');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Content Area */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Title */}
        <ThemedText style={styles.headerTitle}>Pendapatan saya</ThemedText>

        {/* Points Section */}
        <View style={styles.pointsSection}>
          <View style={styles.pointsHeader}>
            <DiamondIcon size={40} color="#22C55E" />
            <ThemedText style={styles.pointsLabel}>Poin :</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.pointsValue}>0</ThemedText>

        {/* Date Range */}
        <IncomeDateRange startDate={startDate} endDate={endDate} />

        {/* Details Section */}
        <IncomeDetails
          date="2025-11-20"
          poin={0}
          luxury={0}
          lucky={0}
          sLucky={0}
        />

        <IncomeDetails
          date="2025-11-19"
          poin={0}
          luxury={0}
          lucky={0}
          sLucky={0}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    textAlign: 'center',
  },
  pointsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  pointsValue: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#22C55E',
    textAlign: 'center',
    marginVertical: 30,
  },
});
