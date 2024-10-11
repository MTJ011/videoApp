import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InboxScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.message}>No messages yet.</Text>
            {/* Add bottom tab bar here if needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        color: '#7F57F1',
        fontSize: 18,
        marginBottom: 20,
    },
    message: {
        fontSize: 20,
        color: 'white',
    },
});

export default InboxScreen;
