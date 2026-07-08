import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { HabitContext } from '../context/HabitContext';
import { MVP_THEME } from '../theme/auraThemes';
import HabitCard from '../components/HabitCard';
import ProgressCircle from '../components/ProgressCircle';

export default function DashboardScreen({ navigation }) {
  const { habits, streak, toggleHabit } = useContext(HabitContext);
  const [activePillar, setActivePillar] = useState('Physical');

  // Filter items matching the highlighted pillar category
  const filteredHabits = habits.filter(h => h.pillar === activePillar);

  // Dynamic colors depending on which pillar is selected
  const getPillarColor = () => {
    if (activePillar === 'Physical') return MVP_THEME.accentPhysical;
    if (activePillar === 'Mental') return MVP_THEME.accentMental;
    return MVP_THEME.accentSpiritual;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Top Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Clean Slate</Text>
            <Text style={styles.subtitle}>Your history doesn't define today.</Text>
          </View>
          
          {/* Secure Vault Action Button */}
          <TouchableOpacity 
            style={styles.vaultButton}
            onPress={() => navigation.navigate('VaultLockScreen')}
            activeOpacity={0.7}
          >
            <Text style={styles.vaultIcon}>🔒</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Streak Progress Ring */}
        <View style={styles.progressSection}>
          <ProgressCircle currentStreak={streak} targetDays={30} accentColor={getPillarColor()} />
        </View>

        {/* Three Pillar Navigation Tabs */}
        <View style={styles.tabContainer}>
          {['Physical', 'Mental', 'Spiritual'].map((pillar) => {
            const isActive = activePillar === pillar;
            let tabAccent = MVP_THEME.accentPhysical;
            if (pillar === 'Mental') tabAccent = MVP_THEME.accentMental;
            if (pillar === 'Spiritual') tabAccent = MVP_THEME.accentSpiritual;

            return (
              <TouchableOpacity
                key={pillar}
                style={[
                  styles.tab, 
                  isActive && { backgroundColor: MVP_THEME.surfaceLight, borderColor: tabAccent }
                ]}
                onPress={() => setActivePillar(pillar)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabText, isActive && { color: '#FFF', fontWeight: '700' }]}>
                  {pillar}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Habits Checklist Feed */}
        <FlatList
          data={filteredHabits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HabitCard 
              habit={item} 
              onToggle={() => toggleHabit(item.id)} 
              accentColor={getPillarColor()}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No habits found for this pillar.</Text>
          }
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: MVP_THEME.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: MVP_THEME.textSecondary,
    marginTop: 2,
  },
  vaultButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: MVP_THEME.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: MVP_THEME.border,
  },
  vaultIcon: {
    fontSize: 18,
  },
  progressSection: {
    alignItems: 'center',
    marginVertical: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: MVP_THEME.surface,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabText: {
    color: MVP_THEME.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: MVP_THEME.textSecondary,
    marginTop: 40,
  },
});