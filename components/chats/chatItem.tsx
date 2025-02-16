import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface ChatItemProps {
    chat: {
        id: number;
        contact: string;
        avatar?: string;
        lastMessage: string;
        lastMessageTime: string;
    };
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
    return (
        <TouchableOpacity 
            onPress={() => router.navigate({
                pathname: '/specificChat',
                params: { contact: chat.contact },
            })}
            activeOpacity={0.7}
        >
            <View style={styles.chatItem}>
                <Image 
                    source={chat.avatar ? { uri: chat.avatar } : require('../../assets/images/default-image.png')} 
                    style={styles.avatar} 
                />
                <View style={styles.chatInfo}>
                    <View style={styles.chatHeader}>
                        <Text style={styles.chatName} numberOfLines={1}>
                            {chat.contact}
                        </Text>
                        <Text style={styles.chatMessageHour}>
                            {chat.lastMessageTime}
                        </Text>
                    </View>
                    <Text style={styles.chatMessage} numberOfLines={2}>
                        {chat.lastMessage}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    chatItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 2,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#E1E8ED',
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontWeight: '600',
        fontSize: 17,
        color: '#1A1A1A',
    },
    chatMessage: {
        color: '#666666',
        fontSize: 14,
        marginTop: 2,
    },
    chatMessageHour: {
        color: '#8E8E93',
        fontSize: 12,
        fontWeight: '500',
    },
});