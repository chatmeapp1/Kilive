import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Path } from 'react-native-svg';

interface Viewer {
  id: string;
  avatar: string;
  username?: string;
}

interface TopBarProps {
  hostName: string;
  hostId?: string;
  avatar?: string;
  isFollowing: boolean;
  onFollowPress: () => void;
  viewers?: Viewer[];
  viewerCount?: number;
  onViewerPress?: (userId: string) => void;
}

export default function TopBar({
  hostName,
  hostId,
  avatar,
  isFollowing,
  onFollowPress,
  viewers = [],
  viewerCount = 0,
  onViewerPress,
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
          <ThemedText style={styles.id}>@{hostId || '0000'}</ThemedText>
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

      {/* VIEWER LIST */}
      {viewers.length > 0 && (
        <View style={styles.viewerListContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.viewerScrollContent}
          >
            {viewers.slice(0, 6).map((viewer, index) => (
              <TouchableOpacity 
                key={viewer.id} 
                style={[styles.viewerAvatarContainer, index > 0 && styles.viewerAvatarOverlap]}
                onPress={() => onViewerPress && onViewerPress(viewer.id)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: viewer.avatar }}
                  style={styles.viewerAvatar}
                />
                <View style={styles.pinkBadge} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* VIEWER COUNT BADGE */}
      {viewerCount > 0 && (
        <View style={styles.viewerCountBadge}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <Path
              d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <ThemedText style={styles.viewerCountText}>{viewerCount}</ThemedText>
        </View>
      )}
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
    alignItems: 'center',
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

  viewerListContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  viewerScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 4,
  },

  viewerAvatarContainer: {
    position: 'relative',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewerAvatarOverlap: {
    marginLeft: -12,
  },

  viewerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#000',
  },

  pinkBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EC4899',
    borderWidth: 1.5,
    borderColor: '#000',
  },

  viewerCountBadge: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },

  viewerCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});