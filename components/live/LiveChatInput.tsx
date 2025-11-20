
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface LiveChatInputProps {
  onSend?: (message: string) => void;
  onGiftPress?: () => void;
}

export default function LiveChatInput({ onSend, onGiftPress }: LiveChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.giftButton} onPress={onGiftPress}>
        <IconSymbol name="gift.fill" size={24} color="#FFD700" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Say something..."
        placeholderTextColor="#999"
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={handleSend}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <IconSymbol name="paperplane.fill" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  giftButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
