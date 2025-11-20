
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface LiveActionsCoHostProps {
  onSwitchCamera?: () => void;
  onToggleMic?: () => void;
  onLeave?: () => void;
  isMicMuted?: boolean;
}

export default function LiveActionsCoHost({
  onSwitchCamera,
  onToggleMic,
  onLeave,
  isMicMuted,
}: LiveActionsCoHostProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
        <IconSymbol name="camera.rotate" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, isMicMuted && styles.buttonMuted]} 
        onPress={onToggleMic}
      >
        <IconSymbol name="mic.fill" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.leaveButton} onPress={onLeave}>
        <IconSymbol name="xmark" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 120,
    gap: 12,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMuted: {
    backgroundColor: 'rgba(255, 68, 68, 0.6)',
  },
  leaveButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});
