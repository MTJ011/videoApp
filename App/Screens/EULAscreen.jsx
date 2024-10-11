import React, { useState } from 'react';
import { View, Text, Button, Modal, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EulaScreen = ({ onAccept }) => {
    const eulaText = `
  END USER LICENSE AGREEMENT (EULA)

  1. Agreement
  By using this video editing app, you agree to the following terms...

  2. License
  The app grants you a limited, non-exclusive, non-transferable license...

  3. Restrictions
  You shall not, and shall not permit anyone else to...

  4. Ownership
  All intellectual property rights are retained by the company...

  5. Termination
  This EULA is effective until terminated...

  6. Updates
  We reserve the right to update this EULA at any time...

  7. Disclaimer of Warranty
  The app is provided "as is" without warranty of any kind...

  8. Limitation of Liability
  Under no circumstances shall the company be liable for...

  9. Governing Law
  This agreement shall be governed by the laws of...

  10. Conclusion
  Thank you for using our video editing software!
  `;

    const screenWidth = Dimensions.get('window').width;

    return (
        <Modal animationType="fade" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {/* Header with Logo */}
                    <View style={styles.header}>
                        <Image
                            source={require('../../assets/images/camera_logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>End User License Agreement</Text>
                    </View>

                    {/* Scrollable EULA Content */}
                    <ScrollView style={styles.scrollContent}>
                        <Text style={styles.eulaText}>{eulaText}</Text>
                    </ScrollView>

                    {/* Accept Button */}
                    <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
                        <Text style={styles.buttonText}>I Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        paddingVertical: 20,
        elevation: 10, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    header: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    logo: {
        width: 60,
        height: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    scrollContent: {
        maxHeight: Dimensions.get('window').height * 0.5, // Half the screen height
        marginHorizontal: 20,
        marginVertical: 10,
    },
    eulaText: {
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'justify',
    },
    acceptButton: {
        backgroundColor: '#6200EA', // Purple color
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EulaScreen;