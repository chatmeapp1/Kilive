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

      {/* Switch Camera */}
      <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
        <IconSymbol name="camera.rotate" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Beauty */}
      <TouchableOpacity style={styles.button} onPress={onToggleBeauty}>
        <IconSymbol name="sparkles" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Flash */}
      <TouchableOpacity
        style={[styles.button, isFlashOn && styles.buttonActive]}
        onPress={onToggleFlash}
      >
        <IconSymbol
          name={isFlashOn ? "flash.on" : "flash.off"}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Mic */}
      <TouchableOpacity
        style={[styles.button, isMicMuted && styles.buttonMuted]}
        onPress={onToggleMic}
      >
        <IconSymbol
          name={isMicMuted ? "mic.slash" : "mic"}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Invite Co-host */}
      <TouchableOpacity style={styles.button} onPress={onInviteCoHost}>
        <IconSymbol name="person.add" size={22} color="#fff" />
      </TouchableOpacity>

      {/* End Live */}
      <TouchableOpacity style={styles.endButton} onPress={onEndLive}>
        <IconSymbol name="xmark" size={26} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 140,
    alignItems: 'center',
    gap: 14,
    zIndex: 50,
  },

  button: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonActive: {
    backgroundColor: 'rgba(255,215,0,0.6)', // gold-yellow
  },

  buttonMuted: {
    backgroundColor: 'rgba(255,60,60,0.6)', // red
  },

  endButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF4040',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});