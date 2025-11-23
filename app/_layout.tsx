import 'react-native-reanimated';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import WebOnly from './web-only';
import { AuthProvider } from '@/contexts/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Prevent the splash screen from auto-hiding before asset loading is complete.
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    // Hide the splash screen once the assets have loaded.
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (Platform.OS === 'web') {
    return <WebOnly />;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
        <Stack.Screen name="auth/login-choice" options={{ headerShown: false }} />
        <Stack.Screen name="auth/phone-register" options={{ headerShown: false }} />
        <Stack.Screen name="auth/phone-login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="live-viewer" options={{ headerShown: false }} />
        <Stack.Screen name="broadcast" options={{ headerShown: false }} />
        <Stack.Screen name="editprofile/index" options={{ headerShown: false }} />
        <Stack.Screen name="settings/index" options={{ headerShown: false }} />
        <Stack.Screen name="settings/about" options={{ headerShown: false }} />
        <Stack.Screen name="settings/blocklist" options={{ headerShown: false }} />
        <Stack.Screen name="settings/delete-account" options={{ headerShown: false }} />
        <Stack.Screen name="settings/language" options={{ headerShown: false }} />
        <Stack.Screen name="settings/personality" options={{ headerShown: false }} />
        <Stack.Screen name="settings/privacy" options={{ headerShown: false }} />
        <Stack.Screen name="level/index" options={{ headerShown: false }} />
        <Stack.Screen name="fans/index" options={{ headerShown: false }} />
        <Stack.Screen name="income/index" options={{ headerShown: false }} />
        <Stack.Screen name="game/index" options={{ headerShown: false }} />
        <Stack.Screen name="join/index" options={{ headerShown: false }} />
        <Stack.Screen name="join/host" options={{ headerShown: false }} />
        <Stack.Screen name="join/agency" options={{ headerShown: false }} />
        <Stack.Screen name="recharge/index" options={{ headerShown: false }} />
        <Stack.Screen name="agency/index" options={{ headerShown: false }} />
        <Stack.Screen name="agency/add-host" options={{ headerShown: false }} />
        <Stack.Screen name="agency/host-income" options={{ headerShown: false }} />
        <Stack.Screen name="agency/live-times" options={{ headerShown: false }} />
        <Stack.Screen name="agency/received-gift" options={{ headerShown: false }} />
        <Stack.Screen name="agency/relation-management" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default RootLayout;