import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../styles/theme';

interface Message {
  sender: string;
  content: string;
  time: string;
}

interface MessageListProps {
  messages: Message[];
  flatListRef: React.RefObject<FlatList<Message>>;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, flatListRef }) => {
  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.sender === 'You' ? styles.myMessage : styles.otherMessage]}>
      <Text style={[styles.messageText, { color: item.sender === 'You' ? '#FFFFFF' : '#000000' }]}>
        {item.content}
      </Text>
      <Text style={[styles.messageTime, { color: item.sender === 'You' ? '#E1F5FE' : '#9E9E9E' }]}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.sender}-${item.time}-${index}`}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  messageContainer: {
    marginVertical: SPACING.xs,
    maxWidth: '80%',
    padding: SPACING.sm,
    borderRadius: 20,
    ...COLORS.shadow.medium,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    marginTop: SPACING.xs,
    textAlign: 'right',
  },
});
