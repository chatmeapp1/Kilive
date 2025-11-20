
import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import TopUpGrid from '@/components/recharge/TopUpGrid';

export default function RechargeScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={styles.container}>
        {/* Header Gradient */}
        <LinearGradient
          colors={['#4ADE80', '#FFD700']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ThemedText style={styles.backIcon}>←</ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>Recharge</ThemedText>

            <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
              <ThemedText style={styles.closeIcon}>✕</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceCard}>
            <ThemedText style={styles.balanceLabel}>My U Coins</ThemedText>
            <View style={styles.balanceRow}>
              <Image
                source={require('@/assets/coin.png')}
                style={styles.coinIcon}
              />
              <ThemedText style={styles.balanceAmount}>38</ThemedText>
            </View>
          </View>
        </View>

        {/* Top Up Grid */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <TopUpGrid />
          <View style={{ height: 40 }} />
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  balanceSection: {
    marginTop: -20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#7B2FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  coinIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
});
