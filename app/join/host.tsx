
import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, TextInput, ScrollView, Linking, Modal } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

const COUNTRIES = [
  'Indonesia',
  'Philippines',
  'Thailand',
  'India',
  'Arab Saudi',
  'Vietnam',
];

export default function ApplyForHostScreen() {
  const router = useRouter();
  const [region, setRegion] = useState('');
  const [joinFamily, setJoinFamily] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Female' | 'Male'>('Female');
  const [paperwork, setPaperwork] = useState('ID card');
  const [idNumber, setIdNumber] = useState('');
  const [isConsent, setIsConsent] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);

  const userId = '703256893'; // User ID statis untuk demo

  const handleProtocolPress = () => {
    // Link ke protokol autentikasi anchor
    // Linking.openURL('https://example.com/anchor-authentication-protocol');
  };

  const handleSelectRegion = (country: string) => {
    setRegion(country);
    setShowRegionModal(false);
  };

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

            <ThemedText style={styles.headerTitle}>Apply For Anchor</ThemedText>

            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.closeButton}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Form Content */}
        <ScrollView style={styles.content}>
          <View style={styles.formCard}>
            {/* Region */}
            <TouchableOpacity style={styles.formRow} onPress={() => setShowRegionModal(true)}>
              <ThemedText style={styles.label}>Region</ThemedText>
              <View style={styles.rowRight}>
                {region ? (
                  <ThemedText style={styles.value}>{region}</ThemedText>
                ) : null}
                <ThemedText style={styles.arrow}>›</ThemedText>
              </View>
            </TouchableOpacity>

            {/* User ID */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>User ID</ThemedText>
              <ThemedText style={styles.value}>{userId}</ThemedText>
            </View>

            {/* Join Family */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>Join Family</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Please input family ID"
                placeholderTextColor="#999"
                value={joinFamily}
                onChangeText={setJoinFamily}
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
            <View style={[styles.formRow, styles.formRowLast]}>
              <ThemedText style={styles.label}>ID</ThemedText>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#999"
                value={idNumber}
                onChangeText={setIdNumber}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <ThemedText style={styles.submitButtonText}>Confirm submission</ThemedText>
          </TouchableOpacity>

          {/* Consent Checkbox */}
          <View style={styles.consentContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsConsent(!isConsent)}
            >
              <View style={styles.checkboxOuter}>
                {isConsent && <View style={styles.checkboxInner} />}
              </View>
              <ThemedText style={styles.consentText}>
                Submission is consent{' '}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleProtocolPress}>
              <ThemedText style={styles.protocolLink}>
                《Anchor Authentication Protocol》
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Region Selection Modal */}
        <Modal
          visible={showRegionModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowRegionModal(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              style={styles.modalBackdrop} 
              activeOpacity={1}
              onPress={() => setShowRegionModal(false)}
            />
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowRegionModal(false)}>
                  <ThemedText style={styles.modalCancel}>cancel</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowRegionModal(false)}>
                  <ThemedText style={styles.modalDetermine}>Determine</ThemedText>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalList}>
                {COUNTRIES.map((country) => (
                  <TouchableOpacity
                    key={country}
                    style={styles.modalItem}
                    onPress={() => handleSelectRegion(country)}
                  >
                    <ThemedText style={[
                      styles.modalItemText,
                      region === country && styles.modalItemTextSelected
                    ]}>
                      {country}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
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
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  consentContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  consentText: {
    fontSize: 14,
    color: '#000',
  },
  protocolLink: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalCancel: {
    fontSize: 16,
    color: '#666',
  },
  modalDetermine: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  modalList: {
    maxHeight: 300,
  },
  modalItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
    color: '#999',
  },
  modalItemTextSelected: {
    color: '#000',
    fontWeight: '500',
  },
});
