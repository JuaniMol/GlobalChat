import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Image, Pressable, Platform, KeyboardAvoidingView, ScrollView, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  tabContainer: {
    padding: 16,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
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
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 20,
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cameraIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
    marginLeft: 4,
  },
  input: {
    height: 50,
    borderColor: '#E1E8ED',
    borderWidth: 1,
    marginBottom: 24,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  }
});

export default EditProfile;