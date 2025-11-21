
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen() {
  const router = useRouter();

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
          <ThemedText style={styles.headerTitle}>About us</ThemedText>
          <View style={styles.placeholder} />
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.infoContainer}>
            <ThemedText style={styles.appName}>Kylive</ThemedText>
            <ThemedText style={styles.version}>Version 1.0.0</ThemedText>
            
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>About Kylive</ThemedText>
              <ThemedText style={styles.sectionText}>
                Kylive is a live streaming platform that connects people from around the world. 
                Share your moments, watch live broadcasts, and interact with your favorite hosts.
              </ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Contact Us</ThemedText>
              <ThemedText style={styles.sectionText}>Email: support@kylive.com</ThemedText>
              <ThemedText style={styles.sectionText}>Website: www.kylive.com</ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Legal</ThemedText>
              <TouchableOpacity style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Terms of Service</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkItem}>
                <ThemedText style={styles.linkText}>Privacy Policy</ThemedText>
              </TouchableOpacity>
            </View>

            <ThemedText style={styles.copyright}>
              © 2025 Kylive. All rights reserved.
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
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
  version: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 8,
  },
  linkItem: {
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#4ADE80',
  },
  copyright: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
});
