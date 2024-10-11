import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing in cache

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Context provider component
export const AppContextProvider = ({ children }) => {
    const [hasPayed, setHasPayed] = useState(false);
    const [userId, setUserId] = useState(null); // Store user ID in state

    // Load hasPayed state from AsyncStorage based on userId when app loads
    useEffect(() => {
        const loadHasPayedState = async () => {
            const storedUserId = await AsyncStorage.getItem('userId');
            const storedHasPayed = await AsyncStorage.getItem(`hasPayed_${storedUserId}`);

            if (storedUserId && storedHasPayed !== null) {
                setUserId(storedUserId);
                setHasPayed(JSON.parse(storedHasPayed));
            }
        };
        loadHasPayedState();
    }, []);

    // Toggle the state and save it in AsyncStorage
    const toggleHasPayed = async () => {
        const newState = !hasPayed;
        setHasPayed(newState);
        if (userId) {
            await AsyncStorage.setItem(`hasPayed_${userId}`, JSON.stringify(newState));
        }
    };

    return (
        <AppContext.Provider value={{ hasPayed, toggleHasPayed, setUserId }}>
            {children}
        </AppContext.Provider>
    );
};
