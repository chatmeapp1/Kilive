import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function BottomPanel() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Say something..."
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.iconBtn}>
        <IconSymbol name="gift" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 14,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});