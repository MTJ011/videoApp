import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Function to handle user sign up
    const signUpTestFn = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;
            await AsyncStorage.setItem('userId', userId);  // Store user ID in AsyncStorage
            Alert.alert("User Created Successfully");

            // Navigate to the "Home" screen after signup
            navigation.navigate('Home');  // Use navigate instead of replace
        } catch (err) {
            Alert.alert(err.message);
        }
    };



    return (
        <LinearGradient colors={['#000000', '#2c3e50', '#34495e']} style={styles.container}>
            <Image source={require('./../../assets/images/camera_logo.png')} style={styles.logo} />
            <Text style={styles.title}>Create an Account</Text>

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

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#fff"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={signUpTestFn}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
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
    loginLink: {
        marginTop: 15,
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default SignUpScreen;
