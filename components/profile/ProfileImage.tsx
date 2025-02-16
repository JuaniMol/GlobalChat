import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../styles/theme';

interface ProfileImageProps {
  imageUri: string | null;
  onPickImage: () => void;
}

export const ProfileImage = ({ imageUri, onPickImage }: ProfileImageProps) => (
  <View style={styles.imageContainer}>
    <Image 
      source={imageUri ? { uri: imageUri } : require('../../assets/images/default-image.png')} 
      style={styles.profileImage} 
    />
    <Pressable style={styles.cameraButton} onPress={onPickImage}>
      <Icon name="image" style={styles.cameraIcon} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
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
});
