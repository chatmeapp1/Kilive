
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface FansRankingTabsProps {
  activeTab: 'daily' | 'weekly' | 'totally';
  onTabChange: (tab: 'daily' | 'weekly' | 'totally') => void;
}

export default function FansRankingTabs({ activeTab, onTabChange }: FansRankingTabsProps) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'daily' && styles.activeTab]}
        onPress={() => onTabChange('daily')}
      >
        <ThemedText style={[styles.tabText, activeTab === 'daily' && styles.activeTabText]}>
          Daily
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
        onPress={() => onTabChange('weekly')}
      >
        <ThemedText style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>
          Weekly
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'totally' && styles.activeTab]}
        onPress={() => onTabChange('totally')}
      >
        <ThemedText style={[styles.tabText, activeTab === 'totally' && styles.activeTabText]}>
          Totally
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    padding: 4,
    marginHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#22C55E',
  },
});
