import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
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
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <IconSymbol name="chevron.left" size={22} color="#fff" />
      </TouchableOpacity>

      {/* HOST INFO */}
      <View style={styles.hostBox}>
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
          <IconSymbol
            name={isFollowing ? 'checkmark' : 'plus'}
            size={16}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* CLOSE BUTTON */}
      <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
        <IconSymbol name="xmark" size={20} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 48,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20,
  },

  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hostBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 24,
    marginLeft: 8,
    flex: 1,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#fff',
  },

  texts: {
    marginLeft: 8,
    flex: 1,
  },

  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  id: {
    color: '#fff',
    fontSize: 10,
    opacity: 0.8,
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

  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});