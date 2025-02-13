import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpecificChat as Chat } from '../constants/Mocks';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';



const SpecificChat = () => {

    const contact = Array.isArray(useLocalSearchParams().contact) ? useLocalSearchParams().contact[0] : useLocalSearchParams().contact;
    const [message, setMessage] = useState('');
    let chat = Chat.specificChats.find(chat => chat.contact == contact);
    if (!chat) {
        chat = { contact: contact as string, messages: [] };
        Chat.specificChats.push(chat);
    }

    const renderItem = ({ item }: { item: { sender: string; content: string; time: string; } }) => (
        <View style={[styles.messageContainer, item.sender === 'You' ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    const handleSend = () => {

        const newMessage = {
            sender: 'You',
            content: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        };

        chat?.messages.push(newMessage);
        setMessage('');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-30}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.tabContainer}>
                    <Image source={require('../assets/images/default-image.png')} style={styles.avatar} />
                    <Text style={styles.tabText}>{contact}</Text>
                </View>
                <FlatList
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
        backgroundColor: '#f5f5f5',
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#dcf8c6',
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    sendButton: {
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    tabContainer: {
        padding: 10,
        backgroundColor: 'rgb(35, 107, 214)',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
});

export default SpecificChat;