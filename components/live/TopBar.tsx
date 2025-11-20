import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface TopBarProps {
  hostName: string;
  hostId?: string;
  avatar?: string;
  isFollowing: boolean;
  onFollowPress: () => void;
}

export default function TopBar({
  hostName,
  hostId,
  avatar,
  isFollowing,
  onFollowPress,
}: TopBarProps) {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      
      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => router.back()} style={styles.smallBtn}>
        <Ionicons name="chevron-back" size={20} color="#fff" />
      </TouchableOpacity>

      {/* HOST INFO */}
      <View style={styles.hostBubble}>
        <Image
          source={{ uri: avatar || 'https://via.placeholder.com/80' }}
          style={styles.avatar}
        />

        <View style={styles.texts}>
          <ThemedText style={styles.name}>{hostName || 'Host'}</ThemedText>
          <ThemedText style={styles.id}>ID: {hostId || '0000'}</ThemedText>
        </View>

        {/* FOLLOW BUTTON */}
        <TouchableOpacity style={styles.followBtn} onPress={onFollowPress}>
          <Ionicons
            name={isFollowing ? "checkmark" : "add"}
            size={16}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* CLOSE BUTTON */}
      <TouchableOpacity onPress={() => router.back()} style={styles.smallBtn}>
        <Ionicons name="close" size={20} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 44,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 50,
    justifyContent: 'space-between',
  },

  smallBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hostBubble: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 22,
    marginHorizontal: 8,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: '#fff',
    borderWidth: 1.2,
  },

  texts: {
    marginLeft: 8,
    flex: 1,
  },

  name: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  id: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 10,
  },

  followBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#A855F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
});