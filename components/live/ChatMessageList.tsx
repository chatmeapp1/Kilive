import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import DiamondIcon from '@/components/ui/DiamondIcon';

interface ChatMessage {
  id: string;
  username: string;
  level?: number;
  vip?: number; 
  message: string;
}

interface ChatMessageListProps {
  messages: ChatMessage[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  
  const getVipColor = (vip?: number) => {
    switch (vip) {
      case 1: return 'rgba(34,197,94,0.35)';
      case 2: return 'rgba(59,130,246,0.35)';
      case 3: return 'rgba(249,115,22,0.35)';
      case 4: return 'rgba(236,72,153,0.35)';
      case 5: return 'rgba(239,68,68,0.35)';
      default: return 'rgba(0,0,0,0.45)';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              { backgroundColor: getVipColor(msg.vip) }
            ]}
          >
            {msg.level && (
              <View style={styles.levelBadge}>
                <DiamondIcon size={12} color="#fff" />
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
    bottom: 140,
    left: 10,
    right: 10,
    maxHeight: 240,
    zIndex: 10,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 6,
    minHeight: 32,
  },

  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(147,51,234,0.55)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
    marginRight: 6,
    gap: 4,
  },

  levelText: {
    color: '#fff',
    fontSize: 11,
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