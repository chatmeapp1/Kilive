
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';

export default function LiveScreen() {
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const router = useRouter();

  const handleStartLive = () => {
    // Navigate to broadcaster screen
    router.push('/broadcast');
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera Preview Background */}
      <View style={styles.cameraPreview}>
        <ThemedText style={styles.cameraPlaceholder}>Camera Preview</ThemedText>
      </View>

      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.profileImage}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>What do you want to broadcast in live?</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter broadcast title..."
            placeholderTextColor="#999"
            value={broadcastTitle}
            onChangeText={setBroadcastTitle}
          />
        </View>

        <View style={styles.inviteSection}>
          <ThemedText style={styles.inviteText}>Invite friends to join in</ThemedText>
          <View style={styles.socialIcons}>
            <IconSymbol name="logo.twitter" size={24} color="#fff" />
            <IconSymbol name="logo.facebook" size={24} color="#fff" />
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity onPress={handleStartLive}>
          <LinearGradient
            colors={['#A8FF78', '#78FFD6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButton}
          >
            <ThemedText style={styles.startButtonText}>Start Live</ThemedText>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.controlButton}>
            <IconSymbol name="sparkles" size={24} color="#fff" />
            <ThemedText style={styles.controlText}>Beauty</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <IconSymbol name="camera.rotate" size={24} color="#fff" />
            <ThemedText style={styles.controlText}>Reverse</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  cameraPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  topSection: {
    padding: 20,
    paddingTop: 60,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
  },
  inputContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    color: '#fff',
    fontSize: 14,
    paddingVertical: 8,
  },
  inviteSection: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inviteText: {
    color: '#fff',
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  startButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  startButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    alignItems: 'center',
    gap: 4,
  },
  controlText: {
    color: '#fff',
    fontSize: 12,
  },
});
