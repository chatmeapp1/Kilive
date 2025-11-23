
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import ProfileImageSection from '@/components/editprofile/ProfileImageSection';
import ProfileFieldItem from '@/components/editprofile/ProfileFieldItem';
import NicknameEditModal from '@/components/editprofile/NicknameEditModal';
import SexPicker from '@/components/editprofile/SexPicker';
import AgePicker from '@/components/editprofile/AgePicker';
import { API_CONFIG } from '@/constants/ApiConfig';

function EditProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>({
    username: 'anna',
    sex: 'Female',
    age: 22,
    bio: 'karakteristik aku justru tanda tangan !',
    avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUg-nMmK-oPbIbmjpylqnUMF28EtNqMSQOmW5-54zbPacNKW4g9KQbBas&s=10'
  });
  
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showSexPicker, setShowSexPicker] = useState(false);
  const [showAgePicker, setShowAgePicker] = useState(false);

  const pickImage = async () => {
    Alert.alert('Coming Soon', 'Image upload feature will be available soon');
  };

  const uploadAvatar = async (imageUri: string) => {
    // Temporary: Just update local state
    setProfile({ ...profile, avatar_url: imageUri });
    Alert.alert('Success', 'Avatar updated successfully');
  };

  const updateNickname = async (nickname: string) => {
    // Temporary: Just update local state
    setProfile({ ...profile, username: nickname });
    setShowNicknameModal(false);
    Alert.alert('Success', 'Nickname updated successfully');
  };

  const updateSex = async (sex: 'Male' | 'Female') => {
    // Temporary: Just update local state
    setProfile({ ...profile, sex });
    setShowSexPicker(false);
    Alert.alert('Success', 'Sex updated successfully');
  };

  const updateAge = async (age: number) => {
    // Temporary: Just update local state
    setProfile({ ...profile, age });
    setShowAgePicker(false);
    Alert.alert('Success', 'Age updated successfully');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A8FF78" />
      </View>
    );
  }

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
          <ThemedText style={styles.headerTitle}>Personal information</ThemedText>
          <View style={styles.placeholder} />
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <ProfileImageSection 
            imageUrl={profile?.avatar_url}
            onPress={pickImage}
          />

          <View style={styles.fieldsContainer}>
            <ProfileFieldItem
              label="nickname"
              value={profile?.username || 'Not set'}
              onPress={() => setShowNicknameModal(true)}
            />

            <ProfileFieldItem
              label="Sex"
              value={profile?.sex || 'Not set'}
              onPress={() => setShowSexPicker(true)}
            />

            <ProfileFieldItem
              label="Age"
              value={profile?.age?.toString() || 'Not set'}
              onPress={() => setShowAgePicker(true)}
            />

            <View style={styles.signatureSection}>
              <ThemedText style={styles.signatureLabel}>personal signature</ThemedText>
              <ThemedText style={styles.signatureValue}>
                {profile?.bio || 'No signature yet'}
              </ThemedText>
            </View>
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </View>

      <NicknameEditModal
        visible={showNicknameModal}
        currentNickname={profile?.username || ''}
        onClose={() => setShowNicknameModal(false)}
        onSave={updateNickname}
      />

      <SexPicker
        visible={showSexPicker}
        currentSex={profile?.sex || 'Male'}
        onClose={() => setShowSexPicker(false)}
        onSelect={updateSex}
      />

      <AgePicker
        visible={showAgePicker}
        currentAge={profile?.age || 22}
        onClose={() => setShowAgePicker(false)}
        onConfirm={updateAge}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default function EditProfileScreenWrapper() {
  return <EditProfileScreen />;
}
