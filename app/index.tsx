import { Image, StyleSheet, Platform, View, Text, KeyboardAvoidingView, Pressable } from 'react-native';
import { useState } from 'react';
import { TextInput, Button } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here you would typically handle the login logic
    console.log('Login attempt:', { username, password });
    // For now, just clear the fields
    // Navigate to the chat screen
    // Assuming you have a navigation prop available
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
