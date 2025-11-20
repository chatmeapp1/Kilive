import React, { useRef, useEffect } from 'react';
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
  const scrollRef = useRef<ScrollView>(null);

  // auto scroll to bottom setiap ada pesan baru
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((msg) => (
        <View key={msg.id} style={styles.chatBubble}>
          <Text style={styles.username} numberOfLines={1}>
            {msg.level && (
              <Text style={styles.levelBadge}>Lv.{msg.level} </Text>
            )}
            {msg.username}:
          </Text>

          <Text style={styles.message}>{msg.message}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    left: 12,
    right: 80,
    maxHeight: 240,
  },

  chatBubble: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.35)', // lebih ringan dari sebelumnya
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 6,
    maxWidth: '85%',
  },

  username: {
    color: '#FFD54F',
    fontWeight: '600',
    fontSize: 12,
  },

  levelBadge: {
    color: '#4ADE80', // hijau soft
    fontWeight: '700',
    fontSize: 11,
  },

  message: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    flexShrink: 1,
  },
});