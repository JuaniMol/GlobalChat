import { Image, StyleSheet, Platform, View, Text, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../styles/theme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const storeUsername = async (username: string) => {
      try {
        await AsyncStorage.setItem('username', username);
      } catch (e) {
        console.error('Failed to save the username to the storage', e);
      }
    };

    storeUsername(username);

    // Uso replace para que no se pueda volver al login desde los chats
    router.replace('/chats');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? -32 : -10}
    >
      <SafeAreaView>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Bienvenido a GlobalChat!</Text>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/global.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Pressable 
            style={[
              styles.buttonContainer, 
              (!username || !password) && { opacity: 0.5 }
            ]} 
            onPress={handleLogin} 
            disabled={!username || !password}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: SPACING.lg,
    textAlign: 'center',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  input: {
    height: 55,
    borderColor: COLORS.lightBlue,
    borderWidth: 1,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    fontSize: 16,
    ...COLORS.shadow.medium,
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.lg,
    marginTop: SPACING.sm,
    alignItems: 'center',
    ...COLORS.shadow.medium,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    marginBottom: SPACING.md,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
  },
});
