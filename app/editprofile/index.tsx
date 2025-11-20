
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import ProfileImageSection from '@/components/editprofile/ProfileImageSection';
import ProfileFieldItem from '@/components/editprofile/ProfileFieldItem';

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#A8FF78', '#78FFD6']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Personal information</ThemedText>
      </LinearGradient>

      <ScrollView style={styles.content}>
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
      </ScrollView>
    </View>
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
    paddingTop: 50,
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
