import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Replaced expo-router with React Navigation
import BannerAdComponent from '../Components/BannerAdComponent';

const SelectFrameScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                        <Text style={styles.arrow}>&lt;</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Frame</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Editing')}>
                        <Text style={styles.checkmark}>&#10003;</Text>
                    </TouchableOpacity>
                </View>

                {/* Frame Options */}
                <View style={styles.frameOptions}>
                    <TouchableOpacity style={styles.originalOption}>
                        <Text style={styles.frameText}>Original</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ratio16_9}>
                        <Text style={styles.frameText}>16:9</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ratio9_16}>
                        <Text style={styles.frameText}>9:16</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ratio3_4}>
                        <Text style={styles.frameText}>3:4</Text>
                    </TouchableOpacity>
                </View>

                {/* Zoom Option */}
                <TouchableOpacity style={styles.zoomButton}>
                    <Text style={styles.zoomText}>Zoom to cover</Text>
                </TouchableOpacity>

                {/* Import Project Button */}
                <TouchableOpacity style={styles.importButton}>
                    <Text style={styles.importText}>Import Project</Text>
                </TouchableOpacity>
                <BannerAdComponent />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#222',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    arrow: {
        fontSize: 30,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        color: '#fff',
    },
    checkmark: {
        fontSize: 30,
        color: '#fff',
    },
    frameOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    originalOption: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    ratio16_9: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 45,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    ratio9_16: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 80,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    ratio3_4: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 80,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    frameText: {
        color: '#fff',
        fontSize: 14,
    },
    zoomButton: {
        alignSelf: 'center',
        backgroundColor: '#555',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 10,
    },
    zoomText: {
        color: '#fff',
        fontSize: 16,
    },
    importButton: {
        alignSelf: 'center',
        backgroundColor: '#6C4ECF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 20,
    },
    importText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SelectFrameScreen;
