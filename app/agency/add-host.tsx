
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, StatusBar, TextInput, Linking } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddHostScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [isConsent, setIsConsent] = useState(false);

  const familyId = '704401200';
  const paperwork = 'ID card';

  const handleProtocolPress = () => {
    // Link ke protokol autentikasi anchor
    // Linking.openURL('https://example.com/anchor-authentication-protocol');
  };

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

            <ThemedText style={styles.headerTitle}>Add host</ThemedText>

            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.closeButton}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content}>
          <View style={styles.formCard}>
            {/* Join Family */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>Join Family</ThemedText>
              <ThemedText style={styles.value}>{familyId}</ThemedText>
            </View>

            {/* Paperwork */}
            <View style={styles.formRow}>
              <ThemedText style={styles.label}>Paperwork</ThemedText>
              <ThemedText style={styles.value}>{paperwork}</ThemedText>
            </View>

            {/* User ID */}
            <View style={[styles.formRow, styles.formRowLast]}>
              <ThemedText style={styles.label}>User ID</ThemedText>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor="#999"
                value={userId}
                onChangeText={setUserId}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <ThemedText style={styles.submitButtonText}>Confirm submission</ThemedText>
          </TouchableOpacity>

          {/* Consent */}
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
  input: {
    flex: 2,
    fontSize: 15,
    color: '#000',
    textAlign: 'right',
    padding: 0,
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
});
