import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, ScrollView, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker'; // Fixed import statement for Picker
import { useNavigation } from '@react-navigation/native'; // Replaced expo-router with React Navigation

const TopBarComponent = () => {
    const navigation = useNavigation();
    const [selectedResolution, setSelectedResolution] = useState('Original');
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            {/* Back arrow */}
            <TouchableOpacity onPress={() => navigation.navigate('SelectFrame')} style={styles.backButton}>
                <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>

            {/* Right side - Picker and Icons */}
            <View style={styles.rightContainer}>
                {/* Resolution Picker */}
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedResolution}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedResolution(itemValue)}
                    >
                        <Picker.Item label="Original" value="Original" />
                        <Picker.Item label="720p" value="720p" />
                        <Picker.Item label="1080p" value="1080p" />
                        <Picker.Item label="1440p" value="1440p" />
                        <Picker.Item label="4K" value="4K" />
                    </Picker>
                </View>

                {/* More options */}
                <TouchableOpacity style={styles.moreButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="ellipsis-horizontal" size={16} color="white" />
                </TouchableOpacity>
                {/* Save button */}
                <TouchableOpacity style={[styles.iconButton, styles.saveButton]}>
                    <Ionicons name="save" size={16} color="white" />
                </TouchableOpacity>

                {/* Share button */}
                <TouchableOpacity style={[styles.iconButton, styles.shareButton]}>
                    <Ionicons name="share-outline" size={16} color="white" />
                </TouchableOpacity>
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <ScrollView>
                            {[
                                { icon: 'image-outline', text: 'Resolution' },
                                { icon: 'volume-high-outline', text: 'Volume Envelope' },
                                { icon: 'mic-outline', text: 'Voice Changer' },
                                { icon: 'information-circle-outline', text: 'Information' },
                                { icon: 'text-outline', text: 'Audio Caption' },
                                { icon: 'color-filter-outline', text: 'Filter' },
                                { icon: 'construct-outline', text: 'Adjustment' },
                                { icon: 'easel-outline', text: 'AI Styles' },
                            ].map((item, index) => (
                                <TouchableOpacity key={index} style={styles.option}>
                                    <Ionicons name={item.icon} size={24} color="white" />
                                    <Text style={styles.optionText}>{item.text}</Text>
                                    <Ionicons name="chevron-forward-outline" size={24} color="white" />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 15,
        backgroundColor: '#1C1C1C',
    },
    backButton: {
        padding: 5,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerContainer: {
        marginRight: 10,
        justifyContent: 'center',
        width: 140, // Adjust width to fit the screen
    },
    picker: {
        height: 30,
        color: 'white',
        fontSize: 14,
    },
    iconButton: {
        padding: 8,
        borderRadius: 3,
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: '#A9A9A9', // Greyish color for save
    },
    shareButton: {
        backgroundColor: 'purple',
    },
    moreButton: {
        marginLeft: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dim background
    },
    modalView: {
        width: '80%',
        height: '40%', // Slightly bigger than a quarter of the screen
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    optionText: {
        color: 'white',
        fontSize: 16,
    },
});

export default TopBarComponent;
