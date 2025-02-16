import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import { Chat } from '../constants/Mocks';
import { ChatItem } from '../components/chats/chatItem';
import { COLORS, SPACING } from '../styles/theme';

/**
 * Pantalla principal de chats
 * Muestra la lista de conversaciones del usuario
 * Permite navegar a la edición de perfil
 */

const Chats = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header con título y botón de configuración */}
            <View style={styles.tabContainer}>
                <Text style={styles.tabText}>GlobalChat</Text>
                {/* Botón para navegar a la edición de perfil */}
                <Icon 
                    name="settings-outline" 
                    size={24} 
                    color="white" 
                    style={styles.editProfile} 
                    onPress={() => router.navigate('/editProfile')} 
                />
            </View>
            {/* Lista scrolleable de chats */}
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
        backgroundColor: COLORS.background,
    },
    tabContainer: {
        padding: SPACING.md,
        backgroundColor: COLORS.primary,
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...COLORS.shadow.medium,
    },
    tabText: {
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    editProfile: {
        padding: SPACING.sm,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
});

export default Chats;