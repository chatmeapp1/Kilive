
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface LiveActionsHostProps {
  onSwitchCamera?: () => void;
  onToggleBeauty?: () => void;
  onToggleFlash?: () => void;
  onToggleMic?: () => void;
  onInviteCoHost?: () => void;
  onEndLive?: () => void;
  isMicMuted?: boolean;
  isFlashOn?: boolean;
}

export default function LiveActionsHost({
  onSwitchCamera,
  onToggleBeauty,
  onToggleFlash,
  onToggleMic,
  onInviteCoHost,
  onEndLive,
  isMicMuted,
  isFlashOn,
}: LiveActionsHostProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
        <IconSymbol name="camera.rotate" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onToggleBeauty}>
        <IconSymbol name="sparkles" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, isFlashOn && styles.buttonActive]} 
        onPress={onToggleFlash}
      >
        <IconSymbol name="sparkles" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, isMicMuted && styles.buttonMuted]} 
        onPress={onToggleMic}
      >
        <IconSymbol name="mic.fill" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onInviteCoHost}>
        <IconSymbol name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.endButton} onPress={onEndLive}>
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
  buttonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.6)',
  },
  buttonMuted: {
    backgroundColor: 'rgba(255, 68, 68, 0.6)',
  },
  endButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});
