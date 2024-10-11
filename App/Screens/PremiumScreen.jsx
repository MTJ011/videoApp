import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation back
import Icon from 'react-native-vector-icons/FontAwesome'; // Vector Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth'


const PremiumPage = () => {
    // const { userHasPayed, setUserHasPayed } = usePayed(); // Accessing global state and setter from the context
    const user = auth().currentUser; // Get the currently logged-in user
    const navigation = useNavigation(); // Hook for navigation

    // Toggle the hasPayed state for the current user
    const togglePayedState = () => {
        // if (user) {
        //     const userId = user.uid;
        //     const currentState = userHasPayed[userId] || false; // Get current state, default is false
        //     setUserHasPayed((prevState) => ({
        //         ...prevState,
        //         [userId]: !currentState, // Toggle state for this specific user
        //     }));
        // } else {
        //     Alert.alert('Error', 'You need to be logged in to toggle this state.');
        // }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                            <Icon name="arrow-left" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.contactUs}>Contact Us</Text>
                    </View>

                    {/* Title and Features */}
                    <Text style={styles.premiumTitle}>Premium Pro</Text>
                    <Text style={styles.premiumSubTitle}>Get All Premium Features</Text>

                    {/* Crown Icon */}
                    <View style={styles.crownIcon}>
                        <MaterialCommunityIcons name="crown" size={60} color="#8E44AD" />
                    </View>

                    {/* Features List */}
                    <View style={styles.features}>
                        <Text style={styles.featureText}>✓ Unlock all charged materials and fonts</Text>
                        <Text style={styles.featureText}>✓ Unlimited number of projects</Text>
                        <Text style={styles.featureText}>✓ Unlimited VN template creation</Text>
                        <Text style={styles.featureText}>✓ Project Share Encryption Protection</Text>
                    </View>

                    {/* Pricing Options */}
                    <View style={styles.priceOption}>
                        <Text style={styles.priceText}>Rs 650.00/Month</Text>
                        <Text style={styles.trialText}>7 days free trial, automatic renewal.</Text>
                    </View>

                    <View style={[styles.priceOption, styles.yearlyOption]}>
                        <Text style={styles.priceText}>Rs 3,900.00/Year (Rs 325/Month)</Text>
                        <Text style={styles.trialText}>7 days free trial, automatic renewal.</Text>
                    </View>

                    {/* Toggle Button */}
                    {user && (
                        <TouchableOpacity
                            style={styles.subscribeButton}
                            onPress={togglePayedState}
                        >
                            <Text style={styles.subscribeText}>
                                {/* {userHasPayed[user.uid] ? 'Cancel Subscription' : 'Subscribe Now'} */}
                                Subscribe Now
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* Footer */}
                    <Text style={styles.footerText}>
                        The subscription is only available on iOS devices and cannot be used across platforms (e.g., macOS and Android).
                        Privacy Policy | Terms of Service | Restore Purchases
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    contactUs: {
        color: '#fff',
        fontSize: 16,
    },
    premiumTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#F5A623',
        marginBottom: 5,
    },
    premiumSubTitle: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    crownIcon: {
        marginBottom: 20,
    },
    features: {
        marginBottom: 30,
        alignItems: 'flex-start',
    },
    featureText: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 5,
    },
    priceOption: {
        borderWidth: 1,
        borderColor: '#F5A623',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    yearlyOption: {
        borderColor: '#4A90E2',
    },
    priceText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    trialText: {
        fontSize: 14,
        color: '#fff',
    },
    subscribeButton: {
        backgroundColor: '#8E44AD',
        borderRadius: 10,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    subscribeText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerText: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default PremiumPage;
