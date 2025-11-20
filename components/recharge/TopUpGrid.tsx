
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TopUpCard from './TopUpCard';

const BCA = require('@/assets/topup/bca.png');
const Mandiri = require('@/assets/topup/mandiri.png');
const BRI = require('@/assets/topup/bri.png');
const BSS = require('@/assets/topup/bss.png');
const Dana = require('@/assets/topup/dana.png');
const OVO = require('@/assets/topup/ovo.png');
const GoPay = require('@/assets/topup/gopay.png');
const LinkAja = require('@/assets/topup/linkaja.png');
const ShopeePay = require('@/assets/topup/shopeepay.png');

const topUpMethods = [
  { id: 1, name: 'BCA', logo: BCA, subtitle: 'Buy more Get more', bestChoice: true },
  { id: 2, name: 'Mandiri', logo: Mandiri, subtitle: 'Buy more Get more', bestChoice: false },
  { id: 3, name: 'BRI', logo: BRI, subtitle: 'Buy more Get more', bestChoice: false },
  { id: 4, name: 'BSS', logo: BSS, subtitle: 'Buy more Get more', bestChoice: false },
  { id: 5, name: 'Dana', logo: Dana, subtitle: 'Indonesia', bestChoice: true },
  { id: 6, name: 'OVO', logo: OVO, subtitle: 'Indonesia', bestChoice: false },
  { id: 7, name: 'GoPay', logo: GoPay, subtitle: 'Indonesia', bestChoice: false },
  { id: 8, name: 'LinkAja', logo: LinkAja, subtitle: 'Indonesia', bestChoice: false },
  { id: 9, name: 'ShopeePay', logo: ShopeePay, subtitle: 'Indonesia', bestChoice: false },
];

export default function TopUpGrid() {
  return (
    <View style={styles.grid}>
      {topUpMethods.map((method) => (
        <TopUpCard
          key={method.id}
          name={method.name}
          logo={method.logo}
          subtitle={method.subtitle}
          bestChoice={method.bestChoice}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
