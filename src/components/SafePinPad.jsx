import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MVP_THEME } from '../theme/auraThemes';

export default function SafePinPad({ onPressNumber, onBackspace }) {
  // Define our grid matrix
  const rowMatrix = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', '⌫']
  ];

  return (
    <View style={styles.gridContainer}>
      {rowMatrix.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.rowLayout}>
          {row.map((cellValue, cellIndex) => {
            // Render an empty spacing slot for structural grid alignment
            if (cellValue === '') {
              return <View key={cellIndex} style={styles.keyPlaceholder} />;
            }

            const isBackspace = cellValue === '⌫';

            return (
              <TouchableOpacity
                key={cellIndex}
                style={[
                  styles.keyButton,
                  isBackspace && styles.backspaceButton
                ]}
                onPress={() => isBackspace ? onBackspace() : onPressNumber(cellValue)}
                activeOpacity={0.65}
              >
                <Text style={[styles.keyText, isBackspace && styles.backspaceText]}>
                  {cellValue}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
    maxWidth: 290,
    alignSelf: 'center',
    marginTop: 10,
  },
  rowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  keyButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: MVP_THEME.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: MVP_THEME.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  backspaceButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  keyPlaceholder: {
    width: 72,
    height: 72,
  },
  keyText: {
    fontSize: 25,
    fontWeight: '600',
    color: MVP_THEME.textPrimary,
  },
  backspaceText: {
    fontSize: 20,
    color: MVP_THEME.textSecondary,
  },
});