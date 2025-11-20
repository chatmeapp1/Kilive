
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface GiftAnimation {
  id: string;
  username: string;
  giftName: string;
  giftIcon: string;
  amount?: number;
}

interface GiftAnimationContainerProps {
  gifts?: GiftAnimation[];
}

export default function GiftAnimationContainer({ gifts = [] }: GiftAnimationContainerProps) {
  return (
    <View style={styles.container}>
      {gifts.map((gift) => (
        <View key={gift.id} style={styles.giftItem}>
          <Text style={styles.giftIcon}>{gift.giftIcon}</Text>
          <View style={styles.giftInfo}>
            <Text style={styles.username}>{gift.username}</Text>
            <Text style={styles.giftText}>
              sent {gift.giftName}
              {gift.amount && ` x${gift.amount}`}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 120,
    left: 12,
    gap: 8,
  },
  giftItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    gap: 10,
  },
  giftIcon: {
    fontSize: 32,
  },
  giftInfo: {
    flex: 1,
  },
  username: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  giftText: {
    color: '#fff',
    fontSize: 11,
  },
});
