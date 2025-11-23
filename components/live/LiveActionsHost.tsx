
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleEndLivePress = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    setShowConfirmDialog(false);
    onEndLive?.();
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
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

      <TouchableOpacity style={styles.endButton} onPress={handleEndLivePress}>
        <SvgIcon name="close" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Confirmation Dialog */}
      <Modal
        visible={showConfirmDialog}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.dialogOverlay}>
          <View style={styles.dialogContainer}>
            <Text style={styles.dialogTitle}>Hint</Text>
            <Text style={styles.dialogMessage}>
              Are you sure to exit the room?
            </Text>
            <View style={styles.dialogButtons}>
              <TouchableOpacity
                style={[styles.dialogButton, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <View style={styles.buttonDivider} />
              <TouchableOpacity
                style={[styles.dialogButton, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </>
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
  dialogOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  dialogMessage: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    lineHeight: 22,
  },
  dialogButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  dialogButton: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  confirmButton: {
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});
