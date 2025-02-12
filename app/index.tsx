import { Image, StyleSheet, Platform, View, Text, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { TextInput, Button } from 'react-native';
export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here you would typically handle the login logic
    console.log('Login attempt:', { username, password });
    // For now, just clear the fields
    setUsername('');
    setPassword('');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Bienvenido a GlobalChat!</Text>
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
      <View style={[styles.buttonContainer, (!username || !password) && { backgroundColor: 'gray' }]}>
      <Button 
        title="Login" 
        onPress={handleLogin} 
        disabled={!username || !password}  
        color="#fff"
      />
      </View>
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
