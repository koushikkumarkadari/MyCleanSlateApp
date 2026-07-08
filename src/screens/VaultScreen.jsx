import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  Animated
} from 'react-native';
import { MVP_THEME } from '../theme/auraThemes';

export default function VaultScreen({ navigation }) {
  const [regretText, setRegretText] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  
  // Animated value to control text fade/scale during the reset phase
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleResetRelease = () => {
    if (!regretText.trim()) {
      Alert.alert('Empty Vault', 'Please type down what you wish to leave behind before resetting.');
      return;
    }

    setIsBurning(true);

    // Trigger a smooth fading dissolution animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500, // 1.5 seconds for dramatic weight
        useNativeDriver: true,
      })
    ]).start(() => {
      // Animation complete logic: permanent state wipeout
      setRegretText('');
      setIsBurning(false);
      
      // Reset animation node scale value back to baseline for future uses
      fadeAnim.setValue(1);

      Alert.alert(
        'Slate Cleared',
        'Your regret has been deleted from memory. Today is a brand new start.',
        [{ text: 'Return to Dashboard', onPress: () => navigation.replace('DashboardScreen') }]
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        {/* Upper Exit Route */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.replace('DashboardScreen')} 
            disabled={isBurning}
            style={styles.exitButton}
          >
            <Text style={styles.exitText}>✕ Exit Vault</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.heading}>The Reset Space</Text>
          <Text style={styles.subheading}>
            Write down a past regret, bad habit, or old memory. Confess it completely, then release it forever.
          </Text>

          {/* Animated Input Card Wrapper */}
          <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
            <TextInput
              style={styles.input}
              placeholder="Type your history here..."
              placeholderTextColor={MVP_THEME.textSecondary}
              multiline
              textAlignVertical="top"
              value={regretText}
              onChangeText={setRegretText}
              editable={!isBurning}
            />
          </Animated.View>

          {/* Action Trigger Button */}
          <TouchableOpacity
            style={[
              styles.burnButton, 
              (!regretText.trim() || isBurning) && styles.burnButtonDisabled
            ]}
            onPress={handleResetRelease}
            disabled={!regretText.trim() || isBurning}
            activeOpacity={0.8}
          >
            <Text style={styles.burnButtonText}>
              {isBurning ? 'Dissolving History...' : 'Release to the Past ✨'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MVP_THEME.background,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  exitButton: {
    alignSelf: 'flex-start',
  },
  exitText: {
    color: MVP_THEME.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    bottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: MVP_THEME.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: MVP_THEME.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: '100%',
    height: 220,
    backgroundColor: MVP_THEME.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: MVP_THEME.border,
    padding: 16,
    marginBottom: 25,
  },
  input: {
    flex: 1,
    color: MVP_THEME.textPrimary,
    fontSize: 16,
    lineHeight: 22,
  },
  burnButton: {
    backgroundColor: MVP_THEME.accentSpiritual,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: MVP_THEME.accentSpiritual,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  burnButtonDisabled: {
    backgroundColor: MVP_THEME.surfaceLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  burnButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});