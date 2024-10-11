import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Clipboard, Alert, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
const MeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
    const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
    const [copyLinkModalVisible, setCopyLinkModalVisible] = useState(false);
    const profileLink = "http://this.appvide.copy.thisurl/";

    const copyToClipboard = () => {
        Clipboard.setString(profileLink);
        Alert.alert('Copied', 'Profile link copied to clipboard');
        setCopyLinkModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="ellipsis-vertical" size={24} color="white" />
                </TouchableOpacity>

                <Image
                    source={{ uri: 'https://images.pexels.com/photos/6012007/pexels-photo-6012007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                    style={styles.picture}
                />
                <Text style={styles.name}>Your Name</Text>
                <View style={styles.statsContainer}>
                    <Text style={styles.stats}>100 Followers</Text>
                    <Text style={styles.stats}>50 Following</Text>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => setEditProfileModalVisible(true)}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalHeaderButton}>
                                <Ionicons name="chevron-back" size={24} color="white" />
                                <Text style={styles.headerTitle}>Account Options</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => console.log('My Account')}>
                            <Text style={styles.optionText}>My Account</Text>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => setCopyLinkModalVisible(true)}>
                            <Text style={styles.optionText}>Copy Profile Link</Text>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => console.log('Blocked Accounts')}>
                            <Text style={styles.optionText}>Blocked Accounts</Text>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionContainer} onPress={() => {
                            setModalVisible(false);
                            setDeleteAccountModalVisible(true);
                        }}>
                            <Text style={styles.optionText}>Delete Account</Text>
                            <Ionicons name="chevron-forward" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={copyLinkModalVisible}
                onRequestClose={() => setCopyLinkModalVisible(false)}
            >
                <View style={styles.copyModalContainer}>
                    <View style={styles.copyModalView}>
                        <Text style={styles.profileLink}>{profileLink}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                                <Text style={styles.copyButtonText}>Copy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setCopyLinkModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={editProfileModalVisible}
                onRequestClose={() => setEditProfileModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setEditProfileModalVisible(false)} style={styles.modalHeaderButton}>
                                <Ionicons name="chevron-back" size={24} color="white" />
                                <Text style={styles.headerTitle}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.editProfileContainer}>
                            <TouchableOpacity style={styles.profileImageContainer}>
                                <Image
                                    source={{ uri: 'https://images.pexels.com/photos/6012007/pexels-photo-6012007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                                    style={styles.picture}
                                />
                            </TouchableOpacity>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Username</Text>
                                <TextInput style={styles.input} placeholder="asfandyar197" placeholderTextColor="gray" />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Name</Text>
                                <TextInput style={styles.input} placeholder="Asfandyar Yar" placeholderTextColor="gray" />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Bio</Text>
                                <TextInput style={styles.input} placeholder="Tap to add bio" placeholderTextColor="gray" />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Gender</Text>
                                <TextInput style={styles.input} placeholder="Tap to add gender" placeholderTextColor="gray" />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteAccountModalVisible}
                onRequestClose={() => setDeleteAccountModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setDeleteAccountModalVisible(false)} style={styles.modalHeaderButton}>
                                <Ionicons name="chevron-back" size={24} color="white" />
                                <Text style={styles.headerTitle}>Delete Account</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.warningText}>This action will permanently delete your account and all its data.</Text>

                        <TouchableOpacity style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Confirm Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setDeleteAccountModalVisible(false)} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        alignItems: 'center',
    },
    menuButton: {
        position: 'absolute',
        top: 50,
        right: -50,
    },
    optionText: {
        color: 'white',
        fontSize: 16,
    },
    editProfileContainer: {
        width: '100%',
        marginTop: 20,
    },
    profileImageContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        color: 'white',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#333',
        borderRadius: 5,
        padding: 10,
        color: 'white',
    },
    picture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#7F57F1',
    },
    name: {
        fontSize: 24,
        color: 'white',
        marginBottom: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    stats: {
        fontSize: 16,
        color: 'gray',
        marginHorizontal: 10,
    },
    editButton: {
        backgroundColor: '#7F57F1',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalView: {
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 20,
        width: '80%',
    },
    modalHeaderButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        color: 'white',
        marginLeft: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    copyModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    copyModalView: {
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    profileLink: {
        color: 'white',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    copyButton: {
        backgroundColor: '#7F57F1',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    copyButtonText: {
        color: 'white',
    },
    cancelButton: {
        backgroundColor: 'gray',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cancelButtonText: {
        color: 'white',
    },
    warningText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 20,
        paddingVertical: 10,
        marginVertical: 10,
    },
    deleteButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default MeScreen;
