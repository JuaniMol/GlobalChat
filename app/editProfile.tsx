import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Image, Pressable, Platform, KeyboardAvoidingView, ScrollView, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SPACING } from '../styles/theme';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [nameBefore, setNameBefore] = useState('');
    const [initialProfileImage, setInitialProfileImage] = useState<string | null>(null);

    
    useEffect(() => {
        const getProfileDataFromStorage = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem('username');
                const storedProfileImage = await AsyncStorage.getItem('profileImage');
                
                if (storedUsername !== null) {
                    setName(storedUsername);
                    setNameBefore(storedUsername);
                }
                
                // Establecemos el estado inicial de la imagen
                setProfileImage(storedProfileImage);
                setInitialProfileImage(storedProfileImage);
                
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
            Alert.alert('Perfil actualizado correctamente');
            
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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -25 : 0}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.tabContainer}>
                    <Text style={styles.header}>Editar Perfil</Text>
                </View>
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.contentContainer}>
                        <Text style={styles.labelText}>Foto de Perfil: </Text>
                        <View style={styles.imageContainer}>
                            <Image 
                                source={profileImage ? { uri: profileImage } : require('../assets/images/default-image.png')} 
                                style={styles.profileImage} 
                            />
                            <Pressable style={styles.cameraButton} onPress={handlePickImage}>
                                <Icon name="image" style={styles.cameraIcon} />
                            </Pressable>
                        </View>
                        <Text style={styles.labelText}>Nombre de Usuario: </Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                        <Pressable 
                            style={[
                                styles.saveButton, 
                                { opacity: (name !== nameBefore || profileImage !== initialProfileImage) ? 1 : 0.5 }
                            ]} 
                            onPress={handleSave} 
                            disabled={name === nameBefore && profileImage === initialProfileImage}
                        >
                            <Text style={styles.saveButtonText}>Guardar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  tabContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...COLORS.shadow.medium,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...COLORS.shadow.medium,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...COLORS.shadow.medium,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  cameraIcon: {
    fontSize: 24,
    color: COLORS.white,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.text,
    marginLeft: SPACING.xs,
  },
  input: {
    height: 50,
    borderColor: COLORS.lightBlue,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    fontSize: 16,
    ...COLORS.shadow.medium,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: SPACING.lg,
    ...COLORS.shadow.medium,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    letterSpacing: 0.5,
  }
});

export default EditProfile;