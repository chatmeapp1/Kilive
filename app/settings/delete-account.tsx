
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, TextInput, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');

  const handleDeleteAccount = () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your password to confirm');
      return;
    }

    Alert.alert(
      'Delete Account',
      'Are you absolutely sure? This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been permanently deleted');
            // Handle account deletion logic here
          }
        }
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.container}>
        <LinearGradient
          colors={['#A8FF78', '#78FFD6']}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.backText}>‹</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Account Cancellation</ThemedText>
          <View style={styles.placeholder} />
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.warningBox}>
            <ThemedText style={styles.warningTitle}>⚠️ Warning</ThemedText>
            <ThemedText style={styles.warningText}>
              Deleting your account is permanent and cannot be undone. All your data, including:
            </ThemedText>
            <ThemedText style={styles.warningText}>• Profile information</ThemedText>
            <ThemedText style={styles.warningText}>• Follow/Fans relationships</ThemedText>
            <ThemedText style={styles.warningText}>• Account balance</ThemedText>
            <ThemedText style={styles.warningText}>• Purchase history</ThemedText>
            <ThemedText style={styles.warningText}>
              will be permanently deleted.
            </ThemedText>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Reason for leaving (Optional)</ThemedText>
              <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                placeholder="Tell us why you're leaving..."
                value={reason}
                onChangeText={setReason}
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Confirm Password *</ThemedText>
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={handleDeleteAccount}
            >
              <ThemedText style={styles.deleteButtonText}>Delete My Account</ThemedText>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFC107',
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 12,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 22,
    marginBottom: 4,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
    height: 100,
    textAlignVertical: 'top',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
