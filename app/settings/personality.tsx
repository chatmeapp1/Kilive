
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function PersonalitySettingsScreen() {
  const router = useRouter();
  const [giftSound, setGiftSound] = useState(true);
  const [hideGameData, setHideGameData] = useState(false);

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
          <ThemedText style={styles.headerTitle}>Personality Settings</ThemedText>
          <View style={styles.placeholder} />
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.settingsContainer}>
            <View style={styles.settingItem}>
              <ThemedText style={styles.settingLabel}>Gift Sound</ThemedText>
              <Switch
                value={giftSound}
                onValueChange={setGiftSound}
                trackColor={{ false: '#ccc', true: '#4ADE80' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.settingItem}>
              <ThemedText style={styles.settingLabel}>Hide Game Data</ThemedText>
              <Switch
                value={hideGameData}
                onValueChange={setHideGameData}
                trackColor={{ false: '#ccc', true: '#4ADE80' }}
                thumbColor="#fff"
              />
            </View>
          </View>

          <View style={styles.infoBox}>
            <ThemedText style={styles.infoText}>
              Gift Sound: Enable or disable sound effects when receiving gifts during live streams.
            </ThemedText>
            <ThemedText style={styles.infoText}>
              Hide Game Data: Hide your game statistics and achievements from other users.
            </ThemedText>
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
  infoBox: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
});
