import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';
import TabNavigator from './TabNavigator';
import { useMMKVString } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Navigation = () => {
    const [token] = useMMKVString('token');
    const isAuthenticated = !!token;

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {isAuthenticated ? <TabNavigator /> : <AuthStack />}
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Navigation;