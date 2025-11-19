
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, ScrollView, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';

export default function BroadcastScreen() {
  const router = useRouter();
  const [viewers, setViewers] = useState(0);
  const [comments, setComments] = useState<any[]>([]);

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera View */}
      <View style={styles.cameraView}>
        <ThemedText style={styles.cameraPlaceholder}>Broadcasting...</ThemedText>
      </View>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <IconSymbol name="xmark" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.viewersBox}>
          <IconSymbol name="eye.fill" size={16} color="#fff" />
          <ThemedText style={styles.viewersText}>{viewers}</ThemedText>
        </View>
      </View>

      {/* Right Actions */}
      <View style={styles.rightActions}>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="camera.rotate" size={28} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="sparkles" size={28} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="mic.fill" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Comments */}
      <View style={styles.commentsSection}>
        <ScrollView style={styles.commentsList}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <ThemedText style={styles.commentUser}>{comment.user}: </ThemedText>
              <ThemedText style={styles.commentText}>{comment.text}</ThemedText>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.giftButton}>
          <IconSymbol name="gift.fill" size={24} color="#FFD700" />
        </TouchableOpacity>

        <View style={styles.messageBox}>
          <ThemedText style={styles.messagePlaceholder}>Say something...</ThemedText>
        </View>

        <TouchableOpacity style={styles.shareButton}>
          <IconSymbol name="square.and.arrow.up" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
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
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewersBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,107,107,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  viewersText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rightActions: {
    position: 'absolute',
    right: 16,
    top: 120,
    gap: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsSection: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 60,
    maxHeight: 200,
  },
  commentsList: {
    paddingHorizontal: 16,
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
  bottomControls: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  giftButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
  },
  messagePlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  shareButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
