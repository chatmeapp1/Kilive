import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface ChatMessage {
  id: string;
  username: string;
  level?: number;
  vip?: number;
  message: string;
}

interface ChatMessageListProps {
  messages: ChatMessage[];
  keyboardOffset?: number;
}

export default function ChatMessageList({ messages = [], keyboardOffset = 0 }: ChatMessageListProps) {

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

  const getLevelIcon = (level?: number) => {
    if (!level) return null;

    if (level >= 1 && level <= 9)
      return require('@/assets/level/ic_blue.png');
    if (level >= 10 && level <= 19)
      return require('@/assets/level/ic_green.png');
    if (level >= 20 && level <= 29)
      return require('@/assets/level/ic_yellow.png');
    if (level >= 30 && level <= 49)
      return require('@/assets/level/ic_orange.png');
    if (level >= 50 && level <= 75)
      return require('@/assets/level/ic_red.png');
    if (level >= 76 && level <= 100)
      return require('@/assets/level/ic_black.png');

    return require('@/assets/level/ic_blue.png');
  };

  return (
    <View style={[styles.container, { bottom: 140 + keyboardOffset }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              { backgroundColor: getVipColor(msg.vip) }
            ]}
          >
            {/* LEVEL BADGE */}
            {msg.level && (
              <View style={styles.levelBadge}>
                <Image
                  source={getLevelIcon(msg.level)}
                  style={styles.levelIcon}
                />
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
    pointerEvents: 'box-none',
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

  // Badge Level
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
    marginRight: 6,
    gap: 4,
    backgroundColor: 'transparent', // biar icon fokus
  },

  levelIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  levelText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: -27, // geser angka ke kiri menumpuk icon
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