
import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  level?: number;
}

interface LiveChatListProps {
  messages: ChatMessage[];
}

export default function LiveChatList({ messages }: LiveChatListProps) {
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((msg) => (
        <View key={msg.id} style={styles.messageItem}>
          <Text style={styles.username}>
            {msg.level && <Text style={styles.level}>[Lv.{msg.level}] </Text>}
            {msg.username}:
          </Text>
          <Text style={styles.messageText}> {msg.message}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 70,
    maxHeight: 250,
    paddingHorizontal: 12,
  },
  messageItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  username: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: 'bold',
  },
  level: {
    color: '#4CAF50',
    fontSize: 11,
  },
  messageText: {
    color: '#fff',
    fontSize: 13,
  },
});
