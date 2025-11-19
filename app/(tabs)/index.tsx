import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const TABS = ['Follow', 'Hot', 'New'];

const HOSTS_DATA = [
  { id: 1, name: 'Ness', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtYniY3o2IcVT3PLQgigDOohCwXorgYuzlPHl1OegKGA&s=10', viewers: 90, isLive: true },
  { id: 2, name: 'Laya', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiO01qjBUC9NcZ1cSkunFFb1IxUy_0fD-1x_DUsBOKkQ&s=10', viewers: 85, isLive: true },
  { id: 3, name: 'kady', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9lDjQRh4PFc2fVhSXRcm_XaKV1dpozUptSXUi9eZ4J4-gERCvs7jrLXp&s=10', viewers: 90, isLive: false },
  { id: 4, name: 'Jane', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUg-nMmK-oPbIbmjpylqnUMF28EtNqMSQOmW5-54zbPacNKW4g9KQbBas&s=10', viewers: 100, isLive: true },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveTab(index);
  };

  const handleHostCardPress = (host: any) => {
    // Navigate to live viewer screen
    router.push(`/live-viewer?hostId=${host.id}&hostName=${host.name}`);
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ThemedText style={styles.time}>08:47</ThemedText>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <IconSymbol name="magnifyingglass" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(index)}
            style={styles.tab}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab}
            </ThemedText>
            {activeTab === index && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.giftButton}>
          <IconSymbol name="gift.fill" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {/* Swipeable Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {TABS.map((tab, tabIndex) => (
          <ScrollView key={tab} style={styles.tabContent}>
            <View style={styles.hostsGrid}>
              {HOSTS_DATA.map((host) => (
                <TouchableOpacity
                  key={host.id}
                  style={styles.hostCard}
                  onPress={() => handleHostCardPress(host)}
                >
                  <Image source={{ uri: host.image }} style={styles.hostImage} />
                  <View style={styles.hostOverlay}>
                    <View style={styles.hostInfo}>
                      <ThemedText style={styles.hostName}>{host.name}</ThemedText>
                      <View style={styles.viewersBadge}>
                        <IconSymbol name="eye.fill" size={12} color="#fff" />
                        <ThemedText style={styles.viewersText}>{host.viewers}</ThemedText>
                      </View>
                    </View>
                  </View>
                  {host.isLive && (
                    <View style={styles.liveBadge}>
                      <ThemedText style={styles.liveText}>LIVE</ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Banner */}
            <View style={styles.banner}>
              <Image
                source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/003/582/701/small/coming-soon-background-illustration-template-design-free-vector.jpg' }}
                style={styles.bannerImage}
              />
            </View>

            {/* More Hosts */}
            <View style={styles.hostsGrid}>
              {HOSTS_DATA.map((host) => (
                <TouchableOpacity
                  key={`${host.id}-2`}
                  style={styles.hostCard}
                  onPress={() => handleHostCardPress(host)}
                >
                  <Image source={{ uri: host.image }} style={styles.hostImage} />
                  <View style={styles.hostOverlay}>
                    <View style={styles.hostInfo}>
                      <ThemedText style={styles.hostName}>{host.name}</ThemedText>
                      <View style={styles.viewersBadge}>
                        <IconSymbol name="eye.fill" size={12} color="#fff" />
                        <ThemedText style={styles.viewersText}>{host.viewers}</ThemedText>
                      </View>
                    </View>
                  </View>
                  {host.isLive && (
                    <View style={styles.liveBadge}>
                      <ThemedText style={styles.liveText}>LIVE</ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#A8FF78',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    gap: 24,
  },
  tab: {
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  activeTabIndicator: {
    height: 3,
    backgroundColor: '#FF6B6B',
    borderRadius: 2,
    marginTop: 4,
  },
  giftButton: {
    marginLeft: 'auto',
  },
  tabContent: {
    width: width,
    paddingHorizontal: 8,
  },
  hostsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 8,
  },
  hostCard: {
    width: (width - 24) / 2,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  hostImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
  },
  hostOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
  },
  hostInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hostName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  viewersText: {
    color: '#fff',
    fontSize: 12,
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  banner: {
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#ddd',
  },
});
