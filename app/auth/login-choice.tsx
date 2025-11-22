
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const FacebookIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
    <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </Svg>
);

const GoogleIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24">
    <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </Svg>
);

const PhoneIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6">
    <Path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16zm-5-1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
  </Svg>
);

export default function LoginChoice() {
  const router = useRouter();
  
  // Animated values for floating icons
  const gift1 = useRef(new Animated.Value(0)).current;
  const gift2 = useRef(new Animated.Value(0)).current;
  const love1 = useRef(new Animated.Value(0)).current;
  const love2 = useRef(new Animated.Value(0)).current;
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createFloatingAnimation = (animValue: Animated.Value, duration: number, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Start all animations
    Animated.parallel([
      createFloatingAnimation(gift1, 3000, 0),
      createFloatingAnimation(gift2, 3500, 500),
      createFloatingAnimation(love1, 2800, 200),
      createFloatingAnimation(love2, 3200, 800),
      createFloatingAnimation(wave1, 4000, 300),
      createFloatingAnimation(wave2, 3800, 1000),
    ]).start();
  }, []);

  const animatedStyle = (animValue: Animated.Value, startY: number, endY: number) => ({
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [startY, endY],
        }),
      },
    ],
    opacity: animValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 1, 0.3],
    }),
  });

  return (
    <LinearGradient
      colors={['#A8FF78', '#78FFD6', '#B794F4', '#9F7AEA']}
      locations={[0, 0.3, 0.7, 1]}
      style={styles.container}
    >
      {/* Animated Background Icons - Top */}
      <Animated.Image
        source={require('../../assets/gift.png')}
        style={[styles.floatingIcon, styles.giftTop, animatedStyle(gift1, -20, -40)]}
      />
      <Animated.Image
        source={require('../../assets/love.png')}
        style={[styles.floatingIcon, styles.loveTop, animatedStyle(love1, -15, -35)]}
      />
      <Animated.Image
        source={require('../../assets/wave.png')}
        style={[styles.floatingIcon, styles.waveTop, animatedStyle(wave1, -25, -45)]}
      />

      {/* Logo and Mascot */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/icons/ic_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Di sini, setiap suara didengar!</Text>
      </View>

      {/* Login Options */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <FacebookIcon />
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <GoogleIcon />
          <Text style={styles.buttonText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth/phone-login')}
        >
          <PhoneIcon />
          <Text style={styles.buttonText}>Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/phone-register')}>
          <Text style={styles.registerText}>Daftar Akun Baru</Text>
        </TouchableOpacity>
      </View>

      {/* Animated Background Icons - Bottom */}
      <Animated.Image
        source={require('../../assets/gift.png')}
        style={[styles.floatingIcon, styles.giftBottom, animatedStyle(gift2, 20, 40)]}
      />
      <Animated.Image
        source={require('../../assets/love.png')}
        style={[styles.floatingIcon, styles.loveBottom, animatedStyle(love2, 15, 35)]}
      />
      <Animated.Image
        source={require('../../assets/wave.png')}
        style={[styles.floatingIcon, styles.waveBottom, animatedStyle(wave2, 25, 45)]}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Dengan mendaftar, Anda menyetujui{' '}
          <Text style={styles.link}>Tim Layanan</Text> &{' '}
          <Text style={styles.link}>Kebijakan pribadi</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  floatingIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    opacity: 0.6,
  },
  giftTop: {
    top: 100,
    left: 30,
  },
  loveTop: {
    top: 150,
    right: 40,
  },
  waveTop: {
    top: 80,
    right: 80,
  },
  giftBottom: {
    bottom: 200,
    right: 30,
  },
  loveBottom: {
    bottom: 250,
    left: 40,
  },
  waveBottom: {
    bottom: 180,
    left: 70,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonsContainer: {
    paddingHorizontal: 30,
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 12,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  registerText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 40,
    width: '100%',
  },
  footerText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
