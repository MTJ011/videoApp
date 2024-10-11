import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './App/Screens/HomeScreen';
import LoginScreen from './App/Screens/LoginScreen';
import InboxScreen from './App/Screens/InboxScreen';
import MeScreen from './App/Screens/MeScreen';
import MixScreen from './App/Screens/MixScreen';
import CreateScreen from './App/Screens/CreateScreen';
import SelectFrameScreen from './App/Screens/SelectFrameScreen';
import TopBarComponent from './App/Components/TopBarComponent';
import EditingScreen from './App/Screens/EditingScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from './constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PremiumPage from './App/Screens/PremiumScreen';
import AllTemplatesScreen from './App/Screens/AllTemplatesScreen';
import SignUpScreen from './App/Screens/SignUpScreen';
import { View, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import EULAscreen from './App/Screens/EULAscreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [hasAcceptedEula, setHasAcceptedEula] = useState(false);

  useEffect(() => {
    const checkAppState = async () => {
      const userId = await AsyncStorage.getItem('userId');
      const eulaAccepted = await AsyncStorage.getItem('hasAcceptedEula');
      setIsAuthenticated(!!userId); // Set isAuthenticated to true if userId exists
      setHasAcceptedEula(eulaAccepted === 'true'); // Check if EULA is accepted
      setLoading(false); // Set loading to false after checking
    };
    checkAppState();
  }, []);

  const handleAcceptEula = async () => {
    await AsyncStorage.setItem('hasAcceptedEula', 'true');
    setHasAcceptedEula(true);
  };

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  // Show EULA screen if not accepted
  if (!hasAcceptedEula) {
    return <EULAscreen onAccept={handleAcceptEula} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.PRIMARY,
          headerShown: false,
          tabBarInactiveBackgroundColor: 'black',
          tabBarActiveBackgroundColor: 'black',
        }}>
        {isAuthenticated ? (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="Mix"
              component={MixScreen}
              options={{
                tabBarIcon: ({ color }) => <MaterialIcons name="explore" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="Create"
              component={CreateScreen}
              options={{
                tabBarIcon: ({ color }) => <MaterialIcons name="add" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="Inbox"
              component={InboxScreen}
              options={{
                tabBarIcon: ({ color }) => <Icon name="envelope" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="Me"
              component={MeScreen}
              options={{
                tabBarIcon: ({ color }) => <Icon name="user" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="SelectFrame"
              component={SelectFrameScreen}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="Premium"
              component={PremiumPage}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="AllTemplate"
              component={AllTemplatesScreen}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="Editing"
              component={EditingScreen}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="TopBar"
              component={TopBarComponent}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="Mix"
              component={MixScreen}
              options={{
                tabBarIcon: ({ color }) => <MaterialIcons name="explore" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="Create"
              component={CreateScreen}
              options={{
                tabBarIcon: ({ color }) => <MaterialIcons name="add" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="Inbox"
              component={InboxScreen}
              options={{
                tabBarIcon: ({ color }) => <Icon name="envelope" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="Me"
              component={MeScreen}
              options={{
                tabBarIcon: ({ color }) => <Icon name="user" size={24} color={color} />
              }}
            />
            <Tab.Screen
              name="SelectFrame"
              component={SelectFrameScreen}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="Premium"
              component={PremiumPage}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="AllTemplate"
              component={AllTemplatesScreen}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="Editing"
              component={EditingScreen}
              options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;