import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle } from 'react-native-svg';

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
          {/* TABS */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'j-lucky' && styles.activeTabSlucky,
              ]}
              onPress={() => setActiveTab('j-lucky')}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'j-lucky' && styles.activeTabText,
                ]}
              >
                S-Lucky
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'lucky' && styles.activeTabLucky,
              ]}
              onPress={() => setActiveTab('lucky')}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'lucky' && styles.activeTabText,
                ]}
              >
                Lucky
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'luxury' && styles.activeTabLuxury,
              ]}
              onPress={() => setActiveTab('luxury')}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'luxury' && styles.activeTabText,
                ]}
              >
                Luxury
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* INFO TEXT */}
          {showCombo && (
            <View style={styles.infoContainer}>
              <ThemedText style={styles.infoText}>
                The other party gets 2 crystals and 60 gift flow
              </ThemedText>
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
                  </View>

                  <ThemedText style={styles.giftPrice}>{gift.price} U</ThemedText>
                  <ThemedText style={styles.giftName}>{gift.name}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* COMBO SELECTOR - Muncul saat gift dipilih dan showCombo true */}
          {selectedGift && showCombo && (
            <View style={styles.comboSelectorContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.comboScrollContent}
              >
                {COMBO_OPTIONS.map((combo) => (
                  <TouchableOpacity
                    key={combo}
                    style={[
                      styles.comboButton,
                      selectedCombo === combo && styles.comboButtonActive,
                    ]}
                    onPress={() => setSelectedCombo(combo)}
                  >
                    <ThemedText
                      style={[
                        styles.comboButtonText,
                        selectedCombo === combo && styles.comboButtonTextActive,
                      ]}
                    >
                      {combo}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* FOOTER */}
          <View style={styles.footer}>
            {/* BALANCE */}
            <View style={styles.balanceRow}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="10" fill="#FFD700" />
              </Svg>
              <ThemedText style={styles.balanceText}>{userBalance}</ThemedText>

              <TouchableOpacity>
                <ThemedText style={styles.rechargeText}>
                  Recharge &gt;
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* SEND BUTTON */}
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
    height: height * 0.65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
  },

  /* Tabs */
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
  },

  activeTabSlucky: {
    backgroundColor: '#B673FF',
  },

  activeTabLucky: {
    backgroundColor: '#4ADE80',
  },

  activeTabLuxury: {
    backgroundColor: '#FFD700',
  },

  tabText: {
    color: '#999',
    fontSize: 13,
    fontWeight: '600',
  },

  activeTabText: {
    color: '#000',
  },

  /* Info Text */
  infoContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  infoText: {
    color: '#888',
    fontSize: 12,
  },

  /* Gift Grid */
  giftScroll: {
    flex: 1,
    paddingHorizontal: 16,
  },

  giftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 16,
  },

  giftItem: {
    width: (width - 52) / 4,
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#2A2A2A',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  selectedGiftItem: {
    borderColor: '#7FE5A8',
    backgroundColor: '#2F3A2F',
  },

  giftImgWrapper: {
    marginBottom: 6,
  },

  giftEmoji: {
    fontSize: 40,
  },

  giftPrice: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 2,
  },

  giftName: {
    color: '#CCC',
    fontSize: 10,
    textAlign: 'center',
  },

  /* COMBO SELECTOR */
  comboSelectorContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },

  comboScrollContent: {
    gap: 10,
    paddingVertical: 4,
  },

  comboButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    minWidth: 50,
    alignItems: 'center',
  },

  comboButtonActive: {
    backgroundColor: '#4ADE80',
  },

  comboButtonText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },

  comboButtonTextActive: {
    color: '#000',
    fontWeight: '700',
  },

  /* FOOTER */
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
  },

  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },

  sendButtonDisabled: {
    backgroundColor: '#333',
  },

  sendButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
});