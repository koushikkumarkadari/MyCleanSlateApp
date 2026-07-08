import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HabitContext = createContext();

// Default baseline tasks for the 3 Core Pillars
const INITIAL_HABITS = [
  { id: 'p1', title: 'Hydration (8 Glasses)', pillar: 'Physical', done: false },
  { id: 'p2', title: 'Daily Walk or Stretch', pillar: 'Physical', done: false },
  { id: 'm1', title: 'Write a Journal Entry', pillar: 'Mental', done: false },
  { id: 'm2', title: 'Digital Detox Hour', pillar: 'Mental', done: false },
  { id: 's1', title: 'Breathing / Meditation', pillar: 'Spiritual', done: false },
  { id: 's2', title: 'List 3 Things of Gratitude', pillar: 'Spiritual', done: false },
];

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [streak, setStreak] = useState(0);

  // Load progress records when the app first launches
  useEffect(() => {
    loadLocalData();
  }, []);

  const loadLocalData = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem('@mvp_habits');
      const storedStreak = await AsyncStorage.getItem('@mvp_streak_count');
      const lastCompletionDate = await AsyncStorage.getItem('@mvp_last_completion_date');

      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      }
      if (storedStreak) {
        setStreak(parseInt(storedStreak, 10));
      }

      // Check if the user missed a day and their streak should reset
      if (lastCompletionDate) {
        const todayStr = new Date().toDateString();
        const lastDate = new Date(lastCompletionDate);
        const diffTime = Math.abs(new Date(todayStr) - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // If more than 1 day has passed since their last completion, break the streak
        if (diffDays > 1) {
          setStreak(0);
          await AsyncStorage.setItem('@mvp_streak_count', '0');
        }
      }
    } catch (e) {
      console.error('Error fetching local habit metrics:', e);
    }
  };

  // Toggle habit checkbox and automatically check if the day is fully cleared
  const toggleHabit = async (id) => {
    try {
      const updatedHabits = habits.map((habit) =>
        habit.id === id ? { ...habit, done: !habit.done } : habit
      );
      setHabits(updatedHabits);
      await AsyncStorage.setItem('@mvp_habits', JSON.stringify(updatedHabits));

      // Calculate if ALL habits are completed today
      const allDone = updatedHabits.every((h) => h.done);
      const todayStr = new Date().toDateString();
      const lastCompletionDate = await AsyncStorage.getItem('@mvp_last_completion_date');

      if (allDone && lastCompletionDate !== todayStr) {
        // Complete current day: Increase the streak and log the completion timestamp
        const newStreak = streak + 1;
        setStreak(newStreak);
        await AsyncStorage.setItem('@mvp_streak_count', newStreak.toString());
        await AsyncStorage.setItem('@mvp_last_completion_date', todayStr);
      } else if (!allDone && lastCompletionDate === todayStr) {
        // If they uncheck a task after completing the day, subtract the streak increment
        const revertedStreak = Math.max(0, streak - 1);
        setStreak(revertedStreak);
        await AsyncStorage.setItem('@mvp_streak_count', revertedStreak.toString());
        await AsyncStorage.removeItem('@mvp_last_completion_date');
      }
    } catch (e) {
      console.error('Error updating habit metrics state:', e);
    }
  };

  // Development helper function to reset everything back to baseline
  const resetDailySlate = async () => {
    try {
      const wipedHabits = habits.map((h) => ({ ...h, done: false }));
      setHabits(wipedHabits);
      await AsyncStorage.setItem('@mvp_habits', JSON.stringify(wipedHabits));
    } catch (e) {
      console.error('Error resetting day slate:', e);
    }
  };

  return (
    <HabitContext.Provider value={{ habits, streak, toggleHabit, resetDailySlate }}>
      {children}
    </HabitContext.Provider>
  );
};