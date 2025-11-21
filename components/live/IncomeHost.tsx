import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Path } from 'react-native-svg';

interface IncomeHostProps {
  balance: number;
}

export default function IncomeHost({ balance }: IncomeHostProps) {
  return (
    <View style={styles.balanceBubble}>
      <Svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C6.48 2 2 5.58 2 10C2 14.42 6.48 18 12 18C17.52 18 22 14.42 22 10C22 5.58 17.52 2 12 2Z"
          stroke="#166534"
          strokeWidth="2"
        />
        <Path
          d="M12 6V14M9 10H15"
          stroke="#166534"
          strokeWidth="2"
        />
      </Svg>

      <ThemedText style={styles.balanceText}>{balance}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceBubble: {
    position: 'absolute',
    top: 118,
    left: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: '#CFFDE1',
    gap: 5,
    zIndex: 20,
    elevation: 4,
  },
  balanceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#166534',
  },
});