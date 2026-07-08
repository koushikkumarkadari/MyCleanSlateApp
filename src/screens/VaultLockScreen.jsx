import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import SafePinPad from '../components/SafePinPad';
import { MVP_THEME } from '../theme/auraThemes';

export default function VaultLockScreen({ navigation }) {
  const [pin, setPin] = useState('');
  const CORRECT_PIN = '1234'; // In production, match against encrypted device storage

  const handlePress = (num) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);

      // Check pin automatically once 4 digits are punched in
      if (nextPin.length === 4) {
        if (nextPin === CORRECT_PIN) {
          // Success: Reset pin local state and push past the gate
          setPin('');
          navigation.replace('VaultScreen');
        } else {
          // Failure: Alert user and wipe active entry input field
          Alert.alert('Access Denied', 'Incorrect security code. Please try again.', [
            { text: 'OK', onPress: () => setPin('') }
          ]);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  // Helper arrays to map out code indicator pass dots
  const dots = [1, 2, 3, 4];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Escape Route */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeText}>✕ Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.vaultIcon}>🔒</Text>
        <Text style={styles.title}>Enter Vault PIN</Text>
        <Text style={styles.subtitle}>Unlock your secure space for reflection.</Text>

        {/* Dynamic PIN Entry Indicator Dots */}
        <View style={styles.dotsContainer}>
          {dots.map((dot, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                pin.length > index && styles.dotFilled
              ]}
            />
          ))}
        </View>

        {/* Custom Grid Layout Pad Numbers */}
        <SafePinPad 
          onPressNumber={handlePress} 
          onBackspace={handleBackspace} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MVP_THEME.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
  },
  closeText: {
    color: MVP_THEME.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    bottom: 20, // Visual adjustment upward for grid balance
  },
  vaultIcon: {
    fontSize: 36,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: MVP_THEME.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: MVP_THEME.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 35,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: MVP_THEME.border,
    marginHorizontal: 12,
    backgroundColor: 'transparent',
  },
  dotFilled: {
    backgroundColor: MVP_THEME.accentSpiritual,
    borderColor: MVP_THEME.accentSpiritual,
  },
  grid: {
    width: '100%',
    maxWidth: 280,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  keyButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: MVP_THEME.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: MVP_THEME.border,
  },
  keyButtonEmpty: {
    width: 70,
    height: 70,
  },
  keyText: {
    fontSize: 24,
    fontWeight: '600',
    color: MVP_THEME.textPrimary,
  },
  backspaceText: {
    fontSize: 20,
    color: MVP_THEME.textSecondary,
  },
});