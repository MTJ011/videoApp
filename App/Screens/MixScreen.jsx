import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const posts = [
    {
        id: '1',
        username: 'plantination.offic',
        profileImage: 'https://images.pexels.com/photos/26382040/pexels-photo-26382040/free-photo-of-gemsbrok-antelope-in-nature.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUri: 'https://videos.pexels.com/video-files/17086197/17086197-uhd_1440_2560_60fps.mp4',
        likes: '278K',
        comments: '1,477',
        shares: '84.9K',
        description: 'The Serene effect of plant with hues...'
    },
    {
        id: '2',
        username: 'plantination.offic',
        profileImage: 'https://images.pexels.com/photos/8980778/pexels-photo-8980778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        videoUri: 'https://videos.pexels.com/video-files/18049576/18049576-hd_1080_1920_25fps.mp4',
        likes: '278K',
        comments: '1,477',
        shares: '84.9K',
        description: 'The Serene effect of plant with hues...'
    },
    {
        id: '3',
        username: 'yt_short_channel',
        profileImage: 'https://images.pexels.com/photos/26952831/pexels-photo-26952831/free-photo-of-model-in-white-shirt-and-checkered-gray-pants-sitting-in-front-of-windows.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        videoUri: 'https://demo.twic.pics/video/skater.mp4',
        likes: '1.2M',
        comments: '10K',
        shares: '500K',
        description: 'This is a YouTube Short',
        isYouTubeShort: true
    },
];

const MixScreen = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRefs = useRef([]);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        const visibleItem = viewableItems[0];
        if (visibleItem) {
            setCurrentVideoIndex(visibleItem.index);
        }
    }).current;

    const renderItem = ({ item, index }) => (
        <View style={styles.postContainer}>
            <Video
                ref={(ref) => { videoRefs.current[index] = ref; }}
                source={{ uri: item.videoUri }}
                rate={1.0}
                volume={1.0}
                muted={false}
                resizeMode="cover" // Use "cover" for fullscreen
                repeat={true}
                style={styles.video}
                paused={index !== currentVideoIndex} // Pause other videos
            />
            <View style={styles.actionIcons}>
                <View style={styles.iconWithText}>
                    <FontAwesome name="heart" size={24} color="white" />
                    <Text style={styles.iconText}>{item.likes}</Text>
                </View>
                <View style={styles.iconWithText}>
                    <Ionicons name="chatbubble-outline" size={24} color="white" />
                    <Text style={styles.iconText}>{item.comments}</Text>
                </View>
                <View style={styles.iconWithText}>
                    <Ionicons name="share-social-outline" size={24} color="white" />
                    <Text style={styles.iconText}>{item.shares}</Text>
                </View>
            </View>
            <View style={styles.bottomSection}>
                <Image
                    source={{ uri: item.profileImage }}
                    style={styles.profileImage}
                />
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.username}>{item.username}</Text>
                    <TouchableOpacity style={styles.mixButton}>
                        <Text style={styles.mixButtonText}>Mix</Text>
                    </TouchableOpacity>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                <TouchableOpacity>
                    <MaterialIcons name="more-vert" size={24} color="#999" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 80,
                }}
                // Adjust the height of FlatList to fit within the screen
                style={{ height: '100%' }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    postContainer: {
        height: Dimensions.get('window').height - 50, // Reduce height to account for bottom nav bar
        justifyContent: 'flex-end', // Align items to the bottom
    },
    video: {
        width: '100%',
        height: '100%',
    },
    actionIcons: {
        position: 'absolute',
        right: 10,
        bottom: 120, // Adjust the bottom position
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    iconWithText: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconText: {
        color: '#fff',
        marginTop: 5,
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0, // Align to the bottom of the screen
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Slightly more opaque for better visibility
        width: '100%',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    bottomTextContainer: {
        flex: 1,
    },
    username: {
        color: '#fff',
        fontWeight: 'bold',
    },
    mixButton: {
        backgroundColor: '#6a0dad',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    mixButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    description: {
        color: '#ddd',
    },
});

export default MixScreen;
