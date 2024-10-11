import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';  // Use useNavigation for navigation

const projects = [
    { id: '1', name: '0630', size: '26.4MB', date: '30/06', image: 'https://images.pexels.com/photos/7869555/pexels-photo-7869555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: '2', name: '0527', size: '32.1MB', date: '11/06', image: 'https://images.pexels.com/photos/5247203/pexels-photo-5247203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: '3', name: '0423-01', size: '51.8MB', date: '10/06', image: 'https://images.pexels.com/photos/13741887/pexels-photo-13741887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: '4', name: '0524', size: '64.8MB', date: '24/05', image: 'https://images.pexels.com/photos/3534924/pexels-photo-3534924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

const CreateScreen = () => {
    const navigation = useNavigation();  // Use useNavigation for navigation

    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Create Project Page</Text>
                    <View style={styles.headerIcons}>
                        <Ionicons name="notifications-outline" size={24} color="white" />
                        <MaterialIcons name="settings" size={24} color="white" style={{ marginLeft: 15 }} />
                    </View>
                </View>

                {/* Create New Button */}
                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => navigation.navigate('SelectFrame')}  // Navigate to SelectFrameScreen
                >
                    <Text style={styles.createButtonText}>Create New</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Projects</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>

                {projects.map((item) => (
                    <View key={item.id} style={styles.projectItem}>
                        <Image source={{ uri: item.image }} style={styles.projectImage} />
                        <View style={styles.projectDetails}>
                            <Text style={styles.projectText}>{item.name}</Text>
                            <Text style={styles.projectText}>{item.size}</Text>
                            <Text style={styles.projectText}>Updated on {item.date}</Text>
                        </View>
                        <TouchableOpacity>
                        <MaterialIcons name="more-vert" size={24} color="#9999" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
    },
    scrollContainer: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    createButton: {
        backgroundColor: '#6a0dad',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },
    viewAllText: {
        color: '#6a0dad',
        alignSelf: 'flex-end',
        marginBottom: 15,
    },
    projectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#111',
        padding: 10,
        borderRadius: 8,
    },
    projectImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 8,
    },
    projectDetails: {
        flex: 1,
    },
    projectText: {
        color: '#ddd',
    },
});

export default CreateScreen;
