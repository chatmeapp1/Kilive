
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function HostIncomeScreen() {
  const router = useRouter();
  const [hostId, setHostId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [weeklyInquiry, setWeeklyInquiry] = useState('This week');

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#A8FF78', '#78FFD6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ThemedText style={styles.backText}>‹</ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>Daily consumption</ThemedText>

            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.closeButton}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content}>
          {/* Search Form */}
          <View style={styles.searchForm}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Host ID:</ThemedText>
              <TextInput
                style={styles.input}
                value={hostId}
                onChangeText={setHostId}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>Start time :</ThemedText>
              <TextInput
                style={styles.input}
                value={startTime}
                onChangeText={setStartTime}
                placeholder=""
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>End time:</ThemedText>
              <TextInput
                style={styles.input}
                value={endTime}
                onChangeText={setEndTime}
                placeholder=""
              />
            </View>

            <View style={styles.weeklyRow}>
              <ThemedText style={styles.weeklyLabel}>Weekly inquiry</ThemedText>
              <TouchableOpacity style={styles.dropdown}>
                <ThemedText style={styles.dropdownText}>{weeklyInquiry}</ThemedText>
                <ThemedText style={styles.dropdownArrow}>▼</ThemedText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.searchButton}>
              <ThemedText style={styles.searchButtonText}>Search</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Results */}
          <View style={styles.resultsSection}>
            <TouchableOpacity style={styles.collapseButton}>
              <ThemedText style={styles.resultsTitle}>Search result</ThemedText>
              <ThemedText style={styles.collapseArrow}>◀</ThemedText>
            </TouchableOpacity>

            <View style={styles.tableHeader}>
              <ThemedText style={[styles.tableHeaderText, { flex: 1 }]}>Date</ThemedText>
              <ThemedText style={[styles.tableHeaderText, { flex: 1 }]}>ID</ThemedText>
              <ThemedText style={[styles.tableHeaderText, { flex: 1 }]}>U coin</ThemedText>
            </View>

            {/* Empty state */}
            <View style={styles.emptyState}>
              <ThemedText style={styles.emptyText}>No data available</ThemedText>
            </View>
          </View>
        </ScrollView>

        {/* Footer Total */}
        <LinearGradient
          colors={['#8B5CF6', '#6366F1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.footer}
        >
          <ThemedText style={styles.footerText}>Total: 0</ThemedText>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
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
  backText: {
    fontSize: 32,
    color: '#000',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    fontSize: 16,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  searchForm: {
    padding: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
  weeklyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  weeklyLabel: {
    fontSize: 16,
    color: '#000',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  searchButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  resultsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  collapseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  collapseArrow: {
    fontSize: 16,
    color: '#666',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  emptyState: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
