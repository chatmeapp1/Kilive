import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SystemMessage } from '@/components/live/SystemMessage';
import { ChatMessageList, ChatMessage } from '@/components/live/ChatMessageList';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';

export default function LiveViewerScreen() {
  const { hostId, hostName } = useLocalSearchParams();
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [showSimpleView, setShowSimpleView] = useState(false);
  
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > 100) {
        runOnJS(setShowSimpleView)(true);
      } else if (event.translationX < -100) {
        runOnJS(setShowSimpleView)(false);
      }
      translateX.value = withTiming(0);
    });

  const systemMessage = "Selamat datang di room live! Harap patuhi peraturan platform, dilarang melanggar aturan yang berlaku. Jika konten mengandung kekerasan, konten vulgar, atau konten ilegal lainnya, akun akan di blokir.";
  
  const chatMessages: ChatMessage[] = [
    { id: '1', username: 'gadanama', message: 'tahi 😊', level: 21 },
    { id: '2', username: 'gadanama', message: 'pak ustad yeuh junaa gandeng', level: 21 },
    { id: '3', username: 'gadanama', message: 'lagu mangu', level: 21 },
    { id: '4', username: 'gadanama', message: '2rb', level: 21 },
  ];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <ThemedView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Live Stream View */}
        <View style={styles.streamView}>
          <ThemedText style={styles.streamPlaceholder}>Live Stream Video</ThemedText>
        </View>

        {showSimpleView ? (
          <>
            {/* Simple View - Only Host Info */}
            <View style={styles.simpleViewContainer}>
              <TouchableOpacity onPress={() => router.back()} style={styles.simpleBackButton}>
                <IconSymbol name="chevron.left" size={24} color="#fff" />
              </TouchableOpacity>
              
              <View style={styles.simpleHostInfo}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/60' }}
                  style={styles.simpleHostAvatar}
                />
                <ThemedText style={styles.simpleHostName}>{hostName || 'Jenaa'}</ThemedText>
                <ThemedText style={styles.simpleHostId}>ID: {hostId || '4396708'}</ThemedText>
              </View>

              <TouchableOpacity style={styles.simpleCloseButton} onPress={() => router.back()}>
                <IconSymbol name="xmark" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Full View - All UI Elements */}
            {/* Top Header Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <IconSymbol name="chevron.left" size={24} color="#fff" />
              </TouchableOpacity>

              {/* Host Info with Follow Button */}
              <View style={styles.hostInfoContainer}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/40' }}
                  style={styles.hostAvatar}
                />
                <View style={styles.hostDetails}>
                  <ThemedText style={styles.hostName}>{hostName || 'Jenaa'}</ThemedText>
                  <ThemedText style={styles.hostId}>ID: {hostId || '4396708'}</ThemedText>
                </View>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() => setIsFollowing(!isFollowing)}
                >
                  <IconSymbol name={isFollowing ? "checkmark" : "plus"} size={16} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Viewer List and Count */}
              <View style={styles.viewerSection}>
                <Image source={{ uri: 'https://via.placeholder.com/28' }} style={styles.viewerAvatar} />
                <Image source={{ uri: 'https://via.placeholder.com/28' }} style={styles.viewerAvatar} />
                <Image source={{ uri: 'https://via.placeholder.com/28' }} style={styles.viewerAvatar} />
                <View style={styles.viewerCountBadge}>
                  <ThemedText style={styles.viewerCountText}>11</ThemedText>
                </View>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <IconSymbol name="xmark" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Income and Rank Display */}
            <View style={styles.incomeSection}>
              <View style={styles.incomeBadge}>
                <ThemedText style={styles.incomeIcon}>🪙</ThemedText>
                <ThemedText style={styles.incomeText}>302.38K</ThemedText>
              </View>
              <View style={styles.rankBadge}>
                <ThemedText style={styles.rankText}>Tanpa Rank</ThemedText>
              </View>
            </View>

            {/* Gift Notification Bubble */}
            <View style={styles.giftNotification}>
              <View style={styles.giftBubble}>
                <Image source={{ uri: 'https://via.placeholder.com/24' }} style={styles.giftAvatar} />
                <ThemedText style={styles.giftUserText}>SONIC ⚡</ThemedText>
                <ThemedText style={styles.giftAmountText}>Menang 😊 500</ThemedText>
              </View>
            </View>

            {/* Right Side Panel - Live Stats */}
            <View style={styles.rightPanel}>
              <View style={styles.liveStatsCard}>
                <ThemedText style={styles.liveLabel}>Live Lainnya</ThemedText>
                <ThemedText style={styles.liveRank}>Yasno</ThemedText>
                <ThemedText style={styles.liveCount}>#200</ThemedText>
              </View>
            </View>

            {/* System Message */}
            <View style={styles.systemMessageWrapper}>
              <SystemMessage message={systemMessage} />
            </View>

            {/* Chat Messages */}
            <ChatMessageList messages={chatMessages} />

            {/* Bottom Action Bar */}
            <View style={styles.bottomActionBar}>
              {/* Text Input */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Obrol..."
                  placeholderTextColor="#999"
                  value={chatInput}
                  onChangeText={setChatInput}
                />
              </View>

              {/* Chat Icon */}
              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="message.fill" size={24} color="#fff" />
              </TouchableOpacity>

              {/* Link/Chain Icon */}
              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="link" size={24} color="#fff" />
              </TouchableOpacity>

              {/* Co-host Button */}
              <TouchableOpacity style={styles.coHostButton}>
                <ThemedText style={styles.coHostText}>co-host</ThemedText>
              </TouchableOpacity>

              {/* Game Icon */}
              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="gamecontroller.fill" size={24} color="#60A5FA" />
              </TouchableOpacity>

              {/* Three Dots Menu */}
              <TouchableOpacity style={styles.actionButton}>
                <IconSymbol name="ellipsis" size={24} color="#fff" />
              </TouchableOpacity>

              {/* Gift Icon */}
              <TouchableOpacity style={styles.giftButton}>
                <IconSymbol name="gift.fill" size={28} color="#F472B6" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ThemedView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  streamView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streamPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    gap: 6,
  },
  hostAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#fff',
  },
  hostDetails: {
    gap: 1,
  },
  hostName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hostId: {
    color: '#fff',
    fontSize: 9,
    opacity: 0.8,
  },
  followButton: {
    backgroundColor: '#9333EA',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  viewerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  viewerCountBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 32,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  viewerCountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  incomeSection: {
    position: 'absolute',
    left: 12,
    top: 110,
    gap: 6,
  },
  incomeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  incomeIcon: {
    fontSize: 14,
  },
  incomeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  rankBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  rankText: {
    color: '#fff',
    fontSize: 10,
  },
  giftNotification: {
    position: 'absolute',
    left: 12,
    top: 200,
  },
  giftBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  giftAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  giftUserText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  giftAmountText: {
    color: '#fff',
    fontSize: 12,
  },
  rightPanel: {
    position: 'absolute',
    right: 12,
    top: 110,
  },
  liveStatsCard: {
    backgroundColor: 'rgba(139, 69, 19, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  liveLabel: {
    color: '#fff',
    fontSize: 9,
    opacity: 0.8,
  },
  liveRank: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  liveCount: {
    color: '#fff',
    fontSize: 10,
  },
  systemMessageWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 350,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 36,
    justifyContent: 'center',
  },
  textInput: {
    color: '#fff',
    fontSize: 13,
  },
  actionButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coHostButton: {
    backgroundColor: 'rgba(147, 51, 234, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  coHostText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  giftButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 50,
    paddingHorizontal: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  simpleBackButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleHostInfo: {
    alignItems: 'center',
    gap: 8,
  },
  simpleHostAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    borderWidth: 3,
    borderColor: '#fff',
  },
  simpleHostName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  simpleHostId: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  simpleCloseButton: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
