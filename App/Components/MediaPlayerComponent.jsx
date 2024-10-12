import React, { useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { VESDK } from 'react-native-videoeditorsdk';
import RNFS from 'react-native-fs';
import BannerAdComponent from './BannerAdComponent';

const MediaPlayerComponent = () => {
    const [videoUri, setVideoUri] = useState(null);

    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission',
                        message: 'App needs access to your storage to select videos.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const getValidFilename = async () => {
        let filePath = '';
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'App needs access to your storage to save videos.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                filePath = `${RNFS.ExternalStorageDirectoryPath}/Movies/video_${Date.now()}.mp4`;
            } else {
                console.error('Storage permission denied');
                return null;
            }
        } else if (Platform.OS === 'ios') {
            filePath = `${RNFS.DocumentDirectoryPath}/video_${Date.now()}.mp4`;
        }
        return filePath;
    };

    const selectVideo = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            return;
        }
        const options = {
            mediaType: 'video',
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
            } else if (response.assets) {
                const uri = response.assets[0].uri;
                setVideoUri(uri);
                console.log('Video fully imported, calling the function...');
                onVideoImported(uri);
            }
        });
    };

    const onVideoImported = async (importedVideoUri) => {
        try {
            console.log('Function called with video URI:', importedVideoUri);

            const configuration = {
                transform: {
                    items: [
                        { width: 1, height: 1 },
                        { width: 19, height: 9, name: "Landscape" },
                    ],
                    allowFreeCrop: true,
                    showResetButton: true,
                },
                audio: {
                    allowAudio: true,
                    showAudioPicker: true,
                    allowMultipleAudio: true,
                    categories: [
                        {
                            identifier: "custom",
                            name: "Custom",
                            items: [
                                {
                                    identifier: "elsewhere",
                                    audioURI: require("../../assets/vesdk/elsewhere.mp3"), // Ensure this path is correct
                                },
                            ],
                        },
                    ],
                },
                forceCrop: true,
            };

            console.log('Opening video editor with configuration:', configuration);
            const result = await VESDK.openEditor(importedVideoUri, configuration);
            console.log('Editor result:', result);

            if (result != null) {
                console.log('Exported video located at:', result.video);
                const destinationPath = await getValidFilename();
                await RNFS.moveFile(result.video, destinationPath);
                console.log('Video saved to:', destinationPath);
            } else {
                console.log('The user tapped on the cancel button within the editor.');
            }
        } catch (error) {
            console.error('Error during video editing:', error);
        }
    };

    return (
        <View>
            <Button title="Import Video" onPress={selectVideo} />
            {videoUri && <Text>Video URI: {videoUri}</Text>}
            <BannerAdComponent />
        </View>
    );
};

export default MediaPlayerComponent;
