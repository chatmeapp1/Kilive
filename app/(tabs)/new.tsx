
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

interface HostItem {
  id: string;
  name: string;
  avatar: string;
  thumbnail: string;
  isLive: boolean;
}

const MOCK_NEW_HOSTS: HostItem[] = [
  {
    id: '1',
    name: 'APPLE...',
    avatar: 'https://i.imgur.com/4ZQZ4zO.png',
    thumbnail: 'https://i.imgur.com/4ZQZ4zO.png',
    isLive: true,
  },
  {
    id: '2',
    name: 'Jane',
    avatar: 'https://i.imgur.com/4ZQZ4zO.png',
    thumbnail: 'https://i.imgur.com/4ZQZ4zO.png',
    isLive: true,
  },
  {
    id: '3',
    name: 'Yasmin...',
    avatar: 'https://i.imgur.com/4ZQZ4zO.png',
    thumbnail: 'https://i.imgur.com/4ZQZ4zO.png',
    isLive: true,
  },
  {
    id: '4',
    name: 'celbu...',
    avatar: 'https://i.imgur.com/4ZQZ4zO.png',
    thumbnail: 'https://i.imgur.com/4ZQZ4zO.png',
    isLive: true,
  },
  {
    id: '5',
    name: 'Uuley',
    avatar: 'https://i.imgur.com/4ZQZ4zO.png',
    thumbnail: 'https://i.imgur.com/4ZQZ4zO.png',
    isLive: true,
  },
  {
    id: '6',
    name: 'baby',
    avatar: 'https://i.imgur.com/4ZQZ4zO.png',
    thumbnail: 'https://i.imgur.com/4ZQZ4zO.png',
    isLive: true,
  },
  {
    id: '7',
    name: 'Queen...',
    avatar: 'https://i.imgur.com/4ZQZ4zO.png',
    thumbnail: 'https://i.imgur.com/4ZQZ4zO.png',
    isLive: true,
  },
];

export default function NewScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredHosts = MOCK_NEW_HOSTS.filter((host) => {
    if (searchQuery) {
      return (
        host.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        host.id.includes(searchQuery)
      );
    }
    return true;
  });

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F5E9" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/follow')}>
            <ThemedText style={styles.tabText}>Follow</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(tabs)')}>
            <ThemedText style={styles.tabText}>Hot</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity>
            <ThemedText style={[styles.tabText, styles.activeTabText]}>
              New
            </ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="#FF6B6B"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by User ID or Host Name..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hostGrid}>
          {filteredHosts.map((host, index) => {
            const isLargeCard = index === 0 || index === 2;
            return (
              <TouchableOpacity
                key={host.id}
                style={[
                  styles.hostCard,
                  isLargeCard && styles.hostCardLarge,
                ]}
                onPress={() =>
                  router.push({
                    pathname: '/live-viewer',
                    params: { hostId: host.id, hostName: host.name },
                  })
                }
              >
                <Image
                  source={{ uri: host.thumbnail }}
                  style={styles.hostImage}
                />
                <View style={styles.hostOverlay}>
                  <ThemedText style={styles.hostName}>{host.name}</ThemedText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  tabText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FF6B6B',
    fontWeight: '700',
  },
  searchButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
  },
  hostGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 20,
  },
  hostCard: {
    width: '48.5%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  hostCardLarge: {
    width: '100%',
    height: 240,
  },
  hostImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DDD',
  },
  hostOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
