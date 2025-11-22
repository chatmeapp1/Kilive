
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

interface AgePickerProps {
  visible: boolean;
  currentAge: number;
  onClose: () => void;
  onConfirm: (age: number) => void;
}

export default function AgePicker({ visible, currentAge, onClose, onConfirm }: AgePickerProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState(currentYear - currentAge);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleConfirm = () => {
    const age = calculateAge();
    if (age >= 1 && age <= 120) {
      onConfirm(age);
    }
  };

  const renderPicker = (items: number[], selected: number, onSelect: (value: number) => void) => {
    return (
      <View style={styles.pickerColumn}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={styles.scrollContent}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.pickerItem,
                item === selected && styles.selectedItem
              ]}
              onPress={() => onSelect(item)}
            >
              <ThemedText style={[
                styles.pickerText,
                item === selected && styles.selectedText
              ]}>
                {item}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

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
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={styles.cancelButton}>Cancel</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.title}>Select Birthday</ThemedText>
            <TouchableOpacity onPress={handleConfirm}>
              <ThemedText style={styles.confirmButton}>Confirm</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
            {renderPicker(years, selectedYear, setSelectedYear)}
            {renderPicker(months, selectedMonth, setSelectedMonth)}
            {renderPicker(days, selectedDay, setSelectedDay)}
          </View>

          <View style={styles.ageDisplay}>
            <ThemedText style={styles.ageText}>
              Age: {calculateAge()} years old
            </ThemedText>
          </View>
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
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  confirmButton: {
    fontSize: 16,
    color: '#22C55E',
    fontWeight: '600',
  },
  pickerContainer: {
    flexDirection: 'row',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    paddingVertical: 10,
  },
  pickerColumn: {
    flex: 1,
    height: '100%',
  },
  scrollContent: {
    paddingVertical: ITEM_HEIGHT * 2,
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#f0fdf4',
  },
  pickerText: {
    fontSize: 18,
    color: '#999',
  },
  selectedText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
  ageDisplay: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  ageText: {
    fontSize: 16,
    color: '#666',
  },
});
