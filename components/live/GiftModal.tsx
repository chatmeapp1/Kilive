import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'normal' | 'lucky' | 'j-lucky' | 'luxury';
}

const GIFTS: Gift[] = [
  { id: '1', name: 'Flower', price: 100, image: '🌸', category: 'normal' },
  { id: '2', name: 'Milk tea', price: 125, image: '🧋', category: 'normal' },
  { id: '3', name: 'Beach', price: 250, image: '🏖️', category: 'normal' },
  { id: '4', name: 'Yellow Duck', price: 500, image: '🦆', category: 'normal' },

  { id: '5', name: 'Lucky Star', price: 200, image: '⭐', category: 'lucky' },
  { id: '6', name: 'Carousel', price: 1000, image: '🎠', category: 'lucky' },
  { id: '7', name: 'Vacation', price: 2000, image: '✈️', category: 'lucky' },
  { id: '8', name: 'Space Bear', price: 5000, image: '🐻', category: 'lucky' },

  { id: '9', name: 'J-Lucky Dragon', price: 300, image: '🐉', category: 'j-lucky' },
  { id: '10', name: 'J-Lucky Phoenix', price: 500, image: '🦅', category: 'j-lucky' },

  { id: '11', name: 'Diamond', price: 10000, image: '💎', category: 'luxury' },
  { id: '12', name: 'Crown', price: 50000, image: '👑', category: 'luxury' },
  { id: '13', name: 'Castle', price: 100000, image: '🏰', category: 'luxury' },
  { id: '14', name: 'Luxury Yacht', price: 1000000, image: '🛥️', category: 'luxury' },
];

const COMBO_OPTIONS = [1, 3, 9, 19, 99, 199];

interface GiftModalProps {
  visible: boolean;
  onClose: () => void;
  onSendGift: (gift: Gift, combo: number) => void;
  userBalance: number;
}

