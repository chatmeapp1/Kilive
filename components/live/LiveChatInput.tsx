import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

      {/* GIFT BUTTON */}
      <TouchableOpacity style={styles.giftButton} onPress={onGiftPress}>
        <Ionicons name="gift-outline" size={22} color="#FFD54F" />
      </TouchableOpacity>

      {/* INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Say something..."
        placeholderTextColor="rgba(255,255,255,0.6)"
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={handleSend}
      />

      {/* SEND BUTTON */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Ionicons name="send" size={18} color="#fff" />
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
    gap: 10,
  },

  giftButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 14,
  },

  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
});