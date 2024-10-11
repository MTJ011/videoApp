import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, ScrollView, Modal, Switch, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Use this instead of Expo's
import { Colors } from './../../constants/Colors'; // Adjust path if necessary
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './LoginScreen';
import BannerAdComponent from '../Components/BannerAdComponent';
import { getAuth, signOut } from 'firebase/auth';
import InterstitialAdComponent from '../Components/InterstitialAdComponent';
import RewardedAdComponent from '../Components/RewardedAdComponent';

const HomeScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [showAd, setShowAd] = useState(true);
    const handleNavigate = () => {
        if (showAd) {
            <BannerAdComponent />
            setTimeout(() => {
                setShowAd(false)
            }, 3000);
            navigation.navigate('AllTemplate');
        }
        else {
            navigation.navigate('AllTemplate');
        }
    }

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const trendingData = [
        { id: '1', image: 'https://images.pexels.com/photos/27372391/pexels-photo-27372391/free-photo-of-a-person-standing-on-top-of-a-mountain-with-rocks.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '2', image: 'https://images.pexels.com/photos/758744/pexels-photo-758744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '3', image: 'https://images.pexels.com/photos/1659437/pexels-photo-1659437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '4', image: 'https://images.pexels.com/photos/2482321/pexels-photo-2482321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ];

    const newReleaseData = [
        { id: '1', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '2', image: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: '3', image: 'https://images.pexels.com/photos/932261/pexels-photo-932261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ];

    const renderTrendingItem = ({ item }) => (
        <Image source={{ uri: item.image }} style={styles.image} />
    );

    const renderNewReleaseItem = ({ item }) => (
        <Image source={{ uri: item.image }} style={styles.image} />
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                {/* Navigate to PremiumScreen */}
                <Pressable onPress={() => navigation.navigate('Premium')}>
                    <MaterialCommunityIcons name="crown" size={30} color={Colors.GOLD} />
                </Pressable>

                {/* Open Modal on settings icon press */}
                <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
                    <Icon name="gear" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <BannerAdComponent />
            {/* <RewardedAdComponent /> */}
            {/* <InterstitialAdComponent /> */}
            <Text style={styles.searchTitle}>Search Video Template</Text>

            <View style={styles.searchBar}>
                <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="search what you desire"
                    placeholderTextColor="#666"
                />
            </View>

            {/* Modal for Settings */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}>
                                <Ionicons name="chevron-back" size={24} color="white" />
                                <Text style={styles.headerTitle}>Settings</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Modal options */}
                        <TouchableOpacity style={styles.optionContainer} onPress={() => console.log('App Language')}>
                            <Text style={styles.optionText}>App Language</Text>
                            <Text style={styles.optionValue}>English</Text>
                        </TouchableOpacity>

                        <View style={styles.optionContainer}>
                            <Text style={styles.optionText}>Add default ending</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#7F57F1" }}
                                thumbColor={isEnabled ? "#ffffff" : "#f4f3f4"}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => console.log('Add widgets')}>
                            <Text style={styles.optionText}>Add widgets</Text>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => console.log('Feedback')}>
                            <Text style={styles.optionText}>Feedback</Text>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => console.log('Privacy Center')}>
                            <Text style={styles.optionText}>Privacy Center</Text>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => console.log('Terms and Policies')}>
                            <Text style={styles.optionText}>Terms and Policies</Text>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => console.log('Clear cache')}>
                            <Text style={styles.optionText}>Clear cache</Text>
                            <Text style={styles.optionValue}>18MB</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.optionContainer}
                            onPress={() => {
                                const auth = getAuth();
                                signOut(auth).then(() => {
                                    console.log('User signed out');
                                    navigation.replace('LoginScreen'); // Navigate to the login screen
                                }).catch((error) => {
                                    console.error('Error logging out: ', error);
                                });
                            }}
                        >
                            <Text style={styles.optionText}>Logout</Text>
                            <Ionicons name="chevron-forward" size={20} color="red" />
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <View style={styles.tagsContainer}>
                {['#Paris', 'video', 'photos', 'birthday'].map((tag, index) => (
                    <TouchableOpacity key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Trending Section */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trending</Text>
                <TouchableOpacity onPress={handleNavigate}>
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={trendingData}
                renderItem={renderTrendingItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.list}
            />

            {/* New Release Section */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>New Release</Text>
                <TouchableOpacity onPress={handleNavigate}>
                    <AntDesign name="arrowright" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={newReleaseData}
                renderItem={renderNewReleaseItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.list}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
    },
    searchTitle: {
        marginTop: 10,
        color: '#fff',
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'outfit-bold',
    },
    searchBar: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'outfit-bold',
    },
    list: {
        marginBottom: 30,
    },
    image: {
        width: 120,
        height: 160,
        borderRadius: 10,
        marginRight: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    tag: {
        backgroundColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    tagText: {
        color: '#fff',
        fontFamily: 'outfit',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        height: '75%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
    },
    optionText: {
        color: '#fff',
        fontFamily: 'outfit',
    },
    optionValue: {
        color: '#666',
        fontFamily: 'outfit',
    },
});

export default HomeScreen;
