
import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface SexPickerProps {
  visible: boolean;
  currentSex: string;
  onClose: () => void;
  onSelect: (sex: 'Male' | 'Female') => void;
}

export default function SexPicker({ visible, currentSex, onClose, onSelect }: SexPickerProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Select Sex</ThemedText>
          </View>

          <TouchableOpacity 
            style={[styles.option, currentSex === 'Male' && styles.selectedOption]}
            onPress={() => onSelect('Male')}
          >
            <ThemedText style={[styles.optionText, currentSex === 'Male' && styles.selectedText]}>
              Male
            </ThemedText>
            {currentSex === 'Male' && (
              <ThemedText style={styles.checkmark}>✓</ThemedText>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.option, currentSex === 'Female' && styles.selectedOption]}
            onPress={() => onSelect('Female')}
          >
            <ThemedText style={[styles.optionText, currentSex === 'Female' && styles.selectedText]}>
              Female
            </ThemedText>
            {currentSex === 'Female' && (
              <ThemedText style={styles.checkmark}>✓</ThemedText>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onClose}
          >
            <ThemedText style={styles.cancelText}>Cancel</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#f0fdf4',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    color: '#22C55E',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 20,
    color: '#22C55E',
  },
  cancelButton: {
    padding: 20,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
});
