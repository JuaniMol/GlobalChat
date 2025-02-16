import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../styles/theme';

interface MessageInputProps {
  message: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ message, onChangeText, onSend }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Escribe un mensaje..."
      value={message}
      onChangeText={onChangeText}
    />
    {message.trim() !== '' && (
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <Icon name="send" size={18} color="white" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.lightBlue,
    fontSize: 16,
  },
  sendButton: {
    padding: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    ...COLORS.shadow.medium,
  },
});
