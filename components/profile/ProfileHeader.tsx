import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../styles/theme';

export const ProfileHeader = () => (
  <View style={styles.tabContainer}>
    <Text style={styles.header}>Editar Perfil</Text>
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...COLORS.shadow.medium,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});
