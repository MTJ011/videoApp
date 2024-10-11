import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import BottomBarComponent from '../Components/BottomBarComponent';
import TopBarComponent from '../Components/TopBarComponent';
import VideoAudioPlayerComponent from '../Components/MediaPlayerComponent';
import { useNavigation } from '@react-navigation/native'; // Replaced expo-router with React Navigation

const EditingScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.safeContainer}>
            <TopBarComponent />
            <VideoAudioPlayerComponent />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor: '#2C2C2C',
        height: 700,
    },
});

export default EditingScreen;
