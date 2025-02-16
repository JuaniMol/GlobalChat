import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { Chat } from '../constants/Mocks';
import { ChatItem } from '../components/chats/chatItem';

const Chats = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabContainer}>
                <Text style={styles.tabText}>GlobalChat</Text>
                <Icon 
                    name="settings-outline" 
                    size={24} 
                    color="white" 
                    style={styles.editProfile} 
                    onPress={() => router.navigate('/editProfile')} 
                />
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
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    tabContainer: {
        padding: 16,
        backgroundColor: '#007AFF',
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    editProfile: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
});

export default Chats;