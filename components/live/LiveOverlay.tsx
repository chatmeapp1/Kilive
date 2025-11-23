import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Keyboard,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Slider from '@react-native-community/slider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import TopBar from './TopBar';
import SystemMessage from './SystemMessage';
import IncomeHost from './IncomeHost';
import JpBanner from './JpBanner';
import ChatMessageList from './ChatMessageList';
import BottomPanel from './BottomPanel';
import MiniProfileModal from './MiniProfileModal';

interface Viewer {
  id: string;
  avatar: string;
  username?: string;
}

interface LiveOverlayProps {
  hostName: string;
  hostId: string;
  hostAvatar?: string;
  balance: number;
  messages?: any[];
  jpQueue?: any[];
  onSendMessage: (msg: string) => void;
  onGiftPress: () => void;
  agoraEngine: any;
  isHostAway: boolean;
  viewers?: Viewer[];
  viewerCount?: number;
}

export default function LiveOverlay({
  hostName,
  hostId,
  hostAvatar,
  balance,
  messages,
  jpQueue,
  onSendMessage,
  onGiftPress,
  agoraEngine,
  isHostAway,
  viewers,
  viewerCount,
}: LiveOverlayProps) {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [selectedViewerId, setSelectedViewerId] = useState<string | null>(null);
  const [showMiniProfile, setShowMiniProfile] = useState(false);

  // KEYBOARD OFFSET
  const keyboardOffset = useSharedValue(0);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        keyboardOffset.value = withTiming(e.endCoordinates.height, {
          duration: 220,
        });
      }
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        keyboardOffset.value = withTiming(0, { duration: 220 });
      }
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // BEAUTY FILTER UI
  const [beautyOpen, setBeautyOpen] = useState(false);
  const [beauty, setBeauty] = useState({
    smooth: 0.5,
    light: 0.4,
    red: 0.1,
  });

  const applyBeauty = (key: 'smooth' | 'light' | 'red', value: number) => {
    const updated = { ...beauty, [key]: value };
    setBeauty(updated);

    if (agoraEngine) {
      agoraEngine.setBeautyEffectOptions(true, {
        lighteningLevel: updated.light,
        smoothnessLevel: updated.smooth,
        rednessLevel: updated.red,
        lighteningContrastLevel: 1,
      });
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleViewerPress = (viewerId: string) => {
    setSelectedViewerId(viewerId);
    setShowMiniProfile(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.overlay}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* TOP BAR */}
      <TopBar
        hostName={hostName}
        hostId={hostId}
        avatar={hostAvatar}
        isFollowing={isFollowing}
        onFollowPress={handleFollow}
        viewers={viewers}
        viewerCount={viewerCount}
        onViewerPress={handleViewerPress}
      />

      {/* HOST INCOME */}
      <IncomeHost balance={balance} />

      {/* SYSTEM MESSAGE */}
      <SystemMessage message="Platform ini melarang konten dewasa atau tindakan ilegal." />

      {/* JP BANNER */}
      {(jpQueue || []).map((jp, index) => (
        <JpBanner
          key={jp.id}
          avatar={jp.avatar}
          username={jp.username}
          giftName={jp.giftName}
          milestone={jp.milestone}
          amount={jp.amount}
          index={index}
          onHide={jp.onHide}
        />
      ))}

      {/* CHAT */}
      <Animated.View
        style={[
          useAnimatedStyle(() => ({
            transform: [{ translateY: -keyboardOffset.value }],
          })),
        ]}
      >
        <ChatMessageList messages={messages} />
      </Animated.View>

      {/* BEAUTYBUTTON */}
      <View style={styles.rightButtons}>
        <View
          style={styles.beautyBtn}
          onTouchStart={() => setBeautyOpen(!beautyOpen)}
        >
          <View style={styles.diamondIcon}>
            <View style={styles.whiteDot} />
          </View>
        </View>
      </View>

      {/* BEAUTY PANEL */}
      {beautyOpen && (
        <View style={styles.beautyPanel}>
          <Text style={styles.label}>Smooth</Text>
          <Slider
            value={beauty.smooth}
            onValueChange={(v) => applyBeauty('smooth', v)}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#A855F7"
          />

          <Text style={styles.label}>Light</Text>
          <Slider
            value={beauty.light}
            onValueChange={(v) => applyBeauty('light', v)}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#A855F7"
          />

          <Text style={styles.label}>Redness</Text>
          <Slider
            value={beauty.red}
            onValueChange={(v) => applyBeauty('red', v)}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#A855F7"
          />
        </View>
      )}

      {/* INPUT & MENU */}
      <BottomPanel
        onSend={onSendMessage}
        onGiftPress={onGiftPress}
      />

      {/* HOST AWAY MODE (AR-STYLE BLUR) */}
      {isHostAway && (
        <BlurView intensity={50} tint="dark" style={styles.awayBlur}>
          <View style={styles.awayBox}>
            <View style={styles.awayCircleOuter}>
              <View style={styles.awayCircleInner} />
            </View>

            <View>
              <Text style={styles.awayTextMain}>Host sedang pergi sebentar</Text>
              <Text style={styles.awayTextSub}>Tunggu ya, siapkan gift dulu</Text>
            </View>
          </View>
        </BlurView>
      )}

      {/* Mini Profile Modal */}
      {selectedViewerId && (
        <MiniProfileModal
          visible={showMiniProfile}
          userId={selectedViewerId}
          onClose={() => {
            setShowMiniProfile(false);
            setSelectedViewerId(null);
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },

  rightButtons: {
    position: 'absolute',
    right: 15,
    bottom: 220,
  },

  beautyBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  diamondIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#A855F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  whiteDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  beautyPanel: {
    position: 'absolute',
    right: 70,
    bottom: 200,
    width: 220,
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: 14,
    borderRadius: 14,
  },

  label: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    marginBottom: -4,
  },

  awayBlur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },

  awayBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
  },

  awayCircleOuter: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#FACC15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  awayCircleInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F97316',
  },

  awayTextMain: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  awayTextSub: {
    color: '#ccc',
    fontSize: 12,
  },
});