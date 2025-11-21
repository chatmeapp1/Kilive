import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';

export default function WebOnly() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* HERO SECTION */}
      <View style={styles.hero}>

        {/* Decorative Soft Gradient */}
        <View style={styles.bgGradient} />

        {/* Top Menu */}
        <View style={styles.topMenu}>
          <Text style={styles.logo}>KyLive</Text>

          <View style={styles.menuRight}>
            <Text style={styles.menuItem}>Privacy Policy</Text>
            <Text style={styles.menuItem}>About Us</Text>
          </View>
        </View>

        {/* Hero Content */}
        <View style={styles.heroContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Live Streams</Text>
            <Text style={styles.heroSub}>Live chat, fun, and live party.</Text>

            <Text style={styles.heroDesc}>
              Nikmati pengalaman live streaming modern.  
              Unduh aplikasi KyLive untuk fitur lengkap.
            </Text>

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.androidBtn}
                onPress={() => Linking.openURL("https://play.google.com/")}
              >
                <Text style={styles.androidText}>Download Android</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iosBtn}
                onPress={() => Linking.openURL("https://apps.apple.com/")}
              >
                <Text style={styles.iosText}>Apple Store</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mockup HP */}
          <Image
            source={{ uri: "/mockup-phone-kylive.png" }} // nanti kamu ganti
            style={styles.phoneMock}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* SECTION 2 */}
      <View style={styles.section}>
        <Image
          source={{ uri: "/mockup-guest.png" }}
          style={styles.sectionImage}
        />

        <View style={styles.sectionTextBox}>
          <Text style={styles.sectionTitle}>Guest Live</Text>
          <Text style={styles.sectionSub}>Party with host & friends</Text>
          <Text style={styles.sectionDesc}>
            Bergabung dengan host, tonton tamu, dan nikmati interaksi langsung.
          </Text>
        </View>
      </View>

      {/* SECTION 3 */}
      <View style={styles.sectionReverse}>
        <View style={styles.sectionTextBox}>
          <Text style={styles.sectionTitle}>Cool Effects</Text>
          <Text style={styles.sectionSub}>Beautiful Live Broadcast</Text>
          <Text style={styles.sectionDesc}>
            Hadiah cantik, efek visual romantis, dan animasi live yang seru.
          </Text>
        </View>

        <Image
          source={{ uri: "/mockup-effects.png" }}
          style={styles.sectionImage}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    paddingVertical: 60,
    paddingHorizontal: 30,
    overflow: 'hidden',
  },

  // Background gradient lembut pastel
  bgGradient: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(135deg, #c6ffd8, #ffd8b0, #ffffff)',
    opacity: 0.85,
  },

  topMenu: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },

  logo: {
    fontSize: 30,
    fontWeight: '900',
    color: '#24b573',
  },

  menuRight: {
    flexDirection: 'row',
    gap: 20,
  },

  menuItem: {
    fontSize: 16,
    color: '#333',
    opacity: 0.7,
  },

  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  heroTitle: {
    fontSize: 44,
    fontWeight: '900',
    color: '#24b573',
    marginBottom: 6,
  },

  heroSub: {
    fontSize: 20,
    color: '#ff8a3d',
    fontWeight: '700',
    marginBottom: 15,
  },

  heroDesc: {
    maxWidth: 480,
    fontSize: 16,
    color: '#333',
    opacity: 0.75,
    lineHeight: 22,
    marginBottom: 35,
  },

  btnRow: {
    flexDirection: 'row',
    gap: 14,
  },

  androidBtn: {
    backgroundColor: '#24b573',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 12,
  },

  androidText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  iosBtn: {
    backgroundColor: '#ff8a3d',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 12,
  },

  iosText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  phoneMock: {
    width: 270,
    height: 450,
    marginLeft: 20,
  },

  section: {
    flexDirection: 'row',
    padding: 40,
    alignItems: 'center',
    gap: 30,
  },

  sectionReverse: {
    flexDirection: 'row-reverse',
    padding: 40,
    alignItems: 'center',
    gap: 30,
  },

  sectionImage: {
    width: 260,
    height: 460,
  },

  sectionTextBox: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#24b573',
    marginBottom: 6,
  },

  sectionSub: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff8a3d',
    marginBottom: 10,
  },

  sectionDesc: {
    fontSize: 16,
    color: '#555',
    maxWidth: 420,
    lineHeight: 22,
  },
});