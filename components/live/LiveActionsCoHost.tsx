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

      {/* Switch Camera */}
      <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
        <IconSymbol name="camera.rotate" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Mic On/Off */}
      <TouchableOpacity
        style={[styles.button, isMicMuted && styles.buttonMuted]}
        onPress={onToggleMic}
      >
        <IconSymbol
          name={isMicMuted ? "mic.slash" : "mic"}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Leave Seat */}
      <TouchableOpacity style={styles.leaveButton} onPress={onLeave}>
        <IconSymbol name="xmark" size={22} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 150,
    alignItems: 'center',
    gap: 12,
    zIndex: 50,
  },

  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonMuted: {
    backgroundColor: 'rgba(255,60,60,0.6)',
  },

  leaveButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FF4040',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
});