
import React, { useState } from 'react';
import { StyleSheet, View, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

interface NicknameEditModalProps {
  visible: boolean;
  currentNickname: string;
  onClose: () => void;
  onSave: (nickname: string) => void;
}

export default function NicknameEditModal({ visible, currentNickname, onClose, onSave }: NicknameEditModalProps) {
  const [nickname, setNickname] = useState(currentNickname);

  const handleSave = () => {
    if (!nickname.trim()) {
      Alert.alert('Error', 'Nickname cannot be empty');
      return;
    }
    onSave(nickname.trim());
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ThemedText style={styles.title}>Edit Nickname</ThemedText>
          
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
            placeholder="Enter nickname"
            placeholderTextColor="#999"
            maxLength={20}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <ThemedText style={styles.cancelText}>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleSave}
            >
              <LinearGradient
                colors={['#A8FF78', '#78FFD6']}
                style={styles.saveButton}
              >
                <ThemedText style={styles.saveText}>Save</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontWeight: '600',
  },
  saveButton: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#000',
    fontWeight: '600',
  },
});
