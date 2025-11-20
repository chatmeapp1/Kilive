
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileImageSection() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftSection}>
        <ThemedText style={styles.label}>Head portrait</ThemedText>
      </View>
      <View style={styles.rightSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/60' }}
          style={styles.profileImage}
        />
        <View style={styles.arrow} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  leftSection: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  arrow: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
});
