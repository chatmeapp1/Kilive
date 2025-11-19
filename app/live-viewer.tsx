
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, ScrollView, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function LiveViewerScreen() {
  const { hostId, hostName } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'User1', text: 'Hello!' },
    { id: 2, user: 'User2', text: 'Great stream!' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setComments([...comments, { id: Date.now(), user: 'You', text: message }]);
      setMessage('');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Live Stream View */}
      <View style={styles.streamView}>
        <ThemedText style={styles.streamPlaceholder}>Live Stream Video</ThemedText>
      </View>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.hostInfoBar}>
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.hostAvatar}
          />
          <View>
            <ThemedText style={styles.hostNameText}>{hostName}</ThemedText>
            <View style={styles.viewersInfo}>
              <IconSymbol name="eye.fill" size={12} color="#fff" />
              <ThemedText style={styles.viewersCount}>1.2K</ThemedText>
            </View>
          </View>
          <View style={styles.liveBadge}>
            <ThemedText style={styles.liveText}>LIVE</ThemedText>
          </View>
        </View>

        <TouchableOpacity style={styles.closeButton}>
          <IconSymbol name="xmark" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Right Side Actions */}
      <View style={styles.rightActions}>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="heart.fill" size={28} color="#FF6B6B" />
          <ThemedText style={styles.actionText}>234</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="gift.fill" size={28} color="#FFD700" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="ellipsis" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsSection}>
        <ScrollView style={styles.commentsList}>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <ThemedText style={styles.commentUser}>{comment.user}: </ThemedText>
              <ThemedText style={styles.commentText}>{comment.text}</ThemedText>
            </View>
          ))}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Say something..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <IconSymbol name="paperplane.fill" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostInfoBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
    gap: 8,
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  hostNameText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewersCount: {
    color: '#fff',
    fontSize: 12,
  },
  liveBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  liveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActions: {
    position: 'absolute',
    right: 16,
    bottom: 200,
    gap: 20,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
  },
  commentsSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: 300,
  },
  commentsList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  commentItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  commentUser: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentText: {
    color: '#fff',
    fontSize: 14,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
    gap: 8,
  },
  messageInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
