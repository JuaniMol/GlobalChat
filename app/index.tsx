import { Image, StyleSheet, Platform, View, Text, KeyboardAvoidingView, Pressable } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    >
      <Text style={styles.title}>Bienvenido a GlobalChat!</Text>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Image source={require('../assets/images/global.png')} style={{ width: '100%', height: undefined, aspectRatio: 1.5 }} resizeMode="contain" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Pressable 
      //Valido que los campos no esten vacios
        style={[styles.buttonContainer, (!username || !password) && { backgroundColor: 'gray' }]} 
        onPress={handleLogin} 
        disabled={!username || !password}
      >
        <Text style={{ color: '#fff' }}>Login</Text>
      </Pressable>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  buttonContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
