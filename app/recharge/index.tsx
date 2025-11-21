
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';

const Badge = ({ text }: { text: string }) => (
  <View style={styles.badge}>
    <ThemedText style={styles.badgeText}>{text}</ThemedText>
  </View>
);

const TopUpCard = ({ logo, name, subtitle, isBestChoice }: { logo: any; name: string; subtitle: string; isBestChoice: boolean }) => (
  <View style={styles.topUpCard}>
    {isBestChoice && <Badge text="Best Choice" />}
    <Image source={logo} style={styles.bankLogo} resizeMode="contain" />
    <ThemedText style={styles.bankName}>{name}</ThemedText>
    <ThemedText style={styles.bankSubtitle}>{subtitle}</ThemedText>
  </View>
);

const TopUpGrid = ({ paymentMethods }: { paymentMethods: any[] }) => (
  <View style={styles.topUpGrid}>
    {paymentMethods.map((method, index) => (
      <TopUpCard
        key={index}
        logo={method.logo}
        name={method.name}
        subtitle={method.subtitle}
        isBestChoice={method.isBestChoice}
      />
    ))}
  </View>
);

export default function RechargeScreen() {
  const router = useRouter();

  const paymentMethods = [
    { logo: require('@/assets/topup/bca.png'), name: 'BCA', subtitle: 'Buy more Get more', isBestChoice: true },
    { logo: require('@/assets/topup/mandiri.png'), name: 'Mandiri', subtitle: 'Buy more Get more', isBestChoice: false },
    { logo: require('@/assets/topup/bri.png'), name: 'BRI', subtitle: 'Buy more Get more', isBestChoice: false },
    { logo: require('@/assets/topup/bss.png'), name: 'BSS', subtitle: 'Buy more Get more', isBestChoice: false },
    { logo: require('@/assets/topup/dana.png'), name: 'Dana', subtitle: 'Indonesia', isBestChoice: false },
    { logo: require('@/assets/topup/ovo.png'), name: 'OVO', subtitle: 'Indonesia', isBestChoice: false },
    { logo: require('@/assets/topup/gopay.png'), name: 'GoPay', subtitle: 'Indonesia', isBestChoice: false },
    { logo: require('@/assets/topup/linkaja.png'), name: 'LinkAja', subtitle: 'Indonesia', isBestChoice: false },
    { logo: require('@/assets/topup/shopeepay.png'), name: 'ShopeePay', subtitle: 'Indonesia', isBestChoice: false },
    { logo: require('@/assets/topup/googlewallet.png'), name: 'Google Wallet', subtitle: 'Indonesia', isBestChoice: false },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

        <LinearGradient
          colors={['#A8FF78', '#78FFD6']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButtonLeft}>
              <ThemedText style={styles.backIcon}>←</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.headerTitle}>Recharge</ThemedText>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerButtonRight}>
              <ThemedText style={styles.closeIcon}>✕</ThemedText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#7B2FFF', '#7B2FFF']}
            style={styles.balanceSection}
          >
            <ThemedView lightColor="#7B2FFF" darkColor="#7B2FFF" style={styles.balanceInnerView}>
              <ThemedText style={styles.balanceTitle}>My Coins</ThemedText>
              <View style={styles.coinContainer}>
                <Image source={require('@/assets/coin.png')} style={styles.coinIcon} />
                <ThemedText style={styles.coinAmount}>38</ThemedText>
              </View>
            </ThemedView>
          </LinearGradient>

          <TopUpGrid paymentMethods={paymentMethods} />

          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerButtonLeft: {
    padding: 8,
  },
  headerButtonRight: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  closeIcon: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  balanceSection: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 16,
  },
  balanceInnerView: {
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  coinAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  topUpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  topUpCard: {
    width: '31%',
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  badge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#7B2FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bankLogo: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  bankName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bankSubtitle: {
    fontSize: 10,
    color: '#777',
  },
});
