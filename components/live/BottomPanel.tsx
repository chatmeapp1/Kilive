import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function BottomPanel() {
  return (
    <View style={styles.container}>
      {/* WARNING / RULES */}
      <ThemedText style={styles.warning}>
        Selamat datang di room live! Patuhi aturan platform. Konten kekerasan, vulgar, atau ilegal akan menyebabkan akun diblokir.
      </ThemedText>

      {/* CHAT + ACTION BAR */}
      <View style={styles.row}>
        {/* INPUT */}
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Ketik pesan..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            style={styles.input}
          />
        </View>

        {/* MESSAGE */}
        <TouchableOpacity style={styles.actionBtn}>
          <IconSymbol name="envelope.fill" size={22} color="#fff" />
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>1</ThemedText>
          </View>
        </TouchableOpacity>

        {/* LINK / CHAIN */}
        <TouchableOpacity style={[styles.actionBtn, styles.linkBtn]}>
          <IconSymbol name="link" size={24} color="#fff" />
        </TouchableOpacity>

        {/* GAME */}
        <TouchableOpacity style={[styles.actionBtn, styles.gameBtn]}>
          <IconSymbol name="gamecontroller.fill" size={24} color="#60A5FA" />
        </TouchableOpacity>

        {/* GIFT */}
        <TouchableOpacity style={[styles.actionBtn, styles.giftBtn]}>
          <IconSymbol name="gift.fill" size={26} color="#F472B6" />
        </TouchableOpacity>

        {/* MORE MENU */}
        <TouchableOpacity style={styles.actionBtn}>
          <IconSymbol name="ellipsis" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  warning: {
    color: '#ddd',
    fontSize: 10,
    paddingHorizontal: 16,
    marginBottom: 6,
    lineHeight: 13,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },

  inputBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    height: 38,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  input: {
    color: '#fff',
    fontSize: 13,
  },

  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  linkBtn: {
    backgroundColor: 'rgba(147, 51, 234, 0.8)',
  },

  gameBtn: {
    backgroundColor: 'rgba(59,131,246,0.3)',
  },

  giftBtn: {
    backgroundColor: 'rgba(244,114,182,0.25)',
  },

  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#EF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});