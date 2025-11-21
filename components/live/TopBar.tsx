import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Path } from 'react-native-svg';

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
  return (
    <View style={styles.wrapper}>
      {/* HOST INFO BUBBLE */}
      <View style={styles.hostBubble}>
        <Image
          source={{
            uri:
              avatar ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvsOPvAhPNyrFbQmRw-LLSxIfDcO5aqNJ3mOw6WfTW5lY8j--GRD385S0&s',
          }}
          style={styles.avatar}
        />

        <View style={styles.texts}>
          <ThemedText style={styles.name}>{hostName || 'Host'}</ThemedText>
          <ThemedText style={styles.id}>ID: {hostId || '0000'}</ThemedText>
        </View>

        {/* FOLLOW BUTTON with SVG */}
        <TouchableOpacity style={styles.followBtn} onPress={onFollowPress} activeOpacity={0.8}>
          {isFollowing ? (
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Path
                d="M5 13l4 4L19 7"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          ) : (
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 5v14M5 12h14"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 44,
    left: 12,
    right: 12,
    zIndex: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  hostBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 22,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#fff',
  },

  texts: {
    marginLeft: 8,
    marginRight: 6,
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
  },
});