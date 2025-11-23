// Platform-aware storage wrapper
// - Native (iOS/Android): Uses expo-secure-store for encrypted storage
// - Web: Uses localStorage for persistence (note: less secure than native)
// - Fallback: In-memory storage if neither available

import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class PlatformStorage {
  private memoryStorage: Map<string, string>;

  constructor() {
    this.memoryStorage = new Map();
  }

  async getItem(key: string): Promise<string | null> {
    try {
      // Use SecureStore on native platforms
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        return await SecureStore.getItemAsync(key);
      }
      
      // Use localStorage on web
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
      
      // Fallback to memory storage
      return this.memoryStorage.get(key) || null;
    } catch (error) {
      console.error('Storage getItem error:', error);
      return this.memoryStorage.get(key) || null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      // Use SecureStore on native platforms
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        await SecureStore.setItemAsync(key, value);
        return;
      }
      
      // Use localStorage on web
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
        return;
      }
      
      // Fallback to memory storage
      this.memoryStorage.set(key, value);
    } catch (error) {
      console.error('Storage setItem error:', error);
      this.memoryStorage.set(key, value);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      // Use SecureStore on native platforms
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        await SecureStore.deleteItemAsync(key);
        return;
      }
      
      // Use localStorage on web
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
        return;
      }
      
      // Fallback to memory storage
      this.memoryStorage.delete(key);
    } catch (error) {
      console.error('Storage removeItem error:', error);
      this.memoryStorage.delete(key);
    }
  }

  async clear(): Promise<void> {
    try {
      // Note: SecureStore doesn't have clear(), so we'd need to track keys
      // For now, just clear memory storage
      this.memoryStorage.clear();
      
      if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
    } catch (error) {
      console.error('Storage clear error:', error);
      this.memoryStorage.clear();
    }
  }
}

// Create singleton instance
const storage = new PlatformStorage();

export default storage;
