import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle user login
  const loginTestFn = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userId = user.uid;
      await AsyncStorage.setItem('userId', userId);  // Store user ID in AsyncStorage
      Alert.alert("Login successful!");

      console.log(`User ID: ${userId}`);  // Print the user ID
      console.log(`User Email: ${user.email}`);  // Print the user email

      // Navigate to the "Home" screen in the Tab Navigator after login
      navigation.navigate('Home');  // Use navigate instead of replace
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        Alert.alert("No user found");
      } else {
        Alert.alert(err.message);
      }
    }
  };


  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        navigation.replace('AppTabs'); // Navigate to the Tab Navigator if user is logged in
      }
    };
    checkLoggedInUser();
  }, [navigation]);

  return (
    <LinearGradient colors={['#000000', '#2c3e50', '#34495e']} style={styles.container}>
      <Image source={require('./../../assets/images/camera_logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to Video Editor</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={loginTestFn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    marginBottom: 15,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#8e44ad',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LoginScreen;
