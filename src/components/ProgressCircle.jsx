import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MVP_THEME } from '../theme/auraThemes';

export default function ProgressCircle({ currentStreak = 0, targetDays = 30, accentColor }) {
  // Protect calculations against division by zero errors
  const safeTarget = targetDays > 0 ? targetDays : 30;
  const completionPercentage = Math.min(Math.round((currentStreak / safeTarget) * 100), 100);
  
  // Dynamic motivational badges depending on milestone levels
  let milestoneBadge = 'Fresh Slate Active';
  if (currentStreak >= 90) milestoneBadge = '👑 Transcendent Reset';
  else if (currentStreak >= 60) milestoneBadge = '🌟 Deep Metamorphosis';
  else if (currentStreak >= 30) milestoneBadge = '✨ Slate Restored';

  return (
    <View style={styles.container}>
      {/* Outer Halo Rim (Uses accentColor to generate a soft glowing effect) */}
      <View style={[styles.haloRing, { borderColor: accentColor, shadowColor: accentColor }]}>
        
        {/* Core Center Dashboard Orb */}
        <View style={styles.centerOrb}>
          <View style={styles.metricsGroup}>
            <Text style={styles.metaLabel}>CURRENT STREAK</Text>
            <Text style={[styles.streakCountText, { color: accentColor }]}>
              {currentStreak}
            </Text>
            <Text style={styles.unitLabel}>
              {currentStreak === 1 ? 'Day' : 'Days'}
            </Text>
          </View>
        </View>

      </View>

      {/* Secondary Data Readout & Horizontal Linear Progress Alignment */}
      <View style={styles.summaryContainer}>
        <Text style={styles.badgeText}>{milestoneBadge}</Text>
        
        <Text style={styles.progressDataString}>
          {currentStreak} of {safeTarget} days cleared ({completionPercentage}%)
        </Text>
        
        {/* Horizontal precise track fallback */}
        <View style={styles.trackBackground}>
          <View 
            style={[
              styles.trackFillActive, 
              { width: `${completionPercentage}%`, backgroundColor: accentColor }
            ]} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  haloRing: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // Dynamic premium glow settings for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    // Android hardware elevation translation
    elevation: 4,
    backgroundColor: 'transparent',
  },
  centerOrb: {
    width: 154,
    height: 154,
    borderRadius: 77,
    backgroundColor: MVP_THEME.surface,
    borderWidth: 4,
    borderColor: MVP_THEME.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricsGroup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: MVP_THEME.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  streakCountText: {
    fontSize: 46,
    fontWeight: '900',
    lineHeight: 48,
    letterSpacing: -1,
  },
  unitLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: MVP_THEME.textPrimary,
    marginTop: 2,
  },
  summaryContainer: {
    alignItems: 'center',
    marginTop: 18,
    width: '100%',
  },
  badgeText: {
    fontSize: 15,
    fontWeight: '700',
    color: MVP_THEME.textPrimary,
    letterSpacing: 0.2,
  },
  progressDataString: {
    fontSize: 13,
    color: MVP_THEME.textSecondary,
    marginTop: 4,
    marginBottom: 12,
  },
  trackBackground: {
    width: 160,
    height: 6,
    borderRadius: 3,
    backgroundColor: MVP_THEME.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: MVP_THEME.border,
  },
  trackFillActive: {
    height: '100%',
    borderRadius: 3,
  },
});