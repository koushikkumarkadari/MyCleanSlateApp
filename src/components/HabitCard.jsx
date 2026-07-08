import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MVP_THEME } from '../theme/auraThemes';

export default function HabitCard({ habit, onToggle, accentColor }) {
  const { title, done } = habit;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        done && styles.cardDone
      ]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        {/* Custom Circular Checkbox */}
        <View 
          style={[
            styles.checkbox,
            { borderColor: done ? accentColor : MVP_THEME.border },
            done && { backgroundColor: accentColor }
          ]}
        >
          {done && <Text style={styles.checkIcon}>✓</Text>}
        </View>

        {/* Habit Label Text */}
        <Text 
          style={[
            styles.habitTitle,
            done && styles.habitTitleDone
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: MVP_THEME.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: MVP_THEME.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDone: {
    backgroundColor: MVP_THEME.surface,
    opacity: 0.6,
    borderColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    backgroundColor: 'transparent',
  },
  checkIcon: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  habitTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: MVP_THEME.textPrimary,
    flex: 1,
  },
  habitTitleDone: {
    color: MVP_THEME.textSecondary,
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
});