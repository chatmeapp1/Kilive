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

const { width, height } = Dimensions.get('window');

interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'slucky' | 'lucky' | 'luxury';
}

const GIFTS: Gift[] = [
  { id: '1', name: 'Labu', price: 125, image: '🎃', category: 'slucky' },
  { id: '2', name: 'Milk tea', price: 125, image: '🧋', category: 'slucky' },
  { id: '3', name: 'Beach', price: 250, image: '🏖️', category: 'slucky' },
  { id: '4', name: 'Yellow Duck', price: 500, image: '🦆', category: 'slucky' },
  { id: '5', name: 'Carousel', price: 1000, image: '🎠', category: 'lucky' },
  { id: '6', name: 'Vacation', price: 2000, image: '✈️', category: 'lucky' },
  { id: '7', name: 'Unicorn', price: 3000, image: '🦄', category: 'lucky' },
  { id: '8', name: 'Space Bear', price: 5000, image: '🐻', category: 'lucky' },
  { id: '9', name: 'Diamond', price: 10000, image: '💎', category: 'luxury' },
  { id: '10', name: 'Crown', price: 50000, image: '👑', category: 'luxury' },
  { id: '11', name: 'Castle', price: 100000, image: '🏰', category: 'luxury' },
  { id: '12', name: 'Yacht', price: 1000000, image: '🛥️', category: 'luxury' },
];

const COMBO_OPTIONS = [1, 3, 9, 19, 99, 199];

interface GiftModalProps {
  visible: boolean;
  onClose: () => void;
  onSendGift: (gift: Gift, combo: number) => void;
  userBalance: number;
}

export default function GiftModal({ visible, onClose, onSendGift, userBalance }: GiftModalProps) {
  const [activeTab, setActiveTab] = useState<'slucky' | 'lucky' | 'luxury'>('slucky');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [selectedCombo, setSelectedCombo] = useState(1);

  const filteredGifts = GIFTS.filter(gift => gift.category === activeTab);
  const showCombo = activeTab === 'slucky' || activeTab === 'lucky';

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
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView intensity={20} style={styles.blurContainer}>
          <TouchableOpacity 
            style={styles.backdropTouchable} 
            activeOpacity={1} 
            onPress={onClose}
          />
        </BlurView>

        <View style={styles.modalContent}>
          {/* Header dengan Progress Bar */}
          <View style={styles.header}>
            <View style={styles.progressContainer}>
              <View style={styles.starIcon}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
                </Svg>
                <ThemedText style={styles.levelText}>22</ThemedText>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '45%' }]} />
              </View>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'slucky' && styles.activeTab]}
              onPress={() => setActiveTab('slucky')}
            >
              <ThemedText style={[styles.tabText, activeTab === 'slucky' && styles.activeTabText]}>
                S-Lucky
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'lucky' && styles.activeTab]}
              onPress={() => setActiveTab('lucky')}
            >
              <ThemedText style={[styles.tabText, activeTab === 'lucky' && styles.activeTabText]}>
                Lucky
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'luxury' && styles.activeTab]}
              onPress={() => setActiveTab('luxury')}
            >
              <ThemedText style={[styles.tabText, activeTab === 'luxury' && styles.activeTabText]}>
                Luxury
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Gift Grid */}
          <ScrollView style={styles.giftScrollView} showsVerticalScrollIndicator={false}>
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
                  <View style={styles.giftImageContainer}>
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

          {/* Combo Selector (Only for Lucky & S-Lucky) */}
          {showCombo && (
            <View style={styles.comboContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {COMBO_OPTIONS.map((combo) => (
                  <TouchableOpacity
                    key={combo}
                    style={[
                      styles.comboButton,
                      selectedCombo === combo && styles.selectedComboButton,
                    ]}
                    onPress={() => setSelectedCombo(combo)}
                  >
                    <ThemedText
                      style={[
                        styles.comboText,
                        selectedCombo === combo && styles.selectedComboText,
                      ]}
                    >
                      {combo}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.balanceContainer}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Circle cx="12" cy="12" r="10" fill="#FFD700" />
                <Path d="M12 6V18M8 10H14C14.5304 10 15.0391 10.2107 15.4142 10.5858C15.7893 10.9609 16 11.4696 16 12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H8" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
              </Svg>
              <ThemedText style={styles.balanceText}>{userBalance}</ThemedText>
              <TouchableOpacity style={styles.rechargeButton}>
                <ThemedText style={styles.rechargeText}>Recharge &gt;</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.backpackButton}>
                <ThemedText style={styles.backpackText}>Backpack</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !selectedGift && styles.sendButtonDisabled,
                ]}
                onPress={handleSendGift}
                disabled={!selectedGift}
              >
                <ThemedText style={styles.sendButtonText}>Send</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.75,
    paddingBottom: 20,
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
    position: 'relative',
    width: 24,
    height: 24,
  },
  levelText: {
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    fontWeight: 'bold',
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
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#4ADE80',
  },
  tabText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
  },
  giftScrollView: {
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
  giftImageContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  giftEmoji: {
    fontSize: 36,
  },
  hotBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  hotText: {
    fontSize: 12,
  },
  giftPrice: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 2,
  },
  giftName: {
    fontSize: 10,
    color: '#CCC',
    textAlign: 'center',
  },
  comboContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  comboButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    minWidth: 50,
    alignItems: 'center',
  },
  selectedComboButton: {
    backgroundColor: '#4ADE80',
  },
  comboText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedComboText: {
    color: '#000',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  balanceText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rechargeButton: {
    marginLeft: 'auto',
  },
  rechargeText: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  backpackButton: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  backpackText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  sendButton: {
    flex: 1,
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
    fontWeight: 'bold',
  },
});
