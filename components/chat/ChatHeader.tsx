import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../styles/theme';

interface ChatHeaderProps {
  contact: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ contact }) => (
  <View style={styles.container}>
    <Image source={require('../../assets/images/default-image.png')} style={styles.avatar} />
    <Text style={styles.text}>{contact}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    ...COLORS.shadow.medium,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
