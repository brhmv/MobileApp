import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './stacks/AuthStack';
import TabNavigator from './TabNavigator';
import { useMMKVString } from 'react-native-mmkv';

const Navigation = () => {
    const [token] = useMMKVString('token');
    const isAuthenticated = !!token;

    return (
        <NavigationContainer>
            {isAuthenticated ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Navigation;
