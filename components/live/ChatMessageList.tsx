import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ChatMessage {
  id: string;
  username: string;
  level?: number;
  message: string;
  avatar?: string;
}

interface ChatMessageListProps {
  messages: ChatMessage[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageRow}>
            {msg.level && (
              <View style={styles.levelBadge}>
                <ThemedText style={styles.levelText}>{msg.level}</ThemedText>
              </View>
            )}
            <ThemedText style={styles.username}>{msg.username}: </ThemedText>
            <ThemedText style={styles.message}>{msg.message}</ThemedText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    maxHeight: 200,
    zIndex: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 6,
  },
  levelBadge: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 6,
  },
  levelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  username: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: 'bold',
  },
  message: {
    color: '#fff',
    fontSize: 13,
    flex: 1,
  },
});