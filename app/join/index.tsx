
import React from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import JoinOption from '@/components/join/JoinOption';

export default function JoinScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.container}>
        {/* Header with gradient background */}
        <LinearGradient
          colors={['#A8FF78', '#78FFD6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ThemedText style={styles.backText}>‹</ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>Join Us</ThemedText>

            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.closeButton}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Purple Gradient Section */}
        <LinearGradient
          colors={['#8B5CF6', '#6366F1', '#3B82F6']}
          style={styles.purpleSection}
        >
          <ThemedText style={styles.mainTitle}>Join Us</ThemedText>
        </LinearGradient>

        {/* Options Section */}
        <View style={styles.optionsContainer}>
          <JoinOption
            title="Apply for Agency"
            onPress={() => router.push('/join/agency')}
          />

          <JoinOption
            title="Apply for Host"
            onPress={() => router.push('/join/host')}
          />
        </View>
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
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    fontSize: 16,
    color: '#000',
  },
  purpleSection: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  optionsContainer: {
    padding: 20,
    gap: 16,
  },
});
