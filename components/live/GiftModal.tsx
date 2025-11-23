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
import Svg, { Circle } from 'react-native-svg';

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
  const [comboDropdownOpen, setComboDropdownOpen] = useState(false);

  const filteredGifts = GIFTS.filter((g) => g.category === activeTab);
  const showCombo = activeTab === 'lucky' || activeTab === 'j-lucky';

  const handleSendGift = () => {
    if (!selectedGift) return;
    const totalCost = selectedGift.price * selectedCombo;

    if (totalCost > userBalance) {
      alert('Balance tidak cukup!');
      return;
    }

    onSendGift(selectedGift, selectedCombo);
    setSelectedGift(null);
    setSelectedCombo(1);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <BlurView intensity={20} style={styles.blurBg}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        </BlurView>

        <View style={styles.modalBox}>
          {/* Tabs */}
          <View style={styles.tabs}>
            {['normal', 'lucky', 'j-lucky', 'luxury'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tab, activeTab === t && styles.activeTab]}
                onPress={() => setActiveTab(t as any)}
              >
                <ThemedText style={styles.tabText}>
                  {t === 'normal'
                    ? 'Umum'
                    : t === 'lucky'
                    ? 'Lucky'
                    : t === 'j-lucky'
                    ? 'J-Lucky'
                    : 'Luxury'}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Gift Grid */}
          <ScrollView style={styles.giftScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.giftGrid}>
              {filteredGifts.map((gift) => (
                <TouchableOpacity
                  key={gift.id}
                  style={[
                    styles.giftItem,
                    selectedGift?.id === gift.id && styles.selectedGift,
                  ]}
                  onPress={() => setSelectedGift(gift)}
                >
                  <ThemedText style={styles.giftEmoji}>{gift.image}</ThemedText>
                  <ThemedText style={styles.price}>{gift.price}</ThemedText>
                  <ThemedText style={styles.giftName}>{gift.name}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* FOOTER */}
          <View style={styles.footer}>
            {/* Balance Row */}
            <View style={styles.balanceRow}>
              <Svg width={15} height={15} viewBox="0 0 24 24">
                <Circle cx="12" cy="12" r="10" fill="#FFD700" />
              </Svg>

              <ThemedText style={styles.balance}>{userBalance}</ThemedText>

              <TouchableOpacity>
                <ThemedText style={styles.recharge}>Isi ulang ></ThemedText>
              </TouchableOpacity>
            </View>

            {/* Action Row */}
            <View style={styles.actionRow}>
              {/* Combo */}
              {showCombo && selectedGift ? (
                <View style={styles.comboBox}>
                  <TouchableOpacity
                    style={styles.comboBtn}
                    onPress={() => setComboDropdownOpen(!comboDropdownOpen)}
                  >
                    <ThemedText style={styles.comboText}>{selectedCombo}</ThemedText>
                  </TouchableOpacity>

                  {comboDropdownOpen && (
                    <View style={styles.comboDropdown}>
                      {COMBO_OPTIONS.map((v) => (
                        <TouchableOpacity
                          key={v}
                          style={styles.comboItem}
                          onPress={() => {
                            setSelectedCombo(v);
                            setComboDropdownOpen(false);
                          }}
                        >
                          <ThemedText style={styles.comboItemText}>{v}</ThemedText>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ) : (
                <View style={{ width: 60 }} />
              )}

              {/* Send */}
              <TouchableOpacity
                style={[
                  styles.sendBtn,
                  !selectedGift && styles.sendDisabled,
                ]}
                disabled={!selectedGift}
                onPress={handleSendGift}
              >
                <ThemedText style={styles.sendText}>Kirim</ThemedText>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </Modal>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  blurBg: {
    ...StyleSheet.absoluteFillObject,
  },

  modalBox: {
    backgroundColor: '#1B1B1B',
    height: height * 0.55, // TURUNKAN SEDIKIT
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 14,
  },

  /* Tabs */
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 14,
  },

  tab: {
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },

  activeTab: {
    backgroundColor: '#7FE5A8',
  },

  tabText: {
    color: '#fff',
    fontWeight: '600',
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
    paddingBottom: 16,
  },

  giftItem: {
    width: (width - 60) / 4,
    paddingVertical: 12,
    backgroundColor: '#232323',
    borderRadius: 14,
    alignItems: 'center',
  },

  selectedGift: {
    backgroundColor: '#304438',
    borderColor: '#7FE5A8',
    borderWidth: 1.3,
  },

  giftEmoji: { fontSize: 38 },
  price: { color: '#FFD700', fontWeight: '700', fontSize: 13 },
  giftName: { color: '#AAA', fontSize: 10, textAlign: 'center' },

  /* Footer */
  footer: { paddingHorizontal: 16, paddingVertical: 10 },

  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },

  balance: { color: '#FFD700', fontSize: 15, fontWeight: '700' },
  recharge: { color: '#7FE5A8', fontSize: 14, fontWeight: '600' },

  /* Action Row */
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },

  /* Combo */
  comboBox: { position: 'relative' },

  comboBtn: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  comboText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  comboDropdown: {
    position: 'absolute',
    bottom: 48,
    width: 60,
    backgroundColor: '#000',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#7FE5A8',
    paddingVertical: 4,
    zIndex: 50,
  },

  comboItem: { paddingVertical: 6, alignItems: 'center' },

  comboItemText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  /* Send */
  sendBtn: {
    backgroundColor: '#7FE5A8',
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 16,
  },

  sendDisabled: {
    backgroundColor: '#555',
  },

  sendText: { fontWeight: '800', fontSize: 15, color: '#000' },
});