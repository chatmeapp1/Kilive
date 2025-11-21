import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Svg, { Path } from 'react-native-svg';

export default function CoinBalance() {
  return (
    <>
      <View style={styles.container}>
        <ThemedText style={styles.text}>💰 Balance: 1000</ThemedText>
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
  container: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 10,
  },
  text: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
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