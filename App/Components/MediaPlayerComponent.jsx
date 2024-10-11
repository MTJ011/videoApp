import React, { useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { VESDK, VideoFormat, VideoCodec } from 'react-native-videoeditorsdk';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import BannerAdComponent from './BannerAdComponent';

const MediaPlayerComponent = () => {
    const [videoUri, setVideoUri] = useState(null);

    // Request storage permission for Android
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
        return true; // No need for permission on iOS
    };

    // Function to generate a valid filename
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
                return null; // Handle the case where permission is denied
            }
        } else if (Platform.OS === 'ios') {
            filePath = `${RNFS.DocumentDirectoryPath}/video_${Date.now()}.mp4`;
        }

        return filePath;
    };

    // Select video from gallery
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
                onVideoImported(uri); // Call your function here once videoUri is set
            }
        });
    };

    // Function to be called after video is completely imported and videoUri is set
    const onVideoImported = async (importedVideoUri) => {
        try {
            console.log('Function called with video URI:', importedVideoUri);

            const configuration = {
                audio: {
                    categories: [
                        {
                            identifier: "custom",
                            name: "Custom",
                            items: [
                                {
                                    identifier: "elsewhere",
                                    audioURI: require("../../assets/vesdk/elsewhere.mp3")
                                }
                            ]
                        }
                    ]
                },
                export: {
                    filename: await getValidFilename(), // Valid file path generated dynamically
                    video: {
                        format: VideoFormat.MP4,
                        codec: VideoCodec.H264,
                        bitRate: 3840,
                        quality: 0.5, // For H.264, this will not apply
                    },
                },
            };

            const result = await VESDK.openEditor(importedVideoUri, configuration);

            if (result != null) {
                // The user exported a new video successfully
                console.log('Exported video located at:', result.video);

                // Save the exported video to the camera roll
                await CameraRoll.save(result.video, { type: 'video' });

                // Delete the temporary export file after saving
                await RNFS.unlink(result.video);
            } else {
                console.log('The user tapped on the cancel button within the editor.');
            }
        } catch (error) {
            console.error('Error importing video:', error);
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
