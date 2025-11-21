import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// --- Asset Imports ---
const coinIcon = require('@/assets/coin.png');
const bcaLogo = require('@/assets/topup/bca.png');
const mandiriLogo = require('@/assets/topup/mandiri.png');
const briLogo = require('@/assets/topup/bri.png');
const bssLogo = require('@/assets/topup/bss.png');
const danaLogo = require('@/assets/topup/dana.png');
const ovoLogo = require('@/assets/topup/ovo.png');
const gopayLogo = require('@/assets/topup/gopay.png');
const linkajaLogo = require('@/assets/topup/linkaja.png');
const shopeepayLogo = require('@/assets/topup/shopeepay.png');
const googlewalletLogo = require('@/assets/topup/googlewallet.png');

// --- Component Definitions ---

interface BadgeProps {
  text: string;
}
const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <View style={styles.badgeContainer}>
      <ThemedText style={styles.badgeText}>{text}</ThemedText>
    </View>
  );
};

interface TopUpCardProps {
  logo: NodeRequire;
  name: string;
  subtitle: string;
  isBestChoice?: boolean;
}
const TopUpCard: React.FC<TopUpCardProps> = ({ logo, name, subtitle, isBestChoice }) => {
  return (
    <TouchableOpacity style={styles.topUpCardContainer}>
      {isBestChoice && <Badge text="Best Choice" />}
      <Image source={logo} style={styles.topUpLogo} resizeMode="contain" />
      <ThemedText style={styles.topUpName}>{name}</ThemedText>
      <ThemedText style={styles.topUpSubtitle}>{subtitle}</ThemedText>
    </TouchableOpacity>
  );
};

interface TopUpGridProps {
  data: TopUpCardProps[];
}
const TopUpGrid: React.FC<TopUpGridProps> = ({ data }) => {
  return (
    <View style={styles.topUpGridContainer}>
      {data.map((item, index) => (
        <TopUpCard
          key={index}
          logo={item.logo}
          name={item.name}
          subtitle={item.subtitle}
          isBestChoice={item.isBestChoice}
        />
      ))}
    </View>
  );
};

// --- Main Screen Component ---

const topUpOptions = [
  { logo: bcaLogo, name: 'BCA', subtitle: 'Buy more Get more', isBestChoice: true },
  { logo: mandiriLogo, name: 'Mandiri', subtitle: 'Buy more Get more' },
  { logo: briLogo, name: 'BRI', subtitle: 'Buy more Get more' },
  { logo: bssLogo, name: 'BSS', subtitle: 'Buy more Get more' },
  { logo: danaLogo, name: 'Dana', subtitle: 'Indonesia' },
  { logo: ovoLogo, name: 'OVO', subtitle: 'Indonesia' },
  { logo: gopayLogo, name: 'GoPay', subtitle: 'Indonesia' },
  { logo: linkajaLogo, name: 'LinkAja', subtitle: 'Indonesia' },
  { logo: shopeepayLogo, name: 'ShopeePay', subtitle: 'Indonesia' },
  { logo: googlewalletLogo, name: 'Google Wallet', subtitle: 'Indonesia' },
];

export default function RechargeScreen() {
  return (
    <ThemedView style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('@/assets/icons/arrow-left.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Recharge</ThemedText>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('@/assets/icons/close.svg')} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      {/* Balance Section */}
      <ThemedView style={styles.balanceSection}>
        <ThemedText style={styles.balanceLabel}>My Coins</ThemedText>
        <View style={styles.balanceValueContainer}>
          <ThemedText style={styles.balanceValue}>38</ThemedText>
          <Image source={coinIcon} style={styles.coinIcon} />
        </View>
      </ThemedView>

      {/* Top Up Grid */}
      <ScrollView>
        <TopUpGrid data={topUpOptions} />
      </ScrollView>
    </ThemedView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'linear-gradient(90deg, #4CAF50 0%, #FFEB3B 100%)', // Gradient for header background
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  balanceSection: {
    backgroundColor: '#7B2FFF',
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  balanceValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 10,
  },
  coinIcon: {
    width: 40,
    height: 40,
  },
  topUpGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  topUpCardContainer: {
    width: '31%', // Approx 3 columns with spacing
    height: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    position: 'relative', // For badge positioning
  },
  topUpLogo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  topUpName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  topUpSubtitle: {
    fontSize: 10,
    color: '#888888',
  },
  badgeContainer: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -45 }], // Center the badge
    backgroundColor: '#7B2FFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  badgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});