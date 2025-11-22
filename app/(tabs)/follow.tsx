
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

type TabType = 'follow' | 'hot' | 'new';

interface HostItem {
  id: string;
  name: string;
  avatar: string;
  isLive: boolean;
  viewers?: number;
}

const MOCK_HOSTS: HostItem[] = [
  { id: '1', name: 'Jane', avatar: 'https://i.imgur.com/4ZQZ4zO.png', isLive: false },
  { id: '2', name: 'Yasmin', avatar: 'https://i.imgur.com/4ZQZ4zO.png', isLive: false },
];

export default function FollowScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('follow');
  const [filterLive, setFilterLive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredHosts = MOCK_HOSTS.filter((host) => {
    if (filterLive && !host.isLive) return false;
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
          <TouchableOpacity onPress={() => setActiveTab('follow')}>
            <ThemedText
              style={[
                styles.tabText,
                activeTab === 'follow' && styles.activeTabText,
              ]}
            >
              Follow
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('hot')}>
            <ThemedText
              style={[styles.tabText, activeTab === 'hot' && styles.activeTabText]}
            >
              Hot
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('new')}>
            <ThemedText
              style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}
            >
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

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterLive && styles.filterButtonActive]}
          onPress={() => setFilterLive(true)}
        >
          <ThemedText
            style={[
              styles.filterButtonText,
              filterLive && styles.filterButtonTextActive,
            ]}
          >
            Live now
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, !filterLive && styles.filterButtonActive]}
          onPress={() => setFilterLive(false)}
        >
          <ThemedText
            style={[
              styles.filterButtonText,
              !filterLive && styles.filterButtonTextActive,
            ]}
          >
            Not live
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredHosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <Path
                d="M20 30h80v60H20z"
                fill="#E0E0E0"
                stroke="#999"
                strokeWidth="2"
              />
              <Path d="M30 45h60M30 60h60M30 75h40" stroke="#999" strokeWidth="2" />
            </Svg>
            <ThemedText style={styles.emptyText}>
              Temporarily no anchor broadcast
            </ThemedText>
          </View>
        ) : (
          <View style={styles.hostGrid}>
            {filteredHosts.map((host) => (
              <TouchableOpacity
                key={host.id}
                style={styles.hostCard}
                onPress={() =>
                  router.push({
                    pathname: '/live-viewer',
                    params: { hostId: host.id, hostName: host.name },
                  })
                }
              >
                <Image source={{ uri: host.avatar }} style={styles.hostImage} />
                <View style={styles.hostInfo}>
                  <ThemedText style={styles.hostName}>{host.name}</ThemedText>
                  {host.isLive && (
                    <View style={styles.liveBadge}>
                      <ThemedText style={styles.liveText}>LIVE</ThemedText>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Anchor Recommendation */}
        {filteredHosts.length === 0 && (
          <View style={styles.recommendationSection}>
            <ThemedText style={styles.sectionTitle}>
              Anchor Recommendation
            </ThemedText>
            <View style={styles.recommendationGrid}>
              {MOCK_HOSTS.slice(0, 2).map((host) => (
                <TouchableOpacity
                  key={host.id}
                  style={styles.recommendationCard}
                  onPress={() =>
                    router.push({
                      pathname: '/live-viewer',
                      params: { hostId: host.id, hostName: host.name },
                    })
                  }
                >
                  <Image
                    source={{ uri: host.avatar }}
                    style={styles.recommendationImage}
                  />
                  <ThemedText style={styles.recommendationName}>
                    {host.name}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#DDD',
  },
  filterButtonActive: {
    backgroundColor: '#4ADE80',
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  hostGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  hostCard: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  hostImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#DDD',
  },
  hostInfo: {
    padding: 12,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  liveBadge: {
    marginTop: 4,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  liveText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  recommendationSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },
  recommendationGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  recommendationCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
  recommendationImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#DDD',
  },
  recommendationName: {
    padding: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
