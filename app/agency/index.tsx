
import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

interface MenuItemProps {
  title: string;
  onPress: () => void;
}

const MenuItem = ({ title, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <ThemedText style={styles.menuText}>{title}</ThemedText>
    <ThemedText style={styles.arrow}>›</ThemedText>
  </TouchableOpacity>
);

export default function AgencyManagementScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.container}>
        {/* Header with gradient */}
        <LinearGradient
          colors={['#A8FF78', '#78FFD6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ThemedText style={styles.backText}>‹</ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>Family management</ThemedText>

            <TouchableOpacity onPress={() => router.back()}>
              <ThemedText style={styles.closeButton}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.content}>
          {/* Purple gradient banner */}
          <LinearGradient
            colors={['#8B5CF6', '#6366F1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <ThemedText style={styles.bannerTitle}>Family management</ThemedText>
          </LinearGradient>

          {/* Menu items */}
          <View style={styles.menuContainer}>
            <MenuItem 
              title="Add host" 
              onPress={() => router.push('/agency/add-host')}
            />
            <MenuItem 
              title="Gempar Penggemar" 
              onPress={() => router.push('/agency/host-income')}
            />
            <MenuItem 
              title="Live times" 
              onPress={() => router.push('/agency/live-times')}
            />
            <MenuItem 
              title="Family relation management" 
              onPress={() => router.push('/agency/relation-management')}
            />
            <MenuItem 
              title="Host Received gift" 
              onPress={() => router.push('/agency/received-gift')}
            />
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
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    fontSize: 16,
    color: '#000',
  },
  content: {
    flex: 1,
  },
  banner: {
    margin: 20,
    marginBottom: 10,
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
  arrow: {
    fontSize: 24,
    color: '#999',
  },
});
