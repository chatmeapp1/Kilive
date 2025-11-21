
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';

export default function BlocklistScreen() {
  const router = useRouter();

  const blockedUsers = [
    { id: 1, name: 'User123', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-MMnzKGKyh73B_9KOp6wBLarBtvQ_LSHZX-CKRYyawg&s' },
    { id: 2, name: 'TestUser', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-MMnzKGKyh73B_9KOp6wBLarBtvQ_LSHZX-CKRYyawg&s' },
  ];

  const handleUnblock = (userName: string) => {
    Alert.alert(
      'Unblock User',
      `Are you sure you want to unblock ${userName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Unblock', 
          onPress: () => {
            Alert.alert('Success', `${userName} has been unblocked`);
          }
        }
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.container}>
        <LinearGradient
          colors={['#A8FF78', '#78FFD6']}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.backText}>‹</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Blocklist</ThemedText>
          <View style={styles.placeholder} />
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {blockedUsers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>No blocked users</ThemedText>
            </View>
          ) : (
            <View style={styles.userContainer}>
              {blockedUsers.map((user) => (
                <View key={user.id} style={styles.userItem}>
                  <Image source={{ uri: user.avatar }} style={styles.avatar} />
                  <ThemedText style={styles.userName}>{user.name}</ThemedText>
                  <TouchableOpacity 
                    style={styles.unblockButton}
                    onPress={() => handleUnblock(user.name)}
                  >
                    <ThemedText style={styles.unblockText}>Unblock</ThemedText>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
  },
  backText: {
    fontSize: 32,
    color: '#000',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  userContainer: {
    backgroundColor: '#fff',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  unblockButton: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unblockText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
