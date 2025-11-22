
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { apiCall, API_CONFIG } from '@/constants/ApiConfig';

export default function PhoneLogin() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState('+62');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [savePassword, setSavePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Harap isi nomor telepon dan kata sandi');
      return;
    }

    setLoading(true);
    try {
      const response = await apiCall(API_CONFIG.ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({
          email: `${phoneNumber}@fancylive.com`,
          password: password,
        }),
      });

      if (response.success) {
        // TODO: Implement secure token storage when AsyncStorage is properly configured
        console.log('Login successful:', response.data);
        
        Alert.alert('Success', 'Login berhasil!');
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', response.message || 'Login gagal');
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#A8FF78', '#78FFD6', '#B794F4']}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        {/* Header Text */}
        <Text style={styles.headerText}>
          MENGHUBUNGKAN HATI DAN MENJEMBATANI JARAK
        </Text>

        {/* Form Card */}
        <View style={styles.card}>
          {/* Country Selector */}
          <View style={styles.inputContainer}>
            <View style={styles.countryRow}>
              <Text style={styles.flag}>🇮🇩</Text>
              <Text style={styles.countryText}>Indonesia</Text>
              <Text style={styles.dropdown}>▼</Text>
            </View>
          </View>

          {/* Phone Input */}
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>{countryCode}</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="Harap masukkan nomor telepon"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <Text style={styles.dropdown}>▼</Text>
          </View>

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Silakan masukkan kata sandi"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Save Password & SMS Login Row */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setSavePassword(!savePassword)}
            >
              <View style={[styles.checkbox, savePassword && styles.checkboxChecked]}>
                {savePassword && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>Simpan kata sandi</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.smsLogin}>SMS Login</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <LinearGradient
              colors={['#A855F7', '#9333EA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitGradient}
            >
              <Text style={styles.submitText}>
                {loading ? 'Memproses...' : 'masuk'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Footer Link */}
          <Text style={styles.footerLink}>Lupa kata sandi</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  backText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  headerText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 40,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 24,
    gap: 16,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 16,
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    fontSize: 24,
  },
  countryText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    fontSize: 12,
    color: '#666',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
    color: '#666',
  },
  smsLogin: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 24,
  },
  submitGradient: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerLink: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
});
