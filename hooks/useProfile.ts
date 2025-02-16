import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export const useProfile = () => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [nameBefore, setNameBefore] = useState('');
  const [initialProfileImage, setInitialProfileImage] = useState<string | null>(null);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const [storedUsername, storedProfileImage] = await Promise.all([
        AsyncStorage.getItem('username'),
        AsyncStorage.getItem('profileImage'),
      ]);
      
      if (storedUsername) {
        setName(storedUsername);
        setNameBefore(storedUsername);
      }
      
      setProfileImage(storedProfileImage);
      setInitialProfileImage(storedProfileImage);
    } catch (error) {
      console.error('Failed to load profile data from storage', error);
    }
  };

  const handleSave = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('username', name),
        profileImage ? AsyncStorage.setItem('profileImage', profileImage) : null,
      ]);
      
      Alert.alert('Perfil actualizado correctamente');
      router.replace('/chats');
    } catch (error) {
      console.error('Failed to save data to storage', error);
    }
  };

  const handlePickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert("Se requiere permiso para acceder a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const isModified = name !== nameBefore || profileImage !== initialProfileImage;

  return {
    name,
    setName,
    profileImage,
    handleSave,
    handlePickImage,
    isModified,
  };
};
