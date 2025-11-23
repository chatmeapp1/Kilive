
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgIcon } from '@/components/ui/SvgIcon';

interface LiveActionsHostProps {
  onSwitchCamera?: () => void;
  onToggleBeauty?: () => void;
  onToggleFlash?: () => void;
  onToggleMic?: () => void;
  onInviteCoHost?: () => void;
  onEndLive?: () => void;
  isMicMuted?: boolean;
  isFlashOn?: boolean;
  isBeautyOn?: boolean;
}

export default function LiveActionsHost({
  onSwitchCamera,
  onToggleBeauty,
  onToggleFlash,
  onToggleMic,
  onInviteCoHost,
  onEndLive,
  isMicMuted = false,
  isFlashOn = false,
  isBeautyOn = false,
}: LiveActionsHostProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
        <SvgIcon name="camera-switch" size={22} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, isBeautyOn && styles.buttonActive]} 
        onPress={onToggleBeauty}
      >
        <SvgIcon name="beauty" size={22} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isFlashOn && styles.buttonActive]}
        onPress={onToggleFlash}
      >
        <SvgIcon
          name={isFlashOn ? "flash" : "flash-off"}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isMicMuted && styles.buttonMuted]}
        onPress={onToggleMic}
      >
        <SvgIcon
          name={isMicMuted ? "mic-off" : "mic"}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onInviteCoHost}>
        <SvgIcon name="person-add" size={22} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.endButton} onPress={onEndLive}>
        <SvgIcon name="close" size={26} color="#fff" />
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
    backgroundColor: 'rgba(255,215,0,0.6)',
  },
  buttonMuted: {
    backgroundColor: 'rgba(255,60,60,0.6)',
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
