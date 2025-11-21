import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Path } from 'react-native-svg';

interface CoinBalanceProps {
  balance?: number;
}

export default function CoinBalance({ balance = 1000 }: CoinBalanceProps) {
  return (
    <>
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
      
      {/* Button hijau pastel di bawah avatar host */}
      <TouchableOpacity 
        style={styles.followButton}
        onPress={() => console.log('Follow button pressed')}
        activeOpacity={0.8}
      >
        <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <Path 
            d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" 
            stroke="#1F7A4D" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <Path 
            d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" 
            stroke="#1F7A4D" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <Path 
            d="M20 8V14M17 11H23" 
            stroke="#1F7A4D" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </Svg>
        <ThemedText style={styles.followText}>Ikuti</ThemedText>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  balanceBubble: {
    position: 'absolute',
    top: 118,              // TURUN SUPAYA TIDAK KENA AVATAR
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
  followButton: {
    position: 'absolute',
    top: 94,
    left: 16,
    backgroundColor: '#A7F3D0',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    zIndex: 10,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  followText: {
    color: '#1F7A4D',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});