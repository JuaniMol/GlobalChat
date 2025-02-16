import React, { useRef, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../styles/theme';
import { ChatHeader } from '../components/chat/ChatHeader';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/MessageInput';
import { useChat } from '../hooks/useChat';

const SpecificChat = () => {
  const contact = Array.isArray(useLocalSearchParams().contact) 
    ? useLocalSearchParams().contact[0] 
    : useLocalSearchParams().contact;
  const flatListRef = useRef<FlatList>(null);
  
  const { message, setMessage, handleSend, chat } = useChat(contact as string, flatListRef);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -30 : 0}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <ChatHeader contact={contact as string} />
        <MessageList messages={chat?.messages || []} flatListRef={flatListRef} />
        <MessageInput 
          message={message}
          onChangeText={setMessage}
          onSend={handleSend}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SpecificChat;