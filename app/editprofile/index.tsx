import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileImageSection from '@/components/editprofile/ProfileImageSection';
import ProfileFieldItem from '@/components/editprofile/ProfileFieldItem';

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <>
      {/* Hilangkan header default Expo Router */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* StatusBar transparan → Gradient bisa full sampai atas */}
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
            <View />
          </TouchableOpacity>

          <ThemedText style={styles.headerTitle}>Personal information</ThemedText>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

          {/* Profile Image */}
          <ProfileImageSection />

          {/* Profile Fields */}
          <View style={styles.fieldsContainer}>
            <ProfileFieldItem
              label="nickname"
              value="GOPAY"
              onPress={() => {}}
            />

            <ProfileFieldItem
              label="Sex"
              value="Male"
              onPress={() => {}}
            />

            <ProfileFieldItem
              label="Age"
              value="22"
              onPress={() => {}}
            />

            <View style={styles.signatureSection}>
              <ThemedText style={styles.signatureLabel}>personal signature</ThemedText>
              <ThemedText style={styles.signatureValue}>
                karakteristik aku justru tanda tangan !
              </ThemedText>
            </View>
          </View>

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
    paddingTop: 60,          // dinaikkan agar tidak tertutup status bar
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  backButton: {
    marginRight: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  content: {
    flex: 1,
  },

  fieldsContainer: {
    backgroundColor: '#fff',
    marginTop: 20,
  },

  signatureSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  signatureLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },

  signatureValue: {
    fontSize: 14,
    color: '#666',
  },
});