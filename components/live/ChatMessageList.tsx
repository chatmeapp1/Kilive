import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  level?: number;
}

interface ChatMessageListProps {
  messages: ChatMessage[];
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  const getLevelColor = (lvl?: number) => {
    if (!lvl) return '#444';

    if (lvl >= 1 && lvl <= 10) return '#3B82F6';    // Biru
    if (lvl >= 11 && lvl <= 25) return '#22C55E';   // Hijau
    if (lvl >= 26 && lvl <= 50) return '#FACC15';   // Kuning
    if (lvl >= 51 && lvl <= 75) return '#FB923C';   // Oranye
    if (lvl >= 76 && lvl <= 100) return '#EF4444';  // Merah

    return '#444';
  };

  const isJackpotMessage = (msg: string) => {
    return msg.toLowerCase().includes("500 times");
  };

  return (
    <ScrollView 
      style={styles.chatContainer}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((msg) => (
        <View 
          key={msg.id} 
          style={[
            styles.messageRow,
            isJackpotMessage(msg.message) && styles.jackpotWrapper
          ]}
        >
          {msg.level && (
            <View 
              style={[
                styles.levelBadge,
                { backgroundColor: getLevelColor(msg.level) }
              ]}
            >
              <ThemedText style={styles.levelText}>{msg.level}</ThemedText>
            </View>
          )}

          <View style={styles.messageBubble}>
            <ThemedText style={[
              styles.messageText,
              isJackpotMessage(msg.message) && styles.jackpotText
            ]}>
              <ThemedText style={styles.username}>
                {msg.username}:{" "}
              </ThemedText>
              {msg.message}
            </ThemedText>
          </View>

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
  messageBubble: {
    flex: 1,
  },
  levelBadge: {
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
    lineHeight: 18,
  },
  username: {
    fontWeight: 'bold',
    color: '#FFD700',
  },

  // JACKPOT SPECIAL EFFECT
  jackpotWrapper: {
    backgroundColor: 'rgba(255,215,0,0.15)',
    padding: 4,
    borderRadius: 8,
  },
  jackpotText: {
    color: '#FACC15',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});