
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function ApplyForAgencyScreen() {
  const router = useRouter();
  const [region, setRegion] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Female' | 'Male'>('Female');
  const [paperwork, setPaperwork] = useState('ID card');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');

  const userId = '703256893'; // User ID statis untuk demo

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.container}>
        {/* Header with gradient */}
        <LinearGradient
          colors={['#A8FF78', '#78FFD6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ThemedText style={styles.backText}>‹</ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>Apply For Family</ThemedText>

            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.closeButton}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Form Content */}
        <ScrollView style={styles.content}>
          <View style={styles.formCard}>
            {/* Region */}
            <TouchableOpacity style={styles.formRow}>
              <ThemedText style={styles.label}>Region</ThemedText>
              <ThemedText style={styles.arrow}>›</ThemedText>
            </TouchableOpacity>

            {/* User ID */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>User ID</ThemedText>
              <ThemedText style={styles.value}>{userId}</ThemedText>
            </View>

            {/* Family Name */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>Family Name</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Please input Family Name"
                placeholderTextColor="#999"
                value={familyName}
                onChangeText={setFamilyName}
              />
            </View>

            {/* Name */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>Name</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Please input your name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Gender */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>Gender</ThemedText>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setGender('Female')}
                >
                  <View style={styles.radioOuter}>
                    {gender === 'Female' && <View style={styles.radioInner} />}
                  </View>
                  <ThemedText style={styles.radioLabel}>Female</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setGender('Male')}
                >
                  <View style={styles.radioOuter}>
                    {gender === 'Male' && <View style={styles.radioInner} />}
                  </View>
                  <ThemedText style={styles.radioLabel}>Male</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Paperwork */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>Paperwork</ThemedText>
              <ThemedText style={styles.value}>{paperwork}</ThemedText>
            </View>

            {/* ID */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>ID</ThemedText>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#999"
                value={idNumber}
                onChangeText={setIdNumber}
              />
            </View>

            {/* Phone */}
            <View style={[styles.formRow, styles.formRowLast]}>
              <ThemedText style={styles.label}>Phone</ThemedText>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <ThemedText style={styles.submitButtonText}>Confirm submission</ThemedText>
          </TouchableOpacity>
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
    padding: 20,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 0,
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  formRowLast: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 15,
    color: '#000',
    fontWeight: '400',
    flex: 1,
  },
  value: {
    fontSize: 15,
    color: '#000',
    textAlign: 'right',
  },
  arrow: {
    fontSize: 20,
    color: '#999',
  },
  input: {
    flex: 2,
    fontSize: 15,
    color: '#000',
    textAlign: 'right',
    padding: 0,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 40,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 15,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#E8E8E8',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
});
