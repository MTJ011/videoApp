import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Replaced with react-native-vector-icons
import { useNavigation } from '@react-navigation/native';  // Import the hook for navigation

const screenWidth = Dimensions.get('window').width;
const paddingTopForNotch = 50;

const templatesData = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/27372391/pexels-photo-27372391/free-photo-of-a-person-standing-on-top-of-a-mountain-with-rocks.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    height: 300,
    views: '480.7K',
    user: 'JohnDoe',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/758744/pexels-photo-758744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    height: 400,
    views: '214.2K',
    user: 'JaneSmith',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/1659437/pexels-photo-1659437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    height: 200,
    views: '80.3K',
    user: 'AliceWang',
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/2482321/pexels-photo-2482321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    height: 500,
    views: '532.5K',
    user: 'BobLee',
  },
  {
    id: '5',
    image: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    height: 350,
    views: '312.7K',
    user: 'ChrisKim',
  },
  {
    id: '6',
    image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    height: 250,
    views: '92.1K',
    user: 'EvaLiu',
  },
];

const AllTemplatesScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Trending');
  const navigation = useNavigation();  // Initialize the navigation hook

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Add back navigation here
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Templates</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Search template"
          placeholderTextColor="gray"
          style={styles.searchInput}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['Following', 'Trending', 'Fun Play', 'Vlog'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTabButton]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Masonry Grid */}
      <MasonryList
        data={templatesData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={[styles.templateContainer, { height: item.height }]}>
            <Image source={{ uri: item.image }} style={styles.templateImage} />
            <View style={styles.templateOverlay}>
              <Text style={styles.templateUser}>{item.user}</Text>
              <Text style={styles.templateViews}>{item.views} views</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: paddingTopForNotch,
    paddingHorizontal: 2,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    height: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#1c1c1e',
  },
  activeTabButton: {
    backgroundColor: '#7F57F1',
  },
  tabText: {
    color: '#fff',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  templateContainer: {
    margin: 5,
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    overflow: 'hidden',
  },
  templateImage: {
    width: (screenWidth - 40) / 2, // Adjust to fit two columns evenly
    height: '100%',
    resizeMode: 'cover',
  },
  templateOverlay: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  templateUser: {
    color: '#fff',
    fontWeight: 'bold',
  },
  templateViews: {
    color: '#fff',
    fontSize: 12,
  },
});

export default AllTemplatesScreen;
