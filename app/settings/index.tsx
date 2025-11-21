
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const router = useRouter();

  const handleCleanCache = () => {
    Alert.alert(
      'Clean up cache',
      'Are you sure you want to clear cache? (12.28MB)',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          onPress: () => {
            Alert.alert('Success', 'Cache cleared successfully');
          }
        }
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign out', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            Alert.alert('Logged out', 'You have been signed out');
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
        {/* Header */}
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
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
          <View style={styles.placeholder} />
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* ID Display */}
          <View style={styles.idContainer}>
            <ThemedText style={styles.idLabel}>ID</ThemedText>
            <ThemedText style={styles.idValue}>703256893</ThemedText>
          </View>

          {/* Settings Items */}
          <View style={styles.settingsContainer}>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/editprofile')}
            >
              <ThemedText style={styles.settingLabel}>Personal information</ThemedText>
              <ThemedText style={styles.settingArrow}>›</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={handleCleanCache}
            >
              <ThemedText style={styles.settingLabel}>Clean up cache</ThemedText>
              <ThemedText style={styles.cacheSize}>12.28MB</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/settings/about')}
            >
              <ThemedText style={styles.settingLabel}>About us</ThemedText>
              <ThemedText style={styles.settingArrow}>›</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/settings/personality')}
            >
              <ThemedText style={styles.settingLabel}>Personality Settings</ThemedText>
              <ThemedText style={styles.settingArrow}>›</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/settings/privacy')}
            >
              <ThemedText style={styles.settingLabel}>Privacy Settings</ThemedText>
              <ThemedText style={styles.settingArrow}>›</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/settings/language')}
            >
              <ThemedText style={styles.settingLabel}>Language</ThemedText>
              <ThemedText style={styles.settingArrow}>›</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/settings/blocklist')}
            >
              <ThemedText style={styles.settingLabel}>Blocklist</ThemedText>
              <ThemedText style={styles.settingArrow}>›</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => router.push('/settings/delete-account')}
            >
              <ThemedText style={styles.settingLabel}>Account cancellation</ThemedText>
              <ThemedText style={styles.settingArrow}>›</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <ThemedText style={styles.signOutText}>Sign out</ThemedText>
          </TouchableOpacity>

          <View style={{ height: 60 }} />
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
  idContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 1,
  },
  idLabel: {
    fontSize: 16,
    color: '#000',
  },
  idValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
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
  },
  settingArrow: {
    fontSize: 20,
    color: '#999',
  },
  cacheSize: {
    fontSize: 16,
    color: '#4ADE80',
  },
  signOutButton: {
    backgroundColor: '#fff',
    marginTop: 40,
    padding: 16,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
