
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function RelationManagementScreen() {
  const router = useRouter();
  const [hostId, setHostId] = useState('');

  // Sample data
  const hosts = [
    {
      hostId: '704401200',
      joinTime: '2024-11-22 18:2...',
    },
  ];

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

            <ThemedText style={styles.headerTitle}>Family relation management</ThemedText>

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
                placeholder="Input host ID"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity style={styles.searchButton}>
              <ThemedText style={styles.searchButtonText}>Search</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Results */}
          <View style={styles.resultsSection}>
            <ThemedText style={styles.resultsTitle}>Search result</ThemedText>

            <View style={styles.tableHeader}>
              <ThemedText style={[styles.tableHeaderText, { flex: 1 }]}>host ID</ThemedText>
              <ThemedText style={[styles.tableHeaderText, { flex: 1.5 }]}>Jion time</ThemedText>
              <ThemedText style={[styles.tableHeaderText, { flex: 1 }]}>Recomme...</ThemedText>
            </View>

            {/* Data rows */}
            {hosts.map((host, index) => (
              <View key={index} style={styles.tableRow}>
                <ThemedText style={[styles.tableCell, { flex: 1 }]}>{host.hostId}</ThemedText>
                <ThemedText style={[styles.tableCell, { flex: 1.5 }]}>{host.joinTime}</ThemedText>
                <TouchableOpacity style={{ flex: 1 }}>
                  <ThemedText style={styles.recommendButton}>Recommend</ThemedText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
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
    marginBottom: 20,
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
    marginBottom: 40,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
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
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  recommendButton: {
    fontSize: 14,
    color: '#8B5CF6',
    textAlign: 'center',
    fontWeight: '500',
  },
});
