import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import for Ionicons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Correct import for MaterialIcons
import Fontisto from 'react-native-vector-icons/Fontisto'; // Correct import for Fontisto
import AntDesign from 'react-native-vector-icons/AntDesign'; // Correct import for AntDesign
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'; // Correct import for SimpleLineIcons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Correct import for MaterialCommunityIcons

const BottomBarComponent = ({
    onTrim,
    onTrimAudio,
    onEffects,
    onSubtitle,
    onFilter,
    onOverlay,
    onRatio,
    onResolution,
    onVolumeEnvelope,
    onVoiceChanger,
    onInformation,
    onAudioCaption,
    onAdjustment,
    onAIStyles
}) => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {/* Existing Bottom Bar Buttons */}
                <TouchableOpacity style={styles.iconButton} onPress={onTrim}>
                    <Fontisto name="scissors" size={16} color="white" />
                    <Text style={styles.iconText}>Trim</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={onTrimAudio}>
                    <MaterialIcons name="multitrack-audio" size={16} color="white" />
                    <Text style={styles.iconText}>Trim Audio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={onEffects}>
                    <AntDesign name="star" size={16} color="white" />
                    <Text style={styles.iconText}>Effects</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={onSubtitle}>
                    <MaterialIcons name="title" size={16} color="white" />
                    <Text style={styles.iconText}>Subtitle</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={onFilter}>
                    <Ionicons name="color-filter" size={16} color="white" />
                    <Text style={styles.iconText}>Filter</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={onOverlay}>
                    <MaterialCommunityIcons name="card-multiple-outline" size={16} color="white" />
                    <Text style={styles.iconText}>Overlay</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={onRatio}>
                    <SimpleLineIcons name="frame" size={16} color="white" />
                    <Text style={styles.iconText}>Ratio</Text>
                </TouchableOpacity>

                {/* Modal Options added */}
                {[
                    { icon: 'image-outline', text: 'Resolution', func: onResolution },
                    { icon: 'volume-high-outline', text: 'Volume Envelope', func: onVolumeEnvelope },
                    { icon: 'mic-outline', text: 'Voice Changer', func: onVoiceChanger },
                    { icon: 'information-circle-outline', text: 'Information', func: onInformation },
                    { icon: 'text-outline', text: 'Audio Caption', func: onAudioCaption },
                    { icon: 'construct-outline', text: 'Adjustment', func: onAdjustment },
                    { icon: 'easel-outline', text: 'AI Styles', func: onAIStyles },
                ].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.iconButton} onPress={item.func}>
                        <Ionicons name={item.icon} size={16} color="white" />
                        <Text style={styles.iconText}>{item.text}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1C1C',
        paddingVertical: 10,
    },
    scrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10, // Adjust padding for better spacing
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20, // Space between each button
    },
    iconText: {
        color: '#fff',
        fontSize: 12,
    },
});

export default BottomBarComponent;