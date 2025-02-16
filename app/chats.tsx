import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Chat } from '../constants/Mocks';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
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
                    source={chat.avatar ? { uri: chat.avatar } : require('../assets/images/default-image.png')} 
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

const Chats = () => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabContainer}>
                <Text style={styles.tabText}>GlobalChat</Text>
                <Icon name="settings-outline" size={24} color="white" style={styles.editProfile} 
                onPress={() =>
                     router.navigate('/editProfile')} />
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
    backgroundColor: '#F5F7FA',  // Fondo más suave
  },
  tabContainer: {
    padding: 16,
    backgroundColor: '#007AFF',  // Azul iOS más moderno
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

export default Chats;