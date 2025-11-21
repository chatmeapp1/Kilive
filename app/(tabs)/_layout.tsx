
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { HapticTab } from '@/components/HapticTab';

// Home icon - no background circle
const HomeIcon = ({ focused }: { focused: boolean }) => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" 
      fill={focused ? "#000" : "#666"}
    />
  </Svg>
);

// Live icon - with circular background
const LiveIcon = ({ focused }: { focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <Path 
        d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" 
        fill={focused ? "#000" : "#000"}
      />
    </Svg>
  </View>
);

// Profile icon - no background circle
const ProfileIcon = ({ focused }: { focused: boolean }) => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path 
      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
      fill={focused ? "#000" : "#666"}
    />
  </Svg>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: Platform.OS === 'ios' ? 85 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ focused }) => <LiveIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // This hides the explore tab
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#A8FF78',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerActive: {
    backgroundColor: '#8FE66D',
  },
});
