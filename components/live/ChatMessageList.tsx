import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  level?: number;
  avatar?: string;
}

interface ChatMessageListProps {
  messages: ChatMessage[];
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <ScrollView 
      style={styles.chatContainer}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((msg) => (
        <View key={msg.id} style={styles.messageRow}>
          {msg.level && (
            <View style={styles.levelBadge}>
              <ThemedText style={styles.levelText}>{msg.level}</ThemedText>
            </View>
          )}
          <ThemedText style={styles.messageText}>
            <ThemedText style={styles.username}>{msg.username}: </ThemedText>
            {msg.message}
          </ThemedText>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 140,
    maxHeight: 200,
    paddingHorizontal: 12,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 6,
  },
  levelBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 32,
    alignItems: 'center',
  },
  levelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  messageText: {
    color: '#fff',
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  username: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
