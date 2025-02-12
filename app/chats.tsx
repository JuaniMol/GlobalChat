import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Chat } from '../constants/Mocks';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const ChatItem = ({ chat }) => (
    <View style={styles.chatItem}>
        {/* Dejo abierto a que eventualmente los contactos tengan una imagen, si no muestra una default*/}
        <Image source={chat.avatar ? { uri: chat.avatar } : require('../assets/images/default-image.png')} style={styles.avatar} />
        <View style={styles.chatInfo}>
            <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{chat.contact}</Text>
                <Text style={styles.chatMessageHour}>{chat.lastMessageTime}</Text>
            </View>
            <Text style={styles.chatMessageHour}>{chat.lastMessage}</Text>
        </View>
    </View>
);

const Chats = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabContainer}>
                <Text style={styles.tabText}>GlobalChat</Text>
                <Icon name="settings-outline" size={24} color="white" style={styles.editProfile} onPress={() => alert('Edit Profile')} />
            </View>
            <ScrollView>
                {Chat.chats.map(chat => (
                    <ChatItem key={chat.id} chat={chat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        padding: 10,
        backgroundColor: 'rgb(35, 107, 214)',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    editProfile: {
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chatItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chatName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    chatMessage: {
        color: '#666',
    },
    chatMessageHour: {
        color: 'black',
        fontSize: 12,
    },
});

export default Chats;