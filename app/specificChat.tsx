import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpecificChat as Chat } from '../constants/Mocks';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const SpecificChat = () => {
  const contact = Array.isArray(useLocalSearchParams().contact) ? useLocalSearchParams().contact[0] : useLocalSearchParams().contact;
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  let chat = Chat.specificChats.find(chat => chat.contact == contact);
  if (!chat) {
    chat = { contact: contact as string, messages: [] };
    Chat.specificChats.push(chat);
  }

  const renderItem = useCallback(({ item }: { item: { sender: string; content: string; time: string; } }) => (
    // Doy estilos a los mensajes segun quien es el emisor
    <View style={[styles.messageContainer, item.sender === 'You' ? styles.myMessage : styles.otherMessage]}>
      <Text style={[styles.messageText, { color: item.sender === 'You' ? '#FFFFFF' : '#000000' }]}>
        {item.content}
      </Text>
      <Text style={[styles.messageTime, { color: item.sender === 'You' ? '#E1F5FE' : '#9E9E9E' }]}>
        {item.time}
      </Text>
    </View>
  ), []);

  const handleSend = useCallback(() => {
    if (message.trim() === '') return;

    const newMessage = {
      sender: 'You',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    };

    chat?.messages.push(newMessage);
    setMessage('');

    // Scroll to the bottom when a new message is sent
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [message, chat]);

  useEffect(() => {
    // Scroll to the bottom when the component mounts
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -30: 0}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.tabContainer}>
          <Image source={require('../assets/images/default-image.png')} style={styles.avatar} />
          <Text style={styles.tabText}>{contact}</Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={chat?.messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.sender}-${item.time}-${index}`}
          style={styles.chatContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje..."
            value={message}
            onChangeText={setMessage}
          />
          {message.trim() !== '' && (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="send" size={18} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EEF9', // Color de fondo más suave
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF', // Azul de iOS
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#F5F5F5',
    fontSize: 16,
  },
  sendButton: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabContainer: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderBottomWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default SpecificChat;