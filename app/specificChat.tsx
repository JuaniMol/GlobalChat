import React, { useRef, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { COLORS } from '../styles/theme';
import { ChatHeader } from '../components/chat/ChatHeader';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/MessageInput';
import { useChat } from '../hooks/useChat';

/**
 * Pantalla de chat específico
 * Muestra la conversación con un contacto particular
 * Maneja el envío y recepción de mensajes
 */

const SpecificChat = () => {
  // Obtiene el parámetro de contacto de la URL
  const contact = Array.isArray(useLocalSearchParams().contact) 
    ? useLocalSearchParams().contact[0] 
    : useLocalSearchParams().contact;
  
  // Referencia para controlar el scroll de la lista de mensajes
  const flatListRef = useRef<FlatList>(null);
  
  // Hook personalizado para manejar la lógica del chat
  const { message, setMessage, handleSend, chat } = useChat(contact as string, flatListRef);

  // Scroll automático al fondo cuando se monta el componente
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
        {/* Cabecera del chat con información del contacto */}
        <ChatHeader contact={contact as string} />
        {/* Lista de mensajes */}
        <MessageList messages={chat?.messages || []} flatListRef={flatListRef} />
        {/* Input para escribir y enviar mensajes */}
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