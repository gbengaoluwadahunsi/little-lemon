import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true); // Always set to true for testing
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Commented out for testing purposes
    // AsyncStorage.getItem('alreadyLaunched').then(value => {
    //   if (value === null) {
    //     AsyncStorage.setItem('alreadyLaunched', 'true');
    //     setIsFirstLaunch(true);
    //   } else {
    //     setIsFirstLaunch(false);
    //   }
    // });

    // Clear userProfile on each refresh for testing
    AsyncStorage.removeItem('userProfile').then(() => {
      setUserProfile(null);
    });
  }, []);

  const saveProfile = async (profile) => {
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    setUserProfile(profile);
    setIsFirstLaunch(false); // Move to Home screen after saving profile
  };

  const clearProfile = async () => {
    await AsyncStorage.removeItem('userProfile');
    setUserProfile(null);
    setIsFirstLaunch(true); // Show Onboarding screen again
  };

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isFirstLaunch || !userProfile ? (
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {props => <OnboardingScreen {...props} onComplete={saveProfile} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile">
              {props => (
                <ProfileScreen
                  {...props}
                  userProfile={userProfile}
                  saveProfile={saveProfile}
                  clearProfile={clearProfile}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}