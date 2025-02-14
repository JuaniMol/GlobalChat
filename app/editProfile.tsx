import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);

    
    useEffect(() => {
        const getProfileDataFromStorage = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                if (storedUsername !== null) {
                    setName(storedUsername);
                }
                const storedProfileImage = await AsyncStorage.getItem('profileImage');
                if (storedProfileImage !== null) {
                    setProfileImage(storedProfileImage);
                }
            } catch (error) {
                console.error('Failed to load profile data from storage', error);
            }
        };

        getProfileDataFromStorage();
    }, []);

    const  handleSave = async () => {
        try {
            // Guardo la nueva informacion
            await AsyncStorage.setItem('username', name);
            if (profileImage) {
            await AsyncStorage.setItem('profileImage', profileImage);
            }
        } catch (error) {
            console.error('Failed to save data to storage', error);
        }

        // Volvemos a los chats
        router.replace( '/chats');
    };

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                setProfileImage(result.assets[0].uri);
            }
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tabContainer}>
                <Text style={styles.header}>Editar Perfil</Text>
            </View>
            <View style={{ padding: 20 }}>
            <ThemedText style= {styles.labelText}>Foto de Perfil: </ThemedText>
                <View style={{ position: 'relative' }}>
                    
                <Image source={profileImage ? { uri: profileImage } : require('../assets/images/default-image.png')} style={styles.profileImage} />
                <Pressable style={styles.cameraButton} onPress={() => {handlePickImage()}}>
                    <Icon name="camera" style={styles.cameraIcon} />
                </Pressable>
                </View>
                <ThemedText style= {styles.labelText}>Nombre de Usuario: </ThemedText>
                <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                />
                <Pressable style={styles.saveButton} onPress={handleSave}>
                <ThemedText style={styles.cameraIcon}>Guardar</ThemedText>
                </Pressable>
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    profileImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 30,
        right: 10,
        zIndex: 1,
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#007bff',
        borderRadius: 20,
    },
    cameraIcon: {
        fontSize: 24,
        color: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    tabContainer: {
      padding: 10,
      backgroundColor: 'rgb(35, 107, 214)',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      flexDirection: 'row',
      alignItems: 'center'
    }
});

export default EditProfile;