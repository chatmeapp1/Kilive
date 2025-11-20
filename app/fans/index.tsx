import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FansRankingTabs from '@/components/fans/FansRankingTabs';

export default function FansScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'totally'>('daily');

  return (
    <>
      {/* HILANGKAN HEADER EXPO → TANPA BAR HITAM */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* FULLSCREEN STATUS BAR */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.container}>
        
        {/* Header dengan gradient */}
        <LinearGradient
          colors={['#A8FF78', '#78FFD6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" size={24} color="#000" />
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>Fans Ranking</ThemedText>

            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.closeButton}>Close</ThemedText>
            </TouchableOpacity>
          </View>

          <FansRankingTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </LinearGradient>

        {/* Konten */}
        <ScrollView style={styles.content}>
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No ranking data available</ThemedText>
          </View>
        </ScrollView>

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <View style={styles.userAvatar}>
            <View style={styles.avatarPlaceholder} />
          </View>

          <View style={styles.userInfoContainer}>
            <ThemedText style={styles.ratingText}>Rating display: Not on the list</ThemedText>
            <ThemedText style={styles.contributeText}>contribute: 0</ThemedText>
          </View>

          <TouchableOpacity style={styles.hideButton}>
            <ThemedText style={styles.hideButtonText}>Hide ranking</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,         // naikkan sedikit agar melewati status bar
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
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
  content: {
    flex: 1,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
  bottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  userAvatar: {
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
  },
  userInfoContainer: {
    flex: 1,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  contributeText: {
    fontSize: 12,
    color: '#666',
  },
  hideButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  hideButtonText: {
    fontSize: 12,
    color: '#666',
  },
});