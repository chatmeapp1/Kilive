
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { DiamondIcon } from '@/components/ui/DiamondIcon';
import IncomeDateRange from '@/components/income/IncomeDateRange';
import IncomeDetails from '@/components/income/IncomeDetails';

export default function IncomeScreen() {
  const router = useRouter();
  const [startDate] = useState('2025-11-13');
  const [endDate] = useState('2025-11-20');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with gradient background */}
      <LinearGradient
        colors={['#A8FF78', '#78FFD6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#000" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Pendapatan saya</ThemedText>
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText style={styles.closeButton}>Close</ThemedText>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content Area */}
      <ScrollView style={styles.content}>
        {/* Points Section */}
        <View style={styles.pointsSection}>
          <View style={styles.pointsHeader}>
            <DiamondIcon size={40} />
            <ThemedText style={styles.pointsLabel}>Poin :</ThemedText>
          </View>
          
          <TouchableOpacity style={styles.historyButton}>
            <ThemedText style={styles.historyButtonText}>History</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText style={styles.pointsValue}>0</ThemedText>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.withdrawButton}>
            <ThemedText style={styles.withdrawButtonText}>Menarik uang</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.exchangeButton}>
            <ThemedText style={styles.exchangeButtonText}>Exchange</ThemedText>
          </TouchableOpacity>
        </View>

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
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    fontSize: 16,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  pointsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  historyButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  historyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  pointsValue: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#22C55E',
    textAlign: 'center',
    marginVertical: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  withdrawButton: {
    flex: 1,
    backgroundColor: '#FF8C42',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  withdrawButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exchangeButton: {
    flex: 1,
    backgroundColor: '#22C55E',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  exchangeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
