import React from 'react';
import { View, TextInput, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../styles/theme';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileImage } from '../components/profile/ProfileImage';
import { useProfile } from '../hooks/useProfile';

/**
 * Pantalla de edición de perfil
 * Permite al usuario modificar su información personal
 * Incluye cambio de foto de perfil y nombre de usuario
 */

const EditProfile = () => {
  // Hook personalizado para manejar la lógica del perfil
  const { 
    name, 
    setName, 
    profileImage, 
    handleSave, 
    handlePickImage, 
    isModified 
  } = useProfile();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -25 : 0}
    >
      <SafeAreaView style={styles.container}>
        {/* Cabecera de la pantalla de perfil */}
        <ProfileHeader />
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            {/* Sección de foto de perfil */}
            <Text style={styles.labelText}>Foto de Perfil: </Text>
            <ProfileImage imageUri={profileImage} onPickImage={handlePickImage} />
            
            {/* Sección de nombre de usuario */}
            <Text style={styles.labelText}>Nombre de Usuario: </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            
            {/* Botón de guardar (deshabilitado si no hay cambios) */}
            <Pressable 
              style={[styles.saveButton, { opacity: isModified ? 1 : 0.5 }]} 
              onPress={handleSave} 
              disabled={!isModified}
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
  scrollContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
    flex: 1,
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