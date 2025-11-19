
import { StyleSheet, View, Text } from 'react-native';

export default function WebOnly() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>KyLive API Server</Text>
      <Text style={styles.subtitle}>Running on Replit</Text>
      <Text style={styles.description}>
        This is a mobile-first application. Please use the Android or iOS app to access KyLive.
      </Text>
      <View style={styles.statusContainer}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Server Status: Online</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#888',
    marginBottom: 40,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    maxWidth: 500,
    marginBottom: 40,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ff00',
  },
  statusText: {
    fontSize: 16,
    color: '#00ff00',
  },
});