export default function GiftModal({
  visible,
  onClose,
  onSendGift,
  userBalance,
}: GiftModalProps) {
  const [activeTab, setActiveTab] =
    useState<'normal' | 'lucky' | 'j-lucky' | 'luxury'>('normal');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [selectedCombo, setSelectedCombo] = useState(1);
  const [comboMenuVisible, setComboMenuVisible] = useState(false);

  const filteredGifts = GIFTS.filter((g) => g.category === activeTab);
  const showCombo = activeTab === 'lucky' || activeTab === 'j-lucky';

  const handleSendGift = () => {
    if (selectedGift) {
      const totalCost = selectedGift.price * selectedCombo;
      if (totalCost <= userBalance) {
        onSendGift(selectedGift, selectedCombo);
        setSelectedGift(null);
        setSelectedCombo(1);
        onClose();
      } else {
        alert('Balance tidak cukup!');
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <BlurView intensity={15} style={styles.blurBg}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        </BlurView>

        <View style={styles.modalContent}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.progressContainer}>
              <View style={styles.starIcon}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#FFD700"
                    stroke="#FFA500"
                  />
                </Svg>
                <ThemedText style={styles.levelText}>22</ThemedText>
              </View>

              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '45%' }]} />
              </View>

              <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 18L15 12L9 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
          </View>

          {/* TABS */}
          <View style={styles.tabContainer}>
            {['normal', 'lucky', 'j-lucky', 'luxury'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab as any)}
              >
                <ThemedText
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab.toUpperCase()}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* FLOATING COMBO BUTTON */}
          {showCombo && (
            <View style={styles.comboFloatingContainer}>
              {/* Main Button */}
              <TouchableOpacity
                style={styles.comboMainButton}
                onPress={() => setComboMenuVisible(!comboMenuVisible)}
              >
                <ThemedText style={styles.comboMainText}>
                  {selectedCombo}
                </ThemedText>
              </TouchableOpacity>

              {/* Dropdown List */}
              {comboMenuVisible && (
                <View style={styles.comboMenu}>
                  {COMBO_OPTIONS.map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[
                        styles.comboMenuItem,
                        selectedCombo === c &&
                          styles.comboMenuItemActive,
                      ]}
                      onPress={() => {
                        setSelectedCombo(c);
                        setComboMenuVisible(false);
                      }}
                    >
                      <ThemedText
                        style={[
                          styles.comboMenuText,
                          selectedCombo === c &&
                            styles.comboMenuTextActive,
                        ]}
                      >
                        {c}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* GIFT GRID */}
          <ScrollView style={styles.giftScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.giftGrid}>
              {filteredGifts.map((gift) => (
                <TouchableOpacity
                  key={gift.id}
                  style={[
                    styles.giftItem,
                    selectedGift?.id === gift.id && styles.selectedGiftItem,
                  ]}
                  onPress={() => setSelectedGift(gift)}
                >
                  <View style={styles.giftImgWrapper}>
                    <ThemedText style={styles.giftEmoji}>{gift.image}</ThemedText>

                    {gift.price >= 1000 && (
                      <View style={styles.hotBadge}>
                        <ThemedText style={styles.hotText}>🔥</ThemedText>
                      </View>
                    )}
                  </View>

                  <ThemedText style={styles.giftPrice}>{gift.price} U</ThemedText>
                  <ThemedText style={styles.giftName}>{gift.name}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* FOOTER */}
          <View style={styles.footer}>
            {/* BALANCE */}
            <View style={styles.balanceRow}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="10" fill="#FFD700" />
                <Path
                  d="M12 6V18M8 10H14"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
              <ThemedText style={styles.balanceText}>{userBalance}</ThemedText>

              <TouchableOpacity>
                <ThemedText style={styles.rechargeText}>
                  Recharge >
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* SEND */}
            <TouchableOpacity
              style={[
                styles.sendButton,
                !selectedGift && styles.sendButtonDisabled,
              ]}
              onPress={handleSendGift}
              disabled={!selectedGift}
            >
              <ThemedText style={styles.sendButtonText}>
                Send
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/* ===================== STYLES ====================== */

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  blurBg: {
    ...StyleSheet.absoluteFillObject,
  },

  modalContent: {
    backgroundColor: '#1B1B1B',
    height: height * 0.75,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  starIcon: {
    width: 26,
    height: 26,
    position: 'relative',
  },

  levelText: {
    position: 'absolute',
    top: 6,
    left: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: 9,
    fontWeight: '700',
    color: '#000',
  },

  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#4ADE80',
  },

  /* Tabs */
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 10,
  },

  tab: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
  },

  activeTab: {
    backgroundColor: '#4ADE80',
  },

  tabText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '600',
  },

  activeTabText: {
    color: '#000',
  },

  /* FLOATING COMBO */
  comboFloatingContainer: {
    position: 'absolute',
    left: 14,
    bottom: 210,
    zIndex: 20,
  },

  comboMainButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4ADE80',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  comboMainText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '800',
  },

  comboMenu: {
    marginTop: 10,
    backgroundColor: '#2A2A2A',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    elevation: 10,
  },

  comboMenuItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 4,
    borderRadius: 8,
  },

  comboMenuItemActive: {
    backgroundColor: '#4ADE80',
  },

  comboMenuText: {
    color: '#fff',
    fontSize: 13,
  },

  comboMenuTextActive: {
    color: '#000',
    fontWeight: '700',
  },

  /* Gift Grid */
  giftScroll: {
    flex: 1,
    paddingHorizontal: 16,
  },

  giftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  giftItem: {
    width: (width - 60) / 4,
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
  },

  selectedGiftItem: {
    backgroundColor: '#3A3A3A',
    borderWidth: 2,
    borderColor: '#4ADE80',
  },

  giftImgWrapper: {
    marginBottom: 4,
    position: 'relative',
  },

  giftEmoji: {
    fontSize: 36,
  },

  hotBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
  },

  hotText: {
    fontSize: 14,
  },

  giftPrice: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 11,
  },

  giftName: {
    color: '#CCC',
    fontSize: 10,
    textAlign: 'center',
  },

  /* FOOTER */
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 8,
  },

  balanceText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '700',
  },

  rechargeText: {
    color: '#4ADE80',
    marginLeft: 'auto',
    fontSize: 14,
    fontWeight: '600',
  },

  sendButton: {
    backgroundColor: '#4ADE80',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },

  sendButtonDisabled: {
    backgroundColor: '#333',
  },

  sendButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '800',
  },
});