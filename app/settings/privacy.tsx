
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Linking } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function PrivacySettingsScreen() {
  const router = useRouter();

  const openAppSettings = () => {
    Linking.openSettings();
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
          <ThemedText style={styles.headerTitle}>Privacy Settings</ThemedText>
          <View style={styles.placeholder} />
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Permissions Settings</ThemedText>
          </View>

          <View style={styles.settingsContainer}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={openAppSettings}
            >
              <ThemedText style={styles.settingLabel}>Allow Kiwi live to veiw phone n...</ThemedText>
              <ThemedText style={styles.settingValue}>Settings</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={openAppSettings}
            >
              <ThemedText style={styles.settingLabel}>Allow Kiwi live to use camera</ThemedText>
              <ThemedText style={styles.settingValue}>Opened</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={openAppSettings}
            >
              <ThemedText style={styles.settingLabel}>Allow Kiwi live to use phone st...</ThemedText>
              <ThemedText style={styles.settingValue}>Opened</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={openAppSettings}
            >
              <ThemedText style={styles.settingLabel}>Allow Kiwi live to microphone</ThemedText>
              <ThemedText style={styles.settingValue}>Opened</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Recommended setting</ThemedText>
          </View>

          <View style={styles.settingsContainer}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={openAppSettings}
            >
              <ThemedText style={styles.settingLabel}>Allow Kiwi live to Push Notifica...</ThemedText>
              <ThemedText style={styles.settingValue}>Settings</ThemedText>
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
  section: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  settingsContainer: {
    backgroundColor: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  settingValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
