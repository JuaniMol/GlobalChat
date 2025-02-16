import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { SpecificChat as Chat } from '../constants/Mocks';

export const useChat = (contact: string, flatListRef: React.RefObject<FlatList>) => {
  const [message, setMessage] = useState('');

  let chat = Chat.specificChats.find(chat => chat.contact === contact);
  if (!chat) {
    chat = { contact, messages: [] };
    Chat.specificChats.push(chat);
  }

  const handleSend = useCallback(() => {
    if (message.trim() === '') return;

    const newMessage = {
      sender: 'You',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    };

    chat?.messages.push(newMessage);
    setMessage('');
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [message, chat, flatListRef]);

  return {
    message,
    setMessage,
    handleSend,
    chat
  };
};
